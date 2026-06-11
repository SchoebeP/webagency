// Accueil — hero + recherche, bandeau de confiance, sélection du moment.
// Server component : lit lib/db directement ; l'interactivité (recherche,
// cartes, favoris) vit dans les composants clients importés.

import Link from "next/link";
import { CarCard, CarPhoto, Icon, type IconName } from "@/components/ui";
import { SearchCard } from "@/components/home/search-card";
import { getVehicles } from "@/lib/db";
import type { Vehicle } from "@/lib/types";

// La base évolue depuis /admin : ne jamais prérendre cette page au build.
export const dynamic = "force-dynamic";

const TRUST_ITEMS: Array<{ icon: IconName; title: string; sub: string }> = [
  {
    icon: "shield",
    title: "Garantie 12 mois incluse",
    sub: "Pièces et main-d'œuvre, extensible à 24 mois.",
  },
  {
    icon: "wrench",
    title: "Révisés en atelier",
    sub: "Contrôle 120 points, vidange et CT à jour.",
  },
  {
    icon: "key",
    title: "Reprise de votre véhicule",
    sub: "Estimation gratuite, déduite du prix d'achat.",
  },
];

// Repli si le stock est vide (base purgée depuis l'admin) : CarPhoto rend un
// placeholder déterministe à partir de `color` — aucun champ n'est affiché.
const HERO_FALLBACK: Vehicle = {
  id: "hero-garage",
  brand: "Rouvier",
  model: "Automobiles",
  version: "",
  year: 0,
  km: 0,
  price: 0,
  monthly: 0,
  fuel: "",
  gearbox: "",
  power: "",
  doors: 0,
  color: "Bleu",
  badges: [],
  featured: false,
  description: "",
  equipment: [],
  sold: false,
  photos: [],
};

export default function HomePage() {
  const vehicles = getVehicles();
  const inStock = vehicles.filter((v) => !v.sold);

  const brands = [...new Set(inStock.map((v) => v.brand))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );
  const fuels = [...new Set(inStock.map((v) => v.fuel))].sort((a, b) =>
    a.localeCompare(b, "fr"),
  );

  const selection = inStock.filter((v) => v.featured).slice(0, 3);
  const heroVehicle = selection[0] ?? inStock[0] ?? HERO_FALLBACK;
  const heroAlt =
    heroVehicle === HERO_FALLBACK
      ? "Notre garage — photo à venir"
      : `${heroVehicle.brand} ${heroVehicle.model} ${heroVehicle.version} — véhicule vedette`;
  const stockLabel = `${inStock.length} véhicule${inStock.length > 1 ? "s" : ""} en stock`;

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="fade-up">
              <div className="hero-eyebrow">Garage indépendant depuis 1987</div>
              <h1>Des occasions révisées, garanties, prêtes à rouler.</h1>
              <p className="hero-lead">
                Chaque véhicule est contrôlé sur 120 points dans notre atelier,
                livré révisé et garanti 12 mois minimum.
              </p>
              <SearchCard brands={brands} fuels={fuels} />
            </div>
            <div className="hero-visual fade-up fade-up-1">
              <CarPhoto vehicle={heroVehicle} alt={heroAlt} priority />
              <div className="hero-tag">
                <Icon name="shield" size={15} />
                {stockLabel}
              </div>
            </div>
          </div>
          <div className="trust-row fade-up fade-up-2">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="trust-item">
                <div className="trust-icon">
                  <Icon name={item.icon} size={19} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selection.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <h2>La sélection du moment</h2>
              <Link href="/vehicules" className="link-arrow">
                Tout le stock <Icon name="arrowRight" size={15} />
              </Link>
            </div>
            <div className="car-grid">
              {selection.map((car, i) => (
                <CarCard key={car.id} vehicle={car} anim={`fade-up-${i + 1}`} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
