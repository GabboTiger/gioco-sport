# Miglioramenti al gioco a esagoni (database, tabelle, 4 giocatori, grafica, bot)

## Contesto e metodo
Il progetto esiste già (gioco di territorio a esagoni basato su categorie di giocatori e allenatori). Prima di modificare qualsiasi cosa, leggi `AGENTS.md`, `PROGRESS.md` e la struttura del repo.

Lavora **un blocco alla volta**. Per ogni blocco:
1. **Diagnosi**: riproduci il problema con un test o uno script e mostrami la causa reale (non indovinare).
2. **Piano breve** (file toccati, approccio) e, se ci sono scelte ambigue, 2-3 opzioni con pro/contro.
3. **Implementazione** con test.
4. **Stop**: riassunto in pochi punti, test passati, aggiorna `PROGRESS.md`, aspetta la mia conferma.

Non cambiare le regole base del gioco oltre a quanto richiesto qui.

---

## Blocco 1 - Database e ricerca (giocatori/allenatori non trovati, allenatori che non funzionano)
Problema: l'autocomplete e la validazione spesso non trovano giocatori e gli allenatori non funzionano bene.

- **Diagnosi**: scrivi uno script che prende un campione di nomi comuni (con accenti, cognomi soli, soprannomi, nomi composti, es. "Ronaldo", "Vinicius", "Ancelotti", "Mourinho", "De Bruyne") e riporta quali non vengono trovati e perché (normalizzazione, dati mancanti, allenatori esclusi dall'indice, ecc.).
- **Ricerca**: normalizza (minuscole, senza accenti/punteggiatura), cerca per nome completo, cognome e alias, tollera piccoli errori di battitura (fuzzy match con soglia sensata), e mostra i suggerimenti con disambiguazione (nome, ruolo, squadre) quando ci sono omonimi. Aggiungi il campo `aliases` alle entità.
- **Dati**: amplia il dataset in modo sostanziale. Giocatori: aumenta copertura di squadre, nazionalità, trofei, campionati. Allenatori: includi gli allenatori nell'indice di ricerca e nelle categorie (es. "ha allenato X", "ha vinto la Champions come allenatore"). Se esiste lo script Wikidata, estendilo (query documentate, rate limit, cache locale in JSON) e mostrami cosa propone di scaricare prima di eseguirlo in massa. Segnala i dati dubbi invece di inventarli.
- Aggiungi un **report di qualità del dataset** (numero di entità per tipo/sport, entità senza attributi, categorie con poche risposte).
- Test: tutti i nomi del campione devono essere trovati; allenatori inclusi.

## Blocco 2 - Validazione delle tabelle (collegamenti tra caselle adiacenti)
Requisito: **ogni casella deve avere almeno un collegamento con ciascuna delle caselle adiacenti**, cioè esiste almeno una entità valida che soddisfa entrambe le categorie (intersezione non vuota) per **ogni coppia di esagoni adiacenti**.

- Nel generatore di tabelle, rendi questo un vincolo **obbligatorio**, non una frazione: se una tabella lo viola, rigenerala (con tentativi limitati e un errore chiaro se impossibile).
- Verifica anche che ogni esagono abbia almeno N risposte valide (parametro) e che nessuna categoria sia duplicata.
- Scrivi una funzione `validateBoard(board, dataset)` che restituisce l'elenco delle coppie adiacenti senza collegamento, e usala sia nei test (su almeno 200 seed e per ogni sport/modalità) sia a runtime prima di iniziare una partita.
- Mostra in debug (flag o pannello nascosto) per ogni coppia adiacente quante entità la collegano.

## Blocco 3 - Versione a 4 giocatori
- Supporta 2, 3 e 4 giocatori in hotseat, con colori distinguibili (anche per daltonici), nomi personalizzabili e ordine dei turni chiaro.
- Per 4 giocatori valuta se 31 esagoni sono adatti: propormi una griglia più grande o altre opzioni, con pro/contro, e rendi la dimensione configurabile.
- Definisci e documenta le regole per 3-4 giocatori: furto da qualsiasi avversario, **pareggio** (proponi opzioni), cosa succede se scade il timer di uno dei giocatori.
- Test: partite simulate complete a 2, 3 e 4 giocatori senza stati invalidi.

## Blocco 4 - Grafica e segnapunti
- Scacchiera **più grande** che sfrutta tutto lo spazio disponibile (desktop e telefono), con **zoom** (rotella/pinch/pulsanti + e -) e **spostamento** (drag) e pulsante "ripristina vista".
- Etichette delle categorie leggibili a qualsiasi zoom (testo che va a capo, dimensione adattiva, niente testo tagliato).
- **Segnapunti più grande** e sempre visibile: punteggio di ogni giocatore con il proprio colore, evidenza di chi è di turno, timer ben leggibili, animazione quando cambia il punteggio.
- Contrasti accessibili, layout responsive, tocchi comodi su mobile.

## Blocco 5 - Regola "stesso giocatore due volte" come modalità
Interpretazione da me richiesta: il divieto di usare la stessa entità più di una volta nella partita **non deve essere sempre attivo, ma una modalità selezionabile** nelle impostazioni di partita.

- Aggiungi un'opzione `allowRepeatedEntities` (o simile) nelle impostazioni di setup, con una descrizione chiara nella UI.
- Imposta il valore predefinito che ritieni più sensato e **dimmelo**, così lo confermo.
- Il motore deve rispettare l'opzione (test per entrambi i valori).
- Se hai dubbi sulla mia interpretazione, chiedimelo prima di implementare.

## Blocco 6 - Correzione del bot
- **Diagnosi**: fai giocare bot contro bot su molti seed e raccogli statistiche e anomalie (mosse illegali, entità già usate, bot che non muovono, bot che scelgono sempre mosse deboli, partite bloccate, risposta troppo lenta). Mostrami cosa va male prima di correggere.
- Il bot deve usare lo **stesso motore** e le stesse regole (inclusa l'opzione del Blocco 5 e le partite a 3-4 giocatori), non una copia.
- Corregge: scelta della mossa con massimo guadagno netto (esagoni conquistati meno rischio di furto), gestione di quando non ha mosse valide, uso del timer, livelli di difficoltà tramite conoscenza limitata delle entità (probabilità legata alla popolarità).
- Test: 1000 partite bot contro bot senza mosse illegali né blocchi, con statistiche di vittoria per livello (il difficile deve battere il facile in modo netto).

---

## Regole generali
- Commit piccoli e descrittivi per ogni sotto-passo.
- Se trovi altri problemi collegati (es. regole ambigue, tabelle ingiocabili), segnalali senza aggirarli.
- Alla fine di ogni blocco usa la skill progress-update per aggiornare il file PROGRSS.md del progetto e il README con come eseguire app, test e script.
