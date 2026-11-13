/* Taskbox "Talk it through" half-height animation. Stage (timeline and scaling) followed by the compiled scene.
   Source: design export of 13 Nov 2026. Loops every 8.3 seconds; shows a still frame when reduced motion is requested. */
(function () {
  var SCENES = [{"name":"Listen","dur":2.2},{"name":"Close","dur":1.2},{"name":"Report","dur":1.6},{"name":"Offer","dur":1.4},{"name":"Add","dur":1},{"name":"Reset","dur":0.9}];
  var CUES = {}, total = 0;
  SCENES.forEach(function (s) { CUES[s.name] = total; total += s.dur; });
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var Easing = {
    linear: function (t) { return t; },
    easeOutCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    easeInCubic: function (t) { return t * t * t; },
    easeInOutCubic: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    easeOutBack: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }
  };
  var animate = function (o) {
    return function (T) {
      var p = o.end > o.start ? clamp((T - o.start) / (o.end - o.start), 0, 1) : (T >= o.start ? 1 : 0);
      return o.from + (o.to - o.from) * (o.ease || Easing.linear)(p);
    };
  };
  var Ctx = React.createContext({ T: 0, CUES: CUES });
  function CompositionStage(props) {
    var w = +props.width, h = +props.height;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var st = React.useState(reduce ? CUES.Add + 0.9 : 0), T = st[0], setT = st[1];
    var sc = React.useState(1), scale = sc[0], setScale = sc[1];
    React.useEffect(function () {
      var fit = function () { setScale(Math.min(window.innerWidth / w, window.innerHeight / h)); };
      fit(); window.addEventListener('resize', fit);
      return function () { window.removeEventListener('resize', fit); };
    }, []);
    React.useEffect(function () {
      if (reduce) return;
      var id, t0 = performance.now();
      var tick = function (now) { setT(((now - t0) / 1000) % total); id = requestAnimationFrame(tick); };
      id = requestAnimationFrame(tick);
      return function () { cancelAnimationFrame(id); };
    }, []);
    return React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' } },
      React.createElement('div', { style: { width: w * scale, height: h * scale, position: 'relative' } },
        React.createElement('div', { style: { position: 'absolute', left: 0, top: 0, width: w, height: h, transformOrigin: '0 0', transform: 'scale(' + scale + ')' } },
          React.createElement(Ctx.Provider, { value: { T: T, CUES: CUES } }, props.children))));
  }
  window.CompositionStage = CompositionStage;
  window.useComposition = function () { return React.useContext(Ctx); };
  window.Easing = Easing; window.animate = animate; window.clamp = clamp;
})();

const { CompositionStage, useComposition, Easing, animate, clamp } = window;
const MOTION = {
  enter: (T, s, d) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeOutCubic })(T),
  leave: (T, s, d) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInCubic })(T),
  glide: (T, s, d) => animate({ from: 0, to: 1, start: s, end: s + d, ease: Easing.easeInOutCubic })(T)
};
const lerp = (a, b, p) => a + (b - a) * p;
const INK = "#111214", EMBER = "#FF4D1F", MUTED = "#6B7076", BODY = "#4A4F55";
const MONO = "'Geist Mono',ui-monospace,monospace";
const MSG1 = "Fire doors on Level 2 are done. Gap was 3 mm, seals are fine.".split(" ");
const MSG2 = "The closer on 2.16 is sticking. Can Lucy look at it?".split(" ");
function Ic({ d, size = 20, color = INK, sw = 1.7 }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", style: { width: size, height: size, display: "block", flex: "none" }, fill: "none", stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React.createElement("path", { d }));
}
function Mark({ size = 14 }) {
  return /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 194.56 194.56", style: { width: size, height: size, display: "block", flex: "none" } }, /* @__PURE__ */ React.createElement("g", { fill: INK }, /* @__PURE__ */ React.createElement("rect", { width: "64.85", height: "64.85" }), /* @__PURE__ */ React.createElement("polygon", { points: "129.71 0 64.85 0 64.85 64.85" }), /* @__PURE__ */ React.createElement("polygon", { points: "129.71 129.71 129.71 64.85 64.85 64.85 64.85 129.71" }), /* @__PURE__ */ React.createElement("polygon", { points: "64.85 129.71 64.85 194.56 129.71 129.71" })), /* @__PURE__ */ React.createElement("circle", { cx: "162.13", cy: "32.43", r: "32.43", fill: EMBER }));
}
function Grow({ p, q, gap = 14, children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateRows: `${p}fr`, flex: "none" } }, /* @__PURE__ */ React.createElement("div", { style: { minHeight: 0, overflow: p >= 1 ? "visible" : "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { paddingTop: gap, opacity: q, transform: `translateY(${(1 - q) * 10}px)` } }, children)));
}
function Words({ words, T, start, step }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, words.map((w, i) => {
    const p = MOTION.enter(T, start + i * step, 0.18);
    return /* @__PURE__ */ React.createElement("span", { key: i, style: { opacity: p } }, w, i < words.length - 1 ? " " : "");
  }));
}
function Bubble({ children }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: 290, padding: "10px 14px", borderRadius: 16, background: "#EEF0F2", color: INK, fontSize: 15.5, lineHeight: 1.45 } }, children));
}
function Swap({ items, T }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", justifyItems: "center" } }, items.map(([text, op], i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { gridArea: "1/1", opacity: op, transform: `translateY(${(1 - op) * 4}px)`, whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, color: INK, display: "flex", alignItems: "center", gap: 6 } }, text)));
}
function offsetWithin(el, anc) {
  let x = 0, y = 0, n = el;
  while (n && n !== anc) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent;
  }
  return { x, y };
}
function TalkPiece({ finger = true, half = false }) {
  const H = half ? 520 : 844;
  const { T, CUES } = useComposition();
  const refs = { card: React.useRef(null), add: React.useRef(null), dock: React.useRef(null) };
  const [fp, setFp] = React.useState({ x: 147, y: 642 });
  React.useEffect(() => {
    const measure = () => {
      const c = refs.card.current, a = refs.add.current, d = refs.dock.current;
      if (!c || !a || !d) return;
      const o = offsetWithin(a, c);
      const n = { x: 16 + o.x + a.offsetWidth / 2, y: H - d.offsetHeight - 24 - c.offsetHeight + o.y + a.offsetHeight / 2 };
      setFp((p) => Math.abs(p.x - n.x) + Math.abs(p.y - n.y) < 0.5 ? p : n);
    };
    measure();
    document.fonts && document.fonts.ready.then(measure);
    const id = setTimeout(measure, 700);
    return () => clearTimeout(id);
  }, []);
  const out = 1 - MOTION.leave(T, CUES.Reset + 0.35, 0.4);
  const b1g = MOTION.glide(T, 0.2, 0.4), b1q = MOTION.enter(T, 0.3, 0.3);
  const w1 = 0.45, s1 = 0.115;
  const r1g = MOTION.glide(T, CUES.Close + 0.05, 0.4), r1q = MOTION.enter(T, CUES.Close + 0.15, 0.35);
  const recg = MOTION.glide(T, CUES.Close + 0.45, 0.4), recq = MOTION.enter(T, CUES.Close + 0.55, 0.35);
  const dot = animate({ from: 0, to: 1, start: CUES.Close + 0.75, end: CUES.Close + 1.1, ease: Easing.easeOutBack })(T);
  const b2g = MOTION.glide(T, CUES.Report + 0.05, 0.4), b2q = MOTION.enter(T, CUES.Report + 0.15, 0.3);
  const w2 = CUES.Report + 0.25, s2 = 0.105;
  const qg = MOTION.glide(T, CUES.Offer + 0.05, 0.45), qq = MOTION.enter(T, CUES.Offer + 0.15, 0.4);
  const cg = MOTION.glide(T, CUES.Offer + 0.35, 0.45), cq = MOTION.enter(T, CUES.Offer + 0.45, 0.4);
  const tap = CUES.Add + 0.2;
  const press = MOTION.enter(T, tap - 0.05, 0.07) * (1 - MOTION.enter(T, tap + 0.08, 0.15));
  const done = MOTION.glide(T, tap + 0.12, 0.35);
  const talking = Math.max(
    MOTION.enter(T, 0.1, 0.25) * (1 - MOTION.enter(T, w1 + MSG1.length * s1, 0.3)),
    MOTION.enter(T, CUES.Report - 0.05, 0.25) * (1 - MOTION.enter(T, w2 + MSG2.length * s2, 0.3))
  );
  const bars = Array.from({ length: 34 }, (_, i) => {
    const live = 4 + 15 * Math.abs(Math.sin(T * 8.3 + i * 1.1) * Math.cos(T * 3.9 + i * 0.55));
    return lerp(3, live, talking * clamp((i - 6) / 10, 0.25, 1));
  });
  const lListen = 1 - MOTION.enter(T, CUES.Close, 0.2) + MOTION.enter(T, CUES.Report - 0.1, 0.2) * (1 - MOTION.enter(T, CUES.Offer + 0.3, 0.2)) + MOTION.enter(T, CUES.Reset + 0.55, 0.25);
  const lThink = MOTION.enter(T, CUES.Close, 0.2) * (1 - MOTION.enter(T, CUES.Report - 0.1, 0.2));
  const lAsk = MOTION.enter(T, CUES.Offer + 0.3, 0.2) * (1 - MOTION.enter(T, tap + 0.15, 0.2));
  const lDone = MOTION.enter(T, tap + 0.15, 0.2) * (1 - MOTION.enter(T, CUES.Reset + 0.35, 0.25));
  const pulse = (0.5 + 0.5 * Math.sin(T * 6)) * clamp(lListen, 0, 1);
  const secs = T < CUES.Reset + 0.5 ? 12 + Math.floor(T) : 12;
  const timer = `0:${String(secs).padStart(2, "0")}`;
  let fx = fp.x + 120, fy = fp.y + 230;
  const fin = MOTION.glide(T, CUES.Offer + 0.95, tap - 0.05 - (CUES.Offer + 0.95));
  fx = lerp(fx, fp.x, fin);
  fy = lerp(fy, fp.y, fin);
  const fout = MOTION.glide(T, tap + 0.35, 0.55);
  fx = lerp(fx, fp.x + 70, fout);
  fy = lerp(fy, fp.y + 150, fout);
  const fop = MOTION.enter(T, CUES.Offer + 0.95, 0.3) * (1 - MOTION.leave(T, tap + 0.5, 0.35));
  const rip = MOTION.enter(T, tap, 0.5);
  return /* @__PURE__ */ React.createElement("div", { "data-screen-label": `t=${Math.floor(T)}s`, style: { position: "absolute", inset: 0, borderRadius: half ? 28 : 46, overflow: "hidden", background: "#FFFFFF", display: "flex", flexDirection: "column", fontFamily: "'Geist',system-ui,sans-serif", color: INK, WebkitFontSmoothing: "antialiased" } }, !half && /* @__PURE__ */ React.createElement("div", { style: { height: 54, flex: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px 0 36px", fontSize: 16, fontWeight: 600 } }, /* @__PURE__ */ React.createElement("div", null, "16:42"), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 18 12", style: { width: 18, height: 12 } }, /* @__PURE__ */ React.createElement("rect", { x: "0", y: "8", width: "3", height: "4", rx: "1", fill: INK }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "5.5", width: "3", height: "6.5", rx: "1", fill: INK }), /* @__PURE__ */ React.createElement("rect", { x: "10", y: "3", width: "3", height: "9", rx: "1", fill: INK }), /* @__PURE__ */ React.createElement("rect", { x: "15", y: "0", width: "3", height: "12", rx: "1", fill: INK })), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 27 13", style: { width: 27, height: 13 } }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "23", height: "12", rx: "3.5", fill: "none", stroke: INK, strokeOpacity: "0.4" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "17", height: "9", rx: "2", fill: INK }), /* @__PURE__ */ React.createElement("rect", { x: "25", y: "4.5", width: "1.6", height: "4", rx: "0.8", fill: INK, fillOpacity: "0.4" })))), /* @__PURE__ */ React.createElement("div", { style: { height: half ? 60 : 52, flex: "none", display: "flex", alignItems: "center", padding: half ? "8px 8px 0" : "0 8px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(Ic, { d: "M6 6l12 12M18 6L6 18", size: 18, sw: 1.9 })), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 16, fontWeight: 650 } }, "Talk it through"), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: MONO, fontSize: 13, color: MUTED } }, timer)), /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(Ic, { d: "M4 9.5h3.5L12 5.5v13l-4.5-4H4zM16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11", size: 19 }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 16px 24px", opacity: out, WebkitMaskImage: `linear-gradient(to bottom,transparent 0,#000 ${half ? 56 : 120}px)`, maskImage: `linear-gradient(to bottom,transparent 0,#000 ${half ? 56 : 120}px)` } }, /* @__PURE__ */ React.createElement(Grow, { p: b1g, q: b1q }, /* @__PURE__ */ React.createElement(Bubble, null, /* @__PURE__ */ React.createElement(Words, { words: MSG1, T, start: w1, step: s1 }))), /* @__PURE__ */ React.createElement(Grow, { p: r1g, q: r1q }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: MUTED } }, /* @__PURE__ */ React.createElement(Mark, null), "Taskbox", /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 500, color: "#8A9097" } }, "16:41")), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 15.5, lineHeight: 1.45, color: BODY } }, "Closed Fire door check. Record sent to Harbour FM."))), /* @__PURE__ */ React.createElement(Grow, { p: recg, q: recq, gap: 12 }, /* @__PURE__ */ React.createElement("div", { style: { height: 44, borderRadius: 12, background: "#F6F7F9", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 8, height: 8, flex: "none", borderRadius: 999, background: "#0B8452", transform: `scale(${dot})` } }), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, minWidth: 0, fontSize: 14.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 600 } }, "Fire door check"), /* @__PURE__ */ React.createElement("span", { style: { color: MUTED } }, " · 3 of 3 passed")), /* @__PURE__ */ React.createElement("div", { style: { fontFamily: MONO, fontSize: 12, color: MUTED } }, "TB-4821"))), /* @__PURE__ */ React.createElement(Grow, { p: b2g, q: b2q }, /* @__PURE__ */ React.createElement(Bubble, null, /* @__PURE__ */ React.createElement(Words, { words: MSG2, T, start: w2, step: s2 }))), /* @__PURE__ */ React.createElement(Grow, { p: qg, q: qq }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 22, fontWeight: 650, letterSpacing: "-0.02em", lineHeight: 1.3 } }, "Lucy is free Thursday at 9. Add it for her?")), /* @__PURE__ */ React.createElement(Grow, { p: cg, q: cq }, /* @__PURE__ */ React.createElement("div", { ref: refs.card, style: { position: "relative", background: "#FFFFFF", borderRadius: 16, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12, boxShadow: "0 0 0 1px rgba(17,18,20,.06), 0 10px 24px -18px rgba(17,18,20,.13)" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 3 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13, fontWeight: 600, color: MUTED } }, "New job"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 18, fontWeight: 650, letterSpacing: "-0.015em" } }, "Fix door closer, 2.16"), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 13.5, color: MUTED } }, "Harbour House · Level 2 · Thu 09:00 · Lucy")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex" } }, /* @__PURE__ */ React.createElement("div", { ref: refs.add, style: { position: "relative", flex: 1, height: 44, borderRadius: 12, overflow: "hidden", background: EMBER } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "#E03C0A", opacity: press } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, background: "#DDF3E9", opacity: done } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#FFFFFF", fontSize: 15, fontWeight: 650, opacity: 1 - done } }, "Add job"), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 7, color: "#0A6B43", fontSize: 15, fontWeight: 650, opacity: done, transform: `translateY(${(1 - done) * 6}px)` } }, /* @__PURE__ */ React.createElement(Ic, { d: "M5 12.5l4.5 4.5L19 7.5", size: 17, color: "#0A6B43", sw: 2.2 }), "Added to Thursday")), /* @__PURE__ */ React.createElement("div", { style: { width: lerp(96, 0, done), opacity: 1 - done, overflow: "hidden", flex: "none", display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 88, flex: "none", height: 44, borderRadius: 12, boxShadow: "inset 0 0 0 1.5px #DDE0E4", fontSize: 15, fontWeight: 650, display: "grid", placeItems: "center" } }, "Change")))))), /* @__PURE__ */ React.createElement("div", { ref: refs.dock, style: { flex: "none", background: "#FFFFFF", boxShadow: "inset 0 1px 0 #EEF0F2", padding: half ? "20px 20px 24px" : "22px 20px 40px", display: "flex", flexDirection: "column", gap: half ? 22 : 26 } }, /* @__PURE__ */ React.createElement("div", { style: { height: 20, display: "flex", alignItems: "center", gap: 3 } }, bars.map((h, i) => /* @__PURE__ */ React.createElement("div", { key: i, style: { flex: 1, height: h, borderRadius: 2, background: h > 4.5 ? INK : "#DDE0E4" } }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between" } }, /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, marginTop: 6, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(Ic, { d: "M3 6h18v12H3zM7 10h.01M11 10h.01M15 10h.01M19 10h.01M7 14h10", size: 21, color: BODY, sw: 1.6 })), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "relative", width: 56, height: 56 } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: -4 - 3 * pulse, borderRadius: 21 + 3 * pulse, boxShadow: `0 0 0 1.5px rgba(17,18,20,${0.14 * clamp(lListen, 0, 1)})` } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", inset: 0, borderRadius: 18, background: INK, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(Ic, { d: "M9 3.5h6v10.5H9zM5.8 11.5a6.2 6.2 0 0 0 12.4 0M12 17.7v2.8", size: 24, color: "#FFFFFF", sw: 2 }))), /* @__PURE__ */ React.createElement(Swap, { T, items: [
    [/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { width: 7, height: 7, borderRadius: 999, background: EMBER } }), "Listening"), clamp(lListen, 0, 1)],
    ["Closing the job", clamp(lThink, 0, 1)],
    ["Say yes, or tap Add", clamp(lAsk, 0, 1)],
    ["Added for Lucy", clamp(lDone, 0, 1)]
  ] })), /* @__PURE__ */ React.createElement("div", { style: { width: 44, height: 44, marginTop: 6, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement(Ic, { d: "M6 6l12 12M18 6L6 18", size: 19, color: BODY, sw: 1.9 })))), finger && fop > 1e-3 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: 0, top: 0, transform: `translate(${fx}px,${fy}px)`, opacity: fop, pointerEvents: "none", zIndex: 5 } }, T >= tap && T < tap + 0.5 && /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: -22 - 18 * rip, top: -22 - 18 * rip, width: 44 + 36 * rip, height: 44 + 36 * rip, borderRadius: "50%", boxShadow: "inset 0 0 0 2px rgba(17,18,20,0.35)", opacity: 1 - rip } }), /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: -22, top: -22, width: 44, height: 44, borderRadius: "50%", background: "rgba(17,18,20,0.22)", boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.9), 0 6px 16px -6px rgba(17,18,20,0.35)", transform: `scale(${1 - 0.18 * press})` } })));
}
const BGS = { Transparent: "transparent", White: "#FFFFFF", Canvas: "#EFF0F3" };
function TaskboxTalkStage(props) {
  return /* @__PURE__ */ React.createElement(CompositionStage, { width: 390, height: props.half ? 520 : 844, scenes: window.OM_SCENES, playback: window.OM_PLAYBACK, bg: BGS[props.background] || "transparent" }, /* @__PURE__ */ React.createElement(TalkPiece, { finger: props.finger !== false, half: !!props.half }));
}
window.TaskboxTalkStage = TaskboxTalkStage;
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(TaskboxTalkStage, { half: true, background: "Transparent", finger: true }));
