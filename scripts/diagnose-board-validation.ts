import { generateBoard } from '../src/engine/boardGenerator';
import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { buildInvertedIndex, getCategoryIntersection } from '../src/engine/matching';
import { getAdjacentCells } from '../src/engine/hexGrid';

console.log('=== DIAGNOSI BLOCCO 2: ADIACENZE SENZA COLLEGAMENTO SULLA GRIGLIA ATTUALE ===\n');

const index = buildInvertedIndex(FOOTBALL_DATASET);
let totalBoardsTested = 50;
let boardsWithZeroLinks = 0;
let totalPairsTested = 0;
let totalDisjointPairs = 0;

for (let seed = 1; seed <= totalBoardsTested; seed++) {
  const board = generateBoard(FOOTBALL_DATASET, seed * 100);
  const checkedPairs = new Set<string>();
  let boardDisjointPairs = 0;

  for (const cell of board) {
    const neighbors = getAdjacentCells(cell.id, board);
    for (const neighbor of neighbors) {
      const pairKey = [cell.id, neighbor.id].sort().join(' <-> ');
      if (checkedPairs.has(pairKey)) continue;
      checkedPairs.add(pairKey);
      totalPairsTested++;

      const common = getCategoryIntersection(cell.category.id, neighbor.category.id, index);
      if (common.length === 0) {
        boardDisjointPairs++;
        totalDisjointPairs++;
      }
    }
  }

  if (boardDisjointPairs > 0) {
    boardsWithZeroLinks++;
    if (boardsWithZeroLinks <= 3) {
      console.log(`Seed ${seed * 100}: ${boardDisjointPairs} coppie adiacenti su ${checkedPairs.size} NON hanno alcun collegamento!`);
    }
  }
}

console.log('\n--- RISULTATO DIAGNOSI ---');
console.log(`Tabelle testate: ${totalBoardsTested}`);
console.log(`Tabelle con almeno una coppia senza collegamento: ${boardsWithZeroLinks} su ${totalBoardsTested} (${Math.round((boardsWithZeroLinks / totalBoardsTested) * 100)}%)`);
console.log(`Totale coppie adiacenti senza collegamento: ${totalDisjointPairs} su ${totalPairsTested} (${Math.round((totalDisjointPairs / totalPairsTested) * 100)}%)`);
