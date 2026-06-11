import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getVehicles } from "@/lib/db";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://rouvier-automobiles.example"),
  title: "Rouvier Automobiles — Véhicules d'occasion révisés et garantis",
  description:
    "Garage indépendant depuis 1987 près de Cholet : véhicules d'occasion révisés en atelier, garantis 12 mois, reprise de votre véhicule. Essai sur rendez-vous.",
  openGraph: {
    siteName: "Rouvier Automobiles",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Appliqué avant le premier paint pour éviter tout flash de thème.
// Clé localStorage : "rouvier.theme" ("light" | "dark") — défaut : clair (Épuré).
const themeInit = `(function(){try{var t=localStorage.getItem('rouvier.theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Ids des véhicules encore en vente : le badge « Favoris » du header
  // n'additionne que les favoris localStorage qui existent toujours
  // (les pages publiques sont force-dynamic, donc recalculé à chaque requête).
  const validFavIds = getVehicles()
    .filter((v) => !v.sold)
    .map((v) => v.id);

  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <div className="app">
          <Header validFavIds={validFavIds} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
