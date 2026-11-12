const GD = window.GX_DATA;
const gxPad = (n) => String(n).padStart(2, "0");
const gxPick = (arr, ix) => ix.map((i) => arr[i]);
const GX_GROUPS = [
  ["Clients and workspace", gxPick(GD.portal, [0, 1, 47, 40, 46, 45, 53, 54])],
  ["Scores", gxPick(GD.portal, [2, 3, 4, 5])],
  ["Cost and liability", gxPick(GD.portal, [6, 7, 8, 9, 10, 11])],
  ["Frameworks and evidence", gxPick(GD.portal, [12, 13, 14, 18, 19, 20, 21])],
  ["Policies and controls", gxPick(GD.portal, [15, 16, 17])],
  ["Registers", gxPick(GD.portal, [22, 23, 24, 41, 42, 44])],
  ["Discovery", gxPick(GD.portal, [25, 26, 27, 28, 29, 30, 31, 32])],
  ["Advisor and plan", gxPick(GD.portal, [33, 34, 35, 36, 37])],
  ["Reporting and sharing", gxPick(GD.portal, [38, 39, 43, 49])],
  ["Trust and support", gxPick(GD.portal, [48, 50, 51, 52, 55, 56, 57])],
  ["Office 365 integration", GD.m365]
];
const GX_CONNECTOR = "Connector architecture built provider-agnostic, with Microsoft 365 shipped and Google Workspace, Salesforce and six others modelled as roadmap.";
const gxOne = (x) => [x.n, [x]];
const GX_DELIV = [
  ["Product", [["Online portal", "portal"], ["Office 365 integration", GD.m365], ["Connector architecture", [{ n: "Connector architecture", d: GX_CONNECTOR }]]]],
  ["Engineering", [["Security", GD.security], ["Automated testing", GD.testing], ["Resend integration", GD.resend], ["Scheduled automation layer", [GD.engMore[0]]], ["LLM guardrails", [GD.engMore[1]]], ["Performance at volume", [GD.engMore[2]]], ["Server-side PDF generation", [GD.engMore[3]]]]],
  ["Strategy", [...GD.strategy, ...GD.stratMore].map(gxOne)],
  ["Brand", [["Brand guidelines", null], ["Animated logo", null], ["Imagery", null], ["Implemented design system", [GD.brand[0], GD.brand[1]]], ["Design review record", [GD.brand[2]]]]],
  ["Content", [...GD.content, ...GD.contentMore].map(gxOne)],
  ["Marketing", GD.marketing.map(gxOne)]
];
const GX_TOTAL = GX_DELIV.reduce((n, d) => n + d[1].length, 0);
const GX_LOOK = Object.fromEntries(GX_DELIV.flatMap(([cat, items]) => items.map(([nm, rows]) => [nm, [cat, rows]])));
const GX_METHOD = [
  ["Direction", "01", "Business management and strategy", "Where are you, and where do you want to be?", ["Research", "Business management", "Launch gating and acceptance"]],
  ["Direction", "02", "Financial", "Where is money made, lost and stuck?", []],
  ["Foundations", "03", "Operations", "How does the work get done today?", ["Onboarding", "Training videos", "Agentic voiceovers"]],
  ["Foundations", "04", "Data", "What does the business know, and can it be trusted?", ["Office 365 integration", "Connector architecture"], ["437k", "Items scanned in one tenant"]],
  ["Foundations", "05", "Compliance and governance", "What must not be broken?", ["Security", "LLM guardrails"], ["8", "Standards mapped, clause by clause"]],
  ["Customer", "06", "Product development", "Is what you sell what people want?", ["Online portal", "Live customer validation"], ["60", "Screens"]],
  ["Customer", "07", "Marketing and brand", "Do the right people know it exists?", ["Brand guidelines", "Animated logo", "Imagery", "Implemented design system", "Design review record", "Marketing site", "Mailers", "Journal programme"]],
  ["Customer", "08", "Sales", "Does interest turn into revenue you can forecast?", ["Lead generation", "Growth", "Sample board report"]],
  ["Customer", "09", "Customer support", "Do customers stay, and can you cope with more of them?", ["Agentic customer support", "Help centre"], ["48", "Help guides"]],
  ["Build", "10", "Technical development", "What needs building, and in what order?", ["Automated testing", "Resend integration", "Scheduled automation layer", "Performance at volume", "Server-side PDF generation"], ["12", "Scheduled jobs"]]
];
function GxResult({ items }) {
  const r = (items || []).filter((x) => x && x[0] && x[1]);
  if (!r.length) return null;
  return /* @__PURE__ */ React.createElement("dl", { className: "gx-res" }, r.map(([v, l]) => /* @__PURE__ */ React.createElement("div", { key: l }, /* @__PURE__ */ React.createElement("dt", null, l), /* @__PURE__ */ React.createElement("dd", null, v))));
}
const GX_ENG = [["Security", GD.security], ["Automated testing", GD.testing], ["Resend integration", GD.resend], ...GD.engMore.map((x) => [x.n, [x]])];
const GX_STORY = [
  ["Connect", "The client authorises the connection.", "A consent link lets the client's own administrator authorise the connection. The consultant never holds their credentials.", () => /* @__PURE__ */ React.createElement(GxConsent, null)],
  ["Scan", "437,000 items, one inventory.", "The scan works through the tenant in slices and resumes after interruption, so a tenant that size completes on serverless infrastructure.", () => /* @__PURE__ */ React.createElement(GxScan, null)],
  ["Suggest", "Hundreds of items become a handful of decisions.", "Suggested evidence links arrive in a queue ordered by how much each decision unblocks.", () => /* @__PURE__ */ React.createElement(GxQueue, null)],
  ["Approve", "113 approvals, 113 audit entries.", "Strong matches are approved in batches. Each item still records its own decision and correlation id.", () => /* @__PURE__ */ React.createElement(GxAudit, null)],
  ["Score", "The score moves from 4 to 13.", "Scores are computed from approved evidence, so the number moved once the customer had signed the evidence off.", () => /* @__PURE__ */ React.createElement(GxScore, null)]
];
function gxFitAll() {
  document.querySelectorAll("[data-fit]").forEach((el) => {
    const p = el.parentElement, cs = getComputedStyle(p);
    const aw = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    el.style.zoom = 1;
    el.style.zoom = Math.min(1, aw / el.offsetWidth, (ah > 40 ? ah : 1e4) / el.offsetHeight);
  });
}
function GxHead({ kicker, title, lede, dark, children }) {
  const { Kicker } = GS;
  return /* @__PURE__ */ React.createElement("div", { className: "gx-eyerow gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-eb" }, /* @__PURE__ */ React.createElement(Kicker, { tone: dark ? "dark" : "light" }, kicker)), /* @__PURE__ */ React.createElement("h2", { className: "gx-h" }, title), lede ? /* @__PURE__ */ React.createElement("p", { className: "gx-lede" }, lede) : null, children);
}
function GxRead({ text }) {
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
      setLit(Math.round(Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6))) * words.length));
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
  return /* @__PURE__ */ React.createElement("p", { className: "gx-read", ref, "aria-label": text }, words.map((w, i) => /* @__PURE__ */ React.createElement("span", { key: i, "aria-hidden": "true", className: i < lit ? "on" : "" }, w, i < words.length - 1 ? " " : "")));
}
function GxRail({ children, className }) {
  const t = React.useRef(null);
  const [st, setSt] = React.useState({ a: true, b: false });
  const upd = () => {
    const e = t.current;
    if (e) setSt({ a: e.scrollLeft < 4, b: e.scrollLeft + e.clientWidth >= e.scrollWidth - 4 });
  };
  React.useEffect(() => {
    const e = t.current;
    const sync = () => {
      const it = e.querySelector(".gx-it");
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
    const e = t.current, it = e.querySelector(".gx-it");
    e.scrollBy({ left: (it.offsetWidth + 16) * d, behavior: "smooth" });
  };
  const arrow = (d) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: d < 0 ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6" }));
  return /* @__PURE__ */ React.createElement("div", { className: "gx-rv" + (className ? " " + className : "") }, /* @__PURE__ */ React.createElement("div", { className: "gx-track", ref: t, onScroll: upd }, children), /* @__PURE__ */ React.createElement("div", { className: "gx-nav" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-btn", "aria-label": "Previous", disabled: st.a, onClick: () => go(-1) }, arrow(-1)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-btn", "aria-label": "Next", disabled: st.b, onClick: () => go(1) }, arrow(1))));
}
function GxFitCard({ ar, children }) {
  const [a, b] = ar.split("/").map(Number), H = 480, W = Math.round(H * a / b);
  const box = React.useRef(null);
  const [s, setS] = React.useState(1);
  React.useLayoutEffect(() => {
    const fit = () => {
      const el = box.current;
      if (el && el.clientHeight) setS(el.clientHeight / H);
    };
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    fit();
    return () => ro.disconnect();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { ref: box, style: { position: "absolute", inset: 0, overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: W, height: H, transform: `scale(${s})`, transformOrigin: "0 0" } }, children));
}
function GxStory() {
  const [cur, setCur] = React.useState(0);
  const [auto, setAuto] = React.useState(!matchMedia("(prefers-reduced-motion:reduce)").matches);
  const [vis, setVis] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => setVis(e.isIntersecting)), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!auto || !vis) return;
    const id = setInterval(() => setCur((c) => (c + 1) % GX_STORY.length), 4400);
    return () => clearInterval(id);
  }, [auto, vis]);
  React.useEffect(() => {
    gxFitAll();
  }, [cur]);
  return /* @__PURE__ */ React.createElement("div", { ref, className: "gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-stage" }, GX_STORY.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: d[0], className: "gx-scene" + (i === cur ? " on" : "") }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, d[3]())))), /* @__PURE__ */ React.createElement("div", { className: "gx-tl", style: { "--p": cur / (GX_STORY.length - 1) } }, GX_STORY.map((d, i) => /* @__PURE__ */ React.createElement("button", { key: d[0], type: "button", className: i === cur ? "on" : i < cur ? "past" : "", onClick: () => {
    setAuto(false);
    setCur(i);
  } }, /* @__PURE__ */ React.createElement("i", null), d[0]))), /* @__PURE__ */ React.createElement("div", { className: "gx-dtx" }, /* @__PURE__ */ React.createElement("h3", null, GX_STORY[cur][1]), /* @__PURE__ */ React.createElement("p", null, GX_STORY[cur][2])));
}
function GxGroups({ onOpen }) {
  return /* @__PURE__ */ React.createElement(GxRail, { className: "gx-pr" }, GX_GROUPS.map(([name, items], i) => /* @__PURE__ */ React.createElement("article", { key: name, className: "gx-it" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-card gx-grp", "aria-label": name + ", " + items.length + " functions", onClick: () => onOpen(name, items) }, /* @__PURE__ */ React.createElement("span", { className: "hd" }, /* @__PURE__ */ React.createElement("b", null, gxPad(items.length)), /* @__PURE__ */ React.createElement("i", null, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))), /* @__PURE__ */ React.createElement("ul", null, items.slice(0, 5).map((f) => /* @__PURE__ */ React.createElement("li", { key: f.n }, f.n)), items.length > 5 ? /* @__PURE__ */ React.createElement("li", { className: "more" }, "+ " + (items.length - 5) + " more") : null)), /* @__PURE__ */ React.createElement("div", { className: "gx-capt" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, gxPad(i + 1)), /* @__PURE__ */ React.createElement("p", null, name)))));
}
function GxWalk({ src, title }) {
  const fr = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const t0 = Date.now();
    let id = 0, shown = false;
    const tick = () => {
      let d = null;
      try {
        d = fr.current && fr.current.contentDocument;
      } catch (e) {
      }
      if (d && d.head && !d.getElementById("gx-walk-css")) {
        const st = d.createElement("style");
        st.id = "gx-walk-css";
        st.textContent = "[data-omelette-chrome]{display:none!important}html,body{background:#0B0B0C!important}";
        d.head.appendChild(st);
      }
      const root = d && d.getElementById("root");
      if (!shown && (root && root.children.length || Date.now() - t0 > 8e3)) {
        shown = true;
        setTimeout(() => setOn(true), 200);
      }
      if (Date.now() - t0 < 2e4) id = setTimeout(tick, shown ? 500 : 100);
    };
    tick();
    return () => clearTimeout(id);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "gx-frame gx-film gx-rv" }, /* @__PURE__ */ React.createElement("iframe", { ref: fr, src, title, loading: "eager", scrolling: "no", tabIndex: -1, style: { opacity: on ? 1 : 0 } }));
}
function GxModal({ m, onClose }) {
  const { Kicker } = GS;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    ref.current && ref.current.focus();
    return () => {
      removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);
  const single = m.rows.length === 1;
  return ReactDOM.createPortal(
    /* @__PURE__ */ React.createElement("div", { className: "gx gx-scrim", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "gx-modal", role: "dialog", "aria-modal": "true", "aria-label": m.title, tabIndex: -1, ref, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "gx-mtop" }, /* @__PURE__ */ React.createElement(Kicker, null, m.cat, single ? "" : " · " + m.rows.length + " parts"), /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-x", "aria-label": "Close", onClick: onClose }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" })))), /* @__PURE__ */ React.createElement("h3", null, m.title), single ? /* @__PURE__ */ React.createElement("p", { className: "gx-lede" }, m.rows[0].d) : /* @__PURE__ */ React.createElement("div", { className: "rows" }, m.rows.map((r) => /* @__PURE__ */ React.createElement("div", { key: r.n }, /* @__PURE__ */ React.createElement("h4", null, r.n), /* @__PURE__ */ React.createElement("p", null, r.d)))))),
    document.body
  );
}
function GxLogo() {
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
  return /* @__PURE__ */ React.createElement("div", { className: "gx-b logo gx-rv", ref }, k > 0 && /* @__PURE__ */ React.createElement("div", { className: "lu", key: k }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/gov/mark-signal-animated.svg?r=" + k, alt: "Govscape mark" }), /* @__PURE__ */ React.createElement("span", null, "Govscape")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-replay", onClick: () => setK(k + 1) }, "Replay"));
}
function GxPage() {
  const { Kicker, Eyebrow, WebButton, AppIcon, Stat, Rung, Icon, Lockup } = GS;
  const [modal, setModal] = React.useState(null);
  const close = React.useCallback(() => setModal(null), []);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }), { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".gx-rv").forEach((el) => io.observe(el));
    gxFitAll();
    addEventListener("resize", gxFitAll);
    addEventListener("load", gxFitAll);
    document.fonts && document.fonts.ready.then(gxFitAll);
    return () => {
      io.disconnect();
      removeEventListener("resize", gxFitAll);
    };
  }, []);
  const open = (cat, title, rows) => {
    if (rows === "portal") {
      const el = document.getElementById("portal");
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
    } else setModal({ cat, title, rows });
  };
  const campaign = [
    ["Mailers", "Eleven transactional templates through one shared shell.", "3/4", /* @__PURE__ */ React.createElement(GxEmail, null)],
    ["Help centre", "48 guides in 12 categories.", "3/4", /* @__PURE__ */ React.createElement(GxHelp, null)],
    ["Training videos", "A 7½-minute walkthrough film in ten chapters.", "16/10", /* @__PURE__ */ React.createElement(GxFilm, null)],
    ["Sample board report", "A complete worked example of the client-facing output.", "3/4", /* @__PURE__ */ React.createElement(GxReport, null)],
    ["Journal programme", "Five long-form articles on the marketing site.", "1/1", /* @__PURE__ */ React.createElement(GxJournal, null)]
  ];
  let n = 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, modal && /* @__PURE__ */ React.createElement(GxModal, { m: modal, onClose: close }), /* @__PURE__ */ React.createElement("header", { className: "gx-hero", "data-screen-label": "01 Hero" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "ic gx-rv" }, /* @__PURE__ */ React.createElement(AppIcon, { size: 84, background: "var(--ink)", markColor: "var(--signal)" })), /* @__PURE__ */ React.createElement("div", { className: "gx-eb gx-rv" }, /* @__PURE__ */ React.createElement(Eyebrow, { tone: "light" }, "Govscape · Case study")), /* @__PURE__ */ React.createElement("h1", { className: "w-h1 gx-rv" }, "437,000 items. 113 decisions. ", /* @__PURE__ */ React.createElement("em", null, "Three minutes.")), /* @__PURE__ */ React.createElement("p", { className: "w-sub gx-rv" }, "Govscape gives a consultancy one workspace for every client it advises. It scores each client across four areas, puts an annual cost on every weakness and maps the evidence to eight standards, clause by clause."), /* @__PURE__ */ React.createElement("p", { className: "gx-role gx-rv" }, "Designed, built and run by Benjamin Brown."), /* @__PURE__ */ React.createElement("div", { className: "gx-cta gx-rv" }, /* @__PURE__ */ React.createElement("a", { href: "#how" }, /* @__PURE__ */ React.createElement(WebButton, null, "See how it works")), /* @__PURE__ */ React.createElement("a", { href: "https://govscape.app", target: "_blank", rel: "noopener" }, /* @__PURE__ */ React.createElement(WebButton, { variant: "lined" }, "Visit Govscape"))), /* @__PURE__ */ React.createElement("div", { className: "gx-lead" }, /* @__PURE__ */ React.createElement("figure", { className: "gx-lead-ph gx-rv" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/gov/hero-analyst-desk.jpg", alt: "An analyst at her desk, studying figures on a monitor" })), /* @__PURE__ */ React.createElement(GxWalk, { src: "/site/assets/web/gov-walkthrough.html", title: "Govscape app walkthrough" })), /* @__PURE__ */ React.createElement("dl", { className: "gx-meta gx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Status"), /* @__PURE__ */ React.createElement("dd", null, "Live with a paying customer")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Deliverables"), /* @__PURE__ */ React.createElement("dd", null, GX_TOTAL)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Built for"), /* @__PURE__ */ React.createElement("dd", null, "Consultancies and their clients")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Product"), /* @__PURE__ */ React.createElement("dd", null, "Data and AI governance platform"))))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec gx-say", "data-screen-label": "02 Statement" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "gx-eb gx-rv" }, /* @__PURE__ */ React.createElement(Kicker, null, "The project")), /* @__PURE__ */ React.createElement(GxRead, { text: "Evidence, not opinion. Nothing reaches a score, a figure or a report until a person has approved it." }), /* @__PURE__ */ React.createElement("div", { className: "gx-ledes gx-rv" }, /* @__PURE__ */ React.createElement("p", { className: "gx-lede" }, "Scores are computed from approved evidence, accepted clause mappings and confirmed inputs. Never from anything a person has not signed off. Every engine figure starts as a draft. Approval is a hard gate."), /* @__PURE__ */ React.createElement("p", { className: "gx-lede" }, "The build runs to 79 data models, around 310 API routes, 60 screens and 395 framework clauses. It is live with a paying customer, whose governance score moved from 4 to 13 after they approved 113 evidence items themselves on 6 November.")), /* @__PURE__ */ React.createElement("figure", { className: "gx-photo gx-rv" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/gov/people-08-pair-at-display.jpg", alt: "Two colleagues reviewing figures on a large display", loading: "lazy" })), /* @__PURE__ */ React.createElement("p", { className: "gx-cap gx-rv" }, /* @__PURE__ */ React.createElement("b", null, "The client meeting."), " Where a consultant is asked where exactly things stand."))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec", id: "how", style: { paddingTop: 0 }, "data-screen-label": "03 How it works" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "How it works", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Connect, review, ", /* @__PURE__ */ React.createElement("em", null, "defend.")), lede: "The scan finds it. A person approves it. The figure carries its source into the report." }), /* @__PURE__ */ React.createElement("div", { className: "gx-rows" }, /* @__PURE__ */ React.createElement("div", { className: "gx-row gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-pan" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(GxConnect, null))), /* @__PURE__ */ React.createElement("div", { className: "gx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "01 · Connect"), /* @__PURE__ */ React.createElement("h3", null, "See the scale first."), /* @__PURE__ */ React.createElement("p", null, "Connecting runs a quick count first, so a consultant sees the scale before committing to a full scan. ", /* @__PURE__ */ React.createElement("b", null, "It asks only for the permissions the scan uses.")), /* @__PURE__ */ React.createElement(GxResult, { items: [["437k", "Items in one scan"]] }))), /* @__PURE__ */ React.createElement("div", { className: "gx-row flip gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-pan" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(GxQueue, null))), /* @__PURE__ */ React.createElement("div", { className: "gx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "02 · Review"), /* @__PURE__ */ React.createElement("h3", null, "A person signs it off."), /* @__PURE__ */ React.createElement("p", null, "Suggested evidence links arrive in a queue ordered by how much each decision unblocks. ", /* @__PURE__ */ React.createElement("b", null, "Nothing counts towards a score until someone approves it.")), /* @__PURE__ */ React.createElement(GxResult, { items: [["113", "Approvals in three minutes"]] }))), /* @__PURE__ */ React.createElement("div", { className: "gx-row gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-pan ink" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(GxFigureCard, null))), /* @__PURE__ */ React.createElement("div", { className: "gx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "03 · Defend"), /* @__PURE__ */ React.createElement("h3", null, "Every figure shows its working."), /* @__PURE__ */ React.createElement("p", null, "Each figure can be opened to show whether it was measured from the client's own data or derived from a sector benchmark. ", /* @__PURE__ */ React.createElement("b", null, "Reports print the citation next to the number.")), /* @__PURE__ */ React.createElement(GxResult, { items: [["395", "Framework clauses"]] })))))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec gx-tint", id: "story", "data-screen-label": "04 Customer" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "Live customer validation", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "113 decisions in ", /* @__PURE__ */ React.createElement("em", null, "three minutes.")), lede: GD.stratMore[1].d }), /* @__PURE__ */ React.createElement(GxStory, null))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec", id: "portal", "data-screen-label": "05 Portal" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "The portal", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Sixty screens. ", /* @__PURE__ */ React.createElement("em", null, "One workspace per client.")), lede: `${GD.portal.length} functions sit inside the online portal, with ${GD.m365.length} more in the Office 365 integration. Pick a group to read what each one does.` }), /* @__PURE__ */ React.createElement(GxGroups, { onOpen: (name, items) => setModal({ cat: "The portal", title: name, rows: items }) }), /* @__PURE__ */ React.createElement("div", { className: "gx-note gx-rv" }, /* @__PURE__ */ React.createElement(Icon, { name: "alldata", spark: false }), /* @__PURE__ */ React.createElement("span", null, GX_CONNECTOR)))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec sec--dark", id: "engineering", "data-screen-label": "06 Engineering" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { dark: true, kicker: "Under the hood", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Built so a figure ", /* @__PURE__ */ React.createElement("em", null, "can be checked.")), lede: "The engine logic is tested at the function level because a wrong figure in a board report is the worst available failure." }), /* @__PURE__ */ React.createElement("div", { className: "pstats gx-nums gx-rv" }, /* @__PURE__ */ React.createElement(Stat, { value: "79", label: "Data models", accent: true }), /* @__PURE__ */ React.createElement(Stat, { value: "~310", label: "API routes" }), /* @__PURE__ */ React.createElement(Stat, { value: "66", label: "End-to-end specs" }), /* @__PURE__ */ React.createElement(Stat, { value: "432", label: "Unit test files" })), /* @__PURE__ */ React.createElement("div", { className: "gx-eng" }, /* @__PURE__ */ React.createElement("div", { className: "gx-acc gx-rv" }, GX_ENG.map(([t, rows], i) => /* @__PURE__ */ React.createElement("details", { key: t, name: "gx-eng", open: i === 0 }, /* @__PURE__ */ React.createElement("summary", null, t, /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("div", { className: "bd" }, rows.length === 1 ? /* @__PURE__ */ React.createElement("p", null, rows[0].d) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, rows.map((r) => r.n).join(" · ")), /* @__PURE__ */ React.createElement("button", { type: "button", className: "gx-more", onClick: () => setModal({ cat: "Engineering", title: t, rows }) }, `Read all ${rows.length}`)))))), /* @__PURE__ */ React.createElement("div", { className: "gx-stack gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "gx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Surfaces"), /* @__PURE__ */ React.createElement("div", { className: "gx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Portal"), /* @__PURE__ */ React.createElement("b", null, "Share links"), /* @__PURE__ */ React.createElement("b", null, "Partner portal"), /* @__PURE__ */ React.createElement("b", null, "PDF reports"), /* @__PURE__ */ React.createElement("b", null, "Email"))), /* @__PURE__ */ React.createElement("div", { className: "gx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Records"), /* @__PURE__ */ React.createElement("div", { className: "gx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Evidence"), /* @__PURE__ */ React.createElement("b", null, "Controls"), /* @__PURE__ */ React.createElement("b", null, "Clauses"), /* @__PURE__ */ React.createElement("b", null, "Registers"), /* @__PURE__ */ React.createElement("b", null, "Findings"), /* @__PURE__ */ React.createElement("b", null, "Audit log"))), /* @__PURE__ */ React.createElement("div", { className: "gx-lay ag" }, /* @__PURE__ */ React.createElement("span", null, "Agent layer"), /* @__PURE__ */ React.createElement("div", { className: "gx-chips" }, /* @__PURE__ */ React.createElement("b", null, "AI Advisor"), /* @__PURE__ */ React.createElement("b", null, "Policy extraction"), /* @__PURE__ */ React.createElement("b", null, "Support agent"), /* @__PURE__ */ React.createElement("b", null, "LLM guardrails"))), /* @__PURE__ */ React.createElement("div", { className: "gx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Scheduled jobs"), /* @__PURE__ */ React.createElement("div", { className: "gx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Snapshots"), /* @__PURE__ */ React.createElement("b", null, "Rescans"), /* @__PURE__ */ React.createElement("b", null, "Identity posture"), /* @__PURE__ */ React.createElement("b", null, "Digests"), /* @__PURE__ */ React.createElement("b", null, "Reconciliation"))), /* @__PURE__ */ React.createElement("div", { className: "gx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Platform"), /* @__PURE__ */ React.createElement("div", { className: "gx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Supabase"), /* @__PURE__ */ React.createElement("b", null, "Vercel"), /* @__PURE__ */ React.createElement("b", null, "Anthropic"), /* @__PURE__ */ React.createElement("b", null, "OpenAI"), /* @__PURE__ */ React.createElement("b", null, "Resend"), /* @__PURE__ */ React.createElement("b", null, "Sentry"), /* @__PURE__ */ React.createElement("b", null, "Upstash"), /* @__PURE__ */ React.createElement("b", null, "Microsoft"))))))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec", id: "brand", "data-screen-label": "07 Brand" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "Brand", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Paper, ink, bone and ", /* @__PURE__ */ React.createElement("em", null, "one red.")), lede: GD.brand[0].d }), /* @__PURE__ */ React.createElement("div", { className: "gx-bento" }, /* @__PURE__ */ React.createElement(GxLogo, null), /* @__PURE__ */ React.createElement("div", { className: "gx-b gx-rv", style: { background: "var(--signal)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Signal"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#F5391B")), /* @__PURE__ */ React.createElement("div", { className: "gx-b gx-rv", style: { background: "var(--ink)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Ink"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#0B0B0C")), /* @__PURE__ */ React.createElement("div", { className: "gx-b gx-rv" }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Bone"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#F6F5F2")), /* @__PURE__ */ React.createElement("div", { className: "gx-b gx-rv", style: { background: "var(--paper)", boxShadow: "inset 0 0 0 1px var(--line)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Paper"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#FFFFFF")), /* @__PURE__ */ React.createElement("div", { className: "gx-b ty gx-rv" }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Archivo"), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("span", { className: "aa" }, "Aa"), /* @__PURE__ */ React.createElement("span", { className: "v", style: { color: "var(--slate)" } }, "£2,875,313 · 395 clauses · 6 Nov 2026"))), /* @__PURE__ */ React.createElement("div", { className: "gx-b ic gx-rv" }, ["govern", "quality", "realtime", "alldata", "accredit", "advisor"].map((i) => /* @__PURE__ */ React.createElement(Icon, { key: i, name: i, size: 34, spark: i === "advisor" }))), /* @__PURE__ */ React.createElement("div", { className: "gx-b ai gx-rv" }, /* @__PURE__ */ React.createElement(AppIcon, { size: 96, background: "var(--ink)", markColor: "#FFFFFF" }))), /* @__PURE__ */ React.createElement("figure", { className: "gx-photo gx-rv" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/gov/truth-01-magnifier-figures.jpg", alt: "A magnifier over a page of figures", loading: "lazy" })), /* @__PURE__ */ React.createElement("p", { className: "gx-cap gx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Imagery."), " From the Govscape imagery library."))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec gx-tint", id: "launch", "data-screen-label": "08 Launch" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "Strategy", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "From research ", /* @__PURE__ */ React.createElement("em", null, "to a live customer.")), lede: "Shipping was a gate. It took evidence to pass." }, /* @__PURE__ */ React.createElement(GxResult, { items: [["4 to 13", "A customer's score, after approval"]] })), /* @__PURE__ */ React.createElement("div", { className: "gx-desk gx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "scr" }, /* @__PURE__ */ React.createElement(GxScaled, { width: 1360 }, /* @__PURE__ */ React.createElement(GxSite, null)))), /* @__PURE__ */ React.createElement("p", { className: "gx-cap gx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Marketing site."), " Every claim traceable to the claims register. Home, product, partners, journal and the sector pages."), /* @__PURE__ */ React.createElement("div", { className: "gx-hl gx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Kicker, null, "Content"), /* @__PURE__ */ React.createElement("h2", { className: "gx-h2" }, "Everything that went out."))), /* @__PURE__ */ React.createElement(GxRail, { className: "gx-cm" }, campaign.map(([k, t, ar, body]) => /* @__PURE__ */ React.createElement("article", { key: k, className: "gx-it" }, /* @__PURE__ */ React.createElement("div", { className: "gx-card", style: { aspectRatio: ar } }, /* @__PURE__ */ React.createElement(GxFitCard, { ar }, body)), /* @__PURE__ */ React.createElement("div", { className: "gx-capt" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, k), /* @__PURE__ */ React.createElement("p", null, t))))), /* @__PURE__ */ React.createElement("div", { className: "ladder gx-rv gx-rung-wrap" }, [...GD.strategy, ...GD.stratMore].map((s, i) => /* @__PURE__ */ React.createElement(Rung, { key: s.n, n: gxPad(i + 1), title: s.n }, s.d))), /* @__PURE__ */ React.createElement("div", { className: "gx-pair gx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, GD.marketing[2].n), /* @__PURE__ */ React.createElement("p", null, GD.marketing[2].d)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, GD.marketing[3].n), /* @__PURE__ */ React.createElement("p", null, GD.marketing[3].d))))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec", id: "method", "data-screen-label": "09 The method, applied" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(GxHead, { kicker: "The method", title: /* @__PURE__ */ React.createElement(React.Fragment, null, "Ten questions. ", /* @__PURE__ */ React.createElement("em", null, GX_TOTAL, " answers.")), lede: "Every project gets looked at through the same ten areas, in the same order. This is what each one produced here. Open any item to read what sits under it." }), /* @__PURE__ */ React.createElement("div", { className: "gx-mt" }, ["Direction", "Foundations", "Customer", "Build"].map((stg, si) => /* @__PURE__ */ React.createElement("div", { key: stg, className: "gx-mt-st" }, /* @__PURE__ */ React.createElement("div", { className: "gx-mt-k gx-rv" }, /* @__PURE__ */ React.createElement("span", null, "Stage ", si + 1), /* @__PURE__ */ React.createElement("b", null, stg), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("div", { className: "gx-dl gx-mt-g" }, GX_METHOD.filter((a) => a[0] === stg).map(([, num, area, q, items, res]) => /* @__PURE__ */ React.createElement("div", { key: num, className: "gx-ar gx-rv" + (items.length ? "" : " dim") }, /* @__PURE__ */ React.createElement("h4", null, /* @__PURE__ */ React.createElement("span", null, num, " · ", area), /* @__PURE__ */ React.createElement("span", null, gxPad(items.length))), /* @__PURE__ */ React.createElement("p", { className: "gx-ar-q" }, q), items.length ? /* @__PURE__ */ React.createElement("ul", null, items.map((name) => {
    n++;
    const [cat, rows] = GX_LOOK[name] || [];
    return /* @__PURE__ */ React.createElement("li", { key: name }, rows ? /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => open(cat, name, rows) }, /* @__PURE__ */ React.createElement("i", null, gxPad(n)), name, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: rows === "portal" ? "M5 12h14M13 6l6 6-6 6" : "M12 5v14M5 12h14" }))) : /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("i", null, gxPad(n)), name));
  })) : null, /* @__PURE__ */ React.createElement(GxResult, { items: [res] }))))))), /* @__PURE__ */ React.createElement("div", { className: "gx-mt-ft gx-rv" }, /* @__PURE__ */ React.createElement("a", { href: "/method" }, "See the method ", /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "→"))))), /* @__PURE__ */ React.createElement("section", { className: "gx-sec gx-tint gx-end", "data-screen-label": "10 End" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "gx-eb gx-rv" }, /* @__PURE__ */ React.createElement(Kicker, null, "Govscape")), /* @__PURE__ */ React.createElement("h2", { className: "gx-h gx-rv", style: { maxWidth: "16ch" } }, "Which of your numbers could you ", /* @__PURE__ */ React.createElement("em", null, "defend today?")), /* @__PURE__ */ React.createElement("div", { className: "gx-cta gx-rv" }, /* @__PURE__ */ React.createElement("a", { href: "/contact" }, /* @__PURE__ */ React.createElement(WebButton, null, "Let's talk")), /* @__PURE__ */ React.createElement("a", { href: "https://govscape.app", target: "_blank", rel: "noopener" }, /* @__PURE__ */ React.createElement(WebButton, { variant: "lined" }, "Visit Govscape"))), /* @__PURE__ */ React.createElement("a", { className: "gx-next gx-rv", href: "/work/warrantyos" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "lb" }, "Next project"), /* @__PURE__ */ React.createElement("h2", null, "WarrantyOS"), /* @__PURE__ */ React.createElement("span", { className: "gx-go" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })))), /* @__PURE__ */ React.createElement("div", { className: "media" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/warrantyos-team.jpg", alt: "Three colleagues talking as they walk through a car showroom", loading: "lazy" }))))));
}
ReactDOM.createRoot(document.getElementById("gx-root")).render(/* @__PURE__ */ React.createElement(GxPage, null));
