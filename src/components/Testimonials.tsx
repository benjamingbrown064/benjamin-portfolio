import { Reveal } from "./Reveal";

const QUOTES = [
  {
    quote:
      "Ben walked in on a Monday and we had something in our customers' hands by Friday. That kind of velocity shouldn't be possible.",
    name: "Alex Reinhardt",
    role: "COO, Northfield Motors",
  },
  {
    quote:
      "We'd spent eighteen months with three agencies and nothing shipped. Ben replaced all of them and we went live in twelve weeks.",
    name: "Priya Shah",
    role: "Founder, Meridian Group",
  },
  {
    quote:
      "The rare operator who can hold the product vision, write the code, and still be on the phone to support at 11pm. A force multiplier.",
    name: "James Ogilvie",
    role: "CEO, Atlas Security",
  },
];

export function Testimonials() {
  return (
    <section className="block-section" id="testimonials">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <div>
              <span className="micro">Testimonials</span>
              <h2 className="why-head">
                Success stories from operators I&apos;ve worked with.
              </h2>
              <p className="col-lead">
                A short selection of recent collaborators. Extended references
                available on request.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="test-grid">
              {QUOTES.map((q, i) => (
                <div key={i} className="test-card">
                  <span className="placeholder-pill">Placeholder</span>
                  <p className="quote">&ldquo;{q.quote}&rdquo;</p>
                  <div className="test-person">
                    <div className="avatar" aria-hidden="true" />
                    <div className="meta">
                      <strong>{q.name}</strong>
                      <span>{q.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
