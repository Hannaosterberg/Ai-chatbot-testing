const API_BASE = "/api";

async function handleResponse(res) {
  if (!res.ok) {
    let errorMessage = "API fel";
    try {
      const errorData = await res.json();
      errorMessage = errorData.error || errorData.message || `HTTP ${res.status}: ${res.statusText}`;
    } catch {
      const text = await res.text();
      errorMessage = text || `HTTP ${res.status}: ${res.statusText}`;
    }
    console.error("API error response:", res.status, errorMessage);
    throw new Error(errorMessage);
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

export async function sendChat(messages, provider = "anthropic") {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, provider })
  });
  return handleResponse(res);
}
