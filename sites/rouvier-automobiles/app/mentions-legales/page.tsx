// Mentions légales — page statique. Site fictif de démonstration : les
// informations d'identification réelles sont marquées [À COMPLÉTER] et
// devront être renseignées avant toute mise en production pour un client.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — Rouvier Automobiles",
  description:
    "Mentions légales du site Rouvier Automobiles : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  // Page utilitaire sans valeur de recherche : on la laisse hors index.
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <div className="container">
        <div className="page-head fade-up">
          <h1>Mentions légales</h1>
          <p>Informations légales et protection des données — Rouvier Automobiles.</p>
        </div>

        <div className="fade-up fade-up-1" style={{ maxWidth: "780px", paddingBottom: "70px" }}>
          <section className="detail-card detail-section">
            <h2>Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>[À COMPLÉTER : raison sociale]</strong>,{" "}
              [À COMPLÉTER : forme juridique et capital social], immatriculée au registre du
              commerce et des sociétés sous le numéro SIREN <strong>[À COMPLÉTER]</strong>, dont le
              siège social est situé <strong>[À COMPLÉTER : adresse réelle]</strong>.
            </p>
            <p style={{ marginTop: "12px" }}>
              Directeur de la publication : <strong>[À COMPLÉTER]</strong>.
              <br />
              Contact : 02 41 56 80 80 — contact@rouvier-automobiles.fr.
            </p>
          </section>

          <section className="detail-card detail-section">
            <h2>Hébergeur</h2>
            <p>
              Le site est hébergé par <strong>[À COMPLÉTER : nom de l&apos;hébergeur]</strong>,{" "}
              [À COMPLÉTER : adresse de l&apos;hébergeur], [À COMPLÉTER : téléphone de
              l&apos;hébergeur].
            </p>
          </section>

          <section className="detail-card detail-section">
            <h2>Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des éléments du site (textes, photographies des véhicules, logos,
              charte graphique, structure) est la propriété exclusive de l&apos;éditeur ou de ses
              partenaires. Toute reproduction, représentation ou réutilisation, totale ou
              partielle, sans autorisation écrite préalable est interdite. Les marques et modèles
              de véhicules cités appartiennent à leurs constructeurs respectifs et ne sont
              mentionnés qu&apos;à des fins de description des annonces.
            </p>
          </section>

          <section className="detail-card detail-section">
            <h2>Données personnelles</h2>
            <p>
              Le formulaire de demande d&apos;essai présent sur les fiches véhicules collecte les
              données suivantes : nom, numéro de téléphone et message libre (créneau souhaité
              inclus).
            </p>
            <ul style={{ color: "var(--muted)", margin: "12px 0 0", paddingLeft: "20px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "var(--text)" }}>Finalité</strong> : organisation d&apos;un
                essai du véhicule concerné et prise de contact par le garage. Ces données ne sont
                ni cédées ni utilisées à des fins de prospection.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "var(--text)" }}>Durée de conservation</strong> : 3 ans
                maximum à compter du dernier contact, puis suppression.
              </li>
              <li>
                <strong style={{ color: "var(--text)" }}>Vos droits</strong> : conformément au
                RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
                de limitation et d&apos;opposition sur vos données. Pour l&apos;exercer, écrivez à
                contact@rouvier-automobiles.fr. Vous pouvez également saisir la CNIL
                (www.cnil.fr).
              </li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              Le site n&apos;utilise aucun cookie de suivi ni outil de mesure d&apos;audience. Vos
              préférences de thème (clair / sombre) et vos favoris sont stockés localement dans
              votre navigateur uniquement et ne sont jamais transmis à nos serveurs.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
