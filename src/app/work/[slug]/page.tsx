import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, PROJECT_ORDER } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECT_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) return {};
  return {
    title: `${p.title} — Benjamin Brown`,
    description: p.descriptor,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) notFound();

  const currentIdx = PROJECT_ORDER.indexOf(slug);
  const nextSlug = PROJECT_ORDER[(currentIdx + 1) % PROJECT_ORDER.length];
  const next = PROJECTS[nextSlug];

  return (
    <>
      <Nav variant="case-study" />
      <main>
        {/* Page header */}
        <header className="cs-page-header">
          <div className="container-x">
            <Reveal>
              <div className="cs-ph-top">
                <span className="pill ghost">{p.statusLabel}</span>
                <span className="micro">{p.meta}</span>
              </div>
              {p.logo ? (
                <>
                  <div className="cs-brand-logo">
                    <Image
                      src={p.logo}
                      alt={p.logoAlt || `${p.title} logo`}
                      width={1280}
                      height={271}
                      className="cs-brand-logo-img"
                      priority
                    />
                  </div>
                  <h1 className="sr-only">{p.title}</h1>
                </>
              ) : (
                <h1 className="cs-ph-title">{p.title}</h1>
              )}
              <p className="cs-ph-desc">{p.descriptor}</p>
            </Reveal>
            <Reveal delay={0.04}>
              <div className="cs-ph-meta">
                {[
                  { label: "Scope", value: p.pageMeta.scope },
                  { label: "Client", value: p.pageMeta.client },
                  { label: "Duration", value: p.pageMeta.duration },
                  { label: "Year", value: p.pageMeta.year },
                  { label: "Role", value: p.pageMeta.role },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div className="cs-ph-meta-item" key={item.label}>
                      <span className="k">{item.label}</span>
                      <span className="v">{item.value}</span>
                    </div>
                  ))}
              </div>
              <a className="pill dark" href={p.cta.href} target="_blank" rel="noopener noreferrer">
                {p.cta.label} <span className="arr">→</span>
              </a>
            </Reveal>
          </div>
        </header>

        {/* Hero image */}
        <div className="container-x">
          <Reveal delay={0.02}>
            <div className="cs-hero-img">
              <div
                className={`frame${p.heroImageDisplay === "full" ? " frame-full-image" : ""}`}
                style={{ background: p.heroImageBg || p.coverBg || undefined }}
              >
                {p.heroImageDisplay === "full" ? (
                  <Image
                    src={p.heroImage || p.cover}
                    alt={p.heroImageAlt || p.coverAlt}
                    width={p.heroImageWidth || 1600}
                    height={p.heroImageHeight || 900}
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="cs-hero-full-img"
                    priority
                  />
                ) : (
                  <Image
                    src={p.heroImage || p.cover}
                    alt={p.heroImageAlt || p.coverAlt}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    style={{ objectFit: p.heroImageFit || p.coverFit || "cover", objectPosition: p.heroImagePosition || p.coverPosition || "center 35%" }}
                    priority
                  />
                )}
              </div>
              <div className="cap">
                <span>{p.heroCaption[0]}</span>
                <span>{p.heroCaption[1]}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Challenge */}
        <section className="cs-blk">
          <div className="container-x">
            <Reveal>
              <div className="sec-head">
                <span className="micro">Challenge</span>
                <span className="num">01</span>
              </div>
              <div className="cs-two-col">
                <h2 className="cs-statement">{p.challenge.h}</h2>
                <p className="cs-body-copy" style={{ marginTop: 0 }}>
                  {p.challenge.p}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Solution */}
        <section className="cs-blk">
          <div className="container-x">
            {p.detailImages?.length ? (
              <Reveal>
                <div className="cs-detail-grid">
                  {p.detailImages.map((img, i) => (
                    <div className="frame" key={i}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 960px) 560px, 100vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
            <Reveal>
              <div className="sec-head">
                <span className="micro">Solution</span>
                <span className="num">02</span>
              </div>
              <div className="cs-two-col">
                <h2 className="cs-statement">{p.solution.h}</h2>
                <p className="cs-body-copy" style={{ marginTop: 0 }}>
                  {p.solution.p}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stack */}
        <section className="cs-blk">
          <div className="container-x">
            <Reveal>
              <div className="sec-head">
                <span className="micro">Stack</span>
                <span className="num">03</span>
              </div>
              <div className="cs-stack-grid">
                {p.stack.map((cell, i) => (
                  <div className="cs-stack-cell" key={i}>
                    <p className="k">{cell.k}</p>
                    <ul>
                      {cell.v.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process */}
        <section className="cs-blk">
          <div className="container-x">
            {p.processImage ? (
              <Reveal>
                <div className="cs-wide-image frame" style={{ background: p.processImage.bg || undefined }}>
                  <Image
                    src={p.processImage.src}
                    alt={p.processImage.alt}
                    fill
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    style={{ objectFit: p.processImage.fit || "cover", objectPosition: p.processImage.position || "center center" }}
                  />
                </div>
              </Reveal>
            ) : null}
            <Reveal>
              <div className="sec-head">
                <span className="micro">Process</span>
                <span className="num">04</span>
              </div>
              <div className="cs-proc-list">
                {p.process.map((step, i) => (
                  <div className="cs-proc-row" key={i}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pname">{step.n}</span>
                    <p className="desc">{step.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Result */}
        <section className="cs-blk">
          <div className="container-x">
            <Reveal>
              <div className="sec-head">
                <span className="micro">Result</span>
                <span className="num">05</span>
              </div>
              <div className="cs-two-col">
                <h2 className="cs-statement">{p.result.h}</h2>
                <p className="cs-body-copy" style={{ marginTop: 0 }}>
                  {p.result.p}
                </p>
              </div>
              <div className="cs-metrics">
                {p.metrics.map((m, i) => (
                  <div className="cs-metric" key={i}>
                    <div className="n">{m.n}</div>
                    <div className="lbl">{m.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Commercials */}
        <section className="cs-blk">
          <div className="container-x">
            <Reveal>
              <div className="sec-head">
                <span className="micro">Commercials</span>
                <span className="num">06</span>
              </div>
              <div className="cs-comm">
                {p.engagementPhases?.length ? (
                  <div className="cs-phase-grid">
                    {p.engagementPhases.map((phase) => (
                      <article className="cs-phase-card" key={phase.n}>
                        <div className="frame cs-phase-image">
                          <Image
                            src={phase.image.src}
                            alt={phase.image.alt}
                            fill
                            sizes="(min-width: 1200px) 360px, (min-width: 768px) 33vw, 100vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <span className="phase-n">{phase.n}</span>
                        <h3>{phase.title}</h3>
                        <p>{phase.body}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
                <p className="copy">{p.commercialsCopy}</p>
                <div className="card">
                  <p className="k">Commercial breakdown</p>
                  <dl>
                    <div className="row">
                      <dt>Model</dt>
                      <dd>{p.comm.model}</dd>
                    </div>
                    <div className="row">
                      <dt>Status</dt>
                      <dd>{p.comm.status}</dd>
                    </div>
                    <div className="row">
                      <dt>Revenue</dt>
                      <dd>{p.comm.revenue}</dd>
                    </div>
                    <div className="row">
                      <dt>Ownership</dt>
                      <dd>{p.comm.ownership}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pull quote */}
        <div className="cs-pull">
          <div className="container-x">
            <Reveal>
              <blockquote>{p.quote}</blockquote>
              <p className="attr">
                <strong>{p.attr.name}</strong> · {p.attr.role}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Next project */}
        <div className="cs-next">
          <div className="container-x">
            <Reveal>
              <Link href={`/work/${next.slug}`}>
                <div className="lead">
                  <span className="micro">Next project</span>
                  <span style={{ fontSize: 13, color: "var(--mute)" }}>
                    {next.meta}
                  </span>
                </div>
                <div className="big">
                  <span className="pname">{next.title}</span>
                  <span className="arrow">→</span>
                </div>
                <p className="descriptor">{next.desc}</p>
              </Link>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
