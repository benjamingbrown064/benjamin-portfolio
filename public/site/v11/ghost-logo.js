/* Ghost Mode animated logo v3 (bone-lid blink), ported from "Ghost Mode Animated Logo v3" to vanilla JS for the work card. */
(() => {
  const E = {
    linear: (t) => t,
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    inQ: (t) => t * t,
    outC: (t) => 1 - Math.pow(1 - t, 3),
  };
  const tw = (T, s, e, f, to, ease = E.inOut) => {
    const p = T <= s ? 0 : T >= e ? 1 : (T - s) / (e - s);
    return f + (to - f) * ease(p);
  };
  const osc = (T, t0, k = 7, f = 28) => (T < t0 ? 0 : Math.exp(-(T - t0) * k) * Math.cos((T - t0) * f));
  const noise = (rgb, a, b, fr, seed) =>
    'url("data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="${fr}" numOctaves="2" seed="${seed}" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 0 ${rgb} 0 0 0 ${a} ${b}"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
    ) +
    '")';
  const GRAIN = noise(1, 1.6, -0.55, 0.9, 4);
  const FG = "#F2EFE8",
    BG = "#0B0B0B",
    GOLD = "#D4AF37";
  const HX = [10, 23.3, 36.7, 50, 63.3, 76.7, 90];
  function hem(ys) {
    const P = HX.map((x, i) => [x, ys[i]]),
      l = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t],
      f = (v) => v.toFixed(2);
    let d = "V" + f(P[0][1] - 6);
    const o = l(P[0], P[1], 0.45);
    d += "Q10 " + f(P[0][1]) + " " + f(o[0]) + " " + f(o[1]);
    for (let i = 1; i < 6; i++) {
      const t = i % 2 ? 0.3 : 0.42,
        a = l(P[i], P[i - 1], t),
        b = l(P[i], P[i + 1], t);
      d += "L" + f(a[0]) + " " + f(a[1]) + "Q" + P[i][0] + " " + f(P[i][1]) + " " + f(b[0]) + " " + f(b[1]);
    }
    const e = l(P[6], P[5], 0.45);
    return d + "L" + f(e[0]) + " " + f(e[1]) + "Q90 " + f(P[6][1]) + " 90 " + f(P[6][1] - 6);
  }
  const body = (T, amp) =>
    "M50 4C25 4 10 22 10 48" + hem(HX.map((x, i) => (i % 2 ? 95 : 106) + Math.sin(T * 7 + i * 1.3) * amp)) + "V48C90 22 75 4 50 4Z";
  const WORD = ["G", "H", "O", "S", "T", " ", "M", "O", "D", "E", "."],
    ROT = [-3, 2, -1.5, 3, -2, 0, 2.5, -2, 1.5, -3, 0],
    DY = [4, -3, 2, -4, 3, 0, -2, 4, -3, 2, 0],
    AT = [0.05, 0.12, 0.19, 0.26, 0.33, null, 0.52, 0.59, 0.66, 0.73, 1.05];
  const DOTS = [
    [12, 18, 9],
    [86, 14, 7],
    [8, 78, 6],
    [91, 70, 10],
    [24, 90, 5],
    [70, 88, 7],
    [52, 9, 5],
    [96, 42, 6],
    [4, 46, 8],
  ];
  // cues from the v3 scene list: Dark .5 · Boo 1 · Open 1.1 · Slide .8 · Slam 1.4 · Blink 1.4 · Out 1
  const B = 0.5,
    Op = 1.5,
    S = 2.6,
    M = 3.4,
    L = 4.8,
    O = 6.2,
    TOT = 7.2,
    HOLD = O - 0.01,
    LEAD = 0.3,
    GAP = 70;
  const blink = (T, t0) => tw(T, t0, t0 + 0.18, 0, 1) - tw(T, t0 + 0.28, t0 + 0.46, 0, 1);
  // print texture: SVG-filter data URLs fail as masks in Safari, so rasterise a speckle mask once
  const PRINTPNG = (() => {
    try {
      const n = 180,
        c = document.createElement("canvas");
      c.width = c.height = n;
      const x = c.getContext("2d");
      x.fillStyle = "#000";
      x.fillRect(0, 0, n, n);
      x.globalCompositeOperation = "destination-out";
      for (let i = 0; i < 520; i++) {
        const r = Math.random() < 0.85 ? 0.6 + Math.random() * 0.7 : 1.2 + Math.random() * 1.4;
        x.globalAlpha = 0.55 + Math.random() * 0.45;
        x.beginPath();
        x.arc(Math.random() * n, Math.random() * n, r, 0, 7);
        x.fill();
      }
      return "url(" + c.toDataURL("image/png") + ")";
    } catch (e) {
      return "none";
    }
  })();
  const MASK = `-webkit-mask-image:${PRINTPNG};mask-image:${PRINTPNG};-webkit-mask-size:180px;mask-size:180px`;
  let uid = 0;
  function build(host) {
    const id = "gx3" + uid++,
      st = document.createElement("div");
    st.style.cssText = "position:absolute;left:0;top:0;transform-origin:0 0;overflow:hidden;pointer-events:none";
    const eye = (k, cx) =>
      `<clipPath id="${id}${k}"><ellipse data-ec cx="${cx}" cy="46" rx="7.8" ry="10.8"></ellipse></clipPath><ellipse data-ep cx="${cx}" cy="46" rx="7" ry="10" fill="${BG}"></ellipse><g clip-path="url(#${id}${k})" fill="${FG}"><rect data-lt x="${cx - 9}" y="35" width="18" height="0"></rect><rect data-lb x="${cx - 9}" y="57" width="18" height="0"></rect></g>`;
    st.innerHTML =
      DOTS.map(
        ([x, y, s]) =>
          `<span data-d style="position:absolute;left:${x}%;top:${y}%;width:${s}px;height:${s}px;background:${GOLD};opacity:0"></span>`,
      ).join("") +
      `<div data-cam style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="display:flex;align-items:center;gap:${GAP}px;margin-top:-10px"><div data-g style="position:relative;width:300px;height:330px;flex-shrink:0;transform-origin:50% 100%">` +
      Array.from({ length: 12 })
        .map(() => '<span data-b style="position:absolute;display:none"></span>')
        .join("") +
      `<div data-sq style="transform-origin:50% 100%;${MASK}"><svg width="300" height="330" viewBox="0 0 100 110" style="display:block;overflow:visible"><g data-body opacity="0"><path data-p fill="${FG}"></path>${eye("L", 37)}${eye("R", 63)}</g></svg></div></div>` +
      `<div data-w style="display:flex;flex-direction:column"><div style="display:flex;align-items:baseline;font-family:'Anton',sans-serif;font-size:250px;line-height:.9;color:${FG};text-transform:uppercase;${MASK}">` +
      WORD.map((ch) =>
        ch === " "
          ? '<span style="width:52px"></span>'
          : `<span data-l style="display:inline-block;opacity:0;transform-origin:50% 80%;${ch === "." ? "color:" + GOLD + ";margin-left:4px" : ""}">${ch}</span>`,
      ).join("") +
      `</div></div></div></div><div style="position:absolute;inset:0;background-image:${GRAIN};background-size:220px;opacity:.09"></div>`;
    host.appendChild(st);
    const q = (s) => [...st.querySelectorAll(s)];
    return {
      st,
      dots: q("[data-d]"),
      cam: st.querySelector("[data-cam]"),
      g: st.querySelector("[data-g]"),
      bursts: q("[data-b]"),
      sq: st.querySelector("[data-sq]"),
      bodyG: st.querySelector("[data-body]"),
      path: st.querySelector("[data-p]"),
      ec: q("[data-ec]"),
      ep: q("[data-ep]"),
      lt: q("[data-lt]"),
      lb: q("[data-lb]"),
      w: st.querySelector("[data-w]"),
      letters: q("[data-l]"),
    };
  }
  function frame(R, Tr, wordW) {
    const T = Math.min(Tr, HOLD);
    const glance =
      tw(T, Op + 0.5, Op + 0.62, 0, -5) +
      tw(T, Op + 0.75, Op + 0.9, 0, 10) +
      tw(T, Op + 0.98, Op + 1.08, 0, -5) +
      tw(T, M + 1.05, M + 1.18, 0, 5) +
      tw(T, L + 0.05, L + 0.25, 0, -5);
    const lid = (d) =>
      Math.min(
        1,
        (T < O ? 1 - tw(T, Op + 0.12 + d, Op + 0.34 + d, 0, 1) : tw(T, O + 0.1 + d, O + 0.28 + d, 0, 1)) +
          blink(T, M + 1.2 + d) +
          blink(T, L + 0.55 + d),
      );
    R.path.setAttribute("d", body(Tr, T < B ? 0 : 2.4));
    R.bodyG.setAttribute("opacity", T < O ? tw(T, B, B + 0.07, 0, 1) : tw(T, O + 0.45, O + 0.75, 1, 0));
    [0, 1].forEach((i) => {
      const cx = (i ? 63 : 37) + glance,
        h = 11.2 * lid(i ? 0.04 : 0);
      R.ec[i].setAttribute("cx", cx);
      R.ep[i].setAttribute("cx", cx);
      R.lt[i].setAttribute("x", cx - 9);
      R.lb[i].setAttribute("x", cx - 9);
      R.lt[i].setAttribute("height", h);
      R.lb[i].setAttribute("height", h);
      R.lb[i].setAttribute("y", 57 - h);
    });
    const t0 = B + 0.2;
    R.bursts.forEach((b, i) => {
      if (T < t0 || T > t0 + 1.2) {
        b.style.display = "none";
        return;
      }
      const a = (i / 12) * Math.PI * 2 + (i % 3) * 0.21,
        d = tw(T, t0, t0 + 0.7, 40, 240 + (i % 4) * 55, E.outC),
        s = 8 + (i % 3) * 5;
      b.style.cssText = `position:absolute;background:${GOLD};left:${150 + Math.cos(a) * d - s / 2}px;top:${175 + Math.sin(a) * d * 0.85 - s / 2}px;width:${s}px;height:${s}px;opacity:${tw(T, t0 + 0.35, t0 + 0.9, 1, 0)}`;
    });
    let li = 0;
    WORD.forEach((ch, i) => {
      if (ch === " ") return;
      const el = R.letters[li++],
        a = M + AT[i],
        dot = ch === ".",
        hit = a + (dot ? 0.17 : 0.13);
      const sc = dot ? 1 + 0.25 * osc(T, hit, 8, 30) : tw(T, a, hit, 2.8, 1, E.inQ) + 0.07 * osc(T, hit);
      const y = dot ? tw(T, a, hit, -520, 0, E.inQ) : 0;
      el.style.opacity = tw(T, a, a + 0.04, 0, 1, E.linear);
      el.style.transform = `translateY(${DY[i] + y}px) rotate(${tw(T, a, hit, ROT[i] * 5, ROT[i], E.inQ)}deg) scale(${sc})`;
    });
    R.w.style.opacity = T < O ? 1 : tw(T, O + 0.45, O + 0.75, 1, 0);
    const gx = tw(T, S, S + 0.75, (GAP + wordW) / 2, 0);
    const lean = Math.sin(Math.PI * tw(T, S, S + 0.75, 0, 1, E.linear)) * -9 + 5 * osc(T, S + 0.75, 6, 16);
    const stamp = T < B ? 1 : tw(T, B, B + 0.2, 1.8, 1, E.inQ);
    let fl = 0.16 * osc(T, B + 0.2);
    AT.forEach((a) => {
      if (a != null) fl += 0.04 * osc(T, M + a + 0.13, 9, 30);
    });
    const hop = -tw(T, M + 1.22, M + 1.34, 0, 26, E.outC) + tw(T, M + 1.34, M + 1.55, 0, 26, E.inQ);
    const bob = Tr > B + 0.4 ? Math.sin((Tr - B) * 2.6) * 7 : 0;
    const shake = 14 * osc(T, B + 0.2, 10, 60) + 5 * osc(T, M + AT[10] + 0.17, 12, 60);
    R.cam.style.transform = `translateX(${shake}px) scale(${1 + 0.04 * (T / TOT)})`;
    R.g.style.transform = `translate(${gx}px,${bob + hop}px) rotate(${lean}deg)`;
    R.sq.style.transform = `scale(${stamp * (1 + fl * 0.6)},${stamp * (1 - fl)})`;
    const amb = T < B + 0.4 ? 0 : tw(T, B + 0.4, B + 1, 0, 1);
    R.dots.forEach((d, i) => {
      d.style.opacity = amb * (0.35 + 0.35 * Math.sin(Tr * 1.7 + i * 2.1));
      d.style.transform = `translateY(${Math.sin(Tr * 0.8 + i) * 10}px)`;
    });
  }
  document.querySelectorAll(".card.gx-card").forEach((card) => {
    const media = card.querySelector(".media"),
      ov = card.querySelector(".media-ov"),
      img = media.querySelector(":scope>img"),
      hov = !!card.querySelector(".gx-bg");
    let raf = 0,
      R = null,
      start = 0;
    const size = () => {
      const w = media.clientWidth,
        h = media.clientHeight,
        s = (w / 1920) * 0.62;
      R.st.style.width = w / s + "px";
      R.st.style.height = h / s + "px";
      R.st.style.transform = "scale(" + s + ")";
    };
    const play = () => {
      if (!R) {
        R = build(ov);
        if (!hov) {
          ov.style.opacity = 1;
          ov.style.transition = "none";
          if (img) img.style.opacity = 0;
        }
      }
      size();
      start = performance.now() - LEAD * 1000;
      cancelAnimationFrame(raf);
      const loop = (now) => {
        frame(R, (now - start) / 1000, R.w.offsetWidth);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };
    card.addEventListener("mouseenter", play);
    if (hov)
      card.addEventListener("mouseleave", () => {
        setTimeout(() => {
          if (!card.matches(":hover")) cancelAnimationFrame(raf);
        }, 450);
      });
    window.addEventListener("resize", () => R && size());
    if (!hov) {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              play();
              io.disconnect();
            }
          }),
        { threshold: 0.4 },
      );
      io.observe(card);
    }
  });
})();
