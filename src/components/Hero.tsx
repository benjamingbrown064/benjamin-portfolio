import { LineReveal } from "./LineReveal";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-x">
        <span className="micro hero-label">Portfolio · 2026</span>
        <LineReveal
          as="h1"
          lines={["Building in the open,", "shipping for real."]}
          delay={0.15}
        />
        <div className="hero-sub">
          <p>
            Benjamin Brown — founder, operator and full-stack builder behind five
            companies and twenty-six shipped products. I design, build and run the
            thing. No outsourced craft.
          </p>
          <div className="meta-right">
            Based in Costa Mesa, CA
            <strong>Available Q3 2026</strong>
          </div>
        </div>

        <div className="logos" aria-label="Companies founded and operated">
          <span className="lead">Companies founded &amp; operated</span>
          <div className="logos-row">
            <span className="logo-mark"><span className="glyph">WO</span>WarrantyOS</span>
            <span className="logo-mark"><span className="sq" />The DGS</span>
            <span className="logo-mark"><span className="tri" />Taskbox</span>
            <span className="logo-mark"><span className="slash" />Govscape</span>
            <span className="logo-mark"><span className="dot-mark" />HatSafe</span>
          </div>
        </div>

        <HeroPortrait />
        <a className="scroll-ind" href="#about" aria-label="Scroll to next section">
          <span>Scroll</span>
          <span className="arr">↓</span>
        </a>
      </div>
    </section>
  );
}
