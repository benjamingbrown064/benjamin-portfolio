import Image from "next/image";
import Link from "next/link";
import { PROJECT_CARDS } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function SelectedWork() {
  return (
    <section className="block-section" id="work">
      <div className="container-x">
        <div className="work-head">
          <Reveal>
            <div>
              <span className="micro">Selected work</span>
              <h2 style={{ marginTop: 20 }}>
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
        <div className="work-grid">
          {PROJECT_CARDS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.04}>
              <Link className="work-card" href={`/work/${p.slug}`}>
                <div className="cover">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width: 820px) 620px, 100vw"
                    className="cover-img"
                    style={{ objectFit: "cover" }}
                  />
                  <span className={`tag ${p.status === "beta" ? "beta" : p.status === "dev" ? "dev" : ""}`.trim()}>
                    <span className="d" />
                    {p.statusLabel}
                  </span>
                </div>
                <h3 className="title">{p.title}</h3>
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
