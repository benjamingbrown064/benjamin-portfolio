import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { JOURNAL, JOURNAL_ORDER } from "@/lib/journal";

export function generateStaticParams() {
  return JOURNAL_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL[slug as keyof typeof JOURNAL];
  if (!post) return {};

  return {
    title: `${post.title} — Benjamin Brown`,
    description: post.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = JOURNAL[slug as keyof typeof JOURNAL];
  if (!post) notFound();

  const currentIdx = JOURNAL_ORDER.indexOf(post.slug as (typeof JOURNAL_ORDER)[number]);
  const nextSlug = JOURNAL_ORDER[(currentIdx + 1) % JOURNAL_ORDER.length];
  const nextPost = JOURNAL[nextSlug];

  return (
    <>
      <Nav variant="subpage" />
      <main className="journal-page article-page">
        <header className="journal-article-head">
          <div className="container-x">
            <Reveal>
              <div className="journal-article-meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
                <span>{post.read}</span>
              </div>
              <h1 className="journal-article-title">{post.title}</h1>
              <p className="journal-article-intro">{post.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="container-x">
          <Reveal delay={0.02}>
            <div className="journal-hero-image">
              <Image
                src={post.cover}
                alt={post.coverAlt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="cover-img"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </Reveal>
        </div>

        <article className="journal-article-body">
          <div className="container-x">
            <Reveal>
              <div className="journal-body-grid">
                <aside className="journal-side-note">
                  <span className="micro">Entry note</span>
                  <p>{post.metaNote}</p>
                </aside>
                <div className="journal-copy-flow">
                  <p className="journal-opening">{post.intro}</p>
                  {post.sections.map((section, index) => (
                    <section key={section.heading} className="journal-copy-section">
                      <div className="journal-section-index">0{index + 1}</div>
                      <div>
                        <h2>{section.heading}</h2>
                        <p>{section.body}</p>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </article>

        <section className="journal-next-block">
          <div className="container-x">
            <Reveal>
              <Link href={`/journal/${nextPost.slug}`} className="journal-next-link">
                <span className="micro">Next entry</span>
                <div className="journal-next-row">
                  <h2>{nextPost.title}</h2>
                  <span className="journal-next-arrow">→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
