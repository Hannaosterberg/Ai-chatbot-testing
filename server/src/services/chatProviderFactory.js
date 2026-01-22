import { createMockProvider } from "../providers/mockProvider.js";
import { createAnthropicProvider } from "../providers/anthropicProvider.js";

export function createChatProvider(name = "mock") {
  try {
    if (name === "mock") {
      return createMockProvider();
    }
    if (name === "anthropic") {
      console.log("Factory: Skapar Anthropic provider...");
      const provider = createAnthropicProvider();
      console.log("Factory: Anthropic provider skapad");
      return provider;
    }

    throw new Error(`Okänd provider: ${name}`);
  } catch (error) {
    console.error("Factory: Fel när provider skapades:", error.message);
    throw error;
  }
}
