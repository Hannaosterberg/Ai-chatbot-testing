# Implementation Guide - AI Chatbot System

## 📋 Översikt

Detta dokument förklarar hur chatbot-systemet är uppbyggt och hur du implementerar en ny AI-provider (t.ex. Anthropic Claude).

## 🏗️ Systemarkitektur

Systemet är uppdelat i två huvuddelar:

### Frontend (client/)
- React-applikation som visar hemsidan
- ChatWidget-komponenten skickar meddelanden till backend
- Använder `/api/chat` endpoint för att få svar från chatboten

### Backend (server/)
- Express-server som hanterar API-anrop
- Provider-system för att byta mellan olika AI-leverantörer
- MongoDB för att spara chatloggar
- Data-filer med lokaler, FAQ och prismodeller

## 📁 Viktiga filer och deras syfte

### Backend-struktur

#### `server/src/index.js`
**Vad den gör:**
- Startar Express-servern
- Definierar API-endpoints (`/api/locations`, `/api/pricing`, `/api/faq`, `/api/chat`)
- Hanterar databaskoppling
- Använder `createChatProvider()` för att skapa rätt provider

**Viktiga delar:**
- `POST /api/chat` tar emot meddelanden och `provider`-parametern
- Skapar context-objekt med lokaler, priser och FAQ
- Sparar konversationer i MongoDB om databas är kopplad

#### `server/src/services/chatProviderFactory.js`
**Vad den gör:**
- Factory-funktion som skapar rätt provider baserat på namn
- Just nu stödjer den bara "mock"
- Här lägger du till nya providers när du implementerar dem

**Hur den fungerar:**
```javascript
export function createChatProvider(name = "mock") {
  if (name === "mock") {
    return createMockProvider();
  }
  // Här lägger du till: if (name === "anthropic") { ... }
  throw new Error(`Okänd provider: ${name}`);
}
```

#### `server/src/providers/mockProvider.js`
**Vad den gör:**
- Exempel på hur en provider ska se ut
- Implementerar en enkel mock-bot som svarar baserat på nyckelord
- Visar strukturen som alla providers måste följa

**Provider-struktur:**
Varje provider måste exportera en funktion som returnerar ett objekt med:
- `name`: String (t.ex. "mock", "anthropic")
- `respond()`: Async funktion som tar `{ messages, context }` och returnerar `{ role: "assistant", content: "..." }`

**Exempel:**
```javascript
export function createMockProvider() {
  return {
    name: "mock",
    async respond({ messages, context }) {
      // messages: Array med { role: "user"|"assistant", content: "..." }
      // context: { locations, pricing, faqs }
      // Returnera: { role: "assistant", content: "svar här" }
    }
  };
}
```

#### `server/src/data/`
**Vad den gör:**
- Innehåller hårdkodad data som används som kontext till chatboten
- `locations.js`: Alla lokaler med priser, beskrivningar etc.
- `faq.js`: Vanliga frågor och svar
- `pricing.js`: Prismodeller och förklaringar

#### `server/src/models/ChatLog.js`
**Vad den gör:**
- Mongoose-modell för att spara chatloggar i MongoDB
- Sparar provider-namn, alla meddelanden och timestamp

#### `server/src/config/db.js`
**Vad den gör:**
- Hanterar MongoDB-koppling
- Anropas från `index.js` om `MONGO_URI` finns i `.env`

### Frontend-struktur

#### `client/src/components/ChatWidget.jsx`
**Vad den gör:**
- UI-komponenten för chatten
- Skickar meddelanden till `/api/chat` med `provider`-parametern
- Visar konversationen i realtid

**Viktigt:**
- Just nu är `provider` hårdkodad till "mock" i API-anropet
- Du kan ändra detta eller göra det konfigurerbart

#### `client/src/api.js`
**Vad den gör:**
- API-funktioner för att kommunicera med backend
- `sendMessage()` skickar meddelanden till `/api/chat`

## 🔧 Steg-för-steg: Implementera Anthropic Claude

### Steg 1: Installera Anthropic SDK (om inte redan gjort)

```bash
cd server
npm install @anthropic-ai/sdk
```

### Steg 2: Lägg till API-nyckel i `.env`

I `server/.env` (kopiera från `env.example` om den inte finns):

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/ai-chatbot
ANTHROPIC_API_KEY=din-api-nyckel-här
```

### Steg 3: Skapa ny provider-fil

Skapa filen: `server/src/providers/anthropicProvider.js`

```javascript
import Anthropic from "@anthropic-ai/sdk";

export function createAnthropicProvider() {
  const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  return {
    name: "anthropic",
    async respond({ messages, context }) {
      // Formatera context till en textprompt
      const contextText = `
Du är en hjälpsam chatbot för Nordic Space, en lokaluthyrningsplattform.

TILLGÄNGLIGA LOKALER:
${JSON.stringify(context.locations, null, 2)}

PRISMODELLER:
${JSON.stringify(context.pricing, null, 2)}

VANLIGA FRÅGOR OCH SVAR:
${context.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

Svara på användarens frågor baserat på informationen ovan. Var vänlig, professionell och specifik.
`;

      // Konvertera messages till Anthropic-format
      // Anthropic vill ha system + user messages
      const systemMessage = contextText;
      const conversationMessages = messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .map(m => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content
        }));

      // Hämta senaste användarmeddelandet
      const lastUserMessage = conversationMessages
        .filter(m => m.role === "user")
        .slice(-1)[0];

      try {
        const response = await client.messages.create({
          model: "claude-3-5-sonnet-20241022", // eller annan modell
          max_tokens: 1024,
          system: systemMessage,
          messages: conversationMessages
        });

        // Anthropic returnerar response.content som en array
        const content = response.content[0]?.text || "Jag kunde inte generera ett svar.";

        return {
          role: "assistant",
          content: content
        };
      } catch (error) {
        console.error("Anthropic error:", error);
        throw new Error(`Anthropic API fel: ${error.message}`);
      }
    }
  };
}
```

### Steg 4: Uppdatera Factory

I `server/src/services/chatProviderFactory.js`, lägg till:

```javascript
import { createMockProvider } from "../providers/mockProvider.js";
import { createAnthropicProvider } from "../providers/anthropicProvider.js";

export function createChatProvider(name = "mock") {
  if (name === "mock") {
    return createMockProvider();
  }

  if (name === "anthropic") {
    return createAnthropicProvider();
  }

  throw new Error(`Okänd provider: ${name}`);
}
```

### Steg 5: Uppdatera Frontend (valfritt)

I `client/src/components/ChatWidget.jsx`, ändra provider-parametern:

```javascript
// Hitta raden där sendMessage anropas och ändra:
const response = await sendMessage(messages, "anthropic"); // istället för "mock"
```

Eller gör det konfigurerbart via en dropdown/inställning.

### Steg 6: Testa

1. Starta servern: `cd server && npm run dev`
2. Starta frontend: `cd client && npm run dev`
3. Öppna chatten och testa en fråga
4. Kontrollera att svaret kommer från Anthropic

## 🔍 Hur systemet fungerar tillsammans

### Flöde när användare skickar meddelande:

1. **Frontend** (`ChatWidget.jsx`):
   - Användare skriver meddelande
   - `sendMessage()` anropas med meddelanden och provider-namn

2. **Backend** (`index.js`):
   - `POST /api/chat` tar emot request
   - Skapar context-objekt med lokaler, priser, FAQ
   - Anropar `createChatProvider(provider)` för att få rätt provider

3. **Provider Factory** (`chatProviderFactory.js`):
   - Returnerar rätt provider-instans baserat på namn

4. **Provider** (t.ex. `anthropicProvider.js`):
   - Tar emot `messages` och `context`
   - Formaterar context till prompt
   - Anropar Anthropic API
   - Returnerar svar som `{ role: "assistant", content: "..." }`

5. **Backend** (`index.js`):
   - Sparar hela konversationen i MongoDB (om kopplad)
   - Skickar tillbaka svaret till frontend

6. **Frontend** (`ChatWidget.jsx`):
   - Visar svaret i chatten

## 📝 Checklista för ny provider

- [ ] Installera SDK/package för providern
- [ ] Lägg till API-nyckel i `server/.env`
- [ ] Skapa ny fil i `server/src/providers/[provider]Provider.js`
- [ ] Implementera `create[Provider]Provider()` som returnerar `{ name, respond() }`
- [ ] Uppdatera `chatProviderFactory.js` för att inkludera ny provider
- [ ] Testa att providern fungerar
- [ ] Uppdatera frontend för att använda ny provider (eller gör det konfigurerbart)

## 🎯 Tips och bästa praxis

1. **Context-formatering**: Olika AI-providers vill ha context på olika sätt. Experimentera med hur du formaterar lokaler, priser och FAQ för bästa resultat.

2. **Felhantering**: Lägg alltid till try-catch i providern och returnera användbara felmeddelanden.

3. **Logging**: Använd `console.log()` för att debugga vad som skickas till och tas emot från API:et.

4. **Modellval**: Anthropic har flera modeller (claude-3-opus, claude-3-sonnet, claude-3-haiku). Testa olika för att se vad som fungerar bäst.

5. **Token-begränsningar**: Var medveten om max tokens. Stora context-objekt kan ta mycket plats.

6. **System prompts**: En bra system-prompt är viktig. Beskriv tydligt vad chatboten ska göra och vilken information den har tillgång till.

## 🐛 Felsökning

**Problem: "Okänd provider"**
- Kontrollera att providern är registrerad i `chatProviderFactory.js`
- Kontrollera att provider-namnet matchar exakt (case-sensitive)

**Problem: API-nyckel fungerar inte**
- Kontrollera att `.env`-filen finns i `server/`-mappen
- Kontrollera att variabeln heter exakt `ANTHROPIC_API_KEY`
- Starta om servern efter att ha ändrat `.env`

**Problem: Inga svar från chatboten**
- Kontrollera serverns console för felmeddelanden
- Kontrollera att context-objektet skickas korrekt
- Testa providern isolerat med en enkel test-fil

**Problem: Chatloggar sparas inte**
- Kontrollera att `MONGO_URI` är satt i `.env`
- Kontrollera att MongoDB körs
- Systemet fungerar även utan MongoDB, men loggar sparas då inte

## 📚 Ytterligare resurser

- Anthropic API-dokumentation: https://docs.anthropic.com/
- Mongoose-dokumentation: https://mongoosejs.com/docs/
- Express-dokumentation: https://expressjs.com/
