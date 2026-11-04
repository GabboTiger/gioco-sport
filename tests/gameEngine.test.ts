import { describe, it, expect } from 'vitest';
import {
  initGameState,
  applyMove,
  tick,
  getLegalMoves,
  computeWinner,
  getScoreSummary,
  EngineError,
} from '../src/engine/gameEngine';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { GameConfig } from '../src/engine/types';
import { getAdjacentCells } from '../src/engine/hexGrid';
import { matches } from '../src/engine/matching';

const baseConfig: GameConfig = {
  sport: 'football',
  timerDurationSec: 60,
  seed: 42,
  minAnswersPerHex: 5,
  players: [
    { name: 'Giocatore 1', color: '#10B981', isBot: false },
    { name: 'Giocatore 2', color: '#F59E0B', isBot: false },
  ],
};

describe('gameEngine', () => {
  it('initializes game state with 31 neutral hexes and turn 0', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    expect(state.board.length).toBe(31);
    expect(state.board.every((h) => h.ownerId === null)).toBe(true);
    expect(state.activePlayerIndex).toBe(0);
    expect(state.players[0].timeRemainingMs).toBe(60000);
    expect(state.phase).toBe('playing');
    expect(state.usedEntityIds.length).toBe(0);
  });

  it('provides legal moves on neutral hexes', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    const legal = getLegalMoves(state, FOOTBALL_DATASET);
    expect(legal.length).toBe(31);
    expect(legal[0].availableEntities.length).toBeGreaterThanOrEqual(5);
  });

  it('applies a valid move, conquering target and matching adjacent hexes', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    const legal = getLegalMoves(state, FOOTBALL_DATASET);
    const firstOption = legal[0];
    const entityToPlay = firstOption.availableEntities[0];

    const { nextState, result } = applyMove(
      state,
      {
        playerId: state.players[0].id,
        hexId: firstOption.hexId,
        entityId: entityToPlay.id,
      },
      FOOTBALL_DATASET
    );

    // Target hex must be owned by Player 1
    const targetCell = nextState.board.find((h) => h.id === firstOption.hexId)!;
    expect(targetCell.ownerId).toBe(state.players[0].id);

    // Entity is now marked used
    expect(nextState.usedEntityIds).toContain(entityToPlay.id);

    // Turn advances to Player 2
    expect(nextState.activePlayerIndex).toBe(1);
    expect(nextState.turnCount).toBe(1);

    // Result records conquests
    expect(result.conqueredHexIds).toContain(firstOption.hexId);
  });

  it('steals opponent hex if adjacent and matching', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    const p1 = state.players[0].id;
    const p2 = state.players[1].id;

    // Pick two adjacent cells A and B
    // We want P1 to own A, then P2 to play on a neutral neighbor C of A, where C's entity also matches A!
    const cellA = state.board[0];
    const adjToA = getAdjacentCells(cellA.id, state.board);
    expect(adjToA.length).toBeGreaterThan(0);
    const cellC = adjToA[0];

    // Find an entity matching cellA that DOES NOT match cellC (so cellC stays neutral for P2 to play on)
    const legalA = getLegalMoves(state, FOOTBALL_DATASET).find((l) => l.hexId === cellA.id)!;
    const entityForA = legalA.availableEntities.find((ent) => !matches(ent, cellC.category)) ?? legalA.availableEntities[0];

    // P1 plays on cellA
    const { nextState: stateAfterP1 } = applyMove(
      state,
      { playerId: p1, hexId: cellA.id, entityId: entityForA.id },
      FOOTBALL_DATASET
    );

    // Verify cellA is owned by P1
    expect(stateAfterP1.board.find((h) => h.id === cellA.id)!.ownerId).toBe(p1);

    // If cellC is still neutral, check if P2 can play on cellC with an entity that matches both C and A
    const legalC = getLegalMoves(stateAfterP1, FOOTBALL_DATASET).find((l) => l.hexId === cellC.id);
    if (legalC) {
      const dualEntity = legalC.availableEntities.find((ent) => matches(ent, cellA.category));
      if (dualEntity) {
        const { nextState: stateAfterP2, result } = applyMove(
          stateAfterP1,
          { playerId: p2, hexId: cellC.id, entityId: dualEntity.id },
          FOOTBALL_DATASET
        );

        // cellA was stolen by P2!
        expect(stateAfterP2.board.find((h) => h.id === cellA.id)!.ownerId).toBe(p2);
        expect(result.stolenHexIds).toContain(cellA.id);
      }
    }
  });

  it('rejects reusing an already played entity', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    const legal = getLegalMoves(state, FOOTBALL_DATASET);
    const entity = legal[0].availableEntities[0];

    const { nextState } = applyMove(
      state,
      { playerId: state.players[0].id, hexId: legal[0].hexId, entityId: entity.id },
      FOOTBALL_DATASET
    );

    // Now it's player 2's turn, trying to reuse the same entity on another legal hex
    const nextLegal = getLegalMoves(nextState, FOOTBALL_DATASET);
    const targetHex = nextLegal.find((l) => matches(entity, nextState.board.find((h) => h.id === l.hexId)!.category));

    if (targetHex) {
      expect(() => {
        applyMove(
          nextState,
          { playerId: nextState.players[1].id, hexId: targetHex.hexId, entityId: entity.id },
          FOOTBALL_DATASET
        );
      }).toThrowError(EngineError);
    }
  });

  it('rejects playing on an already claimed hex', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    const legal = getLegalMoves(state, FOOTBALL_DATASET);
    const { nextState } = applyMove(
      state,
      {
        playerId: state.players[0].id,
        hexId: legal[0].hexId,
        entityId: legal[0].availableEntities[0].id,
      },
      FOOTBALL_DATASET
    );

    expect(() => {
      applyMove(
        nextState,
        {
          playerId: nextState.players[1].id,
          hexId: legal[0].hexId, // Already owned!
          entityId: legal[1].availableEntities[0].id,
        },
        FOOTBALL_DATASET
      );
    }).toThrowError(EngineError);
  });

  it('ticks active player timer and skips turn on timeout', () => {
    let state = initGameState(baseConfig, FOOTBALL_DATASET);
    expect(state.activePlayerIndex).toBe(0);

    state = tick(state, 5000);
    expect(state.players[0].timeRemainingMs).toBe(55000);
    expect(state.players[1].timeRemainingMs).toBe(60000);
    expect(state.activePlayerIndex).toBe(0);

    // Run out player 1's timer
    state = tick(state, 55000);
    expect(state.players[0].timeRemainingMs).toBe(0);
    // Skips to Player 2
    expect(state.activePlayerIndex).toBe(1);
  });

  it('correctly calculates scores and winners', () => {
    const state = initGameState(baseConfig, FOOTBALL_DATASET);
    state.board[0].ownerId = state.players[0].id;
    state.board[1].ownerId = state.players[0].id;
    state.board[2].ownerId = state.players[1].id;

    const summary = getScoreSummary(state);
    expect(summary.scores[state.players[0].id]).toBe(2);
    expect(summary.scores[state.players[1].id]).toBe(1);
    expect(summary.neutralCount).toBe(28);

    const winner = computeWinner(state.board, state.players);
    expect(winner).toBe(state.players[0].id);
  });

  it('supports flood_fill chain conquest of non-adjacent hexes connected by matching intermediate hexes', () => {
    // Messi matches Champions League, Barcelona, and Argentina
    const messi = FOOTBALL_DATASET.entities.find((e) => e.id === 'messi')!;
    const catA = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_barcelona')!;
    const catB = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_ucl')!;
    const catC = FOOTBALL_DATASET.categories.find((c) => c.id === 'cat_nat_arg')!;

    // Create a chain of 3 cells: (0,0) -> (1,0) -> (2,0)
    // (0,0) is adjacent to (1,0)
    // (1,0) is adjacent to (2,0)
    // (0,0) is NOT adjacent to (2,0) (distance = 2)
    const customConfig: GameConfig = {
      ...baseConfig,
      chainConquestMode: 'flood_fill',
    };

    const state = initGameState(customConfig, FOOTBALL_DATASET);
    state.board[0] = { id: 'hex_0_0', q: 0, r: 0, category: catA, ownerId: null };
    state.board[1] = { id: 'hex_1_0', q: 1, r: 0, category: catB, ownerId: null };
    state.board[2] = { id: 'hex_2_0', q: 2, r: 0, category: catC, ownerId: null };

    // Move on hex_0_0 with flood_fill mode
    const { nextState, result } = applyMove(
      state,
      { playerId: state.players[0].id, hexId: 'hex_0_0', entityId: messi.id },
      FOOTBALL_DATASET
    );

    // All 3 hexes must be conquered because hex_2_0 is connected via hex_1_0!
    expect(result.conqueredHexIds).toContain('hex_0_0');
    expect(result.conqueredHexIds).toContain('hex_1_0');
    expect(result.conqueredHexIds).toContain('hex_2_0');
    expect(nextState.board.find((h) => h.id === 'hex_2_0')!.ownerId).toBe(state.players[0].id);

    // Conversely, in 'direct' mode, hex_2_0 would NOT be conquered
    const directConfig: GameConfig = {
      ...baseConfig,
      chainConquestMode: 'direct',
    };
    const directState = initGameState(directConfig, FOOTBALL_DATASET);
    directState.board[0] = { id: 'hex_0_0', q: 0, r: 0, category: catA, ownerId: null };
    directState.board[1] = { id: 'hex_1_0', q: 1, r: 0, category: catB, ownerId: null };
    directState.board[2] = { id: 'hex_2_0', q: 2, r: 0, category: catC, ownerId: null };

    const { result: directResult } = applyMove(
      directState,
      { playerId: directState.players[0].id, hexId: 'hex_0_0', entityId: messi.id },
      FOOTBALL_DATASET
    );

    expect(directResult.conqueredHexIds).toContain('hex_0_0');
    expect(directResult.conqueredHexIds).toContain('hex_1_0');
    expect(directResult.conqueredHexIds).not.toContain('hex_2_0');
  });
});
