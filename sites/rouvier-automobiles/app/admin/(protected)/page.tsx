// Tableau de bord — compteurs (stock, vendus, demandes nouvelles)
// et les 5 dernières demandes d'essai.

import type { Metadata } from "next";
import Link from "next/link";
import { getRequests, getVehicles } from "@/lib/db";
import { Icon } from "@/components/ui";
import { formatRequestDate } from "@/components/admin/dates";

export const metadata: Metadata = { title: "Tableau de bord — Espace pro | Rouvier Automobiles" };
export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const vehicles = getVehicles();
  const requests = getRequests(); // déjà triées : plus récentes d'abord
  const inStock = vehicles.filter((v) => !v.sold).length;
  const sold = vehicles.length - inStock;
  const newRequests = requests.filter((r) => r.status === "new").length;
  const latest = requests.slice(0, 5);

  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d&apos;ensemble de l&apos;activité du garage.</p>
        </div>
        <Link href="/admin/vehicules/nouveau" className="btn btn-primary">
          + Ajouter un véhicule
        </Link>
      </header>

      <div className="admin-stats">
        <Link href="/admin/vehicules" className="admin-stat">
          <span className="admin-stat-icon">
            <Icon name="key" size={19} />
          </span>
          <strong className="admin-stat-value">{inStock}</strong>
          <span className="admin-stat-label">Véhicules en stock</span>
        </Link>
        <Link href="/admin/vehicules" className="admin-stat">
          <span className="admin-stat-icon">
            <Icon name="check" size={19} />
          </span>
          <strong className="admin-stat-value">{sold}</strong>
          <span className="admin-stat-label">Véhicules vendus</span>
        </Link>
        <Link href="/admin/demandes" className="admin-stat">
          <span className="admin-stat-icon">
            <Icon name="calendar" size={19} />
          </span>
          <strong className="admin-stat-value">{newRequests}</strong>
          <span className="admin-stat-label">Demandes nouvelles</span>
        </Link>
      </div>

      <section className="admin-card">
        <div className="admin-card-head">
          <h2>Dernières demandes</h2>
          <Link href="/admin/demandes" className="link-arrow">
            Tout voir <Icon name="arrowRight" size={15} />
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="admin-empty">
            Aucune demande pour le moment. Elles arriveront depuis le formulaire
            « Essayer ce véhicule » des fiches.
          </p>
        ) : (
          <ul className="admin-req-list">
            {latest.map((r) => (
              <li key={r.id} className="admin-req-row">
                <div>
                  <strong>{r.name}</strong>
                  <span className="admin-req-meta">
                    {r.vehicleLabel} · {formatRequestDate(r.createdAt)}
                  </span>
                </div>
                <span className={"admin-status" + (r.status === "new" ? " is-new" : "")}>
                  {r.status === "new" ? "Nouvelle" : "Traitée"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
