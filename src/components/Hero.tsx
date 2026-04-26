import Image from "next/image";

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container-x">
        <span className="micro hero-label">Portfolio · 2026</span>
        <h1>Building in the open, shipping for real.</h1>
        <div className="hero-sub">
          <p>
            Benjamin Brown — founder, operator and full-stack builder behind five
            companies and twenty-six shipped products. I design, build and run the
            thing. No outsourced craft.
          </p>
          <div className="meta-right">
            Based in Costa Mesa, CA
            <strong>Available Q2 / Q3 2026</strong>
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

        <div className="hero-photo" aria-label="Editorial portrait of Benjamin Brown">
          <Image
            src="/assets/ben-portrait.jpg"
            alt="Benjamin Brown — portrait"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority
            className="portrait"
            style={{ objectFit: "cover", objectPosition: "center 45%" }}
          />
          <span className="cap">Portrait — London, UK · 2026</span>
        </div>
        <a className="scroll-ind" href="#about" aria-label="Scroll to next section">
          <span>Scroll</span>
          <span className="arr">↓</span>
        </a>
      </div>
    </section>
  );
}
