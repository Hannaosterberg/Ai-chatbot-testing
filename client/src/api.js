const API_BASE = "/api";

async function handleResponse(res) {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API fel");
  }
  return res.json();
}

export async function fetchLocations() {
  const res = await fetch(`${API_BASE}/locations`);
  return handleResponse(res);
}

export async function fetchPricing() {
  const res = await fetch(`${API_BASE}/pricing`);
  return handleResponse(res);
}

export async function fetchFaq() {
  const res = await fetch(`${API_BASE}/faq`);
  return handleResponse(res);
}

export async function sendChat(messages) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });
  return handleResponse(res);
}
