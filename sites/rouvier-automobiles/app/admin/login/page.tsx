// Connexion espace pro — carte centrée, hors du groupe (protected).
// Déjà connecté ? Redirection directe vers le tableau de bord.

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Icon } from "@/components/ui";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Connexion — Espace pro | Rouvier Automobiles",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="admin-login">
      <div className="admin-login-card fade-up">
        <div className="admin-login-brand">
          <span className="logo-mark">ROUVIER</span>
          <span className="logo-sub">Automobiles</span>
        </div>
        <h1>Espace pro</h1>
        <p className="admin-login-sub">
          Connectez-vous pour gérer vos annonces et vos demandes d&apos;essai.
        </p>
        <LoginForm />
        <Link href="/" className="admin-login-back">
          <Icon name="arrowLeft" size={14} />
          Retour au site
        </Link>
      </div>
    </main>
  );
}
