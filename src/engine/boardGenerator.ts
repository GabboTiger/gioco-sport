import { Category, Dataset, HexCell } from './types';
import { generate31HexCoords, getAxialNeighbors } from './hexGrid';
import { buildInvertedIndex, getCategoryIntersection, InvertedIndex } from './matching';

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
  minAdjacentIntersectionRatio?: number; // e.g. 0.60 (60% of adjacent pairs share at least 1 entity)
  maxAttempts?: number;
}

/**
 * Generates 31 hex cells assigned with balanced, playable categories.
 */
export function generateBoard(
  dataset: Dataset,
  seed: number,
  options: BoardGeneratorOptions = {}
): HexCell[] {
  const {
    minAnswersPerHex = 5,
    minAdjacentIntersectionRatio = 0.55,
    maxAttempts = 50,
  } = options;

  const index = buildInvertedIndex(dataset);
  const coords = generate31HexCoords(); // 31 coordinates
  if (coords.length !== 31) {
    throw new Error(`Expected 31 hex coordinates, got ${coords.length}`);
  }

  // Filter categories with at least minAnswersPerHex
  const eligibleCategories = dataset.categories.filter((cat) => {
    const matchingCount = index.categoryToEntities.get(cat.id)?.size ?? 0;
    return matchingCount >= minAnswersPerHex;
  });

  if (eligibleCategories.length < 31) {
    throw new Error(
      `Not enough eligible categories (${eligibleCategories.length}) with at least ${minAnswersPerHex} answers. Need at least 31.`
    );
  }

  let attemptSeed = seed;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const rng = createPRNG(attemptSeed);
    const board = tryGenerateBoard(coords, eligibleCategories, index, rng, minAdjacentIntersectionRatio);
    if (board) {
      return board;
    }
    attemptSeed = Math.floor(attemptSeed + 7919) >>> 0;
  }

  // Fallback: generate best-effort without strict intersection threshold if tight
  const fallbackRng = createPRNG(seed);
  return tryGenerateBoard(coords, eligibleCategories, index, fallbackRng, 0)!;
}

function tryGenerateBoard(
  coords: Array<{ q: number; r: number }>,
  eligibleCategories: Category[],
  index: InvertedIndex,
  rng: () => number,
  minAdjacentIntersectionRatio: number
): HexCell[] | null {
  // Shuffle categories deterministically
  const pool = [...eligibleCategories];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Ensure balance across category types
  const byType = new Map<string, Category[]>();
  for (const cat of pool) {
    if (!byType.has(cat.type)) byType.set(cat.type, []);
    byType.get(cat.type)!.push(cat);
  }

  const selectedCategories: Category[] = [];
  const usedCatIds = new Set<string>();

  // Round robin over types to pick a balanced 31 categories
  const types = Array.from(byType.keys());
  let typeIdx = 0;
  while (selectedCategories.length < 31 && usedCatIds.size < pool.length) {
    const curType = types[typeIdx % types.length];
    const candidates = byType.get(curType) ?? [];
    const cat = candidates.find((c) => !usedCatIds.has(c.id));
    if (cat) {
      usedCatIds.add(cat.id);
      selectedCategories.push(cat);
    }
    typeIdx++;
  }

  // If still need more, fill from remaining
  for (const cat of pool) {
    if (selectedCategories.length >= 31) break;
    if (!usedCatIds.has(cat.id)) {
      usedCatIds.add(cat.id);
      selectedCategories.push(cat);
    }
  }

  if (selectedCategories.length < 31) {
    return null;
  }

  // Place categories onto hexes, prioritizing common entities with neighbors
  const placedCells: HexCell[] = [];
  const remainingCats = [...selectedCategories];

  for (let i = 0; i < coords.length; i++) {
    const coord = coords[i];
    const neighbors = getAxialNeighbors(coord);
    const placedNeighbors = placedCells.filter((c) =>
      neighbors.some((n) => n.q === c.q && n.r === c.r)
    );

    let bestCatIdx = 0;
    let bestScore = -1;

    for (let c = 0; c < remainingCats.length; c++) {
      const candidate = remainingCats[c];
      let score = 0;

      for (const neighbor of placedNeighbors) {
        const common = getCategoryIntersection(candidate.id, neighbor.category.id, index);
        if (common.length > 0) {
          score += common.length;
        }
      }

      // Add a tiny random jitter for variety
      score += rng() * 0.5;

      if (score > bestScore) {
        bestScore = score;
        bestCatIdx = c;
      }
    }

    const [chosen] = remainingCats.splice(bestCatIdx, 1);
    placedCells.push({
      id: `hex_${coord.q}_${coord.r}`,
      q: coord.q,
      r: coord.r,
      category: chosen,
      ownerId: null,
    });
  }

  // Check adjacent intersection ratio
  let totalAdjPairs = 0;
  let intersectingPairs = 0;

  for (let i = 0; i < placedCells.length; i++) {
    const cellA = placedCells[i];
    for (let j = i + 1; j < placedCells.length; j++) {
      const cellB = placedCells[j];
      const dist =
        (Math.abs(cellA.q - cellB.q) +
          Math.abs(cellA.q + cellA.r - cellB.q - cellB.r) +
          Math.abs(cellA.r - cellB.r)) /
        2;
      if (dist === 1) {
        totalAdjPairs++;
        const common = getCategoryIntersection(cellA.category.id, cellB.category.id, index);
        if (common.length > 0) {
          intersectingPairs++;
        }
      }
    }
  }

  const ratio = totalAdjPairs > 0 ? intersectingPairs / totalAdjPairs : 0;
  if (ratio < minAdjacentIntersectionRatio) {
    return null;
  }

  return placedCells;
}
