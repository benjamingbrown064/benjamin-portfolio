/* Skills page: ten area rows; each opens a side panel with the area's promise, overview and skills. Deep links via #area-slug. */
(function () {
  var el = document.getElementById("sk-data");
  if (!el) return;
  var V = JSON.parse(el.textContent);
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var XI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  var L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>',
    R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';
  var d = document.createElement("div");
  d.className = "skd";
  d.innerHTML =
    '<div class="skd-scrim" data-close></div><aside class="skd-p" role="dialog" aria-modal="true" aria-labelledby="skd-t"><header class="skd-h"><span class="skd-k"></span><button type="button" class="skd-x" data-close aria-label="Close">' +
    XI +
    '</button></header><div class="skd-b"></div><footer class="skd-f"><button type="button" class="skd-nv" data-step="-1"></button><button type="button" class="skd-nv nx" data-step="1"></button></footer></aside>';
  document.body.appendChild(d);
  var body = d.querySelector(".skd-b"),
    kick = d.querySelector(".skd-k"),
    prev = d.querySelector('[data-step="-1"]'),
    next = d.querySelector('[data-step="1"]'),
    cur = -1,
    last = null,
    root = document.documentElement;
  function render(i, dir) {
    var v = V[i];
    cur = i;
    kick.innerHTML = "Step <b>" + v.n + "</b> / " + V.length + (v.stage ? " · " + esc(v.stage) : "");
    body.innerHTML =
      '<div class="skd-c' +
      (dir ? " from-" + (dir > 0 ? "r" : "l") : "") +
      '"><span class="skd-eb">' +
      esc(v.name) +
      " · " +
      v.rows.length +
      ' skills</span><h2 id="skd-t" class="skd-t">' +
      esc(v.q || v.promise) +
      "</h2>" +
      (v.why
        ? '<dl class="skd-w"><div><dt>Why it sits here</dt><dd>' +
          esc(v.why) +
          "</dd></div><div><dt>Hands to the next step</dt><dd>" +
          esc(v.hand) +
          "</dd></div></dl>"
        : "") +
      v.paras
        .map(function (p) {
          return '<p class="skd-o">' + esc(p) + "</p>";
        })
        .join("") +
      '<ul class="skd-g">' +
      v.rows
        .map(function (r, j) {
          return (
            '<li style="--j:' +
            j +
            '">' +
            (r[2] ? '<i class="skd-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#bb-' + r[2] + '"></use></svg></i>' : "") +
            "<b>" +
            esc(r[0]) +
            "</b><span>" +
            esc(r[1]) +
            "</span></li>"
          );
        })
        .join("") +
      "</ul>" +
      (v.note ? '<p class="skd-note">' + esc(v.note) + "</p>" : "") +
      '<div class="skd-cta"><a class="btn" href="#contact" data-contact-open data-type="project" data-brief="' +
      esc("I would like to talk about " + v.name.toLowerCase() + ".") +
      '">Talk about ' +
      esc(v.name.split(" and ")[0].toLowerCase()) +
      ' <span class="arr">→</span></a></div></div>';
    var p = V[(i + V.length - 1) % V.length],
      n = V[(i + 1) % V.length];
    prev.innerHTML = L + "<span><small>Previous</small>" + esc(p.name) + "</span>";
    next.innerHTML = "<span><small>Next</small>" + esc(n.name) + "</span>" + R;
    body.scrollTop = 0;
    if (history.replaceState) history.replaceState(null, "", "#" + v.id);
  }
  function open(i, src) {
    last = src || document.activeElement;
    render(i, 0);
    d.classList.remove("out");
    d.classList.add("on");
    root.classList.add("skd-lock");
    setTimeout(function () {
      d.querySelector(".skd-x").focus({ preventScroll: true });
    }, 60);
  }
  function close() {
    if (!d.classList.contains("on")) return;
    d.classList.add("out");
    setTimeout(
      function () {
        d.classList.remove("on", "out");
        root.classList.remove("skd-lock");
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320,
    );
    if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  document.querySelectorAll(".ska,[data-sk]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      open(+a.dataset.i, a);
    });
  });
  d.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) {
      close();
      return;
    }
    var s = e.target.closest("[data-step]");
    if (s) {
      render((cur + +s.dataset.step + V.length) % V.length, +s.dataset.step);
      return;
    }
    if (e.target.closest("[data-contact-open]")) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!d.classList.contains("on")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if ((e.key === "ArrowRight" || e.key === "ArrowLeft") && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
      e.preventDefault();
      var s = e.key === "ArrowRight" ? 1 : -1;
      render((cur + s + V.length) % V.length, s);
      return;
    }
    if (e.key === "Tab") {
      var f = [].slice.call(d.querySelectorAll("button,a[href]")),
        a = f[0],
        z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    }
  });
  var sx = 0,
    sy = 0;
  d.addEventListener(
    "touchstart",
    function (e) {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    },
    { passive: true },
  );
  d.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - sx,
      dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 70 && Math.abs(dy) < Math.abs(dx) * 0.6) {
      var s = dx < 0 ? 1 : -1;
      render((cur + s + V.length) % V.length, s);
    }
  });
  var h = location.hash.slice(1);
  if (h) {
    var k = V.findIndex(function (v) {
      return v.id === h;
    });
    if (k >= 0) open(k);
  }
})();
