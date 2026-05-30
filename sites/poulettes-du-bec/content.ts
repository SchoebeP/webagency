/* ============================================================================
   content.ts — TOUT le contenu éditable du site, au même endroit.
   ----------------------------------------------------------------------------
   Pour adapter ce modèle à un autre restaurant / salon de thé :
     1. Modifiez les valeurs ci-dessous (carte, horaires, avis, infos, SEO…).
     2. Remplacez les photos (URLs Unsplash) par les vraies, ou déposez-les dans
        /public et pointez les chemins ici.
     3. Ajustez les couleurs/polices en haut de app/globals.css.
   ========================================================================== */

/* --- Identité & coordonnées (REMPLACER) ------------------------------------ */
export const business = {
  name: "Les Poulettes du Bec",
  /* Forme courte, sans l'article — à utiliser après « aux », « des »… */
  shortName: "Poulettes du Bec",
  sub: "Le Bec-Hellouin",
  kind: "Bar · Restaurant · Salon de thé",
  manager: "Laurence",
  phone: "06 59 90 90 97",
  phoneHref: "tel:+33659909097",
  village: "Le Bec-Hellouin",
  label: "Au cœur d'un des Plus Beaux Villages de France",
  address: { locality: "Le Bec-Hellouin", postalCode: "27800", region: "Eure", country: "FR" },
  /* Coordonnées GPS approximatives — à vérifier pour la fiche Google. */
  geo: { lat: 49.2306, lng: 0.7206 },
  rating: "4,7",
  ratingValue: 4.7,
  reviewCount: 130,
  servesCuisine: "Française, traditionnelle, fait maison",
  priceRange: "€€",
  tags: ["Terrasse", "Accueil familial", "Parking à proximité", "Boutique cadeaux", "Groupes bienvenus"],
} as const;

/* --- SEO ------------------------------------------------------------------- */
export const seo = {
  url: "https://les-poulettes-du-bec.fr",
  title: "Les Poulettes du Bec — Restaurant & salon de thé au Bec-Hellouin",
  description:
    "Bar, restaurant et salon de thé au Bec-Hellouin (Eure). Cuisine maison, produits frais et locaux, à deux pas de l'abbaye. Réservez votre table — 4,7★ sur ~130 avis.",
  /* Image de partage (réseaux sociaux), 1200×630. Visuel de marque livré dans
     /public/og.png — remplacez-le par votre propre carte si besoin. */
  ogImage: "/og.png",
  /* Couleur de la barre de navigateur mobile (doit suivre la marque). */
  themeColor: "#6E2A2A",
  locale: "fr_FR",
} as const;

/* --- Photos (placeholders Unsplash, libres de droits) ----------------------
   Remplacez par les vraies photos du restaurant. Priorité : un vrai portrait de
   Laurence pour « Notre histoire ». */
export const images = {
  heroIntimate: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1900&q=72",
  heroConvivial: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1900&q=72",
  heroRoom: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1900&q=72",
  pastry: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=72",
  spread: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1100&q=72",
  meat: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1000&q=72",
  dessert: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=72",
  cheese: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=900&q=72",
  coffee: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=72",
  wine: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=72",
  terrace: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=72",
  village: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1100&q=72",
} as const;

export type ImageKey = keyof typeof images;

/* --- Navigation ------------------------------------------------------------ */
export const nav = [
  { label: "Notre histoire", href: "#histoire" },
  { label: "La carte", href: "#carte" },
  { label: "Galerie", href: "#galerie" },
  { label: "Infos & accès", href: "#infos" },
] as const;

/* --- Hero ------------------------------------------------------------------
   variant : "classic" (plein cadre) | "split" (latéral) | "panel" (panneau)
   photo   : une clé de `images` ci-dessus
   showStrip : afficher le bandeau d'infos rapides sous le hero */
export const hero = {
  variant: "classic" as "classic" | "split" | "panel",
  photo: "heroIntimate" as ImageKey,
  eyebrow: "Bar · Restaurant · Salon de thé",
  title: "La table chaleureuse du Bec-Hellouin.",
  subtitle:
    "Bar, restaurant & salon de thé de village — cuisine maison, produits frais et locaux, à deux pas de l'abbaye.",
  ratingLine: "· ~130 avis · n°1 du village",
  showStrip: true,
} as const;

/* --- Bandeau d'infos rapides sous le hero (si hero.showStrip) -------------- */
export const heroStrip = {
  todayPrefix: "Ouvert", // « Ouvert aujourd'hui · 10h – 21h » (calculé selon le jour)
  closedNote: "Jeudi fermé",
  closedTodayFallback: "ven & sam jusqu'à 21h", // libellé si on est fermé aujourd'hui
  location: { title: "Le Bec-Hellouin", sub: "près de l'abbaye" },
  cuisine: { title: "Cuisine maison", sub: "produits frais & locaux" },
} as const;

/* --- Notre histoire -------------------------------------------------------- */
export const histoire = {
  portrait: "pastry" as ImageKey,
  badge: { kicker: "De la Côte d'Azur au Bec", text: "30 ans de métier, un rêve enfin réalisé" },
  eyebrow: "Notre histoire",
  title: "Laurence, de retour au pays",
  paragraphs: [
    "Après trente ans passés sur la Côte d'Azur, Laurence Desrumaux-Scoffié est revenue en Normandie pour réaliser un rêve : ouvrir une maison à elle, chaleureuse et gourmande, au cœur d'un des Plus Beaux Villages de France.",
    "Ici, tout est fait maison, avec des produits frais et locaux choisis chez les voisins. Une cuisine traditionnelle et généreuse — ris de veau, truite de rivière, belles viandes, tartes du jour — relevée d'une touche de créativité. Le tout servi avec ce sourire et cet accueil familial qui font qu'on s'attarde, qu'on revient, et qu'on se sent un peu chez soi.",
  ],
  signature: { name: "Laurence", role: "Gérante & cuisinière" },
} as const;

/* --- La carte --------------------------------------------------------------
   icon : leaf | utensils | star | cup (pictos dans components/icons.tsx) */
export type MenuIcon = "leaf" | "utensils" | "star" | "cup";

export const carte = {
  eyebrow: "La carte",
  title: "Une cuisine maison, au fil des saisons",
  lead: "Des produits frais et locaux, cuisinés chaque jour. La carte change avec le marché et les humeurs du potager — voici un aperçu de ce qui pourrait vous attendre à table.",
  note: {
    around: "~ 30 €",
    text: "Le menu complet tourne autour de 30 €. La carte évolue avec les saisons et les arrivages — n'hésitez pas à nous appeler pour connaître le plat du jour.",
  },
  categories: [
    {
      cat: "Entrées",
      icon: "leaf",
      items: [
        { name: "Velouté du moment, crème normande & croûtons dorés", desc: "Légumes du marché mijotés, un trait de crème fermière.", price: "9 €" },
        { name: "Œuf parfait, crème de cidre & lardons fumés", desc: "Cuisson basse température, éclats de noisette torréfiée.", price: "12 €" },
        { name: "Chèvre chaud du voisin sur pain de campagne", desc: "Miel de la vallée, roquette et pomme croquante.", price: "11 €" },
      ],
    },
    {
      cat: "Plats",
      icon: "utensils",
      items: [
        { name: "Ris de veau dorés au beurre", desc: "Jus corsé, purée maison et légumes glacés de saison.", price: "26 €" },
        { name: "Truite de rivière meunière", desc: "Beurre citronné, amandes et pommes grenaille rissolées.", price: "22 €" },
        { name: "Pièce de bœuf, sauce au camembert affiné", desc: "Frites maison et salade de jeunes pousses.", price: "24 €" },
        { name: "Suprême de volaille fermière à la crème de cidre", desc: "Champignons des bois et tagliatelles fraîches.", price: "21 €" },
      ],
    },
    {
      cat: "Desserts maison",
      icon: "star",
      items: [
        { name: "Tarte fine aux pommes du verger", desc: "Caramel au beurre salé, boule de glace vanille.", price: "9 €" },
        { name: "Crème brûlée à la vanille de Madagascar", desc: "Croûte caramélisée minute.", price: "8 €" },
        { name: "Moelleux au chocolat, cœur coulant", desc: "Crème anglaise et fleur de sel.", price: "9 €" },
      ],
    },
    {
      cat: "Salon de thé",
      icon: "cup",
      wide: true,
      items: [
        { name: "Café gourmand — trois douceurs maison", desc: "L'après-midi, accompagné d'un café de torréfaction artisanale.", price: "9 €" },
        { name: "Part de tarte maison du jour", desc: "Selon l'humeur de Laurence et les fruits de saison.", price: "6 €" },
        { name: "Sélection de thés & infusions", desc: "Grands crus et tisanes de la région.", price: "5 €" },
        { name: "Chocolat chaud à l'ancienne", desc: "Chantilly maison, copeaux de chocolat noir.", price: "5 €" },
      ],
    },
  ] satisfies { cat: string; icon: MenuIcon; wide?: boolean; items: { name: string; desc: string; price: string }[] }[],
} as const;

/* --- Galerie ---------------------------------------------------------------
   img : clé de `images` ; span : "wide" (2 col) | "tall" (2 lignes) | "" */
export const galerie = {
  eyebrow: "En images",
  title: "L'ambiance du Bec, à table",
  tiles: [
    { img: "spread", caption: "Les plats à partager", span: "wide" },
    { img: "meat", caption: "Les belles viandes", span: "tall" },
    { img: "dessert", caption: "Les desserts maison", span: "" },
    { img: "wine", caption: "Un verre entre amis", span: "" },
    { img: "terrace", caption: "La salle & la terrasse", span: "tall" },
    { img: "village", caption: "Le Bec-Hellouin", span: "wide" },
    { img: "coffee", caption: "Le salon de thé", span: "" },
    { img: "cheese", caption: "Les produits du coin", span: "" },
  ] satisfies { img: ImageKey; caption: string; span: "wide" | "tall" | "" }[],
} as const;

/* --- Avis ------------------------------------------------------------------ */
export const avis = {
  eyebrow: "Ce qu'on en dit",
  title: "Le n°1 des tables du village",
  badge: { score: "4,7", note: "sur ~130 avis · Le Bec-Hellouin" },
  reviews: [
    { stars: 5, text: "Un accueil d'une gentillesse rare et une cuisine vraiment faite maison. On se sent reçu comme à la maison, dans un cadre adorable au cœur du village.", name: "Élodie M.", meta: "En famille · avril 2026", color: "#B0532F" },
    { stars: 5, text: "Les ris de veau étaient parfaits et la tarte aux pommes, un délice. Tout est frais, généreux et plein de goût. Le rapport qualité-prix est imbattable.", name: "Jean-Pierre L.", meta: "En couple · mars 2026", color: "#6E2A2A" },
    { stars: 5, text: "Une terrasse charmante juste à côté de l'abbaye, un service souriant et des produits du coin. On revient à chaque passage au Bec-Hellouin.", name: "Sophie & Marc", meta: "Habitués · février 2026", color: "#8A9A7B" },
  ],
} as const;

/* --- Horaires --------------------------------------------------------------
   dow : 0=dimanche … 6=samedi. opens/closes : pour les données SEO (24h).
   closed : jour de fermeture. */
export const hours = [
  { day: "Lundi", time: "10h – 18h30", dow: 1, opens: "10:00", closes: "18:30" },
  { day: "Mardi", time: "10h – 18h30", dow: 2, opens: "10:00", closes: "18:30" },
  { day: "Mercredi", time: "10h – 18h30", dow: 3, opens: "10:00", closes: "18:30" },
  { day: "Jeudi", time: "Fermé", dow: 4, closed: true },
  { day: "Vendredi", time: "10h – 21h", dow: 5, opens: "10:00", closes: "21:00" },
  { day: "Samedi", time: "10h – 21h", dow: 6, opens: "10:00", closes: "21:00" },
  { day: "Dimanche", time: "10h – 18h30", dow: 0, opens: "10:00", closes: "18:30" },
] as const;

/* --- Infos & accès --------------------------------------------------------- */
export const infos = {
  eyebrow: "Infos & accès",
  title: "Nous trouver & nous rendre visite",
  lines: [
    { icon: "pin", title: "Le Bec-Hellouin", text: "Au cœur d'un des Plus Beaux Villages de France, à deux pas de l'abbaye Notre-Dame." },
    { icon: "car", title: "Accès & stationnement", text: "Parking du village à proximité. Terrasse aux beaux jours." },
    { icon: "phone", title: "Réservations & renseignements", phone: true },
    { icon: "gift", title: "Bar, salon de thé & boutique cadeaux", text: "Une petite sélection de cadeaux et douceurs à emporter." },
  ] satisfies { icon: "pin" | "car" | "phone" | "gift"; title: string; text?: string; phone?: boolean }[],
} as const;

/* --- Réserver -------------------------------------------------------------- */
export const reserver = {
  eyebrow: "Réserver",
  title: "Réservez votre table",
  lead: "Une envie de dernière minute ou un repas en famille ? Réservez en quelques secondes, ou appelez-nous directement — on adore préparer votre venue.",
  phonePrompt: "Par téléphone",
  note: "Réponse de confirmation sous 24 h. Pour les groupes de 8 personnes et plus, merci de privilégier l'appel.",
  meta: "Vous recevrez une confirmation. Aucune carte bancaire demandée.",
  /* Créneaux de réservation — source unique éditable.
     closedDow : jour de fermeture (0=dim … 6=sam ; le libellé est repris de `hours`).
     dinnerDows : jours où le service du soir est proposé. */
  slots: {
    closedDow: 4,
    lunch: ["12:00", "12:30", "13:00", "13:30", "14:00"],
    tea: ["15:00", "15:30", "16:00", "16:30", "17:00"],
    dinner: ["19:00", "19:30", "20:00", "20:30"],
    dinnerDows: [5, 6],
  },
} as const;

/* --- Pied de page ---------------------------------------------------------- */
export const footer = {
  blurb: "Bar, restaurant, salon de thé & petite boutique cadeaux, au cœur du Bec-Hellouin — l'un des Plus Beaux Villages de France.",
  /* Colonne « Le restaurant » du pied de page (liens d'ancre). */
  restaurantLinks: [
    { label: "Notre histoire", href: "#histoire" },
    { label: "La carte", href: "#carte" },
    { label: "Galerie", href: "#galerie" },
    { label: "Avis", href: "#avis" },
  ],
  contact: ["{village}, Normandie", "Lun–Mer & Dim : 10h–18h30", "Ven–Sam : 10h–21h · Jeudi fermé"],
  legalLinks: ["Mentions légales", "Confidentialité", "Plan du site"],
} as const;
