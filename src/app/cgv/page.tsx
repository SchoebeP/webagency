import type { Metadata } from "next";
import { LegalPage, Todo } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Conditions générales de vente — ${site.name}`,
  robots: { index: false, follow: true },
  alternates: { canonical: "/cgv" },
};

export default function Cgv() {
  return (
    <LegalPage title="Conditions générales de vente" updated="10 juin 2026">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent les prestations de services
        proposées sous la marque {site.name} par PB INNOVATIVE SOLUTIONS, SARL au capital de
        1 000 €, SIRET 944 239 748 00014, dont le siège social est situé 19 Route de la Barre en
        Ouche, 27410 Mesnil-en-Ouche (« le Prestataire ») : création de sites internet, refonte,
        référencement naturel (SEO) et maintenance. Toute commande implique l&apos;acceptation sans
        réserve des présentes CGV.
      </p>

      <h2>2. Devis et commande</h2>
      <p>
        Chaque prestation fait l&apos;objet d&apos;un devis gratuit, valable 30 jours à compter de son
        émission. La commande est ferme à réception du devis
        signé accompagné de l&apos;acompte prévu. Les fourchettes affichées par l&apos;estimateur en ligne
        sont indicatives et ne constituent pas une offre contractuelle.
      </p>

      <h2>3. Prix et paiement</h2>
      <p>
        Les prix sont exprimés en euros ; le régime de TVA applicable est précisé sur chaque
        devis. Sauf mention contraire au devis, un acompte de 30 % est dû à la commande, le solde
        à la livraison. Tout retard de paiement entraîne des pénalités au
        taux légal et l&apos;indemnité forfaitaire de recouvrement de 40 € (clients professionnels,
        art. L441-10 du Code de commerce).
      </p>

      <h2>4. Délais et obligations du client</h2>
      <p>
        Les délais indiqués courent à compter de la réception de l&apos;ensemble des éléments à fournir
        par le client (contenus, textes, images, accès). Le client garantit détenir les droits sur
        les éléments transmis. Tout retard de fourniture décale d&apos;autant la livraison.
      </p>

      <h2>5. Livraison et recette</h2>
      <p>
        La mise en ligne vaut livraison. Le client dispose de 15 jours pour signaler des
        anomalies ; passé ce délai, la
        prestation est réputée acceptée. Les corrections d&apos;anomalies sont incluses ; les demandes
        d&apos;évolution font l&apos;objet d&apos;un devis complémentaire.
      </p>

      <h2>6. Propriété intellectuelle</h2>
      <p>
        Après paiement intégral, le client devient titulaire des droits d&apos;exploitation du site
        livré (contenus, design personnalisé). Le Prestataire conserve la propriété de ses outils,
        bibliothèques et savoir-faire, et peut citer la réalisation dans ses références sauf refus
        écrit du client.
      </p>

      <h2>7. Droit de rétractation</h2>
      <p>
        Conformément à l&apos;article L221-28 du Code de la consommation, le droit de rétractation de
        14 jours des clients consommateurs ne s&apos;applique pas aux prestations pleinement exécutées
        avant la fin du délai, avec l&apos;accord préalable exprès du client et sa renonciation
        expresse à son droit de rétractation. À défaut, le client consommateur dispose de 14 jours
        à compter de la conclusion du contrat (réception du devis signé et de l&apos;acompte) pour se
        rétracter.
      </p>

      <h2>8. Responsabilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens. Sa responsabilité est limitée au
        montant effectivement payé pour la prestation concernée et ne couvre pas les dommages
        indirects (perte d&apos;exploitation, de données ou de chiffre d&apos;affaires). Aucun
        positionnement précis dans les moteurs de recherche ne peut être garanti.
      </p>

      <h2>9. Hébergement et maintenance</h2>
      <p>
        Lorsque l&apos;hébergement ou la maintenance sont souscrits, leurs conditions (durée,
        renouvellement, niveau de service) figurent au devis. Le client reste responsable de ses
        contenus publiés.
      </p>

      <h2>10. Droit applicable et litiges</h2>
      <p>
        Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable
        sera recherchée en priorité. Les clients consommateurs peuvent recourir gratuitement à un
        médiateur de la consommation : <Todo>nom et coordonnées du médiateur choisi</Todo>. À
        défaut, les tribunaux compétents sont ceux du ressort du siège du Prestataire.
      </p>

      <p>
        Pour toute question : <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
