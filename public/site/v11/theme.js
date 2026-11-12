/* v11 theme switch: applies the saved theme before paint, then adds the toggle to the nav. */
(function () {
  var K = "bb-theme",
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
      '<i class="nb-ic" aria-hidden="true"><svg class="moon" viewBox="0 0 24 24"><path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a6.6 6.6 0 0 0 10 10z"></path></svg><svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"></path></svg></i>';
    r.insertBefore(b, r.querySelector(".nav-btn"));
    b.addEventListener("click", function () {
      var t = cur() === "dark" ? "light" : "dark",
        go = function () {
          set(t, true);
        };
      if (document.startViewTransition && !matchMedia("(prefers-reduced-motion:reduce)").matches) document.startViewTransition(go);
      else go();
    });
    set(cur());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
