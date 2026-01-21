export const pricingModels = [
  {
    id: "monthly",
    title: "Månadshyra",
    description: "Fast månadskostnad för dedikerad yta eller antal arbetsplatser.",
    includesVat: "Vanligen exklusive 25 % moms. Kontrollera vatIncluded per lokal."
  },
  {
    id: "hourly",
    title: "Timhyra",
    description: "Boka mötesrum eller studio per timme. Passar ad-hoc möten och inspelningar.",
    includesVat: "Oftast exklusive moms. Momsfri lokal anges särskilt."
  },
  {
    id: "daily",
    title: "Dagspris",
    description: "Heldagsbokning för event eller konferens. Teknik ingår ofta.",
    includesVat: "Exklusive moms om inget annat anges."
  },
  {
    id: "workstation",
    title: "Pris per arbetsplats",
    description: "Flexibelt antal skrivbordsplatser per månad, inklusive wifi och kaffe.",
    includesVat: "Exklusive moms. Tillgång till mötesrum kan ingå."
  },
  {
    id: "vat",
    title: "Momsad vs ej momsad",
    description: "Lokaler med vatIncluded: false faktureras utan moms, övriga exklusive 25 %.",
    includesVat: "Se lokalkortet för status. Påverkar totalpris på fakturan."
  },
  {
    id: "contract",
    title: "Korttid vs långtidskontrakt",
    description: "Korttid: flexibel avbokning per tillfälle. Långtid: lägre månadspris men 1–3 mån uppsägning.",
    includesVat: "Gäller oavsett kontraktstyp."
  },
  {
    id: "location",
    title: "Innerstad vs utanför tull",
    description: "Innerstad ger närhet och kommunikationer, utanför tull ger ofta lägre pris och parkering.",
    includesVat: "Momsregler oförändrade, men driftkostnader kan variera."
  }
];
