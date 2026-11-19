(function(){var M={"/site/assets/web/warrantyos-team.jpg": "/site/assets/web/warrantyos-team-1300.jpg 1300w, /site/assets/web/warrantyos-team.jpg 2200w", "/site/assets/web/wl/hero-window-reading.jpg": "/site/assets/web/wl/hero-window-reading-1300.jpg 1300w, /site/assets/web/wl/hero-window-reading.jpg 2200w", "/site/assets/web/wl/attorney-steps-phone-v2.jpg": "/site/assets/web/wl/attorney-steps-phone-v2-1300.jpg 1300w, /site/assets/web/wl/attorney-steps-phone-v2.jpg 2200w", "/site/assets/web/wl/attorney-desktop.jpg": "/site/assets/web/wl/attorney-desktop-1300.jpg 1300w, /site/assets/web/wl/attorney-desktop.jpg 2200w", "/site/assets/web/wl/demo-table-review.jpg": "/site/assets/web/wl/demo-table-review-1300.jpg 1300w, /site/assets/web/wl/demo-table-review.jpg 2200w", "/site/assets/web/wl/attorney-reading-table.jpg": "/site/assets/web/wl/attorney-reading-table-1300.jpg 1300w, /site/assets/web/wl/attorney-reading-table.jpg 2200w", "/site/assets/web/wl/meeting-room-doorway.jpg": "/site/assets/web/wl/meeting-room-doorway-1300.jpg 1300w, /site/assets/web/wl/meeting-room-doorway.jpg 2200w"},R=window.React;if(!R||R.__small)return;R.__small=1;var ce=R.createElement;R.createElement=function(t,p){if(t==="img"&&p&&M[p.src]&&!p.srcSet){p=Object.assign({},p,{srcSet:M[p.src]})}var a=[t,p];for(var i=2;i<arguments.length;i++)a.push(arguments[i]);return ce.apply(R,a)}})();
const WL = window.WilboLawDesignSystem_c42bb7;
const wlPad = (n) => String(n).padStart(2, "0");
const WL_METHOD = [
  ["Direction", "01", "Business management and strategy", "Where are you, and where do you want to be?", ["Research", "Positioning", "Go-to-market"], ["4", "Questions every case answers"]],
  ["Direction", "02", "Financial", "Where is money made, lost and stuck?", ["Exposure scenario"], ["60", "Days a vague supplemental request can cost"]],
  ["Foundations", "03", "Operations", "How does the work get done today?", ["Today view", "Case plan", "Diary and deadlines"], ["1", "Next step on every file"]],
  ["Foundations", "04", "Data", "What does the business know, and can it be trusted?", ["OCR and page reading", "Document typing and timeline", "Legal library"], ["320 pages", "Longest scan read"]],
  ["Foundations", "05", "Compliance and governance", "What must not be broken?", ["Citation check", "Approval and audit log", "Role-based access"], ["0", "Letters sent without a lawyer’s yes"]],
  ["Customer", "06", "Product development", "Is what you sell what people want?", ["QME assessment", "Report-to-report comparison", "Drafting in the firm’s format"], ["35", "Checks on every report"]],
  ["Customer", "07", "Marketing and brand", "Do the right people know it exists?", ["Brand", "Imagery", "Marketing site", "Trust page", "Demo booking"], ["4", "Promises on the trust page"]],
  ["Customer", "08", "Sales", "Does interest turn into revenue you can forecast?", ["Lead generation"], ["20", "Minutes for a demo"]],
  ["Customer", "09", "Customer support", "Do customers stay, and can you cope with more of them?", ["Help centre", "Support panel", "In-app feedback"], ["11", "Help guides"]],
  ["Build", "10", "Technical development", "What needs building, and in what order?", ["Automated testing", "Error alerts and health checks", "Long-scan reading"], ["1,056", "Automated tests"]]
];
const WL_PRODUCTS = [
  ["Today", "A morning view of the caseload: due, waiting and new, across every file.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/01-today.png", alt: "The Today view: Needs you, with five items due, new or late across the caseload", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["The file", "Every page read and typed, scans included, on one timeline.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/02-the-file.png", alt: "The Martinez case file: four documents, 530 pages, each typed and dated", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["Issues", "35 checks on the QME or AME report, each with its severity and its page.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/03-issues.png", alt: "Issues on Dr. Chen’s PQME: three high-severity issues, each linked to its page", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["What changed", "Add the supplemental and see what the doctor fixed, what they didn’t and how the rating moved.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/04-what-changed.png", alt: "What changed in the supplemental: DRE III to DRE II, 6 of 10 questions answered, 4 still open", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["Drafts", "Supplemental requests, depo outlines, objections, records requests and subpoenas, in the firm’s format.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/05-drafts.png", alt: "A supplemental request draft on Alder & Marsh letterhead, citing QME p.4", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["Status reports", "30-day reports, initial file reviews and conference summaries the examiner can read in a minute.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/06-status-reports.png", alt: "A 30-day status report for the claims examiner, with the next step", width: "1280", height: "1600", loading: "lazy", decoding: "async" })],
  ["Exposure", "A PD rating and an exposure scenario from the 2005 rating schedule, with the maths shown.", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/07-exposure.png", alt: "Exposure on the lumbar spine: 12% as rated, 5–8% if DRE II, with the maths shown", width: "1280", height: "1600", loading: "lazy", decoding: "async" })]
];
const WL_ENG = [
  ["Citation check", "Every quote and page in a draft is checked against the case file before the draft can be approved."],
  ["Lawyer’s yes", "WilboLaw drafts, and a lawyer approves. Nothing is sent anywhere on its own."],
  ["Audit log", "Every upload, issue, draft and approval is recorded against the person who did it."],
  ["Firm isolation", "Each firm’s data is kept separate, and access is by role: Partner, attorney, paralegal."],
  ["Automated testing", "Nothing ships until 1,056 tests pass, browser tests included."],
  ["OCR", "Scanned files are read page by page, so a 300-page scan has real page numbers."],
  ["Word and PDF", "Every draft exports on the firm’s letterhead, with blanks marked until they’re filled."],
  ["Legal library", "The Labor Code, CCR Title 8, the 2005 rating schedule and the firm’s own licensed AMA Guides."]
];
const WL_DAY = [
  ["The report arrives.", "Dr. Chen’s PQME is added to the Martinez file. WilboLaw reads all of it and checks it against the rest of the file.", () => /* @__PURE__ */ React.createElement(WlmFile, { fresh: true })],
  ["The issues.", "Four high-severity issues, each with its page. One: the history leaves out the low back soreness Martinez admitted to in her deposition, though Chen lists the deposition as reviewed.", () => /* @__PURE__ */ React.createElement(WlmIssues, { items: [2, 0], more: 2 })],
  ["The plan.", "The case Plan sets the next move and says why: ask for a supplemental report before the MSC.", () => /* @__PURE__ */ React.createElement(WlmPlan, null)],
  ["The draft.", "A supplemental request to Dr. Chen, on Alder & Marsh letterhead, with ten questions tied to the pages. Sarah Novak reads it, fills in the date and approves it.", () => /* @__PURE__ */ React.createElement(WlmDraft, null), "Approve and export PDF."],
  ["The supplemental.", "Chen replies. WilboLaw compares it with the first report: the lumbar rating moved from DRE III to DRE II, 6 of 10 questions answered, 4 still open.", () => /* @__PURE__ */ React.createElement(WlmCompare, null)],
  ["The update.", "The plan updates to object to the four open issues. A 30-day status report for the claims examiner is drafted from the work already done: “Dr. Chen rated the lower back at 12%. We think the report doesn’t support that number, and we have asked him to explain it.”", () => /* @__PURE__ */ React.createElement(WlmStatus, null)]
];
const WL_OUT = [
  ["Marketing site", "Win the medical-legal fight before the MSC.", "", "16/10", () => /* @__PURE__ */ React.createElement(WlmSite, null), "ink"],
  ["Trust page", "Built to be checked.", "", "4/5", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/site-02-trust.png", alt: "Built to be checked: four safeguards, each switched on, with 16 citations checked on the Martinez supplemental request", width: "1280", height: "1600", loading: "lazy", decoding: "async" }), "shot"],
  ["Demo booking", "See it on one of your own QME reports.", "Book 20 minutes and bring a report, redacted if you prefer.", "4/5", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/site-03-demo-booking.png", alt: "Book a demo form filled in, with a redacted PQME report attached and a 20-minute slot on Tue 24 Nov at 10:00", width: "1280", height: "1220", loading: "lazy", decoding: "async" }), "shot"],
  ["Help centre", "One short guide per job.", "Every button a guide names is checked against the app.", "4/5", () => /* @__PURE__ */ React.createElement("img", { className: "wl-tile-img", src: "/site/assets/web/wilbolaw/tiles/site-04-help-centre.png", alt: "Help centre with a search field and five short guides, each with its reading time", width: "1280", height: "1128", loading: "lazy", decoding: "async" }), "shot"]
];
function wlFitAll() {
  document.querySelectorAll("[data-fit]").forEach((el) => {
    const p = el.parentElement, cs = getComputedStyle(p);
    const aw = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    el.style.zoom = 1;
    el.style.zoom = Math.min(1, aw / el.offsetWidth, (ah > 40 ? ah : 1e4) / el.offsetHeight);
  });
}
function WlResult({ items }) {
  const r = (items || []).filter((x) => x && x[0] && x[1]);
  if (!r.length) return null;
  return /* @__PURE__ */ React.createElement("dl", { className: "wx-res" }, r.map(([v, l]) => /* @__PURE__ */ React.createElement("div", { key: l }, /* @__PURE__ */ React.createElement("dt", null, l), /* @__PURE__ */ React.createElement("dd", null, v))));
}
function WlEyebrow({ children, onDark }) {
  return /* @__PURE__ */ React.createElement("div", { className: "wx-eb" }, /* @__PURE__ */ React.createElement(WL.Kicker, { as: "span", size: 11, tone: onDark ? "onDark" : "accentText" }, children));
}
function WlHead({ eyebrow, title, lede, onDark, children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "wx-h wx-rv" }, /* @__PURE__ */ React.createElement(WlEyebrow, { onDark }, eyebrow), /* @__PURE__ */ React.createElement("h2", null, title), lede ? /* @__PURE__ */ React.createElement("p", { className: "wx-lede" }, lede) : null, children);
}
function WlLink({ href, variant = "primary", children, ext }) {
  return /* @__PURE__ */ React.createElement("a", { className: "wx-bl", href, ...ext ? { target: "_blank", rel: "noopener" } : {} }, /* @__PURE__ */ React.createElement(WL.Button, { variant, style: { height: 48, padding: "0 22px", fontSize: 15 } }, children));
}
function WlPhoto({ src, alt, pos, className = "wx-photo" }) {
  return /* @__PURE__ */ React.createElement("figure", { className: className + " wl-ph wx-rv", style: className === "wx-photo" ? { marginBottom: 0 } : null }, /* @__PURE__ */ React.createElement("img", { src, alt, loading: "lazy", style: pos ? { objectPosition: pos } : null }));
}
function WlScrollText({ text }) {
  const ref = React.useRef(null);
  const words = text.split(" ");
  const [lit, setLit] = React.useState(0);
  React.useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setLit(words.length);
      return;
    }
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = ref.current.getBoundingClientRect(), vh = innerHeight;
      const start = vh * 0.85, end = vh * 0.4;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)));
      setLit(Math.round(p * words.length));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("p", { className: "big wx-read", ref, "aria-label": text }, words.map((w, i) => /* @__PURE__ */ React.createElement("span", { key: i, "aria-hidden": "true", className: i < lit ? "on" : "" }, w, i < words.length - 1 ? " " : "")));
}
function WlRail({ className, children }) {
  const t = React.useRef(null);
  const [st, setSt] = React.useState({ a: true, b: false });
  const upd = () => {
    const e = t.current;
    if (e) setSt({ a: e.scrollLeft < 4, b: e.scrollLeft + e.clientWidth >= e.scrollWidth - 4 });
  };
  React.useEffect(() => {
    const e = t.current;
    const sync = () => {
      const it = e.querySelector(".wx-it");
      if (it) e.style.scrollPaddingInline = it.offsetLeft - e.offsetLeft + "px";
      upd();
    };
    const reset = () => {
      sync();
      e.scrollLeft = 0;
      upd();
    };
    reset();
    const id = setTimeout(reset, 400);
    addEventListener("load", reset);
    addEventListener("resize", sync);
    return () => {
      clearTimeout(id);
      removeEventListener("load", reset);
      removeEventListener("resize", sync);
    };
  }, []);
  const go = (d) => {
    const e = t.current, it = e.querySelector(".wx-it");
    e.scrollBy({ left: (it.offsetWidth + 20) * d, behavior: "smooth" });
  };
  const arrow = (d) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6" }));
  return /* @__PURE__ */ React.createElement("div", { className: className + " wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-track", ref: t, onScroll: upd }, children), /* @__PURE__ */ React.createElement("div", { className: "wx-nav" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-btn", "aria-label": "Previous", disabled: st.a, onClick: () => go(-1) }, arrow(-1)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-btn", "aria-label": "Next", disabled: st.b, onClick: () => go(1) }, arrow(1))));
}
const WL_DAY_FILMS = [["01", "The PQME report arrives and its three checks against the file tick off"], ["02", "The two quotes are highlighted and the mismatch between them is flagged"], ["03", "Reading finishes and the supplemental request becomes the next move"], ["04", "Citations count up to 16, the checks tick off and Approve becomes available"], ["05", "DRE III is struck through for DRE II and the answered bar fills to 6 of 10"], ["06", "The plan updates and objecting to the four open issues becomes next"]];
function WlDay() {
  const [cur, setCur] = React.useState(0);
  const [auto, setAuto] = React.useState(!matchMedia("(prefers-reduced-motion:reduce)").matches);
  const [seen, setSeen] = React.useState(0);
  const [done, setDone] = React.useState(-1);
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => setVis(e.isIntersecting)), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    setSeen((n) => Math.max(n, cur));
    setDone(-1);
  }, [cur]);
  React.useEffect(() => {
    if (!auto || !vis) return;
    const next = () => setCur((c) => (c + 1) % WL_DAY.length);
    const id = setTimeout(next, done === cur ? 1400 : 14e3);
    return () => clearTimeout(id);
  }, [auto, vis, cur, done]);
  const d = WL_DAY[cur];
  return /* @__PURE__ */ React.createElement("div", { ref, className: "wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-stage wl-day" }, WL_DAY.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "wx-scene" + (i === cur ? " on" : "") }, i <= seen + 1 ? /* @__PURE__ */ React.createElement(WlFilm, { src: "/site/work/wl-anim/day-" + WL_DAY_FILMS[i][0] + ".html", title: "Animation: " + WL_DAY_FILMS[i][1], active: i === cur, paused: !vis, onEnd: () => setDone(i) }) : null))), /* @__PURE__ */ React.createElement("div", { className: "wx-tl", style: { "--p": cur / (WL_DAY.length - 1) } }, WL_DAY.map((s, i) => /* @__PURE__ */ React.createElement("button", { key: i, type: "button", "aria-label": s[0], className: i === cur ? "on" : i < cur ? "past" : "", onClick: () => {
    setAuto(false);
    setCur(i);
  } }, /* @__PURE__ */ React.createElement("i", null), wlPad(i + 1)))), /* @__PURE__ */ React.createElement("div", { className: "wx-dtx" }, /* @__PURE__ */ React.createElement("h3", null, d[0]), /* @__PURE__ */ React.createElement("p", null, d[1], d[3] ? /* @__PURE__ */ React.createElement(React.Fragment, null, " ", /* @__PURE__ */ React.createElement("b", null, d[3])) : null)));
}
function WlLogo() {
  const [k, setK] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        setK(1);
        io.disconnect();
      }
    }), { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const h = Math.max(44, Math.min(104, Math.min(window.innerWidth, 1400) * 0.07));
  return /* @__PURE__ */ React.createElement("div", { className: "wx-b logo wx-rv", ref }, /* @__PURE__ */ React.createElement("div", { key: k, className: "wx-lu" + (k ? " wx-play" : ""), style: { gap: h * 0.3 } }, /* @__PURE__ */ React.createElement("span", { className: "m" }, /* @__PURE__ */ React.createElement(WL.Logo, { variant: "mark", inverse: true, size: h })), /* @__PURE__ */ React.createElement("span", { className: "t wl-wm", style: { fontSize: h * 0.674 } }, "Wilbo", /* @__PURE__ */ React.createElement("span", null, "Law"))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-replay", onClick: () => setK(k + 1) }, "Replay"));
}
function WlFilm({ src = "/site/work/wilbolaw-film.html", title = "WilboLaw demo: Sarah reviews Dr. Chen’s report, drafts a supplemental request tied to page 4 and sends it", once = false, active, paused = false, onEnd }) {
  const ref = React.useRef(null), ctl = React.useRef(null);
  const controlled = active !== void 0;
  const actRef = React.useRef(active), pauseRef = React.useRef(paused), endRef = React.useRef(onEnd);
  actRef.current = active;
  pauseRef.current = paused;
  endRef.current = onEnd;
  const [ended, setEnded] = React.useState(false);
  const [near, setNear] = React.useState(!(once || controlled));
  React.useEffect(() => {
    if (near || !ref.current) return;
    const o = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        o.disconnect();
        setNear(true);
      }
    }, { rootMargin: "500px 0px" });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  React.useEffect(() => () => ctl.current && ctl.current.stop(), []);
  React.useEffect(() => {
    const c = ctl.current;
    if (!controlled || !c || !c.ready) return;
    if (active) {
      c.pending = true;
      if (!pauseRef.current) c.play();
    } else {
      c.hold();
      const id = setTimeout(() => {
        if (!actRef.current) c.reset();
      }, 450);
      return () => clearTimeout(id);
    }
  }, [active]);
  React.useEffect(() => {
    const c = ctl.current;
    if (!controlled || !c || !c.ready || !actRef.current) return;
    paused ? c.hold() : c.pending ? c.play() : c.resume();
  }, [paused]);
  const onLoad = () => {
    const f = ref.current;
    let tries = 0;
    const strip = () => {
      let d;
      try {
        d = f.contentDocument;
      } catch (e) {
        return;
      }
      const sv = d && d.querySelector("[data-om-exportable-video-with-duration-secs]");
      if (!sv) {
        if (tries++ < 120) setTimeout(strip, 100);
        return;
      }
      const area = sv.parentElement, root = area.parentElement;
      if (area.nextElementSibling) area.nextElementSibling.style.display = "none";
      root.style.background = "transparent";
      sv.style.boxShadow = "none";
      d.documentElement.style.background = d.body.style.background = "transparent";
      const st = d.createElement("style");
      st.textContent = "svg[data-om-exportable-video-with-duration-secs]{transform:scale(var(--wl-fit,1))!important;transform-origin:center!important;box-shadow:none!important}";
      d.head.appendChild(st);
      const W = +sv.getAttribute("width") || 1920, H = +sv.getAttribute("height") || 1080;
      const fit = () => {
        d.documentElement.style.setProperty("--wl-fit", String(Math.min(f.clientWidth / W, f.clientHeight / H)));
        area.style.setProperty("padding", "0", "important");
        root.style.setProperty("padding", "0", "important");
      };
      fit();
      setTimeout(fit, 60);
      new ResizeObserver(fit).observe(f);
      addEventListener("resize", fit);
      const btn = (t) => d.querySelector('[title="' + t + '"]');
      const dur = parseFloat(sv.getAttribute("data-om-exportable-video-with-duration-secs")) || 8;
      let out = 0;
      try {
        const sc = JSON.parse(f.contentWindow.OM_SCENES || "[]");
        const l = sc[sc.length - 1];
        if (l && /^out$/i.test(l.name)) out = +l.dur || 0;
      } catch (e) {
      }
      const loop = !once && !controlled, stopAt = Math.max(0.5, dur - (loop ? 0 : out));
      let playing = true, timer = 0, started = false, io = null, remaining = stopAt * 1e3, t0 = 0, finished = false;
      const toStart = () => {
        const r = btn("Return to start (0)");
        if (r) r.click();
      };
      const toggle = () => {
        const pb = btn("Play/pause (space)");
        if (pb) pb.click();
        else f.contentWindow.dispatchEvent(new KeyboardEvent("keydown", { code: "Space", key: " " }));
        playing = !playing;
      };
      const finish = () => {
        if (playing) toggle();
        finished = true;
        if (once) setEnded(true);
        endRef.current && endRef.current();
      };
      const arm = () => {
        if (loop) return;
        t0 = performance.now();
        timer = setTimeout(finish, remaining);
      };
      const play = () => {
        clearTimeout(timer);
        toStart();
        if (!playing) toggle();
        setEnded(false);
        finished = false;
        remaining = stopAt * 1e3;
        ctl.current.pending = false;
        arm();
      };
      const hold = () => {
        clearTimeout(timer);
        if (playing) {
          toggle();
          remaining = Math.max(0, remaining - (performance.now() - t0));
        }
      };
      const resume = () => {
        if (!playing && !finished && remaining > 0) {
          toggle();
          arm();
        }
      };
      const reset = () => {
        clearTimeout(timer);
        if (playing) toggle();
        toStart();
        finished = false;
        remaining = stopAt * 1e3;
      };
      toStart();
      toggle();
      ctl.current = { play, hold, resume, reset, pending: true, ready: false, stop: () => {
        clearTimeout(timer);
        io && io.disconnect();
      } };
      const imgs = [...d.images].filter((i) => !i.complete).map((i) => new Promise((r) => {
        i.addEventListener("load", r, { once: true });
        i.addEventListener("error", r, { once: true });
      }));
      const ready = Promise.all([d.fonts ? d.fonts.ready : null, ...imgs]);
      Promise.race([ready, new Promise((r) => setTimeout(r, 4e3))]).then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        fit();
        f.classList.add("on");
        ctl.current.ready = true;
        if (controlled) {
          if (actRef.current && !pauseRef.current) setTimeout(() => {
            if (actRef.current && !pauseRef.current && ctl.current.pending) play();
          }, 200);
          return;
        }
        io = new IntersectionObserver((es) => {
          if (!started && es[0].isIntersecting) {
            started = true;
            io.disconnect();
            setTimeout(play, 350);
          }
        }, { threshold: once ? 0.45 : 0.2 });
        io.observe(f);
      })));
    };
    strip();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("iframe", { ref, className: "wl-film", src: near ? src : void 0, title, onLoad: near ? onLoad : void 0, tabIndex: -1, loading: loopLazy(once, controlled) }), once && /* @__PURE__ */ React.createElement("button", { type: "button", className: "wl-replay" + (ended ? " on" : ""), tabIndex: ended ? 0 : -1, "aria-hidden": !ended, onClick: () => ctl.current && ctl.current.play() }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }), /* @__PURE__ */ React.createElement("path", { d: "M3 3v5h5" })), "Replay"));
}
function loopLazy(once, controlled) {
  return once || controlled ? "lazy" : "eager";
}
function WlPage() {
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".wx-rv").forEach((el) => io.observe(el));
    wlFitAll();
    addEventListener("resize", wlFitAll);
    addEventListener("load", wlFitAll);
    document.fonts && document.fonts.ready.then(wlFitAll);
    return () => {
      io.disconnect();
      removeEventListener("resize", wlFitAll);
    };
  }, []);
  let n = 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", { className: "wx-hero", "data-screen-label": "01 Hero" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "ic wx-rv" }, /* @__PURE__ */ React.createElement("span", { className: "wl-tile" }, /* @__PURE__ */ React.createElement(WL.Logo, { variant: "mark", inverse: true, size: 56 }))), /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WlEyebrow, null, "WilboLaw · Case study")), /* @__PURE__ */ React.createElement("h1", { className: "wx-rv" }, "Every claim has a page."), /* @__PURE__ */ React.createElement("p", { className: "wx-lede wx-rv" }, "WilboLaw reads a California workers’ comp file the way a careful defense attorney would. It finds what’s wrong with the medical-legal report, shows the page it’s on and drafts the letter that fixes it. A lawyer approves everything."), /* @__PURE__ */ React.createElement("p", { className: "wx-role wx-rv" }, "Designed and built by Benjamin Brown."), /* @__PURE__ */ React.createElement("div", { className: "wx-cta wx-rv" }, /* @__PURE__ */ React.createElement(WlLink, { href: "#how" }, "See how it works"), /* @__PURE__ */ React.createElement(WlLink, { href: "https://wilbolaw.com", variant: "default", ext: true }, "Visit WilboLaw")), /* @__PURE__ */ React.createElement("div", { className: "wx-lead" }, /* @__PURE__ */ React.createElement(WlPhoto, { className: "wx-lead-ph", src: "/site/assets/web/wl/hero-window-reading.jpg", alt: "A man reading a printed document on a window seat in a dark wood-panelled room", pos: "50% 30%" }), /* @__PURE__ */ React.createElement("div", { className: "wx-film wx-rv wl-app" }, /* @__PURE__ */ React.createElement(WlFilm, null))), /* @__PURE__ */ React.createElement("dl", { className: "wx-meta wx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Checks on every QME report"), /* @__PURE__ */ React.createElement("dd", null, "35")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Letters in the firm’s format"), /* @__PURE__ */ React.createElement("dd", null, "10")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Automated tests"), /* @__PURE__ */ React.createElement("dd", null, "1,056")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Longest scan read"), /* @__PURE__ */ React.createElement("dd", null, "320", /* @__PURE__ */ React.createElement("small", null, " pages")))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-say", "data-screen-label": "02 The project" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WlEyebrow, null, "The project")), /* @__PURE__ */ React.createElement(WlScrollText, { text: "A QME report decides most of what a workers’ comp case is worth, and it can run to hundreds of pages." }), /* @__PURE__ */ React.createElement("p", { className: "wx-lede wx-rv" }, "Defense attorneys carry 80 to 150 files each. Thin apportionment, impairments added instead of combined, a history that contradicts the deposition: if nobody raises it before the MSC, it usually stays. WilboLaw does the first read so the attorney’s time goes on strategy. It’s a review layer, not a drafting machine. Every issue it raises is tied to a page, and nothing leaves without a lawyer’s yes."), /* @__PURE__ */ React.createElement(WlPhoto, { src: "/site/assets/web/wl/attorney-desktop.jpg", alt: "An attorney working at a desktop computer in a bright office", pos: "50% 35%" }), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "The file."), " Where the case is won or lost."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "how", style: { paddingTop: 0 }, "data-screen-label": "03 How it works" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "How it works", title: "Read by the software. Decided by the lawyer.", lede: "WilboLaw does the reading, the checking and the first draft. The attorney makes the call." }), /* @__PURE__ */ React.createElement("div", { className: "wx-rows" }, /* @__PURE__ */ React.createElement("div", { className: "wx-row wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan card wl-anim" }, /* @__PURE__ */ React.createElement(WlFilm, { once: true, src: "/site/work/wl-anim/01-the-file.html", title: "Animation: the four case documents are read, then the case timeline builds" })), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "01 · The file"), /* @__PURE__ */ React.createElement("h3", null, "Drop the whole file in."), /* @__PURE__ */ React.createElement("p", null, "QME and AME reports, supplementals, treating records, depositions and letters, scanned or not. ", /* @__PURE__ */ React.createElement("b", null, "Every page is read, typed and dated, and put on the case timeline.")), /* @__PURE__ */ React.createElement(WlResult, { items: [["320 pages", "Longest scan read"]] }))), /* @__PURE__ */ React.createElement("div", { className: "wx-row flip wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan card wl-anim" }, /* @__PURE__ */ React.createElement(WlFilm, { once: true, src: "/site/work/wl-anim/02-the-issues.html", title: "Animation: 35 checks run, two high issues appear and page 4 opens on the source sentence" })), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "02 · The issues"), /* @__PURE__ */ React.createElement("h3", null, "Know what’s wrong, and exactly where."), /* @__PURE__ */ React.createElement("p", null, "Each report is checked against the AMA Guides 5th edition, the Labor Code and the case law a defense attorney would cite: method, apportionment, Almaraz/Guzman, rating arithmetic and history. ", /* @__PURE__ */ React.createElement("b", null, "Each issue comes with its severity and the page it’s on.")), /* @__PURE__ */ React.createElement(WlResult, { items: [["35", "Checks on every report"]] }))), /* @__PURE__ */ React.createElement("div", { className: "wx-row wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan ink wl-anim" }, /* @__PURE__ */ React.createElement(WlFilm, { once: true, src: "/site/work/wl-anim/03-the-letter.html", title: "Animation: the supplemental request is drafted with citations, checked and made ready to approve" })), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "03 · The letter"), /* @__PURE__ */ React.createElement("h3", null, "The fix, drafted from the problem."), /* @__PURE__ */ React.createElement("p", null, "An issue becomes a supplemental report request, a deposition outline or an objection, on the firm’s letterhead and in its format. ", /* @__PURE__ */ React.createElement("b", null, "Citations are checked before a draft can be approved."), " Anything left blank is marked."), /* @__PURE__ */ React.createElement(WlResult, { items: [["10", "Letters in the firm’s format"]] })))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey", id: "day", "data-screen-label": "04 A day with WilboLaw" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "A day with WilboLaw", title: "From the report to the reply." }), /* @__PURE__ */ React.createElement(WlDay, null), /* @__PURE__ */ React.createElement(WlPhoto, { src: "/site/assets/web/wl/attorney-reading-table.jpg", alt: "An attorney reading a printed page, pen in hand, across a table from a client", pos: "50% 35%" }), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "The examiner gets an update they can read in a minute."), " Nobody re-read the report to write it."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "product", "data-screen-label": "05 Product" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "The caseload", title: "Every file, one next step.", lede: "Today shows what needs you across all your cases: what’s due, what’s waiting on someone else and what came in overnight. Each case has a Plan with the next move and why. Paralegals see what’s assigned to them." }), /* @__PURE__ */ React.createElement("div", { className: "wx-film wx-rv wl-today wl-anim", style: { marginTop: 0 } }, /* @__PURE__ */ React.createElement(WlFilm, { once: true, src: "/site/work/wl-anim/today.html", title: "Animation: overnight items land in Needs you, the top item explains its next step, and the late AME supplemental is chased and drops off the list" })), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Today."), " The morning view of the caseload."), /* @__PURE__ */ React.createElement("div", { className: "wx-hl wx-rv", style: { marginTop: "clamp(104px,12vw,168px)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WlEyebrow, null, "Product"), /* @__PURE__ */ React.createElement("h2", null, "One app. Seven jobs.")), /* @__PURE__ */ React.createElement("p", { className: "wx-lede" }, "Everything the attorney, the paralegal and the claims examiner touch, built around the same case file.")), /* @__PURE__ */ React.createElement(WlRail, { className: "wx-pr" }, WL_PRODUCTS.map(([k, p, mock], i) => /* @__PURE__ */ React.createElement("article", { key: k, className: "wx-it" }, /* @__PURE__ */ React.createElement("div", { className: "wx-card wl-ftile" }, mock()), /* @__PURE__ */ React.createElement("div", { className: "wx-cap" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, wlPad(i + 1), " · ", k), /* @__PURE__ */ React.createElement("p", null, p))))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-ink", id: "engineering", "data-screen-label": "06 Under the hood" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { onDark: true, eyebrow: "Under the hood", title: "Built to be checked.", lede: "The WCAB has sanctioned filings with AI-invented citations. WilboLaw is built so every citation can be checked." }), /* @__PURE__ */ React.createElement("div", { className: "wx-nums wx-rv", style: { gridTemplateColumns: "repeat(2,minmax(0,1fr))" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "10"), /* @__PURE__ */ React.createElement("span", null, "Letters in the firm’s format")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", null, "35"), /* @__PURE__ */ React.createElement("span", null, "Checks per report"))), /* @__PURE__ */ React.createElement("div", { className: "wx-eng" }, /* @__PURE__ */ React.createElement("div", { className: "wx-acc wx-rv" }, WL_ENG.map(([t, p], i) => /* @__PURE__ */ React.createElement("details", { key: t, name: "wl-eng", open: i === 0 }, /* @__PURE__ */ React.createElement("summary", null, t, /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("p", null, p)))), /* @__PURE__ */ React.createElement("div", { className: "wx-stack wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Surfaces"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Today"), /* @__PURE__ */ React.createElement("b", null, "Case file"), /* @__PURE__ */ React.createElement("b", null, "Drafts"), /* @__PURE__ */ React.createElement("b", null, "Library"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Records"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Cases"), /* @__PURE__ */ React.createElement("b", null, "Documents"), /* @__PURE__ */ React.createElement("b", null, "Issues"), /* @__PURE__ */ React.createElement("b", null, "Letters"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay ag" }, /* @__PURE__ */ React.createElement("span", null, "Agent layer"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Reading"), /* @__PURE__ */ React.createElement("b", null, "Assessment"), /* @__PURE__ */ React.createElement("b", null, "Drafting"), /* @__PURE__ */ React.createElement("b", null, "Comparison"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Platform"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Claude"), /* @__PURE__ */ React.createElement("b", null, "Voyage"), /* @__PURE__ */ React.createElement("b", null, "OCR"), /* @__PURE__ */ React.createElement("b", null, "Word/PDF"))))), /* @__PURE__ */ React.createElement(WlPhoto, { src: "/site/assets/web/wl/attorney-steps-phone-v2.jpg", alt: "An attorney walking down stone steps outside a building, reading her phone with a folio under her arm", pos: "70% 40%" }))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "brand", "data-screen-label": "07 Brand" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "Brand", title: "Ink, fog, one blue.", lede: "Black does the work. One muted blue marks the thing to act on, and red is only for severity. Set in Archivo, with Martian Mono for page cites and case numbers. No italics anywhere." }), /* @__PURE__ */ React.createElement("div", { className: "wx-bento" }, /* @__PURE__ */ React.createElement(WlLogo, null), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--obsidian)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Ink"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#0D0D0D")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--fog)", boxShadow: "inset 0 0 0 1px var(--line)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Fog"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#F5F5F5")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--moonstone)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Blue"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#519CAB")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--moonstone-deep)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Deep blue"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#2C6B77")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--crit)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Severity red"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#A8321C")), /* @__PURE__ */ React.createElement("div", { className: "wx-b ty wx-rv" }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Archivo and Martian Mono"), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("span", { className: "aa" }, "Aa"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--fmono)", fontSize: 12, color: "var(--slate)" } }, "ADJ14892037 · QME p.4 · Nov 18, 2026"))), /* @__PURE__ */ React.createElement("div", { className: "wx-b ai wx-rv" }, /* @__PURE__ */ React.createElement(WL.Logo, { variant: "seal", size: 88 }))), /* @__PURE__ */ React.createElement(WlPhoto, { src: "/site/assets/web/wl/meeting-room-doorway.jpg", alt: "Seen through a doorway, an attorney holding printed pages talks with two colleagues at a meeting table", pos: "60% 45%" }), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Imagery."), " Real offices, paper on the desk, mid-task moments. A finger on a line of a printed report."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey", id: "launch", "data-screen-label": "08 Launch" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "Launch", title: "From one interview to a demo pipeline.", lede: "It started with one defense partner describing the first 90 minutes of every QME. The research set the message, and the site, the trust page and the demo all say it the same way." }), /* @__PURE__ */ React.createElement("div", { className: "wx-desk wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "scr wl-scr" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(WlmSite, null)))), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Marketing site."), " Where the demo request starts."), /* @__PURE__ */ React.createElement("div", { className: "wx-hl wx-rv", style: { marginTop: "clamp(104px,12vw,168px)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WlEyebrow, null, "Launch"), /* @__PURE__ */ React.createElement("h2", null, "Everything that went out."))), /* @__PURE__ */ React.createElement(WlRail, { className: "wx-cm" }, WL_OUT.map(([k, t, more, ar, body, tone], i) => /* @__PURE__ */ React.createElement("article", { key: k, className: "wx-it" }, /* @__PURE__ */ React.createElement("div", { className: "wx-card wl-oc" + (tone ? " " + tone : ""), style: { aspectRatio: ar } }, tone === "shot" ? body() : /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, body())), /* @__PURE__ */ React.createElement("div", { className: "wx-cap" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, wlPad(i + 1), " · ", k), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, t), more ? " " + more : ""))))), /* @__PURE__ */ React.createElement("div", { className: "wx-two wx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Content"), /* @__PURE__ */ React.createElement("p", null, "A help centre written from how the app actually behaves, one guide per job. A test confirms that every button a guide quotes really exists, so a renamed button fails the build instead of leaving a guide wrong.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Lead generation"), /* @__PURE__ */ React.createElement("p", null, "A demo-led motion: the attorney brings their own QME report, redacted if they prefer, and sees what WilboLaw finds on it in 20 minutes."))), /* @__PURE__ */ React.createElement(WlPhoto, { src: "/site/assets/web/wl/demo-table-review.jpg", alt: "Two people at a table under a pendant lamp, one pointing to a line on a printed report while the other marks it with a pen", pos: "50% 50%" }), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "The demo."), " Their own report, on the table."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "method", "data-screen-label": "09 The method" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WlHead, { eyebrow: "The method", title: "Ten questions. 28 answers.", lede: "Every project gets looked at through the same ten areas, in the same order. This is what each one produced here." }), /* @__PURE__ */ React.createElement("div", { className: "wx-mt" }, ["Direction", "Foundations", "Customer", "Build"].map((stg, si) => /* @__PURE__ */ React.createElement("div", { key: stg, className: "wx-mt-st" }, /* @__PURE__ */ React.createElement("div", { className: "wx-mt-k wx-rv" }, /* @__PURE__ */ React.createElement("span", null, "Stage ", si + 1), /* @__PURE__ */ React.createElement("b", null, stg), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("div", { className: "wx-dl wx-mt-g" }, WL_METHOD.filter((a) => a[0] === stg).map(([, num, name, q, items, res]) => /* @__PURE__ */ React.createElement("div", { key: num, className: "wx-ar wx-rv" }, /* @__PURE__ */ React.createElement("h4", null, /* @__PURE__ */ React.createElement("span", null, num, " · ", name), /* @__PURE__ */ React.createElement("span", null, wlPad(items.length))), /* @__PURE__ */ React.createElement("p", { className: "wx-ar-q" }, q), /* @__PURE__ */ React.createElement("ul", null, items.map((it) => {
    n++;
    return /* @__PURE__ */ React.createElement("li", { key: it }, /* @__PURE__ */ React.createElement("span", null, wlPad(n)), it);
  })), /* @__PURE__ */ React.createElement(WlResult, { items: [res] }))))))), /* @__PURE__ */ React.createElement("div", { className: "wx-mt-ft wx-rv" }, /* @__PURE__ */ React.createElement("a", { href: "/method" }, "See the method ", /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "→"))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey wx-end", "data-screen-label": "10 End" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WlEyebrow, null, "WilboLaw")), /* @__PURE__ */ React.createElement("h2", { className: "wx-rv" }, "What could eight of your people run?"), /* @__PURE__ */ React.createElement("div", { className: "wx-cta wx-rv" }, /* @__PURE__ */ React.createElement(WlLink, { href: "/contact" }, "Let’s talk"), /* @__PURE__ */ React.createElement(WlLink, { href: "https://wilbolaw.com", variant: "default", ext: true }, "Visit WilboLaw")), /* @__PURE__ */ React.createElement("a", { className: "wx-next wx-rv", href: "/work/warrantyos" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WL.Kicker, null, "Next case study"), /* @__PURE__ */ React.createElement("h2", null, "WarrantyOS"), /* @__PURE__ */ React.createElement("span", { className: "wx-go" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })))), /* @__PURE__ */ React.createElement("div", { className: "media" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/warrantyos-team.jpg", alt: "Three colleagues talking as they walk through an office", loading: "lazy" }))))));
}
ReactDOM.createRoot(document.getElementById("wx-root")).render(/* @__PURE__ */ React.createElement(WlPage, null));
