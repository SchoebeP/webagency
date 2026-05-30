"use client";

import { useRef, useState } from "react";
import { business, devis } from "@/content";
import { CameraIcon, CheckIcon, PhoneIcon } from "./icons";

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: React.ReactNode; hint?: string }) {
  return (
    <label className="field">
      <span className="field__label">{label}{required && <em> *</em>}</span>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </label>
  );
}

type FormData = { nom: string; tel: string; type: string; msg: string };

export default function Devis() {
  const [data, setData] = useState<FormData>({ nom: "", tel: "", type: "", msg: "" });
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.nom.trim()) e.nom = "Indiquez votre nom.";
    const tel = data.tel.replace(/[^0-9+]/g, "");
    if (!tel) e.tel = "Indiquez un téléphone.";
    else if (tel.replace(/\D/g, "").length < 9) e.tel = "Numéro trop court.";
    if (!data.type) e.type = "Choisissez un type de travaux.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    // TODO (par client) : brancher l'envoi réel ici — ex. :
    //   await fetch("/api/devis", { method: "POST", body: JSON.stringify(data) })
    //   ou un service no-code (Formspree, Web3Forms…).
    // Les liens e-mail / SMS ci-dessous restent un repli pratique.
    setSent(true);
  };

  const bodyText = (
    `Bonjour,\n\nJe souhaite un devis pour : ${data.type || "(à préciser)"}.\n` +
    `Nom : ${data.nom}\nTéléphone : ${data.tel}\n\n${data.msg || ""}`
  ).trim();
  const mailto = `mailto:${business.email}?subject=${encodeURIComponent("Demande de devis — " + (data.type || "travaux de jardin"))}&body=${encodeURIComponent(bodyText)}`;
  const sms = `sms:${business.phoneTel}?&body=${encodeURIComponent(bodyText)}`;

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) setPhoto({ name: f.name, url: URL.createObjectURL(f) });
  };

  return (
    <section className="section section--forest devis" id="devis">
      <div className="wrap devis-grid">
        <div className="devis-intro reveal">
          <span className="eyebrow eyebrow--light">{devis.eyebrow}</span>
          <h2 className="h-section">{devis.title[0]}<br />{devis.title[1]}</h2>
          <p className="lead lead--light">{devis.lead}</p>
          <ul className="devis-assure">
            {devis.assurances.map((a) => (
              <li key={a}><span>✓</span> {a}</li>
            ))}
          </ul>
          <a href={"tel:" + business.phoneTel} className="devis-call">
            <PhoneIcon size={22} strokeWidth={1.9} />
            <span><small>{devis.callPrompt}</small><strong>{business.phoneDisplay}</strong></span>
          </a>
        </div>

        <div className="devis-card card reveal">
          {!sent ? (
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <Field label="Votre nom" required>
                  <input className={"input" + (errors.nom ? " input--err" : "")} type="text" value={data.nom} onChange={set("nom")} placeholder="Nom et prénom" autoComplete="name" aria-invalid={!!errors.nom} aria-describedby={errors.nom ? "err-nom" : undefined} />
                  {errors.nom && <span className="err-msg" id="err-nom" role="alert">{errors.nom}</span>}
                </Field>
                <Field label="Téléphone" required>
                  <input className={"input" + (errors.tel ? " input--err" : "")} type="tel" value={data.tel} onChange={set("tel")} placeholder="06 12 34 56 78" autoComplete="tel" inputMode="tel" aria-invalid={!!errors.tel} aria-describedby={errors.tel ? "err-tel" : undefined} />
                  {errors.tel && <span className="err-msg" id="err-tel" role="alert">{errors.tel}</span>}
                </Field>
              </div>

              <Field label="Type de travaux" required>
                <div className="chips" role="group" aria-label="Type de travaux">
                  {devis.workTypes.map((w) => (
                    <button type="button" key={w} className={"chip" + (data.type === w ? " chip--on" : "")} aria-pressed={data.type === w} onClick={() => setData((d) => ({ ...d, type: w }))}>
                      {w}
                    </button>
                  ))}
                </div>
                {errors.type && <span className="err-msg" role="alert">{errors.type}</span>}
              </Field>

              <Field label="Votre message" hint="Décrivez le chantier, l'adresse approximative, vos disponibilités…">
                <textarea className="input input--area" rows={4} value={data.msg} onChange={set("msg")} placeholder="Ex : taille d'une haie de 20 m + élagage d'un pommier au Perrey." />
              </Field>

              <div className="photo-field">
                <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
                <button type="button" className="photo-btn" onClick={() => fileRef.current?.click()}>
                  <CameraIcon size={22} />
                  {photo ? "Changer la photo" : "Ajouter une photo (optionnel)"}
                </button>
                {photo && (
                  <span className="photo-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt="" />
                    <em>{photo.name}</em>
                  </span>
                )}
              </div>

              <button type="submit" className="btn btn--lg btn--block">Envoyer ma demande de devis</button>
              <p className="form-legal">{devis.legal}</p>
            </form>
          ) : (
            <div className="devis-success">
              <span className="devis-success__check">
                <CheckIcon size={40} strokeWidth={2.4} />
              </span>
              <h3>Merci {data.nom.split(" ")[0]} !</h3>
              <p>Votre demande pour <strong>« {data.type} »</strong> est bien notée. {business.owner.split(" ")[0]} vous recontacte au <strong>{data.tel}</strong> sous 48 h.</p>
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
