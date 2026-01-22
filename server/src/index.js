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
    const { messages = [], provider = "mock" } = req.body || {};

    if (!Array.isArray(messages) || !messages.length) {
      return res.status(400).json({ error: "messages krävs" });
    }

    const chatProvider = createChatProvider(provider);
    const context = { locations, pricing: pricingModels, faqs };
    const assistantMessage = await chatProvider.respond({ messages, context });

    if (dbConnected) {
      const log = new ChatLog({
        provider: chatProvider.name,
        messages: [...messages, assistantMessage],
      });
      await log.save();
    }

    res.json({ reply: assistantMessage, context });
  } catch (error) {
    console.error("Chat error", error);
    res.status(500).json({ error: "Kunde inte hantera chattförfrågan" });
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
