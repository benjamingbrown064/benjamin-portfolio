import { FlagMark } from "./marks";
import { PacificClock } from "./PacificClock";

export function Footer() {
  return (
    <footer className="foot-wrap">
      <div className="container-x">
        <div className="foot-lockup">
          <FlagMark className="mark-lg" accent />
          <p className="foot-name">Benjamin Brown</p>
        </div>
        <div className="foot-meta">
          <div className="fm-col">
            <p className="fm-label">Talk</p>
            <div className="line">
              <a href="mailto:hello@benjaminbrown.co">hello@benjaminbrown.co</a>
            </div>
          </div>
          <div className="fm-col">
            <p className="fm-label">Time</p>
            <div className="big">
              <PacificClock />
              <span className="city">Costa Mesa (PT)</span>
            </div>
          </div>
          <div className="fm-col">
            <p className="fm-label">Place</p>
            <div className="line">Costa Mesa, CA</div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="legal">© 2026 Benjamin Brown</span>
          <a className="back" href="#top" aria-label="Back to top">
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
