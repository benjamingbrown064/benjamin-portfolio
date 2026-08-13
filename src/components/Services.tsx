import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { Stagger, StaggerItem } from "./Stagger";
import { Magnetic } from "./Magnetic";

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
          <TextReveal
            as="h2"
            className="services-title"
            lines={["Design, build,", "and operate", "the thing."]}
          />
          <Stagger className="svc-list">
            {SERVICES.map((name, i) => (
              <StaggerItem key={name} className="svc">
                <span className="name">{name}</span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal>
            <div className="services-foot">
              <p>
                Engagements run from week-long strategy sprints to open-ended
                fractional CTO work. I take on two clients per quarter, never more.
              </p>
              <Magnetic>
                <a className="pill light" href="#contact">
                  Get in touch <span className="arr">→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
