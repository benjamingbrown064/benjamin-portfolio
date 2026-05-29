import Image from "next/image";
import Link from "next/link";
import { PROJECT_CARDS } from "@/lib/projects";
import { Reveal } from "./Reveal";

const FEATURED_PROJECT_SLUGS = [
  "warrantyos",
  "taskbox",
  "govscape",
  "hatsafe",
  "dealer-engine",
  "wilbolaw",
];

const FEATURED_PROJECTS = FEATURED_PROJECT_SLUGS.map((slug) =>
  PROJECT_CARDS.find((project) => project.slug === slug),
).filter(Boolean) as typeof PROJECT_CARDS;

export function SelectedWork() {
  return (
    <section className="block-section work-section" id="work">
      <div className="container-x">
        <div className="work-head">
          <Reveal>
            <div>
              <span className="micro">Selected work</span>
              <h2 className="why-head">
                Recent projects
                <br />
                from the studio.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="intro">
              A short edit of the products I&apos;ve designed, built and still
              operate today. More in the full portfolio below.
            </p>
          </Reveal>
        </div>

        <div className="work-grid" aria-label="Selected work">
          {FEATURED_PROJECTS.map((p, index) => (
            <Reveal key={p.slug} delay={index * 0.04}>
              <Link className="work-card" href={`/work/${p.slug}`}>
                <div className="cover" style={{ background: p.coverBg || undefined }}>
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width: 960px) 548px, (min-width: 700px) 44vw, 100vw"
                    className="cover-img"
                    style={{ objectFit: p.coverFit || "cover", objectPosition: p.coverPosition || "center" }}
                  />
                  <span className={`tag ${p.status === "beta" ? "beta" : p.status === "dev" ? "dev" : ""}`.trim()}>
                    <span className="d" />
                    {p.statusLabel}
                  </span>
                  <span className="cover-cap">{p.coverCap}</span>
                </div>
                {p.titleLogo ? (
                  <div className="title-logo-wrap">
                    <Image
                      src={p.titleLogo}
                      alt={p.titleLogoAlt || `${p.title} logo`}
                      width={1280}
                      height={100}
                      className="title-logo"
                    />
                    <span className="sr-only">{p.title}</span>
                  </div>
                ) : (
                  <h3 className="title">{p.title}</h3>
                )}
                <p className="desc">{p.desc}</p>
                <div className="meta">
                  <span>{p.meta}</span>
                  <span className="arrow">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
