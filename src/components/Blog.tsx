import Image from "next/image";
import { Reveal } from "./Reveal";
import { ScrollTypeOnView } from "./ScrollTypeOnView";

const POSTS = [
  {
    cover: "/assets/blog-1.jpg",
    cat: "Essay",
    title: "Stop calling it an MVP. Call it what it actually is.",
    date: "18 Apr 2026",
    read: "6 min read",
  },
  {
    cover: "/assets/blog-2.jpg",
    cat: "Notes",
    title: "Three things I stopped outsourcing in 2025.",
    date: "11 Apr 2026",
    read: "3 min read",
  },
  {
    cover: "/assets/blog-3.jpg",
    cat: "Field",
    title: "What HatSafe taught me about bad signal.",
    date: "02 Apr 2026",
    read: "4 min read",
  },
];

export function Blog() {
  return (
    <section className="block-section" id="log">
      <div className="container-x">
        <div className="work-head">
          <Reveal>
            <div>
              <span className="micro">Blog</span>
              <ScrollTypeOnView
                as="h2"
                className="why-head"
                text="Latest insights from the build."
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="intro">
              Short notes from the workshop — shipped products, hard-won lessons,
              and occasional opinions.
            </p>
          </Reveal>
        </div>
        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <article className="blog-card">
                <div className="cover">
                  <Image
                    src={p.cover}
                    alt=""
                    fill
                    sizes="(min-width: 820px) 400px, 100vw"
                    className="cover-img"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="cat">{p.cat}</span>
                </div>
                <h4>{p.title}</h4>
                <div className="meta-row">
                  <span>{p.date}</span>
                  <span>{p.read}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
