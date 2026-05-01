"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { ScrollTypeOnView } from "./ScrollTypeOnView";

type Quote = {
  quote: string;
  name: string;
  role: string;
  company: string;
  logo?: string;
};

const QUOTES: Quote[] = [
  {
    quote:
      "Ben walked in on a Monday and we had something in our customers' hands by Friday. That kind of velocity shouldn't be possible.",
    name: "Alex Reinhardt",
    role: "COO, Northfield Motors",
    company: "Northfield Motors",
  },
  {
    quote:
      "We'd spent eighteen months with three agencies and nothing shipped. Ben replaced all of them and we went live in twelve weeks.",
    name: "Priya Shah",
    role: "Founder, Meridian Group",
    company: "Meridian Group",
  },
  {
    quote:
      "The rare operator who can hold the product vision, write the code, and still be on the phone to support at 11pm. A force multiplier.",
    name: "James Ogilvie",
    role: "CEO, Atlas Security",
    company: "Atlas Security",
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
              <ScrollTypeOnView
                as="h2"
                className="why-head"
                text="Success stories from operators I've worked with."
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
