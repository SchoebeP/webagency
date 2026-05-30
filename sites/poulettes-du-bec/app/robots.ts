import type { MetadataRoute } from "next";
import { seo } from "@/content";

// Requis avec `output: export` (génération 100 % statique).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${seo.url}/sitemap.xml`,
  };
}
