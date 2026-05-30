import { hero } from "@/content";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HeroStrip from "@/components/HeroStrip";
import Histoire from "@/components/Histoire";
import Carte from "@/components/Carte";
import Galerie from "@/components/Galerie";
import Avis from "@/components/Avis";
import Infos from "@/components/Infos";
import Reservation from "@/components/Reservation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Page() {
  return (
    <>
      <a className="skip" href="#carte">Aller à la carte</a>
      <Header />
      <main id="main">
        <Hero />
        {hero.showStrip && <HeroStrip />}
        <Histoire />
        <Carte />
        <Galerie />
        <Avis />
        <Infos />
        <Reservation />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
