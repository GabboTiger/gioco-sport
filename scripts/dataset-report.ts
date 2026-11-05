import { FOOTBALL_DATASET } from '../src/data/footballDataset';
import { BASKETBALL_DATASET } from '../src/data/basketballDataset';
import { matches } from '../src/engine/matching';
import { Dataset } from '../src/engine/types';

export interface DatasetQualityReport {
  sport: string;
  totalEntities: number;
  playersCount: number;
  coachesCount: number;
  missingAttributes: {
    noTeams: string[];
    noNationalities: string[];
    noPositions: string[];
  };
  categoryCoverage: Array<{
    id: string;
    label: string;
    type: string;
    matchingCount: number;
    isCritical: boolean; // < 5 answers
  }>;
}

export function generateDatasetReport(dataset: Dataset): DatasetQualityReport {
  const { entities, categories, sport } = dataset;

  const players = entities.filter((e) => e.type === 'player');
  const coaches = entities.filter((e) => e.type === 'coach');

  const noTeams = entities
    .filter((e) => !e.attributes.teams && !e.attributes.managedTeams)
    .map((e) => e.name);
  const noNationalities = entities
    .filter((e) => !e.attributes.nationalities || (e.attributes.nationalities as string[]).length === 0)
    .map((e) => e.name);
  const noPositions = players
    .filter((e) => !e.attributes.positions || (e.attributes.positions as string[]).length === 0)
    .map((e) => e.name);

  const categoryCoverage = categories.map((cat) => {
    const matchingCount = entities.filter((e) => matches(e, cat)).length;
    return {
      id: cat.id,
      label: cat.label,
      type: cat.type,
      matchingCount,
      isCritical: matchingCount < 5,
    };
  });

  categoryCoverage.sort((a, b) => a.matchingCount - b.matchingCount);

  return {
    sport,
    totalEntities: entities.length,
    playersCount: players.length,
    coachesCount: coaches.length,
    missingAttributes: {
      noTeams,
      noNationalities,
      noPositions,
    },
    categoryCoverage,
  };
}

if (import.meta.url.endsWith(process.argv[1])) {
  console.log('==============================================');
  console.log('       REPORT DI QUALITÀ DEL DATASET          ');
  console.log('==============================================\n');

  for (const ds of [FOOTBALL_DATASET, BASKETBALL_DATASET]) {
    const report = generateDatasetReport(ds);
    console.log(`=== SPORT: ${report.sport.toUpperCase()} ===`);
    console.log(`Totale entità: ${report.totalEntities}`);
    console.log(`- Calciatori/Atleti: ${report.playersCount}`);
    console.log(`- Allenatori: ${report.coachesCount}`);
    console.log(`- Entità senza squadre: ${report.missingAttributes.noTeams.length}`);
    console.log(`- Entità senza nazionalità: ${report.missingAttributes.noNationalities.length}`);
    console.log(`- Atleti senza posizione: ${report.missingAttributes.noPositions.length}`);

    const criticalCats = report.categoryCoverage.filter((c) => c.isCritical);
    console.log(`\nCopertura Categorie (${report.categoryCoverage.length} categorie totali):`);
    if (criticalCats.length > 0) {
      console.log(`⚠️ ATTENZIONE: ${criticalCats.length} categorie hanno meno di 5 risposte valide!`);
      criticalCats.forEach((c) => console.log(`   * [${c.type}] ${c.label} (${c.id}): ${c.matchingCount} risposte`));
    } else {
      console.log(`✓ Tutte le categorie hanno almeno 5 risposte valide!`);
    }

    console.log(`Top 5 categorie con meno risposte:`);
    report.categoryCoverage.slice(0, 5).forEach((c) => {
      console.log(`   - [${c.type}] ${c.label} (${c.id}): ${c.matchingCount} risposte`);
    });
    console.log('\n----------------------------------------------\n');
  }
}
