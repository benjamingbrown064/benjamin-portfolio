import { PacificClock } from "./PacificClock";

export function Footer() {
  return (
    <footer className="foot-wrap">
      <div className="container-x">
        <div className="wordmark-big">
          <span className="row">BENJAMIN&nbsp;BROWN</span>
        </div>
        <div className="foot-meta">
          <div className="fm-col">
            <p className="fm-label">Contact</p>
            <div className="line">
              <a href="mailto:hello@benjaminbrown.co">
                hello@benjaminbrown.co <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="line">
              <a href="tel:+19498670232">
                +1 (949) 867-0232 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="fm-col">
            <p className="fm-label">My current time</p>
            <div className="big">
              <PacificClock />
              <span className="city">Costa Mesa (PT)</span>
            </div>
          </div>
          <div className="fm-col">
            <p className="fm-label">Studio</p>
            <div className="line">695 Town Center Dr</div>
            <div className="line">Suite 1100</div>
            <div className="line">Costa Mesa, CA 92626</div>
            <div className="line">United States</div>
          </div>
          <div className="fm-col fm-socials">
            <a href="#">Instagram</a>
            <a href="#">X</a>
            <a href="#">YouTube</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="legal">
            © 2026 Benjamin Brown — All rights reserved.
          </span>
          <div className="links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">Imprint</a>
          </div>
          <a className="back" href="#top" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
