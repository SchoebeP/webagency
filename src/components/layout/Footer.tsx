import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";

const SOCIAL_ICONS: Record<keyof typeof site.socials, React.ReactNode> = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.5 8h4V24h-4zM8.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4 0 4.8 2.65 4.8 6.1V24h-4v-7.1c0-1.7 0-3.9-2.4-3.9s-2.77 1.85-2.77 3.77V24h-4z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9c0-.6.4-1 1-1z" />
    </svg>
  ),
};

const SOCIAL_LABELS: Record<keyof typeof site.socials, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
};

export function Footer() {
  // Placeholder "#" profiles (src/lib/site.ts) stay hidden until real URLs exist.
  const socials = (Object.keys(site.socials) as Array<keyof typeof site.socials>).filter(
    (k) => site.socials[k] !== "#",
  );

  return (
    <footer className="wrap">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Création de sites internet et référencement SEO pour les entreprises et indépendants de
            Normandie. Votre site web, votre visibilité, votre croissance.
          </p>
          {socials.length > 0 && (
            <div className="socials">
              {socials.map((k) => (
                <a
                  key={k}
                  href={site.socials[k]}
                  aria-label={SOCIAL_LABELS[k]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {SOCIAL_ICONS[k]}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <Link href="/#services">Sites vitrines</Link>
          <Link href="/#services">E-commerce</Link>
          <Link href="/#services">Référencement SEO</Link>
          <Link href="/#services">SEO local</Link>
          <Link href="/#services">Maintenance</Link>
        </div>
        <div className="footer-col">
          <h4>Entreprise</h4>
          <Link href="/#apropos">À propos</Link>
          <Link href="/#realisations">Réalisations</Link>
          <Link href="/#tarifs">Tarifs</Link>
          <Link href="/#faq">FAQ</Link>
          <Link href="/#contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
          <Link href="/#contact">Devis gratuit</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {site.name} — Tous droits réservés.</span>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/politique-de-confidentialite">Politique de confidentialité</Link>
          <Link href="/cgv">CGV</Link>
        </div>
      </div>
    </footer>
  );
}
