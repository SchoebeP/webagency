import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { avis, business, prestations, seo, zone } from "@/content";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.url,
    siteName: business.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: seo.themeColor,
  width: "device-width",
  initialScale: 1,
};

/* Données structurées Schema.org — aide le référencement local (fiche Google). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": seo.url,
  name: business.name,
  url: seo.url,
  image: seo.url + seo.ogImage,
  telephone: business.phoneTel,
  email: business.email,
  priceRange: business.priceRange,
  founder: business.owner,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.address.locality,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  areaServed: zone.communes.map((c) => ({ "@type": "City", name: c })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.ratingValue,
    reviewCount: business.reviewCount,
  },
  // Avis affichés sur la page (étaye la note agrégée).
  review: avis.reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
    reviewBody: r.text,
  })),
  makesOffer: prestations.services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        {/* Active l'animation « reveal » seulement si JS + IntersectionObserver
            sont là (sinon le contenu reste visible). Exécuté avant le 1er rendu. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(typeof IntersectionObserver!=='undefined')document.documentElement.classList.add('reveal-ready')",
          }}
        />
        <script
          type="application/ld+json"
          // Contenu statique (content.ts) ; on échappe `<` pour empêcher toute
          // sortie de balise </script> par précaution.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
