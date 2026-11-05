import { FOOTBALL_CATEGORIES, FOOTBALL_ENTITIES } from '../src/data/footballDataset';
import { ADDITIONAL_COACHES } from './expand-coaches';
import { ADDITIONAL_PLAYERS } from './expand-players';
import * as fs from 'fs';
import * as path from 'path';

// Known aliases map for existing entities
const ALIASES_MAP: Record<string, string[]> = {
  cr7: ['cr7', 'cristiano', 'ronaldo', 'cr 7'],
  ronaldo_nazario: ['r9', 'il fenomeno', 'fenomeno', 'ronaldo nazario', 'ronaldo'],
  messi: ['leo', 'la pulga', 'leo messi', 'pulga'],
  mbappe: ['kiki', 'mbappe', 'kylian'],
  vinicius: ['vini', 'vini jr', 'vinicius jr'],
  debruyne: ['kdb', 'de bruyne', 'debruyne'],
  ibrahimovic: ['ibra', 'zlatan'],
  inzaghi_pippo: ['pippo', 'pippo inzaghi', 'superpippo'],
  inzaghi_simone: ['simone inzaghi', 'demone di piacenza', 'demone'],
  dibu_martinez: ['dibu', 'dibu martinez'],
  coach_ancelotti: ['carletto', 'ancelotti', 'carlo ancelotti'],
  coach_mourinho: ['special one', 'mou', 'mourinho', 'jose mourinho'],
  coach_guardiola: ['pep', 'pep guardiola', 'guardiola'],
  coach_klopp: ['klopp', 'jurgen klopp'],
  coach_conte: ['conte', 'antonio conte'],
  coach_allegri: ['max', 'allegri', 'max allegri', 'acciuga'],
  coach_spalletti: ['spalletti', 'luciano spalletti'],
  coach_pioli: ['pioli', 'stefano pioli', 'pioli is on fire'],
  coach_gasperini: ['gasp', 'gasperini'],
  coach_zidane: ['zizou', 'zidane', 'zinedine zidane'],
  coach_ferguson: ['sir alex', 'ferguson', 'fergie'],
  coach_lippi: ['lippi', 'marcello lippi'],
  coach_capello: ['capello', 'fabio capello', 'don fabio'],
  coach_sacchi: ['sacchi', 'arrigo sacchi'],
  coach_arteta: ['arteta', 'mikel arteta'],
  coach_mancini: ['mancini', 'mancio', 'roberto mancini'],
  coach_simeone: ['cholo', 'cholo simeone', 'simeone'],
  del_piero: ['alex', 'alex del piero', 'pinturicchio', 'del piero'],
  totti: ['pupone', 'il capitano', 'francesco totti', 'totti'],
  baggio: ['divin codino', 'roby baggio', 'baggio'],
  buffon: ['gigi', 'gigi buffon', 'buffon'],
  pirlo: ['maestro', 'andrea pirlo', 'pirlo'],
  maldini: ['paolo', 'capitano', 'maldini'],
  nesta: ['sandro nesta', 'nesta'],
  cannavaro: ['fabio cannavaro', 'cannavaro'],
  gattuso: ['ringhio', 'ringhio gattuso', 'gattuso'],
  kaka: ['kaka', 'ricardo kaka'],
  shevchenko: ['sheva', 'shevchenko'],
  ronaldinho: ['dinho', 'ronaldinho gaucho'],
  zanetti: ['pupi', 'javier zanetti', 'il trattore'],
  milito: ['el principe', 'principe', 'diego milito'],
  sneijder: ['wesley sneijder', 'sniper'],
  etoo: ['samuel etoo', 'etoo'],
  cambiasso: ['cuchu', 'cambiasso'],
  samuel: ['il muro', 'the wall', 'walter samuel'],
  crespo: ['valdanito', 'hernan crespo'],
  veron: ['la brujita', 'brujita', 'veron'],
  batistuta: ['batigol', 're leone', 'batistuta'],
  zola: ['magic box', 'zola'],
  vialli: ['gianluca vialli', 'lucagol'],
  nedved: ['furia cieca', 'pavel nedved'],
  trezeguet: ['trezegol', 'david trezeguet'],
  rooney: ['wazza', 'rooney'],
  beckham: ['becks', 'david beckham', 'spice boy'],
  scholes: ['ginger prince', 'scholes'],
  giggs: ['ryan giggs'],
  lampard: ['super frank', 'lampard'],
  drogba: ['didier drogba', 'the king'],
  hazard: ['eden hazard'],
  gerrard: ['stevie g', 'gerrard'],
  salah: ['mo salah', 'il faraone', 'faraone'],
  mane: ['sadio mane'],
  vandijk: ['vvd', 'van dijk'],
  alisson: ['alisson becker'],
  kane: ['harry kane', 'hurrikane'],
  son: ['sonny', 'son heung min'],
  bale: ['gareth bale', 'golfista'],
  bellingham: ['belligol', 'jude bellingham'],
  haaland: ['l androide', 'cyborg', 'haaland'],
  lewandowski: ['lewa', 'robert lewandowski'],
  modric: ['luka modric', 'lucas'],
  benzema: ['karim', 'karim the dream', 'benzema'],
  casillas: ['san iker', 'casillas'],
  iniesta: ['don andres', 'l illusionista', 'iniesta'],
  xavi: ['xavi hernandez'],
  busquets: ['sergio busquets', 'busi'],
  pique: ['gerard pique'],
  puyol: ['tarzan', 'carles puyol'],
  suarez: ['el pistolero', 'pistolero', 'luis suarez'],
  neymar: ['ney', 'neymar jr'],
  griezmann: ['le petit prince', 'grizou', 'griezmann'],
  torres: ['el nino', 'fernando torres'],
  neuer: ['manu neuer', 'neuer'],
  muller: ['radio muller', 'thomas muller'],
  robben: ['l uomo di cristallo', 'robben'],
  ribery: ['scarface', 'franck ribery'],
  reus: ['marquito', 'marco reus'],
  hummels: ['mats hummels'],
  gundogan: ['ilkay gundogan'],
  thiago_silva: ['il mostro', 'o monstro'],
  di_maria: ['el fideo', 'fideo', 'angel di maria'],
  cavani: ['el matador', 'matador', 'cavani'],
  higuain: ['el pipita', 'pipita', 'higuain'],
  lavezzi: ['el pocho', 'pocho', 'lavezzi'],
  hamsik: ['marekiaro', 'marek hamsik'],
  koulibaly: ['k2', 'koulibaly'],
  mertens: ['ciro', 'ciro mertens', 'dries mertens'],
  lukaku: ['big rom', 'romelu lukaku'],
  dzeko: ['il cigno di sarajevo', 'edin dzeko'],
  nainggolan: ['il ninja', 'ninja', 'radja nainggolan'],
  pjanic: ['il pianista', 'miralem pjanic'],
  sms: ['il sergente', 'milinkovic savic'],
  papu_gomez: ['il papu', 'papu'],
  balotelli: ['super mario', 'balotelli', 'balo'],
  cassano: ['fantantonio', 'cassano'],
  vieri: ['bobo', 'bobo vieri', 'christian vieri'],
  forlan: ['cacha', 'diego forlan'],
  lookman: ['ademola lookman'],
  cdk: ['charles de ketelaere', 'cdk'],
  dimarco: ['fede dimarco', 'dimash'],
  barella: ['bare', 'nicolo barella'],
  lautaro: ['il toro', 'toro', 'lautaro martinez'],
  calhanoglu: ['hakan calhanoglu', 'calha'],
  thuram_marcus: ['marcus thuram', 'tikus'],
  leao: ['rafa leao', 'leao'],
  theo_hernandez: ['theo', 'theo hernandez'],
  maignan: ['magic mike', 'mike maignan'],
  chiesa: ['fede chiesa', 'chiesa'],
  vlahovic: ['dusan vlahovic'],
  dybala: ['la joya', 'joya', 'paulo dybala'],
  immobile: ['ciro immobile'],
  donnarumma: ['gigio', 'gigio donnarumma'],
  chiellini: ['king kong', 'giorgio chiellini'],
  bonucci: ['bonny', 'leonardo bonucci'],
};

// Enrich existing entities
const existingMap = new Map<string, any>();
for (const e of FOOTBALL_ENTITIES) {
  const aliases = ALIASES_MAP[e.id] || [];
  // Also add surname if not present
  const parts = e.name.split(' ');
  if (parts.length > 1) {
    const surname = parts[parts.length - 1].toLowerCase();
    if (!aliases.includes(surname)) {
      aliases.push(surname);
    }
  }

  existingMap.set(e.id, {
    ...e,
    aliases: Array.from(new Set([...(e.aliases || []), ...aliases])),
  });
}

// Add new coaches
for (const c of ADDITIONAL_COACHES) {
  existingMap.set(c.id, c);
}

// Add new players
for (const p of ADDITIONAL_PLAYERS) {
  existingMap.set(p.id, p);
}

const allEntities = Array.from(existingMap.values());

const outputTS = `import { Dataset, Entity, Category } from '../engine/types';

export const FOOTBALL_CATEGORIES: Category[] = ${JSON.stringify(FOOTBALL_CATEGORIES, null, 2)};

export const FOOTBALL_ENTITIES: Entity[] = ${JSON.stringify(allEntities, null, 2)};

export const FOOTBALL_DATASET: Dataset = {
  sport: 'football',
  name: 'Calcio Mondiale & Club',
  categories: FOOTBALL_CATEGORIES,
  entities: FOOTBALL_ENTITIES,
};
`;

const targetPath = path.resolve(process.cwd(), 'src/data/footballDataset.ts');
fs.writeFileSync(targetPath, outputTS, 'utf-8');

console.log(`Successfully updated ${targetPath}!`);
console.log(`Total entities: ${allEntities.length}`);
console.log(`- Coaches: ${allEntities.filter((e) => e.type === 'coach').length}`);
console.log(`- Players: ${allEntities.filter((e) => e.type === 'player').length}`);
