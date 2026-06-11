import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Mentions légales — ${site.name}`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="10 juin 2026">
      <h2>1. Éditeur du site</h2>
      <p>
        Le site <a href={site.url}>{site.domain}</a> est édité par :
      </p>
      <ul>
        <li>
          <b>Dénomination :</b> PB INNOVATIVE SOLUTIONS — « {site.name} » est la marque sous
          laquelle la société exerce son activité de création de sites internet
        </li>
        <li>
          <b>Forme juridique :</b> SARL au capital de 1 000 €
        </li>
        <li>
          <b>SIRET (siège) :</b> 944 239 748 00014 — immatriculée au Registre national des
          entreprises (RNE)
        </li>
        <li>
          <b>TVA intracommunautaire :</b> FR29 944 239 748
        </li>
        <li>
          <b>Siège social :</b> 19 Route de la Barre en Ouche, 27410 Mesnil-en-Ouche, France
        </li>
        <li>
          <b>Email :</b> <a href={`mailto:${site.email}`}>{site.email}</a>
        </li>
        <li>
          <b>Téléphone :</b> {site.phoneDisplay}
        </li>
        <li>
          <b>Directeur de la publication :</b> Patryk Schoebela, gérant
        </li>
      </ul>

      <h2>2. Hébergement</h2>
      <p>
        Le site est hébergé par Hetzner Online GmbH, Industriestraße 25, 91710 Gunzenhausen,
        Allemagne — tél. : +49 (0)9831 505-0 —{" "}
        <a href="https://www.hetzner.com" target="_blank" rel="noopener noreferrer">
          hetzner.com
        </a>
        .
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu de ce site (textes, visuels, logo, charte graphique, code) est la
        propriété exclusive de PB INNOVATIVE SOLUTIONS, sauf mention contraire. Toute reproduction, distribution
        ou utilisation sans autorisation écrite préalable est interdite et constitue une contrefaçon
        au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h2>4. Données personnelles</h2>
      <p>
        Les données transmises via le formulaire de contact sont utilisées uniquement pour répondre
        à votre demande. Pour en savoir plus, consultez notre{" "}
        <a href="/politique-de-confidentialite">politique de confidentialité</a>.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Ce site n&apos;utilise pas de cookies de suivi ni d&apos;outil de mesure d&apos;audience. Seule une
        préférence d&apos;affichage (thème clair/sombre) est enregistrée localement dans votre
        navigateur ; elle ne permet aucun suivi et n&apos;est transmise à personne.
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        {site.name} s&apos;efforce d&apos;assurer l&apos;exactitude des informations publiées mais ne saurait
        être tenu responsable des erreurs, omissions ou indisponibilités du service. Les liens
        externes éventuels n&apos;engagent pas la responsabilité de l&apos;éditeur.
      </p>
    </LegalPage>
  );
}
