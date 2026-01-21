import { useEffect, useState } from "react";
import { fetchFaq } from "../api.js";

export function Faq() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFaq().then((data) => setFaqs(data.faqs || []));
  }, []);

  return (
    <main className="page">
      <h1>FAQ</h1>
      <p>10–15 vanliga frågor kring hyror, moms, parkering och kontrakt.</p>
      <div className="grid" style={{ marginTop: 12 }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
