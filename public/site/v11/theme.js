/* v11 theme switch: applies the saved theme before paint, then adds the toggle to the nav.
   The toggle is a watch-style moonphase dial: moon and sun sit on opposite sides of one disc behind a round aperture.
   Click turns the disc half a turn (always clockwise). Hover winds it one full turn, so the other face passes the window. */
(function () {
  var TB = (function () {
      var s = (document.currentScript && document.currentScript.src) || "";
      return s.replace(/v11\/theme\.js.*$/, "");
    })(),
    K = "bb-theme",
    d = document.documentElement,
    saved = null;
  try {
    saved = localStorage.getItem(K);
  } catch (e) {}
  function cur() {
    return d.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  function set(t, save) {
    if (t === "dark") d.setAttribute("data-theme", "dark");
    else d.removeAttribute("data-theme");
    if (save)
      try {
        localStorage.setItem(K, t);
      } catch (e) {}
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute("content", t === "dark" ? "#000000" : "#F5F5F7");
    var b = document.querySelector(".th-btn");
    if (b) {
      var n = t === "dark" ? "Switch to light mode" : "Switch to dark mode";
      b.setAttribute("aria-label", n);
      b.title = n;
      b.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    }
  }
  set(saved === "dark" ? "dark" : "light");
  function init() {
    var r = document.querySelector(".nav-r");
    if (!r || r.querySelector(".th-btn")) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "th-btn";
    b.innerHTML =
      '<i class="nb-ic" aria-hidden="true"><svg class="th-dial" viewBox="0 0 24 24"><defs><clipPath id="thAp"><circle cx="12" cy="12" r="11.6"></circle></clipPath></defs><g clip-path="url(#thAp)"><g class="th-wind"><g class="th-disc"><path class="moon" d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.6 6.6 0 0 0 10 10z"></path><g class="sun" transform="rotate(180 12 27)"><circle cx="12" cy="12" r="4"></circle><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"></path></g><path class="spk" d="M12 7.6c.4 2.5 1.9 4 4.4 4.4-2.5.4-4 1.9-4.4 4.4-.4-2.5-1.9-4-4.4-4.4 2.5-.4 4-1.9 4.4-4.4z" transform="rotate(90 12 27)"></path><path class="spk" d="M12 7.6c.4 2.5 1.9 4 4.4 4.4-2.5.4-4 1.9-4.4 4.4-.4-2.5-1.9-4-4.4-4.4 2.5-.4 4-1.9 4.4-4.4z" transform="rotate(-90 12 27)"></path><circle class="spk" cx="12" cy="12" r="1.1" transform="rotate(60 12 27)"></circle><circle class="spk" cx="12" cy="12" r="1.1" transform="rotate(-60 12 27)"></circle><circle class="spk" cx="12" cy="12" r="1.1" transform="rotate(120 12 27)"></circle><circle class="spk" cx="12" cy="12" r="1.1" transform="rotate(-120 12 27)"></circle></g></g></g></svg></i>';
    r.insertBefore(b, r.querySelector(".nav-btn"));
    if (!r.querySelector(".lg-btn")) {
      var lg = document.createElement("a");
      lg.className = "nav-btn lg-btn";
      lg.href = "/login";
      if (/^\/login\/?$/.test(location.pathname)) lg.setAttribute("aria-current", "page");
      lg.setAttribute("data-login", "");
      lg.setAttribute("aria-label", "Log in");
      lg.title = "Log in";
      lg.innerHTML =
        '<i class="nb-ic" aria-hidden="true"><svg class="lk" viewBox="0 0 24 24"><path class="lk-sh" d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"></path><rect x="5" y="10.5" width="14" height="10" rx="2.6"></rect><path class="lk-kh" d="M12 14.6v2"></path></svg></i>';
      r.appendChild(lg);
    }
    var disc = b.querySelector(".th-disc"),
      turns = cur() === "dark" ? 1 : 0;
    disc.style.setProperty("--disc", turns * 180 + "deg");
    b.addEventListener("pointerenter", function (e) {
      if (e.pointerType === "touch" || b.classList.contains("is-wind")) return;
      b.classList.add("is-wind");
    });
    b.addEventListener("animationend", function () {
      b.classList.remove("is-wind");
    });
    b.addEventListener("click", function () {
      var t = cur() === "dark" ? "light" : "dark",
        go = function () {
          set(t, true);
        };
      b.classList.remove("is-wind");
      turns++;
      disc.style.setProperty("--disc", turns * 180 + "deg");
      if (document.startViewTransition && !matchMedia("(prefers-reduced-motion:reduce)").matches) document.startViewTransition(go);
      else go();
    });
    set(cur());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
