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

## ⏭️ Prossimi Passi (Blocco 3)
- **Versione a 4 Giocatori**:
  - Supporto per 2, 3 e 4 giocatori in hotseat con colori accessibili e distinguibili (anche per daltonici) e nomi personalizzabili.
  - Valutazione dimensione griglia per 4 giocatori (pro/contro di 31 esagoni vs griglie più ampie, es. 43 o 55 esagoni configurabili).
  - Definizione e implementazione delle regole per 3-4 giocatori (furto da qualsiasi avversario, gestione pareggi, timeout turno).
  - Test con partite simulate complete a 2, 3 e 4 giocatori.
