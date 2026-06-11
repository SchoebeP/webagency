// Demandes d'essai — les plus récentes d'abord, statut basculable,
// libellé véhicule cliquable vers la fiche publique (texte simple si le
// véhicule a été supprimé), téléphone en tel:.

import type { Metadata } from "next";
import Link from "next/link";
import { getRequests, getVehicles } from "@/lib/db";
import { Icon } from "@/components/ui";
import { formatRequestDate } from "@/components/admin/dates";
import { RequestStatusToggle } from "@/components/admin/request-status-toggle";

export const metadata: Metadata = { title: "Demandes d'essai — Espace pro | Rouvier Automobiles" };
export const dynamic = "force-dynamic";

export default function AdminRequestsPage() {
  const requests = getRequests(); // déjà triées : plus récentes d'abord
  const newCount = requests.filter((r) => r.status === "new").length;
  // Ids existants : une demande peut référencer un véhicule supprimé depuis.
  const vehicleIds = new Set(getVehicles().map((v) => v.id));

  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Demandes d&apos;essai</h1>
          <p>
            {requests.length === 0
              ? "Aucune demande reçue pour le moment."
              : `${requests.length} demande${requests.length > 1 ? "s" : ""}, dont ${newCount} nouvelle${newCount > 1 ? "s" : ""}.`}
          </p>
        </div>
      </header>

      {requests.length === 0 ? (
        <div className="empty-state">
          Les demandes envoyées depuis le formulaire « Essayer ce véhicule »
          apparaîtront ici.
        </div>
      ) : (
        requests.map((r) => (
          <article key={r.id} className={"admin-request" + (r.status === "new" ? " is-new" : "")}>
            <div className="admin-request-top">
              <div>
                <strong className="admin-request-name">{r.name}</strong>
                <a className="admin-request-phone" href={`tel:${r.phone.replace(/[^\d+]/g, "")}`}>
                  <Icon name="phone" size={14} />
                  {r.phone}
                </a>
              </div>
              <div className="admin-request-side">
                <time className="admin-request-date" dateTime={r.createdAt}>
                  {formatRequestDate(r.createdAt)}
                </time>
                <RequestStatusToggle id={r.id} status={r.status} />
              </div>
            </div>
            <div className="admin-request-body">
              {vehicleIds.has(r.vehicleId) ? (
                <Link href={`/vehicules/${encodeURIComponent(r.vehicleId)}`} className="admin-request-vehicle">
                  {r.vehicleLabel}
                </Link>
              ) : (
                <span className="admin-request-vehicle">
                  {r.vehicleLabel}{" "}
                  <span className="admin-request-slot">(véhicule supprimé)</span>
                </span>
              )}
              <span className="admin-request-slot">Créneau souhaité : {r.slot}</span>
              {r.message ? <p className="admin-request-msg">{r.message}</p> : null}
            </div>
          </article>
        ))
      )}
    </>
  );
}
