// Liste des annonces — README §2. Le server component charge le stock non
// vendu et délègue filtres / tri / favoris / URL au client <ListingExplorer>.

import type { Metadata } from "next";
import { getVehicles } from "@/lib/db";
import { ListingExplorer } from "@/components/listing/listing-explorer";

// Lecture de la base à chaque requête : les modifications faites depuis
// /admin (ajout, vente, suppression) sont visibles immédiatement.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos véhicules — Rouvier Automobiles",
  description:
    "Tout notre stock de véhicules d'occasion révisés et garantis 12 mois. Filtrez par marque, énergie, boîte de vitesses et budget.",
};

export default function VehiculesPage() {
  const vehicles = getVehicles().filter((v) => !v.sold);
  return <ListingExplorer vehicles={vehicles} />;
}
