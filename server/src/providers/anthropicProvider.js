import { Anthropic } from "@anthropic-ai/sdk";

const createAnthropicProvider = () => {
    const client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY
    });

    return {
        name: "anthropic", 
        async respond({ messages, context }) {
            const contextText = `
            "Du är en hjälpsam chatbot för Nordic Space, en lokaluthyrningsplattform som erbjuder lediga lokaler, prismodeller och vanliga frågor.

            TILLGÄNGLIGA LOKALER:
            ${JSON.stringify(context.locations, null, 2)}
            PRISMODELLER:
            ${JSON.stringify(context.pricing, null, 2)}
            VANLIGA FRÅGOR OCH SVAR:
            ${context.faqs.map(f => `Q ${f.question}\nA: ${f.answer}`).join("\n\n")}

            Du svarar på kunders frågor baserat på innehållet på hemsidan och kontexten ovan.
            Din ton ska vara trevlig, professionell, informativ och specifik på frågan men inte för formell.
            `;

            const systemMessage = contextText;
            const conversationMessages = messages
                .filter(m => m.role === "user" || m.role === "assistant")
                .map(m => ({
                    role: m.role === "assistant" ? "assistant" : "user",
                    content: m.content
                }));

            const lastUserMessage = conversationMessages
                .filter(m => m.role === "user")
                .slice(-1)[0];

            try {
                const response = await client.messages.create({
                    model: "claude-haiku-4-5-20251001",
                    max_tokens: 1000,
                    system: systemMessage,
                    messages: conversationMessages
                });

                const content = response.content[0]
            } catch (err) {
                
            }


                
        }
    }
}