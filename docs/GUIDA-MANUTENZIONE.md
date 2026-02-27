# Guida alla Manutenzione: stefanoicardi.com

Questa guida spiega come gestire i contenuti e la manutenzione ordinaria del sito.

---

## Pannello di Amministrazione

Il sito ha un pannello admin integrato per gestire i contenuti senza toccare il codice.

### Accesso

1. Vai su `https://stefanoicardi.com/admin`
2. Inserisci la passphrase (quella configurata come `ADMIN_PASSPHRASE` su Vercel)
3. La sessione dura **24 ore**, poi dovrai rifare il login

### Cosa puoi fare dal pannello admin

| Sezione | Percorso | Cosa puoi modificare |
|---------|----------|---------------------|
| **Dashboard** | `/admin` | Panoramica generale |
| **Articoli** | `/admin/articles` | Aggiungere, modificare, eliminare articoli del blog |
| **Podcast** | `/admin/podcast` | Aggiungere, modificare, eliminare episodi podcast |
| **Impostazioni** | `/admin/impostazioni` | Email di contatto, indirizzo studio, link CV, coordinate mappa |

---

## Gestione Articoli

### Aggiungere un nuovo articolo

1. Vai su `/admin/articles`
2. Clicca su "Nuovo articolo" (o pulsante equivalente)
3. Compila i campi:
   - **Titolo** (italiano e inglese)
   - **Estratto** — breve descrizione che appare nell'anteprima
   - **Contenuto** — il testo completo dell'articolo
   - **Immagine di copertina** — percorso dell'immagine (vedi sezione Immagini)
   - **Tag** — categorie dell'articolo
   - **Pubblicato** — spunta per rendere l'articolo visibile sul sito
4. Salva

### Modificare un articolo esistente

1. Dalla lista articoli, clicca sull'articolo che vuoi modificare
2. Fai le modifiche
3. Salva

### Eliminare un articolo

1. Dalla lista articoli, usa il pulsante di eliminazione sull'articolo
2. Conferma l'eliminazione

---

## Gestione Podcast

### Aggiungere un episodio

1. Vai su `/admin/podcast`
2. Aggiungi un nuovo episodio con:
   - **Titolo**
   - **Descrizione**
   - **URL Mixcloud** — il link all'episodio su Mixcloud
   - **Durata**
   - **In evidenza** — se spuntato, l'episodio appare in primo piano
3. Salva

---

## Impostazioni del Sito

Dalla pagina `/admin/impostazioni` puoi modificare:

- **Email di contatto** — dove arrivano i messaggi dal modulo contatti
- **Telefono**
- **Indirizzo dello studio** — appare nella sezione contatti e sulla mappa
- **Coordinate Google Maps** — latitudine e longitudine per la mappa interattiva
- **Link al CV** — URL del curriculum vitae professionale

---

## Gestione Immagini

Le immagini del sito sono nella cartella `/public/images/` del progetto. Per cambiare un'immagine:

### Metodo semplice (sovrascrittura)

Se vuoi sostituire un'immagine esistente, salva la nuova immagine con lo **stesso nome** nella stessa posizione. Al prossimo deploy verrà aggiornata automaticamente.

### Aggiungere nuove immagini

Per aggiungere nuove immagini al sito, chiedi al developer di:
1. Aggiungere l'immagine nella cartella `/public/images/` del progetto
2. Vercel farà il deploy automatico con la nuova immagine

Usa il percorso `/images/nome-file.webp` quando crei articoli o modifichi contenuti dal pannello admin.

### Formato consigliato

- **WebP** per le foto (migliore compressione)
- Dimensioni consigliate: max 1200px di larghezza
- Per le copertine degli articoli: proporzione 16:9

---

## Come funzionano i Deploy

Ogni volta che il developer aggiorna il codice del sito, Vercel fa automaticamente il deploy della versione aggiornata. Il processo richiede circa 1-2 minuti.

### Flusso di aggiornamento del codice

```
Developer aggiorna il codice → Vercel rileva il cambiamento → Deploy automatico → Sito aggiornato
```

I contenuti creati dal pannello admin (articoli, podcast, impostazioni) **non vengono toccati** durante i deploy — sono salvati separatamente su Vercel Blob Storage.

### Contenuti gestiti dall'admin panel

I contenuti modificati dal pannello admin (articoli, podcast, impostazioni) sono salvati su **Vercel Blob Storage**, uno storage persistente nel cloud. Questi cambiamenti:

- Sono **immediatamente visibili** sul sito
- **Persistono automaticamente** tra i deploy — non vengono mai sovrascritti
- Non richiedono alcuna azione aggiuntiva da parte tua

I file nella cartella `/content/` del progetto servono solo come **dati iniziali/predefiniti**. Una volta che crei contenuti dal pannello admin, quelli vengono letti da Blob Storage e hanno la priorità sui file locali.

---

## Variabili d'ambiente

Se devi modificare una variabile d'ambiente (es. cambiare la passphrase admin o l'API key di Resend):

1. Vai su https://vercel.com
2. Apri il progetto del sito
3. Vai su **Settings** → **Environment Variables**
4. Modifica la variabile desiderata
5. Clicca **Save**
6. **Importante:** Dopo aver cambiato una variabile, devi fare un **Redeploy**:
   - Vai sulla tab **Deployments**
   - Sul deploy più recente, clicca i tre puntini → **Redeploy**

### Lista variabili

| Variabile | Cosa fa |
|-----------|---------|
| `RESEND_API_KEY` | Chiave API per l'invio email |
| `RESEND_FROM_EMAIL` | Indirizzo mittente delle email |
| `CONTACT_EMAIL` | Dove ricevi le email dal modulo contatti |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico del sito |
| `ADMIN_PASSPHRASE` | Password per accedere al pannello admin |
| `BLOB_READ_WRITE_TOKEN` | Token per lo storage persistente dei contenuti (auto-generato da Vercel Blob) |

---

## Manutenzione Ordinaria

### Cosa controllare periodicamente

- **Modulo contatti**: invia un messaggio di prova ogni tanto per verificare che le email arrivino
- **Certificato HTTPS**: Vercel lo rinnova automaticamente, ma verifica che il lucchetto verde sia sempre presente
- **Contenuti**: tieni aggiornati articoli e informazioni di contatto

### Aggiornamenti del codice

Il sito è costruito con Next.js e le dipendenze possono necessitare aggiornamenti di sicurezza nel tempo. Se non sei pratico di programmazione, puoi:

1. Ignorare gli aggiornamenti per un po' (il sito continuerà a funzionare)
2. Chiedere a qualcuno di fiducia di aggiornare le dipendenze periodicamente (ogni 6-12 mesi)

Per chi è pratico:
```bash
npm update          # aggiorna le dipendenze minori
npm audit           # controlla vulnerabilità note
npm audit fix       # corregge vulnerabilità automaticamente
```

---

## Struttura del Progetto (per riferimento)

```
stefanoicardi.com/
├── content/              ← Contenuti del sito (JSON)
│   ├── articles.json     ← Articoli del blog
│   ├── podcast.json      ← Episodi podcast
│   ├── settings.json     ← Impostazioni (contatti, studio, CV)
│   ├── about.json        ← Pagina "Chi sono"
│   └── homepage.json     ← Contenuti homepage
├── public/
│   ├── images/           ← Tutte le immagini del sito
│   └── files/            ← File caricati (es. CV personalizzato)
├── src/
│   ├── app/              ← Pagine e API del sito
│   ├── components/       ← Componenti riutilizzabili
│   ├── lib/              ← Logica e utility
│   └── messages/         ← Traduzioni (it.json, en.json)
├── .env.example          ← Template variabili d'ambiente
├── package.json          ← Dipendenze del progetto
└── next.config.ts        ← Configurazione Next.js
```

---

## Risoluzione Problemi

### Il modulo contatti non invia email
1. Verifica che `RESEND_API_KEY` sia configurata correttamente su Vercel
2. Controlla la dashboard di Resend per eventuali errori
3. Verifica che il dominio sia ancora verificato su Resend

### Non riesco ad accedere al pannello admin
1. Verifica di usare la passphrase corretta (è quella in `ADMIN_PASSPHRASE` su Vercel)
2. Se hai sbagliato 5 volte, aspetta 15 minuti (c'è un blocco automatico)
3. Se hai cambiato la passphrase su Vercel, ricordati di fare Redeploy

### Il sito mostra errori dopo un deploy
1. Vai su Vercel → Deployments e controlla i log del deploy
2. Se il deploy è fallito, l'ultimo deploy funzionante resta attivo
3. Puoi fare rollback: su Vercel, trova un deploy precedente funzionante e clicca **Promote to Production**

### Le immagini non si caricano
1. Verifica che il percorso dell'immagine sia corretto (deve iniziare con `/images/`)
2. Verifica che il file sia stato incluso nel progetto dal developer
3. Controlla che il nome file non contenga spazi o caratteri speciali

### Il dominio non funziona
1. Verifica i record DNS dal tuo registrar
2. La propagazione DNS può richiedere fino a 48 ore
3. Su Vercel → Settings → Domains, controlla lo stato del dominio

---

## Contatti Utili

- **Vercel Support**: https://vercel.com/support
- **Resend Support**: https://resend.com/docs
- **Status Vercel** (per verificare se ci sono problemi globali): https://www.vercel-status.com
