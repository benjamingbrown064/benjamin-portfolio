"use client";

import { useState } from "react";
import { LetterMark } from "./marks";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "done" | "error";

export function Contact() {
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
    status === "sending" ? "Sending…" : status === "done" ? "Sent" : "Send";

  return (
    <section className="talk" id="talk">
      <div className="container-x">
        <Reveal>
          <span className="micro">Talk</span>
          <h2 className="section-title">A way to talk.</h2>
          <a className="talk-email" href="mailto:hello@benjaminbrown.co">
            <LetterMark className="mark-sm" />
            hello@benjaminbrown.co
          </a>
        </Reveal>
        <Reveal delay={0.05}>
          <form className="newsletter" onSubmit={onSubmit} aria-label="Notes signup">
            <input
              type="email"
              placeholder="Notes, if you want them"
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
              You’re on the list.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
