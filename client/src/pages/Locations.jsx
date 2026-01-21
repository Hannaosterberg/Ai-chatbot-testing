import { useEffect, useState } from "react";
import { fetchLocations } from "../api.js";
import { LocationCard } from "../components/LocationCard.jsx";

export function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocations()
      .then((data) => setLocations(data.locations || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page">
      <h1>Lediga lokaler</h1>
      <p>Filtrera mellan innerstad/utanför tull, momsad/momsfri och olika prismodeller.</p>
      {loading && <div>Laddar...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="grid" style={{ marginTop: 12 }}>
        {locations.map((loc) => (
          <LocationCard key={loc.id} location={loc} />
        ))}
      </div>
    </main>
  );
}
