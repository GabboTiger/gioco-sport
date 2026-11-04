# Progetto: gioco di territorio a esagoni basato su quiz (ispirato a "Possession Play")

## Ruolo
Sei un ingegnere software senior. Costruisci passo per passo un gioco web multi-sport in TypeScript. Lavora **una fase alla volta**: alla fine di ogni fase fermati, riassumi cosa hai fatto e le scelte di design in pochi punti, elenca i test passati e aspetta la mia conferma prima di continuare. Non anticipare fasi future. Se una decisione è ambigua, proponi 2-3 opzioni con pro/contro invece di scegliere in silenzio.

## Il gioco (regole base)
- Griglia esagonale di 31 esagoni. Ogni esagono ha una **categoria** (es. "ha giocato nel Milan", "nazionalità italiana", "ha vinto la Champions League").
- A turno, un giocatore sceglie un esagono **neutro** e nomina un'entità (giocatore o allenatore) che rispetta quella categoria.
- Se l'entità rispetta anche le categorie di esagoni **adiacenti**, li conquista tutti, **rubandoli** all'avversario se erano suoi.
- Ogni giocatore ha un proprio timer, che scorre solo durante il suo turno.
- Quando tutti i 31 esagoni sono assegnati, vince chi ne ha di più.
- Non copiare codice, asset, testi o branding del sito originale. Scrivi tutto da zero con nome e grafica originali.

## Estensioni richieste
1. Modalità **hotseat** sullo stesso schermo da 2, 3 o 4 giocatori.
2. Modalità **contro bot** (anche bot contro bot, utile per i test), con livelli di difficoltà.
3. Supporto a **più sport** (calcio, basket, tennis, F1, ecc.) tramite dati, senza modificare il motore.
4. Supporto agli **allenatori** come tipo di entità, anche mischiati ai giocatori nelle categorie.
5. In seguito: **multiplayer online** con stanze.

## Stack e vincoli
- TypeScript, Vite, UI in SVG (React o Svelte: proponi e motiva la scelta in 3 righe).
- Test con Vitest.
- Il **motore di gioco** deve essere una libreria pura (nessun import da DOM/UI/rete), deterministica (RNG con seed iniettabile) e serializzabile (stato = JSON), così da poterla riusare lato server.
- Coordinate esagonali **assiali** (q, r). Documenta la convenzione.
- Codice commentato solo dove serve, nomi in inglese, README in italiano.

## Fase 1 - Modello dati e categorie
- Definisci i tipi: `Entity` (id, nome, tipo: player|coach, sport, attributi), `Attribute`, `Category` (id, etichetta, sport, predicato sugli attributi), `Dataset`.
- Gli attributi devono essere generici (es. `teams`, `nationalities`, `honours`, `positions`, `leagues`), non hardcoded per il calcio.
- Crea un piccolo dataset di esempio realistico (~150 entità di calcio, almeno 15 allenatori, e 20 entità di basket per provare il multi-sport) in JSON.
- Prepara uno script separato per generare dataset da Wikidata via SPARQL (solo struttura e query documentate, da eseguire dopo la mia conferma). Segnala eventuali problemi di licenza e qualità dei dati.
- Implementa `matches(entity, category)` e un indice invertito categoria → entità per query veloci.
- **Generatore di tabelle**: dato un dataset e un seed, produce 31 categorie assegnate agli esagoni tale che: ogni esagono abbia almeno N risposte valide (parametro, default 5); ogni coppia di esagoni adiacenti abbia una intersezione non vuota per almeno una frazione configurabile delle coppie; nessuna categoria duplicata; mix bilanciato di tipi di categoria.
- Test: matching, indice, generatore (proprietà sopra verificate su 100 seed).
- **Stop e riassunto.**

## Fase 2 - Motore di gioco
- Stato: griglia, proprietario di ogni esagono, giocatori (id, timer residuo), giocatore di turno, entità già usate (non si può riusare la stessa entità nella partita), stato finale.
- Funzioni pure: `getLegalMoves(state)`, `applyMove(state, move)` che ritorna il nuovo stato più l'elenco degli esagoni conquistati/rubati, `tick(state, dt)` per i timer, `getWinner(state)`.
- Regole per N giocatori (2-4): ordine dei turni, furto da qualsiasi avversario, **gestione pareggio** (proponi e documenta 2 opzioni, implementa quella che scelgo), cosa succede allo scadere del timer (proponi opzioni: perdi il turno, perdi un esagono, ecc.).
- Mossa invalida (entità non valida per l'esagono): proponi se penalizzare o permettere di riprovare.
- Dimensione griglia parametrizzabile oltre ai 31 esagoni, per le partite a 3-4 giocatori.
- Test estesi: conquista a catena, furto, riuso entità, timer, partite complete simulate con mosse casuali per verificare gli invarianti (somma esagoni, turni, terminazione).
- **Stop e riassunto.**

## Fase 3 - UI hotseat
- Schermata di setup: numero giocatori (2-4), nomi/colori, sport, durata timer.
- Griglia esagonale SVG con etichette leggibili, evidenza dell'esagono selezionato, animazione semplice di conquista/furto.
- Input con **autocomplete** sul dataset (normalizza accenti e maiuscole), mostra errori chiari.
- Timer visibili, punteggio live, schermata finale con rivincita.
- Mobile first, utilizzabile anche su telefono condiviso fra amici.
- **Stop e riassunto.**

## Fase 4 - Bot
- Interfaccia `Bot { chooseMove(state, rng): Move }` indipendente dalla UI.
- Bot base: enumera le mosse legali, valuta il guadagno netto (esagoni conquistati + rubati) e sceglie la migliore.
- Livelli di difficoltà tramite **conoscenza limitata**: il bot conosce ogni entità con una probabilità legata alla sua popolarità (campo `popularity` nel dataset), più un rumore nelle scelte. Parametrizza i livelli (facile/medio/difficile).
- Bonus: euristica che tiene conto del rischio di furto (esagoni facilmente ripresi dall'avversario) con lookahead a 1 mossa.
- Supporto a 3-4 giocatori (mix di umani e bot).
- Test: bot contro bot su molti seed, statistiche di vittoria per livello, nessuna mossa illegale.
- **Stop e riassunto.**

## Fase 5 - Multi-sport e allenatori
- Aggiungi dataset per almeno un altro sport e per gli allenatori, usando solo dati (nessuna modifica al motore; se serve, spiegami perché).
- Il generatore di tabelle deve poter mescolare categorie su entità di tipi diversi.
- Selettore sport/modalità nella UI.
- **Stop e riassunto.**

## Fase 6 - Online (solo dopo mia conferma)
- Proponi 2 opzioni (es. PartyKit vs Socket.io/Node) con pro e contro.
- Server autoritativo: valida le mosse con lo stesso motore, gestisce i timer, stanze con codice, riconnessione.
- **Stop e riassunto.**

## Regole generali di lavoro
- Prima di scrivere codice in ogni fase, mostra un breve piano (struttura file, interfacce principali).
- Commit piccoli e descrittivi alla fine di ogni sotto-passo.
- Se trovi problemi nel design delle regole (es. partite che si bloccano, tabelle ingiocabili), segnalali invece di aggirarli.
- Alla fine di ogni fase aggiorna il README con come eseguire app, test e script.
