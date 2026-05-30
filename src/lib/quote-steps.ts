/**
 * Quote estimator — step definitions, pricing math and helpers.
 * Ported VERBATIM from quote.js (the source of truth, README §9). The only
 * change: `&nbsp;` entities become real non-breaking spaces ( ) because the
 * React wizard renders these as text, not innerHTML.
 */
import type { IconName } from "@/lib/icons";

export type QuoteOption = {
  k: string;
  i: IconName;
  t: string;
  d: string;
  base?: number;
  add?: number;
  mult?: number;
  map?: string;
};

export type QuoteStep = {
  id: "type" | "size" | "features" | "seo" | "timing";
  label: string;
  kind: "single" | "multi";
  q: string;
  help: string;
  cols: 2 | 3;
  options: QuoteOption[];
};

export const steps: QuoteStep[] = [
  {
    id: "type",
    label: "Type de projet",
    kind: "single",
    q: "Quel type de projet souhaitez-vous ?",
    help: "Le point de départ de votre estimation.",
    cols: 2,
    options: [
      { k: "vitrine", i: "vitrine", t: "Site vitrine", d: "Présenter votre activité et générer des contacts.", base: 890, map: "Site vitrine" },
      { k: "ecom", i: "ecom", t: "Site e-commerce", d: "Vendre vos produits en ligne, 24h/24.", base: 2490, map: "Site e-commerce" },
      { k: "landing", i: "landing", t: "Landing page", d: "Une page unique pour une campagne ciblée.", base: 590, map: "Landing page" },
      { k: "refonte", i: "refonte", t: "Refonte de site", d: "Moderniser un site existant.", base: 990, map: "Refonte de site" },
      { k: "sur", i: "sur", t: "Projet sur-mesure", d: "Application web ou besoin spécifique.", base: 3500, map: "Autre" },
    ],
  },
  {
    id: "size",
    label: "Taille du site",
    kind: "single",
    q: "Quelle taille pour votre site ?",
    help: "Une estimation du nombre de pages suffit.",
    cols: 2,
    options: [
      { k: "s1", i: "page1", t: "1 à 3 pages", d: "Site simple et essentiel.", add: 0 },
      { k: "s2", i: "page2", t: "4 à 7 pages", d: "Site complet et structuré.", add: 400 },
      { k: "s3", i: "page3", t: "8 à 15 pages", d: "Site riche, plusieurs rubriques.", add: 900 },
      { k: "s4", i: "page4", t: "Plus de 15 pages", d: "Grand site ou catalogue.", add: 1800 },
    ],
  },
  {
    id: "features",
    label: "Fonctionnalités",
    kind: "multi",
    q: "Quelles fonctionnalités vous intéressent ?",
    help: "Plusieurs choix possibles — ou aucun si vous préférez l'essentiel.",
    cols: 2,
    options: [
      { k: "blog", i: "blog", t: "Blog / actualités", d: "Publier des articles régulièrement.", add: 350 },
      { k: "booking", i: "booking", t: "Prise de rendez-vous", d: "Réservation ou agenda en ligne.", add: 450 },
      { k: "pay", i: "pay", t: "Paiement en ligne", d: "Encaisser des paiements sécurisés.", add: 600 },
      { k: "members", i: "members", t: "Espace membre", d: "Connexion et espace privé client.", add: 700 },
      { k: "lang", i: "lang", t: "Site multilingue", d: "Plusieurs langues disponibles.", add: 500 },
      { k: "gallery", i: "gallery", t: "Galerie / portfolio", d: "Mettre en valeur vos visuels.", add: 250 },
      { k: "news", i: "news", t: "Newsletter", d: "Collecter des emails et fidéliser.", add: 200 },
    ],
  },
  {
    id: "seo",
    label: "Référencement",
    kind: "single",
    q: "Quel niveau de référencement ?",
    help: "Le SEO rend votre site visible sur Google.",
    cols: 2,
    options: [
      { k: "base", i: "seoBase", t: "SEO de base", d: "Bonnes pratiques techniques incluses.", add: 0 },
      { k: "local", i: "seoLocal", t: "SEO local Normandie", d: "Visible auprès de vos clients de proximité.", add: 600 },
      { k: "adv", i: "seoAdv", t: "SEO avancé + contenu", d: "Stratégie complète et rédaction optimisée.", add: 1200 },
      { k: "none", i: "none", t: "Pas pour le moment", d: "À envisager plus tard.", add: 0 },
    ],
  },
  {
    id: "timing",
    label: "Délai souhaité",
    kind: "single",
    q: "Dans quel délai ?",
    help: "Un projet express mobilise davantage de ressources.",
    cols: 3,
    options: [
      { k: "planned", i: "cal", t: "Pas pressé", d: "Planifié dans les prochains mois.", mult: 1 },
      { k: "standard", i: "clock", t: "Standard", d: "Sous 4 à 6 semaines.", mult: 1 },
      { k: "express", i: "rocket", t: "Express", d: "Le plus vite possible (+20%).", mult: 1.2 },
    ],
  },
];

export type QuoteAnswers = {
  type: string | null;
  size: string | null;
  features: string[];
  seo: string | null;
  timing: string | null;
};

export const initialAnswers: QuoteAnswers = {
  type: null,
  size: null,
  features: [],
  seo: null,
  timing: null,
};

export function findOpt(stepId: QuoteStep["id"], key: string): QuoteOption | undefined {
  return steps.find((s) => s.id === stepId)?.options.find((o) => o.k === key);
}

/** Returns the indicative low/high range, or null until a project type is set. */
export function compute(answers: QuoteAnswers): { low: number; high: number } | null {
  const type = answers.type ? findOpt("type", answers.type) : null;
  if (!type) return null;
  let total = type.base ?? 0;
  if (answers.size) total += findOpt("size", answers.size)?.add ?? 0;
  answers.features.forEach((k) => {
    total += findOpt("features", k)?.add ?? 0;
  });
  if (answers.seo) total += findOpt("seo", answers.seo)?.add ?? 0;
  const mult = answers.timing ? findOpt("timing", answers.timing)?.mult ?? 1 : 1;
  total = total * mult;
  const low = Math.round(total / 10) * 10;
  const high = Math.round((total * 1.18) / 10) * 10;
  return { low, high };
}

export const fmt = (n: number): string => n.toLocaleString("fr-FR");

/** Key/value recap rows for the result screen. */
export function recapData(answers: QuoteAnswers): Array<[string, string]> {
  const rows: Array<[string, string]> = [];
  const type = answers.type ? findOpt("type", answers.type) : null;
  if (type) rows.push(["Type de projet", type.t]);
  if (answers.size) rows.push(["Taille", findOpt("size", answers.size)!.t]);
  const feats = answers.features.map((k) => findOpt("features", k)!.t);
  rows.push(["Fonctionnalités", feats.length ? feats.join(", ") : "Essentiel uniquement"]);
  if (answers.seo) rows.push(["Référencement", findOpt("seo", answers.seo)!.t]);
  if (answers.timing) rows.push(["Délai", findOpt("timing", answers.timing)!.t]);
  return rows;
}

/** The <select> value to pre-select in the contact form (type.map). */
export function projectMapValue(answers: QuoteAnswers): string | null {
  const type = answers.type ? findOpt("type", answers.type) : null;
  return type?.map ?? null;
}

/** The formatted message body, ported from sendToContact(). */
export function buildPrefillMessage(answers: QuoteAnswers): string {
  const type = findOpt("type", answers.type!)!;
  const r = compute(answers)!;
  const feats = answers.features.map((k) => findOpt("features", k)!.t);
  return (
    `Bonjour, voici mon estimation réalisée en ligne :\n` +
    `• Type de projet : ${type.t}\n` +
    (answers.size ? `• Taille : ${findOpt("size", answers.size)!.t}\n` : "") +
    `• Fonctionnalités : ${feats.length ? feats.join(", ") : "essentiel uniquement"}\n` +
    (answers.seo ? `• Référencement : ${findOpt("seo", answers.seo)!.t}\n` : "") +
    (answers.timing ? `• Délai : ${findOpt("timing", answers.timing)!.t}\n` : "") +
    `• Estimation indicative : ${fmt(r.low)} – ${fmt(r.high)} €\n\n` +
    `Merci de me recontacter pour un devis détaillé.`
  );
}
