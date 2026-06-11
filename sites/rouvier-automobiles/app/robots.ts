// robots.txt — généré par Next. Tout est autorisé sauf le back-office et
// l'API ; même base d'URL (env SITE_URL) que le sitemap et metadataBase.

import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL || "https://rouvier-automobiles.example";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
