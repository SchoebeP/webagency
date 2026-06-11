// Fiche véhicule — Rouvier Automobiles
const detailReact = React;

function ContactCard({ car }) {
  const [sent, setSent] = detailReact.useState(false);
  const [form, setForm] = detailReact.useState({ name: "", phone: "", slot: "", msg: "" });
  const canSend = form.name.trim() !== "" && form.phone.trim() !== "";

  if (sent) {
    return (
      <div className="detail-card">
        <div className="form-success">
          <div className="form-success-icon">{Icons.check(24)}</div>
          <strong>Demande envoyée</strong>
          <span>Merci {form.name.split(" ")[0]} — nous vous rappelons sous 2 h ouvrées pour confirmer votre rendez-vous.</span>
          <button type="button" className="btn btn-ghost" onClick={() => setSent(false)} style={{ marginTop: "8px" }}>
            Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-card">
      <form
        className="contact-form"
        onSubmit={(e) => { e.preventDefault(); if (canSend) setSent(true); }}
      >
        <h3>Essayer ce véhicule</h3>
        <p className="contact-form-sub">Réponse sous 2 h ouvrées — essai sans engagement.</p>
        <div className="form-row">
          <div className="field">
            <label className="field-label" htmlFor="ct-name">Nom</label>
            <input id="ct-name" className="input" type="text" placeholder="Votre nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="ct-phone">Téléphone</label>
            <input id="ct-phone" className="input" type="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="ct-slot">Créneau souhaité</label>
          <div className="select-wrap">
            <select id="ct-slot" className="select" value={form.slot} onChange={(e) => setForm({ ...form, slot: e.target.value })}>
              <option value="">Indifférent</option>
              <option>En semaine — matin</option>
              <option>En semaine — après-midi</option>
              <option>Samedi</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="ct-msg">Message (optionnel)</label>
          <textarea id="ct-msg" className="input" rows="3" placeholder={"Question sur la " + car.brand + " " + car.model + "…"} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={!canSend} style={{ opacity: canSend ? 1 : 0.45 }}>
          {Icons.calendar(16)}Demander un essai
        </button>
        <button type="button" className="btn btn-ghost btn-block">
          {Icons.phone(15)}02 41 56 80 80
        </button>
      </form>
    </div>
  );
}

function DetailPage({ carId, favs, toggleFav, goBack }) {
  const car = CARS.find((c) => c.id === carId) || CARS[0];

  const specs = [
    { icon: "calendar", label: "Année", value: String(car.year) },
    { icon: "gauge", label: "Kilométrage", value: formatKm(car.km) },
    { icon: "fuel", label: "Énergie", value: car.fuel },
    { icon: "gearbox", label: "Boîte", value: car.gearbox },
    { icon: "power", label: "Puissance", value: car.power },
    { icon: "doors", label: "Portes", value: String(car.doors) },
    { icon: "palette", label: "Couleur", value: car.color },
    { icon: "shield", label: "Garantie", value: "12 mois" }
  ];

  return (
    <main>
      <div className="container">
        <button type="button" className="back-link" onClick={goBack}>
          {Icons.arrowLeft(15)}Retour aux annonces
        </button>
        <div className="detail-layout">
          <div className="fade-up">
            <div className="gallery-main">
              <image-slot
                id={"photo-" + car.id}
                shape="rounded"
                radius="14"
                placeholder={car.brand + " " + car.model + " — photo principale"}
              ></image-slot>
            </div>
            <div className="gallery-thumbs">
              <image-slot id={"photo-" + car.id + "-2"} shape="rounded" radius="10" placeholder="Intérieur"></image-slot>
              <image-slot id={"photo-" + car.id + "-3"} shape="rounded" radius="10" placeholder="3/4 arrière"></image-slot>
              <image-slot id={"photo-" + car.id + "-4"} shape="rounded" radius="10" placeholder="Détail"></image-slot>
            </div>

            <div className="spec-grid">
              {specs.map((s) => (
                <div className="spec-cell" key={s.label}>
                  <span className="spec-icon">{Icons[s.icon](17)}</span>
                  <small>{s.label}</small>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h2>Description</h2>
              <p>{car.description}</p>
            </div>

            <div className="detail-section">
              <h2>Équipements principaux</h2>
              <div className="equip-grid">
                {car.equipment.map((eq) => (
                  <div className="equip-item" key={eq}>{Icons.check(15)}{eq}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="detail-side fade-up fade-up-1">
            <div className="detail-card">
              <div className="detail-title-row">
                <h1>{car.brand} {car.model}</h1>
                <FavBtn active={favs.includes(car.id)} onToggle={() => toggleFav(car.id)} staticPos={true} />
              </div>
              <div className="detail-version">{car.version}</div>
              <div className="detail-badges">
                {car.badges.map((b) => (
                  <CarBadge key={b} label={b} accent={b === "Électrique" || b === "Première main"} />
                ))}
              </div>
              <div className="detail-price-row">
                <div className="detail-price">{formatPrice(car.price)}</div>
                <div className="detail-price-note">ou dès {car.monthly} €/mois*</div>
              </div>
              <div className="detail-price-note">*Financement sur 60 mois, sous réserve d'acceptation du dossier.</div>
            </div>
            <ContactCard car={car} />
          </div>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { DetailPage });
