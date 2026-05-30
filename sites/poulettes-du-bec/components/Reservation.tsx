"use client";

import { useEffect, useState } from "react";
import { business, hours, reserver } from "@/content";
import { CalendarIcon, CheckIcon, PhoneIcon } from "./icons";

// Disponibilités issues d'une source unique éditable (content.ts → reserver.slots).
const SLOTS = reserver.slots;
const dinnerDows = SLOTS.dinnerDows as readonly number[];
const closedDayLabel = hours.find((h) => h.dow === SLOTS.closedDow)?.day.toLowerCase() ?? "ce jour-là";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}
function frDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}

function slotsForDate(iso: string): { closed: boolean; groups: { label: string; times: readonly string[] }[] } {
  if (!iso) return { closed: false, groups: [] };
  const dow = new Date(iso + "T12:00:00").getDay();
  if (dow === SLOTS.closedDow) return { closed: true, groups: [] };
  const groups: { label: string; times: readonly string[] }[] = [
    { label: "Déjeuner", times: SLOTS.lunch },
    { label: "Salon de thé", times: SLOTS.tea },
  ];
  if (dinnerDows.includes(dow)) groups.push({ label: "Dîner", times: SLOTS.dinner });
  return { closed: false, groups };
}

type Form = { date: string; slot: string; covers: number; name: string; phone: string; email: string; message: string };

function Confirmation({ form, onEdit }: { form: Form; onEdit: () => void }) {
  return (
    <div className="confirm">
      <div className="confirm__check" aria-hidden="true"><CheckIcon size={36} /></div>
      <h3>Merci {form.name.split(" ")[0]} !</h3>
      <p style={{ color: "var(--ink-soft)", maxWidth: "34ch" }}>
        Votre demande est bien reçue. Nous vous confirmons la table très vite — à très bientôt aux {business.shortName}.
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

export default function Reservation() {
  const [form, setForm] = useState<Form>({ date: "", slot: "", covers: 2, name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [done, setDone] = useState(false);
  // Plancher de date calculé après montage (jour du visiteur) — sinon un build
  // statique figerait le « min » au jour de génération.
  const [minDate, setMinDate] = useState("");
  useEffect(() => setMinDate(todayISO()), []);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const slotInfo = slotsForDate(form.date);

  useEffect(() => {
    if (form.slot && slotInfo.closed) set("slot", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.date]);

  function validate() {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.date) e.date = "Choisissez une date.";
    else if (form.date < todayISO()) e.date = "Choisissez une date à venir.";
    else if (slotInfo.closed) e.date = `Nous sommes fermés le ${closedDayLabel} — choisissez un autre jour.`;
    if (!form.slot && !slotInfo.closed) e.slot = "Sélectionnez un horaire.";
    if (!form.name.trim()) e.name = "Indiquez votre nom.";
    if (!/^[0-9 +().-]{8,}$/.test(form.phone.trim())) e.phone = "Un numéro de téléphone valide est requis.";
    if (form.email.trim() && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) e.email = "Adresse e-mail invalide.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) {
      // TODO (par client) : brancher l'envoi réel ici — ex. fetch("/api/reservation", …)
      // ou un service no-code (Formspree, Web3Forms…). Si vous ajoutez une vraie
      // route serveur, retirez `output: "export"` de next.config.mjs.
      setDone(true);
    } else {
      const first = document.querySelector<HTMLElement>(".reserve-card .field.invalid input, .reserve-card .field.invalid select");
      first?.focus();
    }
  }

  const coverOptions = [1, 2, 3, 4, 5, 6];

  return (
    <section className="section reserver" id="reserver">
      <div className="wrap">
        <div className="reserver__grid">
          <div className="reserver__aside reveal">
            <span className="eyebrow">{reserver.eyebrow}</span>
            <h2 className="section-title">{reserver.title}</h2>
            <p className="lead">{reserver.lead}</p>
            <a className="reserver__phone" href={business.phoneHref}>
              <PhoneIcon size={26} />
              <span>
                <small>{reserver.phonePrompt}</small>
                <b>{business.phone}</b>
              </span>
            </a>
            <p style={{ color: "var(--on-dark-soft)", fontSize: ".92rem" }}>{reserver.note}</p>
          </div>

          <div className="reserve-card reveal">
            {done ? (
              <Confirmation form={form} onEdit={() => setDone(false)} />
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-row two">
                  <div className={"field" + (errors.date ? " invalid" : "")}>
                    <label htmlFor="r-date">Date</label>
                    <input id="r-date" type="date" min={minDate} value={form.date}
                      aria-invalid={!!errors.date} aria-describedby={errors.date ? "err-date" : undefined}
                      onChange={(e) => { set("date", e.target.value); set("slot", ""); }} />
                    {errors.date && <span className="error" id="err-date" role="alert">{errors.date}</span>}
                  </div>
                  <div className="field">
                    <label>Nombre de couverts</label>
                    <div className="covers" role="group" aria-label="Nombre de couverts">
                      {coverOptions.map((n) => (
                        <button type="button" key={n} className={form.covers === n ? "active" : ""}
                          onClick={() => set("covers", n)} aria-pressed={form.covers === n}>{n}</button>
                      ))}
                      <button type="button" className={"more" + (form.covers > 6 ? " active" : "")}
                        aria-pressed={form.covers > 6} onClick={() => set("covers", 7)}>7 +</button>
                    </div>
                  </div>
                </div>

                <div className={"field" + (errors.slot ? " invalid" : "")} style={{ marginTop: "1rem" }}>
                  <label>Horaire {form.date && <span className="hint">· {frDate(form.date)}</span>}</label>
                  {!form.date && <span className="hint">Choisissez d'abord une date.</span>}
                  {form.date && slotInfo.closed && (
                    <span className="error" role="alert">Fermé le {closedDayLabel} — merci de choisir un autre jour.</span>
                  )}
                  {form.date && !slotInfo.closed && slotInfo.groups.map((g) => (
                    <div key={g.label} className="slot-group">
                      <div className="slot-group__label">{g.label}</div>
                      <div className="slot-grid">
                        {g.times.map((t) => (
                          <button type="button" key={t} className={form.slot === t ? "active" : ""}
                            onClick={() => set("slot", t)} aria-pressed={form.slot === t}>{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {errors.slot && <span className="error" role="alert" style={{ marginTop: ".4rem" }}>{errors.slot}</span>}
                </div>

                <div className="form-row two" style={{ marginTop: "1rem" }}>
                  <div className={"field" + (errors.name ? " invalid" : "")}>
                    <label htmlFor="r-name">Votre nom</label>
                    <input id="r-name" type="text" autoComplete="name" placeholder="Ex. Laurence Martin"
                      aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined}
                      value={form.name} onChange={(e) => set("name", e.target.value)} />
                    {errors.name && <span className="error" id="err-name" role="alert">{errors.name}</span>}
                  </div>
                  <div className={"field" + (errors.phone ? " invalid" : "")}>
                    <label htmlFor="r-phone">Téléphone</label>
                    <input id="r-phone" type="tel" autoComplete="tel" placeholder="06 .. .. .. .."
                      aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined}
                      value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    {errors.phone && <span className="error" id="err-phone" role="alert">{errors.phone}</span>}
                  </div>
                </div>

                <div className={"field" + (errors.email ? " invalid" : "")} style={{ marginTop: "1rem" }}>
                  <label htmlFor="r-email">E-mail <span className="hint">· facultatif</span></label>
                  <input id="r-email" type="email" autoComplete="email" placeholder="pour recevoir la confirmation"
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
                    value={form.email} onChange={(e) => set("email", e.target.value)} />
                  {errors.email && <span className="error" id="err-email" role="alert">{errors.email}</span>}
                </div>

                <div className="field" style={{ marginTop: "1rem" }}>
                  <label htmlFor="r-msg">Un mot pour nous <span className="hint">· allergies, occasion, terrasse…</span></label>
                  <textarea id="r-msg" value={form.message} onChange={(e) => set("message", e.target.value)}
                    placeholder="Anniversaire, poussette, allergie aux fruits à coque…" />
                </div>

                <button type="submit" className="btn btn--primary btn--lg btn--block reserve-submit">
                  <CalendarIcon size={20} /> Demander cette réservation
                </button>
                <p className="form-meta">{reserver.meta}</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
