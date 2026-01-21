📌 Projektkontext – AI-chatbot testplattform (LIA)

Du ska bygga en demo-hemsida för uthyrning av lokaler, som efterliknar en riktig kommersiell plattform. Syftet är att testa och jämföra olika AI-chatbotar som kan svara på kunders frågor baserat på hemsidans innehåll.

Projektet ska vara enkelt men realistiskt, med fokus på:

 - tydlig struktur

 - realistisk data

 - enkel backend

 - lätt att koppla in och byta AI-chatbot

🧱 Techstack
Frontend

Vite

React (JavaScript, ej TypeScript)

React Router

Enkel CSS eller Tailwind (valfritt)

Backend

Node.js

Express

MongoDB

Mongoose

🎯 Funktionellt mål

Besökare ska kunna:

- bläddra bland lediga lokaler

- läsa om prismodeller

- se information om uthyrning

- ställa frågor till en AI-chatbot

få svar som baseras på:

- lokaler

- priser

- villkor

- FAQ

- generell information om företaget

❌ Ingen inloggning krävs
✅ Chatloggar ska kunna sparas i databasen (för analys)

🧭 Sidor som ska finnas
Navigation (Header)

Start

Lediga lokaler

Hyr ut lokal

Prismodeller

FAQ

Blogg

Om oss

Footer

Kontaktuppgifter

Telefonnummer

E-post

Organisationsnummer

Länkar till FAQ / Integritet / Villkor

🏢 Lokaler (hårdkodad data / seed data)

Skapa minst 6–8 lokaler med varierande data.

Varje lokal ska ha följande fält: (exempel, du får lägga till fler fält om dui vill)

{
  id,
  name,
  address,
  city,
  municipality,
  insideTull, // true / false
  vatIncluded, // momsad eller ej
  contractType, // korttid / långtidskontrakt
  areaSqm,
  capacity,
  pricing: {
    monthlyPrice,
    hourlyPrice,
    dailyPrice,
    pricePerWorkstation
  },
  amenities: [
    "wifi",
    "kök",
    "fika",
    "catering",
    "parkering",
    "ljudsystem",
    "projektor",
    "whiteboard"
  ],
  description
}


Exempel på variation:

coworking-lokal i innerstan

konferenslokal utanför tull

eventlokal med dagspris

kontorshotell med pris per arbetsplats

lokal utan moms

lokal med endast timpris

💰 Prismodeller (separat sida)

Visa och beskriv:

Månadshyra

Timhyra

Dagspris

Pris per arbetsplats

Skillnad på momsad / ej momsad

Korttidskontrakt vs långtidskontrakt

Innerstad vs utanför tull

❓ FAQ – exempel på frågor

Skapa 10–15 realistiska frågor, t.ex:

Vad ingår i hyran?

Är priserna inklusive moms?

Kan jag hyra lokal per timme?

Vad betyder "utanför tull"?

Finns parkering?

Kan man boka catering?

Hur lång är uppsägningstiden?

Kan jag hyra lokal för event?

Hur många personer får plats?

🤖 AI-Chatbot (viktigt)

Chatboten ska:

finnas som en widget på sidan

kunna svara på frågor om:

lokaler

priser

tillgänglighet

villkor

FAQ

kunna få kontext från backend (lokaldata, FAQ, prismodeller)

spara varje konversation i MongoDB:

{
  messages: [
    { role: "user", content: "..." },
    { role: "assistant", content: "..." }
  ],
  createdAt
}


⚠️ Chatboten ska byggas så att olika AI-lösningar enkelt kan bytas ut (t.ex. OpenAI, open-source LLM, mock-bot).

🧪 Fokus för implementation

Enkel men tydlig UI

Läsbar kod

Tydlig separation mellan frontend och backend

API-endpoint som skickar:

lokaldata

FAQ

prismodeller
till chatboten som kontext

🎯 Slutmål

Resultatet ska vara:

en fungerande demo-hemsida

en chatbot som kan svara korrekt på realistiska frågor

ett bra underlag för att jämföra olika AI-chatbotar under LIA