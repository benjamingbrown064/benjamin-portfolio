/* Benjamin Brown · V5 page behaviour */
(function () {
  const $ = (s, r) => (r || document).querySelector(s),
    $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const root = document.documentElement,
    motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const LOADER = (l) =>
    '<svg class="bb-loader" viewBox="0 0 64 64" role="img" aria-label="' +
    (l || "Loading") +
    '"><circle class="d" cx="19" cy="38" r="5"></circle><path class="o" pathLength="100" d="M19 38A13 13 0 1 1 45 38A13 13 0 1 1 19 38"></path><path class="s" d="M14 38V13L24 8V38Z"></path></svg>';

  /* arrival: the b draws, then the hero lifts in */
  const intro = $(".bb-intro"),
    hero = $(".hero"),
    t0 = performance.now();
  const done = () => {
    if (!intro || intro.classList.contains("out")) return;
    intro.classList.add("out");
    root.classList.remove("bb-intro-on");
    setTimeout(() => {
      hero && hero.classList.add("ready");
      window.__bbUpd && window.__bbUpd();
    }, 0);
    setTimeout(() => intro.remove(), 800);
  };
  const later = () => setTimeout(done, Math.max(0, (motion ? 1500 : 250) - (performance.now() - t0)));
  document.readyState === "complete" ? later() : addEventListener("load", later, { once: true });
  setTimeout(done, 3200);

  /* images: fade in, b loader while waiting */
  $$(".img").forEach((x) => {
    const i = $("img", x);
    if (!i) return;
    const d = () => i.classList.add("is-loaded");
    if (i.complete && i.naturalWidth) return d();
    x.insertAdjacentHTML("beforeend", LOADER("Loading image"));
    i.addEventListener("load", d, { once: true });
    i.addEventListener("error", d, { once: true });
  });

  /* reveal */
  $$(".rv-g").forEach((g) => [...g.children].forEach((c, i) => c.style.setProperty("--i", Math.min(i, 8))));
  const rvs = $$(".rv,.rv-g");
  if (!motion || !("IntersectionObserver" in window)) rvs.forEach((e) => e.classList.add("in"));
  else {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    rvs.forEach((e) => io.observe(e));
  }

  /* counters */
  const fmt = (el, v) => (el.dataset.pre || "") + Math.round(v) + (el.dataset.suf || "");
  const cnt = (el) => {
    const n = parseFloat(el.dataset.count);
    if (!motion) {
      el.textContent = fmt(el, n);
      return;
    }
    const st = performance.now(),
      D = 1700;
    const tk = (t) => {
      const p = Math.min(1, (t - st) / D);
      el.textContent = fmt(el, n * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(tk);
    };
    requestAnimationFrame(tk);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            cnt(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.6 },
    );
    $$("[data-count]").forEach((e) => {
      if (motion) e.textContent = fmt(e, 0);
      io.observe(e);
    });
  }

  /* word fill */
  const fills = $$(".fill");
  fills.forEach((p) => {
    p.innerHTML = p.textContent
      .trim()
      .split(/\s+/)
      .map((w) => '<span class="wd">' + w + "</span>")
      .join(" ");
    p._w = $$(".wd", p);
  });
  if (!motion) fills.forEach((p) => p._w.forEach((w) => w.classList.add("on")));

  /* scroll: nav state, hero frame, parallax, fill */
  const nav = $("#nav"),
    fig = $(".hero-fig"),
    pars = $$("[data-par]"),
    darks = $$("[data-dark]");
  let q = false;
  const upd = () => {
    q = false;
    const vh = innerHeight;
    if (vh <= 0) return;
    nav.classList.toggle("scrolled", scrollY > 4);
    const y = nav.offsetHeight;
    let d = false;
    for (const s of darks) {
      const r = s.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) {
        d = true;
        break;
      }
    }
    nav.classList.toggle("on-dark", d);
    if (fig) fig.style.setProperty("--p", motion ? clamp(1 - fig.getBoundingClientRect().top / (vh * 0.72), 0, 1).toFixed(3) : 1);
    if (motion) {
      pars.forEach((p) => {
        const r = p.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        p.style.setProperty("--py", (((r.top + r.height / 2 - vh / 2) / vh) * -4).toFixed(2) + "%");
      });
      fills.forEach((p) => {
        const r = p.getBoundingClientRect();
        const n = Math.round(clamp((vh * 0.86 - r.top) / (r.height + vh * 0.42), 0, 1) * p._w.length);
        p._w.forEach((w, i) => w.classList.toggle("on", i < n));
      });
    }
  };
  const req = () => {
    if (!q) {
      q = true;
      requestAnimationFrame(upd);
    }
  };
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  if (fig) fig.style.setProperty("--p", 0);
  upd();
  window.__bbUpd = upd;
  addEventListener("load", upd);

  /* active nav link */
  const links = $$('.nav-links a[href^="#"]');
  if (links.length && "IntersectionObserver" in window) {
    const by = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const a = by.get(e.target.id);
          if (a && e.isIntersecting) links.forEach((l) => l.classList.toggle("on", l === a));
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    by.forEach((a, id) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* outcomes rail */
  const rail = $("[data-rail]"),
    pv = $("[data-rail-prev]"),
    nx = $("[data-rail-next]");
  if (rail) {
    const step = () => {
      const c = rail.children[0];
      return c ? c.getBoundingClientRect().width + 20 : 400;
    };
    const st = () => {
      pv.disabled = rail.scrollLeft < 4;
      nx.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    };
    pv.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
    nx.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));
    rail.addEventListener("scroll", st, { passive: true });
    addEventListener("resize", st);
    st();
  }

  /* process tabs: auto-advance while in view, stop once the visitor takes over */
  const seg = $(".seg"),
    steps = $$(".step");
  if (seg) {
    const bs = $$("button", seg);
    let i = 0,
      user = false;
    const go = (k) => {
      i = (k + bs.length) % bs.length;
      bs.forEach((b, j) => {
        b.classList.toggle("on", j === i);
        b.setAttribute("aria-selected", j === i);
      });
      steps.forEach((s, j) => s.classList.toggle("on", j === i));
    };
    bs.forEach((b, j) =>
      b.addEventListener("click", () => {
        user = true;
        seg.classList.remove("play");
        go(j);
      }),
    );
    seg.addEventListener("animationend", () => {
      if (!user) go(i + 1);
    });
    if (motion && "IntersectionObserver" in window)
      new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (user) return;
            if (e.isIntersecting) {
              seg.classList.add("play");
              seg.classList.remove("paused");
            } else seg.classList.add("paused");
          }),
        { threshold: 0.5 },
      ).observe($(".steps"));
  }

  /* faq */
  $$(".fq").forEach((b) =>
    b.addEventListener("click", () => {
      const it = b.parentElement,
        o = !it.classList.contains("open");
      it.classList.toggle("open", o);
      b.setAttribute("aria-expanded", o);
    }),
  );

  /* clocks */
  const clocks = $$("[data-clock]");
  const tick = () => {
    let s;
    try {
      s = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }).format(
        new Date(),
      );
    } catch (e) {
      s = "··";
    }
    clocks.forEach((c) => (c.textContent = s));
  };
  tick();
  setInterval(tick, 15000);

  /* footer b draws once in view */
  const fb = $(".foot-brand");
  if (fb) {
    if (!motion || !("IntersectionObserver" in window)) fb.classList.add("drawn");
    else {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              fb.classList.add("drawn");
              io.disconnect();
            }
          }),
        { threshold: 0.6 },
      );
      io.observe(fb);
    }
  }

  /* request form + agent desk: plain step names, b loader for typing and sending */
  const N = { 1: "Choose", 2: "Details", 3: "Review" };
  const patch = (r) => {
    if (!r.querySelectorAll) return;
    r.querySelectorAll('svg.mark path[d="M19 13V38"]').forEach((p) => {
      p.setAttribute("d", "M14 38V13L24 8V38Z");
      p.removeAttribute("stroke-linecap");
    });
    r.querySelectorAll(".bbc-steps span[data-s]").forEach((s) => {
      if (N[s.dataset.s] && s.textContent !== N[s.dataset.s]) s.textContent = N[s.dataset.s];
    });
    r.querySelectorAll(".bba-typing:not([data-bbl])").forEach((t) => {
      t.dataset.bbl = "1";
      t.innerHTML = LOADER("Alex is typing");
    });
    r.querySelectorAll(".bbc-send").forEach((b) => {
      if (/^Sending/.test(b.textContent.trim()) && !b.querySelector(".bb-loader")) {
        const a = b.querySelector(".arr");
        if (a) a.outerHTML = LOADER("Sending");
      }
    });
  };
  const watch = () => {
    patch(document);
    new MutationObserver((ms) => {
      for (const m of ms)
        m.addedNodes.forEach((n) => {
          if (n.nodeType === 1) {
            patch(n);
            n.parentNode && patch(n.parentNode);
          }
        });
    }).observe(document.body, { childList: true, subtree: true });
  };
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", watch) : watch();
})();
