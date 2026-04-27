import { Reveal } from "./Reveal";

export function Pricing() {
  return (
    <section className="block-section" id="pricing">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <div>
              <span className="micro">Pricing</span>
              <h2 className="why-head">Two ways to&nbsp;work together.</h2>
              <p className="col-lead">
                Retainer for ongoing build and operate work, fixed-scope for
                defined projects. Every engagement starts with a one-week
                discovery.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="pricing-grid">
              <div className="price-card">
                <div className="price-top">
                  <div>
                    <div className="kind">Project-based</div>
                    <div className="rate">From £18,000</div>
                  </div>
                  <span className="badge">Fixed</span>
                </div>
                <div>
                  <div className="headline">
                    A defined problem, a fixed scope, a shipped outcome.
                  </div>
                  <p className="desc">
                    Best when the brief is clear, the timeline is tight, and
                    you need someone to own delivery end-to-end.
                  </p>
                </div>
                <ul>
                  <li><span className="tick">✓</span>Discovery week included</li>
                  <li><span className="tick">✓</span>High-fidelity product design</li>
                  <li><span className="tick">✓</span>Full-stack build &amp; deployment</li>
                  <li><span className="tick">✓</span>Two rounds of post-launch iteration</li>
                </ul>
                <div className="foot">
                  <span style={{ fontSize: 13, color: "var(--mute)" }}>
                    4–12 week engagements
                  </span>
                  <a className="pill ghost" href="#contact">
                    Start a project <span className="arr">→</span>
                  </a>
                </div>
              </div>

              <div className="price-card featured">
                <div className="price-top">
                  <div>
                    <div className="kind">Subscription</div>
                    <div className="rate">From £9,500 / month</div>
                  </div>
                  <span className="badge">Retainer</span>
                </div>
                <div>
                  <div className="headline">
                    An embedded builder for as long as you need one.
                  </div>
                  <p className="desc">
                    Best for founders who need senior design and build muscle
                    without hiring a full-time lead.
                  </p>
                </div>
                <ul>
                  <li><span className="tick">✓</span>One or two days a week, embedded</li>
                  <li><span className="tick">✓</span>Architecture, hiring &amp; delivery discipline</li>
                  <li><span className="tick">✓</span>Investor-grade reporting cadence</li>
                  <li><span className="tick">✓</span>Pause or cancel with 30 days notice</li>
                </ul>
                <div className="foot">
                  <span style={{ fontSize: 13, color: "var(--mute)" }}>
                    Rolling monthly
                  </span>
                  <a className="pill dark" href="#contact">
                    Get started <span className="arr">→</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
