/* Sticky route bar: highlights the stage in view, fills its line as you read, jumps on click. */
(function () {
  var bar = document.querySelector(".rq-top");
  if (!bar) return;
  var root = document.documentElement,
    nav = document.getElementById("nav"),
    map = bar.querySelector(".rq-map");
  var links = [].slice.call(map.querySelectorAll("a")),
    secs = links.map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    });
  var navH = 64,
    barH = 80,
    tick = false,
    cur = -1,
    ind = map.querySelector(".rq-ind");
  var ticks = links.map(function (a, i) {
    return { t: [].slice.call(a.querySelectorAll(".rq-ticks i")), r: secs[i] ? [].slice.call(secs[i].querySelectorAll(".rq")) : [] };
  });
  function place() {
    var a = links[cur];
    if (!a || !ind) return;
    ind.style.width = a.offsetWidth + "px";
    ind.style.setProperty("--x", a.offsetLeft + "px");
  }
  function size() {
    navH = nav ? nav.offsetHeight : 64;
    barH = bar.offsetHeight;
    root.style.setProperty("--navh", navH + "px");
    root.style.setProperty("--rqbar", barH + "px");
  }
  function upd() {
    tick = false;
    var line = navH + barH + innerHeight * 0.18,
      on = -1;
    bar.classList.toggle("is-stuck", bar.getBoundingClientRect().top <= navH + 0.5 && scrollY > 0);
    secs.forEach(function (s, i) {
      if (!s) return;
      var r = s.getBoundingClientRect(),
        p = Math.max(0, Math.min(1, (line - r.top) / Math.max(1, r.height)));
      if (i === secs.length - 1 && r.bottom <= innerHeight + 2) p = 1;
      if (r.top <= line) on = i;
      var tk = ticks[i];
      tk.t.forEach(function (t, k) {
        var row = tk.r[k];
        t.classList.toggle("on", !!row && (row.getBoundingClientRect().top + 40 <= line || p >= 1));
      });
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4 && secs[secs.length - 1]) on = secs.length - 1;
    if (on !== cur) {
      cur = on;
      map.classList.toggle("has-on", on >= 0);
      place();
      links.forEach(function (a, i) {
        var a1 = i === on;
        a.classList.toggle("is-on", a1);
        if (a1) a.setAttribute("aria-current", "step");
        else a.removeAttribute("aria-current");
      });
      var a = links[on];
      if (a && map.scrollWidth > map.clientWidth) {
        var x = a.offsetLeft - (map.clientWidth - a.offsetWidth) / 2;
        map.scrollTo({ left: Math.max(0, x), behavior: "smooth" });
      }
    }
  }
  function req() {
    if (!tick) {
      tick = true;
      requestAnimationFrame(upd);
    }
  }
  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      var s = secs[i];
      if (!s) return;
      e.preventDefault();
      var y = s.getBoundingClientRect().top + scrollY - navH - barH + (i === 0 ? 1 : 24);
      scrollTo({ top: y, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      if (history.replaceState) history.replaceState(null, "", "#" + s.id);
    });
  });
  document.querySelectorAll('.rq-loop a[href^="#stage-"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      links[0].click();
    });
  });
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", function () {
    size();
    place();
    req();
  });
  size();
  upd();
  if (document.fonts && document.fonts.ready)
    document.fonts.ready.then(function () {
      size();
      upd();
    });
})();
