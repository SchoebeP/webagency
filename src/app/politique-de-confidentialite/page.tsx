import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${site.name}`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/politique-de-confidentialite" },
};

export default function PolitiqueConfidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="10 juin 2026">
      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est PB INNOVATIVE SOLUTIONS (SARL, SIREN
        944 239 748), 19 Route de la Barre en Ouche, 27410 Mesnil-en-Ouche, représentée par son
        gérant, Patryk Schoebela, joignable à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>Les seules données personnelles collectées sont celles que vous saisissez volontairement
        dans le formulaire de contact ou l&apos;estimateur de devis :</p>
      <ul>
        <li>nom et prénom ;</li>
        <li>adresse email ;</li>
        <li>numéro de téléphone (facultatif) ;</li>
        <li>contenu de votre message (type de projet, besoin décrit).</li>
      </ul>
      <p>
        Aucune donnée de navigation n&apos;est collectée : pas de cookies de suivi, pas d&apos;outil de
        mesure d&apos;audience, pas de profilage.
      </p>

      <h2>3. Finalité et base légale</h2>
      <p>
        Ces données servent exclusivement à répondre à votre demande de contact ou de devis
        (mesures précontractuelles, article 6.1.b du RGPD). Elles ne sont ni revendues, ni
        utilisées à des fins publicitaires.
      </p>

      <h2>4. Destinataires et sous-traitants</h2>
      <p>
        Les messages du formulaire sont acheminés par email via le service{" "}
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a>{" "}
        (Resend, Inc., États-Unis), qui agit en qualité de sous-traitant au sens du RGPD et
        s&apos;appuie sur des clauses contractuelles types pour les transferts hors UE. Le site est
        hébergé par Hetzner Online GmbH (Allemagne), au sein de l&apos;Union européenne.
      </p>

      <h2>5. Durée de conservation</h2>
      <p>
        Les demandes reçues sont conservées au maximum 3 ans après le dernier contact, puis
        supprimées.
      </p>

      <h2>6. Vos droits</h2>
      <p>
        Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit
        d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de portabilité
        sur vos données.
        Pour l&apos;exercer, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez
        également introduire une réclamation auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
      </p>

      <h2>7. Sécurité</h2>
      <p>
        Les échanges avec le site sont chiffrés (HTTPS) et les données ne sont accessibles
        qu&apos;à l&apos;éditeur du site et aux sous-traitants mentionnés à la section 4, dans la
        stricte mesure nécessaire à l&apos;acheminement des messages. Un champ anti-robot invisible
        filtre les soumissions automatisées du formulaire.
      </p>
    </LegalPage>
  );
}
