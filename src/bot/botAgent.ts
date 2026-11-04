import { Dataset, GameMove, GameState } from '../engine/types';
import { getLegalMoves } from '../engine/gameEngine';
import { getAdjacentCells } from '../engine/hexGrid';
import { matches } from '../engine/matching';

export interface EvaluatedMove {
  move: GameMove;
  score: number;
  conqueredCount: number;
  stolenCount: number;
}

/**
 * Independent Bot Agent. Evaluates legal moves and selects the best move
 * according to configured difficulty level and knowledge constraints.
 */
export function chooseBotMove(
  state: GameState,
  dataset: Dataset,
  rng: () => number = Math.random
): GameMove | null {
  if (state.phase !== 'playing') return null;

  const activePlayer = state.players[state.activePlayerIndex];
  if (!activePlayer || !activePlayer.isBot) return null;

  const difficulty = activePlayer.botDifficulty ?? 'medium';
  const legalOptions = getLegalMoves(state, dataset);
  if (legalOptions.length === 0) return null;

  // Knowledge probability factor based on difficulty
  const knowledgeThreshold =
    difficulty === 'easy' ? 0.45 : difficulty === 'medium' ? 0.75 : 0.98;

  const candidateMoves: EvaluatedMove[] = [];

  for (const option of legalOptions) {
    const targetHex = state.board.find((h) => h.id === option.hexId);
    if (!targetHex) continue;

    // Filter available entities by bot knowledge
    let knownEntities = option.availableEntities.filter((entity) => {
      // Hard bots know almost all entities; easy bots know only high-popularity stars
      const entityKnowledgeProb = (entity.popularity / 100) * knowledgeThreshold;
      return rng() <= entityKnowledgeProb;
    });

    // Fallback: If bot rolled no known entities, allow at least the highest popularity entity
    if (knownEntities.length === 0) {
      const topEntity = [...option.availableEntities].sort(
        (a, b) => b.popularity - a.popularity
      )[0];
      if (topEntity && (difficulty !== 'easy' || rng() > 0.4)) {
        knownEntities = [topEntity];
      }
    }

    const adjacent = getAdjacentCells(targetHex.id, state.board);

    for (const entity of knownEntities) {
      let score = 1; // 1 for target neutral hex
      let conqueredCount = 1;
      let stolenCount = 0;

      for (const adj of adjacent) {
        if (matches(entity, adj.category)) {
          if (adj.ownerId !== activePlayer.id) {
            conqueredCount++;
            if (adj.ownerId !== null) {
              // Stealing from opponent is extremely valuable
              stolenCount++;
              score += 2.5;
            } else {
              score += 1.2;
            }
          }
        }
      }

      // Hard mode bonus: prioritize hexes that expand existing player cluster
      if (difficulty === 'hard') {
        const friendlyNeighbors = adjacent.filter((h) => h.ownerId === activePlayer.id);
        score += friendlyNeighbors.length * 0.4;
      }

      // Add noise depending on difficulty
      const noise =
        difficulty === 'easy'
          ? (rng() - 0.5) * 4.0
          : difficulty === 'medium'
          ? (rng() - 0.5) * 1.0
          : (rng() - 0.5) * 0.1;

      candidateMoves.push({
        move: {
          playerId: activePlayer.id,
          hexId: targetHex.id,
          entityId: entity.id,
        },
        score: score + noise,
        conqueredCount,
        stolenCount,
      });
    }
  }

  if (candidateMoves.length === 0) {
    // Ultimate fallback if RNG knowledge filtered everything: pick any legal move
    const firstOption = legalOptions[0];
    return {
      playerId: activePlayer.id,
      hexId: firstOption.hexId,
      entityId: firstOption.availableEntities[0].id,
    };
  }

  // Sort descending by score
  candidateMoves.sort((a, b) => b.score - a.score);

  return candidateMoves[0].move;
}
