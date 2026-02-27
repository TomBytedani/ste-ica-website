# Guida alla Transizione: stefanoicardi.com

Questa guida ti accompagna passo-passo nel trasferimento del sito dal vecchio WordPress alla nuova versione.

---

## Panoramica

Il nuovo sito ha bisogno di **due soli servizi esterni**:

| Servizio | Cosa fa | Costo |
|----------|---------|-------|
| **Vercel** | Hosting del sito + storage contenuti | Gratuito (piano Hobby) |
| **Resend** | Invio email dal modulo contatti | Gratuito fino a 3.000 email/mese |

Tutto il resto (contenuti, immagini) è incluso nel progetto stesso. I contenuti creati dal pannello admin (articoli, podcast, impostazioni) vengono salvati su Vercel Blob Storage e **persistono automaticamente** tra un deploy e l'altro.

---

## Step 1: Creare un account Vercel

Vercel è la piattaforma che ospita il sito.

1. Vai su https://vercel.com/signup
2. Registrati con la tua email personale (puoi usare "Continue with Email")
3. Conferma l'email

### Importare il progetto

Il developer ti fornirà un link per importare il progetto direttamente su Vercel:

1. Dalla dashboard Vercel, clicca **"Add New Project"**
2. Usa il link/template fornito dal developer per importare il progetto
3. Vercel rileverà automaticamente che è un progetto Next.js
4. **Prima di cliccare Deploy**, configura le variabili d'ambiente (vedi Step 3)

---

## Step 2: Creare un account Resend

Resend gestisce l'invio delle email quando qualcuno compila il modulo contatti.

1. Vai su https://resend.com/signup
2. Registrati con email e password
3. Conferma l'email

### Ottenere la API Key

1. Dalla dashboard Resend, vai su **API Keys** (menu a sinistra)
2. Clicca **"Create API Key"**
3. Nome: `stefanoicardi-website`
4. Permission: **Sending access**
5. Domain: **All domains** (per ora)
6. Copia la chiave — **la vedrai solo una volta!**

### Verificare il dominio (per email professionali)

Senza verifica, le email partono da `onboarding@resend.dev`. Per mandarle da un indirizzo `@stefanoicardi.com`:

1. In Resend, vai su **Domains** → **Add Domain**
2. Inserisci `stefanoicardi.com`
3. Resend ti darà dei **record DNS** da aggiungere (vedi Step 4)
4. Dopo averli aggiunti, clicca **Verify** in Resend
5. La verifica può richiedere da pochi minuti a 24 ore

---

## Step 3: Configurare le variabili d'ambiente su Vercel

Nella pagina di setup del progetto su Vercel (o dopo in Settings → Environment Variables), aggiungi:

| Variabile | Valore | Note |
|-----------|--------|------|
| `RESEND_API_KEY` | `re_xxxxxxxxx...` | La chiave API copiata da Resend |
| `RESEND_FROM_EMAIL` | `noreply@stefanoicardi.com` | Dopo verifica dominio. Prima usa `onboarding@resend.dev` |
| `CONTACT_EMAIL` | `stefano.icardi@outlook.com` | Dove ricevi le email dal modulo contatti |
| `NEXT_PUBLIC_SITE_URL` | `https://stefanoicardi.com` | URL del sito |
| `ADMIN_PASSPHRASE` | (scegli una password sicura, min. 20 caratteri) | Password per il pannello admin |

**Importante:** Per `ADMIN_PASSPHRASE`, scegli qualcosa di lungo e sicuro. Esempio di formato: `La-mia-frase-segreta-molto-lunga-2024!`

### Attivare Blob Storage (per i contenuti)

Blob Storage permette ai contenuti creati dal pannello admin di persistere tra i deploy.

1. Dalla dashboard Vercel, vai nelle **Settings** del progetto → **Storage**
2. Clicca **"Create Database"** → seleziona **Blob**
3. Dai un nome allo store (es. `stefanoicardi-content`)
4. Clicca **Create**
5. Vercel aggiungerà automaticamente la variabile `BLOB_READ_WRITE_TOKEN` al progetto

Dopo aver inserito tutte le variabili, clicca **Deploy**.

---

## Step 4: Configurare il dominio

### Su Vercel

1. Vai nelle **Settings** del progetto su Vercel → **Domains**
2. Aggiungi `stefanoicardi.com`
3. Aggiungi anche `www.stefanoicardi.com`
4. Vercel ti mostrerà i **record DNS** necessari

### Dal tuo provider di dominio (dove hai comprato stefanoicardi.com)

Devi modificare i record DNS. I dettagli dipendono dal tuo registrar (Aruba, GoDaddy, Namecheap, ecc.), ma in generale:

**Opzione A — Nameserver Vercel (consigliata, più semplice):**
1. Nelle impostazioni del dominio sul tuo registrar, cambia i nameserver a quelli forniti da Vercel
2. Vercel gestirà tutto automaticamente (inclusi i record per Resend)

**Opzione B — Record DNS manuali:**
1. Aggiungi un record **A** che punta all'IP fornito da Vercel (es. `76.76.21.21`)
2. Aggiungi un record **CNAME** per `www` che punta a `cname.vercel-dns.com`
3. Aggiungi i record DNS di Resend (per la verifica email):
   - Tipicamente 1 record **MX**, 1-2 record **TXT** (SPF/DKIM), e 1 record **CNAME**
   - I valori esatti li trovi nella dashboard di Resend → Domains

### Disattivare il vecchio WordPress

Una volta che il nuovo sito funziona sul dominio:
1. Verifica che tutto funzioni navigando su `stefanoicardi.com`
2. Testa il modulo contatti
3. Testa il pannello admin su `stefanoicardi.com/admin`
4. A quel punto puoi cancellare/disattivare il vecchio hosting WordPress

---

## Step 5: Verifica finale

Dopo il deploy e la configurazione DNS (possono servire fino a 48h per la propagazione):

- [ ] Il sito si apre su `https://stefanoicardi.com`
- [ ] Il sito si apre su `https://www.stefanoicardi.com`
- [ ] La versione italiana funziona (`/it/`)
- [ ] La versione inglese funziona (`/en/`)
- [ ] Il modulo contatti invia email correttamente
- [ ] Il pannello admin è accessibile (`/admin`)
- [ ] Le immagini si caricano correttamente
- [ ] I redirect dal vecchio sito funzionano (`/chisono` → `/chi-sono`, `/blog` → `/articoli`)
- [ ] Il certificato HTTPS è attivo (lucchetto verde nel browser)
- [ ] Crea un articolo di prova dal pannello admin e verifica che persista dopo un redeploy

---

## Riepilogo account da creare

| Servizio | URL registrazione | Credenziali da conservare |
|----------|-------------------|---------------------------|
| Vercel | vercel.com/signup | Email + password |
| Resend | resend.com/signup | Email + password + API Key |

**Conserva tutte le credenziali in un posto sicuro** (es. un password manager come Bitwarden, 1Password, o anche un foglio scritto a mano in un posto sicuro).
