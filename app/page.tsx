import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Sections built in Phase 2 */}
        <div className="site-container py-32 text-center">
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-warm-400 mb-4">
            Phase 1 Scaffold
          </p>
          <h1 className="font-serif font-black text-display-lg uppercase tracking-tightest">
            ONE BEYOND<span className="text-[#FF4500]">.</span>
          </h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
