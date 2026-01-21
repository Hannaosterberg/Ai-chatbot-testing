import { useEffect, useState } from "react";
import { fetchPricing } from "../api.js";

export function Pricing() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPricing().then((data) => setItems(data.pricing || []));
  }, []);

  return (
    <main className="page">
      <h1>Prismodeller</h1>
      <p>Jämför månadshyra, timhyra, dagspris och pris per arbetsplats. Se också skillnader mellan korttids- och långtidsavtal samt moms.</p>
      <div className="grid grid-3" style={{ marginTop: 12 }}>
        {items.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div style={{ fontSize: 13, color: "#475569" }}>{item.includesVat}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
