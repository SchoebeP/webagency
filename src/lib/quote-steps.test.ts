import { describe, it, expect } from "vitest";
import {
  steps,
  initialAnswers,
  compute,
  fmt,
  recapData,
  projectMapValue,
  buildPrefillMessage,
  type QuoteAnswers,
} from "@/lib/quote-steps";

/** Strip everything but digits (fr-FR uses narrow no-break spaces as grouping). */
const digits = (s: string) => s.replace(/\D/g, "");

const fullAnswers: QuoteAnswers = {
  type: "vitrine", // base 890
  size: "s2", // +400
  features: ["blog", "gallery"], // +350 +250
  seo: "local", // +600
  timing: "express", // ×1.2
};

describe("steps / initialAnswers", () => {
  it("defines the five wizard steps in order", () => {
    expect(steps.map((s) => s.id)).toEqual(["type", "size", "features", "seo", "timing"]);
    expect(steps.find((s) => s.id === "features")?.kind).toBe("multi");
  });

  it("initialAnswers starts empty", () => {
    expect(initialAnswers).toEqual({
      type: null,
      size: null,
      features: [],
      seo: null,
      timing: null,
    });
  });
});

describe("compute", () => {
  it("returns null until a project type is chosen", () => {
    expect(compute(initialAnswers)).toBeNull();
    // Other answers without a type still yield null
    expect(
      compute({ type: null, size: "s3", features: ["pay"], seo: "adv", timing: "express" })
    ).toBeNull();
  });

  it("computes the range from the type alone", () => {
    // vitrine base 890 → low 890, high round(890*1.18/10)*10 = 1050
    expect(compute({ ...initialAnswers, type: "vitrine" })).toEqual({ low: 890, high: 1050 });
  });

  it("computes the exact range for a fully answered scenario (with express ×1.2)", () => {
    // (890 + 400 + 350 + 250 + 600) * 1.2 = 2988
    // low  = round(2988/10)*10        = 2990
    // high = round(2988*1.18/10)*10   = round(352.584)*10 = 3530
    expect(compute(fullAnswers)).toEqual({ low: 2990, high: 3530 });
  });

  it("computes the exact range for an e-commerce scenario (standard timing, ×1)", () => {
    // 2490 + 900 + 600 + 700 + 1200 = 5890
    // high = round(5890*1.18/10)*10 = round(695.02)*10 = 6950
    const answers: QuoteAnswers = {
      type: "ecom",
      size: "s3",
      features: ["pay", "members"],
      seo: "adv",
      timing: "standard",
    };
    expect(compute(answers)).toEqual({ low: 5890, high: 6950 });
  });

  it("each selected feature adds its amount to the total", () => {
    const base = compute({ ...initialAnswers, type: "vitrine", features: [] })!;
    // blog +350, news +200 → +550 on the pre-multiplier total
    const withFeats = compute({ ...initialAnswers, type: "vitrine", features: ["blog", "news"] })!;
    expect(base).toEqual({ low: 890, high: 1050 });
    // 890 + 550 = 1440 → high = round(1440*1.18/10)*10 = round(169.92)*10 = 1700
    expect(withFeats).toEqual({ low: 1440, high: 1700 });
    expect(withFeats.low - base.low).toBe(550);
  });

  it("zero-add options (size s1, seo base/none) leave the total unchanged", () => {
    const plain = compute({ ...initialAnswers, type: "landing" });
    const withZeros = compute({
      type: "landing",
      size: "s1",
      features: [],
      seo: "none",
      timing: "planned",
    });
    expect(withZeros).toEqual(plain);
    expect(plain).toEqual({ low: 590, high: 700 }); // round(590*1.18/10)*10 = round(69.62)*10
  });
});

describe("fmt", () => {
  it("formats with the fr-FR locale", () => {
    expect(fmt(890)).toBe((890).toLocaleString("fr-FR"));
    expect(fmt(2990)).toBe((2990).toLocaleString("fr-FR"));
  });

  it("groups thousands (digits preserved, a grouping separator inserted)", () => {
    const s = fmt(12340);
    expect(digits(s)).toBe("12340");
    expect(s).not.toBe("12340"); // a (narrow no-break) space separates thousands
    expect(fmt(890)).toBe("890"); // no separator below 1000
  });
});

describe("recapData", () => {
  it("returns labelled rows for every answered step", () => {
    expect(recapData(fullAnswers)).toEqual([
      ["Type de projet", "Site vitrine"],
      ["Taille", "4 à 7 pages"],
      ["Fonctionnalités", "Blog / actualités, Galerie / portfolio"],
      ["Référencement", "SEO local Normandie"],
      ["Délai", "Express"],
    ]);
  });

  it("falls back to 'Essentiel uniquement' when no features are picked", () => {
    const rows = recapData({ ...initialAnswers, type: "refonte" });
    expect(rows).toEqual([
      ["Type de projet", "Refonte de site"],
      ["Fonctionnalités", "Essentiel uniquement"],
    ]);
  });
});

describe("projectMapValue", () => {
  it("maps the chosen type to the contact-form select value", () => {
    expect(projectMapValue(fullAnswers)).toBe("Site vitrine");
    expect(projectMapValue({ ...initialAnswers, type: "sur" })).toBe("Autre");
  });

  it("returns null when no type is chosen", () => {
    expect(projectMapValue(initialAnswers)).toBeNull();
  });
});

describe("buildPrefillMessage", () => {
  it("builds the full prefill message with labels and the formatted range", () => {
    const msg = buildPrefillMessage(fullAnswers);
    expect(msg).toBe(
      "Bonjour, voici mon estimation réalisée en ligne :\n" +
        "• Type de projet : Site vitrine\n" +
        "• Taille : 4 à 7 pages\n" +
        "• Fonctionnalités : Blog / actualités, Galerie / portfolio\n" +
        "• Référencement : SEO local Normandie\n" +
        "• Délai : Express\n" +
        `• Estimation indicative : ${fmt(2990)} – ${fmt(3530)} €\n\n` +
        "Merci de me recontacter pour un devis détaillé."
    );
  });

  it("omits unanswered optional lines and says 'essentiel uniquement' without features", () => {
    const msg = buildPrefillMessage({ ...initialAnswers, type: "landing" });
    expect(msg).toContain("• Type de projet : Landing page\n");
    expect(msg).toContain("• Fonctionnalités : essentiel uniquement\n");
    expect(msg).not.toContain("• Taille");
    expect(msg).not.toContain("• Référencement");
    expect(msg).not.toContain("• Délai");
    expect(msg).toContain(`• Estimation indicative : ${fmt(590)} – ${fmt(700)} €`);
  });
});
