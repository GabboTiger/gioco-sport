import { describe, it, expect } from 'vitest';
import { matches, buildInvertedIndex, normalizeString } from '../src/engine/matching';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { Category } from '../src/engine/types';

describe('normalizeString', () => {
  it('removes accents and lowercases', () => {
    expect(normalizeString('Kylian Mbappé')).toBe('kylian mbappe');
    expect(normalizeString('Luka Modrić')).toBe('luka modric');
    expect(normalizeString('Zinédine Zidane')).toBe('zinedine zidane');
    expect(normalizeString('  MILAN  ')).toBe('milan');
  });
});

describe('matches', () => {
  const ancelotti = FOOTBALL_DATASET.entities.find((e) => e.id === 'coach_ancelotti')!;
  const messi = FOOTBALL_DATASET.entities.find((e) => e.id === 'messi')!;
  const cr7 = FOOTBALL_DATASET.entities.find((e) => e.id === 'cr7')!;

  it('matches teams correctly', () => {
    const catMilan: Category = {
      id: 'cat_milan',
      label: 'AC Milan',
      sport: 'football',
      type: 'team',
      attributeKey: 'teams',
      expectedValue: 'milan',
    };
    expect(matches(ancelotti, catMilan)).toBe(true);
    expect(matches(cr7, catMilan)).toBe(false);
  });

  it('matches coach role correctly', () => {
    const catCoach: Category = {
      id: 'cat_coach',
      label: 'Coach',
      sport: 'football',
      type: 'role',
      attributeKey: 'type',
      expectedValue: 'coach',
    };
    expect(matches(ancelotti, catCoach)).toBe(true);
    expect(matches(messi, catCoach)).toBe(false);
  });

  it('matches honours correctly', () => {
    const catUcl: Category = {
      id: 'cat_ucl',
      label: 'Champions League',
      sport: 'football',
      type: 'honour',
      attributeKey: 'honours',
      expectedValue: 'champions_league',
    };
    expect(matches(messi, catUcl)).toBe(true);
    expect(matches(cr7, catUcl)).toBe(true);
  });

  it('rejects cross-sport mismatch', () => {
    const catBasket: Category = {
      id: 'cat_b',
      label: 'NBA',
      sport: 'basketball',
      type: 'team',
      attributeKey: 'teams',
      expectedValue: 'lakers',
    };
    expect(matches(messi, catBasket)).toBe(false);
  });
});

describe('buildInvertedIndex', () => {
  it('indexes all categories and entities accurately', () => {
    const index = buildInvertedIndex(FOOTBALL_DATASET);
    expect(index.entityMap.size).toBe(FOOTBALL_DATASET.entities.length);
    expect(index.categoryToEntities.size).toBe(FOOTBALL_DATASET.categories.length);

    const milanEntities = index.categoryToEntities.get('cat_milan');
    expect(milanEntities).toBeDefined();
    expect(milanEntities!.size).toBeGreaterThan(5);
  });
});
