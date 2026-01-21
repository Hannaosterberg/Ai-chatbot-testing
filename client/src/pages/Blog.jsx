const posts = [
  { title: "Så jämför du lokaler", body: "Utgå från kapacitet, momsstatus och om du behöver korttid eller långtidsavtal. Innerstad ger närhet, utanför tull ger parkering." },
  { title: "Checklista för event", body: "Säkerställ ljud, projektor, catering och kapacitet. Eventlokaler har ofta dagspris och korttidsavtal." },
  { title: "När lönar sig kontorshotell?", body: "Pris per arbetsplats passar växande team som vill undvika långa kontrakt. Lägg till mötesrum per timme vid behov." }
];

export function Blog() {
  return (
    <main className="page">
      <h1>Blogg</h1>
      <div className="grid" style={{ marginTop: 12 }}>
        {posts.map((post) => (
          <article key={post.title} className="card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
