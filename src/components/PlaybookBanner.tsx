import Image from "next/image";

export function PlaybookBanner() {
  return (
    <section className="playbook-wrap" id="playbook">
      <div className="container-x">
        <div className="playbook-card">
          <Image
            src="/assets/govscape.jpg"
            alt="Abstract AI workflow interface"
            fill
            sizes="(min-width: 1280px) 1280px, calc(100vw - 80px)"
            className="playbook-image"
            style={{ objectFit: "cover" }}
          />
          <div className="playbook-overlay" />
          <div className="playbook-content">
            <span className="micro">Free playbook</span>
            <h2 className="playbook-title">
              A practical playbook for turning business problems into AI applications that actually get used.
            </h2>
            <p className="playbook-copy">
              Built for operators, founders, and teams who know something is
              broken but need a clearer way to frame the problem, design the
              workflow, and turn AI into something useful. It is a simple
              framework for moving from pain point to shipped application,
              without disappearing into vague innovation theatre.
            </p>
            <div className="playbook-actions">
              <a className="pill light" href="#contact">
                Get the free playbook <span className="arr">→</span>
              </a>
              <span className="playbook-note">Free guide · operator-first · framework-led</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
