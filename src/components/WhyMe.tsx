import { Reveal } from "./Reveal";

const CELLS = [
  { n: "01", title: "Full-stack delivery", body: "Discovery, design, engineering and operation in one head. No relay race, no broken handoffs." },
  { n: "02", title: "AI-native approach", body: "LLMs in production since day one. I know where they earn their keep and where they don't." },
  { n: "03", title: "Crafted with precision", body: "Type sits on baseline, corners are honest, product is fast. Detail is compounding interest." },
  { n: "04", title: "Quick turnaround", body: "First screens in week two, in production by week twelve. Ship to staging every Friday." },
  { n: "05", title: "Clear communication", body: "One Slack channel, one weekly written update, one dashboard. No invoice surprises." },
  { n: "06", title: "Skin in the game", body: "I run five companies myself. I know the weight of the decisions you're making." },
];

export function WhyMe() {
  return (
    <section className="block-section" id="why">
      <div className="container-x">
        <Reveal>
          <span className="micro">Why me</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="why-head">
            A team of one that ships like a team of five, obsessed with the{" "}
            <span className="accent-word">craft.</span>
          </h2>
        </Reveal>
        <div className="why-grid">
          {CELLS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.04}>
              <div className="why-cell">
                <div className="n">{c.n}</div>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
