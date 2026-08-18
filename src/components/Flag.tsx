import { ETHOS_PASSAGES, FLAG_STATEMENT, GOLF_LINE } from "@/lib/ethos";
import { FlagMark, Mark, TeeMark } from "./marks";
import { Reveal } from "./Reveal";
import { Stagger, StaggerItem } from "./Stagger";

export function Flag() {
  return (
    <section className="flag-section" id="flag">
      <div className="container-x">
        <Reveal>
          <div className="flag-lead">
            <div className="flag-lead-marks" aria-hidden="true">
              <TeeMark className="mark-lg" />
              <FlagMark className="mark-lg" accent />
            </div>
            <p className="flag-golf">{GOLF_LINE}</p>
            <h1 className="flag-statement">{FLAG_STATEMENT}</h1>
          </div>
        </Reveal>

        <Stagger className="ethos-list" ariaLabel="Ethos">
          {ETHOS_PASSAGES.map((passage) => (
            <StaggerItem key={passage.mark} className="ethos-item">
              <Mark name={passage.mark} className="ethos-mark" />
              <p>{passage.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
