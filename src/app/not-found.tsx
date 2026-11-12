export const metadata = { title: "Page not found · Benjamin Brown®" };

export default function NotFound() {
  return (
    <main className="nf">
      <div className="w">
        <span className="eyebrow">404</span>
        <h1 className="h-l">That page is not here.</h1>
        <p className="lede">It may have moved when the site was rebuilt. The work, the method and the contact form are all one step away.</p>
        <div className="hero-cta">
          <a className="btn" href="/">Home</a>
          <a className="btn ghost" href="/work">The work</a>
          <a className="btn ghost" href="/contact">Let’s talk</a>
        </div>
      </div>
    </main>
  );
}
