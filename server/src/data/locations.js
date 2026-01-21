export const locations = [
  {
    id: "cowork-inner-01",
    name: "CityHub Cowork Vasagatan",
    address: "Vasagatan 12",
    city: "Stockholm",
    municipality: "Stockholm",
    insideTull: true,
    vatIncluded: true,
    contractType: "korttid",
    areaSqm: 450,
    capacity: 120,
    pricing: {
      monthlyPrice: 185000,
      hourlyPrice: 900,
      dailyPrice: 8500,
      pricePerWorkstation: 4200
    },
    amenities: ["wifi", "kök", "fika", "catering", "parkering", "ljudsystem", "projektor", "whiteboard"],
    description: "Modern coworking-yta nära Centralen med flexplatser, fokusrum och konferensdel."
  },
  {
    id: "conference-out-02",
    name: "Skogås Konferens",
    address: "Tallstigen 4",
    city: "Huddinge",
    municipality: "Huddinge",
    insideTull: false,
    vatIncluded: true,
    contractType: "korttid",
    areaSqm: 280,
    capacity: 80,
    pricing: {
      monthlyPrice: null,
      hourlyPrice: 650,
      dailyPrice: 5200,
      pricePerWorkstation: null
    },
    amenities: ["wifi", "fika", "parkering", "ljudsystem", "projektor", "whiteboard"],
    description: "Ljus konferensanläggning med skogsnära läge, gratis parkering och teknik inkluderad."
  },
  {
    id: "event-inner-03",
    name: "Kulturhuset Event Loft",
    address: "Sergels torg 3",
    city: "Stockholm",
    municipality: "Stockholm",
    insideTull: true,
    vatIncluded: true,
    contractType: "korttid",
    areaSqm: 600,
    capacity: 200,
    pricing: {
      monthlyPrice: null,
      hourlyPrice: null,
      dailyPrice: 18000,
      pricePerWorkstation: null
    },
    amenities: ["wifi", "catering", "ljudsystem", "projektor", "whiteboard"],
    description: "Öppen eventlokal mitt i city med scen, ljudpaket och möjlighet till catering."
  },
  {
    id: "office-hotel-04",
    name: "Kista Office Hotel",
    address: "Isafjordsgatan 30B",
    city: "Kista",
    municipality: "Stockholm",
    insideTull: false,
    vatIncluded: true,
    contractType: "långtid",
    areaSqm: 1200,
    capacity: 250,
    pricing: {
      monthlyPrice: 320000,
      hourlyPrice: null,
      dailyPrice: null,
      pricePerWorkstation: 3500
    },
    amenities: ["wifi", "kök", "fika", "parkering", "projektor", "whiteboard"],
    description: "Kontorshotell med privata rum, öppna ytor och förmånlig parkering nära tunnelbana."
  },
  {
    id: "studio-inner-05",
    name: "SoFo Studio",
    address: "Skånegatan 75",
    city: "Stockholm",
    municipality: "Stockholm",
    insideTull: true,
    vatIncluded: false,
    contractType: "korttid",
    areaSqm: 110,
    capacity: 35,
    pricing: {
      monthlyPrice: null,
      hourlyPrice: 550,
      dailyPrice: 4000,
      pricePerWorkstation: null
    },
    amenities: ["wifi", "kök", "fika", "ljudsystem", "whiteboard"],
    description: "Kreativ studio med exponerade tegelväggar. Momssfri uthyrning, passar workshops."
  },
  {
    id: "warehouse-out-06",
    name: "Årsta Lager & Studio",
    address: "Årstaängsvägen 15",
    city: "Årsta",
    municipality: "Stockholm",
    insideTull: false,
    vatIncluded: true,
    contractType: "långtid",
    areaSqm: 900,
    capacity: 150,
    pricing: {
      monthlyPrice: 140000,
      hourlyPrice: null,
      dailyPrice: 9000,
      pricePerWorkstation: null
    },
    amenities: ["wifi", "parkering", "ljudsystem", "projektor"],
    description: "Flexibel lager- och eventyta med port, högt i tak och möjlighet till dagsuthyrning."
  },
  {
    id: "meeting-out-07",
    name: "Täby Meeting Rooms",
    address: "Esplanaden 3",
    city: "Täby",
    municipality: "Täby",
    insideTull: false,
    vatIncluded: true,
    contractType: "korttid",
    areaSqm: 220,
    capacity: 60,
    pricing: {
      monthlyPrice: null,
      hourlyPrice: 480,
      dailyPrice: 3500,
      pricePerWorkstation: null
    },
    amenities: ["wifi", "fika", "parkering", "projektor", "whiteboard"],
    description: "Smidiga mötesrum nära Roslagsbanan, bokas per timme eller dag."
  },
  {
    id: "flex-inner-08",
    name: "Södermalm Flex Kontor",
    address: "Hornsgatan 72",
    city: "Stockholm",
    municipality: "Stockholm",
    insideTull: true,
    vatIncluded: true,
    contractType: "långtid",
    areaSqm: 350,
    capacity: 90,
    pricing: {
      monthlyPrice: 89000,
      hourlyPrice: null,
      dailyPrice: null,
      pricePerWorkstation: 3100
    },
    amenities: ["wifi", "kök", "fika", "catering", "whiteboard"],
    description: "Flexibla kontorsplatser med fokus på mindre team. Välj antal arbetsplatser per månad."
  }
];
