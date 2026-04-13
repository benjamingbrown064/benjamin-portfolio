// Individual blog post — built in Phase 5
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen pt-20">
      <div className="site-container py-32">
        <p className="font-sans text-xs tracking-[0.12em] uppercase text-warm-400">
          Post: {params.slug}
        </p>
      </div>
    </main>
  );
}
