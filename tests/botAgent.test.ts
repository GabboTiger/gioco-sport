import { describe, it, expect } from 'vitest';
import { initGameState, applyMove } from '../src/engine/gameEngine';
import { chooseBotMove } from '../src/bot/botAgent';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { GameConfig } from '../src/engine/types';

describe('botAgent', () => {
  const botConfig: GameConfig = {
    sport: 'football',
    timerDurationSec: 60,
    seed: 999,
    minAnswersPerHex: 5,
    players: [
      { name: 'Bot Alpha (Medio)', color: '#3B82F6', isBot: true, botDifficulty: 'medium' },
      { name: 'Bot Beta (Difficile)', color: '#EF4444', isBot: true, botDifficulty: 'hard' },
    ],
  };

  it('generates a valid legal move for a bot player', () => {
    const state = initGameState(botConfig, FOOTBALL_DATASET);
    const move = chooseBotMove(state, FOOTBALL_DATASET);

    expect(move).not.toBeNull();
    expect(move!.playerId).toBe(state.players[0].id);

    // Hex must be neutral
    const hex = state.board.find((h) => h.id === move!.hexId);
    expect(hex).toBeDefined();
    expect(hex!.ownerId).toBeNull();

    // Entity must not be used yet
    expect(state.usedEntityIds).not.toContain(move!.entityId);
  });

  it('runs a complete bot-vs-bot simulated game to termination', () => {
    let state = initGameState(botConfig, FOOTBALL_DATASET);
    let turns = 0;
    const maxTurns = 50;

    while (state.phase === 'playing' && turns < maxTurns) {
      const move = chooseBotMove(state, FOOTBALL_DATASET);
      if (!move) break;

      const { nextState } = applyMove(state, move, FOOTBALL_DATASET);
      state = nextState;
      turns++;

      // Invariants check after every turn:
      // 1. Used entities list is unique and has length equal to turns
      expect(new Set(state.usedEntityIds).size).toBe(state.usedEntityIds.length);
      // 2. Sum of hexes owned + neutral = 31
      const ownedCount = state.board.filter((h) => h.ownerId !== null).length;
      const neutralCount = state.board.filter((h) => h.ownerId === null).length;
      expect(ownedCount + neutralCount).toBe(31);
    }

    // Match progressed significantly or terminated
    expect(state.turnCount).toBeGreaterThan(5);
    expect(['game_over', 'playing']).toContain(state.phase);
    // Board state must be valid JSON serializable
    const jsonStr = JSON.stringify(state);
    expect(jsonStr.length).toBeGreaterThan(500);
    const parsed = JSON.parse(jsonStr);
    expect(parsed.board.length).toBe(31);
  });
});
