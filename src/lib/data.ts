/**
 * Content for the data-driven grids, ported verbatim from script.js.
 * French copy is final. Normandy positioning kept per the brand decision.
 * Portfolio projects, metrics and testimonials are placeholders to replace
 * with real cases (README §11).
 */
import type { IconName } from "@/lib/icons";

export type Service = { i: IconName; t: string; d: string };
export type WhyItem = { t: string; d: string };
export type Work = {
  tag: string;
  t: string;
  d: string;
  g: string;
  m1: string;
  l1: string;
  m2: string;
  l2: string;
};
export type PricingPlan = {
  name: string;
  desc: string;
  price: string;
  foot: string;
  featured: boolean;
  feats: string[];
};
export type ProcessStep = { t: string; d: string };
export type Testimonial = { q: string; n: string; r: string; av: string };
export type Faq = { q: string; a: string };

export const services: Service[] = [
  { i: "vitrine", t: "Sites vitrines", d: "Un site élégant et professionnel qui présente votre activité et inspire confiance dès la première visite." },
  { i: "ecom", t: "Sites e-commerce", d: "Une boutique en ligne fluide et sécurisée pour vendre vos produits 24h/24, partout en France." },
  { i: "landing", t: "Landing pages", d: "Des pages d'atterrissage conçues pour une campagne précise et un taux de conversion maximal." },
  { i: "seo", t: "Référencement SEO", d: "Audit complet et optimisation technique, contenu et popularité pour grimper dans les résultats Google." },
  { i: "local", t: "SEO local Normandie", d: "Soyez visible auprès de vos clients de proximité : fiche Google, mots-clés locaux, avis et géolocalisation." },
  { i: "maint", t: "Maintenance & mises à jour", d: "Sécurité, sauvegardes et mises à jour régulières pour un site toujours rapide et fiable." },
  { i: "speed", t: "Vitesse & performance", d: "Optimisation du temps de chargement et des Core Web Vitals pour une expérience irréprochable." },
  { i: "responsive", t: "Design responsive", d: "Un affichage parfait sur mobile, tablette et ordinateur, là où se trouvent vos clients." },
  { i: "host", t: "Hébergement & nom de domaine", d: "Je m'occupe de l'hébergement, du nom de domaine et des emails professionnels, sans souci pour vous." },
];

export const why: WhyItem[] = [
  { t: "Proximité locale", d: "Un interlocuteur unique en Normandie, disponible et à votre écoute pour des échanges simples et humains." },
  { t: "Accompagnement personnalisé", d: "Chaque projet est unique : je vous conseille selon vos objectifs réels, sans jargon technique." },
  { t: "Résultats mesurables", d: "Trafic, positions Google, contacts générés : des indicateurs clairs pour suivre votre retour sur investissement." },
  { t: "Technologies modernes", d: "Des sites rapides, sécurisés et durables, construits avec les standards web les plus récents." },
  { t: "Tarifs transparents", d: "Des devis détaillés et sans surprise. Vous savez exactement ce que vous payez et pourquoi." },
  { t: "SEO dès la conception", d: "Le référencement n'est pas une option : il est intégré dès la première ligne de code de votre site." },
];

export const works: Work[] = [
  { tag: "Site vitrine", t: "Menuiserie Lecomte", d: "Refonte complète pour un artisan menuisier de la région rouennaise.", g: "linear-gradient(135deg,#6366f1,#22d3ee)", m1: "+180%", l1: "Demandes de devis", m2: "Top 3", l2: 'Sur "menuisier Rouen"' },
  { tag: "E-commerce", t: "Cidres du Bocage", d: "Boutique en ligne pour un producteur de cidre normand artisanal.", g: "linear-gradient(135deg,#0ea5e9,#2dd4bf)", m1: "x3", l1: "Ventes en ligne", m2: "1,2s", l2: "Temps de chargement" },
  { tag: "Landing page", t: "Coach Bien-être Caen", d: "Page de capture pour le lancement d'un programme de coaching.", g: "linear-gradient(135deg,#8b5cf6,#3b82f6)", m1: "24%", l1: "Taux de conversion", m2: "+320", l2: "Inscrits / mois" },
  { tag: "SEO local", t: "Garage Auto Le Havre", d: "Stratégie de référencement local et optimisation de la fiche Google.", g: "linear-gradient(135deg,#06b6d4,#6366f1)", m1: "1ʳᵉ", l1: "Page Google locale", m2: "+90%", l2: "Appels reçus" },
  { tag: "Site vitrine", t: "Cabinet d'avocats Évreux", d: "Site institutionnel sobre et rassurant pour un cabinet juridique.", g: "linear-gradient(135deg,#3b82f6,#22d3ee)", m1: "+150%", l1: "Prises de contact", m2: "4,9/5", l2: "Satisfaction client" },
  { tag: "Refonte", t: "Restaurant Le Port", d: "Modernisation et ajout de la réservation en ligne pour un restaurant.", g: "linear-gradient(135deg,#14b8a6,#0ea5e9)", m1: "+65%", l1: "Réservations en ligne", m2: "0,9s", l2: "Vitesse mobile" },
];

export const pricing: PricingPlan[] = [
  {
    name: "Essentiel",
    desc: "Idéal pour lancer une activité avec un site vitrine professionnel.",
    price: "890",
    foot: "Projet livré en 2 à 3 semaines",
    featured: false,
    feats: ["Site vitrine jusqu'à 5 pages", "Design responsive sur-mesure", "Optimisation SEO de base", "Formulaire de contact", "Mise en ligne & formation", "1 mois de support inclus"],
  },
  {
    name: "Pro",
    desc: "Le meilleur équilibre : un site complet avec un vrai travail de référencement.",
    price: "1 690",
    foot: "Le choix de la plupart de mes clients",
    featured: true,
    feats: ["Site jusqu'à 10 pages", "Audit & optimisation SEO complète", "SEO local Normandie + fiche Google", "Rédaction des contenus optimisés", "Suivi des positions 3 mois", "Performance & vitesse optimisées", "3 mois de support inclus"],
  },
  {
    name: "Premium",
    desc: "Pour les projets ambitieux : e-commerce, SEO avancé et maintenance.",
    price: "2 990",
    foot: "Solution clé en main & évolutive",
    featured: false,
    feats: ["Site e-commerce ou sur-mesure", "Stratégie SEO avancée & contenu", "SEO local multi-villes", "Maintenance & mises à jour incluses", "Tableau de bord analytics", "Accompagnement prioritaire", "6 mois de support inclus"],
  },
];

export const processSteps: ProcessStep[] = [
  { t: "Échange & besoins", d: "On discute de votre activité, vos objectifs et vos attentes lors d'un premier appel gratuit." },
  { t: "Devis détaillé", d: "Vous recevez une proposition claire, chiffrée et sans engagement sous 48h." },
  { t: "Conception", d: "Je conçois maquette puis site, avec vos retours intégrés à chaque étape." },
  { t: "Mise en ligne", d: "Tests, optimisation, hébergement : votre site est lancé et vous êtes formé(e)." },
  { t: "Suivi & SEO", d: "On suit les performances et on améliore votre référencement dans la durée." },
];

export const testimonials: Testimonial[] = [
  { q: "Mon site est enfin à la hauteur de mon travail. En trois mois, j'apparais en première page sur Google et je reçois beaucoup plus de demandes de devis. Un vrai professionnel, à l'écoute.", n: "Sophie Lemaire", r: "Menuiserie Lecomte · Rouen", av: "SL" },
  { q: "Un accompagnement humain et efficace du début à la fin. Ma boutique en ligne tourne parfaitement et mes ventes ont triplé. Je recommande sans hésiter à tous les artisans normands.", n: "Thomas Béquet", r: "Cidres du Bocage · Bayeux", av: "TB" },
  { q: "Réactif, pédagogue et de bon conseil. Il a compris mes besoins immédiatement et le résultat dépasse mes attentes. Mon téléphone n'arrête plus de sonner grâce au SEO local !", n: "Karim Aziz", r: "Garage Auto · Le Havre", av: "KA" },
];

export const faqs: Faq[] = [
  { q: "Quels sont les délais de création d'un site ?", a: "Comptez généralement 2 à 3 semaines pour un site vitrine, et 4 à 8 semaines pour un site e-commerce ou un projet sur-mesure. Tout dépend du nombre de pages et de la rapidité des retours et contenus de votre côté. Les délais précis sont indiqués dans le devis." },
  { q: "Combien coûte un site internet ?", a: "Mes forfaits démarrent à 890 € pour un site vitrine, 1 690 € pour un site avec référencement, et 2 990 € pour un projet e-commerce complet. Chaque projet étant unique, je vous établis toujours un devis personnalisé et gratuit après notre premier échange." },
  { q: "Le référencement (SEO) est-il inclus ?", a: "Une optimisation SEO de base est intégrée dès le forfait Essentiel. Les forfaits Pro et Premium incluent un travail de référencement approfondi : audit, mots-clés, contenus optimisés, SEO local en Normandie et suivi des positions sur Google pendant plusieurs mois." },
  { q: "Proposez-vous la maintenance du site ?", a: "Oui. La maintenance (sécurité, sauvegardes, mises à jour, petites modifications) est incluse dans le forfait Premium et disponible en option sur les autres forfaits, à partir d'un abonnement mensuel simple et sans engagement." },
  { q: "Gérez-vous l'hébergement et le nom de domaine ?", a: "Absolument. Je peux m'occuper entièrement de l'hébergement, de la réservation de votre nom de domaine et de la configuration de vos emails professionnels. Vous n'avez rien à gérer techniquement : tout est pris en charge." },
  { q: "Travaillez-vous uniquement en Normandie ?", a: "Je suis basé en Normandie (Rouen, Caen, Le Havre, Évreux) où je privilégie les rencontres en personne, mais je travaille avec des clients partout en France, entièrement à distance. La qualité de l'accompagnement reste la même, où que vous soyez." },
];
