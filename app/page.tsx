import { About } from "@/components/About";
import { Care } from "@/components/Care";
import { Clinic } from "@/components/Clinic";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { InstagramSection } from "@/components/InstagramSection";
import { Reviews } from "@/components/Reviews";
import { Thread } from "@/components/Thread";
import { Trauma } from "@/components/Trauma";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { faq, site } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo" className="relative">
        <Thread />
        <Hero />
        <About />
        <Trauma />
        <Care />
        <Clinic />
        {site.showReviews && <Reviews />}
        <InstagramSection />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
