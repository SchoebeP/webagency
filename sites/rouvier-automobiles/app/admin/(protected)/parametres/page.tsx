// Paramètres — compte connecté + changement de mot de passe.

import type { Metadata } from "next";
import { getAdmin } from "@/lib/db";
import { PasswordForm } from "@/components/admin/password-form";

export const metadata: Metadata = { title: "Paramètres — Espace pro | Rouvier Automobiles" };
export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const admin = getAdmin();

  return (
    <>
      <header className="admin-page-head">
        <div>
          <h1>Paramètres</h1>
          <p>Compte et sécurité de l&apos;espace pro.</p>
        </div>
      </header>

      <section className="admin-card admin-card-narrow">
        <h2>Compte</h2>
        <p className="admin-empty">
          Connecté en tant que <strong>{admin.email}</strong>.
        </p>
      </section>

      <section className="admin-card admin-card-narrow">
        <h2>Changer le mot de passe</h2>
        <PasswordForm />
      </section>
    </>
  );
}
