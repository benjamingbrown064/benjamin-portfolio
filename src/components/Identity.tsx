import { Reveal } from "./Reveal";

export function Identity() {
  return (
    <section className="identity" id="identity">
      <div className="container-x">
        <Reveal>
          <p className="identity-name">Ben</p>
          <p className="identity-place">Costa Mesa</p>
          <p className="identity-line">
            I found and run companies, and I still build the software.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
