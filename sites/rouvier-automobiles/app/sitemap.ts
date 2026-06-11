// sitemap.xml — généré par Next : pages publiques + une entrée par véhicule
// en stock (les véhicules vendus restent accessibles mais sortent du sitemap).

import type { MetadataRoute } from "next";
import { getVehicles } from "@/lib/db";

// Lecture de la base à chaque requête : le sitemap reflète les ajouts /
// ventes faits depuis /admin sans rebuild (même politique que /vehicules).
export const dynamic = "force-dynamic";

const BASE_URL = process.env.SITE_URL || "https://rouvier-automobiles.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const vehicles = getVehicles().filter((v) => !v.sold);
  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/vehicules`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...vehicles.map((v) => ({
      url: `${BASE_URL}/vehicules/${encodeURIComponent(v.id)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
