import { Anthropic } from "@anthropic-ai/sdk";

export const createAnthropicProvider = () => {
    if (!process.env.ANTHROPIC_API_KEY) {
        throw new Error("ANTHROPIC_API_KEY saknas i miljövariabler. Lägg till den i server/.env");
    }

    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    return {
        name: "anthropic", 
        async respond({ messages, context }) {
            // Formatera lokaler mer kompakt
            const locationsText = context.locations.map(loc => 
                `${loc.name} (${loc.city}): ${loc.areaSqm}kvm, ${loc.capacity} pers, ${loc.contractType}, ${loc.vatIncluded ? 'med moms' : 'momsfri'}, Priser: ${loc.pricing.hourlyPrice ? `Tim: ${loc.pricing.hourlyPrice}kr` : ''} ${loc.pricing.dailyPrice ? `Dag: ${loc.pricing.dailyPrice}kr` : ''} ${loc.pricing.monthlyPrice ? `Månad: ${loc.pricing.monthlyPrice}kr` : ''} ${loc.pricing.pricePerWorkstation ? `Arbetsplats: ${loc.pricing.pricePerWorkstation}kr/mån` : ''}, Bekvämligheter: ${loc.amenities.join(', ')}`
            ).join('\n');

            // Formatera FAQ mer kompakt
            const faqText = context.faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n');

            const contextText = `Du är en hjälpsam chatbot för Nordic Space, en lokaluthyrningsplattform som erbjuder lediga lokaler, prismodeller och vanliga frågor.

TILLGÄNGLIGA LOKALER:
${locationsText}

PRISMODELLER:
${JSON.stringify(context.pricing, null, 2)}

VANLIGA FRÅGOR OCH SVAR:
${faqText}

Du svarar på kunders frågor baserat på innehållet på hemsidan och informationen ovan.
Din ton ska vara trevlig, professionell, informativ och specifik på frågan men inte för formell.`;

            const conversationMessages = messages
                .filter(m => m.role === "user" || m.role === "assistant")
                .map(m => ({
                    role: m.role === "assistant" ? "assistant" : "user",
                    content: m.content
                }));

            try {
                console.log("Anthropic: Skickar request med", conversationMessages.length, "meddelanden");
                console.log("Anthropic: Modell:", "claude-3-5-sonnet-20241022");
                
                const response = await client.messages.create({
                    model: "claude-3-5-sonnet-20241022", // Korrekt modellnamn
                    max_tokens: 1024,
                    system: contextText,
                    messages: conversationMessages
                });
                
                console.log("Anthropic: Fick svar, längd:", response.content[0]?.text?.length || 0);

                const content = response.content[0]?.text || "Jag kunde inte generera ett svar på din fråga. Försök igen med en annan fråga.";

                return {
                    role: "assistant",
                    content: content
                };
            } catch (err) {
                console.error("Anthropic API error:", err);
                // Ge mer detaljerad felinformation
                if (err.status === 401) {
                    throw new Error("Ogiltig API-nyckel. Kontrollera att ANTHROPIC_API_KEY är korrekt i server/.env");
                } else if (err.status === 429) {
                    throw new Error("För många förfrågningar. Vänta lite och försök igen.");
                } else if (err.message) {
                    throw new Error(`Anthropic API fel: ${err.message}`);
                } else {
                    throw new Error(`Anthropic API fel: ${JSON.stringify(err)}`);
                }
            }
        }
    };
}