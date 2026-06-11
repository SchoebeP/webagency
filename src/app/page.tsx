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
import { faqs } from "@/lib/data";

// FAQPage structured data — mirrors the visible FAQ section 1:1 (a Google
// requirement) and makes the homepage eligible for FAQ rich results.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static data; "<" is escaped so the payload can never close the tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
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
