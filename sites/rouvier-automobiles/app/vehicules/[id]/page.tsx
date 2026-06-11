// Fiche véhicule — /vehicules/[id] (server component).
// Layout README §3 : retour, grille 1.45fr/1fr ; gauche = galerie + specs +
// description + équipements ; droite sticky = carte titre/prix + carte contact.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle } from "@/lib/db";
import { formatKm, formatMonthly, formatPrice } from "@/lib/format";
import { Badge, FavBtn, Icon, type IconName } from "@/components/ui";
import { Gallery } from "@/components/detail/gallery";
import { ContactCard } from "@/components/detail/contact-card";

// Lit la base à chaque requête (les modifs admin doivent apparaître sans rebuild).
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) {
    return { title: "Véhicule introuvable — Rouvier Automobiles" };
  }
  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.version} — ${formatPrice(vehicle.price)} | Rouvier Automobiles`;
  const priceLine =
    vehicle.monthly > 0
      ? `${formatPrice(vehicle.price)} ou dès ${formatMonthly(vehicle.monthly)}. `
      : `${formatPrice(vehicle.price)}. `;
  const description =
    `${vehicle.brand} ${vehicle.model} ${vehicle.version} d'occasion : ${vehicle.year}, ` +
    `${formatKm(vehicle.km)}, ${vehicle.fuel.toLowerCase()}, boîte ${vehicle.gearbox.toLowerCase()}. ` +
    priceLine +
    `Révisé et garanti 12 mois — essai sur rendez-vous chez Rouvier Automobiles.`;
  return { title, description };
}

export default async function VehiculePage({ params }: Params) {
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  const specs: Array<{ icon: IconName; label: string; value: string }> = [
    { icon: "calendar", label: "Année", value: String(vehicle.year) },
    { icon: "gauge", label: "Kilométrage", value: formatKm(vehicle.km) },
    { icon: "fuel", label: "Énergie", value: vehicle.fuel },
    { icon: "gearbox", label: "Boîte", value: vehicle.gearbox },
    { icon: "power", label: "Puissance", value: vehicle.power },
    { icon: "doors", label: "Portes", value: String(vehicle.doors) },
    { icon: "palette", label: "Couleur", value: vehicle.color },
    { icon: "shield", label: "Garantie", value: "12 mois" },
  ];

  const badges = vehicle.sold ? ["Vendu", ...vehicle.badges] : vehicle.badges;

  return (
    <main>
      <div className="container">
        <Link href="/vehicules" className="back-link">
          <Icon name="arrowLeft" size={15} />
          Retour aux annonces
        </Link>
        <div className="detail-layout">
          <div className="fade-up">
            <Gallery vehicle={vehicle} />

            <div className="spec-grid">
              {specs.map((s) => (
                <div className="spec-cell" key={s.label}>
                  <span className="spec-icon">
                    <Icon name={s.icon} size={17} />
                  </span>
                  <small>{s.label}</small>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h2>Description</h2>
              <p>{vehicle.description}</p>
            </div>

            <div className="detail-section">
              <h2>Équipements principaux</h2>
              <div className="equip-grid">
                {vehicle.equipment.map((eq) => (
                  <div className="equip-item" key={eq}>
                    <Icon name="check" size={15} />
                    {eq}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="detail-side fade-up fade-up-1">
            <div className="detail-card">
              <div className="detail-title-row">
                <h1>
                  {vehicle.brand} {vehicle.model}
                </h1>
                <FavBtn vehicleId={vehicle.id} staticPos />
              </div>
              <div className="detail-version">{vehicle.version}</div>
              <div className="detail-badges">
                {badges.map((b) => (
                  <Badge key={b} label={b} />
                ))}
              </div>
              <div className="detail-price-row">
                <div className="detail-price">{formatPrice(vehicle.price)}</div>
                {vehicle.monthly > 0 && (
                  <div className="detail-price-note">ou dès {formatMonthly(vehicle.monthly)}*</div>
                )}
              </div>
              {vehicle.monthly > 0 && (
                <div className="detail-price-note">
                  *Exemple de financement sur 84 mois, TAEG à titre indicatif, sous réserve
                  d&apos;acceptation du dossier. Un crédit vous engage et doit être remboursé.
                </div>
              )}
            </div>
            {vehicle.sold ? (
              <div className="detail-card">
                <div className="contact-form">
                  <h3>Véhicule vendu</h3>
                  <p className="contact-form-sub">
                    Ce véhicule a trouvé preneur. Découvrez nos autres occasions révisées et
                    garanties 12 mois.
                  </p>
                  <Link href="/vehicules" className="btn btn-primary btn-block">
                    Voir nos autres annonces
                    <Icon name="arrowRight" size={15} />
                  </Link>
                </div>
              </div>
            ) : (
              <ContactCard vehicle={vehicle} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
