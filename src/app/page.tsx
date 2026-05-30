import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Works } from "@/components/sections/Works";
import { Pricing } from "@/components/sections/Pricing";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Works />
      <Pricing />
      <QuoteWizard />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
