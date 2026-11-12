/* Equation banner overlays: restart the embedded animation from frame one each time its slide comes in. */
(function () {
  function hook(p) {
    var f = p.querySelector("iframe");
    if (!f) return;
    var was = p.classList.contains("on");
    var restart = function () {
      try {
        f.contentWindow.postMessage("bb:restart", "*");
      } catch (e) {}
    };
    new MutationObserver(function () {
      var on = p.classList.contains("on");
      if (on && !was) restart();
      was = on;
    }).observe(p, { attributes: true, attributeFilter: ["class"] });
  }
  var go = function () {
    document.querySelectorAll(".eqx-tb").forEach(hook);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go);
  else go();
})();
