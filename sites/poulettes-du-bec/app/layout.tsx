import type { Metadata, Viewport } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import { avis, business, hours, seo } from "@/content";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-mulish",
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

/* Données structurées Schema.org — restaurant + horaires (référencement local). */
const DAY_NAME = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": seo.url,
  name: business.name,
  url: seo.url,
  image: seo.url + seo.ogImage,
  telephone: business.phoneHref.replace("tel:", ""),
  servesCuisine: business.servesCuisine,
  priceRange: business.priceRange,
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    addressLocality: business.address.locality,
    postalCode: business.address.postalCode,
    addressRegion: business.address.region,
    addressCountry: business.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
  openingHoursSpecification: hours
    .filter((h): h is typeof h & { opens: string; closes: string } => !("closed" in h && h.closed))
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_NAME[h.dow],
      opens: h.opens,
      closes: h.closes,
    })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.ratingValue,
    reviewCount: business.reviewCount,
  },
  // Avis affichés sur la page (étaye la note agrégée).
  review: avis.reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 },
    reviewBody: r.text,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${mulish.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // Contenu statique (content.ts) ; on échappe `<` par précaution.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
