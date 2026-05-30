/* Formulaire de réservation interactif — validation + confirmation */

function todayISO() {
  const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
function frDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}
const LUNCH = ["12:00", "12:30", "13:00", "13:30", "14:00"];
const TEA   = ["15:00", "15:30", "16:00", "16:30", "17:00"];
const DINNER = ["19:00", "19:30", "20:00", "20:30"];

function slotsForDate(iso) {
  if (!iso) return { closed: false, groups: [] };
  const dow = new Date(iso + "T12:00:00").getDay();
  if (dow === 4) return { closed: true, groups: [] }; // jeudi fermé
  const hasDinner = (dow === 5 || dow === 6); // ven/sam jusqu'à 21h
  const groups = [
    { label: "Déjeuner", times: LUNCH },
    { label: "Salon de thé", times: TEA }
  ];
  if (hasDinner) groups.push({ label: "Dîner", times: DINNER });
  return { closed: false, groups };
}

function Reservation({ phone, phoneHref }) {
  const [form, setForm] = React.useState({ date: "", slot: "", covers: 2, name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const slotInfo = slotsForDate(form.date);

  React.useEffect(() => { if (form.slot && slotInfo.closed) set("slot", ""); }, [form.date]);

  function validate() {
    const e = {};
    if (!form.date) e.date = "Choisissez une date.";
    else if (slotInfo.closed) e.date = "Nous sommes fermés le jeudi — choisissez un autre jour.";
    if (!form.slot && !slotInfo.closed) e.slot = "Sélectionnez un horaire.";
    if (!form.name.trim()) e.name = "Indiquez votre nom.";
    if (!/^[0-9 +().-]{8,}$/.test(form.phone.trim())) e.phone = "Un numéro de téléphone valide est requis.";
    if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) e.email = "Adresse e-mail invalide.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev) {
    ev.preventDefault();
    if (validate()) { setDone(true); window.scrollTo({ top: window.scrollY }); }
    else {
      const first = document.querySelector(".reserve-card .field.invalid input, .reserve-card .field.invalid select");
      first?.focus();
    }
  }

  const coverOptions = [1, 2, 3, 4, 5, 6];

  return (
    <section className="section reserver" id="reserver">
      <div className="wrap">
        <div className="reserver__grid">
          <div className="reserver__aside reveal">
            <span className="eyebrow">Réserver</span>
            <h2 className="section-title">Réservez votre table</h2>
            <p className="lead">
              Une envie de dernière minute ou un repas en famille ? Réservez en quelques secondes,
              ou appelez-nous directement — on adore préparer votre venue.
            </p>
            <a className="reserver__phone" href={phoneHref}>
              <Ico.phone s={26} />
              <span>
                <small>Par téléphone</small>
                <b>{phone}</b>
              </span>
            </a>
            <p style={{ color: "var(--on-dark-soft)", fontSize: ".92rem" }}>
              Réponse de confirmation sous 24 h. Pour les groupes de 8 personnes et plus,
              merci de privilégier l'appel.
            </p>
          </div>

          <div className="reserve-card reveal">
            {done ? (
              <Confirmation form={form} onEdit={() => setDone(false)} />
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-row two">
                  <div className={"field" + (errors.date ? " invalid" : "")}>
                    <label htmlFor="r-date">Date</label>
                    <input id="r-date" type="date" min={todayISO()} value={form.date}
                      onChange={(e) => { set("date", e.target.value); set("slot", ""); }} />
                    {errors.date && <span className="error">{errors.date}</span>}
                  </div>
                  <div className="field">
                    <label>Nombre de couverts</label>
                    <div className="covers" role="group" aria-label="Nombre de couverts">
                      {coverOptions.map((n) => (
                        <button type="button" key={n} className={form.covers === n ? "active" : ""}
                          onClick={() => set("covers", n)} aria-pressed={form.covers === n}>{n}</button>
                      ))}
                      <button type="button" className={"more" + (form.covers > 6 ? " active" : "")}
                        onClick={() => set("covers", form.covers > 6 ? 7 : 7)}>7 +</button>
                    </div>
                  </div>
                </div>

                <div className={"field" + (errors.slot ? " invalid" : "")} style={{ marginTop: "1rem" }}>
                  <label>Horaire {form.date && <span className="hint">· {frDate(form.date)}</span>}</label>
                  {!form.date && <span className="hint">Choisissez d'abord une date.</span>}
                  {form.date && slotInfo.closed && (
                    <span className="error">Fermé le jeudi — merci de choisir un autre jour.</span>
                  )}
                  {form.date && !slotInfo.closed && slotInfo.groups.map((g) => (
                    <div key={g.label} style={{ marginTop: ".55rem" }}>
                      <div style={{ fontSize: ".8rem", fontWeight: 800, color: "var(--ink-soft)", marginBottom: ".35rem", letterSpacing: ".04em" }}>{g.label}</div>
                      <div className="slot-grid">
                        {g.times.map((t) => (
                          <button type="button" key={t} className={form.slot === t ? "active" : ""}
                            onClick={() => set("slot", t)} aria-pressed={form.slot === t}>{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {errors.slot && <span className="error" style={{ marginTop: ".4rem" }}>{errors.slot}</span>}
                </div>

                <div className="form-row two" style={{ marginTop: "1rem" }}>
                  <div className={"field" + (errors.name ? " invalid" : "")}>
                    <label htmlFor="r-name">Votre nom</label>
                    <input id="r-name" type="text" autoComplete="name" placeholder="Ex. Laurence Martin"
                      value={form.name} onChange={(e) => set("name", e.target.value)} />
                    {errors.name && <span className="error">{errors.name}</span>}
                  </div>
                  <div className={"field" + (errors.phone ? " invalid" : "")}>
                    <label htmlFor="r-phone">Téléphone</label>
                    <input id="r-phone" type="tel" autoComplete="tel" placeholder="06 .. .. .. .."
                      value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                  </div>
                </div>

                <div className={"field" + (errors.email ? " invalid" : "")} style={{ marginTop: "1rem" }}>
                  <label htmlFor="r-email">E-mail <span className="hint">· facultatif</span></label>
                  <input id="r-email" type="email" autoComplete="email" placeholder="pour recevoir la confirmation"
                    value={form.email} onChange={(e) => set("email", e.target.value)} />
                  {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="r-msg">Un mot pour nous <span className="hint">· allergies, occasion, terrasse…</span></label>
                  <textarea id="r-msg" value={form.message} onChange={(e) => set("message", e.target.value)}
                    placeholder="Anniversaire, poussette, allergie aux fruits à coque…"></textarea>
                </div>

                <button type="submit" className="btn btn--primary btn--lg btn--block reserve-submit">
                  <Ico.calendar s={20} /> Demander cette réservation
                </button>
                <p className="form-meta">Vous recevrez une confirmation. Aucune carte bancaire demandée.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Confirmation({ form, onEdit }) {
  return (
    <div className="confirm">
      <div className="confirm__check" aria-hidden="true"><Ico.check s={36} /></div>
      <h3>Merci {form.name.split(" ")[0]} !</h3>
      <p style={{ color: "var(--ink-soft)", maxWidth: "34ch" }}>
        Votre demande est bien reçue. Nous vous confirmons la table très vite — à très bientôt
        aux Poulettes du Bec.
      </p>
      <div className="confirm__summary">
        <div className="r"><span>Date</span><b>{frDate(form.date)}</b></div>
        <div className="r"><span>Horaire</span><b>{form.slot || "à confirmer"}</b></div>
        <div className="r"><span>Couverts</span><b>{form.covers === 7 ? "7 et +" : form.covers}</b></div>
        <div className="r"><span>Au nom de</span><b>{form.name}</b></div>
        {form.message && <div className="r"><span>Note</span><b style={{ fontWeight: 600, textAlign: "right" }}>{form.message}</b></div>}
      </div>
      <button type="button" className="btn btn--ghost" onClick={onEdit} style={{ marginTop: ".4rem" }}>Modifier ma demande</button>
    </div>
  );
}

window.Reservation = Reservation;