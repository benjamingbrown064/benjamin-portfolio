// Blog listing — built in Phase 5
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <div className="site-container py-32">
          <p className="tag-label mb-4">007 /BLOG</p>
          <h1 className="font-serif font-black text-display-md uppercase tracking-tightest">
            The Build Log
          </h1>
          <p className="mt-6 font-sans text-sm text-warm-500">
            Blog system built in Phase 5.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
