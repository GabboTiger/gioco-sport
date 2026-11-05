import { Dataset, Entity, Category } from '../engine/types';

export const FOOTBALL_CATEGORIES: Category[] = [
  {
    "id": "cat_milan",
    "label": "AC Milan",
    "shortLabel": "Milan",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "milan",
    "description": "Ha militato nell'AC Milan"
  },
  {
    "id": "cat_inter",
    "label": "Inter",
    "shortLabel": "Inter",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "inter",
    "description": "Ha militato nell'Inter"
  },
  {
    "id": "cat_juventus",
    "label": "Juventus",
    "shortLabel": "Juventus",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "juventus",
    "description": "Ha militato nella Juventus"
  },
  {
    "id": "cat_roma",
    "label": "AS Roma",
    "shortLabel": "Roma",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "roma",
    "description": "Ha militato nella Roma"
  },
  {
    "id": "cat_napoli",
    "label": "SSC Napoli",
    "shortLabel": "Napoli",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "napoli",
    "description": "Ha militato nel Napoli"
  },
  {
    "id": "cat_lazio",
    "label": "SS Lazio",
    "shortLabel": "Lazio",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "lazio",
    "description": "Ha militato nella Lazio"
  },
  {
    "id": "cat_atalanta",
    "label": "Atalanta BC",
    "shortLabel": "Atalanta",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "atalanta",
    "description": "Ha militato nell'Atalanta"
  },
  {
    "id": "cat_man_utd",
    "label": "Manchester United",
    "shortLabel": "Man. Utd",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "man_united",
    "description": "Ha giocato nel Manchester United"
  },
  {
    "id": "cat_man_city",
    "label": "Manchester City",
    "shortLabel": "Man. City",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "man_city",
    "description": "Ha giocato nel Manchester City"
  },
  {
    "id": "cat_liverpool",
    "label": "Liverpool FC",
    "shortLabel": "Liverpool",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "liverpool",
    "description": "Ha giocato nel Liverpool"
  },
  {
    "id": "cat_arsenal",
    "label": "Arsenal FC",
    "shortLabel": "Arsenal",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "arsenal",
    "description": "Ha giocato nell'Arsenal"
  },
  {
    "id": "cat_chelsea",
    "label": "Chelsea FC",
    "shortLabel": "Chelsea",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "chelsea",
    "description": "Ha giocato nel Chelsea"
  },
  {
    "id": "cat_tottenham",
    "label": "Tottenham Hotspur",
    "shortLabel": "Spurs",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "tottenham",
    "description": "Ha giocato nel Tottenham"
  },
  {
    "id": "cat_real_madrid",
    "label": "Real Madrid CF",
    "shortLabel": "R. Madrid",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "real_madrid",
    "description": "Ha militato nel Real Madrid"
  },
  {
    "id": "cat_barcelona",
    "label": "FC Barcelona",
    "shortLabel": "Barça",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "barcelona",
    "description": "Ha militato nel Barcelona"
  },
  {
    "id": "cat_atletico",
    "label": "Atlético Madrid",
    "shortLabel": "Atl. Madrid",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "atletico_madrid",
    "description": "Ha militato nell'Atlético Madrid"
  },
  {
    "id": "cat_bayern",
    "label": "Bayern Monaco",
    "shortLabel": "Bayern",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "bayern",
    "description": "Ha militato nel Bayern Monaco"
  },
  {
    "id": "cat_dortmund",
    "label": "Borussia Dortmund",
    "shortLabel": "BVB Dortmund",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "dortmund",
    "description": "Ha militato nel Borussia Dortmund"
  },
  {
    "id": "cat_psg",
    "label": "Paris Saint-Germain",
    "shortLabel": "PSG",
    "sport": "football",
    "type": "team",
    "attributeKey": "teams",
    "expectedValue": "psg",
    "description": "Ha militato nel Paris Saint-Germain"
  },
  {
    "id": "cat_nat_ita",
    "label": "Nazionalità Italiana",
    "shortLabel": "Italia 🇮🇹",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "italy",
    "description": "Ha nazionalità italiana"
  },
  {
    "id": "cat_nat_arg",
    "label": "Nazionalità Argentina",
    "shortLabel": "Argentina 🇦🇷",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "argentina",
    "description": "Ha nazionalità argentina"
  },
  {
    "id": "cat_nat_bra",
    "label": "Nazionalità Brasiliana",
    "shortLabel": "Brasile 🇧🇷",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "brazil",
    "description": "Ha nazionalità brasiliana"
  },
  {
    "id": "cat_nat_fra",
    "label": "Nazionalità Francese",
    "shortLabel": "Francia 🇫🇷",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "france",
    "description": "Ha nazionalità francese"
  },
  {
    "id": "cat_nat_esp",
    "label": "Nazionalità Spagnola",
    "shortLabel": "Spagna 🇪🇸",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "spain",
    "description": "Ha nazionalità spagnola"
  },
  {
    "id": "cat_nat_eng",
    "label": "Nazionalità Inglese",
    "shortLabel": "Inghilterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "england",
    "description": "Ha nazionalità inglese"
  },
  {
    "id": "cat_nat_ger",
    "label": "Nazionalità Tedesca",
    "shortLabel": "Germania 🇩🇪",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "germany",
    "description": "Ha nazionalità tedesca"
  },
  {
    "id": "cat_nat_por",
    "label": "Nazionalità Portoghese",
    "shortLabel": "Portogallo 🇵🇹",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "portugal",
    "description": "Ha nazionalità portoghese"
  },
  {
    "id": "cat_nat_ned",
    "label": "Nazionalità Olandese",
    "shortLabel": "Olanda 🇳🇱",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "netherlands",
    "description": "Ha nazionalità olandese"
  },
  {
    "id": "cat_nat_cro",
    "label": "Nazionalità Croata",
    "shortLabel": "Croazia 🇭🇷",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "croatia",
    "description": "Ha nazionalità croata"
  },
  {
    "id": "cat_nat_bel",
    "label": "Nazionalità Belga",
    "shortLabel": "Belgio 🇧🇪",
    "sport": "football",
    "type": "nationality",
    "attributeKey": "nationalities",
    "expectedValue": "belgium",
    "description": "Ha nazionalità belga"
  },
  {
    "id": "cat_ucl",
    "label": "UEFA Champions League",
    "shortLabel": "UCL 🏆",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "champions_league",
    "description": "Ha vinto la Champions League"
  },
  {
    "id": "cat_world_cup",
    "label": "Coppa del Mondo FIFA",
    "shortLabel": "Mondiale 🌍",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "world_cup",
    "description": "Campione del Mondo con la Nazionale"
  },
  {
    "id": "cat_ballon_dor",
    "label": "Pallone d'Oro",
    "shortLabel": "Pall. d'Oro 🥇",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "ballon_dor",
    "description": "Vincitore del Pallone d'Oro"
  },
  {
    "id": "cat_scudetto",
    "label": "Scudetto Serie A",
    "shortLabel": "Scudetto 🇮🇹",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "scudetto",
    "description": "Campione d'Italia (Serie A)"
  },
  {
    "id": "cat_premier",
    "label": "Premier League",
    "shortLabel": "Premier 🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "premier_league",
    "description": "Campione d'Inghilterra (Premier League)"
  },
  {
    "id": "cat_liga",
    "label": "La Liga Spagnola",
    "shortLabel": "LaLiga 🇪🇸",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "la_liga",
    "description": "Campione di Spagna (La Liga)"
  },
  {
    "id": "cat_euro",
    "label": "Campionato Europeo UEFA",
    "shortLabel": "Euro Naz. 🇪🇺",
    "sport": "football",
    "type": "honour",
    "attributeKey": "honours",
    "expectedValue": "euro",
    "description": "Campione d'Europa con la Nazionale"
  },
  {
    "id": "cat_pos_att",
    "label": "Attaccante / Punta",
    "shortLabel": "Attaccante ⚽",
    "sport": "football",
    "type": "position",
    "attributeKey": "positions",
    "expectedValue": "forward",
    "description": "Ruolo naturale: Attaccante"
  },
  {
    "id": "cat_pos_mid",
    "label": "Centrocampista",
    "shortLabel": "Centrocamp. 🎯",
    "sport": "football",
    "type": "position",
    "attributeKey": "positions",
    "expectedValue": "midfielder",
    "description": "Ruolo naturale: Centrocampista"
  },
  {
    "id": "cat_pos_def",
    "label": "Difensore",
    "shortLabel": "Difensore 🛡️",
    "sport": "football",
    "type": "position",
    "attributeKey": "positions",
    "expectedValue": "defender",
    "description": "Ruolo naturale: Difensore"
  },
  {
    "id": "cat_pos_gk",
    "label": "Portiere",
    "shortLabel": "Portiere 🧤",
    "sport": "football",
    "type": "position",
    "attributeKey": "positions",
    "expectedValue": "goalkeeper",
    "description": "Ruolo naturale: Portiere"
  },
  {
    "id": "cat_role_coach",
    "label": "Allenatore / Mister",
    "shortLabel": "Allenatore 📋",
    "sport": "football",
    "type": "role",
    "attributeKey": "type",
    "expectedValue": "coach",
    "description": "Figura presente come Allenatore"
  }
];

export const FOOTBALL_ENTITIES: Entity[] = [
  {
    "id": "coach_ancelotti",
    "name": "Carlo Ancelotti",
    "type": "coach",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "milan",
        "juventus",
        "chelsea",
        "psg",
        "real_madrid",
        "bayern",
        "roma"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "premier_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Real Madrid"
    },
    "aliases": [
      "carletto",
      "ancelotti",
      "carlo ancelotti"
    ]
  },
  {
    "id": "coach_guardiola",
    "name": "Pep Guardiola",
    "type": "coach",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "barcelona",
        "bayern",
        "man_city",
        "roma"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Spagna",
      "displayClub": "Manchester City"
    },
    "aliases": [
      "pep",
      "pep guardiola",
      "guardiola"
    ]
  },
  {
    "id": "coach_mourinho",
    "name": "José Mourinho",
    "type": "coach",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "chelsea",
        "inter",
        "real_madrid",
        "man_united",
        "tottenham",
        "roma"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "premier_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Portogallo",
      "displayClub": "Fenerbahçe"
    },
    "aliases": [
      "special one",
      "mou",
      "mourinho",
      "jose mourinho"
    ]
  },
  {
    "id": "coach_klopp",
    "name": "Jürgen Klopp",
    "type": "coach",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "dortmund",
        "liverpool"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Germania",
      "displayClub": "Ex Liverpool"
    },
    "aliases": [
      "klopp",
      "jurgen klopp"
    ]
  },
  {
    "id": "coach_conte",
    "name": "Antonio Conte",
    "type": "coach",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "juventus",
        "chelsea",
        "inter",
        "tottenham",
        "napoli"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Napoli"
    },
    "aliases": [
      "conte",
      "antonio conte"
    ]
  },
  {
    "id": "coach_allegri",
    "name": "Massimiliano Allegri",
    "type": "coach",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "milan",
        "juventus"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Ex Juventus"
    },
    "aliases": [
      "max",
      "allegri",
      "max allegri",
      "acciuga"
    ]
  },
  {
    "id": "coach_spalletti",
    "name": "Luciano Spalletti",
    "type": "coach",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "roma",
        "inter",
        "napoli"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Italia",
      "displayClub": "Italia"
    },
    "aliases": [
      "spalletti",
      "luciano spalletti"
    ]
  },
  {
    "id": "coach_inzaghi_simone",
    "name": "Simone Inzaghi",
    "type": "coach",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "lazio",
        "inter",
        "atalanta"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Inter"
    },
    "aliases": [
      "inzaghi"
    ]
  },
  {
    "id": "coach_pioli",
    "name": "Stefano Pioli",
    "type": "coach",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "juventus",
        "inter",
        "lazio",
        "milan",
        "fiorentina"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "defender"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Al-Nassr"
    },
    "aliases": [
      "pioli",
      "stefano pioli",
      "pioli is on fire"
    ]
  },
  {
    "id": "coach_gasperini",
    "name": "Gian Piero Gasperini",
    "type": "coach",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "juventus",
        "inter",
        "atalanta"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "europa_league"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Atalanta"
    },
    "aliases": [
      "gasp",
      "gasperini"
    ]
  },
  {
    "id": "coach_zidane",
    "name": "Zinédine Zidane",
    "type": "coach",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "juventus",
        "real_madrid"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "world_cup",
        "ballon_dor",
        "scudetto",
        "la_liga",
        "euro"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore / Leggenda",
      "displayNationality": "Francia",
      "displayClub": "Real Madrid"
    },
    "aliases": [
      "zizou",
      "zidane",
      "zinedine zidane"
    ]
  },
  {
    "id": "coach_ferguson",
    "name": "Sir Alex Ferguson",
    "type": "coach",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "scotland"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ]
    },
    "metadata": {
      "displayRole": "Leggenda Allenatore",
      "displayNationality": "Scozia",
      "displayClub": "Manchester United"
    },
    "aliases": [
      "sir alex",
      "ferguson",
      "fergie"
    ]
  },
  {
    "id": "coach_lippi",
    "name": "Marcello Lippi",
    "type": "coach",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus",
        "inter",
        "napoli",
        "atalanta"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ]
    },
    "metadata": {
      "displayRole": "Campione del Mondo CT",
      "displayNationality": "Italia",
      "displayClub": "Ex Juventus/Italia"
    },
    "aliases": [
      "lippi",
      "marcello lippi"
    ]
  },
  {
    "id": "coach_capello",
    "name": "Fabio Capello",
    "type": "coach",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "milan",
        "roma",
        "juventus",
        "real_madrid"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Ex Milan/Real"
    },
    "aliases": [
      "capello",
      "fabio capello",
      "don fabio"
    ]
  },
  {
    "id": "coach_sacchi",
    "name": "Arrigo Sacchi",
    "type": "coach",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "milan",
        "atletico_madrid"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ]
    },
    "metadata": {
      "displayRole": "Maestro del Calcio",
      "displayNationality": "Italia",
      "displayClub": "Ex Milan"
    },
    "aliases": [
      "sacchi",
      "arrigo sacchi"
    ]
  },
  {
    "id": "coach_arteta",
    "name": "Mikel Arteta",
    "type": "coach",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "barcelona",
        "psg",
        "arsenal",
        "man_city"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Spagna",
      "displayClub": "Arsenal"
    },
    "aliases": [
      "arteta",
      "mikel arteta"
    ]
  },
  {
    "id": "coach_mancini",
    "name": "Roberto Mancini",
    "type": "coach",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "lazio",
        "inter",
        "man_city"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "premier_league",
        "euro"
      ],
      "positions": [
        "forward"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Ex Inter/City"
    },
    "aliases": [
      "mancini",
      "mancio",
      "roberto mancini"
    ]
  },
  {
    "id": "coach_simeone",
    "name": "Diego Simeone",
    "type": "coach",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "inter",
        "lazio",
        "atletico_madrid"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Argentina",
      "displayClub": "Atlético Madrid"
    },
    "aliases": [
      "cholo",
      "cholo simeone",
      "simeone"
    ]
  },
  {
    "id": "messi",
    "name": "Lionel Messi",
    "type": "player",
    "sport": "football",
    "popularity": 100,
    "attributes": {
      "teams": [
        "barcelona",
        "psg"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "world_cup",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Inter Miami",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "leo",
      "la pulga",
      "leo messi",
      "pulga",
      "messi"
    ]
  },
  {
    "id": "cr7",
    "name": "Cristiano Ronaldo",
    "type": "player",
    "sport": "football",
    "popularity": 100,
    "attributes": {
      "teams": [
        "man_united",
        "real_madrid",
        "juventus"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "premier_league",
        "la_liga",
        "scudetto",
        "euro"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Al-Nassr",
      "displayNationality": "Portogallo"
    },
    "aliases": [
      "cr7",
      "cristiano",
      "ronaldo",
      "cr 7"
    ]
  },
  {
    "id": "mbappe",
    "name": "Kylian Mbappé",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "psg",
        "real_madrid"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "ligue_1",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Francia"
    },
    "aliases": [
      "kiki",
      "mbappe",
      "kylian",
      "mbappé"
    ]
  },
  {
    "id": "haaland",
    "name": "Erling Haaland",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "dortmund",
        "man_city"
      ],
      "nationalities": [
        "norway"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Norvegia"
    },
    "aliases": [
      "l androide",
      "cyborg",
      "haaland"
    ]
  },
  {
    "id": "modric",
    "name": "Luka Modrić",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "tottenham",
        "real_madrid"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Croazia"
    },
    "aliases": [
      "luka modric",
      "lucas",
      "modrić"
    ]
  },
  {
    "id": "benzema",
    "name": "Karim Benzema",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Al-Ittihad",
      "displayNationality": "Francia"
    },
    "aliases": [
      "karim",
      "karim the dream",
      "benzema"
    ]
  },
  {
    "id": "lewandowski",
    "name": "Robert Lewandowski",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "dortmund",
        "bayern",
        "barcelona"
      ],
      "nationalities": [
        "poland"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Polonia"
    },
    "aliases": [
      "lewa",
      "robert lewandowski",
      "lewandowski"
    ]
  },
  {
    "id": "debruyne",
    "name": "Kevin De Bruyne",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "chelsea",
        "man_city"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "kdb",
      "de bruyne",
      "debruyne",
      "bruyne"
    ]
  },
  {
    "id": "lautaro",
    "name": "Lautaro Martínez",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "il toro",
      "toro",
      "lautaro martinez",
      "martínez"
    ]
  },
  {
    "id": "barella",
    "name": "Nicolò Barella",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "euro"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "bare",
      "nicolo barella",
      "barella"
    ]
  },
  {
    "id": "dimarco",
    "name": "Federico Dimarco",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "fede dimarco",
      "dimash",
      "dimarco"
    ]
  },
  {
    "id": "bastoni",
    "name": "Alessandro Bastoni",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "atalanta",
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "euro"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "bastoni"
    ]
  },
  {
    "id": "calhanoglu",
    "name": "Hakan Çalhanoğlu",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "milan",
        "inter"
      ],
      "nationalities": [
        "turkey"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Turchia"
    },
    "aliases": [
      "hakan calhanoglu",
      "calha",
      "çalhanoğlu"
    ]
  },
  {
    "id": "thuram_marcus",
    "name": "Marcus Thuram",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Francia"
    },
    "aliases": [
      "marcus thuram",
      "tikus",
      "thuram"
    ]
  },
  {
    "id": "leao",
    "name": "Rafael Leão",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Portogallo"
    },
    "aliases": [
      "rafa leao",
      "leao",
      "leão"
    ]
  },
  {
    "id": "theo_hernandez",
    "name": "Theo Hernández",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "real_madrid",
        "milan"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Francia"
    },
    "aliases": [
      "theo",
      "theo hernandez",
      "hernández"
    ]
  },
  {
    "id": "maignan",
    "name": "Mike Maignan",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "psg",
        "milan"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "ligue_1",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Francia"
    },
    "aliases": [
      "magic mike",
      "mike maignan",
      "maignan"
    ]
  },
  {
    "id": "pulisic",
    "name": "Christian Pulisic",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "dortmund",
        "chelsea",
        "milan"
      ],
      "nationalities": [
        "usa"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "USA"
    },
    "aliases": [
      "pulisic"
    ]
  },
  {
    "id": "morata",
    "name": "Álvaro Morata",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "real_madrid",
        "juventus",
        "chelsea",
        "atletico_madrid",
        "milan"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga",
        "euro"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "morata"
    ]
  },
  {
    "id": "chiesa",
    "name": "Federico Chiesa",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "juventus",
        "liverpool"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "euro"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Italia"
    },
    "aliases": [
      "fede chiesa",
      "chiesa"
    ]
  },
  {
    "id": "vlahovic",
    "name": "Dušan Vlahović",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "juventus"
      ],
      "nationalities": [
        "serbia"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Juventus",
      "displayNationality": "Serbia"
    },
    "aliases": [
      "dusan vlahovic",
      "vlahović"
    ]
  },
  {
    "id": "koopmeiners",
    "name": "Teun Koopmeiners",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "atalanta",
        "juventus"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Juventus",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "koopmeiners"
    ]
  },
  {
    "id": "osimhen",
    "name": "Victor Osimhen",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "napoli"
      ],
      "nationalities": [
        "nigeria"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Galatasaray",
      "displayNationality": "Nigeria"
    },
    "aliases": [
      "osimhen"
    ]
  },
  {
    "id": "kvara",
    "name": "Khvicha Kvaratskhelia",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "napoli"
      ],
      "nationalities": [
        "georgia"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Napoli",
      "displayNationality": "Georgia"
    },
    "aliases": [
      "kvaratskhelia"
    ]
  },
  {
    "id": "dybala",
    "name": "Paulo Dybala",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus",
        "roma"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "scudetto",
        "world_cup"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Roma",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "la joya",
      "joya",
      "paulo dybala",
      "dybala"
    ]
  },
  {
    "id": "pellegrini",
    "name": "Lorenzo Pellegrini",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "roma"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Roma",
      "displayNationality": "Italia"
    },
    "aliases": [
      "pellegrini"
    ]
  },
  {
    "id": "immobile",
    "name": "Ciro Immobile",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "juventus",
        "dortmund",
        "lazio"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "euro"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Besiktas",
      "displayNationality": "Italia"
    },
    "aliases": [
      "ciro immobile",
      "immobile"
    ]
  },
  {
    "id": "donnarumma",
    "name": "Gianluigi Donnarumma",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "milan",
        "psg"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "euro"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "PSG",
      "displayNationality": "Italia"
    },
    "aliases": [
      "gigio",
      "gigio donnarumma",
      "donnarumma"
    ]
  },
  {
    "id": "buffon",
    "name": "Gianluigi Buffon",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "juventus",
        "psg"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "scudetto"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "gigi",
      "gigi buffon",
      "buffon"
    ]
  },
  {
    "id": "chiellini",
    "name": "Giorgio Chiellini",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus",
        "roma"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "euro"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "king kong",
      "giorgio chiellini",
      "chiellini"
    ]
  },
  {
    "id": "bonucci",
    "name": "Leonardo Bonucci",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "inter",
        "juventus",
        "milan"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto",
        "euro"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "bonny",
      "leonardo bonucci",
      "bonucci"
    ]
  },
  {
    "id": "pirlo",
    "name": "Andrea Pirlo",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "inter",
        "milan",
        "juventus"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "maestro",
      "andrea pirlo",
      "pirlo"
    ]
  },
  {
    "id": "totti",
    "name": "Francesco Totti",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "roma"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "scudetto"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Roma",
      "displayNationality": "Italia"
    },
    "aliases": [
      "pupone",
      "il capitano",
      "francesco totti",
      "totti"
    ]
  },
  {
    "id": "derossi",
    "name": "Daniele De Rossi",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "roma"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Roma",
      "displayNationality": "Italia"
    },
    "aliases": [
      "rossi"
    ]
  },
  {
    "id": "del_piero",
    "name": "Alessandro Del Piero",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "juventus"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Juventus",
      "displayNationality": "Italia"
    },
    "aliases": [
      "alex",
      "alex del piero",
      "pinturicchio",
      "del piero",
      "piero"
    ]
  },
  {
    "id": "maldini",
    "name": "Paolo Maldini",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Milan",
      "displayNationality": "Italia"
    },
    "aliases": [
      "paolo",
      "capitano",
      "maldini"
    ]
  },
  {
    "id": "nesta",
    "name": "Alessandro Nesta",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "lazio",
        "milan"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "sandro nesta",
      "nesta"
    ]
  },
  {
    "id": "cannavaro",
    "name": "Fabio Cannavaro",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "napoli",
        "inter",
        "juventus",
        "real_madrid"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "fabio cannavaro",
      "cannavaro"
    ]
  },
  {
    "id": "inzaghi_pippo",
    "name": "Filippo Inzaghi",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "atalanta",
        "juventus",
        "milan"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "pippo",
      "pippo inzaghi",
      "superpippo",
      "inzaghi"
    ]
  },
  {
    "id": "gattuso",
    "name": "Gennaro Gattuso",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Milan",
      "displayNationality": "Italia"
    },
    "aliases": [
      "ringhio",
      "ringhio gattuso",
      "gattuso"
    ]
  },
  {
    "id": "seedorf",
    "name": "Clarence Seedorf",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "real_madrid",
        "inter",
        "milan"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "seedorf"
    ]
  },
  {
    "id": "kaka",
    "name": "Kaká",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "milan",
        "real_madrid"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "ballon_dor",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "kaka",
      "ricardo kaka"
    ]
  },
  {
    "id": "shevchenko",
    "name": "Andriy Shevchenko",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "milan",
        "chelsea"
      ],
      "nationalities": [
        "ukraine"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Milan",
      "displayNationality": "Ucraina"
    },
    "aliases": [
      "sheva",
      "shevchenko"
    ]
  },
  {
    "id": "ibrahimovic",
    "name": "Zlatan Ibrahimović",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "juventus",
        "inter",
        "barcelona",
        "milan",
        "psg",
        "man_united"
      ],
      "nationalities": [
        "sweden"
      ],
      "honours": [
        "scudetto",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "la_liga",
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Svezia"
    },
    "aliases": [
      "ibra",
      "zlatan",
      "ibrahimović"
    ]
  },
  {
    "id": "ronaldo_nazario",
    "name": "Ronaldo Il Fenomeno",
    "type": "player",
    "sport": "football",
    "popularity": 100,
    "attributes": {
      "teams": [
        "barcelona",
        "inter",
        "real_madrid",
        "milan"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "r9",
      "il fenomeno",
      "fenomeno",
      "ronaldo nazario",
      "ronaldo"
    ]
  },
  {
    "id": "ronaldinho",
    "name": "Ronaldinho",
    "type": "player",
    "sport": "football",
    "popularity": 100,
    "attributes": {
      "teams": [
        "psg",
        "barcelona",
        "milan"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "ballon_dor",
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "ligue_1",
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "dinho",
      "ronaldinho gaucho"
    ]
  },
  {
    "id": "zanetti",
    "name": "Javier Zanetti",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender",
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Inter",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "pupi",
      "javier zanetti",
      "il trattore",
      "zanetti"
    ]
  },
  {
    "id": "milito",
    "name": "Diego Milito",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Inter",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "el principe",
      "principe",
      "diego milito",
      "milito"
    ]
  },
  {
    "id": "sneijder",
    "name": "Wesley Sneijder",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid",
        "inter"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "wesley sneijder",
      "sniper",
      "sneijder"
    ]
  },
  {
    "id": "etoo",
    "name": "Samuel Eto'o",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "real_madrid",
        "barcelona",
        "inter",
        "chelsea"
      ],
      "nationalities": [
        "cameroon"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Camerun"
    },
    "aliases": [
      "samuel etoo",
      "etoo",
      "eto'o"
    ]
  },
  {
    "id": "cambiasso",
    "name": "Esteban Cambiasso",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "real_madrid",
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Inter",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "cuchu",
      "cambiasso"
    ]
  },
  {
    "id": "samuel",
    "name": "Walter Samuel",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "roma",
        "real_madrid",
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "il muro",
      "the wall",
      "walter samuel",
      "samuel"
    ]
  },
  {
    "id": "crespo",
    "name": "Hernán Crespo",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "lazio",
        "inter",
        "chelsea",
        "milan"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "premier_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "valdanito",
      "hernan crespo",
      "crespo"
    ]
  },
  {
    "id": "veron",
    "name": "Juan Sebastián Verón",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "lazio",
        "man_united",
        "chelsea",
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "scudetto",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "la brujita",
      "brujita",
      "veron",
      "verón"
    ]
  },
  {
    "id": "batistuta",
    "name": "Gabriel Batistuta",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "roma",
        "inter"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "batigol",
      "re leone",
      "batistuta"
    ]
  },
  {
    "id": "baggio",
    "name": "Roberto Baggio",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "juventus",
        "milan",
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "ballon_dor",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Divin Codino",
      "displayNationality": "Italia"
    },
    "aliases": [
      "divin codino",
      "roby baggio",
      "baggio"
    ]
  },
  {
    "id": "zola",
    "name": "Gianfranco Zola",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "napoli",
        "chelsea"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "magic box",
      "zola"
    ]
  },
  {
    "id": "vialli",
    "name": "Gianluca Vialli",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "juventus",
        "chelsea"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "gianluca vialli",
      "lucagol",
      "vialli"
    ]
  },
  {
    "id": "ravanelli",
    "name": "Fabrizio Ravanelli",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "juventus",
        "lazio"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "ravanelli"
    ]
  },
  {
    "id": "nedved",
    "name": "Pavel Nedvěd",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "lazio",
        "juventus"
      ],
      "nationalities": [
        "czech"
      ],
      "honours": [
        "ballon_dor",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Juventus",
      "displayNationality": "Rep. Ceca"
    },
    "aliases": [
      "furia cieca",
      "pavel nedved",
      "nedvěd"
    ]
  },
  {
    "id": "trezeguet",
    "name": "David Trezeguet",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "euro",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "ligue_1",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Juventus",
      "displayNationality": "Francia"
    },
    "aliases": [
      "trezegol",
      "david trezeguet",
      "trezeguet"
    ]
  },
  {
    "id": "thuram_lilian",
    "name": "Lilian Thuram",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus",
        "barcelona"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "euro",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Francia"
    },
    "aliases": [
      "thuram"
    ]
  },
  {
    "id": "vieira",
    "name": "Patrick Vieira",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "milan",
        "arsenal",
        "juventus",
        "inter",
        "man_city"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "euro",
        "premier_league",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Francia"
    },
    "aliases": [
      "vieira"
    ]
  },
  {
    "id": "henry",
    "name": "Thierry Henry",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "juventus",
        "arsenal",
        "barcelona"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "premier_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Francia"
    },
    "aliases": [
      "henry"
    ]
  },
  {
    "id": "rooney",
    "name": "Wayne Rooney",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Man United",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "wazza",
      "rooney"
    ]
  },
  {
    "id": "beckham",
    "name": "David Beckham",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "man_united",
        "real_madrid",
        "milan",
        "psg"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "becks",
      "david beckham",
      "spice boy",
      "beckham"
    ]
  },
  {
    "id": "scholes",
    "name": "Paul Scholes",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Man United",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "ginger prince",
      "scholes"
    ]
  },
  {
    "id": "giggs",
    "name": "Ryan Giggs",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "wales"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Man United",
      "displayNationality": "Galles"
    },
    "aliases": [
      "ryan giggs",
      "giggs"
    ]
  },
  {
    "id": "ferdinand",
    "name": "Rio Ferdinand",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Man United",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "ferdinand"
    ]
  },
  {
    "id": "vidic",
    "name": "Nemanja Vidić",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "man_united",
        "inter"
      ],
      "nationalities": [
        "serbia"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Man United",
      "displayNationality": "Serbia"
    },
    "aliases": [
      "vidić"
    ]
  },
  {
    "id": "lampard",
    "name": "Frank Lampard",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "chelsea",
        "man_city"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Chelsea",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "super frank",
      "lampard"
    ]
  },
  {
    "id": "terry",
    "name": "John Terry",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "chelsea"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Chelsea",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "terry"
    ]
  },
  {
    "id": "drogba",
    "name": "Didier Drogba",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "chelsea"
      ],
      "nationalities": [
        "ivory_coast"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Chelsea",
      "displayNationality": "Costa d'Avorio"
    },
    "aliases": [
      "didier drogba",
      "the king",
      "drogba"
    ]
  },
  {
    "id": "cech",
    "name": "Petr Čech",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "chelsea",
        "arsenal"
      ],
      "nationalities": [
        "czech"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Chelsea",
      "displayNationality": "Rep. Ceca"
    },
    "aliases": [
      "čech"
    ]
  },
  {
    "id": "hazard",
    "name": "Eden Hazard",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "chelsea",
        "real_madrid"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "premier_league",
        "la_liga",
        "champions_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Ex Real Madrid",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "eden hazard",
      "hazard"
    ]
  },
  {
    "id": "gerrard",
    "name": "Steven Gerrard",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Liverpool",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "stevie g",
      "gerrard"
    ]
  },
  {
    "id": "salah",
    "name": "Mohamed Salah",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "chelsea",
        "roma",
        "liverpool"
      ],
      "nationalities": [
        "egypt"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Egitto"
    },
    "aliases": [
      "mo salah",
      "il faraone",
      "faraone",
      "salah"
    ]
  },
  {
    "id": "mane",
    "name": "Sadio Mané",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "liverpool",
        "bayern"
      ],
      "nationalities": [
        "senegal"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Al-Nassr",
      "displayNationality": "Senegal"
    },
    "aliases": [
      "sadio mane",
      "mané"
    ]
  },
  {
    "id": "vandijk",
    "name": "Virgil van Dijk",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "vvd",
      "van dijk",
      "dijk"
    ]
  },
  {
    "id": "alisson",
    "name": "Alisson Becker",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "roma",
        "liverpool"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "alisson becker",
      "becker"
    ]
  },
  {
    "id": "kane",
    "name": "Harry Kane",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "tottenham",
        "bayern"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "harry kane",
      "hurrikane",
      "kane"
    ]
  },
  {
    "id": "son",
    "name": "Son Heung-min",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "tottenham"
      ],
      "nationalities": [
        "south_korea"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Tottenham",
      "displayNationality": "Corea del Sud"
    },
    "aliases": [
      "sonny",
      "son heung min",
      "heung-min"
    ]
  },
  {
    "id": "bale",
    "name": "Gareth Bale",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "tottenham",
        "real_madrid"
      ],
      "nationalities": [
        "wales"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Galles"
    },
    "aliases": [
      "gareth bale",
      "golfista",
      "bale"
    ]
  },
  {
    "id": "bergkamp",
    "name": "Dennis Bergkamp",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "inter",
        "arsenal"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Arsenal",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "bergkamp"
    ]
  },
  {
    "id": "ozil",
    "name": "Mesut Özil",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid",
        "arsenal"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Germania"
    },
    "aliases": [
      "özil"
    ]
  },
  {
    "id": "alexis_sanchez",
    "name": "Alexis Sánchez",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "barcelona",
        "arsenal",
        "man_united",
        "inter"
      ],
      "nationalities": [
        "chile"
      ],
      "honours": [
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Udinese",
      "displayNationality": "Cile"
    },
    "aliases": [
      "sánchez"
    ]
  },
  {
    "id": "saka",
    "name": "Bukayo Saka",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "arsenal"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "saka"
    ]
  },
  {
    "id": "bellingham",
    "name": "Jude Bellingham",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "dortmund",
        "real_madrid"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "belligol",
      "jude bellingham",
      "bellingham"
    ]
  },
  {
    "id": "vinicius",
    "name": "Vinícius Júnior",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "vini",
      "vini jr",
      "vinicius jr",
      "júnior"
    ]
  },
  {
    "id": "rodrygo",
    "name": "Rodrygo",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "kroos",
    "name": "Toni Kroos",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "bayern",
        "real_madrid"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real",
      "displayNationality": "Germania"
    },
    "aliases": [
      "kroos"
    ]
  },
  {
    "id": "casemiro",
    "name": "Casemiro",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid",
        "man_united"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester United",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "ramos",
    "name": "Sergio Ramos",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "real_madrid",
        "psg"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "ramos"
    ]
  },
  {
    "id": "marcelo",
    "name": "Marcelo",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "carvajal",
    "name": "Dani Carvajal",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "euro"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "carvajal"
    ]
  },
  {
    "id": "courtois",
    "name": "Thibaut Courtois",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "chelsea",
        "real_madrid"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "courtois"
    ]
  },
  {
    "id": "casillas",
    "name": "Iker Casillas",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real Madrid",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "san iker",
      "casillas"
    ]
  },
  {
    "id": "raul",
    "name": "Raúl",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "real_madrid"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real Madrid",
      "displayNationality": "Spagna"
    },
    "aliases": []
  },
  {
    "id": "iniesta",
    "name": "Andrés Iniesta",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "don andres",
      "l illusionista",
      "iniesta"
    ]
  },
  {
    "id": "xavi",
    "name": "Xavi Hernández",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "xavi hernandez",
      "hernández"
    ]
  },
  {
    "id": "busquets",
    "name": "Sergio Busquets",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Inter Miami",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "sergio busquets",
      "busi",
      "busquets"
    ]
  },
  {
    "id": "pique",
    "name": "Gerard Piqué",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "man_united",
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "gerard pique",
      "piqué"
    ]
  },
  {
    "id": "puyol",
    "name": "Carles Puyol",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "tarzan",
      "carles puyol",
      "puyol"
    ]
  },
  {
    "id": "dani_alves",
    "name": "Dani Alves",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "barcelona",
        "juventus",
        "psg"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "alves"
    ]
  },
  {
    "id": "suarez",
    "name": "Luis Suárez",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "liverpool",
        "barcelona",
        "atletico_madrid"
      ],
      "nationalities": [
        "uruguay"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Inter Miami",
      "displayNationality": "Uruguay"
    },
    "aliases": [
      "el pistolero",
      "pistolero",
      "luis suarez",
      "suárez"
    ]
  },
  {
    "id": "neymar",
    "name": "Neymar Jr",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "barcelona",
        "psg"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Al-Hilal",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "ney",
      "neymar jr",
      "jr"
    ]
  },
  {
    "id": "griezmann",
    "name": "Antoine Griezmann",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "barcelona"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Atlético Madrid",
      "displayNationality": "Francia"
    },
    "aliases": [
      "le petit prince",
      "grizou",
      "griezmann"
    ]
  },
  {
    "id": "torres",
    "name": "Fernando Torres",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "liverpool",
        "chelsea",
        "milan"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "el nino",
      "fernando torres",
      "torres"
    ]
  },
  {
    "id": "godin",
    "name": "Diego Godín",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "inter"
      ],
      "nationalities": [
        "uruguay"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Uruguay"
    },
    "aliases": [
      "godín"
    ]
  },
  {
    "id": "oblak",
    "name": "Jan Oblak",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "atletico_madrid"
      ],
      "nationalities": [
        "slovenia"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Atlético Madrid",
      "displayNationality": "Slovenia"
    },
    "aliases": [
      "oblak"
    ]
  },
  {
    "id": "neuer",
    "name": "Manuel Neuer",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "champions_league"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Germania"
    },
    "aliases": [
      "manu neuer",
      "neuer"
    ]
  },
  {
    "id": "muller",
    "name": "Thomas Müller",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "champions_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Germania"
    },
    "aliases": [
      "radio muller",
      "thomas muller",
      "müller"
    ]
  },
  {
    "id": "schweinsteiger",
    "name": "Bastian Schweinsteiger",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "bayern",
        "man_united"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "champions_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Germania"
    },
    "aliases": [
      "schweinsteiger"
    ]
  },
  {
    "id": "lahm",
    "name": "Philipp Lahm",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup",
        "champions_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Bayern",
      "displayNationality": "Germania"
    },
    "aliases": [
      "lahm"
    ]
  },
  {
    "id": "robben",
    "name": "Arjen Robben",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "chelsea",
        "real_madrid",
        "bayern"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "premier_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "l uomo di cristallo",
      "robben"
    ]
  },
  {
    "id": "ribery",
    "name": "Franck Ribéry",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "bayern",
        "fiorentina"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Francia"
    },
    "aliases": [
      "scarface",
      "franck ribery",
      "ribéry"
    ]
  },
  {
    "id": "reus",
    "name": "Marco Reus",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "dortmund"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "LA Galaxy",
      "displayNationality": "Germania"
    },
    "aliases": [
      "marquito",
      "marco reus",
      "reus"
    ]
  },
  {
    "id": "hummels",
    "name": "Mats Hummels",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "bayern",
        "dortmund",
        "roma"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Roma",
      "displayNationality": "Germania"
    },
    "aliases": [
      "mats hummels",
      "hummels"
    ]
  },
  {
    "id": "gundogan",
    "name": "İlkay Gündoğan",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "dortmund",
        "man_city",
        "barcelona"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Germania"
    },
    "aliases": [
      "ilkay gundogan",
      "gündoğan"
    ]
  },
  {
    "id": "thiago_silva",
    "name": "Thiago Silva",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "milan",
        "psg",
        "chelsea"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Fluminense",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "il mostro",
      "o monstro",
      "silva"
    ]
  },
  {
    "id": "marquinhos",
    "name": "Marquinhos",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "roma",
        "psg"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "PSG",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "verratti",
    "name": "Marco Verratti",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "psg"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "euro"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Al-Arabi",
      "displayNationality": "Italia"
    },
    "aliases": [
      "verratti"
    ]
  },
  {
    "id": "di_maria",
    "name": "Ángel Di María",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "real_madrid",
        "man_united",
        "psg",
        "juventus"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league",
        "ligue_1",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Benfica",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "el fideo",
      "fideo",
      "angel di maria",
      "maría"
    ]
  },
  {
    "id": "cavani",
    "name": "Edinson Cavani",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "napoli",
        "psg",
        "man_united"
      ],
      "nationalities": [
        "uruguay"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "ligue_1",
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Boca Juniors",
      "displayNationality": "Uruguay"
    },
    "aliases": [
      "el matador",
      "matador",
      "cavani"
    ]
  },
  {
    "id": "higuain",
    "name": "Gonzalo Higuaín",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid",
        "napoli",
        "juventus",
        "milan",
        "chelsea"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "el pipita",
      "pipita",
      "higuain",
      "higuaín"
    ]
  },
  {
    "id": "lavezzi",
    "name": "Ezequiel Lavezzi",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "napoli",
        "psg"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "el pocho",
      "pocho",
      "lavezzi"
    ]
  },
  {
    "id": "hamsik",
    "name": "Marek Hamšík",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "napoli"
      ],
      "nationalities": [
        "slovakia"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Napoli",
      "displayNationality": "Slovacchia"
    },
    "aliases": [
      "marekiaro",
      "marek hamsik",
      "hamšík"
    ]
  },
  {
    "id": "koulibaly",
    "name": "Kalidou Koulibaly",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "napoli",
        "chelsea"
      ],
      "nationalities": [
        "senegal"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Al-Hilal",
      "displayNationality": "Senegal"
    },
    "aliases": [
      "k2",
      "koulibaly"
    ]
  },
  {
    "id": "mertens",
    "name": "Dries Mertens",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "napoli"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Galatasaray",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "ciro",
      "ciro mertens",
      "dries mertens",
      "mertens"
    ]
  },
  {
    "id": "lukaku",
    "name": "Romelu Lukaku",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "chelsea",
        "man_united",
        "inter",
        "roma",
        "napoli"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Napoli",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "big rom",
      "romelu lukaku",
      "lukaku"
    ]
  },
  {
    "id": "dzeko",
    "name": "Edin Džeko",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "man_city",
        "roma",
        "inter"
      ],
      "nationalities": [
        "bosnia"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Fenerbahçe",
      "displayNationality": "Bosnia"
    },
    "aliases": [
      "il cigno di sarajevo",
      "edin dzeko",
      "džeko"
    ]
  },
  {
    "id": "nainggolan",
    "name": "Radja Nainggolan",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "roma",
        "inter"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Ex Roma/Inter",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "il ninja",
      "ninja",
      "radja nainggolan",
      "nainggolan"
    ]
  },
  {
    "id": "pjanic",
    "name": "Miralem Pjanić",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "roma",
        "juventus",
        "barcelona"
      ],
      "nationalities": [
        "bosnia"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "ligue_1",
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "CSKA Mosca",
      "displayNationality": "Bosnia"
    },
    "aliases": [
      "il pianista",
      "miralem pjanic",
      "pjanić"
    ]
  },
  {
    "id": "sms",
    "name": "Sergej Milinković-Savić",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "lazio"
      ],
      "nationalities": [
        "serbia"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Al-Hilal",
      "displayNationality": "Serbia"
    },
    "aliases": [
      "il sergente",
      "milinkovic savic",
      "milinković-savić"
    ]
  },
  {
    "id": "luis_alberto",
    "name": "Luis Alberto",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "liverpool",
        "lazio"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Al-Duhail",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "alberto"
    ]
  },
  {
    "id": "duvan_zapata",
    "name": "Duván Zapata",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "napoli",
        "atalanta"
      ],
      "nationalities": [
        "colombia"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Torino",
      "displayNationality": "Colombia"
    },
    "aliases": [
      "zapata"
    ]
  },
  {
    "id": "ilicic",
    "name": "Josip Iličić",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "fiorentina",
        "atalanta"
      ],
      "nationalities": [
        "slovenia"
      ],
      "honours": [],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Maribor",
      "displayNationality": "Slovenia"
    },
    "aliases": [
      "iličić"
    ]
  },
  {
    "id": "papu_gomez",
    "name": "Papu Gómez",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "atalanta"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Ex Atalanta",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "il papu",
      "papu",
      "gómez"
    ]
  },
  {
    "id": "balotelli",
    "name": "Mario Balotelli",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "inter",
        "man_city",
        "milan",
        "liverpool"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Genoa",
      "displayNationality": "Italia"
    },
    "aliases": [
      "super mario",
      "balotelli",
      "balo"
    ]
  },
  {
    "id": "cassano",
    "name": "Antonio Cassano",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "roma",
        "real_madrid",
        "milan",
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Italia"
    },
    "aliases": [
      "fantantonio",
      "cassano"
    ]
  },
  {
    "id": "vieri",
    "name": "Christian Vieri",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "juventus",
        "atletico_madrid",
        "lazio",
        "inter",
        "milan",
        "atalanta"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Bobo",
      "displayNationality": "Italia"
    },
    "aliases": [
      "bobo",
      "bobo vieri",
      "christian vieri",
      "vieri"
    ]
  },
  {
    "id": "forlan",
    "name": "Diego Forlán",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "man_united",
        "atletico_madrid",
        "inter"
      ],
      "nationalities": [
        "uruguay"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Uruguay"
    },
    "aliases": [
      "cacha",
      "diego forlan",
      "forlán"
    ]
  },
  {
    "id": "fofana_youssouf",
    "name": "Youssouf Fofana",
    "type": "player",
    "sport": "football",
    "popularity": 87,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "ligue_1",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Francia"
    },
    "aliases": [
      "fofana"
    ]
  },
  {
    "id": "reijnders",
    "name": "Tijjani Reijnders",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Milan",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "reijnders"
    ]
  },
  {
    "id": "yildiz",
    "name": "Kenan Yıldız",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "bayern",
        "juventus"
      ],
      "nationalities": [
        "turkey"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Juventus",
      "displayNationality": "Turchia"
    },
    "aliases": [
      "yıldız"
    ]
  },
  {
    "id": "locatelli",
    "name": "Manuel Locatelli",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "milan",
        "juventus"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "euro"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Juventus",
      "displayNationality": "Italia"
    },
    "aliases": [
      "locatelli"
    ]
  },
  {
    "id": "cambiaso",
    "name": "Andrea Cambiaso",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "juventus"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [],
      "positions": [
        "defender",
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Juventus",
      "displayNationality": "Italia"
    },
    "aliases": [
      "cambiaso"
    ]
  },
  {
    "id": "lookman",
    "name": "Ademola Lookman",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "atalanta"
      ],
      "nationalities": [
        "nigeria"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "bundesliga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Atalanta",
      "displayNationality": "Nigeria"
    },
    "aliases": [
      "ademola lookman",
      "lookman"
    ]
  },
  {
    "id": "cdk",
    "name": "Charles De Ketelaere",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "milan",
        "atalanta"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Atalanta",
      "displayNationality": "Belgio"
    },
    "aliases": [
      "charles de ketelaere",
      "cdk",
      "ketelaere"
    ]
  },
  {
    "id": "retegui",
    "name": "Mateo Retegui",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "atalanta"
      ],
      "nationalities": [
        "italy",
        "argentina"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Atalanta",
      "displayNationality": "Italia"
    },
    "aliases": [
      "retegui"
    ]
  },
  {
    "id": "scamacca",
    "name": "Gianluca Scamacca",
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "atalanta"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Atalanta",
      "displayNationality": "Italia"
    },
    "aliases": [
      "scamacca"
    ]
  },
  {
    "id": "frattesi",
    "name": "Davide Frattesi",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "roma",
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "frattesi"
    ]
  },
  {
    "id": "zielinski",
    "name": "Piotr Zieliński",
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "napoli",
        "inter"
      ],
      "nationalities": [
        "poland"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Polonia"
    },
    "aliases": [
      "zieliński"
    ]
  },
  {
    "id": "mkhitaryan",
    "name": "Henrikh Mkhitaryan",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "dortmund",
        "man_united",
        "arsenal",
        "roma",
        "inter"
      ],
      "nationalities": [
        "armenia"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Armenia"
    },
    "aliases": [
      "mkhitaryan"
    ]
  },
  {
    "id": "darmian",
    "name": "Matteo Darmian",
    "type": "player",
    "sport": "football",
    "popularity": 89,
    "attributes": {
      "teams": [
        "milan",
        "man_united",
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "darmian"
    ]
  },
  {
    "id": "pavard",
    "name": "Benjamin Pavard",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "bayern",
        "inter"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Francia"
    },
    "aliases": [
      "pavard"
    ]
  },
  {
    "id": "sommer",
    "name": "Yann Sommer",
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "bayern",
        "inter"
      ],
      "nationalities": [
        "switzerland"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "bundesliga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Inter",
      "displayNationality": "Svizzera"
    },
    "aliases": [
      "sommer"
    ]
  },
  {
    "id": "szczesny",
    "name": "Wojciech Szczęsny",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "arsenal",
        "roma",
        "juventus",
        "barcelona"
      ],
      "nationalities": [
        "poland"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "premier_league",
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Polonia"
    },
    "aliases": [
      "szczęsny"
    ]
  },
  {
    "id": "pogba",
    "name": "Paul Pogba",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "man_united",
        "juventus"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Ex Juventus",
      "displayNationality": "Francia"
    },
    "aliases": [
      "pogba"
    ]
  },
  {
    "id": "vidal",
    "name": "Arturo Vidal",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "juventus",
        "bayern",
        "barcelona",
        "inter"
      ],
      "nationalities": [
        "chile"
      ],
      "honours": [
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Colo-Colo",
      "displayNationality": "Cile"
    },
    "aliases": [
      "vidal"
    ]
  },
  {
    "id": "tevez",
    "name": "Carlos Tevez",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "man_united",
        "man_city",
        "juventus"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "champions_league",
        "premier_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "tevez"
    ]
  },
  {
    "id": "mandzukic",
    "name": "Mario Mandžukić",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "bayern",
        "atletico_madrid",
        "juventus",
        "milan"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Croazia"
    },
    "aliases": [
      "mandžukić"
    ]
  },
  {
    "id": "perisic",
    "name": "Ivan Perišić",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "dortmund",
        "inter",
        "bayern",
        "tottenham"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "PSV",
      "displayNationality": "Croazia"
    },
    "aliases": [
      "perišić"
    ]
  },
  {
    "id": "brozovic",
    "name": "Marcelo Brozović",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Al-Nassr",
      "displayNationality": "Croazia"
    },
    "aliases": [
      "brozović"
    ]
  },
  {
    "id": "kovacic",
    "name": "Mateo Kovačić",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "inter",
        "real_madrid",
        "chelsea",
        "man_city"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Croazia"
    },
    "aliases": [
      "kovačić"
    ]
  },
  {
    "id": "rodri",
    "name": "Rodri",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "man_city"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "premier_league",
        "euro"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Spagna"
    },
    "aliases": []
  },
  {
    "id": "bernardo_silva",
    "name": "Bernardo Silva",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Portogallo"
    },
    "aliases": [
      "silva"
    ]
  },
  {
    "id": "ruben_dias",
    "name": "Rúben Dias",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Portogallo"
    },
    "aliases": [
      "dias"
    ]
  },
  {
    "id": "foden",
    "name": "Phil Foden",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "foden"
    ]
  },
  {
    "id": "walker",
    "name": "Kyle Walker",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "tottenham",
        "man_city"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "walker"
    ]
  },
  {
    "id": "ederson",
    "name": "Ederson",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "trent",
    "name": "Trent Alexander-Arnold",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "alexander-arnold"
    ]
  },
  {
    "id": "robertson",
    "name": "Andrew Robertson",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "scotland"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Scozia"
    },
    "aliases": [
      "robertson"
    ]
  },
  {
    "id": "rice",
    "name": "Declan Rice",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "arsenal"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "rice"
    ]
  },
  {
    "id": "odegaard",
    "name": "Martin Ødegaard",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid",
        "arsenal"
      ],
      "nationalities": [
        "norway"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Norvegia"
    },
    "aliases": [
      "ødegaard"
    ]
  },
  {
    "id": "saliba",
    "name": "William Saliba",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "arsenal"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Francia"
    },
    "aliases": [
      "saliba"
    ]
  },
  {
    "id": "havertz",
    "name": "Kai Havertz",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "chelsea",
        "arsenal"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Germania"
    },
    "aliases": [
      "havertz"
    ]
  },
  {
    "id": "palmer",
    "name": "Cole Palmer",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_city",
        "chelsea"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Chelsea",
      "displayNationality": "Inghilterra"
    },
    "aliases": [
      "palmer"
    ]
  },
  {
    "id": "enzo_fernandez",
    "name": "Enzo Fernández",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "chelsea"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Chelsea",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "fernández"
    ]
  },
  {
    "id": "yamal",
    "name": "Lamine Yamal",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "euro",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": [
      "yamal"
    ]
  },
  {
    "id": "pedri",
    "name": "Pedri",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "euro",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": []
  },
  {
    "id": "gavi",
    "name": "Gavi",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Spagna"
    },
    "aliases": []
  },
  {
    "id": "frenkie_dejong",
    "name": "Frenkie de Jong",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Olanda"
    },
    "aliases": [
      "jong"
    ]
  },
  {
    "id": "raphinha",
    "name": "Raphinha",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "ter_stegen",
    "name": "Marc-André ter Stegen",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Barcelona",
      "displayNationality": "Germania"
    },
    "aliases": [
      "stegen"
    ]
  },
  {
    "id": "valverde",
    "name": "Federico Valverde",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "uruguay"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Uruguay"
    },
    "aliases": [
      "valverde"
    ]
  },
  {
    "id": "camavinga",
    "name": "Eduardo Camavinga",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder",
        "defender"
      ],
      "leagues": [
        "ligue_1",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Francia"
    },
    "aliases": [
      "camavinga"
    ]
  },
  {
    "id": "tchouameni",
    "name": "Aurélien Tchouaméni",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "ligue_1",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Francia"
    },
    "aliases": [
      "tchouaméni"
    ]
  },
  {
    "id": "rudiger",
    "name": "Antonio Rüdiger",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "roma",
        "chelsea",
        "real_madrid"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Germania"
    },
    "aliases": [
      "rüdiger"
    ]
  },
  {
    "id": "alaba",
    "name": "David Alaba",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "bayern",
        "real_madrid"
      ],
      "nationalities": [
        "austria"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Real Madrid",
      "displayNationality": "Austria"
    },
    "aliases": [
      "alaba"
    ]
  },
  {
    "id": "musiala",
    "name": "Jamal Musiala",
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Germania"
    },
    "aliases": [
      "musiala"
    ]
  },
  {
    "id": "wirtz",
    "name": "Florian Wirtz",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "leverkusen"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayer Leverkusen",
      "displayNationality": "Germania"
    },
    "aliases": [
      "wirtz"
    ]
  },
  {
    "id": "davies",
    "name": "Alphonso Davies",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "canada"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Canada"
    },
    "aliases": [
      "davies"
    ]
  },
  {
    "id": "kimmich",
    "name": "Joshua Kimmich",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "midfielder",
        "defender"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Germania"
    },
    "aliases": [
      "kimmich"
    ]
  },
  {
    "id": "sane",
    "name": "Leroy Sané",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "man_city",
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Germania"
    },
    "aliases": [
      "sané"
    ]
  },
  {
    "id": "coman",
    "name": "Kingsley Coman",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "psg",
        "juventus",
        "bayern"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "ligue_1",
        "serie_a",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco",
      "displayNationality": "Francia"
    },
    "aliases": [
      "coman"
    ]
  },
  {
    "id": "dembele",
    "name": "Ousmane Dembélé",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "dortmund",
        "barcelona",
        "psg"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "PSG",
      "displayNationality": "Francia"
    },
    "aliases": [
      "dembélé"
    ]
  },
  {
    "id": "hakimi",
    "name": "Achraf Hakimi",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid",
        "dortmund",
        "inter",
        "psg"
      ],
      "nationalities": [
        "morocco"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "bundesliga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "PSG",
      "displayNationality": "Marocco"
    },
    "aliases": [
      "hakimi"
    ]
  },
  {
    "id": "kante",
    "name": "N'Golo Kanté",
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "chelsea"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Al-Ittihad",
      "displayNationality": "Francia"
    },
    "aliases": [
      "kanté"
    ]
  },
  {
    "id": "jorginho",
    "name": "Jorginho",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "napoli",
        "chelsea",
        "arsenal"
      ],
      "nationalities": [
        "italy",
        "brazil"
      ],
      "honours": [
        "euro",
        "champions_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Arsenal",
      "displayNationality": "Italia"
    },
    "aliases": []
  },
  {
    "id": "materazzi",
    "name": "Marco Materazzi",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Inter",
      "displayNationality": "Italia"
    },
    "aliases": [
      "materazzi"
    ]
  },
  {
    "id": "julio_cesar",
    "name": "Júlio César",
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "inter"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Inter",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "césar"
    ]
  },
  {
    "id": "maicon",
    "name": "Maicon",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "inter",
        "man_city",
        "roma"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "cafu",
    "name": "Cafu",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "roma",
        "milan"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "roberto_carlos",
    "name": "Roberto Carlos",
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "inter",
        "real_madrid"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": [
      "carlos"
    ]
  },
  {
    "id": "rivaldo",
    "name": "Rivaldo",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "barcelona",
        "milan"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "ballon_dor",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "romario",
    "name": "Romário",
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [
        "world_cup",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Brasile"
    },
    "aliases": []
  },
  {
    "id": "mac_allister",
    "name": "Alexis Mac Allister",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "allister"
    ]
  },
  {
    "id": "julian_alvarez",
    "name": "Julián Álvarez",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_city",
        "atletico_madrid"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup",
        "champions_league",
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Atlético Madrid",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "álvarez"
    ]
  },
  {
    "id": "dibu_martinez",
    "name": "Emiliano Martínez",
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "arsenal"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Aston Villa",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "dibu",
      "dibu martinez",
      "martínez"
    ]
  },
  {
    "id": "cuti_romero",
    "name": "Cristian Romero",
    "type": "player",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "juventus",
        "atalanta",
        "tottenham"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Tottenham",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "romero"
    ]
  },
  {
    "id": "de_paul",
    "name": "Rodrigo De Paul",
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "atletico_madrid"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Atlético Madrid",
      "displayNationality": "Argentina"
    },
    "aliases": [
      "paul"
    ]
  },
  {
    "id": "coach_ranieri",
    "name": "Claudio Ranieri",
    "aliases": [
      "ranieri",
      "sir claudio",
      "tinkerman"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "roma",
        "juventus",
        "inter",
        "napoli",
        "chelsea",
        "atletico_madrid"
      ],
      "managedTeams": [
        "roma",
        "juventus",
        "inter",
        "napoli",
        "chelsea",
        "atletico_madrid"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Roma"
    }
  },
  {
    "id": "coach_sarri",
    "name": "Maurizio Sarri",
    "aliases": [
      "sarri",
      "sarriball"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "napoli",
        "chelsea",
        "juventus",
        "lazio"
      ],
      "managedTeams": [
        "napoli",
        "chelsea",
        "juventus",
        "lazio"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Ex Lazio"
    }
  },
  {
    "id": "coach_motta",
    "name": "Thiago Motta",
    "aliases": [
      "motta",
      "thiago motta"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "barcelona",
        "atletico_madrid",
        "inter",
        "psg",
        "juventus"
      ],
      "managedTeams": [
        "juventus"
      ],
      "nationalities": [
        "italy",
        "brazil"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Juventus"
    }
  },
  {
    "id": "coach_de_zerbi",
    "name": "Roberto De Zerbi",
    "aliases": [
      "de zerbi",
      "dezerbi"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "milan",
        "napoli"
      ],
      "managedTeams": [
        "brighton",
        "marseille"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "premier_league",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Marseille"
    }
  },
  {
    "id": "coach_tuchel",
    "name": "Thomas Tuchel",
    "aliases": [
      "tuchel"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "dortmund",
        "psg",
        "chelsea",
        "bayern"
      ],
      "managedTeams": [
        "dortmund",
        "psg",
        "chelsea",
        "bayern",
        "england"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga",
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Germania",
      "displayClub": "Inghilterra"
    }
  },
  {
    "id": "coach_flick",
    "name": "Hansi Flick",
    "aliases": [
      "flick",
      "hansi flick"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "bayern",
        "barcelona"
      ],
      "managedTeams": [
        "bayern",
        "barcelona"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "champions_league",
        "world_cup"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "bundesliga",
        "la_liga"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Germania",
      "displayClub": "Barcelona"
    }
  },
  {
    "id": "coach_nagelsmann",
    "name": "Julian Nagelsmann",
    "aliases": [
      "nagelsmann"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "bayern"
      ],
      "managedTeams": [
        "bayern"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Germania",
      "displayClub": "Germania"
    }
  },
  {
    "id": "coach_xabi_alonso",
    "name": "Xabi Alonso",
    "aliases": [
      "xabi",
      "alonso",
      "xabi alonso"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "liverpool",
        "real_madrid",
        "bayern"
      ],
      "managedTeams": [
        "leverkusen"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore / Leggenda",
      "displayNationality": "Spagna",
      "displayClub": "Bayer Leverkusen"
    }
  },
  {
    "id": "coach_scaloni",
    "name": "Lionel Scaloni",
    "aliases": [
      "scaloni",
      "scaloneta"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "lazio",
        "atalanta"
      ],
      "managedTeams": [
        "argentina"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "defender",
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Argentina",
      "displayClub": "Argentina"
    }
  },
  {
    "id": "coach_deschamps",
    "name": "Didier Deschamps",
    "aliases": [
      "deschamps"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "juventus",
        "chelsea"
      ],
      "managedTeams": [
        "juventus",
        "monaco",
        "france"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup",
        "euro",
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "ligue_1",
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Francia",
      "displayClub": "Francia"
    }
  },
  {
    "id": "coach_southgate",
    "name": "Gareth Southgate",
    "aliases": [
      "southgate"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "aston_villa",
        "middlesbrough"
      ],
      "managedTeams": [
        "england"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore CT",
      "displayNationality": "Inghilterra",
      "displayClub": "Ex Inghilterra"
    }
  },
  {
    "id": "coach_luis_enrique",
    "name": "Luis Enrique",
    "aliases": [
      "luis enrique",
      "lucho"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid",
        "barcelona",
        "roma",
        "psg"
      ],
      "managedTeams": [
        "roma",
        "barcelona",
        "psg"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Spagna",
      "displayClub": "PSG"
    }
  },
  {
    "id": "coach_ten_hag",
    "name": "Erik ten Hag",
    "aliases": [
      "ten hag",
      "tenhag"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "managedTeams": [
        "man_united"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Olanda",
      "displayClub": "Ex Man United"
    }
  },
  {
    "id": "coach_amorim",
    "name": "Rúben Amorim",
    "aliases": [
      "amorim",
      "ruben amorim"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "managedTeams": [
        "man_united"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Portogallo",
      "displayClub": "Manchester United"
    }
  },
  {
    "id": "coach_wenger",
    "name": "Arsène Wenger",
    "aliases": [
      "wenger",
      "il professore"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "arsenal"
      ],
      "managedTeams": [
        "arsenal",
        "monaco"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Leggenda Allenatore",
      "displayNationality": "Francia",
      "displayClub": "Ex Arsenal"
    }
  },
  {
    "id": "coach_trapattoni",
    "name": "Giovanni Trapattoni",
    "aliases": [
      "trapattoni",
      "trap"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "milan",
        "juventus",
        "inter",
        "bayern"
      ],
      "managedTeams": [
        "milan",
        "juventus",
        "inter",
        "bayern"
      ],
      "nationalities": [
        "italy"
      ],
      "honours": [
        "champions_league",
        "scudetto"
      ],
      "positions": [
        "defender",
        "midfielder"
      ],
      "leagues": [
        "serie_a",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayRole": "Leggenda Allenatore",
      "displayNationality": "Italia",
      "displayClub": "Ex Juve/Inter/Bayern"
    }
  },
  {
    "id": "coach_cruyff",
    "name": "Johan Cruyff",
    "aliases": [
      "cruyff",
      "johan cruijff",
      "il profeta del gol"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "managedTeams": [
        "barcelona"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "la_liga"
      ],
      "positions": [
        "forward",
        "midfielder"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayRole": "Maestro Totale",
      "displayNationality": "Olanda",
      "displayClub": "Leggenda Barça/Ajax"
    }
  },
  {
    "id": "coach_bielsa",
    "name": "Marcelo Bielsa",
    "aliases": [
      "bielsa",
      "el loco",
      "loco bielsa"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "lazio"
      ],
      "managedTeams": [
        "lazio",
        "marseille",
        "leeds",
        "argentina",
        "uruguay"
      ],
      "nationalities": [
        "argentina"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga",
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Argentina",
      "displayClub": "Uruguay"
    }
  },
  {
    "id": "coach_emery",
    "name": "Unai Emery",
    "aliases": [
      "emery",
      "unai emery"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 92,
    "attributes": {
      "teams": [
        "psg",
        "arsenal"
      ],
      "managedTeams": [
        "valencia",
        "sevilla",
        "psg",
        "arsenal",
        "villarreal",
        "aston_villa"
      ],
      "nationalities": [
        "spain"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Spagna",
      "displayClub": "Aston Villa"
    }
  },
  {
    "id": "coach_tudor",
    "name": "Igor Tudor",
    "aliases": [
      "tudor",
      "igor tudor"
    ],
    "type": "coach",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "juventus",
        "lazio"
      ],
      "managedTeams": [
        "juventus",
        "marseille",
        "lazio",
        "verona"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "serie_a",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayRole": "Allenatore",
      "displayNationality": "Croazia",
      "displayClub": "Ex Lazio"
    }
  },
  {
    "id": "bruno_fernandes",
    "name": "Bruno Fernandes",
    "aliases": [
      "bruno",
      "fernandes",
      "bruno fernandes"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_united"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Manchester United",
      "displayNationality": "Portogallo"
    }
  },
  {
    "id": "figo",
    "name": "Luís Figo",
    "aliases": [
      "figo",
      "luis figo"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "barcelona",
        "real_madrid",
        "inter"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "la_liga",
        "scudetto"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "la_liga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Portogallo"
    }
  },
  {
    "id": "pepe",
    "name": "Pepe",
    "aliases": [
      "pepe"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "real_madrid"
      ],
      "nationalities": [
        "portugal",
        "brazil"
      ],
      "honours": [
        "champions_league",
        "euro",
        "la_liga"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Portogallo"
    }
  },
  {
    "id": "deco",
    "name": "Deco",
    "aliases": [
      "deco"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "barcelona",
        "chelsea"
      ],
      "nationalities": [
        "portugal",
        "brazil"
      ],
      "honours": [
        "champions_league",
        "la_liga",
        "premier_league"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Portogallo"
    }
  },
  {
    "id": "joao_felix",
    "name": "João Félix",
    "aliases": [
      "felix",
      "joao felix"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "atletico_madrid",
        "chelsea",
        "barcelona"
      ],
      "nationalities": [
        "portugal"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Chelsea",
      "displayNationality": "Portogallo"
    }
  },
  {
    "id": "gullit",
    "name": "Ruud Gullit",
    "aliases": [
      "gullit",
      "ruud gullit"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 98,
    "attributes": {
      "teams": [
        "milan",
        "chelsea"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "scudetto",
        "euro"
      ],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Milan",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "van_basten",
    "name": "Marco van Basten",
    "aliases": [
      "van basten",
      "il cigno di utrecht"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 99,
    "attributes": {
      "teams": [
        "milan"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "ballon_dor",
        "scudetto",
        "euro"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Milan",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "rijkaard",
    "name": "Frank Rijkaard",
    "aliases": [
      "rijkaard",
      "frank rijkaard"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 97,
    "attributes": {
      "teams": [
        "milan"
      ],
      "managedTeams": [
        "barcelona"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "champions_league",
        "scudetto",
        "euro",
        "la_liga"
      ],
      "positions": [
        "midfielder",
        "defender"
      ],
      "leagues": [
        "serie_a",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "van_persie",
    "name": "Robin van Persie",
    "aliases": [
      "van persie",
      "rvp"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "arsenal",
        "man_united"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "depay",
    "name": "Memphis Depay",
    "aliases": [
      "depay",
      "memphis"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "man_united",
        "barcelona",
        "atletico_madrid"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league",
        "la_liga",
        "ligue_1"
      ]
    },
    "metadata": {
      "displayClub": "Corinthians",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "gakpo",
    "name": "Cody Gakpo",
    "aliases": [
      "gakpo",
      "cody gakpo"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "liverpool"
      ],
      "nationalities": [
        "netherlands"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Liverpool",
      "displayNationality": "Olanda"
    }
  },
  {
    "id": "rakitic",
    "name": "Ivan Rakitić",
    "aliases": [
      "rakitic",
      "ivan rakitic"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "barcelona"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "la_liga",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Hajduk Spalato",
      "displayNationality": "Croazia"
    }
  },
  {
    "id": "gvardiol",
    "name": "Joško Gvardiol",
    "aliases": [
      "gvardiol",
      "josko gvardiol"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Croazia"
    }
  },
  {
    "id": "suker",
    "name": "Davor Šuker",
    "aliases": [
      "suker",
      "davor suker"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "real_madrid",
        "arsenal"
      ],
      "nationalities": [
        "croatia"
      ],
      "honours": [
        "champions_league",
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "la_liga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Real",
      "displayNationality": "Croazia"
    }
  },
  {
    "id": "kompany",
    "name": "Vincent Kompany",
    "aliases": [
      "kompany"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 95,
    "attributes": {
      "teams": [
        "man_city",
        "bayern"
      ],
      "managedTeams": [
        "bayern"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league",
        "bundesliga"
      ]
    },
    "metadata": {
      "displayClub": "Bayern Monaco (Coach)",
      "displayNationality": "Belgio"
    }
  },
  {
    "id": "vertonghen",
    "name": "Jan Vertonghen",
    "aliases": [
      "vertonghen"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 90,
    "attributes": {
      "teams": [
        "tottenham"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [],
      "positions": [
        "defender"
      ],
      "leagues": [
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Anderlecht",
      "displayNationality": "Belgio"
    }
  },
  {
    "id": "doku",
    "name": "Jérémy Doku",
    "aliases": [
      "doku",
      "jeremy doku"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "man_city"
      ],
      "nationalities": [
        "belgium"
      ],
      "honours": [
        "premier_league"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Manchester City",
      "displayNationality": "Belgio"
    }
  },
  {
    "id": "eriksen",
    "name": "Christian Eriksen",
    "aliases": [
      "eriksen",
      "christian eriksen"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "tottenham",
        "inter",
        "man_united"
      ],
      "nationalities": [
        "denmark"
      ],
      "honours": [
        "scudetto"
      ],
      "positions": [
        "midfielder"
      ],
      "leagues": [
        "premier_league",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Manchester United",
      "displayNationality": "Danimarca"
    }
  },
  {
    "id": "lloris",
    "name": "Hugo Lloris",
    "aliases": [
      "lloris"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 94,
    "attributes": {
      "teams": [
        "tottenham"
      ],
      "nationalities": [
        "france"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "goalkeeper"
      ],
      "leagues": [
        "ligue_1",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "LAFC",
      "displayNationality": "Francia"
    }
  },
  {
    "id": "klose",
    "name": "Miroslav Klose",
    "aliases": [
      "klose",
      "miro klose"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 96,
    "attributes": {
      "teams": [
        "bayern",
        "lazio"
      ],
      "nationalities": [
        "germany"
      ],
      "honours": [
        "world_cup"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "serie_a"
      ]
    },
    "metadata": {
      "displayClub": "Leggenda Lazio/Bayern",
      "displayNationality": "Germania"
    }
  },
  {
    "id": "felipe_anderson",
    "name": "Felipe Anderson",
    "aliases": [
      "felipe anderson",
      "felipe"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 88,
    "attributes": {
      "teams": [
        "lazio"
      ],
      "nationalities": [
        "brazil"
      ],
      "honours": [],
      "positions": [
        "midfielder",
        "forward"
      ],
      "leagues": [
        "serie_a",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Palmeiras",
      "displayNationality": "Brasile"
    }
  },
  {
    "id": "sancho",
    "name": "Jadon Sancho",
    "aliases": [
      "sancho",
      "jadon sancho"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 91,
    "attributes": {
      "teams": [
        "dortmund",
        "man_united",
        "chelsea"
      ],
      "nationalities": [
        "england"
      ],
      "honours": [],
      "positions": [
        "forward"
      ],
      "leagues": [
        "bundesliga",
        "premier_league"
      ]
    },
    "metadata": {
      "displayClub": "Chelsea",
      "displayNationality": "Inghilterra"
    }
  },
  {
    "id": "aubameyang",
    "name": "Pierre-Emerick Aubameyang",
    "aliases": [
      "aubameyang",
      "auba"
    ],
    "type": "player",
    "sport": "football",
    "popularity": 93,
    "attributes": {
      "teams": [
        "milan",
        "dortmund",
        "arsenal",
        "barcelona",
        "chelsea"
      ],
      "nationalities": [
        "gabon",
        "france"
      ],
      "honours": [
        "la_liga"
      ],
      "positions": [
        "forward"
      ],
      "leagues": [
        "ligue_1",
        "bundesliga",
        "premier_league",
        "la_liga"
      ]
    },
    "metadata": {
      "displayClub": "Al-Qadsiah",
      "displayNationality": "Gabon"
    }
  }
];

export const FOOTBALL_DATASET: Dataset = {
  sport: 'football',
  name: 'Calcio Mondiale & Club',
  categories: FOOTBALL_CATEGORIES,
  entities: FOOTBALL_ENTITIES,
};
