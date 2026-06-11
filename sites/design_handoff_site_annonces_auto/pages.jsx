// Pages — Rouvier Automobiles
const { useState, useMemo } = React;

// ===== Page d'accueil =====
function HomePage({ favs, toggleFav, openCar, goListing }) {
  const [q, setQ] = useState({ brand: "", fuel: "", maxPrice: "" });
  const featured = CARS.filter((c) => c.featured).slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="fade-up">
              <div className="hero-eyebrow">Garage indépendant depuis 1987</div>
              <h1>Des occasions révisées, garanties, prêtes à rouler.</h1>
              <p className="hero-lead">
                Chaque véhicule est contrôlé sur 120 points dans notre atelier,
                livré révisé et garanti 12 mois minimum.
              </p>
              <div className="search-card">
                <div className="field">
                  <label className="field-label" htmlFor="search-brand">Marque</label>
                  <div className="select-wrap">
                    <select id="search-brand" className="select" value={q.brand} onChange={(e) => setQ({ ...q, brand: e.target.value })}>
                      <option value="">Toutes</option>
                      {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="search-fuel">Énergie</label>
                  <div className="select-wrap">
                    <select id="search-fuel" className="select" value={q.fuel} onChange={(e) => setQ({ ...q, fuel: e.target.value })}>
                      <option value="">Toutes</option>
                      {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="search-price">Budget max</label>
                  <div className="select-wrap">
                    <select id="search-price" className="select" value={q.maxPrice} onChange={(e) => setQ({ ...q, maxPrice: e.target.value })}>
                      <option value="">Sans limite</option>
                      <option value="15000">15 000 €</option>
                      <option value="20000">20 000 €</option>
                      <option value="25000">25 000 €</option>
                      <option value="30000">30 000 €</option>
                    </select>
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => goListing(q)}>
                  {Icons.search(16)}Rechercher
                </button>
              </div>
            </div>
            <div className="hero-visual fade-up fade-up-1">
              <image-slot id="hero-photo" shape="rounded" radius="18" placeholder="Photo du garage ou d'un véhicule vedette"></image-slot>
              <div className="hero-tag">{Icons.shield(15)}{CARS.length} véhicules en stock</div>
            </div>
          </div>
          <div className="trust-row fade-up fade-up-2">
            <div className="trust-item">
              <div className="trust-icon">{Icons.shield(19)}</div>
              <div><strong>Garantie 12 mois incluse</strong><span>Pièces et main-d'œuvre, extensible à 24 mois.</span></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">{Icons.wrench(19)}</div>
              <div><strong>Révisés en atelier</strong><span>Contrôle 120 points, vidange et CT à jour.</span></div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">{Icons.key(19)}</div>
              <div><strong>Reprise de votre véhicule</strong><span>Estimation gratuite, déduite du prix d'achat.</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>La sélection du moment</h2>
            <button type="button" className="link-arrow" onClick={() => goListing({})}>
              Tout le stock {Icons.arrowRight(15)}
            </button>
          </div>
          <div className="car-grid">
            {featured.map((car, i) => (
              <CarCard
                key={car.id}
                car={car}
                isFav={favs.includes(car.id)}
                onToggleFav={() => toggleFav(car.id)}
                onOpen={() => openCar(car.id)}
                anim={"fade-up-" + (i + 1)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ===== Liste des annonces =====
function ListingPage({ favs, toggleFav, openCar, initialFilters, favsOnly }) {
  const [brand, setBrand] = useState(initialFilters.brand || "");
  const [fuel, setFuel] = useState(initialFilters.fuel || "");
  const [gearbox, setGearbox] = useState("");
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ? Number(initialFilters.maxPrice) : 30000);
  const [sort, setSort] = useState("price-asc");
  const [showFavs, setShowFavs] = useState(!!favsOnly);

  const results = useMemo(() => {
    let list = CARS.filter((c) =>
      (!brand || c.brand === brand) &&
      (!fuel || c.fuel === fuel) &&
      (!gearbox || c.gearbox === gearbox) &&
      c.price <= maxPrice &&
      (!showFavs || favs.includes(c.id))
    );
    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "km-asc": (a, b) => a.km - b.km,
      "year-desc": (a, b) => b.year - a.year
    };
    return [...list].sort(sorters[sort]);
  }, [brand, fuel, gearbox, maxPrice, sort, showFavs, favs]);

  return (
    <main>
      <div className="container">
        <div className="page-head fade-up">
          <h1>{showFavs ? "Vos favoris" : "Nos véhicules"}</h1>
          <p>{showFavs ? "Les véhicules que vous avez mis de côté." : "Tout notre stock, révisé et garanti — mis à jour chaque semaine."}</p>
        </div>
        <div className="filters-bar fade-up fade-up-1">
          <div className="select-wrap">
            <select className="select" aria-label="Marque" value={brand} onChange={(e) => setBrand(e.target.value)}>
              <option value="">Toutes marques</option>
              {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="select-wrap">
            <select className="select" aria-label="Énergie" value={fuel} onChange={(e) => setFuel(e.target.value)}>
              <option value="">Toutes énergies</option>
              {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="select-wrap">
            <select className="select" aria-label="Boîte de vitesses" value={gearbox} onChange={(e) => setGearbox(e.target.value)}>
              <option value="">Toutes boîtes</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>
          </div>
          <label className="price-filter">
            Budget
            <input type="range" min="12000" max="30000" step="500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <strong>{maxPrice >= 30000 ? "30 000 €+" : formatPrice(maxPrice)}</strong>
          </label>
          <button type="button" className={"filter-toggle" + (showFavs ? " active" : "")} onClick={() => setShowFavs(!showFavs)}>
            {Icons.heart(14)}Favoris
          </button>
          <div className="select-wrap">
            <select className="select" aria-label="Tri" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="km-asc">Kilométrage</option>
              <option value="year-desc">Plus récents</option>
            </select>
          </div>
          <div className="results-count">{results.length} véhicule{results.length > 1 ? "s" : ""}</div>
        </div>
        <section style={{ paddingBottom: "60px" }}>
          {results.length === 0 ? (
            <div className="empty-state">
              {showFavs
                ? "Aucun favori pour l'instant — cliquez sur le cœur d'une annonce pour la retrouver ici."
                : "Aucun véhicule ne correspond à ces critères. Élargissez votre budget ou retirez un filtre."}
            </div>
          ) : (
            <div className="car-grid">
              {results.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  isFav={favs.includes(car.id)}
                  onToggleFav={() => toggleFav(car.id)}
                  onOpen={() => openCar(car.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

Object.assign(window, { HomePage, ListingPage });
