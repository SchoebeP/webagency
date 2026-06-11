// Gestion du stock — tous les véhicules (y compris vendus, badge « Vendu »),
// actions : modifier / marquer vendu / supprimer, ajout d'un véhicule.

import type { Metadata } from "next";
import Link from "next/link";
import { getVehicles } from "@/lib/db";
import { formatKm, formatPrice } from "@/lib/format";
import { Badge, CarPhoto } from "@/components/ui";
import { VehicleRowActions } from "@/components/admin/vehicle-row-actions";

export const metadata: Metadata = { title: "Véhicules — Espace pro | Rouvier Automobiles" };
export const dynamic = "force-dynamic";

export default function AdminVehiclesPage() {
  const vehicles = getVehicles();
  const sold = vehicles.filter((v) => v.sold).length;

  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Véhicules</h1>
          <p>
            {vehicles.length} véhicule{vehicles.length > 1 ? "s" : ""}
            {sold > 0 ? `, dont ${sold} vendu${sold > 1 ? "s" : ""}` : ""}.
          </p>
        </div>
        <Link href="/admin/vehicules/nouveau" className="btn btn-primary">
          + Ajouter un véhicule
        </Link>
      </header>

      {vehicles.length === 0 ? (
        <div className="empty-state">
          <p>Aucun véhicule en base. Ajoutez votre première annonce.</p>
          <Link href="/admin/vehicules/nouveau" className="btn btn-primary">
            + Ajouter un véhicule
          </Link>
        </div>
      ) : (
        <div className="admin-card admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th scope="col">Véhicule</th>
                <th scope="col">Année</th>
                <th scope="col">Kilométrage</th>
                <th scope="col">Prix</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className={v.sold ? "is-sold" : ""}>
                  <td>
                    <div className="admin-veh-cell">
                      <span className="admin-thumb">
                        <CarPhoto vehicle={v} alt={`${v.brand} ${v.model}`} />
                      </span>
                      <span>
                        <strong>
                          {v.brand} {v.model}
                        </strong>
                        <small>{v.version}</small>
                      </span>
                    </div>
                  </td>
                  <td>{v.year}</td>
                  <td>{formatKm(v.km)}</td>
                  <td>{formatPrice(v.price)}</td>
                  <td>
                    <div className="admin-status-cell">
                      {v.sold ? <Badge label="Vendu" /> : <Badge label="Disponible" />}
                      {v.featured ? <Badge label="Sélection" /> : null}
                    </div>
                  </td>
                  <td>
                    <VehicleRowActions id={v.id} sold={v.sold} label={`${v.brand} ${v.model}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
