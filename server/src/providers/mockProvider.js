import { faqs } from "../data/faq.js";

function scoreLocation(location, question) {
  const haystack = `${location.name} ${location.city} ${location.municipality} ${location.description} ${location.amenities.join(" ")}`.toLowerCase();
  let score = 0;
  question.split(/\s+/).forEach((word) => {
    if (word.length > 3 && haystack.includes(word)) {
      score += 1;
    }
  });
  return score;
}

function buildAnswer(locationMatches, question, context) {
  if (locationMatches.length) {
    const top = locationMatches[0];
    const pricingBits = [
      top.pricing.hourlyPrice ? `timpris ${top.pricing.hourlyPrice} kr` : null,
      top.pricing.dailyPrice ? `dagspris ${top.pricing.dailyPrice} kr` : null,
      top.pricing.monthlyPrice ? `månad ${top.pricing.monthlyPrice} kr` : null,
      top.pricing.pricePerWorkstation ? `arbetsplats ${top.pricing.pricePerWorkstation} kr/mån` : null
    ].filter(Boolean);

    return `Jag tror du syftar på ${top.name} i ${top.city}. Kapacitet ${top.capacity} pers, yta ${top.areaSqm} kvm. Kontrakt: ${top.contractType}. Priser: ${pricingBits.join(", ") || "kontakta oss för offert"}. Moms: ${top.vatIncluded ? "25 % tillkommer" : "momsfri uthyrning"}. Bekvämligheter: ${top.amenities.join(", ")}.`;
  }

  const faqMatch = faqs.find((f) => question.includes(f.question.toLowerCase().slice(0, 10)));
  if (faqMatch) {
    return faqMatch.answer;
  }

  return `Jag kan hjälpa till med lokaler, priser och villkor. Fråga gärna mer specifikt så matchar jag en lokal. Exempel: "Har ni parkering nära Täby?"`;
}

export function createMockProvider() {
  return {
    name: "mock",
    async respond({ messages, context }) {
      const userMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";
      const normalizedQuestion = userMessage.toLowerCase();

      const locationMatches = context.locations
        .map((loc) => ({ loc, score: scoreLocation(loc, normalizedQuestion) }))
        .filter((candidate) => candidate.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((item) => item.loc);

      const answer = buildAnswer(locationMatches, normalizedQuestion, context);

      return {
        role: "assistant",
        content: answer
      };
    }
  };
}
