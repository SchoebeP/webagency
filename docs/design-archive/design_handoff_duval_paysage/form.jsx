/* global React */
const { useState: useStateF, useRef: useRefF } = React;

const WORK_TYPES = ["Élagage / abattage", "Taille de haies", "Tonte / débroussaillage",
  "Clôtures & portails", "Maçonnerie paysagère", "Entretien régulier", "Plusieurs / autre"];

function Field({ label, required, children, hint }) {
  return (
    <label className="field">
      <span className="field__label">{label}{required && <em> *</em>}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}

function Devis() {
  const [data, setData] = useStateF({ nom: "", tel: "", type: "", msg: "" });
  const [photo, setPhoto] = useStateF(null);
  const [errors, setErrors] = useStateF({});
  const [sent, setSent] = useStateF(false);
  const fileRef = useRefF(null);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.nom.trim()) e.nom = "Indiquez votre nom.";
    const tel = data.tel.replace(/[^0-9+]/g, "");
    if (!tel) e.tel = "Indiquez un téléphone.";
    else if (tel.replace(/\D/g, "").length < 9) e.tel = "Numéro trop court.";
    if (!data.type) e.type = "Choisissez un type de travaux.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (validate()) setSent(true);
  };

  const bodyText =
    `Bonjour,\n\nJe souhaite un devis pour : ${data.type || "(à préciser)"}.\n` +
    `Nom : ${data.nom}\nTéléphone : ${data.tel}\n\n${data.msg || ""}`.trim();
  const mailto = `mailto:${window.EMAIL}?subject=${encodeURIComponent("Demande de devis — " + (data.type || "travaux de jardin"))}&body=${encodeURIComponent(bodyText)}`;
  const sms = `sms:${window.PHONE_TEL}?&body=${encodeURIComponent(bodyText)}`;

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setPhoto({ name: f.name, url: URL.createObjectURL(f) });
  };

  return (
    <section className="section section--forest devis" id="devis">
      <div className="wrap devis-grid">
        <div className="devis-intro reveal">
          <span className="eyebrow eyebrow--light">Devis gratuit</span>
          <h2 className="h-section">Décrivez votre projet,<br/>on vous rappelle vite</h2>
          <p className="lead lead--light">Quelques infos suffisent. Hervé vous recontacte sous 48 h pour convenir d'une visite — sans engagement.</p>
          <ul className="devis-assure">
            <li><span>✓</span> Réponse sous 48 h</li>
            <li><span>✓</span> Déplacement & devis gratuits</li>
            <li><span>✓</span> Débris évacués, chantier propre</li>
          </ul>
          <a href={"tel:" + window.PHONE_TEL} className="devis-call">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
            <span><small>Ou appelez directement</small><strong>{window.PHONE_DISPLAY}</strong></span>
          </a>
        </div>

        <div className="devis-card card reveal">
          {!sent ? (
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <Field label="Votre nom" required>
                  <input className={"input" + (errors.nom ? " input--err" : "")} type="text" value={data.nom} onChange={set("nom")} placeholder="Nom et prénom" autoComplete="name" />
                  {errors.nom && <span className="err-msg">{errors.nom}</span>}
                </Field>
                <Field label="Téléphone" required>
                  <input className={"input" + (errors.tel ? " input--err" : "")} type="tel" value={data.tel} onChange={set("tel")} placeholder="06 12 34 56 78" autoComplete="tel" inputMode="tel" />
                  {errors.tel && <span className="err-msg">{errors.tel}</span>}
                </Field>
              </div>

              <Field label="Type de travaux" required>
                <div className="chips" role="group" aria-label="Type de travaux">
                  {WORK_TYPES.map((w) => (
                    <button type="button" key={w}
                      className={"chip" + (data.type === w ? " chip--on" : "")}
                      onClick={() => setData((d) => ({ ...d, type: w }))}>{w}</button>
                  ))}
                </div>
                {errors.type && <span className="err-msg">{errors.type}</span>}
              </Field>

              <Field label="Votre message" hint="Décrivez le chantier, l'adresse approximative, vos disponibilités…">
                <textarea className="input input--area" rows="4" value={data.msg} onChange={set("msg")} placeholder="Ex : taille d'une haie de 20 m + élagage d'un pommier au Perrey."></textarea>
              </Field>

              <div className="photo-field">
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
                <button type="button" className="photo-btn" onClick={() => fileRef.current && fileRef.current.click()}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"/><circle cx="12" cy="13" r="3.5"/></svg>
                  {photo ? "Changer la photo" : "Ajouter une photo (optionnel)"}
                </button>
                {photo && (
                  <span className="photo-thumb">
                    <img src={photo.url} alt="" />
                    <em>{photo.name}</em>
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn--lg btn--block">Envoyer ma demande de devis</button>
              <p className="form-legal">En envoyant, vous acceptez d'être recontacté par Duval Paysage. Aucune donnée n'est partagée à des tiers.</p>
            </form>
          ) : (
            <div className="devis-success">
              <span className="devis-success__check">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              </span>
              <h3>Merci {data.nom.split(" ")[0]} !</h3>
              <p>Votre demande pour <strong>« {data.type} »</strong> est bien notée. Hervé vous recontacte au <strong>{data.tel}</strong> sous 48 h.</p>
              <p className="muted devis-success__hint">Pour aller plus vite, transmettez-la aussi directement :</p>
              <div className="devis-success__actions">
                <a className="btn" href={mailto}>Envoyer par e-mail</a>
                <a className="btn btn--phone" href={sms}>Envoyer par SMS</a>
              </div>
              <button className="link-btn" onClick={() => setSent(false)}>← Modifier ma demande</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Devis });
