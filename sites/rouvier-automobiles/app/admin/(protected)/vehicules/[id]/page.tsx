// Édition d'un véhicule existant — même formulaire que la création (PUT).

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVehicle } from "@/lib/db";
import { VehicleForm } from "@/components/admin/vehicle-form";

export const metadata: Metadata = { title: "Modifier un véhicule — Espace pro | Rouvier Automobiles" };
export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = getVehicle(id);
  if (!vehicle) notFound();

  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Modifier le véhicule</h1>
          <p>
            {vehicle.brand} {vehicle.model} — {vehicle.version}
          </p>
        </div>
      </header>
      <VehicleForm vehicle={vehicle} />
    </>
  );
}
