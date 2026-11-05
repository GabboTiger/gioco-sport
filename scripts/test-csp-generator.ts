import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { generate31HexCoords, getAxialNeighbors, getAdjacentCells } from '../src/engine/hexGrid';
import { buildInvertedIndex, getCategoryIntersection } from '../src/engine/matching';
import { Category, HexCell } from '../src/engine/types';
import { createPRNG } from '../src/engine/boardGenerator';

function generateValidBoardCSP(
  dataset: typeof FOOTBALL_DATASET,
  seed: number,
  minAnswersPerHex: number = 5
): HexCell[] | null {
  const index = buildInvertedIndex(dataset);
  const coords = generate31HexCoords();

  // 1. Filter eligible categories
  const eligible = dataset.categories.filter((cat) => {
    const count = index.categoryToEntities.get(cat.id)?.size ?? 0;
    return count >= minAnswersPerHex;
  });

  if (eligible.length < 31) return null;

  // 2. Precompute compatibility matrix: Map<catId, Set<compatibleCatId>>
  const compat = new Map<string, Set<string>>();
  for (const catA of eligible) {
    const set = new Set<string>();
    for (const catB of eligible) {
      if (catA.id !== catB.id) {
        const common = getCategoryIntersection(catA.id, catB.id, index);
        if (common.length >= 1) {
          set.add(catB.id);
        }
      }
    }
    compat.set(catA.id, set);
  }

  // Sort coordinates by distance from origin (BFS from center)
  const orderedCoords = [...coords].sort((a, b) => {
    const distA = (Math.abs(a.q) + Math.abs(a.q + a.r) + Math.abs(a.r)) / 2;
    const distB = (Math.abs(b.q) + Math.abs(b.q + b.r) + Math.abs(b.r)) / 2;
    if (distA !== distB) return distA - distB;
    if (a.r !== b.r) return a.r - b.r;
    return a.q - b.q;
  });

  // For each position, precompute indices of adjacent positions that appear earlier in orderedCoords
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

  // Attempt generation with restarts
  for (let attempt = 0; attempt < 30; attempt++) {
    const rng = createPRNG(seed + attempt * 7919);
    const assigned: (Category | null)[] = new Array(31).fill(null);
    const usedCatIds = new Set<string>();

    // Backtracking function with step limit
    let steps = 0;
    const maxSteps = 2000;

    function backtrack(pos: number): boolean {
      if (pos === 31) return true;
      if (++steps > maxSteps) return false;

      const prevNeighbors = prevNeighborIndices[pos];

      // Find candidates that are compatible with ALL placed neighbors
      let candidates = eligible.filter((cat) => {
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

      // Score candidates by balance and total intersection with neighbors
      candidates = candidates.map((cat) => {
        let intersectionScore = 0;
        for (const pIdx of prevNeighbors) {
          const placedCat = assigned[pIdx]!;
          intersectionScore += getCategoryIntersection(cat.id, placedCat.id, index).length;
        }
        return { cat, score: intersectionScore + rng() * 3 };
      }).sort((a, b) => b.score - a.score).map((x) => x.cat);

      for (const cat of candidates) {
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
      return orderedCoords.map((coord, idx) => ({
        id: `hex_${coord.q}_${coord.r}`,
        q: coord.q,
        r: coord.r,
        category: assigned[idx]!,
        ownerId: null,
      }));
    }
  }

  return null;
}

console.log('Testing CSP generator across 50 seeds...');
const startTime = Date.now();
let successCount = 0;

for (let s = 1; s <= 50; s++) {
  const board = generateValidBoardCSP(FOOTBALL_DATASET, s * 777);
  if (board) {
    // Verify 100% connectivity
    const index = buildInvertedIndex(FOOTBALL_DATASET);
    let disjoint = 0;
    for (const cell of board) {
      const neighbors = getAdjacentCells(cell.id, board);
      for (const n of neighbors) {
        const common = getCategoryIntersection(cell.category.id, n.category.id, index);
        if (common.length === 0) disjoint++;
      }
    }
    if (disjoint === 0) {
      successCount++;
    }
  }
}

const elapsed = Date.now() - startTime;
console.log(`Success: ${successCount} / 50 boards with 100% ADJACENCY CONNECTIVITY!`);
console.log(`Total time for 50 boards: ${elapsed}ms (${(elapsed / 50).toFixed(1)}ms per board)`);
