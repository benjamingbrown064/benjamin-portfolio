"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { LineReveal } from "./LineReveal";

type Status = "idle" | "sending" | "done" | "error";

export function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please email instead.");
        setStatus("error");
        return;
      }

      setEmail("");
      setStatus("done");
    } catch {
      setError("Couldn’t reach the server. Please email instead.");
      setStatus("error");
    }
  }

  const buttonLabel =
    status === "sending" ? "Signing up…" : status === "done" ? "Signed up ✓" : "Sign up";

  return (
    <section className="finalcta" id="contact">
      <div className="container-x">
        <Reveal>
          <span className="micro">Let&apos;s work together</span>
          <LineReveal
            as="h2"
            className="why-head"
            lines={[
              "Whether you’re building",
              "a brand, designing a",
              "product, or simply want",
              "to explore an idea —",
              "I’d love to hear from you.",
            ]}
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
                disabled={status === "sending"}
              />
              <button type="submit" disabled={status === "sending"}>
                {buttonLabel}
              </button>
            </form>
            {status === "error" && (
              <p className="newsletter-msg is-error" role="alert">
                {error}
              </p>
            )}
            {status === "done" && (
              <p className="newsletter-msg" role="status">
                You&rsquo;re on the list.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
