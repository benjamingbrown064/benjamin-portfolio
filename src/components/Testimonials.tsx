"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { LineReveal } from "./LineReveal";

type Quote = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
};

// The three previous entries here (Alex Reinhardt / Northfield Motors, Priya
// Shah / Meridian Group, James Ogilvie / Atlas Security) were unattributable
// and have been removed.
//
// This one is DRAFTED AND AWAITING SIGN-OFF from John Graham. Until Ben
// confirms he has approved the wording, <Testimonials /> stays out of
// src/app/page.tsx — do not publish an attributed quote nobody has agreed to.
const QUOTES: Quote[] = [
  {
    quote:
      "We came to Ben with a process problem, not a software brief. What he built now runs the day — the jobs, the handovers, and all the chasing that used to live in someone's head. It's the first system the team actually opens without being told to.",
    name: "John Graham",
    role: "Managing Director, Redline Specialist Cars",
    company: "Redline Specialist Cars",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const total = QUOTES.length;
  const prev = () => setI((n) => (n - 1 + total) % total);
  const next = () => setI((n) => (n + 1) % total);
  const q = QUOTES[i];

  return (
    <section className="block-section" id="testimonials">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <div>
              <span className="micro">Testimonials</span>
              <LineReveal
                as="h2"
                className="why-head"
                lines={["Success stories from", "operators I’ve", "worked with."]}
              />
              <p className="col-lead">
                A short selection of recent collaborators. Extended references
                available on request.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="test-stage">
              <div className="test-card single" key={i}>
                <div className="logo-slot" aria-hidden={!q.logo}>
                  {q.logo ? (
                    <Image
                      src={q.logo}
                      alt={`${q.company} logo`}
                      width={140}
                      height={40}
                      className="logo-img"
                    />
                  ) : (
                    <span className="logo-placeholder">{q.company}</span>
                  )}
                </div>
                <p className="quote">&ldquo;{q.quote}&rdquo;</p>
                <div className="test-person">
                  <div className="avatar" aria-hidden="true" />
                  <div className="meta">
                    <strong>{q.name}</strong>
                    <span>{q.role}</span>
                  </div>
                </div>
              </div>
              <div className="test-controls">
                <span className="counter">
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="test-buttons">
                  <button
                    type="button"
                    className="rail-btn"
                    onClick={prev}
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="rail-btn"
                    onClick={next}
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
