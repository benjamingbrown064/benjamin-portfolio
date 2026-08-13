import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_CARDS } from "@/lib/projects";
import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { Stagger, StaggerItem } from "./Stagger";

const FEATURED_PROJECT_SLUGS = [
  "govscape",
  "warrantyos",
  "wilbolaw",
  "taskbox",
  "zebi",
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
              <TextReveal
                as="h2"
                className="why-head"
                lines={["Recent projects", "from the studio."]}
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="intro">
              A short edit of the products I&apos;ve designed, built and still
              operate today. More in the full portfolio below.
            </p>
          </Reveal>
        </div>

        <Stagger className="work-grid" ariaLabel="Selected work">
          {FEATURED_PROJECTS.map((p) => (
            <StaggerItem key={p.slug}>
              <Link className="work-card" href={`/work/${p.slug}`}>
                {/* Opts this navigation into a view transition (without a
                    <ViewTransition> in the tree, Next hard-cuts). The matching
                    name on the case-study hero is intended to morph the cover
                    into it, but React assigns no view-transition-name on the
                    stable react 19.2 build — verified in Chrome 151, only the
                    root group animates. Left in place so the morph activates
                    if/when it lands; the page crossfade is the working part. */}
                <ViewTransition name={`work-${p.slug}`} share="morph">
                <div className="cover" style={{ background: p.coverBg || undefined }}>
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width: 960px) 548px, (min-width: 700px) 44vw, 100vw"
                    className={p.coverHover ? "cover-img cover-img-default" : "cover-img"}
                    style={{ objectFit: p.coverFit || "cover", objectPosition: p.coverPosition || "center" }}
                  />
                  {p.coverHover && (
                    <Image
                      src={p.coverHover}
                      alt={p.coverHoverAlt || p.coverAlt}
                      fill
                      sizes="(min-width: 960px) 548px, (min-width: 700px) 44vw, 100vw"
                      className="cover-img cover-img-hover"
                      style={{ objectFit: p.coverFit || "cover", objectPosition: p.coverPosition || "center" }}
                    />
                  )}
                  <span className={`tag ${p.status === "beta" ? "beta" : p.status === "dev" ? "dev" : ""}`.trim()}>
                    <span className="d" />
                    {p.statusLabel}
                  </span>
                  <span className="cover-cap">{p.coverCap}</span>
                </div>
                </ViewTransition>
                <h3 className="title">{p.title}</h3>
                <p className="desc">{p.desc}</p>
                <div className="meta">
                  <span>{p.meta}</span>
                  <span className="arrow">→</span>
                </div>
              </Link>
            </StaggerItem>
          ))}

          <StaggerItem>
            <a className="work-card collab-card" href="mailto:hello@benjaminbrown.co?subject=Let%27s%20collaborate">
              <div className="cover collab-cover">
                <span className="collab-heading">Let&apos;s build<br />something.</span>
              </div>
              <h3 className="title">Collaborate together</h3>
              <p className="desc">
                Have a product idea, a team that needs a builder, or a venture that
                needs a technical co-founder? Let&apos;s talk.
              </p>
              <div className="meta">
                <span>Get in touch</span>
                <span className="arrow">→</span>
              </div>
            </a>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}
