import Image from "next/image";

export function PlaybookBanner() {
  return (
    <section className="playbook-wrap" id="playbook">
      <div className="container-x">
        <div className="playbook-card">
          <Image
            src="/assets/playbook-banner.jpg"
            alt="Operator working at a desk with an AI workflow dashboard on screen"
            fill
            sizes="(min-width: 1280px) 1280px, calc(100vw - 80px)"
            className="playbook-image"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="playbook-overlay" />
          <div className="playbook-content">
            <span className="micro">Free playbook</span>
            <h2 className="playbook-title">
              From pain point to shipped AI. Without the theatre.
            </h2>
            <p className="playbook-copy">
              The operator&apos;s playbook for building AI tools that earn their place in the workflow.
            </p>
            <div className="playbook-actions">
              <a className="pill light" href="#contact">
                Get the playbook <span className="arr">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
