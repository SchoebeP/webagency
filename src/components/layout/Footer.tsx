import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Création de sites internet et référencement SEO pour les entreprises et indépendants de
            Normandie. Votre site web, votre visibilité, votre croissance.
          </p>
          <div className="socials">
            <a href={site.socials.linkedin} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4 0 4.8 2.65 4.8 6.1V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.77 1.85-2.77 3.77V24h-4z" />
              </svg>
            </a>
            <a href={site.socials.instagram} aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={site.socials.facebook} aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <a href="#services">Sites vitrines</a>
          <a href="#services">E-commerce</a>
          <a href="#services">Référencement SEO</a>
          <a href="#services">SEO local</a>
          <a href="#services">Maintenance</a>
        </div>
        <div className="footer-col">
          <h4>Entreprise</h4>
          <a href="#apropos">À propos</a>
          <a href="#realisations">Réalisations</a>
          <a href="#tarifs">Tarifs</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <a href="#contact">Devis gratuit</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 {site.name} — Tous droits réservés.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
          <a href="#">CGV</a>
        </div>
      </div>
    </footer>
  );
}
