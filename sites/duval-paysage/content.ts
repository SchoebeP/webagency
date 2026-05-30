/* ============================================================================
   content.ts — TOUT le contenu éditable du site, au même endroit.
   ----------------------------------------------------------------------------
   Pour adapter ce modèle à un nouveau client paysagiste :
     1. Modifiez les valeurs ci-dessous (textes, téléphone, prestations, avis…).
     2. Remplacez les photos dans /public (ou les URLs Pexels par les vraies).
     3. Ajustez les couleurs/police en haut de app/globals.css.
   Les types garantissent que rien n'est oublié — votre éditeur vous guide.
   ========================================================================== */

/* --- Coordonnées & identité (REMPLACER par les vraies infos) --------------- */
export const business = {
  name: "Duval Paysage",
  owner: "Hervé Duval",
  trade: "Paysagiste",
  tagline: "Paysagiste · Pays de Risle",
  phoneDisplay: "02 32 56 00 00",
  phoneTel: "+33232560000",
  email: "contact@duval-paysage.fr",
  /* Adresse (sert au pied de page + données structurées SEO) */
  address: {
    locality: "Le Perrey",
    postalCode: "27500",
    region: "Eure",
    country: "FR",
  },
  /* Coordonnées GPS approximatives — à vérifier pour la fiche Google. */
  geo: { lat: 49.3, lng: 0.52 },
  /* Note Google (sert aux étoiles + données structurées). */
  rating: "5,0",
  ratingValue: 5.0,
  reviewCount: 92,
  priceRange: "€€",
  siret: "SIRET à compléter",
} as const;

/* --- SEO ------------------------------------------------------------------- */
export const seo = {
  /* URL finale du site (sert au sitemap + Open Graph). */
  url: "https://duval-paysage.fr",
  title: "Duval Paysage — Paysagiste dans le Pays de Risle (Eure)",
  description:
    "Duval Paysage, paysagiste au Perrey (Eure) : élagage, taille de haies, entretien de jardins, clôtures. Devis gratuit, travail soigné. 5,0★ sur 92 avis Google.",
  /* Image de partage (réseaux sociaux), 1200×630. Visuel de marque livré dans
     /public/og.png — remplacez-le par votre propre carte si besoin. */
  ogImage: "/og.png",
  /* Couleur de la barre de navigateur mobile (doit suivre la marque). */
  themeColor: "#1F3D2B",
  locale: "fr_FR",
} as const;

/* --- Photos (placeholders Pexels, libres de droits) ------------------------
   Remplacez par les vraies photos d'Hervé : déposez-les dans /public et
   pointez les chemins ici (ex. "/hero.jpg"), ou gardez des URLs Pexels. */
const px = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const images = {
  heroWide: px(31136976), // allée de jardin ensoleillée
  heroPortrait: px(31960327), // allée de jardin verdoyante
} as const;

/* --- Navigation ------------------------------------------------------------ */
export const nav = [
  { label: "Prestations", href: "#prestations" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Avis", href: "#avis" },
  { label: "Zone", href: "#zone" },
] as const;

/* --- Hero ------------------------------------------------------------------
   heroVariant : choisissez la mise en page du hero.
     "plein"     → photo plein cadre, texte en bas à gauche (défaut)
     "split"     → texte à gauche, photo portrait à droite
     "editorial" → texte centré sur photo plein cadre */
export const heroVariant: "plein" | "split" | "editorial" = "plein";

export const hero = {
  /* L'eyebrow change selon la variante choisie. */
  eyebrowPlein: "Paysagiste · Le Perrey, Eure",
  eyebrowSplit: "Paysagiste dans l'Eure",
  eyebrowEditorial: "Le Perrey · Pays de Risle · Eure",
  title: "Votre jardin entre de bonnes mains, dans le Pays de Risle.",
  subtitle:
    "Élagage, taille de haies, entretien et aménagement. Travail soigné, débris évacués, devis gratuit — par Hervé Duval, paysagiste au Perrey.",
  ctaPrimary: "Demander un devis gratuit",
} as const;

/* Bandeau de confiance (4 chiffres clés). `star: true` colore les étoiles. */
export const trustbar: { strong: string; label: string; star?: boolean }[] = [
  { strong: "5,0", label: "★★★★★ · 92 avis Google", star: true },
  { strong: "Devis", label: "gratuit & sans engagement" },
  { strong: "Crédit", label: "d'impôt services à la personne" },
  { strong: "20+", label: "chantiers réalisés / an" },
];

/* --- Prestations -----------------------------------------------------------
   icon : un des dessins disponibles dans components/icons.tsx
   (elagage, abattage, haies, tonte, cloture, maconnerie, dessouchage, entretien) */
export type ServiceIcon =
  | "elagage"
  | "abattage"
  | "haies"
  | "tonte"
  | "cloture"
  | "maconnerie"
  | "dessouchage"
  | "entretien";

export const prestations = {
  eyebrow: "Nos prestations",
  title: "Tout l'entretien de vos extérieurs, par un seul artisan",
  lead: "De l'élagage en hauteur à la pose d'une clôture, Duval Paysage prend en charge l'ensemble de vos travaux de jardin — proprement, et de A à Z.",
  ctaText: "Un projet en tête ? Décrivez-le, on vous répond vite.",
  services: [
    { icon: "elagage", title: "Élagage", desc: "Taille raisonnée et mise en sécurité de vos arbres, à toute hauteur." },
    { icon: "abattage", title: "Abattage", desc: "Abattage maîtrisé, démontage en zone difficile, évacuation comprise." },
    { icon: "haies", title: "Taille de haies", desc: "Haies nettes et régulières, tonte des bordures, broyage des déchets." },
    { icon: "tonte", title: "Tonte & débroussaillage", desc: "Pelouses, talus et terrains en friche remis au propre." },
    { icon: "cloture", title: "Clôtures & portails", desc: "Pose de clôtures, grillages et portails pour délimiter votre terrain." },
    { icon: "maconnerie", title: "Maçonnerie paysagère", desc: "Petites dalles, bordures et aménagements béton soignés." },
    { icon: "dessouchage", title: "Dessouchage", desc: "Rognage et extraction de souches pour repartir sur un terrain net." },
    { icon: "entretien", title: "Entretien de jardins", desc: "Contrats d'entretien à l'année — votre extérieur toujours impeccable." },
  ] satisfies { icon: ServiceIcon; title: string; desc: string }[],
} as const;

/* --- Réalisations (avant / après) ------------------------------------------
   bSrc = photo AVANT, aSrc = photo APRÈS. */
const pxBA = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const realisations = {
  eyebrow: "Réalisations",
  title: "Avant / après : la différence se voit",
  lead: "Glissez la poignée pour comparer l'état initial et le résultat. Quelques chantiers récents dans le Pays de Risle.",
  ctaText: "Envie du même résultat chez vous ?",
  projects: [
    { id: "ba-haie", title: "Taille d'une haie de thuyas", commune: "Pont-Audemer", before: pxBA(17506144), after: pxBA(36713682), beforeAlt: "Avant — haie envahissante non taillée", afterAlt: "Après — haie nette et carrée" },
    { id: "ba-jardin", title: "Remise en état d'un jardin", commune: "Le Perrey", before: pxBA(17332275), after: pxBA(31960327), beforeAlt: "Avant — terrain en friche", afterAlt: "Après — pelouse tondue et bordures nettes" },
    { id: "ba-elagage", title: "Élagage de grands arbres", commune: "Cormeilles", before: pxBA(28157845), after: pxBA(19975452), beforeAlt: "Avant — arbres denses et dangereux", afterAlt: "Après — houppier allégé et sécurisé" },
    { id: "ba-terrasse", title: "Dalle & abords de terrasse", commune: "Bourg-Achard", before: pxBA(36866669), after: pxBA(37042905), beforeAlt: "Avant — sol irrégulier", afterAlt: "Après — dalle propre et plane" },
  ],
} as const;

/* --- Pourquoi nous choisir -------------------------------------------------- */
export const pourquoi = {
  eyebrow: "Pourquoi nous confier votre jardin",
  title: "Le sérieux d'un artisan, la propreté d'un pro",
  reasons: [
    { k: "01", title: "Devis gratuit & clair", desc: "On se déplace, on évalue, et vous recevez un devis détaillé sans engagement ni surprise." },
    { k: "02", title: "Travail soigné & propre", desc: "Chantier rangé, débris évacués et terrain laissé net : vous profitez tout de suite." },
    { k: "03", title: "20+ chantiers par an", desc: "Hervé Duval intervient au quotidien dans le Pays de Risle — un savoir-faire éprouvé." },
    { k: "04", title: "Intervention rapide", desc: "Réponse sous 48 h et créneaux d'intervention courts, y compris pour les urgences d'élagage." },
  ],
  /* La mention « crédit d'impôt » est un texte réglementaire identique pour tous
     les paysagistes — elle est figée dans components/Pourquoi.tsx. */
} as const;

/* --- Avis clients ----------------------------------------------------------- */
export const avis = {
  eyebrow: "Avis clients",
  title: "Ils nous ont confié leur jardin",
  reviews: [
    { name: "Sandrine L.", commune: "Le Perrey", text: "Travail rapide et très propre. Hervé a élagué deux grands chênes et tout était nettoyé en partant. Je recommande sans hésiter." },
    { name: "Jean-Marc P.", commune: "Pont-Audemer", text: "Devis clair, intervention dans la semaine. Haie taillée nickel et tonte impeccable. Du sérieux, on sent le métier." },
    { name: "Catherine D.", commune: "Cormeilles", text: "Très satisfaite : ponctuel, soigné et de bon conseil. Le jardin a retrouvé une seconde jeunesse. Prix juste." },
  ],
} as const;

/* --- Zone d'intervention ---------------------------------------------------- */
export const zone = {
  eyebrow: "Zone d'intervention",
  title: "Le Perrey et tout le Pays de Risle",
  lead: "Basé au Perrey, Hervé Duval intervient autour de Pont-Audemer et dans tout l'est de l'Eure, dans un rayon d'environ 30 km.",
  note: "Votre commune n'est pas listée ? Demandez quand même — on couvre les environs.",
  cta: "Vérifier ma commune & demander un devis",
  communes: [
    "Le Perrey", "Pont-Audemer", "Cormeilles", "Bourg-Achard", "Beuzeville",
    "Quillebeuf-sur-Seine", "Montfort-sur-Risle", "Routot", "Saint-Georges-du-Vièvre", "Brionne",
  ],
} as const;

/* --- Formulaire de devis ---------------------------------------------------- */
export const devis = {
  eyebrow: "Devis gratuit",
  title: ["Décrivez votre projet,", "on vous rappelle vite"], // 2 lignes
  lead: "Quelques infos suffisent. Hervé vous recontacte sous 48 h pour convenir d'une visite — sans engagement.",
  assurances: ["Réponse sous 48 h", "Déplacement & devis gratuits", "Débris évacués, chantier propre"],
  callPrompt: "Ou appelez directement",
  workTypes: [
    "Élagage / abattage", "Taille de haies", "Tonte / débroussaillage",
    "Clôtures & portails", "Maçonnerie paysagère", "Entretien régulier", "Plusieurs / autre",
  ],
  legal: "En envoyant, vous acceptez d'être recontacté par Duval Paysage. Aucune donnée n'est partagée à des tiers.",
} as const;

/* --- Pied de page ----------------------------------------------------------- */
export const footer = {
  blurb: "Élagage, taille, entretien et aménagement de jardins dans le Pays de Risle, autour de Pont-Audemer (Eure).",
  prestationsLinks: ["Élagage & abattage", "Taille de haies", "Clôtures & maçonnerie", "Entretien de jardins"],
  ctaHeading: "Un projet de jardin ?",
  legalLine: "SIRET à compléter · Crédit d'impôt services à la personne · Mentions légales",
} as const;
