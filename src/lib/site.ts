/**
 * Central brand / contact config. Single source of truth for the rebrand
 * (Studio Albâtre, Normandy positioning kept). Placeholders flagged below are
 * for the client to replace (README §11).
 */
export const site = {
  name: "Studio Albâtre",
  /** Two-line logo: main name + small accent label. */
  logoMain: "Studio Albâtre",
  logoSmall: "Normandie",
  region: "Normandie",
  domain: "studio-albatre.fr",
  url: "https://studio-albatre.fr",

  email: "contact@studio-albatre.fr",
  phoneDisplay: "07 78 04 82 18",
  phoneHref: "tel:+33778048218",

  // PLACEHOLDER — replace href="#" with real profiles.
  socials: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },

  zones: ["Rouen", "Caen", "Le Havre", "Évreux", "À distance"],

  navLinks: [
    { href: "#services", label: "Services" },
    { href: "#realisations", label: "Réalisations" },
    { href: "#tarifs", label: "Tarifs" },
    { href: "#apropos", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ],
} as const;
