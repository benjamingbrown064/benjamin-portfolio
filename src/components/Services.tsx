import { Reveal } from "./Reveal";

const SERVICES = [
  "Discovery & Strategy",
  "Product Design",
  "Full-Stack Build",
  "AI Integration",
  "Fractional CTO",
];

export function Services() {
  return (
    <section className="services-wrap" id="services">
      <div className="services">
        <Reveal>
          <span className="micro">Services</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2>Design, build, and&nbsp;operate the thing.</h2>
        </Reveal>
        <div className="svc-list">
          {SERVICES.map((name, i) => (
            <Reveal key={name} delay={i * 0.04}>
              <div className="svc">
                <span className="name">{name}</span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="services-foot">
            <p>
              Engagements run from week-long strategy sprints to open-ended
              fractional CTO work. I take on two clients per quarter, never more.
            </p>
            <a className="pill light" href="#pricing">
              See pricing <span className="arr">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
