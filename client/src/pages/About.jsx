export function About() {
  return (
    <main className="page">
      <h1>Om oss</h1>
      
      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Vår vision</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '12px' }}>
          Nordic Space grundades 2018 med visionen att göra lokaluthyrning enkelt, 
          flexibelt och tillgängligt för alla. Vi tror på att moderna arbetsplatser 
          ska vara flexibla och anpassningsbara efter behov – oavsett om du behöver 
          en timme, en dag eller ett långtidskontrakt.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Varför välja Nordic Space?</h2>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>Flexibla avtal:</strong> Från timhyra till långtidskontrakt – vi anpassar oss efter dina behov
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Bred geografisk täckning:</strong> Lokaler både inne i stan och utanför tullarna
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Transparent prissättning:</strong> Tydliga priser med eller utan moms, inga dolda avgifter
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Modern utrustning:</strong> Alla våra lokaler är välutrustade med WiFi, projektorer, ljudsystem och mer
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Personlig service:</strong> Vårt team hjälper dig hitta rätt lokal för just ditt behov
          </li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#0f172a' }}>Våra siffror</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '24px', 
          marginTop: '1rem' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#0ea5e9', 
              margin: '0.5rem 0',
              fontWeight: '700'
            }}>8+</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Lokaler i Stockholmsområdet</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#0ea5e9', 
              margin: '0.5rem 0',
              fontWeight: '700'
            }}>500+</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Nöjda kunder</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#0ea5e9', 
              margin: '0.5rem 0',
              fontWeight: '700'
            }}>6 år</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Erfarenhet</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: '2.5rem', 
              color: '#0ea5e9', 
              margin: '0.5rem 0',
              fontWeight: '700'
            }}>24/7</h3>
            <p style={{ margin: 0, color: '#64748b' }}>Support via vår chatbot</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Våra tjänster</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '12px' }}>
          Vi erbjuder olika typer av lokaler för olika behov:
        </p>
        <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>Kontorslokaler:</strong> Per arbetsplats eller hela kontor för långtidsuthyrning
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Konferenslokaler:</strong> Per timme eller dag för möten och presentationer
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Eventlokaler:</strong> Större ytor för evenemang, workshops och träffar
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Coworking:</strong> Flexibla arbetsplatser i innerstan
          </li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Vårt team</h2>
        <p style={{ lineHeight: '1.7', marginBottom: '12px' }}>
          Bakom Nordic Space står ett dedikerat team med lång erfarenhet av fastighetsförvaltning, 
          kundservice och teknik. Vi kombinerar lokalexpertis med modern teknologi för att ge dig 
          den bästa upplevelsen.
        </p>
        <p style={{ lineHeight: '1.7', marginBottom: 0 }}>
          Vårt team hjälper dig med allt från att hitta rätt lokal till att säkerställa att 
          allt fungerar perfekt under din uthyrning. Vi är alltid tillgängliga för att svara 
          på dina frågor – antingen via vår AI-chatbot eller direkt via telefon eller e-post.
        </p>
      </div>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Hållbarhet och ansvar</h2>
        <p style={{ lineHeight: '1.7', marginBottom: 0 }}>
          Vi arbetar aktivt för hållbarhet och ansvarsfull förvaltning. Våra lokaler är 
          energieffektiva och vi strävar efter att minimera vår miljöpåverkan. Vi samarbetar 
          med lokala leverantörer och prioriterar miljövänliga lösningar där det är möjligt.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a' }}>Kontakta oss</h2>
        <p style={{ lineHeight: '1.7', marginBottom: 0 }}>
          Har du frågor eller vill veta mer? Tveka inte att kontakta oss! Du kan använda 
          vår AI-chatbot för snabba svar, eller kontakta oss direkt via telefon eller e-post. 
          Se kontaktuppgifter i footern.
        </p>
      </div>
    </main>
  );
}
