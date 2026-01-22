import { useEffect, useRef, useState } from "react";
import { sendChat } from "../api.js";

export function ChatWidget() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hej! Hur kan jag hjälpa dig idag?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  async function handleSend() {
    if (!input.trim()) return;
    const nextMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    try {
      console.log("Frontend: Skickar meddelande till API...");
      const res = await sendChat(nextMessages, "anthropic");
      console.log("Frontend: Fick svar från API:", res);
      if (res && res.reply) {
        setMessages([...nextMessages, res.reply]);
      } else {
        throw new Error("Inget svar från servern");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      const errorMessage = error.message || "Tyvärr, något gick fel. Försök igen.";
      setMessages([...nextMessages, { 
        role: "assistant", 
        content: `Fel: ${errorMessage}. Kolla serverns console för mer information.` 
      }]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-widget">
      <header>
        <div style={{ fontWeight: 700 }}>Chatta med oss</div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>AI-demo · sparar chatloggar</div>
      </header>
      <div className="chat-messages" ref={scrollRef}>
        {messages.map((m, idx) => (
          <div key={idx} className={`bubble ${m.role}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="bubble assistant">Skriver...</div>}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ställ en fråga om lokaler..."
        />
        <button className="btn" onClick={handleSend} disabled={loading}>Skicka</button>
      </div>
    </div>
  );
}
