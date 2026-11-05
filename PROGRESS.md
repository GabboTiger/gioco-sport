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

## ⏭️ Prossimi Passi (Blocco 2)
- **Validazione delle tabelle (collegamenti tra caselle adiacenti)**:
  - Rendere obbligatorio (100%) il vincolo di intersezione non vuota tra OGNI coppia di caselle adiacenti.
  - Implementare `validateBoard(board, dataset)` per test (200 seed) e runtime.
  - Aggiungere visualizzazione debug con il conteggio dei collegamenti per ogni adiacenza.
