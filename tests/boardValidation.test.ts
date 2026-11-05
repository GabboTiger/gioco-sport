import { describe, it, expect } from 'vitest';
import { generateBoard, BoardGenerationError } from '../src/engine/boardGenerator';
import { validateBoard } from '../src/engine/boardValidation';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { buildInvertedIndex } from '../src/engine/matching';
import { initGameState } from '../src/engine/gameEngine';
import { Dataset, GameConfig, HexCell } from '../src/engine/types';

describe('Board Validation & 100% Adjacency Constraint', () => {
  const index = buildInvertedIndex(FOOTBALL_DATASET);

  it('validates 100% compliance across 200 different random seeds', () => {
    const totalSeeds = 200;
    let totalAdjacenciesChecked = 0;

    for (let i = 1; i <= totalSeeds; i++) {
      const seed = i * 179 + 42;
      const board = generateBoard(FOOTBALL_DATASET, seed, { minAnswersPerHex: 5 });

      const result = validateBoard(board, FOOTBALL_DATASET, 5, index);

      expect(result.isValid).toBe(true);
      expect(result.disjointPairs.length).toBe(0);
      expect(result.insufficientAnswerHexes.length).toBe(0);
      expect(result.duplicateCategoryIds.length).toBe(0);
      expect(result.totalAdjacentPairs).toBe(72);
      expect(result.connectedPairs).toBe(72);

      // Verify connectionCounts map has all 72 pairs with count >= 1
      const pairKeys = Object.keys(result.connectionCounts);
      expect(pairKeys.length).toBe(72);
      for (const count of Object.values(result.connectionCounts)) {
        expect(count).toBeGreaterThanOrEqual(1);
      }

      totalAdjacenciesChecked += result.connectedPairs;
    }

    expect(totalAdjacenciesChecked).toBe(200 * 72);
  });

  it('integrates seamlessly with initGameState at game initialization', () => {
    const config: GameConfig = {
      sport: 'football',
      timerDurationSec: 60,
      seed: 888777,
      minAnswersPerHex: 5,
      players: [
        { name: 'Alice', color: '#10b981', isBot: false },
        { name: 'Bob', color: '#f59e0b', isBot: false },
      ],
    };

    const state = initGameState(config, FOOTBALL_DATASET);
    const validation = validateBoard(state.board, FOOTBALL_DATASET, 5, index);

    expect(validation.isValid).toBe(true);
    expect(validation.disjointPairs).toEqual([]);
    expect(validation.duplicateCategoryIds).toEqual([]);
    expect(validation.insufficientAnswerHexes).toEqual([]);
  });

  describe('Negative / Error Detection Tests', () => {
    it('detects disjoint adjacent pairs (0 shared entities)', () => {
      const board = generateBoard(FOOTBALL_DATASET, 12345, { minAnswersPerHex: 5 });
      // Create a corrupted board by forcing an adjacent hex to have an incompatible category
      const corruptedBoard: HexCell[] = board.map((cell) => ({ ...cell }));

      // Find center cell
      const center = corruptedBoard.find((c) => c.q === 0 && c.r === 0)!;

      // Assign an artificial isolated category
      const isolatedCategory = {
        id: 'isolated_cat_test',
        label: 'Test Isolato',
        sport: 'football',
        type: 'test' as any,
        attributeKey: 'teams',
        expectedValue: 'non_existent_team_xyz',
        description: 'Test category with 0 connections',
      };

      center.category = isolatedCategory;

      const result = validateBoard(corruptedBoard, FOOTBALL_DATASET, 1, index);
      expect(result.isValid).toBe(false);
      expect(result.disjointPairs.length).toBeGreaterThan(0);

      const disjointCenter = result.disjointPairs.find(
        (p) => p.hexAId === center.id || p.hexBId === center.id
      );
      expect(disjointCenter).toBeDefined();
    });

    it('detects duplicate categories on board', () => {
      const board = generateBoard(FOOTBALL_DATASET, 12345, { minAnswersPerHex: 5 });
      const duplicatedBoard: HexCell[] = board.map((cell) => ({ ...cell }));

      // Force cell 1 to have same category as cell 0
      duplicatedBoard[1].category = duplicatedBoard[0].category;

      const result = validateBoard(duplicatedBoard, FOOTBALL_DATASET, 1, index);
      expect(result.isValid).toBe(false);
      expect(result.duplicateCategoryIds).toContain(duplicatedBoard[0].category.id);
    });

    it('detects hexes with insufficient answers', () => {
      const board = generateBoard(FOOTBALL_DATASET, 12345, { minAnswersPerHex: 5 });

      // Run validation requiring a very high minimum (e.g. 50 answers per hex)
      const result = validateBoard(board, FOOTBALL_DATASET, 50, index);
      expect(result.isValid).toBe(false);
      expect(result.insufficientAnswerHexes.length).toBeGreaterThan(0);
      expect(result.insufficientAnswerHexes[0].answerCount).toBeLessThan(50);
    });

    it('throws BoardGenerationError when dataset has fewer than 31 categories with min answers', () => {
      const tinyDataset: Dataset = {
        name: 'Football Test',
        sport: 'football',
        categories: FOOTBALL_DATASET.categories.slice(0, 10), // Only 10 categories
        entities: FOOTBALL_DATASET.entities,
      };

      expect(() => {
        generateBoard(tinyDataset, 99, { minAnswersPerHex: 5 });
      }).toThrowError(BoardGenerationError);
    });
  });
});
