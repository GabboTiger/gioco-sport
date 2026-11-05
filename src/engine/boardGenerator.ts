import { Category, Dataset, HexCell, GridSizeType } from './types';
import { generateBoardCoords, getAxialNeighbors } from './hexGrid';
import { buildInvertedIndex, getCategoryIntersection, InvertedIndex } from './matching';
import { validateBoard, BoardValidationResult } from './boardValidation';

export class BoardGenerationError extends Error {
  constructor(
    message: string,
    public readonly validationResult?: BoardValidationResult
  ) {
    super(message);
    this.name = 'BoardGenerationError';
  }
}

/**
 * Fast seedable PRNG (Mulberry32).
 * Deterministic and reproducible across environments.
 */
export function createPRNG(seed: number) {
  let s = Math.floor(seed) >>> 0;
  return function next(): number {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface BoardGeneratorOptions {
  minAnswersPerHex?: number;
  maxAttempts?: number;
  validateAtRuntime?: boolean;
  gridSize?: GridSizeType;
}

/**
 * Generates hex cells assigned with balanced categories, satisfying the OBLIGATORY
 * constraint that EVERY adjacent pair of hexes shares at least one valid entity (non-empty intersection).
 */
export function generateBoard(
  dataset: Dataset,
  seed: number,
  options: BoardGeneratorOptions = {}
): HexCell[] {
  const {
    minAnswersPerHex = 5,
    maxAttempts = 50,
    validateAtRuntime = true,
    gridSize = 'standard_31',
  } = options;

  const index = buildInvertedIndex(dataset);
  const coords = generateBoardCoords(gridSize);
  const requiredCount = coords.length;

  // 1. Filter categories with at least minAnswersPerHex
  const eligibleCategories = dataset.categories.filter((cat) => {
    const matchingCount = index.categoryToEntities.get(cat.id)?.size ?? 0;
    return matchingCount >= minAnswersPerHex;
  });

  if (eligibleCategories.length < requiredCount) {
    throw new BoardGenerationError(
      `Non ci sono abbastanza categorie idonee (${eligibleCategories.length}) con almeno ${minAnswersPerHex} risposte valide. Ne servono almeno ${requiredCount}.`
    );
  }

  // 2. Precompute compatibility matrix: Map<catId, Set<compatibleCatId>>
  const compat = new Map<string, Set<string>>();
  for (const catA of eligibleCategories) {
    const set = new Set<string>();
    for (const catB of eligibleCategories) {
      if (catA.id !== catB.id) {
        const common = getCategoryIntersection(catA.id, catB.id, index);
        if (common.length >= 1) {
          set.add(catB.id);
        }
      }
    }
    compat.set(catA.id, set);
  }

  // 3. Order coordinates by distance from origin (center outward BFS)
  const orderedCoords = [...coords].sort((a, b) => {
    const distA = (Math.abs(a.q) + Math.abs(a.q + a.r) + Math.abs(a.r)) / 2;
    const distB = (Math.abs(b.q) + Math.abs(b.q + b.r) + Math.abs(b.r)) / 2;
    if (distA !== distB) return distA - distB;
    if (a.r !== b.r) return a.r - b.r;
    return a.q - b.q;
  });

  // Precompute previous neighbor indices for each position
  const prevNeighborIndices: number[][] = [];
  for (let i = 0; i < orderedCoords.length; i++) {
    const neighbors = getAxialNeighbors(orderedCoords[i]);
    const prevIndices: number[] = [];
    for (let j = 0; j < i; j++) {
      if (neighbors.some((n) => n.q === orderedCoords[j].q && n.r === orderedCoords[j].r)) {
        prevIndices.push(j);
      }
    }
    prevNeighborIndices.push(prevIndices);
  }

  // 4. Attempt CSP generation with randomized restarts
  let lastValidation: BoardValidationResult | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rng = createPRNG(seed + attempt * 7919);
    const board = tryGenerateBoardCSP(
      orderedCoords,
      prevNeighborIndices,
      eligibleCategories,
      compat,
      index,
      rng
    );

    if (board) {
      if (validateAtRuntime) {
        const validation = validateBoard(board, dataset, minAnswersPerHex, index);
        if (validation.isValid) {
          return board;
        }
        lastValidation = validation;
      } else {
        return board;
      }
    }
  }

  throw new BoardGenerationError(
    `Impossibile generare una tabella valida al 100% dopo ${maxAttempts} tentativi con seed ${seed}. ` +
      (lastValidation ? `${lastValidation.disjointPairs.length} coppie senza collegamento.` : ''),
    lastValidation
  );
}

function tryGenerateBoardCSP(
  coords: Array<{ q: number; r: number }>,
  prevNeighborIndices: number[][],
  eligibleCategories: Category[],
  compat: Map<string, Set<string>>,
  index: InvertedIndex,
  rng: () => number
): HexCell[] | null {
  const targetCount = coords.length;
  const assigned: (Category | null)[] = new Array(targetCount).fill(null);
  const usedCatIds = new Set<string>();

  let steps = 0;
  const maxSteps = targetCount > 31 ? 4500 : 3000;

  function backtrack(pos: number): boolean {
    if (pos === targetCount) return true;
    if (++steps > maxSteps) return false;

    const prevNeighbors = prevNeighborIndices[pos];

    // Must be compatible with ALL placed neighbors (MANDATORY non-empty intersection)
    let candidates = eligibleCategories.filter((cat) => {
      if (usedCatIds.has(cat.id)) return false;
      for (const pIdx of prevNeighbors) {
        const placedCat = assigned[pIdx]!;
        if (!compat.get(cat.id)!.has(placedCat.id)) {
          return false;
        }
      }
      return true;
    });

    if (candidates.length === 0) return false;

    // Score candidates by intersection richness and slight random jitter
    const scoredCandidates = candidates.map((cat) => {
      let intersectionScore = 0;
      for (const pIdx of prevNeighbors) {
        const placedCat = assigned[pIdx]!;
        intersectionScore += getCategoryIntersection(cat.id, placedCat.id, index).length;
      }
      return { cat, score: intersectionScore + rng() * 3 };
    });

    scoredCandidates.sort((a, b) => b.score - a.score);

    for (const item of scoredCandidates) {
      const cat = item.cat;
      assigned[pos] = cat;
      usedCatIds.add(cat.id);

      if (backtrack(pos + 1)) {
        return true;
      }

      assigned[pos] = null;
      usedCatIds.delete(cat.id);
    }

    return false;
  }

  if (backtrack(0)) {
    return coords.map((coord, idx) => ({
      id: `hex_${coord.q}_${coord.r}`,
      q: coord.q,
      r: coord.r,
      category: assigned[idx]!,
      ownerId: null,
    }));
  }

  return null;
}
