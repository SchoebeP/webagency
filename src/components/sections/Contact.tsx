"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useQuotePrefill } from "@/components/providers/QuotePrefillContext";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

type Errors = { name: boolean; email: boolean; project: boolean; message: boolean };
const NO_ERRORS: Errors = { name: false, email: false, project: false, message: false };

const PROJECT_OPTIONS = [
  "Site vitrine",
  "Site e-commerce",
  "Landing page",
  "Référencement SEO",
  "Refonte de site",
  "Maintenance",
  "Autre",
];

export function Contact() {
  const { prefill } = useQuotePrefill();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-spam; humans never fill this
  const [errors, setErrors] = useState<Errors>(NO_ERRORS);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Quote wizard handed us a prefill: fill the form, scroll here, focus name.
  useEffect(() => {
    if (!prefill) return;
    setProject(prefill.projectValue);
    setMessage(prefill.message);
    setSubmitted(false);
    setErrors(NO_ERRORS); // the prefill satisfies project/message; drop stale flags
    setSendError(null);
    const contact = document.getElementById("contact");
    if (contact) window.scrollTo({ top: contact.offsetTop - 70, behavior: "smooth" });
    const t = window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
    return () => window.clearTimeout(t);
  }, [prefill]);

  // Announce the confirmation and give keyboard users a sane focus position.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot.trim() !== "" || sending) return; // bot or double-click: silently drop

    const next: Errors = {
      name: !(name.trim().length > 1),
      email: !isEmail(email.trim()),
      project: project.trim() === "",
      message: !(message.trim().length > 4),
    };
    setErrors(next);
    if (next.name || next.email || next.project || next.message) {
      // Move focus (and the screen-reader cursor) to the first invalid field.
      const first = (["name", "email", "project", "message"] as const).find((f) => next[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, project, message, company: honeypot }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "L'envoi a échoué. Réessayez dans un instant.");
      }
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "L'envoi a échoué. Réessayez dans un instant.");
    } finally {
      setSending(false);
    }
  }

  const clearError = (field: keyof Errors) => setErrors((prev) => ({ ...prev, [field]: false }));

  return (
    <section id="contact" className="wrap">
      <SectionHead
        eyebrow="Contact"
        title={
          <>
            Parlons de votre <GradientText>projet</GradientText>
          </>
        }
        description="Décrivez-moi votre besoin : je vous réponds sous 24h avec un premier conseil et un devis gratuit."
      />

      <div className="contact-grid">
        <div className="form-panel glass reveal">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className={cn("field", errors.name && "error")}>
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jean Dupont"
                    required
                    ref={nameRef}
                    value={name}
                    aria-invalid={errors.name || undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    onChange={(e) => {
                      setName(e.target.value);
                      clearError("name");
                    }}
                  />
                  <span className="err-msg" id="name-error">Merci d&apos;indiquer votre nom.</span>
                </div>
                <div className={cn("field", errors.email && "error")}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jean@entreprise.fr"
                    required
                    value={email}
                    aria-invalid={errors.email || undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError("email");
                    }}
                  />
                  <span className="err-msg" id="email-error">Email invalide.</span>
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="06 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span className="err-msg"></span>
                </div>
                <div className={cn("field", errors.project && "error")}>
                  <label htmlFor="project">Type de projet</label>
                  <select
                    id="project"
                    name="project"
                    required
                    value={project}
                    aria-invalid={errors.project || undefined}
                    aria-describedby={errors.project ? "project-error" : undefined}
                    onChange={(e) => {
                      setProject(e.target.value);
                      clearError("project");
                    }}
                  >
                    <option value="">Choisir…</option>
                    {PROJECT_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <span className="err-msg" id="project-error">Merci de choisir un type de projet.</span>
                </div>
              </div>

              <div className={cn("field", errors.message && "error")}>
                <label htmlFor="message">Votre message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Parlez-moi de votre activité, vos objectifs, vos délais…"
                  required
                  value={message}
                  aria-invalid={errors.message || undefined}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    clearError("message");
                  }}
                />
                <span className="err-msg" id="message-error">Merci de décrire votre projet.</span>
              </div>

              {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                <label htmlFor="company">Ne pas remplir</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {sendError && (
                <p role="alert" className="send-error">
                  {sendError} <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              )}
              {/* aria-busy instead of disabled: keeps focus on the button during the
                  send (handleSubmit already guards re-entry) and the label legible. */}
              <Button type="submit" variant="primary" aria-busy={sending} style={{ width: "100%" }}>
                <Icon name="send" strokeWidth={2.2} />
                {sending ? "Envoi en cours…" : "Envoyer ma demande"}
              </Button>
            </form>
          ) : (
            <div className="form-success show" role="status">
              <div className="ok-ico">
                <Icon name="check" strokeWidth={2.6} />
              </div>
              <h3 ref={successRef} tabIndex={-1} style={{ fontSize: "1.4rem", marginBottom: 10, outline: "none" }}>
                Merci, votre demande est envoyée !
              </h3>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>
                Je vous recontacte sous 24h avec un premier conseil et votre devis gratuit.
              </p>
            </div>
          )}
        </div>

        <div className="contact-info">
          <div className="info-card glass reveal d1">
            <span className="ico">
              <Icon name="mail" strokeWidth={2} />
            </span>
            <div>
              <h3>Email</h3>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="info-card glass reveal d2">
            <span className="ico">
              <Icon name="phone" strokeWidth={2} />
            </span>
            <div>
              <h3>Téléphone</h3>
              <a href={site.phoneHref}>{site.phoneDisplay}</a>
            </div>
          </div>
          <div className="info-card glass reveal d3">
            <span className="ico">
              <Icon name="mapPin" strokeWidth={2} />
            </span>
            <div>
              <h3>Zone d&apos;intervention</h3>
              <p>Normandie et toute la France à distance.</p>
              <div className="zone-tags">
                {site.zones.map((z) => (
                  <span key={z}>{z}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
