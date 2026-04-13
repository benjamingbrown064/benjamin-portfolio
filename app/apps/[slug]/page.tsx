// App case study pages — built in Phase 4
export default function AppPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen pt-20">
      <div className="site-container py-32">
        <p className="font-sans text-xs tracking-[0.12em] uppercase text-warm-400">
          App: {params.slug}
        </p>
      </div>
    </main>
  );
}
