# Hex Possession Quiz ⚽ 🏀

Un gioco di territorio su griglia esagonale basato su quiz sportivi, ispirato alle meccaniche di conquista e furto di territorio ("Possession Play").

Sviluppato in **TypeScript**, **React**, **Vite** e grafica vettoriale pura in **SVG**.

---

## 🕹️ Regole del Gioco

1. **La Griglia (31 esagoni)**: La mappa è formata da 31 tessere esagonali disposte secondo coordinate assiali `(q, r)`. Ogni esagono rappresenta una specifica categoria (es. *"AC Milan"*, *"Campione del Mondo"*, *"Ha vinto la Champions League"*, *"Brasile 🇧🇷"*).
2. **Scelta e Conquista**: Nel proprio turno, il giocatore seleziona un esagono **neutro** e digita/sceglie un'entità (giocatore o allenatore) che soddisfa quel criterio.
3. **Effetto a Catena e Furto**:
   - Se l'entità scelta soddisfa anche le categorie degli **esagoni adiacenti**, il giocatore li conquista tutti all'istante.
   - Se uno o più esagoni adiacenti appartenevano all'avversario, vengono **rubati**!
4. **Entità Uniche**: Ogni entità (calciatore o allenatore) può essere giocata **una sola volta** nell'intero corso della partita.
5. **Orologio / Timer**: Ciascun giocatore ha un proprio timer individuale (es. 30s, 60s o 90s) che scorre unicamente durante il proprio turno. Se il tempo scade, il turno passa all'avversario.
6. **Vittoria**: La partita termina quando tutti gli esagoni sono stati conquistati o non rimangono più mosse valide. Vince chi controlla la maggioranza degli esagoni. In caso di parità, il pareggio viene risolto a favore di chi ha conservato più tempo sull'orologio.

---

## 🚀 Modalità di Gioco Disponibili

- **👤 Giocatore Singolo (Tu vs Bot AI)**: Sfida l'intelligenza artificiale con 3 livelli di difficoltà:
  - *Facile*: Conoscenza parziale dei giocatori, mosse meno aggressive.
  - *Medio*: Buona conoscenza ed euristica greedy (massimizza esagoni e furti).
  - *Difficile*: Conoscenza quasi totale, priorità ai furti e lookahead difensivo.
- **👥 In 2 Giocatori (Hotseat)**: Gioca 1v1 sullo stesso schermo (desktop, tablet o smartphone).
- **👥 In 3 Giocatori**: Partita a tre giocatori in contemporanea sullo stesso dispositivo.
- **🤖 Bot vs Bot (Spettatore / Test)**: Guarda due bot scontrarsi in tempo reale, utile per debug e test dell'algoritmo.

---

## 🏗️ Architettura Software

- **Motore di Gioco Puro (`src/engine/gameEngine.ts`)**:
  - Nessuna dipendenza dal DOM, UI o librerie di rete.
  - 100% deterministico e serializzabile (stato esportabile/importabile in JSON).
  - Pronto per essere riutilizzato lato server per multiplayer online (PartyKit / WebSocket).
- **Coordinate Esagonali Assiali (`src/engine/hexGrid.ts`)**:
  - Utilizza coordinate `(q, r)` con $s = -q - r$.
  - I 31 esagoni sono ricavati dalla griglia regolare a raggio 3 eliminando i 6 vertici estremi (forma simmetrica a 12 lati smussati).
  - Proiezione SVG precisa `axialToPixel` con esagoni *pointy-topped*.
- **Generatore di Tabelle Deterministico (`src/engine/boardGenerator.ts`)**:
  - PRNG Mulberry32 con seed iniettabile per rigiocabilità identica.
  - Garantisce almeno 5 risposte valide per ogni esagono.
  - Ottimizza la disposizione delle categorie per massimizzare le intersezioni tra esagoni confinanti (>60%).
- **Multi-Sport tramite Dati (`src/data/`)**:
  - `footballDataset.ts`: Oltre 150 calciatori iconici e 18 grandi allenatori (Ancelotti, Guardiola, Klopp, Mourinho, Conte, Zidane, Inzaghi, Lippi, ecc.).
  - `basketballDataset.ts`: 21 leggende NBA e coach per dimostrare il supporto multi-sport senza modificare una riga del motore.
- **Autocomplete Veloce & Accento-Agnostico (`src/components/AutocompleteSearch.tsx`)**:
  - Ricerca istantanea con normalizzazione NFD (es. `mbappe` trova `Mbappé`, `modric` trova `Modrić`).
  - Mostra anteprima in tempo reale sulla mappa degli esagoni che verranno conquistati o rubati prima di confermare.

---

## 📦 Installazione e Avvio Locale

### Prerequisiti
- Node.js (v18 o superiore, testato con v22)
- npm

### 1. Installazione dipendenze
```bash
npm install
```

### 2. Avvio dell'applicazione di sviluppo
```bash
npm run dev
```
Apri il browser su `http://localhost:3000`.

### 3. Esecuzione dei Test Unitari e di Integrazione
```bash
npm run test
```
Tutti i test (matching, indice invertito, generatore di griglie, simulazione motore, intelligenza artificiale del bot) sono eseguiti con **Vitest**.

### 4. Build di Produzione
```bash
npm run build
```

---

## 🌐 Template Wikidata SPARQL
È presente il file [`scripts/wikidata-importer.ts`](file:///Users/gabriel/Developer/antigravity_cli/gioco/scripts/wikidata-importer.ts) con la documentazione e le query SPARQL strutturate per estrarre calciatori e allenatori direttamente dal Query Service di Wikidata, insieme all'analisi sulla licenza (CC0) e sulla qualità dei dati (filtri competizioni, gestione ruoli e prestiti).
