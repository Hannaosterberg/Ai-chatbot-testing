import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import { faqs } from "./data/faq.js";
import { locations } from "./data/locations.js";
import { pricingModels } from "./data/pricing.js";
import { ChatLog } from "./models/ChatLog.js";
import { createChatProvider } from "./services/chatProviderFactory.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
let dbConnected = false;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_, res) => {
  res.json({ status: "ok", provider: "mock", version: "1.0.0" });
});

app.get("/api/locations", (_, res) => {
  res.json({ locations });
});

app.get("/api/pricing", (_, res) => {
  res.json({ pricing: pricingModels });
});

app.get("/api/faq", (_, res) => {
  res.json({ faqs });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages = [], provider = "anthropic" } = req.body || {};
    console.log("Backend: Mottog chat request, provider:", provider, "meddelanden:", messages.length);

    if (!Array.isArray(messages) || !messages.length) {
      return res.status(400).json({ error: "messages krävs" });
    }

    console.log("Backend: Skapar provider:", provider);
    const chatProvider = createChatProvider(provider);
    const context = { locations, pricing: pricingModels, faqs };
    console.log("Backend: Anropar provider.respond()...");
    const assistantMessage = await chatProvider.respond({ messages, context });
    console.log("Backend: Fick svar från provider, längd:", assistantMessage.content?.length || 0);

    if (dbConnected) {
      const log = new ChatLog({
        provider: chatProvider.name,
        messages: [...messages, assistantMessage]
      });
      await log.save();
    }

    res.json({ reply: assistantMessage, context });
  } catch (error) {
    console.error("Chat error:", error);
    // Skicka mer detaljerat felmeddelande till frontend
    const errorMessage = error.message || "Kunde inte hantera chattförfrågan";
    res.status(500).json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

async function start() {
  if (!process.env.MONGO_URI) {
    console.warn("MONGO_URI saknas - chatloggar kan inte sparas utan databas.");
  }

  if (process.env.MONGO_URI) {
    await connectDb(process.env.MONGO_URI);
    dbConnected = true;
    console.log("✅ Connected to MongoDB");
  }

  app.listen(port, () => {
    console.log(`Server lyssnar på http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error("Kunde inte starta servern", err);
  process.exit(1);
});
