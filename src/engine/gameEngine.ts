import {
  Dataset,
  Entity,
  GameConfig,
  GameMove,
  GamePhase,
  GameState,
  HexCell,
  MoveResult,
  Player,
} from './types';
import { generateBoard } from './boardGenerator';
import { getAdjacentCells } from './hexGrid';
import { buildInvertedIndex, matches } from './matching';

export class EngineError extends Error {
  constructor(
    public readonly code:
      | 'GAME_NOT_PLAYING'
      | 'NOT_YOUR_TURN'
      | 'HEX_NOT_FOUND'
      | 'HEX_NOT_NEUTRAL'
      | 'ENTITY_NOT_FOUND'
      | 'ENTITY_ALREADY_USED'
      | 'ENTITY_DOES_NOT_MATCH',
    message: string
  ) {
    super(message);
    this.name = 'EngineError';
  }
}

/**
 * Initializes a new deterministic game state from config and dataset.
 */
export function initGameState(config: GameConfig, dataset: Dataset): GameState {
  const board = generateBoard(dataset, config.seed, {
    minAnswersPerHex: config.minAnswersPerHex ?? 5,
  });

  const players: Player[] = config.players.map((p, idx) => ({
    id: `p_${idx + 1}`,
    name: p.name,
    color: p.color,
    timeRemainingMs: config.timerDurationSec * 1000,
    isBot: p.isBot,
    botDifficulty: p.botDifficulty,
  }));

  return {
    config,
    board,
    players,
    activePlayerIndex: 0,
    usedEntityIds: [],
    turnCount: 0,
    phase: 'playing',
    winnerId: null,
    history: [],
  };
}

/**
 * Returns all neutral hexes and their available unused matching entities.
 */
export function getLegalMoves(
  state: GameState,
  dataset: Dataset
): Array<{ hexId: string; availableEntities: Entity[] }> {
  if (state.phase !== 'playing') return [];

  const index = buildInvertedIndex(dataset);
  const usedSet = new Set(state.usedEntityIds);
  const results: Array<{ hexId: string; availableEntities: Entity[] }> = [];

  for (const hex of state.board) {
    // In Possession Play, player selects a NEUTRAL hex to start their turn
    if (hex.ownerId !== null) continue;

    const matchingIds = index.categoryToEntities.get(hex.category.id) ?? new Set();
    const availableEntities: Entity[] = [];

    for (const entId of matchingIds) {
      if (!usedSet.has(entId)) {
        const ent = index.entityMap.get(entId);
        if (ent) availableEntities.push(ent);
      }
    }

    if (availableEntities.length > 0) {
      results.push({ hexId: hex.id, availableEntities });
    }
  }

  return results;
}

/**
 * Applies a move deterministically and returns the updated state plus conquest info.
 */
export function applyMove(
  state: GameState,
  move: GameMove,
  dataset: Dataset
): { nextState: GameState; result: MoveResult } {
  if (state.phase !== 'playing') {
    throw new EngineError('GAME_NOT_PLAYING', 'Cannot move when game is not in playing phase');
  }

  const activePlayer = state.players[state.activePlayerIndex];
  if (activePlayer.id !== move.playerId) {
    throw new EngineError(
      'NOT_YOUR_TURN',
      `It is not player ${move.playerId}'s turn (current: ${activePlayer.id})`
    );
  }

  const targetHexIndex = state.board.findIndex((h) => h.id === move.hexId);
  if (targetHexIndex === -1) {
    throw new EngineError('HEX_NOT_FOUND', `Hex ${move.hexId} not found on board`);
  }

  const targetHex = state.board[targetHexIndex];
  if (targetHex.ownerId !== null) {
    throw new EngineError('HEX_NOT_NEUTRAL', `Hex ${move.hexId} is already owned`);
  }

  if (state.usedEntityIds.includes(move.entityId)) {
    throw new EngineError(
      'ENTITY_ALREADY_USED',
      `Entity ${move.entityId} has already been played in this match`
    );
  }

  const entity = dataset.entities.find((e) => e.id === move.entityId);
  if (!entity) {
    throw new EngineError('ENTITY_NOT_FOUND', `Entity ${move.entityId} not found in dataset`);
  }

  if (!matches(entity, targetHex.category)) {
    throw new EngineError(
      'ENTITY_DOES_NOT_MATCH',
      `Entity "${entity.name}" does not match category "${targetHex.category.label}"`
    );
  }

  // Deep clone board for pure state immutability
  const nextBoard: HexCell[] = state.board.map((cell) => ({ ...cell }));
  const conqueredHexIds: string[] = [targetHex.id];
  const stolenHexIds: string[] = [];

  // 1. Conquer target hex
  nextBoard[targetHexIndex] = {
    ...nextBoard[targetHexIndex],
    ownerId: move.playerId,
    conqueredOnTurn: state.turnCount + 1,
  };

  // 2. Check all adjacent hexes for chain conquest / stealing
  const adjacentCells = getAdjacentCells(targetHex.id, nextBoard);
  for (const adj of adjacentCells) {
    // If adjacent hex also matches entity, player claims it!
    if (matches(entity, adj.category)) {
      if (adj.ownerId !== move.playerId) {
        if (adj.ownerId !== null) {
          stolenHexIds.push(adj.id);
        }
        conqueredHexIds.push(adj.id);

        const adjIdx = nextBoard.findIndex((h) => h.id === adj.id);
        nextBoard[adjIdx] = {
          ...nextBoard[adjIdx],
          ownerId: move.playerId,
          conqueredOnTurn: state.turnCount + 1,
        };
      }
    }
  }

  const nextUsedEntityIds = [...state.usedEntityIds, move.entityId];
  const nextTurnCount = state.turnCount + 1;

  // Check game over conditions:
  // 1. All hexes claimed
  const neutralRemaining = nextBoard.filter((h) => h.ownerId === null);
  let isGameOver = neutralRemaining.length === 0;

  // 2. If neutral hexes remain, check if ANY neutral hex still has at least 1 legal unused answer
  if (!isGameOver) {
    const tempState: GameState = {
      ...state,
      board: nextBoard,
      usedEntityIds: nextUsedEntityIds,
    };
    const legal = getLegalMoves(tempState, dataset);
    if (legal.length === 0) {
      isGameOver = true;
    }
  }

  let winnerId: string | 'tie' | null = null;
  let nextPhase: GamePhase = state.phase;

  if (isGameOver) {
    nextPhase = 'game_over';
    winnerId = computeWinner(nextBoard, state.players);
  }

  const nextActiveIndex = (state.activePlayerIndex + 1) % state.players.length;

  const result: MoveResult = {
    move: { ...move, timestamp: Date.now() },
    conqueredHexIds,
    stolenHexIds,
  };

  const nextState: GameState = {
    ...state,
    board: nextBoard,
    usedEntityIds: nextUsedEntityIds,
    turnCount: nextTurnCount,
    phase: nextPhase,
    activePlayerIndex: isGameOver ? state.activePlayerIndex : nextActiveIndex,
    winnerId,
    history: [...state.history, result],
  };

  return { nextState, result };
}

/**
 * Advances timer by dtMs for active player.
 * If time runs out, skips to next player.
 */
export function tick(state: GameState, dtMs: number): GameState {
  if (state.phase !== 'playing') return state;

  const activeIdx = state.activePlayerIndex;
  const activePlayer = state.players[activeIdx];

  const newTime = Math.max(0, activePlayer.timeRemainingMs - dtMs);

  const updatedPlayers = state.players.map((p, idx) =>
    idx === activeIdx ? { ...p, timeRemainingMs: newTime } : p
  );

  // If time hit zero, skip turn
  if (newTime === 0) {
    const nextIdx = (activeIdx + 1) % state.players.length;
    return {
      ...state,
      players: updatedPlayers,
      activePlayerIndex: nextIdx,
    };
  }

  return {
    ...state,
    players: updatedPlayers,
  };
}

/**
 * Computes game winner based on hex count, breaking ties with remaining time.
 */
export function computeWinner(board: HexCell[], players: Player[]): string | 'tie' {
  const scores = new Map<string, number>();
  for (const p of players) {
    scores.set(p.id, 0);
  }

  for (const cell of board) {
    if (cell.ownerId && scores.has(cell.ownerId)) {
      scores.set(cell.ownerId, scores.get(cell.ownerId)! + 1);
    }
  }

  let maxScore = -1;
  let leaderIds: string[] = [];

  for (const [pId, score] of scores.entries()) {
    if (score > maxScore) {
      maxScore = score;
      leaderIds = [pId];
    } else if (score === maxScore) {
      leaderIds.push(pId);
    }
  }

  if (leaderIds.length === 1) {
    return leaderIds[0];
  }

  // Tie-breaker: Highest remaining time
  let maxTime = -1;
  let timeLeaderIds: string[] = [];

  for (const pId of leaderIds) {
    const player = players.find((p) => p.id === pId);
    const time = player?.timeRemainingMs ?? 0;
    if (time > maxTime) {
      maxTime = time;
      timeLeaderIds = [pId];
    } else if (time === maxTime) {
      timeLeaderIds.push(pId);
    }
  }

  if (timeLeaderIds.length === 1) {
    return timeLeaderIds[0];
  }

  return 'tie';
}

/**
 * Returns current score summary (hexes owned by each player and neutral count).
 */
export function getScoreSummary(state: GameState): {
  scores: Record<string, number>;
  neutralCount: number;
} {
  const scores: Record<string, number> = {};
  for (const p of state.players) {
    scores[p.id] = 0;
  }

  let neutralCount = 0;
  for (const cell of state.board) {
    if (cell.ownerId && scores[cell.ownerId] !== undefined) {
      scores[cell.ownerId]++;
    } else {
      neutralCount++;
    }
  }

  return { scores, neutralCount };
}
