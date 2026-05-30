import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Prestations from "@/components/Prestations";
import Realisations from "@/components/Realisations";
import Pourquoi from "@/components/Pourquoi";
import Avis from "@/components/Avis";
import Zone from "@/components/Zone";
import Devis from "@/components/Devis";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import RevealManager from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <a className="skip" href="#main">Aller au contenu</a>
      <Header />
      <main id="main">
        <Hero />
        <Prestations />
        <Realisations />
        <Pourquoi />
        <Avis />
        <Zone />
        <Devis />
      </main>
      <Footer />
      <StickyCTA />
      <RevealManager />
    </>
  );
}
