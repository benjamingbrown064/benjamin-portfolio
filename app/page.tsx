import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PersonJsonLd } from "@/components/ui/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FeaturedApps } from "@/components/sections/FeaturedApps";
import { WhySection } from "@/components/sections/WhySection";
import { AllAppsGrid } from "@/components/sections/AllAppsGrid";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <FeaturedApps />
        <WhySection />
        <AllAppsGrid />
        <ServicesSection />
        <ProcessSection />
        <BlogSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
