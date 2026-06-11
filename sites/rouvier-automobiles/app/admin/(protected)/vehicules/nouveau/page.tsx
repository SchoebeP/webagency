// Création d'un véhicule — même formulaire que l'édition (POST).

import type { Metadata } from "next";
import { VehicleForm } from "@/components/admin/vehicle-form";

export const metadata: Metadata = { title: "Ajouter un véhicule — Espace pro | Rouvier Automobiles" };

export default function NewVehiclePage() {
  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Ajouter un véhicule</h1>
          <p>L&apos;annonce sera visible immédiatement sur le site une fois enregistrée.</p>
        </div>
      </header>
      <VehicleForm />
    </>
  );
}
