import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { buildInvertedIndex, getCategoryIntersection } from '../src/engine/matching';

const index = buildInvertedIndex(FOOTBALL_DATASET);
const cats = FOOTBALL_DATASET.categories;

console.log(`Numero categorie: ${cats.length}`);
let minDegree = 999;
let maxDegree = 0;
let totalDegree = 0;

for (const catA of cats) {
  let connected = 0;
  for (const catB of cats) {
    if (catA.id === catB.id) continue;
    const common = getCategoryIntersection(catA.id, catB.id, index);
    if (common.length > 0) {
      connected++;
    }
  }
  minDegree = Math.min(minDegree, connected);
  maxDegree = Math.max(maxDegree, connected);
  totalDegree += connected;
}

console.log(`Grado medio di connessione tra categorie: ${(totalDegree / cats.length).toFixed(1)} su ${cats.length - 1}`);
console.log(`Min grado: ${minDegree}, Max grado: ${maxDegree}`);
