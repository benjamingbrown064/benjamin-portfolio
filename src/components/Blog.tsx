import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { LineReveal } from "./LineReveal";
import { Stagger, StaggerItem } from "./Stagger";
import { JOURNAL, JOURNAL_ORDER } from "@/lib/journal";

const POSTS = JOURNAL_ORDER.slice(0, 3).map((slug) => JOURNAL[slug]);

export function Blog() {
  return (
    <section className="block-section" id="log">
      <div className="container-x">
        <div className="work-head">
          <Reveal>
            <div>
              <span className="micro">Journal</span>
              <LineReveal
                as="h2"
                className="why-head"
                lines={["A daily record", "from the workshop."]}
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="intro">
              A boutique journal of products in motion, business problems worth
              solving, and the daily thinking behind the work.
            </p>
          </Reveal>
        </div>
        <Stagger className="blog-grid">
          {POSTS.map((p) => (
            <StaggerItem key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="blog-card">
                <div className="cover">
                  <Image
                    src={p.cover}
                    alt={p.coverAlt}
                    fill
                    sizes="(min-width: 820px) 400px, 100vw"
                    className="cover-img"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="cat">{p.category}</span>
                </div>
                <h4>{p.title}</h4>
                <div className="meta-row">
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
