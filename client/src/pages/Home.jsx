import { Link } from "react-router-dom";

export function Home() {
  return (
    <main className="page">
      <section className="hero card">
        <div style={{ fontSize: 14, color: "#0ea5e9", fontWeight: 700 }}>Demo för lokaler + AI-chatbot</div>
        <h1 style={{ margin: 0 }}>Hitta, boka och fråga — allt på ett ställe</h1>
        <p style={{ margin: 0, color: "#475569" }}>
          Nordic Space samlar lediga lokaler, prismodeller och vanliga frågor. Chatboten ger svar baserat på innehållet och sparar dialogen för analys.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link to="/lokaler" className="btn">Bläddra lokaler</Link>
          <Link to="/faq" className="btn secondary">Vanliga frågor</Link>
        </div>
      </section>

      <section className="grid grid-3" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Realistisk data</h3>
          <p>8 lokaler med varierande pris, momsstatus, kapacitet och bekvämligheter.</p>
        </div>
        <div className="card">
          <h3>Pluggbar chatbot</h3>
          <p>Endpoint ger kontext (lokaler, pris, FAQ). Provider kan bytas från mock till valfri LLM.</p>
        </div>
        <div className="card">
          <h3>Enkel backend</h3>
          <p>Express + Mongo för sparade chatloggar. Frontend via React Router och Vite.</p>
        </div>
      </section>
    </main>
  );
}
