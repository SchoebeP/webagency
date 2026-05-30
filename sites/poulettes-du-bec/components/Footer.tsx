import { business, footer } from "@/content";
import { CalendarIcon } from "./icons";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  const buildYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <span className="brand__name">{business.name}</span>
          <p>{footer.blurb}</p>
          <a href="#reserver" className="btn btn--primary" style={{ marginTop: "1.2rem" }}>
            <CalendarIcon size={18} /> Réserver une table
          </a>
        </div>
        <div className="footer-col">
          <h4>Le restaurant</h4>
          <ul>
            {footer.restaurantLinks.map((n) => (
              <li key={n.href}><a href={n.href}>{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h4>Nous contacter</h4>
          <ul>
            <li><a href={business.phoneHref}>{business.phone}</a></li>
            {footer.contact.map((c) => (
              <li key={c}>{c.replace("{village}", business.village)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© <CurrentYear initial={buildYear} /> {business.name} — Tous droits réservés.</span>
        <span className="footer__bottom-links">
          {footer.legalLinks.map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </span>
      </div>
    </footer>
  );
}
