import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { Aurora } from "@/components/layout/Aurora";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { RevealManager } from "@/components/layout/RevealManager";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QuotePrefillProvider } from "@/components/providers/QuotePrefillContext";
import { site } from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
        <Aurora />
        <ThemeProvider>
          <QuotePrefillProvider>
            <Nav />
            {children}
            <Footer />
            <RevealManager />
          </QuotePrefillProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
