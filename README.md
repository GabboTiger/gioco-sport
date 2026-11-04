# ⚽ Hex Possession Quiz 🏀

> Un gioco di conquista e territorio su griglia esagonale basato su quiz sportivi, ispirato alle meccaniche di *"Possession Play"*.
> Sviluppato in **TypeScript**, **React**, **Vite** con grafica vettoriale pura in **SVG**.

---

## 🎮 Guida Rapida: Come installarlo e giocarci subito

Se non hai mai usato un terminale prima d'ora, non preoccuparti! Segui questi semplici passi:

### 1. Prerequisiti
Assicurati di avere installato **Node.js** sul tuo computer (versione 18 o superiore):
- Se non lo hai, scaricalo gratuitamente dal sito ufficiale: [nodejs.org](https://nodejs.org/) (consigliata la versione LTS).
- L'installazione include automaticamente anche `npm`.

### 2. Scarica o clona il progetto
Apri il terminale (o Prompt dei comandi su Windows) e clona la cartella del gioco:
```bash
git clone https://github.com/GabboTiger/gioco-sport.git
cd gioco-sport
```

### 3. Installa i pacchetti necessari
Nel terminale, digita ed esegui:
```bash
npm install
```
*(Ci vorranno circa 10-15 secondi per scaricare i componenti del gioco).*

### 4. Avvia il gioco!
Avvia il server locale con il comando:
```bash
npm run dev
```

Nel terminale vedrai apparire un link, solitamente:
👉 **`http://localhost:3000`**

Aprilo in un qualsiasi browser (Chrome, Safari, Firefox, Edge). **Buona partita!** 🎉

---

## 🕹️ Come si gioca (Regole del Gioco)

### 🗺️ 1. La Mappa
- La partita si gioca su una griglia di **31 esagoni**.
- Ogni esagono riporta una categoria sportiva (es. *Milan*, *R. Madrid*, *Mondiale 🌍*, *UCL 🏆*, *Scudetto 🇮🇹*, *Attaccante ⚽*, *Portogallo 🇵🇹*).
- Se un'abbreviazione non ti è chiara, basta passare il mouse sull'esagono o consultare la **Legenda Categorie** in fondo alla schermata, che elenca nome completo e requisiti di ogni tessera.

### 🎯 2. Il Tuo Turno
1. Clicca su un **esagono grigio (neutro)** che vuoi provare a conquistare.
2. Si aprirà una casella di ricerca: scrivi il nome di un giocatore o allenatore (l'autocompletamento trova i nomi anche senza accenti o maiuscole, es. scrivendo `mbappe`, `kaka`, `modric`, `zidane`).
3. Quando selezioni un'entità valida, vedrai subito un'**anteprima in tempo reale** sulla mappa: gli esagoni che conquisterai si illumineranno di verde, mentre quelli che ruberai all'avversario si illumineranno di rosso (*"RUBA!"*).
4. Clicca **"Conferma Conquista"** per confermare la giocata.

### 🔗 3. Conquiste a Catena e Furti di Territorio
- **Conquista Confinante**: Se il giocatore che hai nominato soddisfa anche la categoria di un esagono adiacente, conquisti anche quello!
- **Furto all'avversario**: Se uno degli esagoni adiacenti apparteneva già al tuo avversario, **glielo rubi** e diventa tuo!
- **Modalità Catena Continua (Flood Fill)**: Se l'opzione è attiva nelle impostazioni, la conquista a catena non si ferma al primo cerchio di vicini: si propaga lungo tutti gli esagoni connessi che condividono quel criterio!

### ⚠️ 4. Regola dell'Unicità
- Ogni calciatore o allenatore può essere giocato **una sola volta** in tutta la partita. Scegli con cura quando calare le tue leggende più versatili!

### ⏱️ 5. Il Timer
- Ciascun giocatore ha un proprio orologio (es. 60 secondi).
- Il tempo scorre solo mentre è il tuo turno. Se il tuo tempo si azzera, il turno passa immediatamente al tuo avversario.

### 🏆 6. Chi Vince?
- La partita termina quando tutti i 31 esagoni sono stati assegnati o se non rimangono più mosse possibili.
- Vince chi controlla il **maggior numero di esagoni**. In caso di parità, vince chi ha più tempo rimasto sull'orologio.

---

## 👥 Modalità di Gioco Incluse

- **👤 Giocatore Singolo (Tu vs Bot)**: Sfida l'intelligenza artificiale impostando la difficoltà:
  - *Facile*: Il bot conosce solo i campioni più famosi e gioca in modo rilassato.
  - *Medio*: Il bot valuta le mosse migliori e punta a conquistare e rubare più esagoni possibili.
  - *Difficile*: Conoscenza quasi enciclopedica e forte prioritizzazione del furto dei tuoi esagoni.
- **👥 In 2 Giocatori (Hotseat)**: Gioca 1 contro 1 a turni sullo stesso computer, tablet o smartphone.
- **👥 In 3 Giocatori**: Partita a tre giocatori in contemporanea sullo stesso schermo.
- **🤖 Bot vs Bot**: Modalità spettatore per guardare due intelligenze artificiali sfidarsi tra loro.
- **🏀 Multi-Sport**: Puoi scegliere tra il dataset del **Calcio** (oltre 150 calciatori e 18 grandi mister) e il dataset del **Basket NBA** (21 leggende e head coach NBA).

---

## 🧪 Per Sviluppatori: Test & Build

### Eseguire la suite di test
Tutti i test unitari e di integrazione (motore puro, calcolo coordinate esagonali assiali, generazione mappa con seed, intelligenza del bot e flood-fill) sono eseguiti tramite **Vitest**:
```bash
npm run test
```

### Compilazione per la produzione
Per creare la build ottimizzata e minimizzata nella cartella `dist/`:
```bash
npm run build
```

---

## 🏛️ Architettura Tecnica

- **Motore Logico Puro (`src/engine/`)**: Indipendente dal DOM, 100% deterministico e serializzabile in JSON. Può essere eseguito identicamente sia nel browser che su un server Node.js per future partite online.
- **Coordinate Esagonali Assiali (`src/engine/hexGrid.ts`)**: Geometria esagonale rigorosa con formule matematiche assiali `(q, r)` e coordinate cubiche `s = -q - r`.
- **Generatore di Griglie Bilanciate (`src/engine/boardGenerator.ts`)**: PRNG Mulberry32 con seed iniettabile; assicura che ogni esagono abbia sempre almeno 5 risposte valide e che le coppie confinanti condividano risposte per favorire combo e furti.
- **Template Wikidata SPARQL (`scripts/wikidata-importer.ts`)**: Script e documentazione con query SPARQL pronte per espandere il dataset via Wikidata Query Service.
