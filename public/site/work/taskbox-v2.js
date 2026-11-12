(function () {
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  document.querySelectorAll(".tx-rv").forEach(function (el) {
    io.observe(el);
  });
  function fitUI() {
    document.querySelectorAll("[data-fit]").forEach(function (el) {
      var p = el.parentElement,
        cs = getComputedStyle(p),
        aw = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight),
        ah = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      el.style.zoom = 1;
      var s = Math.min(1, aw / el.offsetWidth, (ah > 40 ? ah : 1e4) / el.offsetHeight);
      el.style.zoom = s;
    });
  }
  addEventListener("resize", fitUI);
  addEventListener("load", fitUI);
  fitUI();
  document.querySelectorAll("[data-rail]").forEach(function (r) {
    var t = r.querySelector(".tx-track"),
      b = r.querySelectorAll(".tx-btn");
    function p() {
      t.style.scrollPaddingInline = getComputedStyle(t).paddingLeft;
    }
    function u() {
      b[0].disabled = t.scrollLeft < 4;
      b[1].disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    }
    b.forEach(function (x) {
      x.addEventListener("click", function () {
        var i = t.querySelector(".tx-it");
        t.scrollBy({ left: (i.offsetWidth + parseFloat(getComputedStyle(t).columnGap || 24)) * +x.dataset.dir, behavior: "smooth" });
      });
    });
    t.addEventListener("scroll", u, { passive: true });
    addEventListener("resize", function () {
      p();
      u();
    });
    p();
    t.scrollLeft = 0;
    u();
  });
  document.querySelectorAll("[data-frame]").forEach(function (b) {
    var W = +b.dataset.frame,
      f = b.querySelector("iframe");
    f.style.width = W + "px";
    function fit() {
      var s = b.clientWidth / W;
      f.style.transform = "scale(" + s + ")";
      f.style.height = b.clientHeight / s + "px";
    }
    new ResizeObserver(fit).observe(b);
    fit();
  });
  document.querySelectorAll(".tb-vid").forEach(function (f) {
    var b = f.parentNode,
      t0;
    function s() {
      f.style.transform = "scale(" + b.clientWidth / 1920 + ")";
    }
    new ResizeObserver(s).observe(b);
    s();
    var go = function () {
      if (t0) return;
      t0 = Date.now();
      w();
    };
    f.addEventListener("load", go, { once: true });
    try {
      var d0 = f.contentDocument;
      if (d0 && d0.readyState === "complete" && d0.URL !== "about:blank") go();
    } catch (e) {}
    setTimeout(function () {
      f.style.opacity = 1;
    }, 9000);
    function w() {
      var d;
      try {
        d = f.contentDocument;
      } catch (e) {}
      var st = d && d.querySelector("[data-om-starter]"),
        im = d ? [].slice.call(d.images) : [];
      if (
        st &&
        im.every(function (i) {
          return i.complete;
        }) &&
        (!d.fonts || d.fonts.status === "loaded")
      ) {
        setTimeout(function () {
          f.style.opacity = 1;
        }, 150);
        return;
      }
      if (Date.now() - t0 > 8000) {
        f.style.opacity = 1;
        return;
      }
      setTimeout(w, 100);
    }
  });
  var adv = document.getElementById("tx-advert");
  if (adv) {
    var v = adv.querySelector("video"),
      pb = adv.querySelector(".play");
    pb.addEventListener("click", function () {
      v.controls = true;
      v.play();
      pb.style.opacity = 0;
      pb.style.pointerEvents = "none";
    });
    v.addEventListener("ended", function () {
      v.controls = false;
      pb.style.opacity = 1;
      pb.style.pointerEvents = "auto";
    });
  }
  var st = document.getElementById("tb-stage");
  if (st) {
    var slot = st.querySelector(".tb-slot"),
      tp = document.getElementById("tb-tpl"),
      play = function () {
        slot.innerHTML = "";
        slot.appendChild(tp.content.cloneNode(true));
      };
    st.querySelector(".replay").addEventListener("click", play);
    var lo = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            play();
            lo.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );
    lo.observe(st);
  }
  var day = document.getElementById("tx-day");
  if (day) {
    var btns = [].slice.call(day.querySelectorAll(".tx-tl button")),
      sc = day.querySelectorAll(".tx-scene"),
      h = day.querySelector(".tx-dtx h3"),
      pp = day.querySelector(".tx-dtx p"),
      tl = day.querySelector(".tx-tl"),
      cur = 0,
      timer,
      auto = !matchMedia("(prefers-reduced-motion:reduce)").matches;
    function go(i) {
      cur = i;
      btns.forEach(function (b, k) {
        b.classList.toggle("on", k === i);
        b.classList.toggle("past", k < i);
      });
      sc.forEach(function (s, k) {
        s.classList.toggle("on", k === i);
      });
      h.textContent = btns[i].dataset.t;
      pp.textContent = btns[i].dataset.p;
      tl.style.setProperty("--p", i / (btns.length - 1));
      fitUI();
    }
    function loop() {
      clearInterval(timer);
      if (auto)
        timer = setInterval(function () {
          go((cur + 1) % btns.length);
        }, 4200);
    }
    btns.forEach(function (b, k) {
      b.addEventListener("click", function () {
        auto = false;
        clearInterval(timer);
        go(k);
      });
    });
    go(0);
    var dio = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) loop();
          else clearInterval(timer);
        });
      },
      { threshold: 0.4 },
    );
    dio.observe(day);
  }
})();
