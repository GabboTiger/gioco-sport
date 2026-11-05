import { describe, it, expect } from 'vitest';
import { searchEntities, cleanSearchString, levenshteinDistance } from '../src/engine/search';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';

describe('search module', () => {
  describe('cleanSearchString', () => {
    it('normalizes accents, case and punctuation', () => {
      expect(cleanSearchString('Kylian Mbappé')).toBe('kylian mbappe');
      expect(cleanSearchString('Zinédine Zidane')).toBe('zinedine zidane');
      expect(cleanSearchString("Pallone d'Oro")).toBe('pallone d oro');
      expect(cleanSearchString('Vini Jr.')).toBe('vini jr');
    });
  });

  describe('levenshteinDistance', () => {
    it('calculates correct distance between strings', () => {
      expect(levenshteinDistance('ancelotti', 'anceloti')).toBe(1);
      expect(levenshteinDistance('guardiola', 'gardiola')).toBe(1);
      expect(levenshteinDistance('lewandowski', 'lewandowsky')).toBe(1);
      expect(levenshteinDistance('spalletti', 'spaletti')).toBe(1);
    });
  });

  describe('searchEntities with requested benchmark sample', () => {
    const entities = FOOTBALL_DATASET.entities;

    it('finds all exact and standard names', () => {
      const ronaldoResults = searchEntities('Ronaldo', entities);
      expect(ronaldoResults.length).toBeGreaterThanOrEqual(2);
      expect(ronaldoResults.some((r) => r.entity.id === 'cr7')).toBe(true);
      expect(ronaldoResults.some((r) => r.entity.id === 'ronaldo_nazario')).toBe(true);

      const viniciusResults = searchEntities('Vinicius', entities);
      expect(viniciusResults.some((r) => r.entity.id === 'vinicius')).toBe(true);

      const ancelottiResults = searchEntities('Ancelotti', entities);
      expect(ancelottiResults.some((r) => r.entity.id === 'coach_ancelotti')).toBe(true);

      const mourinhoResults = searchEntities('Mourinho', entities);
      expect(mourinhoResults.some((r) => r.entity.id === 'coach_mourinho')).toBe(true);

      const debruyneResults = searchEntities('De Bruyne', entities);
      expect(debruyneResults.some((r) => r.entity.id === 'debruyne')).toBe(true);
    });

    it('finds entities by common aliases and acronyms', () => {
      const cr7 = searchEntities('CR7', entities);
      expect(cr7.length).toBeGreaterThan(0);
      expect(cr7[0].entity.id).toBe('cr7');

      const viniJr = searchEntities('Vini Jr', entities);
      expect(viniJr.length).toBeGreaterThan(0);
      expect(viniJr[0].entity.id).toBe('vinicius');

      const kdb = searchEntities('KDB', entities);
      expect(kdb.length).toBeGreaterThan(0);
      expect(kdb[0].entity.id).toBe('debruyne');

      const ibra = searchEntities('Ibra', entities);
      expect(ibra.length).toBeGreaterThan(0);
      expect(ibra[0].entity.id).toBe('ibrahimovic');

      const pippo = searchEntities('Pippo Inzaghi', entities);
      expect(pippo.length).toBeGreaterThan(0);
      expect(pippo[0].entity.id).toBe('inzaghi_pippo');

      const dibu = searchEntities('Dibu', entities);
      expect(dibu.length).toBeGreaterThan(0);
      expect(dibu[0].entity.id).toBe('dibu_martinez');
    });

    it('tolerates small typos via fuzzy matching', () => {
      const lewaTypo = searchEntities('Lewandowsky', entities);
      expect(lewaTypo.some((r) => r.entity.id === 'lewandowski')).toBe(true);

      const ancelottiTypo = searchEntities('Anceloti', entities);
      expect(ancelottiTypo.some((r) => r.entity.id === 'coach_ancelotti')).toBe(true);

      const spallettiTypo = searchEntities('Spaletti', entities);
      expect(spallettiTypo.some((r) => r.entity.id === 'coach_spalletti')).toBe(true);

      const guardiolaTypo = searchEntities('Gardiola', entities);
      expect(guardiolaTypo.some((r) => r.entity.id === 'coach_guardiola')).toBe(true);
    });

    it('correctly includes and identifies coaches with disambiguation', () => {
      const inzaghiResults = searchEntities('Inzaghi', entities);
      const pippo = inzaghiResults.find((r) => r.entity.id === 'inzaghi_pippo');
      const simone = inzaghiResults.find((r) => r.entity.id === 'coach_inzaghi_simone');

      expect(pippo).toBeDefined();
      expect(simone).toBeDefined();
      expect(pippo!.entity.type).toBe('player');
      expect(simone!.entity.type).toBe('coach');
    });
  });
});
