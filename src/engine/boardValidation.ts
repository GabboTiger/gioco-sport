import { Dataset, HexCell } from './types';
import { getAdjacentCells } from './hexGrid';
import { buildInvertedIndex, getCategoryIntersection, InvertedIndex } from './matching';

export interface DisjointPair {
  hexAId: string;
  hexBId: string;
  coordA: { q: number; r: number };
  coordB: { q: number; r: number };
  catALabel: string;
  catBLabel: string;
}

export interface BoardValidationResult {
  isValid: boolean;
  totalAdjacentPairs: number;
  connectedPairs: number;
  disjointPairs: DisjointPair[];
  insufficientAnswerHexes: Array<{
    hexId: string;
    categoryLabel: string;
    answerCount: number;
  }>;
  duplicateCategoryIds: string[];
  connectionCounts: Record<string, number>; // key: "hexA <-> hexB" => count of connecting entities
}

/**
 * Validates that every adjacent pair of hexes shares at least one valid entity,
 * each hex has at least minAnswers answers, and no duplicate categories exist.
 */
export function validateBoard(
  board: HexCell[],
  dataset: Dataset,
  minAnswersPerHex: number = 5,
  cachedIndex?: InvertedIndex
): BoardValidationResult {
  const index = cachedIndex || buildInvertedIndex(dataset);

  const disjointPairs: DisjointPair[] = [];
  const connectionCounts: Record<string, number> = {};
  const checkedPairs = new Set<string>();

  let totalAdjacentPairs = 0;
  let connectedPairs = 0;

  // 1. Check all adjacent pairs for non-empty intersection
  for (const cellA of board) {
    const neighbors = getAdjacentCells(cellA.id, board);

    for (const cellB of neighbors) {
      const pairKey = [cellA.id, cellB.id].sort().join(' <-> ');
      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);

      totalAdjacentPairs++;
      const common = getCategoryIntersection(cellA.category.id, cellB.category.id, index);
      connectionCounts[pairKey] = common.length;

      if (common.length === 0) {
        disjointPairs.push({
          hexAId: cellA.id,
          hexBId: cellB.id,
          coordA: { q: cellA.q, r: cellA.r },
          coordB: { q: cellB.q, r: cellB.r },
          catALabel: cellA.category.label,
          catBLabel: cellB.category.label,
        });
      } else {
        connectedPairs++;
      }
    }
  }

  // 2. Check each hex for minimum answers
  const insufficientAnswerHexes: BoardValidationResult['insufficientAnswerHexes'] = [];
  const seenCatIds = new Set<string>();
  const duplicateCategoryIds: string[] = [];

  for (const cell of board) {
    const answerCount = index.categoryToEntities.get(cell.category.id)?.size ?? 0;
    if (answerCount < minAnswersPerHex) {
      insufficientAnswerHexes.push({
        hexId: cell.id,
        categoryLabel: cell.category.label,
        answerCount,
      });
    }

    if (seenCatIds.has(cell.category.id)) {
      if (!duplicateCategoryIds.includes(cell.category.id)) {
        duplicateCategoryIds.push(cell.category.id);
      }
    } else {
      seenCatIds.add(cell.category.id);
    }
  }

  const isValid =
    disjointPairs.length === 0 &&
    insufficientAnswerHexes.length === 0 &&
    duplicateCategoryIds.length === 0;

  return {
    isValid,
    totalAdjacentPairs,
    connectedPairs,
    disjointPairs,
    insufficientAnswerHexes,
    duplicateCategoryIds,
    connectionCounts,
  };
}
