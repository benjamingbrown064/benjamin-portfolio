import { ViewTransition } from "react";
import Link from "next/link";
import { PROJECT_CARDS } from "@/lib/projects";
import { ArrowMark, Mark, type MarkName } from "./marks";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";

const FEATURED_PROJECT_SLUGS = [
  "govscape",
  "warrantyos",
  "wilbolaw",
  "taskbox",
  "zebi",
] as const;

const WORK_MARKS: Record<(typeof FEATURED_PROJECT_SLUGS)[number], MarkName> = {
  govscape: "flag",
  warrantyos: "split",
  wilbolaw: "letter",
  taskbox: "tee",
  zebi: "canvas",
};

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
              <span className="micro">Work</span>
              <h2 className="section-title">Selected work. Evidence the product does the job.</h2>
            </div>
          </Reveal>
        </div>

        <Stagger className="work-grid" ariaLabel="Selected work">
          {FEATURED_PROJECTS.map((p) => (
            <StaggerItem key={p.slug}>
              <Link className="work-card" href={`/work/${p.slug}`}>
                <ViewTransition name={`work-${p.slug}`} share="morph">
                  <div className="work-card-inner">
                    <div className="work-card-top">
                      <Mark name={WORK_MARKS[p.slug as keyof typeof WORK_MARKS] ?? "flag"} />
                      <ArrowMark className="work-card-arrow" />
                    </div>
                    <h3 className="title">{p.title}</h3>
                    <p className="desc">{p.desc}</p>
                    <p className="meta">{p.meta}</p>
                  </div>
                </ViewTransition>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
