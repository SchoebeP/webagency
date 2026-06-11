"use client";

// Pied de page — README §1.5. Client uniquement pour se masquer sur /admin/*.

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <strong>Rouvier Automobiles</strong>
            <span>14 route de Cholet</span>
            <span>49300 Sebastopol-sur-Loire</span>
          </div>
          <div className="footer-col">
            <strong>Horaires</strong>
            <span>Lun – Ven : 8h30 – 19h</span>
            <span>Samedi : 9h – 18h</span>
          </div>
          <div className="footer-col">
            <strong>Contact</strong>
            <span>02 41 56 80 80</span>
            {/* <span> englobant : sinon l'ancre s'étire sur toute la colonne
                (flex) et la bordure pointillée dépasse le texte. */}
            <span>
              <a href="mailto:contact@rouvier-automobiles.fr" className="footer-pro">
                contact@rouvier-automobiles.fr
              </a>
            </span>
          </div>
        </div>
        <div className="footer-note">
          © {new Date().getFullYear()} Rouvier Automobiles — Garage indépendant. Prix TTC, hors frais
          d'immatriculation.{" "}
          {/* prefetch={false} : précharger /admin depuis chaque page publique
              déclenche la redirection login en RSC (bruit console, inutile). */}
          <Link href="/admin" prefetch={false} className="footer-pro">Espace pro</Link>{" · "}<Link href="/mentions-legales" className="footer-pro">Mentions légales</Link>
        </div>
      </div>
    </footer>
  );
}
