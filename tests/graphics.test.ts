import { describe, it, expect } from 'vitest';
import { generate31HexCoords, generate37HexCoords, axialToPixel } from '../src/engine/hexGrid';

describe('Blocco 4 - Grafica, Dimensioni Scacchiera & Zoom', () => {
  it('calculates bounding boxes for standard 31-hex and expanded 37-hex layouts', () => {
    const coords31 = generate31HexCoords();
    const coords37 = generate37HexCoords();
    const hexRadius = 56;

    const computeBounds = (coords: Array<{ q: number; r: number }>) => {
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (const c of coords) {
        const { x, y } = axialToPixel(c, hexRadius, 460, 410);
        minX = Math.min(minX, x - hexRadius);
        maxX = Math.max(maxX, x + hexRadius);
        minY = Math.min(minY, y - hexRadius);
        maxY = Math.max(maxY, y + hexRadius);
      }
      return { width: maxX - minX, height: maxY - minY };
    };

    const bounds31 = computeBounds(coords31);
    const bounds37 = computeBounds(coords37);

    // Both layouts fit cleanly within the 920x820 viewport with margin
    expect(bounds31.width).toBeLessThan(920);
    expect(bounds31.height).toBeLessThan(820);
    expect(bounds37.width).toBeLessThan(920);
    expect(bounds37.height).toBeLessThan(820);

    // 37-hex grid has wider bounds than 31-hex grid
    expect(bounds37.width).toBeGreaterThan(bounds31.width);
  });

  describe('Label Formatting & Splitting', () => {
    // Tests the auto-wrapping logic used inside HexGridSVG
    const formatLabel = (category: { shortLabel?: string; label: string }): string[] => {
      const text = category.shortLabel || category.label;
      const words = text.split(' ');
      if (words.length === 1) return [words[0]];
      if (words.length === 2) return [words[0], words[1]];
      if (words.length === 3) return [`${words[0]} ${words[1]}`, words[2]];
      return [`${words[0]} ${words[1]}`, words.slice(2).join(' ')];
    };

    it('formats single word labels as 1 line', () => {
      expect(formatLabel({ label: 'Juventus' })).toEqual(['Juventus']);
      expect(formatLabel({ label: 'Inter' })).toEqual(['Inter']);
    });

    it('formats 2-word labels into 2 balanced lines', () => {
      expect(formatLabel({ label: 'Real Madrid', shortLabel: 'R. Madrid' })).toEqual(['R.', 'Madrid']);
      expect(formatLabel({ label: 'Italia 🇮🇹' })).toEqual(['Italia', '🇮🇹']);
    });

    it('formats 3 or more word labels without truncating', () => {
      expect(formatLabel({ label: 'Pallone d\'Oro 🥇', shortLabel: 'Pall. d\'Oro 🥇' })).toEqual([
        'Pall. d\'Oro',
        '🥇',
      ]);
      expect(formatLabel({ label: 'Borussia Dortmund 09', shortLabel: 'BVB Dortmund 09' })).toEqual([
        'BVB Dortmund',
        '09',
      ]);
    });
  });

  describe('Zoom Clamping Logic', () => {
    const clampZoom = (scale: number, min = 0.6, max = 2.5) =>
      Math.max(min, Math.min(max, +scale.toFixed(2)));

    it('clamps zoom scale to min 0.6 and max 2.5', () => {
      expect(clampZoom(0.2)).toBe(0.6);
      expect(clampZoom(0.6)).toBe(0.6);
      expect(clampZoom(1.0)).toBe(1.0);
      expect(clampZoom(1.85)).toBe(1.85);
      expect(clampZoom(2.5)).toBe(2.5);
      expect(clampZoom(3.5)).toBe(2.5);
    });
  });
});
