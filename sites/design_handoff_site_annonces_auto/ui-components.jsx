// Composants partagés — Rouvier Automobiles

// ===== Icônes (SVG inline, 1.8px stroke) =====
function Ico({ d, size = 16, fill = "none", ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {d}
    </svg>
  );
}
const Icons = {
  heart: (s) => <Ico size={s} d={<path d="M12 21s-7.5-4.6-9.8-9.2C.7 8.6 2.7 5 6.2 5c2 0 3.5 1.1 4.3 2.6h3c.8-1.5 2.3-2.6 4.3-2.6 3.5 0 5.5 3.6 4 6.8C19.5 16.4 12 21 12 21z" transform="scale(0.92) translate(1,0.5)" />} />,
  gauge: (s) => <Ico size={s} d={<g><path d="M12 4a9 9 0 0 1 9 9" /><path d="M3 13a9 9 0 0 1 9-9" /><path d="M12 13l4-3.5" /><circle cx="12" cy="13" r="1.6" /><path d="M5 19h14" /></g>} />,
  calendar: (s) => <Ico size={s} d={<g><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></g>} />,
  fuel: (s) => <Ico size={s} d={<g><path d="M5 20V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v14" /><path d="M3.5 20h12" /><path d="M14 10h2.2a1.8 1.8 0 0 1 1.8 1.8V17a1.5 1.5 0 0 0 3 0v-6.6L19 8" /><path d="M7.5 7.5h4v3.5h-4z" /></g>} />,
  gearbox: (s) => <Ico size={s} d={<g><circle cx="6" cy="5.5" r="1.8" /><circle cx="12" cy="5.5" r="1.8" /><circle cx="18" cy="5.5" r="1.8" /><circle cx="6" cy="18.5" r="1.8" /><circle cx="12" cy="18.5" r="1.8" /><path d="M6 7.3v9.4M12 7.3v9.4M18 7.3V12H6" /></g>} />,
  power: (s) => <Ico size={s} d={<path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12l1-8z" />} />,
  search: (s) => <Ico size={s} d={<g><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></g>} />,
  arrowRight: (s) => <Ico size={s} d={<g><path d="M4 12h15M13 6l6 6-6 6" /></g>} />,
  arrowLeft: (s) => <Ico size={s} d={<g><path d="M20 12H5M11 6l-6 6 6 6" /></g>} />,
  phone: (s) => <Ico size={s} d={<path d="M5 4h4l1.8 4.5-2.3 1.7a12 12 0 0 0 5.3 5.3l1.7-2.3L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />} />,
  check: (s) => <Ico size={s} d={<path d="M4.5 12.5l5 5 10-11" />} />,
  shield: (s) => <Ico size={s} d={<g><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6L12 3z" /><path d="M8.8 12l2.3 2.3 4.2-4.6" /></g>} />,
  wrench: (s) => <Ico size={s} d={<path d="M14.2 6.3a4.5 4.5 0 0 1 5.6-5L16.5 4.6l2.9 2.9 3.3-3.3a4.5 4.5 0 0 1-5 5.6L8.4 19a2.1 2.1 0 0 1-3-3l8.8-9.7z" transform="scale(0.92) translate(1,1)" />} />,
  key: (s) => <Ico size={s} d={<g><circle cx="7.5" cy="15.5" r="4" /><path d="M10.5 12.5L20 3M16 7l3 3M13 10l2 2" /></g>} />,
  doors: (s) => <Ico size={s} d={<g><path d="M4 12L10.5 4.5H20v15H4V12z" /><path d="M4 12h16M15 8.5h1.5" /></g>} />,
  palette: (s) => <Ico size={s} d={<g><path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3c.8 1-.1 2.7-2.5 2.7z" /><circle cx="7.8" cy="11" r="0.8" /><circle cx="11" cy="7.8" r="0.8" /><circle cx="15.5" cy="9" r="0.8" /></g>} />
};

// ===== Badge =====
function CarBadge({ label, accent }) {
  return <span className={"badge" + (accent ? " badge-accent" : "")}>{label}</span>;
}

// ===== Bouton favori =====
function FavBtn({ active, onToggle, staticPos }) {
  return (
    <button
      type="button"
      className={"fav-btn" + (active ? " is-fav" : "") + (staticPos ? " fav-btn-static" : "")}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      title={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      {Icons.heart(18)}
    </button>
  );
}

// ===== Carte véhicule =====
function CarCard({ car, isFav, onToggleFav, onOpen, anim }) {
  return (
    <article className={"car-card" + (anim ? " fade-up " + anim : "")} onClick={onOpen}>
      <div className="car-card-photo">
        <image-slot
          id={"photo-" + car.id}
          shape="rect"
          placeholder={car.brand + " " + car.model + " — glissez une photo"}
        ></image-slot>
        <div className="car-card-badges">
          {car.badges.slice(0, 2).map((b) => (
            <CarBadge key={b} label={b} accent={b === "Électrique" || b === "Première main"} />
          ))}
        </div>
        <FavBtn active={isFav} onToggle={onToggleFav} />
      </div>
      <div className="car-card-body">
        <div>
          <div className="car-card-title">{car.brand} {car.model}</div>
        </div>
        <div className="car-card-version">{car.version}</div>
        <div className="car-card-specs">
          <span className="spec-chip">{Icons.calendar(13)}{car.year}</span>
          <span className="spec-chip">{Icons.gauge(13)}{formatKm(car.km)}</span>
          <span className="spec-chip">{Icons.fuel(13)}{car.fuel}</span>
          <span className="spec-chip">{Icons.gearbox(13)}{car.gearbox}</span>
        </div>
        <div className="car-card-foot">
          <div className="car-price">{formatPrice(car.price)}</div>
          <div className="car-price-monthly">dès {car.monthly} €/mois</div>
        </div>
      </div>
    </article>
  );
}

// ===== En-tête =====
function Header({ page, favCount, onNav }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo" onClick={() => onNav("home")}>
          <span className="logo-mark">ROUVIER</span>
          <span className="logo-sub">Automobiles</span>
        </div>
        <nav className="nav">
          <button type="button" className={"nav-link hide-mobile" + (page === "home" ? " active" : "")} onClick={() => onNav("home")}>Accueil</button>
          <button type="button" className={"nav-link" + (page === "listing" ? " active" : "")} onClick={() => onNav("listing")}>Nos véhicules</button>
          <button type="button" className={"nav-link" + (page === "favs" ? " active" : "")} onClick={() => onNav("favs")}>
            Favoris{favCount > 0 ? <span className="nav-fav-count">{favCount}</span> : null}
          </button>
        </nav>
        <button type="button" className="header-phone" title="Appeler le garage">
          {Icons.phone(15)}<span>02 41 56 80 80</span>
        </button>
      </div>
    </header>
  );
}

// ===== Pied de page =====
function Footer() {
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
            <span>contact@rouvier-auto.fr</span>
          </div>
        </div>
        <div className="footer-note">© 2026 Rouvier Automobiles — Garage indépendant. Prix TTC, hors frais d'immatriculation.</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Icons, CarBadge, FavBtn, CarCard, Header, Footer });
