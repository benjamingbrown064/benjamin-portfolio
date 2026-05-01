import { Reveal } from "./Reveal";
import { ScrollTypeOnView } from "./ScrollTypeOnView";

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
      <div className="container-x">
        <div className="services">
          <Reveal>
            <span className="micro">Services</span>
          </Reveal>
          <ScrollTypeOnView
            as="h2"
            className="services-title"
            text="Design, build, and operate the thing."
          />
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
      </div>
    </section>
  );
}
