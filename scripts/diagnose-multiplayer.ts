import { initGameState, applyMove, tick } from '../src/engine/gameEngine';
import { chooseBotMove } from '../src/bot/botAgent';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { GameConfig } from '../src/engine/types';

console.log('--- DIAGNOSI PARTITE 3 E 4 GIOCATORI ---');

// Diagnosi 1: Simulazione partita a 3 giocatori
const config3p: GameConfig = {
  sport: 'football',
  timerDurationSec: 60,
  seed: 12345,
  minAnswersPerHex: 5,
  players: [
    { name: 'Giocatore 1', color: '#0284c7', isBot: true, botDifficulty: 'medium' },
    { name: 'Giocatore 2', color: '#f59e0b', isBot: true, botDifficulty: 'medium' },
    { name: 'Giocatore 3', color: '#10b981', isBot: true, botDifficulty: 'medium' },
  ],
};

let state3p = initGameState(config3p, FOOTBALL_DATASET);
let turns3p = 0;
while (state3p.phase === 'playing' && turns3p < 60) {
  const move = chooseBotMove(state3p, FOOTBALL_DATASET);
  if (!move) break;
  const { nextState } = applyMove(state3p, move, FOOTBALL_DATASET);
  state3p = nextState;
  turns3p++;
}
console.log('3 Giocatori - Turni:', turns3p, 'Fase:', state3p.phase, 'Vincitore:', state3p.winnerId);

// Diagnosi 2: Simulazione partita a 4 giocatori
const config4p: GameConfig = {
  sport: 'football',
  timerDurationSec: 60,
  seed: 98765,
  minAnswersPerHex: 5,
  players: [
    { name: 'Giocatore 1', color: '#0284c7', isBot: true, botDifficulty: 'medium' },
    { name: 'Giocatore 2', color: '#f59e0b', isBot: true, botDifficulty: 'medium' },
    { name: 'Giocatore 3', color: '#10b981', isBot: true, botDifficulty: 'medium' },
    { name: 'Giocatore 4', color: '#ec4899', isBot: true, botDifficulty: 'medium' },
  ],
};

let state4p = initGameState(config4p, FOOTBALL_DATASET);
let turns4p = 0;
while (state4p.phase === 'playing' && turns4p < 60) {
  const move = chooseBotMove(state4p, FOOTBALL_DATASET);
  if (!move) break;
  const { nextState } = applyMove(state4p, move, FOOTBALL_DATASET);
  state4p = nextState;
  turns4p++;
}
console.log('4 Giocatori - Turni:', turns4p, 'Fase:', state4p.phase, 'Vincitore:', state4p.winnerId);

// Diagnosi 3: Timeout di un giocatore in 4 giocatori
console.log('--- Diagnosi Timeout ---');
let stateTimeout = initGameState(config4p, FOOTBALL_DATASET);
// Forziamo il timer del giocatore 1 a 0
stateTimeout = tick(stateTimeout, 60000);
console.log('Dopo timeout P1, turno passato a:', stateTimeout.players[stateTimeout.activePlayerIndex].name, 'P1 time:', stateTimeout.players[0].timeRemainingMs);

// Cosa succede se TUTTI hanno tempo 0?
let allZeroState = {
  ...stateTimeout,
  players: stateTimeout.players.map(p => ({ ...p, timeRemainingMs: 0 }))
};
const tickedAllZero = tick(allZeroState, 1000);
console.log('Tutti a zero, fase attuale:', tickedAllZero.phase);
