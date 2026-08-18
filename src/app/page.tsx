import { Nav } from "@/components/Nav";
import { Identity } from "@/components/Identity";
import { Flag } from "@/components/Flag";
import { SelectedWork } from "@/components/SelectedWork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Identity />
        <Flag />
        <SelectedWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
