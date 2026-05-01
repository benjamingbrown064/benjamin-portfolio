import { Reveal } from "./Reveal";
import { ScrollTypeOnView } from "./ScrollTypeOnView";

export function About() {
  return (
    <section className="block-section about" id="about">
      <div className="container-x">
        <div className="two-col">
          <Reveal>
            <span className="micro">About</span>
            <p className="col-lead">
              Sixteen years designing, building and running software — from the
              first commit through to the P&amp;L.
            </p>
          </Reveal>
          <div className="statement-wrap">
            <ScrollTypeOnView
              className="statement"
              text="I’m Ben — founder, operator, and full-stack builder shipping across five companies. Twenty-six products live, tens of thousands of users, and a stubborn belief that the best design decisions are made by the people who ship the code."
            />
          </div>
        </div>
        <Reveal>
          <div className="stat-strip">
            <div className="stat-cell"><div className="n">26+</div><div className="lbl">Projects completed</div></div>
            <div className="stat-cell"><div className="n">05</div><div className="lbl">Active companies</div></div>
            <div className="stat-cell"><div className="n">16</div><div className="lbl">Years building</div></div>
            <div className="stat-cell"><div className="n">£14M+</div><div className="lbl">Revenue influenced</div></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
