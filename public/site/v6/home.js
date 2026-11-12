document.querySelectorAll("[data-hrail]").forEach(function (t) {
  var c = t.closest("section").querySelector("[data-hrail-ctl]"),
    pv = c.querySelector("[data-hprev]"),
    nx = c.querySelector("[data-hnext]");
  function step() {
    var k = t.children[0];
    return k ? k.getBoundingClientRect().width + parseFloat(getComputedStyle(t).columnGap || 20) : 400;
  }
  function st() {
    pv.disabled = t.scrollLeft < 4;
    nx.disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
  }
  pv.addEventListener("click", function () {
    t.scrollBy({ left: -step(), behavior: "smooth" });
  });
  nx.addEventListener("click", function () {
    t.scrollBy({ left: step(), behavior: "smooth" });
  });
  t.addEventListener("scroll", st, { passive: true });
  addEventListener("resize", st);
  t.scrollLeft = 0;
  st();
});
