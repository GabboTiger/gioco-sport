import { describe, it, expect } from 'vitest';
import { initGameState, applyMove, tick, computeWinner } from '../src/engine/gameEngine';
import { chooseBotMove } from '../src/bot/botAgent';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { GameConfig, HexCell, Player } from '../src/engine/types';
import { validateBoard } from '../src/engine/boardValidation';

describe('Blocco 3 - Multiplayer (2, 3, 4 Giocatori) & Grid Size', () => {
  const COLORBLIND_PALETTE = ['#0284c7', '#f59e0b', '#10b981', '#ec4899'];

  describe('Grid Size Configuration', () => {
    it('generates 31 hexes for standard_31', () => {
      const config: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 42,
        gridSize: 'standard_31',
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: false },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: false },
        ],
      };
      const state = initGameState(config, FOOTBALL_DATASET);
      expect(state.board.length).toBe(31);
      const val = validateBoard(state.board, FOOTBALL_DATASET);
      expect(val.isValid).toBe(true);
      expect(val.connectedPairs).toBe(72);
      expect(val.disjointPairs.length).toBe(0);
    });

    it('generates 37 hexes for expanded_37 with 100% adjacent connectivity', () => {
      const config: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 1234,
        gridSize: 'expanded_37',
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: false },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: false },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: false },
          { name: 'P4', color: COLORBLIND_PALETTE[3], isBot: false },
        ],
      };
      const state = initGameState(config, FOOTBALL_DATASET);
      expect(state.board.length).toBe(37);
      const val = validateBoard(state.board, FOOTBALL_DATASET);
      expect(val.isValid).toBe(true);
      expect(val.connectedPairs).toBe(90); // 90 adjacent edges in radius-3 regular hexagon
      expect(val.disjointPairs.length).toBe(0);
    });
  });

  describe('Turn Order & Rotation in 3 and 4 Players', () => {
    it('rotates turns sequentially in 3 and 4 player matches', () => {
      const config4p: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 777,
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: true, botDifficulty: 'medium' },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: true, botDifficulty: 'medium' },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: true, botDifficulty: 'medium' },
          { name: 'P4', color: COLORBLIND_PALETTE[3], isBot: true, botDifficulty: 'medium' },
        ],
      };

      let state = initGameState(config4p, FOOTBALL_DATASET);
      expect(state.activePlayerIndex).toBe(0);

      const m1 = chooseBotMove(state, FOOTBALL_DATASET)!;
      state = applyMove(state, m1, FOOTBALL_DATASET).nextState;
      expect(state.activePlayerIndex).toBe(1);

      const m2 = chooseBotMove(state, FOOTBALL_DATASET)!;
      state = applyMove(state, m2, FOOTBALL_DATASET).nextState;
      expect(state.activePlayerIndex).toBe(2);

      const m3 = chooseBotMove(state, FOOTBALL_DATASET)!;
      state = applyMove(state, m3, FOOTBALL_DATASET).nextState;
      expect(state.activePlayerIndex).toBe(3);

      const m4 = chooseBotMove(state, FOOTBALL_DATASET)!;
      state = applyMove(state, m4, FOOTBALL_DATASET).nextState;
      expect(state.activePlayerIndex).toBe(0);
    });
  });

  describe('Steals from Any Opponent', () => {
    it('allows a player to steal hexes owned by different opponents in the same turn', () => {
      const config3p: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 999,
        players: [
          { name: 'Alice', color: COLORBLIND_PALETTE[0], isBot: false },
          { name: 'Bob', color: COLORBLIND_PALETTE[1], isBot: false },
          { name: 'Charlie', color: COLORBLIND_PALETTE[2], isBot: false },
        ],
      };

      const state = initGameState(config3p, FOOTBALL_DATASET);

      // Find center hex and two adjacent hexes
      const center = state.board.find((h) => h.q === 0 && h.r === 0)!;
      const neighborBob = state.board.find((h) => h.q === 1 && h.r === 0)!;
      const neighborCharlie = state.board.find((h) => h.q === 0 && h.r === 1)!;

      // Assign neighborBob to Bob (p_2) and neighborCharlie to Charlie (p_3)
      neighborBob.ownerId = 'p_2';
      neighborCharlie.ownerId = 'p_3';

      // Pick an entity that matches all three hexes: Cristiano Ronaldo
      const testEntity = FOOTBALL_DATASET.entities.find((e) => e.id === 'cr7')!;
      center.category = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_real_madrid')!;
      neighborBob.category = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_man_utd')!;
      neighborCharlie.category = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_nat_por')!;

      // Alice (p_1) plays on center with Cristiano Ronaldo
      const { nextState, result } = applyMove(
        state,
        { playerId: 'p_1', hexId: center.id, entityId: testEntity.id },
        FOOTBALL_DATASET
      );

      // Alice conquers center and steals from both Bob AND Charlie!
      expect(result.stolenHexIds).toContain(neighborBob.id);
      expect(result.stolenHexIds).toContain(neighborCharlie.id);
      expect(nextState.board.find((h) => h.id === neighborBob.id)!.ownerId).toBe('p_1');
      expect(nextState.board.find((h) => h.id === neighborCharlie.id)!.ownerId).toBe('p_1');
    });
  });

  describe('Timeout Handling in Multiplayer', () => {
    it('skips timed-out players in rotation', () => {
      const config4p: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 101,
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: false },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: false },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: false },
          { name: 'P4', color: COLORBLIND_PALETTE[3], isBot: false },
        ],
      };

      let state = initGameState(config4p, FOOTBALL_DATASET);

      // Force P2 time to 0
      state.players[1].timeRemainingMs = 0;

      // Simulate P1's timer expiring via tick
      state = tick(state, 60000);

      // Turn should skip P2 (who has 0ms) and go directly to P3
      expect(state.activePlayerIndex).toBe(2);
    });

    it('terminates game automatically if ALL players run out of time', () => {
      const config3p: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 102,
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: false },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: false },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: false },
        ],
      };

      let state = initGameState(config3p, FOOTBALL_DATASET);

      // Award 2 hexes to P1, 1 to P2
      state.board[0].ownerId = 'p_1';
      state.board[1].ownerId = 'p_1';
      state.board[2].ownerId = 'p_2';

      // Set all timers to 0
      state.players.forEach((p) => (p.timeRemainingMs = 0));

      // Advance tick
      const tickedState = tick(state, 100);

      expect(tickedState.phase).toBe('game_over');
      expect(tickedState.winnerId).toBe('p_1'); // P1 has 2 hexes vs 1
    });
  });

  describe('Tie Breaker Hierarchy', () => {
    const mockPlayers: Player[] = [
      { id: 'p_1', name: 'Alice', color: '#0284c7', timeRemainingMs: 30000, isBot: false },
      { id: 'p_2', name: 'Bob', color: '#f59e0b', timeRemainingMs: 45000, isBot: false },
    ];

    it('decides winner primarily by hex count', () => {
      const board: HexCell[] = [
        { id: 'h1', q: 0, r: 0, category: {} as any, ownerId: 'p_1' },
        { id: 'h2', q: 1, r: 0, category: {} as any, ownerId: 'p_1' },
        { id: 'h3', q: 0, r: 1, category: {} as any, ownerId: 'p_2' },
      ];

      expect(computeWinner(board, mockPlayers)).toBe('p_1');
    });

    it('breaks ties using remaining time on clock', () => {
      const board: HexCell[] = [
        { id: 'h1', q: 0, r: 0, category: {} as any, ownerId: 'p_1' },
        { id: 'h2', q: 1, r: 0, category: {} as any, ownerId: 'p_2' },
      ];

      // Both have 1 hex. Bob has 45000ms vs Alice 30000ms
      expect(computeWinner(board, mockPlayers)).toBe('p_2');
    });

    it('breaks secondary ties using total stolen hexes from match history', () => {
      const equalTimePlayers: Player[] = [
        { id: 'p_1', name: 'Alice', color: '#0284c7', timeRemainingMs: 30000, isBot: false },
        { id: 'p_2', name: 'Bob', color: '#f59e0b', timeRemainingMs: 30000, isBot: false },
      ];

      const board: HexCell[] = [
        { id: 'h1', q: 0, r: 0, category: {} as any, ownerId: 'p_1' },
        { id: 'h2', q: 1, r: 0, category: {} as any, ownerId: 'p_2' },
      ];

      const history = [
        { move: { playerId: 'p_1', hexId: 'h1', entityId: 'e1' }, conqueredHexIds: ['h1'], stolenHexIds: ['h1'] },
        { move: { playerId: 'p_2', hexId: 'h2', entityId: 'e2' }, conqueredHexIds: ['h2'], stolenHexIds: [] },
      ];

      // Alice stole 1 hex, Bob stole 0
      expect(computeWinner(board, equalTimePlayers, history)).toBe('p_1');
    });

    it('returns official "tie" when all criteria are equal', () => {
      const equalPlayers: Player[] = [
        { id: 'p_1', name: 'Alice', color: '#0284c7', timeRemainingMs: 30000, isBot: false },
        { id: 'p_2', name: 'Bob', color: '#f59e0b', timeRemainingMs: 30000, isBot: false },
      ];

      const board: HexCell[] = [
        { id: 'h1', q: 0, r: 0, category: {} as any, ownerId: 'p_1' },
        { id: 'h2', q: 1, r: 0, category: {} as any, ownerId: 'p_2' },
      ];

      expect(computeWinner(board, equalPlayers, [])).toBe('tie');
    });
  });

  describe('Full Simulated Matches in 2, 3 and 4 Players', () => {
    it('simulates complete 2-player match to game over without invalid states', () => {
      const config: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 2024,
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: true, botDifficulty: 'hard' },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: true, botDifficulty: 'medium' },
        ],
      };

      let state = initGameState(config, FOOTBALL_DATASET);
      let turns = 0;
      while (state.phase === 'playing' && turns < 50) {
        const move = chooseBotMove(state, FOOTBALL_DATASET);
        if (!move) break;
        state = applyMove(state, move, FOOTBALL_DATASET).nextState;
        turns++;
      }

      expect(state.phase).toBe('game_over');
      expect(state.winnerId).not.toBeNull();
      expect(state.turnCount).toBe(turns);
    });

    it('simulates complete 3-player match to game over without invalid states', () => {
      const config: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 3033,
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: true, botDifficulty: 'hard' },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: true, botDifficulty: 'medium' },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: true, botDifficulty: 'easy' },
        ],
      };

      let state = initGameState(config, FOOTBALL_DATASET);
      let turns = 0;
      while (state.phase === 'playing' && turns < 50) {
        const move = chooseBotMove(state, FOOTBALL_DATASET);
        if (!move) break;
        state = applyMove(state, move, FOOTBALL_DATASET).nextState;
        turns++;
      }

      expect(state.phase).toBe('game_over');
      expect(state.winnerId).not.toBeNull();
      expect(state.turnCount).toBe(turns);
    });

    it('simulates complete 4-player match on expanded 37-hex grid to game over', () => {
      const config: GameConfig = {
        sport: 'football',
        timerDurationSec: 60,
        seed: 4044,
        gridSize: 'expanded_37',
        players: [
          { name: 'P1', color: COLORBLIND_PALETTE[0], isBot: true, botDifficulty: 'hard' },
          { name: 'P2', color: COLORBLIND_PALETTE[1], isBot: true, botDifficulty: 'medium' },
          { name: 'P3', color: COLORBLIND_PALETTE[2], isBot: true, botDifficulty: 'medium' },
          { name: 'P4', color: COLORBLIND_PALETTE[3], isBot: true, botDifficulty: 'easy' },
        ],
      };

      let state = initGameState(config, FOOTBALL_DATASET);
      expect(state.board.length).toBe(37);

      let turns = 0;
      while (state.phase === 'playing' && turns < 50) {
        const move = chooseBotMove(state, FOOTBALL_DATASET);
        if (!move) break;
        state = applyMove(state, move, FOOTBALL_DATASET).nextState;
        turns++;
      }

      expect(state.phase).toBe('game_over');
      expect(state.winnerId).not.toBeNull();
      expect(state.turnCount).toBe(turns);
    });
  });
});
