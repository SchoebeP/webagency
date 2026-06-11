// Données des véhicules — Rouvier Automobiles (données fictives réalistes)
const CARS = [
  {
    id: "clio-v",
    brand: "Renault", model: "Clio V", version: "1.0 TCe 90 ch Intens",
    year: 2021, km: 38500, price: 14990, monthly: 219,
    fuel: "Essence", gearbox: "Manuelle", power: "90 ch", doors: 5, color: "Gris Titanium",
    badges: ["Garantie 12 mois", "Contrôle technique OK"],
    featured: true,
    description: "Citadine polyvalente entretenue exclusivement en concession. Carnet d'entretien complet, distribution à jour. Idéale pour un usage urbain comme pour la route.",
    equipment: ["Carplay / Android Auto", "Régulateur de vitesse", "Capteurs de stationnement arrière", "Climatisation automatique", "Feux LED", "Écran tactile 7\""]
  },
  {
    id: "peugeot-3008",
    brand: "Peugeot", model: "3008", version: "1.5 BlueHDi 130 ch GT Line",
    year: 2019, km: 82300, price: 21490, monthly: 309,
    fuel: "Diesel", gearbox: "Automatique", power: "130 ch", doors: 5, color: "Blanc Nacré",
    badges: ["Garantie 12 mois", "Révision faite"],
    featured: true,
    description: "SUV familial en finition GT Line, très bien équipé. Quatre pneus neufs, freinage refait. Véhicule non fumeur, intérieur en parfait état.",
    equipment: ["i-Cockpit numérique", "Hayon électrique", "Caméra de recul", "Sièges chauffants", "Navigation 3D", "Jantes alliage 18\"", "Toit noir contrasté", "Aide au maintien de voie"]
  },
  {
    id: "golf-8",
    brand: "Volkswagen", model: "Golf 8", version: "2.0 TDI 150 ch Style DSG7",
    year: 2020, km: 64000, price: 23900, monthly: 339,
    fuel: "Diesel", gearbox: "Automatique", power: "150 ch", doors: 5, color: "Bleu Atlantique",
    badges: ["Garantie 12 mois", "Première main"],
    featured: false,
    description: "Compacte de référence en motorisation TDI 150 associée à la boîte DSG7. Première main, historique d'entretien intégral disponible.",
    equipment: ["Cockpit digital", "Phares LED Matrix", "Régulateur adaptatif ACC", "App-Connect sans fil", "Climatisation tri-zone", "Détecteur d'angle mort"]
  },
  {
    id: "yaris-hybride",
    brand: "Toyota", model: "Yaris", version: "Hybride 116h Design",
    year: 2022, km: 21700, price: 19490, monthly: 285,
    fuel: "Hybride", gearbox: "Automatique", power: "116 ch", doors: 5, color: "Rouge Intense",
    badges: ["Faible kilométrage", "Garantie 12 mois", "Première main"],
    featured: true,
    description: "Hybride récente et très sobre (3,8 L/100 en ville). Encore sous garantie constructeur. Parfaite pour les trajets quotidiens sans contrainte de recharge.",
    equipment: ["Caméra de recul", "Carplay / Android Auto", "Sécurité Toyota Safety Sense", "Feux automatiques", "Climatisation automatique"]
  },
  {
    id: "bmw-320d",
    brand: "BMW", model: "Série 3", version: "320d xDrive 190 ch Luxury",
    year: 2018, km: 98400, price: 24990, monthly: 355,
    fuel: "Diesel", gearbox: "Automatique", power: "190 ch", doors: 4, color: "Noir Saphir",
    badges: ["Contrôle technique OK", "Révision faite"],
    featured: false,
    description: "Berline routière en transmission intégrale xDrive, finition Luxury cuir. Suivi exclusif BMW, factures à l'appui. Excellent état général.",
    equipment: ["Intérieur cuir Dakota", "GPS Professional", "Sièges électriques à mémoire", "Toit ouvrant", "Harman Kardon", "Caméras 360°", "Accès confort"]
  },
  {
    id: "duster",
    brand: "Dacia", model: "Duster", version: "1.3 TCe 130 ch Prestige 4x2",
    year: 2021, km: 45200, price: 16990, monthly: 249,
    fuel: "Essence", gearbox: "Manuelle", power: "130 ch", doors: 5, color: "Orange Arizona",
    badges: ["Garantie 12 mois", "Contrôle technique OK"],
    featured: false,
    description: "SUV robuste et économique en finition haute Prestige. Attelage posé en concession. Un véhicule sain, prêt à partir.",
    equipment: ["Navigation", "Caméra multivues", "Carte mains libres", "Barres de toit", "Climatisation automatique", "Attelage amovible"]
  },
  {
    id: "model-3",
    brand: "Tesla", model: "Model 3", version: "Standard Plus RWD",
    year: 2021, km: 52000, price: 27900, monthly: 395,
    fuel: "Électrique", gearbox: "Automatique", power: "325 ch", doors: 4, color: "Blanc Nacré Multicouches",
    badges: ["Électrique", "Première main"],
    featured: true,
    description: "Berline 100 % électrique, autonomie réelle d'environ 380 km. Batterie contrôlée (santé 92 %). Superchargeurs et mises à jour à distance.",
    equipment: ["Autopilot", "Écran central 15\"", "Toit verre panoramique", "Pompe à chaleur", "Sièges chauffants AV/AR", "Conduite à une pédale"]
  },
  {
    id: "audi-a3",
    brand: "Audi", model: "A3 Sportback", version: "35 TFSI 150 ch S Line S tronic",
    year: 2020, km: 58900, price: 25490, monthly: 365,
    fuel: "Essence", gearbox: "Automatique", power: "150 ch", doors: 5, color: "Gris Daytona",
    badges: ["Garantie 12 mois", "Révision faite"],
    featured: false,
    description: "Compacte premium en finition S Line. Présentation intérieure et extérieure irréprochable, jantes sans frottement. Révision des 60 000 km effectuée.",
    equipment: ["Virtual Cockpit", "Sièges sport S Line", "Phares LED", "Hayon électrique", "Audi Smartphone Interface", "Jantes 18\" Audi Sport"]
  },
  {
    id: "citroen-c3",
    brand: "Citroën", model: "C3", version: "PureTech 83 ch Shine",
    year: 2022, km: 18300, price: 13990, monthly: 205,
    fuel: "Essence", gearbox: "Manuelle", power: "83 ch", doors: 5, color: "Bleu Elixir",
    badges: ["Faible kilométrage", "Première main", "Garantie 12 mois"],
    featured: false,
    description: "Petite citadine confortable au kilométrage très faible. Première main, achetée et entretenue chez nous. Une affaire sûre pour un premier véhicule.",
    equipment: ["Écran tactile 7\"", "Carplay / Android Auto", "Régulateur de vitesse", "Aide au freinage d'urgence", "Toit contrasté blanc"]
  }
];

const BRANDS = [...new Set(CARS.map(function (c) { return c.brand; }))].sort();
const FUELS = [...new Set(CARS.map(function (c) { return c.fuel; }))].sort();

function formatPrice(n) {
  return n.toLocaleString("fr-FR") + " €";
}
function formatKm(n) {
  return n.toLocaleString("fr-FR") + " km";
}

window.CARS = CARS;
window.BRANDS = BRANDS;
window.FUELS = FUELS;
window.formatPrice = formatPrice;
window.formatKm = formatKm;
