import { createMockProvider } from "../providers/mockProvider.js";

export function createChatProvider(name = "mock") {
  if (name === "mock") {
    return createMockProvider();
  }

  throw new Error(`Okänd provider: ${name}`);
}
