import type { MetadataRoute } from "next";
import { seo } from "@/content";

// Requis avec `output: export` (génération 100 % statique).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.url,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
