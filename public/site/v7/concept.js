(function () {
  var motion = !matchMedia("(prefers-reduced-motion: reduce)").matches;
  var d = document.querySelector(".dots");
  if (d) {
    [].forEach.call(d.children, function (x, i) {
      x.style.setProperty("--i", i);
    });
    if (!motion || !("IntersectionObserver" in window)) d.classList.add("in");
    else {
      var io = new IntersectionObserver(
        function (es) {
          if (es[0].isIntersecting) {
            d.classList.add("in");
            io.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(d);
    }
  }
  var eq = document.querySelector(".eqx");
  if (eq) {
    var ws = [].slice.call(eq.querySelectorAll(".eqx-words button")),
      ps = eq.querySelectorAll(".eqx-pane"),
      bs = eq.querySelectorAll(".eqx-bar i"),
      i = 0,
      user = false,
      tm;
    function go(k) {
      i = k;
      ws.forEach(function (w, j) {
        w.classList.toggle("on", j === k);
        w.setAttribute("aria-pressed", j === k);
      });
      [].forEach.call(ps, function (p, j) {
        p.classList.toggle("on", j === k);
      });
      [].forEach.call(bs, function (b, j) {
        b.classList.remove("on");
        b.classList.toggle("done", j < k);
        if (j === k) {
          void b.offsetWidth;
          b.classList.add("on");
        }
      });
    }
    function loop() {
      clearTimeout(tm);
      if (user || !motion) return;
      tm = setTimeout(function () {
        go((i + 1) % ws.length);
        loop();
      }, 5000);
    }
    function pick(k) {
      user = true;
      eq.classList.add("paused");
      clearTimeout(tm);
      go((k + ws.length) % ws.length);
    }
    ws.forEach(function (w, j) {
      w.addEventListener("click", function () {
        pick(j);
      });
    });
    [].forEach.call(bs, function (b, j) {
      if (b.parentNode.tagName === "BUTTON")
        b.parentNode.addEventListener("click", function () {
          pick(j);
        });
    });
    [].forEach.call(eq.querySelectorAll("[data-eqx]"), function (a) {
      a.addEventListener("click", function () {
        pick(i + +a.getAttribute("data-eqx"));
      });
    });
    go(0);
    if ("IntersectionObserver" in window)
      new IntersectionObserver(
        function (es) {
          if (es[0].isIntersecting) {
            if (!user) {
              go(i);
              loop();
            }
          } else clearTimeout(tm);
        },
        { threshold: 0.35 },
      ).observe(eq);
  }
})();

(function () {
  var cur = document.querySelector("[data-cur]");
  if (!cur) return;
  var RATE = 1.34,
    usd = false,
    ps = document.querySelectorAll(".prx [data-gbp]");
  cur.addEventListener("click", function () {
    usd = !usd;
    [].forEach.call(ps, function (p) {
      p.textContent = usd ? "$" + Math.round((+p.getAttribute("data-gbp") * RATE) / 1000) + "k" : p.getAttribute("data-label");
    });
    cur.textContent = usd ? "Show in GBP" : "Convert to USD";
    cur.setAttribute("aria-pressed", usd);
  });
})();

(function () {
  var hx = document.querySelector(".hx");
  if (!hx) return;
  var motion = !matchMedia("(prefers-reduced-motion: reduce)").matches,
    row = hx.querySelector(".hx-steps"),
    steps = [].slice.call(row.querySelectorAll("button")),
    out = hx.querySelector(".hx-out"),
    split = hx.querySelector(".hx-split"),
    bar = hx.querySelector(".hx-bar"),
    hd = hx.querySelector(".hx-handle"),
    ai = hx.querySelector("[data-ai]"),
    hu = hx.querySelector("[data-hu]"),
    i = 0,
    v = 70,
    user = false,
    dragged = false,
    tm,
    raf;
  function set(x) {
    v = Math.max(60, Math.min(80, x));
    var r = Math.round(v);
    split.style.setProperty("--s", v);
    ai.textContent = r + "%";
    hu.textContent = 100 - r + "%";
    hd.setAttribute("aria-valuenow", r);
    hd.setAttribute("aria-valuetext", "AI " + r + "%, people " + (100 - r) + "%");
  }
  function ez(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  }
  function sweep() {
    cancelAnimationFrame(raf);
    var t0 = performance.now();
    (function f(t) {
      var p = Math.min(1, Math.max(0, (t - t0) / 2800));
      set(p < 0.6 ? 60 + 20 * ez(p / 0.6) : 80 - 10 * ez((p - 0.6) / 0.4));
      if (p < 1) raf = requestAnimationFrame(f);
    })(t0);
  }
  function go(k) {
    i = k;
    steps.forEach(function (s, j) {
      s.setAttribute("aria-pressed", j === k);
      if (j !== k) s.classList.remove("on");
      else if (!s.classList.contains("on")) s.classList.add("on");
    });
  }
  function loop() {
    clearTimeout(tm);
    if (user || !motion) return;
    tm = setTimeout(function () {
      go((i + 1) % steps.length);
      loop();
    }, 4500);
  }
  steps.forEach(function (s, j) {
    s.addEventListener("click", function () {
      user = true;
      hx.classList.add("paused");
      clearTimeout(tm);
      go(j);
    });
  });
  function at(e) {
    var r = bar.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  }
  bar.addEventListener("pointerdown", function (e) {
    dragged = true;
    cancelAnimationFrame(raf);
    try {
      bar.setPointerCapture(e.pointerId);
    } catch (_) {}
    at(e);
    function mv(ev) {
      at(ev);
    }
    function up() {
      bar.removeEventListener("pointermove", mv);
      bar.removeEventListener("pointerup", up);
      bar.removeEventListener("pointercancel", up);
    }
    bar.addEventListener("pointermove", mv);
    bar.addEventListener("pointerup", up);
    bar.addEventListener("pointercancel", up);
  });
  hd.addEventListener("keydown", function (e) {
    var d = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, Home: -20, End: 20 }[e.key];
    if (!d) return;
    e.preventDefault();
    dragged = true;
    cancelAnimationFrame(raf);
    set(Math.round(v) + d);
  });
  set(70);
  go(0);
  if (!motion || !("IntersectionObserver" in window)) {
    out.classList.add("live");
    hx.classList.add("paused");
    return;
  }
  new IntersectionObserver(
    function (es) {
      if (es[0].isIntersecting) {
        if (!user) loop();
      } else clearTimeout(tm);
    },
    { threshold: 0.3 },
  ).observe(row);
  var io = new IntersectionObserver(
    function (es) {
      if (es[0].isIntersecting) {
        out.classList.add("live");
        if (!dragged) sweep();
        io.disconnect();
      }
    },
    { threshold: 0.35 },
  );
  io.observe(out);
})();
