# PROGRESS.md - Stato di Avanzamento del Progetto

Questo documento traccia l'avanzamento dei blocchi di sviluppo definiti in `FIX_PROMPT.md`, le decisioni architetturali prese, i test superati e i passi successivi.

---

## 📌 Blocco 1 - Database e Ricerca (Completato)

### 1. Diagnosi iniziale effettuata
- **Problema rilevato**: La ricerca tramite semplice `includes` falliva sui soprannomi (CR7, Vini Jr, KDB, Ibra, Dibu, Pippo Inzaghi) e non tollerava refusi minimi (Lewandowsky, Anceloti, Spaletti, Gardiola). Inoltre, gli allenatori erano solo 18 rispetto a oltre 200 calciatori e non venivano disambiguati chiaramente.

### 2. Modifiche e decisioni architetturali
- **Nuovo modulo di ricerca (`src/engine/search.ts`)**:
  - Normalizzazione avanzata: rimozione di accenti, minuscole e punteggiatura.
  - Algoritmo di Levenshtein adattivo: tollera 1 errore per parole di 4-6 caratteri e 2 errori per parole >= 7 caratteri.
  - Punteggio gerarchico: nome esatto (100) > alias esatto (95) > cognome esatto (90) > prefisso (85) > sottostringa (70) > fuzzy match (40-50).
- **Ampliamento Dataset (`src/data/footballDataset.ts`)**:
  - Entità totali portate a **273** (235 calciatori, 38 allenatori).
  - Aggiunti grandi allenatori: Ranieri, Sarri, Motta, De Zerbi, Tuchel, Flick, Nagelsmann, Xabi Alonso, Scaloni, Deschamps, Southgate, Luis Enrique, Ten Hag, Amorim, Trapattoni, Wenger, Cruyff, Bielsa, Emery, Tudor.
  - Introdotto campo `aliases` su tutti i profili di spicco.
  - Il matching sui club per gli allenatori include ora automaticamente `managedTeams`.
- **UI con Disambiguazione (`src/components/AutocompleteSearch.tsx`)**:
  - Badge dedicato color porpora per gli allenatori `[ALLENATORE 📋]`.
  - Etichetta che specifica il termine agganciato in caso di alias (es. `alias: cr7`) o fuzzy match (es. `~lewandowski`).
- **Script di Diagnosi & Report Qualità**:
  - `scripts/diagnose-search.ts`: benchmark con i nomi campione richiesti.
  - `scripts/dataset-report.ts`: audit di completezza attributi (0 entità senza squadre/nazionalità) e verifica che tutte le 42 categorie abbiano almeno 9 risposte valide.

### 3. Test Passati
- **26 test su 26 superati** in Vitest:
  - `tests/search.test.ts` (6 test): normalizzazione, Levenshtein, nomi esatti, alias/acronimi, refusi fuzzy, disambiguazione omonimi/ruolo.
  - `tests/gameEngine.test.ts` (9 test): mosse legali, furti, timer, catena flood-fill vs diretta.
  - `tests/matching.test.ts` (6 test).
  - `tests/boardGenerator.test.ts` (3 test).
  - `tests/botAgent.test.ts` (2 test).

---

## 📌 Blocco 2 - Validazione delle Tabelle e Vincolo Adiacenze 100% (Completato)

### 1. Diagnosi iniziale effettuata
- **Problema rilevato**: Il generatore casuale greedy precedente accettava tabelle con un ratio arbitrario (es. 60%). Dalla diagnosi su 50 tabelle generate (`scripts/diagnose-board-validation.ts`), il **100% delle tabelle conteneva tra 10 e 16 coppie adiacenti disgiunte** (0 entità in comune su 72 adiacenze totali), creando "muri ciechi" che bloccavano le propagazioni a catena.

### 2. Modifiche e decisioni architetturali
- **Modulo di Validazione (`src/engine/boardValidation.ts`)**:
  - Funzione pura `validateBoard(board, dataset, minAnswersPerHex)`:
    - Rileva tutte le 72 adiacenze e calcola il conteggio esatto delle entità condivise (`connectionCounts`).
    - Riporta la lista dettagliata delle coppie disgiunte (`disjointPairs`), eventuali esagoni con risposte insufficienti (`insufficientAnswerHexes`) e categorie duplicate (`duplicateCategoryIds`).
- **Nuovo Generatore CSP Backtracking (`src/engine/boardGenerator.ts`)**:
  - Rimpiazzato l'algoritmo casuale con un Constraint Satisfaction Problem (CSP) con backtracking, restart randomizzati e ordinamento BFS delle coordinate dall'origine `(0,0)` verso l'esterno.
  - Vincolo rigido di intersezione non vuota (almeno 1 entità valida in comune) imposto su tutti i vicini già posizionati.
  - Verifica automatica runtime con `validateBoard` al termine della generazione: se una tabella non è conforme al 100%, viene rigenerata o viene lanciata `BoardGenerationError`.
  - Benchmark prestazionale: tempo medio di generazione ~5.8ms per tabella a 31 esagoni.
- **Pannello Debug Adiacenze UI (`src/components/HexGridSVG.tsx`, `ScoreboardHeader.tsx`, `App.tsx`)**:
  - Pulsante `🛠️ Debug ON/OFF` nella barra superiore.
  - Banner riepilogativo con conteggio adiacenze collegate (72/72), minimo, massimo e media di entità per coppia.
  - Visualizzazione visiva SVG: cerchietti con il numero di entità condivise sui bordi tra ogni coppia di esagoni adiacenti (con evidenziazione blu quando un esagono è selezionato).

### 3. Test Passati
- **32 test su 32 superati** in Vitest:
  - `tests/boardValidation.test.ts` (6 test):
    - Convalida 100% su **200 seed casuali differenti** (tutti con 72/72 collegamenti validi, 0 disgiunti, 0 duplicati, 0 risposte insufficienti).
    - Integrazione runtime con `initGameState`.
    - Rilevamento negativo di coppie disgiunte artificiali.
    - Rilevamento di categorie duplicate.
    - Rilevamento di risposte insufficienti (< minAnswersPerHex).
    - Rilevamento errore `BoardGenerationError` per dataset troppo piccoli (< 31 categorie).
  - `tests/boardGenerator.test.ts` (3 test).
  - `tests/search.test.ts` (6 test).
  - `tests/gameEngine.test.ts` (9 test).
  - `tests/matching.test.ts` (6 test).
  - `tests/botAgent.test.ts` (2 test).

---

## 📌 Blocco 3 - Versione a 4 Giocatori, Griglia Configurabile e Regole (Completato)

### 1. Diagnosi iniziale effettuata
- **Problema rilevato**: `SetupScreen` supportava solo fino a 3 giocatori con nome del 3° non modificabile e nessun supporto per 4 giocatori. Inoltre, con il timer azzerato per tutti i giocatori (`timeRemainingMs <= 0`), il motore continuava a ciclare a vuoto senza mai chiudere la partita a `game_over`. Infine, con 31 esagoni e 4 giocatori, lo spazio territoriale risultava ridotto a soli ~7.7 esagoni pro-capite.

### 2. Modifiche e decisioni architetturali
- **Palette Colori Daltonici & Personalizzazione Nomi (`src/components/SetupScreen.tsx`)**:
  - Introdotta la palette universale ad alto contrasto Okabe-Ito: Blu Cielo (`#0284c7`), Ambra (`#f59e0b`), Smeraldo (`#10b981`), Fucsia (`#ec4899`), distinguibili per qualsiasi forma di daltonismo (protanopia, deuteranopia, tritanopia).
  - Nomi 100% personalizzabili con input dedicati e indicatori colore per tutti i giocatori da 1 a 4.
- **Griglia Configurabile: 31 vs 37 Esagoni (`src/engine/hexGrid.ts`, `boardGenerator.ts`)**:
  - `standard_31`: Classica (31 esagoni, 72 adiacenze) per partite rapide e serrate.
  - `expanded_37`: Esagono regolare raggio 3 (37 esagoni, 90 adiacenze), consigliata per 3-4 giocatori per garantire maggiore profondità strategica e spazio territoriale. Generata al 100% compliant con il CSP.
- **Regole Multi-giocatore e Criteri di Pareggio (`src/engine/gameEngine.ts`)**:
  - *Furto*: Conquista simultanea di territori da qualsiasi avversario (2, 3 o 4 giocatori).
  - *Gerarchia Pareggi*: 1) Maggior numero di esagoni, 2) Tempo residuo su cronometro, 3) Maggior numero di esagoni rubati agli avversari (`stolenHexIds`), 4) Pareggio ufficiale (`tie`).
  - *Gestione Timeout*: Giocatori con tempo esaurito vengono saltati automaticamente; se tutti esauriscono il tempo, la partita termina immediatamente a `game_over`.
- **Scoreboard & UI Multi-giocatore (`ScoreboardHeader.tsx`, `GameOverModal.tsx`)**:
  - Evidenza dinamica del giocatore attivo, del prossimo giocatore in rotazione e badge `OUT` per tempo scaduto.
  - Podio di fine partita con classifica ordinata (1°, 2°, 3°, 4° posto con medaglie 🥇, 🥈, 🥉, 🏅).

### 3. Test Passati
- **45 test su 45 superati** in Vitest:
  - `tests/multiplayer.test.ts` (13 nuovi test):
    - Generazione e validazione 100% connettività per griglia da 31 e 37 esagoni (72 e 90 adiacenze).
    - Rotazione sequenziale turni a 3 e 4 giocatori.
    - Furto simultaneo da avversari diversi nello stesso turno.
    - Gestione timeout singolo e globale.
    - Criteri di spareggio (esagoni > tempo > furti > tie).
    - Partite simulate complete fino a `game_over` a 2, 3 e 4 giocatori senza anomalie.
  - `tests/boardValidation.test.ts` (6 test).
  - `tests/boardGenerator.test.ts` (3 test).
  - `tests/search.test.ts` (6 test).
  - `tests/gameEngine.test.ts` (9 test).
  - `tests/matching.test.ts` (6 test).
  - `tests/botAgent.test.ts` (2 test).

---

## 📌 Blocco 4 - Grafica, Segnapunti, Zoom & Pan (Completato)

### 1. Diagnosi iniziale effettuata
- **Problema rilevato**: Il container SVG della scacchiera era limitato rigidamente a `maxWidth: 860px` senza possibilità di sfruttare display larghi o desktop; su mobile il testo risultava minuscolo e non c'era alcuna possibilità di zoom o spostamento (pan/drag); le schede del segnapunti erano statiche senza feedback visivo al cambio punteggio.

### 2. Modifiche e decisioni architetturali
- **Sistema di Zoom e Pan (`src/components/HexGridSVG.tsx`)**:
  - Zoom dinamico scalabile da `0.6x` a `2.5x` con rotella mouse, pinch-to-zoom a 2 dita su mobile e pulsanti floating dedicati (`➕`, `➖`, `↺ Ripristina` e indicatore percentuale).
  - Pan / Drag bidirezionale fluido con mouse e tocco singolo, con soglia di tolleranza di 5px per evitare falsi clic sulle caselle durante lo spostamento.
  - Spazio della scacchiera allargato a `maxWidth: 1080px` per occupare l'intera area visibile.
- **Etichette Categorie Adattive e Outline Vettoriale**:
  - Testo SVG multilinea ottimizzato con auto-wrapping su 1-3 righe.
  - Applicato `paint-order: stroke fill` con sottile contorno nero di 2.5px (`stroke="#070a12"`): rende il testo al 100% leggibile e contrastato contro qualsiasi colore (inclusi i colori vivaci dei territori conquistati come fucsia o ambra) e a qualsiasi livello di zoom.
- **Segnapunti Ingrandito e Animato (`ScoreboardHeader.tsx`, `index.css`)**:
  - Header sticky ancorato in cima allo schermo con `backdrop-filter: blur(12px)`.
  - Punteggio a 28px con animazione CSS pop (`score-bump`) che rimbalza e brilla quando il punteggio cambia a seguito di conquiste o furti.
  - Timer visibile a caratteri grandi in formato monospace con allarme pulsante per gli ultimi 10 secondi.

### 3. Test Passati
- **50 test su 50 superati** in Vitest:
  - `tests/graphics.test.ts` (5 nuovi test):
    - Calcolo bounding box per 31 e 37 esagoni all'interno del viewport 920x820.
    - Algoritmo di auto-wrapping ed etichettatura per parole singole, doppie e multiple.
    - Clamping dello zoom da 0.6x a 2.5x.
  - `tests/multiplayer.test.ts` (13 test).
  - `tests/boardValidation.test.ts` (6 test).
  - `tests/boardGenerator.test.ts` (3 test).
  - `tests/search.test.ts` (6 test).
  - `tests/gameEngine.test.ts` (9 test).
  - `tests/matching.test.ts` (6 test).
  - `tests/botAgent.test.ts` (2 test).

---

## ⏭️ Prossimi Passi (Blocco 5)
- **Regola "Stesso Giocatore Due Volte" come Modalità Selezionabile**:
  - Introdurre l'opzione `allowRepeatedEntities` (booleano) nelle impostazioni di setup della partita.
  - Definire il valore predefinito consigliato: `false` (regola classica dell'unicità come impostazione predefinita per stimolare la varietà; `true` come modalità alternativa "Libera / Arcade").
  - Adattare il motore logico (`gameEngine.ts` e `matching.ts`) per permettere o vietare entità già usate in base all'opzione.
  - Test unitari per entrambi i valori di `allowRepeatedEntities`.
