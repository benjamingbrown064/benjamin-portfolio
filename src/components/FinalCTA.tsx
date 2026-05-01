"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { AutoTypeText } from "./AutoTypeText";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setEmail("");
    setSent(true);
    setTimeout(() => setSent(false), 1800);
  }

  return (
    <section className="finalcta" id="contact">
      <div className="container-x">
        <Reveal>
          <span className="micro">Let&apos;s work together</span>
          <AutoTypeText
            as="h2"
            className="why-head"
            text="Whether you're building a brand, designing a product, or simply want to explore an idea — I'd love to hear from you."
            startWhenInView
            initialDelayMs={120}
            charMs={22}
            rootMargin="0px 0px -6% 0px"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="cta-bits">
            <a className="email-inline" href="mailto:hello@benjaminbrown.co">
              hello@benjaminbrown.co <span>↗</span>
            </a>
            <form className="newsletter" onSubmit={onSubmit} aria-label="Newsletter signup">
              <input
                type="email"
                placeholder="you@company.com"
                aria-label="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">{sent ? "Sent ✓" : "Sign up"}</button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
