(function () {
  var d = document,
    nav = d.getElementById("nav"),
    motion = !matchMedia("(prefers-reduced-motion: reduce)").matches,
    IO = "IntersectionObserver" in window;
  function sc() {
    nav.classList.toggle("scrolled", scrollY > 4);
  }
  addEventListener("scroll", sc, { passive: true });
  sc();
  var f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Los_Angeles" }),
    cl = d.querySelectorAll("[data-clock]");
  function tick() {
    var t = f.format(new Date());
    [].forEach.call(cl, function (c) {
      c.textContent = t;
    });
  }
  tick();
  setInterval(tick, 15000);
  [].forEach.call(d.querySelectorAll(".rv-g"), function (g) {
    [].forEach.call(g.children, function (c, i) {
      c.style.setProperty("--i", Math.min(i, 8));
    });
  });
  var rv = [].slice.call(d.querySelectorAll(".rv,.rv-g,.foot-brand")),
    show = function (e) {
      e.classList.add(e.classList.contains("foot-brand") ? "drawn" : "in");
    };
  if (!motion || !IO) rv.forEach(show);
  else {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    rv.forEach(function (e) {
      io.observe(e);
    });
  }
  [].forEach.call(d.querySelectorAll(".img"), function (x) {
    var i = x.querySelector("img");
    if (!i) return;
    var ok = function () {
      i.classList.add("is-loaded");
    };
    if (i.complete && i.naturalWidth) ok();
    else {
      i.addEventListener("load", ok, { once: true });
      i.addEventListener("error", ok, { once: true });
    }
  });
  var bs = [].slice.call(d.querySelectorAll(".jx-filters button")),
    rows = [].slice.call(d.querySelectorAll(".jx-list li")),
    empty = d.querySelector(".jx-empty");
  bs.forEach(function (b) {
    b.addEventListener("click", function () {
      var c = b.getAttribute("data-cat"),
        n = 0;
      bs.forEach(function (x) {
        x.setAttribute("aria-pressed", x === b);
      });
      rows.forEach(function (r) {
        var ok = c === "all" || r.getAttribute("data-cat") === c;
        r.hidden = !ok;
        if (ok) n++;
      });
      if (empty) empty.hidden = n > 0;
    });
  });
  var sub = d.querySelector("[data-sub]");
  if (sub)
    sub.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = sub.querySelector("button"),
        i = sub.querySelector("input"),
        v = i.value.trim();
      if (!v || b.disabled) return;
      b.disabled = true;
      b.textContent = "Sending…";
      fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: v }) })
        .then(function (r) {
          return r
            .json()
            .catch(function () {
              return {};
            })
            .then(function (j) {
              return { ok: r.ok, j: j };
            });
        })
        .then(function (x) {
          b.disabled = false;
          if (x.ok) {
            i.value = "";
            b.textContent = "Subscribed";
          } else {
            b.textContent = "Try again";
            i.setCustomValidity(x.j.error || "That did not go through.");
            i.reportValidity();
            i.setCustomValidity("");
          }
        })
        .catch(function () {
          b.disabled = false;
          b.textContent = "Try again";
        });
    });
})();
