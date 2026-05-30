/* La carte, Galerie, Avis, Infos & accès */

const CAT_ICON = { "Entrées": "leaf", "Plats": "utensils", "Desserts maison": "star", "Salon de thé": "cup" };

function Carte({ menu, images }) {
  return (
    <section className="section carte" id="carte">
      <div className="wrap" style={{ position: "relative" }}>
        <div className="carte__head reveal">
          <span className="eyebrow">La carte</span>
          <h2 className="section-title">Une cuisine maison, au fil des saisons</h2>
          <p className="lead">
            Des produits frais et locaux, cuisinés chaque jour. La carte change avec le marché et les humeurs
            du potager — voici un aperçu de ce qui pourrait vous attendre à table.
          </p>
        </div>

        <div className="carte__cats">
          {menu.map((c) => {
            const name = CAT_ICON[c.cat] || "utensils";
            const I = Ico[name];
            return (
              <div key={c.cat} className={"menu-cat reveal" + (c.wide ? " menu-cat--wide" : "")}>
                <h3 className="menu-cat__title"><I s={20} /> {c.cat}</h3>
                <div className="menu-list" style={c.wide ? { gridTemplateColumns: "1fr" } : null}>
                  <div className={c.wide ? "menu-list--cols" : ""} style={c.wide ? { display: "grid", gap: "1.15rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" } : null}>
                    {c.items.map((it, i) => (
                      <div className="menu-item" key={i}>
                        <span className="menu-item__name">{it.name}</span>
                        <span className="menu-item__price">{it.price}</span>
                        <span className="menu-item__desc">{it.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="carte__note reveal">
          <span className="menu-around">~ 30 €</span>
          <p style={{ flex: 1, minWidth: 240 }}>
            <b>Le menu complet tourne autour de 30 €.</b> La carte évolue avec les saisons et les arrivages —
            n'hésitez pas à nous appeler pour connaître le plat du jour.
          </p>
          <a href="#reserver" className="btn btn--primary" onClick={(e) => { e.preventDefault(); document.getElementById("reserver")?.scrollIntoView({ behavior: "smooth" }); }}>
            <Ico.calendar s={20} /> Réserver une table
          </a>
        </div>
      </div>
    </section>
  );
}

function Galerie({ images }) {
  const tiles = [
    { key: "spread",  cap: "Les plats à partager",       cls: "wide" },
    { key: "meat",    cap: "Les belles viandes",          cls: "tall" },
    { key: "dessert", cap: "Les desserts maison",         cls: "" },
    { key: "wine",    cap: "Un verre entre amis",         cls: "" },
    { key: "terrace", cap: "La salle & la terrasse",      cls: "tall" },
    { key: "village", cap: "Le Bec-Hellouin",             cls: "wide" },
    { key: "coffee",  cap: "Le salon de thé",             cls: "" },
    { key: "cheese",  cap: "Les produits du coin",        cls: "" }
  ];
  return (
    <section className="section galerie" id="galerie">
      <div className="wrap">
        <span className="eyebrow">En images</span>
        <h2 className="section-title">L'ambiance du Bec, à table</h2>
        <div className="galerie__grid">
          {tiles.map((t) => (
            <figure key={t.key} className={t.cls} tabIndex={0}>
              <Img src={images[t.key]} alt={t.cap} label={t.cap} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <figcaption>{t.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avis({ reviews }) {
  return (
    <section className="section avis" id="avis">
      <div className="wrap">
        <div className="avis__top reveal">
          <div>
            <span className="eyebrow">Ce qu'on en dit</span>
            <h2 className="section-title">Le n°1 des tables du village</h2>
          </div>
          <div className="rating-badge">
            <span className="rating-badge__score">4,7</span>
            <span>
              <Stars n={5} s={17} /><br/>
              <small>sur ~130 avis · Le Bec-Hellouin</small>
            </span>
          </div>
        </div>
        <div className="reviews">
          {reviews.map((r, i) => (
            <article className="review reveal" key={i} style={{ transitionDelay: (i * 80) + "ms" }}>
              <Stars n={r.stars} s={17} />
              <p className="review__text">{r.text}</p>
              <div className="review__who">
                <span className="review__avatar" style={{ background: r.color }}>{r.name.charAt(0)}</span>
                <span>
                  <span className="review__name">{r.name}</span><br/>
                  <span className="review__meta">{r.meta}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Infos({ hours, info, todayDow }) {
  return (
    <section className="section infos" id="infos">
      <div className="wrap">
        <span className="eyebrow">Infos & accès</span>
        <h2 className="section-title">Nous trouver & nous rendre visite</h2>
        <div className="infos__grid">
          <div className="hours-card reveal">
            <h3><Ico.clock s={22} style={{ verticalAlign: "-4px", marginRight: ".4rem", color: "var(--terracotta)" }} />Nos horaires</h3>
            {hours.map((h) => {
              const today = h.dow === todayDow;
              return (
                <div key={h.day} className={"hours-row" + (h.closed ? " closed" : "") + (today ? " is-today" : "")}>
                  <span className="day">{h.day}{today && <span className="today-pill">Aujourd'hui</span>}</span>
                  <span className="time">{h.time}</span>
                </div>
              );
            })}
          </div>

          <div className="infos__detail reveal">
            <div className="info-line">
              <Ico.pin s={24} />
              <span>
                <b>{info.village}</b>
                <span>{info.label}, à deux pas de l'abbaye Notre-Dame.</span>
              </span>
            </div>
            <div className="info-line">
              <Ico.car s={24} />
              <span>
                <b>Accès & stationnement</b>
                <span>Parking du village à proximité. Terrasse aux beaux jours.</span>
              </span>
            </div>
            <div className="info-line">
              <Ico.phone s={24} />
              <span>
                <b>Réservations & renseignements</b>
                <a href={info.phoneHref}>{info.phone}</a>
              </span>
            </div>
            <div className="info-line">
              <Ico.gift s={24} />
              <span>
                <b>Bar, salon de thé & boutique cadeaux</b>
                <span>Une petite sélection de cadeaux et douceurs à emporter.</span>
              </span>
            </div>
            <div className="access-tags">
              {info.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Carte, Galerie, Avis, Infos });