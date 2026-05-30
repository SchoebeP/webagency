import { business, footer } from "@/content";
import { Mark } from "./icons";
import CurrentYear from "./CurrentYear";

export default function Footer() {
  const buildYear = new Date().getFullYear();
  return (
    <footer className="site-footer" id="contact">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <div className="brand brand--footer">
            <Mark size={40} color="var(--leaf)" />
            <span className="brand__text">
              <span className="brand__name">{business.name}</span>
              <span className="brand__tag">{business.owner} · {business.trade}</span>
            </span>
          </div>
          <p className="muted-light">{footer.blurb}</p>
        </div>
        <div className="site-footer__col">
          <h4>Contact</h4>
          <a href={"tel:" + business.phoneTel}>{business.phoneDisplay}</a>
          <a href={"mailto:" + business.email}>{business.email}</a>
          <span>{business.address.locality}, {business.address.postalCode} {business.address.region}</span>
        </div>
        <div className="site-footer__col">
          <h4>Prestations</h4>
          {footer.prestationsLinks.map((l) => (
            <a key={l} href="#prestations">{l}</a>
          ))}
        </div>
        <div className="site-footer__cta">
          <h4>{footer.ctaHeading}</h4>
          <a className="btn btn--onforest btn--block" href="#devis">Devis gratuit</a>
          <span className="stars">★★★★★</span>
          <span className="muted-light">{business.rating} / 5 · {business.reviewCount} avis Google</span>
        </div>
      </div>
      <div className="wrap site-footer__legal">
        <span>© <CurrentYear initial={buildYear} /> {business.name} — {business.owner}. Tous droits réservés.</span>
        <span>{footer.legalLine}</span>
      </div>
    </footer>
  );
}
