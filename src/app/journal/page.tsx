import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JOURNAL, JOURNAL_ORDER } from "@/lib/journal";

export const metadata = {
  title: "Journal — Benjamin Brown",
  description:
    "A daily journal from Benjamin Brown on building products, solving business problems, and shipping AI applications in the real world.",
};

export default function JournalIndexPage() {
  const posts = JOURNAL_ORDER.map((slug) => JOURNAL[slug]);
  const [lead, ...rest] = posts;

  return (
    <>
      <Nav variant="subpage" />
      <main className="journal-page journal-index-page">
        <header className="journal-hero">
          <div className="container-x">
            <Reveal>
              <div className="journal-hero-meta">
                <span className="micro">Journal</span>
                <span className="journal-hero-note">Daily entries from the workshop</span>
              </div>
              <h1 className="journal-title">Field notes, build logs, and daily thinking.</h1>
              <p className="journal-intro">
                A running journal on the problems worth solving, the products in motion,
                and the practical lessons that appear once something real is being built.
              </p>
            </Reveal>
          </div>
        </header>

        <section className="journal-grid-block">
          <div className="container-x">
            <Reveal>
              <Link href={`/journal/${lead.slug}`} className="journal-lead-card">
                <div className="journal-lead-copy">
                  <span className="journal-kicker">{lead.kicker}</span>
                  <h2>{lead.title}</h2>
                  <p>{lead.excerpt}</p>
                  <div className="journal-meta-row">
                    <span>{lead.date}</span>
                    <span>{lead.read}</span>
                  </div>
                </div>
                <div className="journal-lead-image">
                  <Image
                    src={lead.cover}
                    alt={lead.coverAlt}
                    fill
                    sizes="(min-width: 1280px) 620px, 100vw"
                    className="cover-img"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              </Link>
            </Reveal>

            <div className="journal-card-grid">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={index * 0.04}>
                  <Link href={`/journal/${post.slug}`} className="journal-card boutique-card">
                    <div className="journal-card-image">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt}
                        fill
                        sizes="(min-width: 820px) 33vw, 100vw"
                        className="cover-img"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="journal-card-copy">
                      <span className="journal-card-date">{post.date}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="journal-meta-row">
                        <span>{post.category}</span>
                        <span>{post.read}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
