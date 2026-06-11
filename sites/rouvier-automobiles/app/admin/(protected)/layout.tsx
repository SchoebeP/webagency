// Layout-garde de l'espace pro (voir CONTRACTS.md § Auth) : vérification
// cryptographique réelle du jeton côté Node — le middleware ne contrôle que
// la présence du cookie. Fournit aussi le chrome admin (sidebar + contenu) ;
// Header/Footer publics se masquent d'eux-mêmes sur /admin/*.

import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Icon } from "@/components/ui";
import { AdminNav } from "@/components/admin/admin-nav";

export const metadata: Metadata = {
  title: "Espace pro — Rouvier Automobiles",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo-mark">ROUVIER</span>
          <span className="admin-brand-sub">Espace pro</span>
        </div>
        <AdminNav />
        <div className="admin-sidebar-foot">
          <Link href="/" className="admin-nav-link">
            <Icon name="arrowRight" size={16} />
            Voir le site
          </Link>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="admin-nav-link admin-logout">
              <Icon name="arrowLeft" size={16} />
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
