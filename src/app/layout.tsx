import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Aurora } from "@/components/layout/Aurora";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { RevealManager } from "@/components/layout/RevealManager";
import { DemoSwitcher } from "@/components/demo/DemoSwitcher";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QuotePrefillProvider } from "@/components/providers/QuotePrefillContext";
import { site } from "@/lib/site";

// Weights trimmed to those actually rendered (browser-verified): the display
// font uses 500/600/700 (700 is the fallback for the few weight:900 elements);
// the body font uses 400/600/700. Dropped weights saved ~39 kB of fonts.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Studio Albâtre — Création de sites internet & SEO en Normandie",
  description:
    "Agence de création de sites internet et de référencement SEO en Normandie. Sites vitrines, e-commerce, SEO local à Rouen, Caen, Le Havre. Devis gratuit.",
  keywords: [
    "création site internet Normandie",
    "référencement SEO Normandie",
    "site vitrine Rouen",
    "agence web Caen",
    "SEO local Le Havre",
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: "Studio Albâtre — Création de sites internet & SEO en Normandie",
    description:
      "Sites web modernes, rapides et optimisés SEO pour transformer vos visiteurs en clients — Rouen, Caen, Le Havre et partout en France.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070912" },
    { media: "(prefers-color-scheme: light)", color: "#eef1ff" },
  ],
};

// Runs before paint to apply the saved theme and avoid a flash / hydration mismatch.
const themeInit = `(function(){try{var t=localStorage.getItem('studio-albatre-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

// LocalBusiness structured data for local SEO. Fields are emitted conditionally
// so placeholder contact details (README §11) are never published to Google.
const hasRealPhone =
  (site.phoneHref as string) !== "tel:+33600000000" &&
  !(site.phoneDisplay as string).includes("X");
const realSocials = Object.values(site.socials).filter((u) => u !== "#");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  description:
    "Création de sites internet et référencement SEO en Normandie : sites vitrines, e-commerce et SEO local à Rouen, Caen, Le Havre et Évreux.",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressRegion: site.region,
    addressCountry: "FR",
  },
  areaServed: site.zones
    .filter((z) => z !== "À distance")
    .map((z) => ({ "@type": "City", name: z })),
  ...(hasRealPhone
    ? { telephone: site.phoneHref.replace("tel:", "") }
    : {}),
  ...(realSocials.length ? { sameAs: realSocials } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      data-palette="ocean"
      data-glass="standard"
      data-radius="standard"
      data-bg="aurora"
      className={`${spaceGrotesk.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Aurora />
        <ThemeProvider>
          <QuotePrefillProvider>
            <Nav />
            {children}
            <Footer />
            <RevealManager />
            <DemoSwitcher />
          </QuotePrefillProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
