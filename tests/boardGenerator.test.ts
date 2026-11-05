import { describe, it, expect } from 'vitest';
import { generateBoard } from '../src/engine/boardGenerator';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { buildInvertedIndex } from '../src/engine/matching';
import { generate31HexCoords } from '../src/engine/hexGrid';

describe('generate31HexCoords', () => {
  it('generates exactly 31 axial coordinates', () => {
    const coords = generate31HexCoords();
    expect(coords.length).toBe(31);

    // Verify all unique coordinates
    const keys = new Set(coords.map((c) => `${c.q},${c.r}`));
    expect(keys.size).toBe(31);
  });
});

describe('generateBoard', () => {
  const index = buildInvertedIndex(FOOTBALL_DATASET);

  it('generates a valid 31-hex board with unique categories and min answers', () => {
    const board = generateBoard(FOOTBALL_DATASET, 12345, { minAnswersPerHex: 5 });
    expect(board.length).toBe(31);

    // No duplicate categories
    const catIds = new Set(board.map((c) => c.category.id));
    expect(catIds.size).toBe(31);

    // Each hex has at least 5 matching answers in dataset
    for (const cell of board) {
      const matchCount = index.categoryToEntities.get(cell.category.id)?.size ?? 0;
      expect(matchCount).toBeGreaterThanOrEqual(5);
    }
  });

  it('consistently satisfies invariants across 50 different seeds', () => {
    for (let seed = 1; seed <= 50; seed++) {
      const board = generateBoard(FOOTBALL_DATASET, seed * 101, {
        minAnswersPerHex: 5,
      });

      expect(board.length).toBe(31);
      const catIds = new Set(board.map((c) => c.category.id));
      expect(catIds.size).toBe(31);

      for (const cell of board) {
        const matchCount = index.categoryToEntities.get(cell.category.id)?.size ?? 0;
        expect(matchCount).toBeGreaterThanOrEqual(5);
      }
    }
  });
});
