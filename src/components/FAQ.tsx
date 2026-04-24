"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const FAQS = [
  { q: "Are you a designer, an engineer, or a founder?", a: "All three, in that order by hour count. I sketch, I design, I write the code, and I operate the company. That's the whole point." },
  { q: "What does a typical engagement look like?", a: "A one-week discovery, a 2–4 week design block, then 8–12 weeks of build. Fractional CTO engagements are open-ended, one or two days a week." },
  { q: "Do you take equity?", a: "Occasionally, and only when the cap table, the problem and the people all line up. Cash rates cover the default case." },
  { q: "What stack do you ship in?", a: "TypeScript end-to-end. Next.js on the front, Postgres on the back, Tailwind for styling, whatever LLM best fits the job. Boring where it should be boring." },
  { q: "Will you sign an NDA?", a: "Yes, before any substantive conversation, and as a matter of course with every client." },
  { q: "Can you work with my existing team?", a: "Yes. I embed, I code-review, I pair. Most of my best work has been shoulder-to-shoulder with strong in-house teams." },
  { q: "Where are you based?", a: "Costa Mesa, CA — with deep roots in the UK. Happy to travel for kick-offs. Comfortable in PT, EST, GMT and CET time windows." },
  { q: "What won't you do?", a: "Vanity rebrands, crypto plays I don't believe in, and anything that needs me to pretend a deck is a product." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="block-section" id="faq">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <div>
              <span className="micro">FAQ</span>
              <h2 style={{ marginTop: 20 }}>Wondering how we work?</h2>
              <p className="col-lead">
                Short answers to the questions I get most often. For anything
                else, just email.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="faq-list">
              {FAQS.map((f, i) => {
                const open = openIdx === i;
                const panelId = `faq-panel-${i}`;
                const btnId = `faq-btn-${i}`;
                return (
                  <div key={i} className={`faq-item ${open ? "open" : ""}`}>
                    <button
                      id={btnId}
                      type="button"
                      className="faq-q"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(open ? -1 : i)}
                      style={{ width: "100%", background: "transparent", border: 0, textAlign: "left" }}
                    >
                      <span>{f.q}</span>
                      <span className="plus" aria-hidden="true">+</span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="faq-a"
                    >
                      <div>{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
