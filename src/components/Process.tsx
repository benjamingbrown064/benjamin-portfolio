"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ScrollTypeOnView } from "./ScrollTypeOnView";

const STEPS = [
  { step: "Step 01", name: "Discover", body: "A short, intense scoping week. We lock the problem, the user, the metric and the hard constraints. No proposal bingo — we end with a one-pager and a decision." },
  { step: "Step 02", name: "Define", body: "Information architecture, flows, token system and copy. Everything a designer and engineer need to start without asking twice." },
  { step: "Step 03", name: "Design", body: "High-fidelity product design in one cycle. Real screens in week two, not a mood board in week five. Handed over in a format engineers can ship." },
  { step: "Step 04", name: "Deliver", body: "Build, ship, instrument, iterate. I stay close after launch — observability, hiring the successor engineer — then hand you the keys." },
];

export function Process() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="block-section" id="process">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <div>
              <span className="micro">Process</span>
              <ScrollTypeOnView
                as="h2"
                className="why-head"
                text="Our process is simple, purposeful, and adaptable."
              />
              <p className="col-lead">
                Four steps, two to sixteen weeks, one person accountable. I run
                the whole thing and stay on after launch.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="proc-list">
              {STEPS.map((s, i) => {
                const open = openIdx === i;
                const panelId = `proc-panel-${i}`;
                const btnId = `proc-btn-${i}`;
                return (
                  <div key={s.step} className={`proc-item ${open ? "open" : ""}`}>
                    <button
                      id={btnId}
                      type="button"
                      className="proc-head"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(open ? -1 : i)}
                      style={{ width: "100%", background: "transparent", border: 0, padding: 0, textAlign: "left" }}
                    >
                      <div className="left">
                        <span className="step">{s.step}</span>
                        <span className="name">{s.name}</span>
                      </div>
                      <span className="plus" aria-hidden="true">+</span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="proc-body"
                    >
                      <div className="proc-body-inner">{s.body}</div>
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
