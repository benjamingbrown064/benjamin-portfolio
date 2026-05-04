import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SelectedWork } from "@/components/SelectedWork";
import { WhyMe } from "@/components/WhyMe";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { PlaybookBanner } from "@/components/PlaybookBanner";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <SelectedWork />
        <WhyMe />
        <Services />
        <Process />
        <PlaybookBanner />
        <Testimonials />
        <Blog />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
