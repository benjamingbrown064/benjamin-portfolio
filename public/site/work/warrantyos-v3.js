const WX = window.WarrantyOSDesignSystem_376f0b;
const WX_DELIV = [
  ["Product", ["Bespoke CRM", "Dealer portal", "Customer portal", "Support application", "AI phone system", "AI live chat", "AI customer support"]],
  ["Engineering", ["Security", "Automated testing", "WhatsApp integration", "Stripe integration", "Resend integration", "DVLA integration"]],
  ["Strategy", ["Research", "Commercial model", "Go-to-market", "Onboarding"]],
  ["Brand", ["Brand guidelines", "Animated logo", "Imagery"]],
  ["Content", ["Training videos", "Agentic voiceovers", "Help centre"]],
  ["Marketing", ["Marketing site", "Social campaign", "Mailers", "Ad campaign", "Lead generation"]]
];
const wxPad = (n) => String(n).padStart(2, "0");
const WX_PERIOD = "[PERIOD: what dates these figures cover]";
const WX_METHOD = [
  ["Direction", "01", "Business management and strategy", "Where are you, and where do you want to be?", ["Research", "Commercial model", "Go-to-market"], ["£15", "Per guarantee sold"]],
  ["Direction", "02", "Financial", "Where is money made, lost and stuck?", ["Stripe integration"], ["£1.74m", "Gross profit"]],
  ["Foundations", "03", "Operations", "How does the work get done today?", ["Onboarding", "Training videos", "Agentic voiceovers"], ["8", "Person team"]],
  ["Foundations", "04", "Data", "What does the business know, and can it be trusted?", ["Bespoke CRM", "DVLA integration"], ["21k+", "Customers"]],
  ["Foundations", "05", "Compliance and governance", "What must not be broken?", ["Security"], ["48h", "Longest wait for a claim update"]],
  ["Customer", "06", "Product development", "Is what you sell what people want?", ["Dealer portal", "Customer portal", "Support application"], ["7", "Parts, one app"]],
  ["Customer", "07", "Marketing and brand", "Do the right people know it exists?", ["Brand guidelines", "Animated logo", "Imagery", "Marketing site", "Social campaign", "Mailers", "Ad campaign"], ["[RESULT]", ""]],
  ["Customer", "08", "Sales", "Does interest turn into revenue you can forecast?", ["Lead generation"], ["162", "Dealers"]],
  ["Customer", "09", "Customer support", "Do customers stay, and can you cope with more of them?", ["AI phone system", "AI live chat", "AI customer support", "Help centre", "WhatsApp integration"], ["3.1k", "Claims handled"]],
  ["Build", "10", "Technical development", "What needs building, and in what order?", ["Automated testing", "Resend integration"], ["4", "Integrations"]]
];
const WX_TOTAL = WX_METHOD.reduce((n, a) => n + a[4].length, 0);
const wxReal = (v) => v && !/^\[/.test(String(v));
function WxResult({ items, className }) {
  const r = (items || []).filter((x) => x && wxReal(x[0]) && x[1]);
  if (!r.length) return null;
  return /* @__PURE__ */ React.createElement("dl", { className: "wx-res" + (className ? " " + className : "") }, r.map(([v, l]) => /* @__PURE__ */ React.createElement("div", { key: l }, /* @__PURE__ */ React.createElement("dt", null, l), /* @__PURE__ */ React.createElement("dd", null, v))));
}
const WX_PRODUCTS = [
  ["people", "Bespoke CRM", "One record for every customer.", "Policies, claims, calls and messages sit against the customer and the car they belong to."],
  ["dealer", "Dealer portal", "Register it at the point of sale.", "Enter the registration, issue the certificate and see the fund from one screen."],
  ["cover", "Customer portal", "In the dealer's name.", "What's covered, what to do and who to call, with the dealer's name first."],
  ["claim", "Support application", "Decided the same day.", "The dealer's claims team sees each claim checked against the policy wording and service history."],
  ["live", "AI phone system", "Every call answered.", "It finds the policy, opens the claim and books a call back with the dealer's team."],
  ["support", "AI live chat", "On the dealer's own site.", "Answers cover questions day and night, in the dealer's voice."],
  ["complete", "AI customer support", "Drafted by AI, sent by a person.", "Replies are written from the policy wording, then checked before they go."]
];
const WX_DETAIL = [
  [["people", "Every customer, car, policy and claim in one record"], ["mail", "Calls, chats, emails and WhatsApp messages in one timeline"], ["renewals", "Renewal and follow-up tasks for the team"], ["ledger", "Notes everyone at the dealership can see"], ["lock", "Team roles, so everyone sees what they need"]],
  [["onboard", "Enter the registration and the car fills itself in"], ["cover", "Register a policy, with the certificate issued on save"], ["live", "Policy list with live status"], ["growth", "Fund position, recommended balance and renewals due"], ["lock", "Team sign-in, with roles for sales and service"]],
  [["cover", "What's covered, component by component, in plain English"], ["claim", "Make a claim with the fault, mileage and photos"], ["cycle", "Claim status, updated as it moves"], ["exportd", "Certificate and policy documents to download"], ["renewals", "Renew cover online"]],
  [["reports", "Every claim from every channel in one list, with the most urgent first"], ["ledger", "Each claim checked against the exact wording the customer bought and the service history"], ["complete", "Approve or decline, with the clause cited"], ["people", "A second sign-off for anything unusual"], ["mail", "Customer and garage told the moment it is decided"], ["lock", "A record of every decision and who made it"]],
  [["live", "Answers every call, day and night"], ["lock", "Checks who is calling before sharing any details"], ["cover", "Finds the policy by name, registration or policy number"], ["claim", "Opens a claim and takes down the fault"], ["support", "Books a call back with the dealer's team"], ["ledger", "Saves a summary and the transcript to the customer's record"]],
  [["dealer", "Sits on the dealer's own site, in the dealer's name"], ["cover", "Answers cover questions from the policy wording and approved answers"], ["claim", "Starts a claim or a renewal, and takes photos and documents"], ["people", "Passes the conversation to the dealer's team when it should, with a time to reply by"], ["ledger", "Saves every chat to the customer's record"]],
  [["exportd", "Reads incoming emails and messages, and files documents on the right claim"], ["cycle", "Chases missing evidence so claims don't stall"], ["support", "Drafts a reply from the policy and the claim history"], ["complete", "A person checks it and sends it"], ["dealer", "Writes in the dealer's voice"], ["ledger", "Logs every reply to the customer's record"]]
];
const WX_USES = [["Resend", "WhatsApp"], ["Stripe", "Resend", "DVLA"], ["WhatsApp", "Resend"], ["WhatsApp", "Resend"], ["WhatsApp"], ["WhatsApp"], ["Resend", "WhatsApp"]];
function WxModal({ i, onClose, onGo }) {
  const { Tile, MicroLabel, Pill, Button } = WX;
  const ref = React.useRef(null);
  React.useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onGo(1);
      if (e.key === "ArrowLeft") onGo(-1);
    };
    addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    ref.current && ref.current.focus();
    return () => {
      removeEventListener("keydown", k);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onGo]);
  const [g, name, line, more] = WX_PRODUCTS[i];
  return ReactDOM.createPortal(
    /* @__PURE__ */ React.createElement("div", { className: "wx-scrim", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "wx-modal", role: "dialog", "aria-modal": "true", "aria-label": name, tabIndex: -1, ref, key: i, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "wx-mtop" }, /* @__PURE__ */ React.createElement(Tile, { glyph: g, tone: "card" }), /* @__PURE__ */ React.createElement(MicroLabel, null, "Part ", wxPad(i + 1), " of ", wxPad(WX_PRODUCTS.length)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-x", "aria-label": "Close", onClick: onClose }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" })))), /* @__PURE__ */ React.createElement("h3", null, name), /* @__PURE__ */ React.createElement("p", { className: "wx-lede" }, /* @__PURE__ */ React.createElement("b", null, line), " ", more), /* @__PURE__ */ React.createElement("div", { className: "wx-mpart" }, /* @__PURE__ */ React.createElement(MicroLabel, { strong: true }, "What makes it up"), /* @__PURE__ */ React.createElement("ul", { className: "wx-parts" }, WX_DETAIL[i].map(([pg, txt]) => /* @__PURE__ */ React.createElement("li", { key: txt }, /* @__PURE__ */ React.createElement(Tile, { glyph: pg, tone: "card", size: 40, glyphSize: 20 }), /* @__PURE__ */ React.createElement("span", null, txt))))), /* @__PURE__ */ React.createElement("div", { className: "wx-muse" }, /* @__PURE__ */ React.createElement(MicroLabel, null, "Works with"), /* @__PURE__ */ React.createElement("div", null, WX_USES[i].map((u) => /* @__PURE__ */ React.createElement(Pill, { key: u }, u)))), /* @__PURE__ */ React.createElement("div", { className: "wx-mft" }, /* @__PURE__ */ React.createElement(Button, { variant: "outline", onClick: () => onGo(-1) }, "Previous"), /* @__PURE__ */ React.createElement(Button, { onClick: () => onGo(1) }, "Next")))),
    document.body
  );
}
const WX_ENG = [
  ["Security", "Every request checks which dealer is asking before it touches a policy, a claim or the fund."],
  ["Automated testing", "Nothing ships until the checks pass."],
  ["Second sign-off", "Unusual claims and exceptions need a second person before they go through."],
  ["Promised updates", "Every promise to a customer has a clock on it, and open claims get an update at least every 48 hours."],
  ["WhatsApp integration", "Claim updates reach the customer where they already talk to the dealer."],
  ["Stripe integration", "The WarrantyOS fee is collected per policy. Premiums stay with the dealer."],
  ["Resend integration", "Certificates, renewal reminders and claim emails go out in the dealer's name."],
  ["DVLA integration", "Enter the registration and the car's details fill themselves in."]
];
const WX_DAY = [
  ["09:00", "The sale closes.", "The dealer enters the registration and registers the policy at the desk in minutes.", () => /* @__PURE__ */ React.createElement(WxRegister, null)],
  ["09:01", "The certificate goes out.", "It arrives by email with the dealer's name on it. WarrantyOS endorses.", () => /* @__PURE__ */ React.createElement(WxCert, null)],
  ["14:20", "The customer calls.", "The AI phone system finds the policy, opens a claim and books the car into the garage.", () => /* @__PURE__ */ React.createElement(WxCall, null)],
  ["14:50", "The estimate arrives.", "The garage sends the diagnosis and estimate, and it is filed on the claim.", () => /* @__PURE__ */ React.createElement(WxEstimate, null)],
  ["15:05", "The claim is decided.", "The dealer's claims team checks it against the policy, sees the clause and approves it.", () => /* @__PURE__ */ React.createElement(WxDecision, null)],
  ["15:06", "The customer hears first.", "The decision goes out on WhatsApp before they think to chase it.", () => /* @__PURE__ */ React.createElement(WxMessage, null)]
];
function wxFitAll() {
  document.querySelectorAll("[data-fit]").forEach((el) => {
    const p = el.parentElement, cs = getComputedStyle(p);
    const aw = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    el.style.zoom = 1;
    el.style.zoom = Math.min(1, aw / el.offsetWidth, (ah > 40 ? ah : 1e4) / el.offsetHeight);
  });
}
function WxFilm({ src, title, style }) {
  const box = React.useRef(null), fr = React.useRef(null);
  const [s, setS] = React.useState(0), [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const fit = () => setS(box.current.clientWidth / 1920);
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    fit();
    return () => ro.disconnect();
  }, []);
  const load = () => {
    const t0 = Date.now();
    const w = () => {
      let d;
      try {
        d = fr.current.contentDocument;
      } catch (e) {
      }
      const ready = d && d.querySelector("#root") && d.querySelector("#root").children.length && (!d.fonts || d.fonts.status === "loaded");
      if (ready || Date.now() - t0 > 6e3) {
        setTimeout(() => setOn(true), 120);
        return;
      }
      setTimeout(w, 80);
    };
    w();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "wx-film wx-rv", ref: box, style }, /* @__PURE__ */ React.createElement("iframe", { ref: fr, src, title, loading: "eager", scrolling: "no", tabIndex: -1, onLoad: load, style: { position: "absolute", left: 0, top: 0, width: 1920, height: 1080, border: 0, pointerEvents: "none", transformOrigin: "0 0", transform: `scale(${s})`, opacity: on ? 1 : 0, transition: "opacity 320ms var(--ease)" } }));
}
function WxScrollText({ text }) {
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
function WxScrollFrame({ src, title, width = 1440, className, style }) {
  const box = React.useRef(null), fr = React.useRef(null);
  const [f, setF] = React.useState({ s: 0, h: 900 });
  const [on, setOn] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  React.useEffect(() => {
    const fit = () => {
      const b = box.current;
      if (!b || !b.clientWidth) return;
      const sc = b.clientWidth / width;
      setF({ s: sc, h: b.clientHeight / sc });
    };
    const ro = new ResizeObserver(fit);
    ro.observe(box.current);
    fit();
    return () => ro.disconnect();
  }, [width]);
  const doc = () => {
    try {
      return fr.current.contentDocument;
    } catch (err) {
      return null;
    }
  };
  const apply = (v) => {
    const d = doc();
    if (!d) return;
    [d.documentElement, d.body].forEach((el) => {
      if (!el) return;
      el.style.overflowY = v ? "auto" : "hidden";
      el.style.scrollbarWidth = "none";
      el.style.overscrollBehavior = "contain";
    });
    if (!v) {
      fr.current.contentWindow.scrollTo({ top: 0, behavior: "smooth" });
      d.body && d.body.scrollTo && d.body.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const load = () => {
    const d = doc();
    if (d) {
      d.addEventListener("click", (ev) => {
        if (ev.target.closest && ev.target.closest("a")) ev.preventDefault();
      }, true);
      const st = d.createElement("style");
      st.textContent = "::-webkit-scrollbar{display:none}";
      d.documentElement.appendChild(st);
    }
    apply(false);
    setTimeout(() => setOn(true), 300);
  };
  const toggle = () => {
    const v = !scroll;
    setScroll(v);
    apply(v);
  };
  return /* @__PURE__ */ React.createElement("div", { className, ref: box, style: { position: "relative", overflow: "hidden", ...style } }, /* @__PURE__ */ React.createElement("iframe", { ref: fr, src, title, loading: "lazy", tabIndex: scroll ? 0 : -1, onLoad: load, style: { position: "absolute", left: 0, top: 0, width, height: f.h, border: 0, pointerEvents: scroll ? "auto" : "none", transformOrigin: "0 0", transform: `scale(${f.s})`, opacity: on ? 1 : 0, transition: "opacity 320ms var(--ease)" } }), /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-scrollbtn" + (scroll ? " on" : ""), "aria-pressed": scroll, onClick: toggle }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M12 4v16M7 9l5-5 5 5M7 15l5 5 5-5" })), scroll ? "Stop scrolling" : "Scroll"));
}
function WxEyebrow({ children, onDark }) {
  const { Eyebrow } = WX;
  return /* @__PURE__ */ React.createElement("div", { className: "wx-eb" }, /* @__PURE__ */ React.createElement(Eyebrow, { onDark }, children));
}
function WxHead({ eyebrow, title, lede, onDark, children }) {
  return /* @__PURE__ */ React.createElement("div", { className: "wx-h wx-rv" }, /* @__PURE__ */ React.createElement(WxEyebrow, { onDark }, eyebrow), /* @__PURE__ */ React.createElement("h2", null, title), lede ? /* @__PURE__ */ React.createElement("p", { className: "wx-lede" }, lede) : null, children);
}
function WxLink({ href, variant, children, ext }) {
  const { Button } = WX;
  return /* @__PURE__ */ React.createElement("a", { className: "wx-bl", href, ...ext ? { target: "_blank", rel: "noopener" } : {} }, /* @__PURE__ */ React.createElement(Button, { variant, size: "lg" }, children));
}
function WxRail({ className, children }) {
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
function WxDay() {
  const [cur, setCur] = React.useState(0);
  const [auto, setAuto] = React.useState(!matchMedia("(prefers-reduced-motion:reduce)").matches);
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => setVis(e.isIntersecting)), { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    if (!auto || !vis) return;
    const id = setInterval(() => setCur((c) => (c + 1) % WX_DAY.length), 4200);
    return () => clearInterval(id);
  }, [auto, vis]);
  React.useEffect(() => {
    wxFitAll();
  }, [cur]);
  return /* @__PURE__ */ React.createElement("div", { ref }, /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-stage" }, WX_DAY.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: d[0], className: "wx-scene" + (i === cur ? " on" : "") }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, d[3]())))), /* @__PURE__ */ React.createElement("div", { className: "wx-tl", style: { "--p": cur / (WX_DAY.length - 1) } }, WX_DAY.map((d, i) => /* @__PURE__ */ React.createElement("button", { key: d[0], type: "button", className: i === cur ? "on" : i < cur ? "past" : "", onClick: () => {
    setAuto(false);
    setCur(i);
  } }, /* @__PURE__ */ React.createElement("i", null), d[0]))), /* @__PURE__ */ React.createElement("div", { className: "wx-dtx" }, /* @__PURE__ */ React.createElement("h3", null, WX_DAY[cur][1]), /* @__PURE__ */ React.createElement("p", null, WX_DAY[cur][2]))));
}
function WxLogo() {
  const { MonogramMark, Wordmark } = WX;
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
  const vw = Math.min(window.innerWidth, 1400);
  const h = Math.max(36, Math.min(84, vw * 0.06));
  return /* @__PURE__ */ React.createElement("div", { className: "wx-b logo wx-rv", ref }, /* @__PURE__ */ React.createElement("div", { key: k, className: "wx-lu" + (k ? " wx-play" : "") }, /* @__PURE__ */ React.createElement("span", { className: "m" }, /* @__PURE__ */ React.createElement(MonogramMark, { height: h })), /* @__PURE__ */ React.createElement("span", { className: "t" }, /* @__PURE__ */ React.createElement(Wordmark, { size: h, tone: "white" }))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "wx-replay", onClick: () => setK(k + 1) }, "Replay"));
}
function WxCampaign() {
  const { Monogram, Wordmark, MicroLabel, Tile, Glyph, Input, DotList, Card } = WX;
  const items = [
    ["Social campaign", "Your guarantee. Your bank. Your call.", "1/1", /* @__PURE__ */ React.createElement(WoScaled, { width: 1080 }, /* @__PURE__ */ React.createElement(WxSocialAd, null))],
    ["Mailers", "Your own guarantee. Live in 10 minutes.", "3/4", /* @__PURE__ */ React.createElement(WxScrollFrame, { src: "/site/assets/web/wos-mailer.html", title: "WarrantyOS dealer mailer", width: 640, style: { height: "100%", background: "var(--card)" } })],
    ["Ad campaign", "Your name first.", "1/1", /* @__PURE__ */ React.createElement(WoScaled, { width: 1080 }, /* @__PURE__ */ React.createElement(WxImageAd, null))],
    ["Help centre", "Answers before the phone rings.", "3/4", /* @__PURE__ */ React.createElement("div", { style: { background: "#fff", height: "100%", padding: "clamp(22px,2.4vw,32px)", display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement(MicroLabel, null, "Help centre"), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 26, letterSpacing: "-.03em", lineHeight: 1.1 } }, "How can we help?"), /* @__PURE__ */ React.createElement(Input, { placeholder: "Search, e.g. register a policy" }), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "auto" } }, /* @__PURE__ */ React.createElement(MicroLabel, { strong: true }, "Popular"), /* @__PURE__ */ React.createElement(DotList, { style: { marginTop: 12 }, fontSize: 14.5, items: ["Register a policy", "Make a claim", "What's covered", "Renew your cover"] })))],
    ["Training videos", "Short films for the dealer team, voiced by agents.", "16/10", /* @__PURE__ */ React.createElement("div", { style: { background: "var(--ink)", color: "#fff", height: "100%", padding: "clamp(24px,2.6vw,36px)", display: "flex", flexDirection: "column", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement(Tile, { glyph: "onboard", tone: "graphite" }), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink-body)" } }, "Lesson 01 · 04:12")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(MicroLabel, { onDark: true }, "Training · Dealer portal"), /* @__PURE__ */ React.createElement("h3", { style: { marginTop: 10, fontSize: "clamp(28px,3vw,44px)", lineHeight: 1.02, letterSpacing: "-.04em" } }, "Registering your first policy.")))]
  ];
  return /* @__PURE__ */ React.createElement(WxRail, { className: "wx-cm" }, items.map(([k, t, ar, body]) => /* @__PURE__ */ React.createElement("article", { key: k, className: "wx-it" }, /* @__PURE__ */ React.createElement("div", { className: "wx-card", style: { aspectRatio: ar } }, body), /* @__PURE__ */ React.createElement("div", { className: "wx-cap" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, k), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, t))))));
}
function WxPage() {
  const { Monogram, Tile, Glyph, Wordmark } = WX;
  React.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".wx-rv").forEach((el) => io.observe(el));
    wxFitAll();
    addEventListener("resize", wxFitAll);
    addEventListener("load", wxFitAll);
    document.fonts && document.fonts.ready.then(wxFitAll);
    return () => {
      io.disconnect();
      removeEventListener("resize", wxFitAll);
    };
  }, []);
  const [modal, setModal] = React.useState(null);
  const closeM = React.useCallback(() => setModal(null), []);
  const goM = React.useCallback((d) => setModal((m) => (m + d + WX_PRODUCTS.length) % WX_PRODUCTS.length), []);
  let n = 0;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, modal !== null && /* @__PURE__ */ React.createElement(WxModal, { i: modal, onClose: closeM, onGo: goM }), /* @__PURE__ */ React.createElement("header", { className: "wx-hero", "data-screen-label": "01 Hero" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "ic wx-rv" }, /* @__PURE__ */ React.createElement(Monogram, { size: 84 })), /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WxEyebrow, null, "WarrantyOS · Case study")), /* @__PURE__ */ React.createElement("h1", { className: "wx-rv" }, "Eight people. 162 dealers."), /* @__PURE__ */ React.createElement("p", { className: "wx-lede wx-rv" }, "WarrantyOS lets a dealership run its own warranty programme in one app, and keep the margin an administrator would have taken. A team of eight now looks after 21,000 customers across 162 dealers."), /* @__PURE__ */ React.createElement("p", { className: "wx-role wx-rv" }, "Founded, designed, built and run by Ben Brown."), /* @__PURE__ */ React.createElement("div", { className: "wx-cta wx-rv" }, /* @__PURE__ */ React.createElement(WxLink, { href: "#how" }, "See how it works"), /* @__PURE__ */ React.createElement(WxLink, { href: "https://warrantyos.app", variant: "outline", ext: true }, "Visit WarrantyOS")), /* @__PURE__ */ React.createElement("div", { className: "wx-lead" }, /* @__PURE__ */ React.createElement("figure", { className: "wx-lead-ph wx-rv" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/wos/hero-dealer-driver.jpg", alt: "A dealer handing a customer the keys beside her car outside the showroom" })), /* @__PURE__ */ React.createElement(WxFilm, { src: "/site/assets/web/wos-sell-guarantee-fast.html", title: "WarrantyOS dealer portal: selling a guarantee" })), /* @__PURE__ */ React.createElement("dl", { className: "wx-meta wx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Person team"), /* @__PURE__ */ React.createElement("dd", null, "8")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Dealers"), /* @__PURE__ */ React.createElement("dd", null, "162")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Customers"), /* @__PURE__ */ React.createElement("dd", null, "21k+")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Claims handled"), /* @__PURE__ */ React.createElement("dd", null, "3.1k")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Revenue"), /* @__PURE__ */ React.createElement("dd", null, "£4.12m")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("dt", null, "Gross profit"), /* @__PURE__ */ React.createElement("dd", null, "£1.74m"))), wxReal(WX_PERIOD) ? /* @__PURE__ */ React.createElement("p", { className: "wx-period wx-rv" }, WX_PERIOD) : null)), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-say", "data-screen-label": "02 Statement" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WxEyebrow, null, "The project")), /* @__PURE__ */ React.createElement(WxScrollText, { text: "The dealer leads. We endorse. Every policy, claim and certificate in the dealer's name." }), /* @__PURE__ */ React.createElement("p", { className: "wx-lede wx-rv" }, "Most dealerships hand their warranty to an administrator, and the margin, the data and the customer go with it. WarrantyOS keeps all three in the showroom. The premium stays with the dealer, and WarrantyOS charges a fee per policy. Customers mostly meet it second-hand, as a certificate attached to an email from their dealer."), /* @__PURE__ */ React.createElement("figure", { className: "wx-photo wx-rv", style: { marginBottom: 0 } }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/wos/showroom-handover.jpg", alt: "Salesperson handing over keys to a customer in a showroom", loading: "lazy" })), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "The handover."), " Where the warranty is sold."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "how", style: { paddingTop: 0 }, "data-screen-label": "03 How it works" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "How it works", title: "Sold in the showroom. Kept in the showroom.", lede: "The dealer registers the policy, decides the claim and keeps the customer. WarrantyOS does the checking, the paperwork and the chasing." }), /* @__PURE__ */ React.createElement("div", { className: "wx-rows" }, /* @__PURE__ */ React.createElement("div", { className: "wx-row wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan card" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(WxRegister, null))), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "01 · The sale"), /* @__PURE__ */ React.createElement("h3", null, "Register it once."), /* @__PURE__ */ React.createElement("p", null, "Enter the registration and the car fills itself in. The certificate issues on save. ", /* @__PURE__ */ React.createElement("b", null, "The premium goes into the dealer's own fund.")), /* @__PURE__ */ React.createElement(WxResult, { items: [["[RESULT: time to register a policy]", "Time to register"]] }))), /* @__PURE__ */ React.createElement("div", { className: "wx-row flip wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan paper" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(WxClaimCard, null))), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "02 · The claim"), /* @__PURE__ */ React.createElement("h3", null, "Decided the same day."), /* @__PURE__ */ React.createElement("p", null, "Each claim is checked against the exact wording the customer bought and the vehicle's service history, with the clause cited. ", /* @__PURE__ */ React.createElement("b", null, "A person makes the call, not an algorithm.")), /* @__PURE__ */ React.createElement(WxResult, { items: [["3.1k", "Claims handled"]] }))), /* @__PURE__ */ React.createElement("div", { className: "wx-row wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-pan ink" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, /* @__PURE__ */ React.createElement(WxChatCard, null))), /* @__PURE__ */ React.createElement("div", { className: "wx-copy" }, /* @__PURE__ */ React.createElement("span", { className: "n" }, "03 · The customer"), /* @__PURE__ */ React.createElement("h3", null, "In the dealer's name."), /* @__PURE__ */ React.createElement("p", null, "The customer portal, live chat and phone line all speak for the dealer. ", /* @__PURE__ */ React.createElement("b", null, "The dealer's name comes first. WarrantyOS signs off underneath.")), /* @__PURE__ */ React.createElement(WxResult, { items: [["21k+", "Customers"]] })))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey", id: "day", "data-screen-label": "04 A claim" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "A day with WarrantyOS", title: "From the sale to the decision." }), /* @__PURE__ */ React.createElement(WxDay, null))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "product", "data-screen-label": "05 Product" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "The programme", title: "The whole book on one screen.", lede: "The fund position, loss ratio and renewals due, with a recommended balance, so the dealer can see what the warranty is earning and what the fund needs." }, /* @__PURE__ */ React.createElement(WxResult, { items: [["[RESULT: a fund or programme figure]", "Programme"]] })), /* @__PURE__ */ React.createElement(WxFilm, { src: "/site/assets/web/wos-reports-fast.html", title: "WarrantyOS reports: how the book is doing", style: { marginTop: 0 } }), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Programme."), " The shape of the book."), /* @__PURE__ */ React.createElement("div", { className: "wx-hl wx-rv", style: { marginTop: "clamp(104px,12vw,168px)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WX.Eyebrow, null, "Product"), /* @__PURE__ */ React.createElement("h2", null, "One app. Seven jobs.")), /* @__PURE__ */ React.createElement("p", { className: "wx-lede" }, "Everything the dealer, the claims team and the customer touch, built around the same policy record.")), /* @__PURE__ */ React.createElement(WxRail, { className: "wx-pr" }, WX_PRODUCTS.map(([g, k, b, p], wi) => /* @__PURE__ */ React.createElement("article", { key: k, className: "wx-it" }, /* @__PURE__ */ React.createElement("div", { className: "wx-card" }, /* @__PURE__ */ React.createElement("div", { "data-fit": "" }, WX_WIDGETS[wi]())), /* @__PURE__ */ React.createElement("div", { className: "wx-cap" }, /* @__PURE__ */ React.createElement("span", { className: "k" }, k), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, b), " ", p))))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-ink", id: "engineering", "data-screen-label": "06 Engineering" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { onDark: true, eyebrow: "Under the hood", title: "Built to be trusted with the fund.", lede: "The software holds other people's money and promises, so it has to be secure, tested and wired into the tools dealers already use." }), (() => {
    const nums = [["07", "Parts, one app"], ["04", "Integrations"], ["[RESULT: engineering figure 1]", ""], ["[RESULT: engineering figure 2]", ""]].filter((x) => wxReal(x[0]) && x[1]);
    return /* @__PURE__ */ React.createElement("div", { className: "wx-nums wx-rv", style: { gridTemplateColumns: `repeat(${nums.length},minmax(0,1fr))` } }, nums.map(([v, l]) => /* @__PURE__ */ React.createElement("div", { key: l }, /* @__PURE__ */ React.createElement("b", null, v), /* @__PURE__ */ React.createElement("span", null, l))));
  })(), /* @__PURE__ */ React.createElement("div", { className: "wx-eng" }, /* @__PURE__ */ React.createElement("div", { className: "wx-acc wx-rv" }, WX_ENG.map(([t, p], i) => /* @__PURE__ */ React.createElement("details", { key: t, name: "wx-eng", open: i === 0 }, /* @__PURE__ */ React.createElement("summary", null, t, /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("p", null, p)))), /* @__PURE__ */ React.createElement("div", { className: "wx-stack wx-rv" }, /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Surfaces"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Dealer portal"), /* @__PURE__ */ React.createElement("b", null, "Customer portal"), /* @__PURE__ */ React.createElement("b", null, "Support application"), /* @__PURE__ */ React.createElement("b", null, "Bespoke CRM"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Records"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "Policies"), /* @__PURE__ */ React.createElement("b", null, "Certificates"), /* @__PURE__ */ React.createElement("b", null, "Claims"), /* @__PURE__ */ React.createElement("b", null, "Fund"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay ag" }, /* @__PURE__ */ React.createElement("span", null, "Agent layer"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "AI phone system"), /* @__PURE__ */ React.createElement("b", null, "AI live chat"), /* @__PURE__ */ React.createElement("b", null, "AI customer support"))), /* @__PURE__ */ React.createElement("div", { className: "wx-lay" }, /* @__PURE__ */ React.createElement("span", null, "Platform"), /* @__PURE__ */ React.createElement("div", { className: "wx-chips" }, /* @__PURE__ */ React.createElement("b", null, "WhatsApp"), /* @__PURE__ */ React.createElement("b", null, "Stripe"), /* @__PURE__ */ React.createElement("b", null, "Resend"), /* @__PURE__ */ React.createElement("b", null, "DVLA"))))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "brand", "data-screen-label": "07 Brand" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "Brand", title: "Ink, paper, gold. Nothing else.", lede: "Neutrals do the work. Gold appears once per view and marks the thing that matters. The wordmark is set in Outfit, not drawn." }), /* @__PURE__ */ React.createElement("div", { className: "wx-bento" }, /* @__PURE__ */ React.createElement(WxLogo, null), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--ink)", color: "#fff" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Ink"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#0E0E10")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--gold)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Gold"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#F4B352")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "var(--paper)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Paper"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#F4F2ED")), /* @__PURE__ */ React.createElement("div", { className: "wx-b wx-rv", style: { background: "#fff", boxShadow: "inset 0 0 0 1px var(--divider)" } }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "White"), /* @__PURE__ */ React.createElement("span", { className: "v" }, "#FFFFFF")), /* @__PURE__ */ React.createElement("div", { className: "wx-b ty wx-rv" }, /* @__PURE__ */ React.createElement("span", { className: "l" }, "Outfit and Geist Mono"), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement("span", { className: "aa" }, "Aa"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--slate)" } }, "WOS-4468-A · £412,800 · 24 Mar 2026"))), /* @__PURE__ */ React.createElement("div", { className: "wx-b gl wx-rv" }, ["claim", "cover", "dealer", "renewals", "ledger", "support"].map((g) => /* @__PURE__ */ React.createElement(Tile, { key: g, glyph: g, tone: "white", size: 52 }))), /* @__PURE__ */ React.createElement("div", { className: "wx-b ai wx-rv" }, /* @__PURE__ */ React.createElement(Monogram, { size: 96 }))), /* @__PURE__ */ React.createElement("figure", { className: "wx-photo wx-rv" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/wos/technician-workshop.jpg", alt: "Technician working on a car in a workshop", loading: "lazy" })), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Imagery."), " Overcast daylight, real places, mid-task moments."))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey", id: "launch", "data-screen-label": "08 Launch" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "Launch", title: "From research to pipeline.", lede: "The research set the message. The site, the campaign, the mailers and the help centre all say it the same way." }, /* @__PURE__ */ React.createElement(WxResult, { items: [["162", "Dealers"], ["[RESULT: a campaign or pipeline figure]", "Pipeline"]] })), /* @__PURE__ */ React.createElement("div", { className: "wx-desk wx-rv" }, /* @__PURE__ */ React.createElement(WxScrollFrame, { className: "scr", style: { aspectRatio: "16/10", background: "var(--ink)" }, src: "/site/assets/web/wos-home/index.html", title: "WarrantyOS marketing site" })), /* @__PURE__ */ React.createElement("p", { className: "wx-capc wx-rv" }, /* @__PURE__ */ React.createElement("b", null, "Marketing site."), " Where the campaign points."), /* @__PURE__ */ React.createElement("div", { className: "wx-hl wx-rv", style: { marginTop: "clamp(104px,12vw,168px)" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WX.Eyebrow, null, "Campaign"), /* @__PURE__ */ React.createElement("h2", null, "Everything that went out."))), /* @__PURE__ */ React.createElement(WxCampaign, null), /* @__PURE__ */ React.createElement("div", { className: "wx-two wx-rv" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Content"), /* @__PURE__ */ React.createElement("p", null, "Step-by-step guides and training videos for the dealer team, agentic voiceovers and a help centre that answers cover questions before the phone rings.")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "Lead generation"), /* @__PURE__ */ React.createElement("p", null, "A dealer-first outreach motion, backed by agentic customer support that answers every enquiry."))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec", id: "method", "data-screen-label": "09 The method, applied" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement(WxHead, { eyebrow: "The method", title: "Ten questions. 28 answers.", lede: "Every project gets looked at through the same ten areas, in the same order. This is what each one produced here." }), /* @__PURE__ */ React.createElement("div", { className: "wx-mt" }, ["Direction", "Foundations", "Customer", "Build"].map((stg, si) => /* @__PURE__ */ React.createElement("div", { key: stg, className: "wx-mt-st" }, /* @__PURE__ */ React.createElement("div", { className: "wx-mt-k wx-rv" }, /* @__PURE__ */ React.createElement("span", null, "Stage ", si + 1), /* @__PURE__ */ React.createElement("b", null, stg), /* @__PURE__ */ React.createElement("i", null)), /* @__PURE__ */ React.createElement("div", { className: "wx-dl wx-mt-g" }, WX_METHOD.filter((a) => a[0] === stg).map(([, num, name, q, items, res]) => /* @__PURE__ */ React.createElement("div", { key: num, className: "wx-ar wx-rv" + (items.length ? "" : " dim") }, /* @__PURE__ */ React.createElement("h4", null, /* @__PURE__ */ React.createElement("span", null, num, " · ", name), /* @__PURE__ */ React.createElement("span", null, wxPad(items.length))), /* @__PURE__ */ React.createElement("p", { className: "wx-ar-q" }, q), items.length ? /* @__PURE__ */ React.createElement("ul", null, items.map((it) => {
    n++;
    const pi = WX_PRODUCTS.findIndex((p) => p[1] === it);
    return pi > -1 ? /* @__PURE__ */ React.createElement("li", { key: it, className: "wx-li-btn" }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setModal(pi) }, /* @__PURE__ */ React.createElement("span", null, wxPad(n)), it, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M12 5v14M5 12h14" })))) : /* @__PURE__ */ React.createElement("li", { key: it }, /* @__PURE__ */ React.createElement("span", null, wxPad(n)), it);
  })) : null, /* @__PURE__ */ React.createElement(WxResult, { items: [res] }))))))), /* @__PURE__ */ React.createElement("div", { className: "wx-mt-ft wx-rv" }, /* @__PURE__ */ React.createElement("a", { href: "/method" }, "See the method ", /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, "→"))))), /* @__PURE__ */ React.createElement("section", { className: "wx-sec wx-grey wx-end", "data-screen-label": "10 End" }, /* @__PURE__ */ React.createElement("div", { className: "w" }, /* @__PURE__ */ React.createElement("div", { className: "wx-rv" }, /* @__PURE__ */ React.createElement(WxEyebrow, null, "WarrantyOS")), /* @__PURE__ */ React.createElement("h2", { className: "wx-rv" }, "What could eight of your people run?"), /* @__PURE__ */ React.createElement("div", { className: "wx-cta wx-rv" }, /* @__PURE__ */ React.createElement(WxLink, { href: "/contact" }, "Let's talk"), /* @__PURE__ */ React.createElement(WxLink, { href: "https://warrantyos.app", variant: "outline", ext: true }, "Visit WarrantyOS")), /* @__PURE__ */ React.createElement("a", { className: "wx-next wx-rv", href: "/work/taskbox" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(WX.MicroLabel, null, "Next project"), /* @__PURE__ */ React.createElement("h2", null, "Taskbox"), /* @__PURE__ */ React.createElement("span", { className: "wx-go" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24" }, /* @__PURE__ */ React.createElement("path", { d: "M5 12h14M13 6l6 6-6 6" })))), /* @__PURE__ */ React.createElement("div", { className: "media" }, /* @__PURE__ */ React.createElement("img", { src: "/site/assets/web/taskbox-walk.jpg", alt: "Tradesperson checking Taskbox on her phone as she leaves a building", loading: "lazy" }))))));
}
ReactDOM.createRoot(document.getElementById("wx-root")).render(/* @__PURE__ */ React.createElement(WxPage, null));
