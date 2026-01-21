export function LocationCard({ location }) {
  return (
    <div className="card">
      <h3>{location.name}</h3>
      <div style={{ color: "#475569", marginBottom: 8 }}>
        {location.address}, {location.city} ({location.insideTull ? "innanför tull" : "utanför tull"})
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
        <span className="pill">Kapacitet {location.capacity}</span>
        <span className="pill">{location.areaSqm} kvm</span>
        <span className="pill">{location.contractType === "långtid" ? "Långtidsavtal" : "Korttid"}</span>
        <span className="pill">{location.vatIncluded ? "Moms 25%" : "Momsfri"}</span>
      </div>
      <div style={{ marginBottom: 8 }}>{location.description}</div>
      <div style={{ marginBottom: 6, fontWeight: 600 }}>Priser</div>
      <div style={{ color: "#334155", marginBottom: 8 }}>
        {location.pricing.monthlyPrice && <span className="pill">Månad {location.pricing.monthlyPrice} kr</span>}
        {location.pricing.dailyPrice && <span className="pill">Dag {location.pricing.dailyPrice} kr</span>}
        {location.pricing.hourlyPrice && <span className="pill">Tim {location.pricing.hourlyPrice} kr</span>}
        {location.pricing.pricePerWorkstation && <span className="pill">Arbetsplats {location.pricing.pricePerWorkstation} kr/mån</span>}
      </div>
      <div style={{ marginBottom: 4, fontWeight: 600 }}>Bekvämligheter</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {location.amenities.map((a) => (
          <span key={a} className="pill">{a}</span>
        ))}
      </div>
    </div>
  );
}
