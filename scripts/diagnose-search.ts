import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { matches } from '../src/engine/matching';

// Diagnostic test sample requested in FIX_PROMPT.md
const sampleQueries = [
  'Ronaldo',
  'Vinicius',
  'Ancelotti',
  'Mourinho',
  'De Bruyne',
  'CR7',
  'Vini Jr',
  'KDB',
  'Ibra',
  'Pippo Inzaghi',
  'Dibu',
  'Lewandowsky', // typo
  'Anceloti',    // typo
  'Spaletti',    // typo
  'Gardiola',    // typo
  'Pep',
  'Klopp',
  'Conte',
  'Zidane',
];

import { searchEntities } from '../src/engine/search';

console.log('=== 1. DIAGNOSI RICERCA (NUOVO MODULO SEARCH CON ALIAS E FUZZY) ===');
const entities = FOOTBALL_DATASET.entities;

for (const query of sampleQueries) {
  const results = searchEntities(query, entities);
  if (results.length > 0) {
    const top = results.slice(0, 3).map((r) => `${r.entity.name} [${r.entity.type}] (${r.matchedBy}${r.matchedTerm ? `: ${r.matchedTerm}` : ''})`).join(', ');
    console.log(`✓ "${query}" TROVATO (${results.length}): ${top}`);
  } else {
    console.log(`✗ "${query}" NON TROVATO`);
  }
}

console.log('\n=== 2. ANALISI QUALITÀ DEL DATASET ATTUALE ===');
const coaches = entities.filter((e) => e.type === 'coach');
const players = entities.filter((e) => e.type === 'player');
console.log(`Totale entità: ${entities.length}`);
console.log(`- Calciatori: ${players.length}`);
console.log(`- Allenatori: ${coaches.length}`);

// Entities with missing attributes
const missingTeams = entities.filter((e) => !e.attributes.teams || (e.attributes.teams as string[]).length === 0);
const missingNats = entities.filter((e) => !e.attributes.nationalities || (e.attributes.nationalities as string[]).length === 0);
console.log(`Entità senza squadre: ${missingTeams.length}`);
console.log(`Entità senza nazionalità: ${missingNats.length}`);

// Categories distribution
console.log('\n=== 3. COPERTURA CATEGORIE (Risposte per categoria) ===');
const categoryCounts = FOOTBALL_DATASET.categories.map((cat) => {
  const matchingCount = entities.filter((e) => matches(e, cat)).length;
  return { id: cat.id, label: cat.label, type: cat.type, matchingCount };
});

categoryCounts.sort((a, b) => a.matchingCount - b.matchingCount);
for (const cat of categoryCounts) {
  const warning = cat.matchingCount < 5 ? ' ⚠️ CRITICO (<5 risposte)' : '';
  console.log(`- [${cat.type}] ${cat.label} (${cat.id}): ${cat.matchingCount} risposte valide${warning}`);
}
