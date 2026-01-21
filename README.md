# AI-chatbot testplattform – lokaluthyrning

Demo byggd enligt `project.md`: Vite/React frontend, Express/Mongo backend och pluggbar AI-chatbot med mock-provider.

## Struktur
- `client/` – Vite + React Router, chattwidget, sidor för lokaler, priser, FAQ, blogg m.m.
- `server/` – Express API, hårdkodad data (lokaler, prismodeller, FAQ) och Mongo-loggning av chat.

## Kom igång
1) Installera beroenden  
```bash
cd server && npm install
cd ../client && npm install
```

2) Konfigurera miljövariabler  
Kopiera `server/env.example` till `server/.env` och ange `MONGO_URI`.

3) Starta backend  
```bash
cd server
npm run dev
```

4) Starta frontend  
```bash
cd client
npm run dev
```
Vite proxar `/api` till `http://localhost:4000`.

## API-ytor
- `GET /api/locations` – hårdkodad lokaldata (8 st, varierade prismodeller/moms).
- `GET /api/pricing` – prismodeller och förklaringar.
- `GET /api/faq` – 15 FAQ-poster.
- `POST /api/chat` – `{ messages: [{role, content}], provider? }` → svar + sparad logg i Mongo.

Chatboten använder en mock-provider som matchar frågan mot lokaler/FAQ och kan ersättas i `src/services/chatProviderFactory.js`.

## Att byta AI-leverantör
- Lägg till en provider i `server/src/providers/`.
- Utöka `createChatProvider` med en ny switch.
- Återanvänd `context` (lokaler, priser, FAQ) i provider-anropet.

## Testdata som ingår
- 8 lokaler: innerstad/utanför tull, momsad/momsfri, kort/långtidskontrakt, tim/dag/månad/arbetsplats.
- Prismodeller: månad, tim, dag, arbetsplats, momsad/ej, kontraktstyper, innerstad vs tull.
- FAQ: 15 frågor om priser, moms, parkering, kontrakt och event.
