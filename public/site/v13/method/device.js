/* v12: The method, as a device (Blender renders, method-v3). Scroll runs 0–4.6, one unit per stage. At each stage layer P(k) lowers onto stack S(k-1);
   in the last tenth of the drop the full render S(k) fades in over it with its true contact shadows, and only the newest settled stack stays visible.
   Scroll is eased toward its target every frame so the motion reads as weight, not as the wheel. Previous version: device-v1.js. */
(function () {
var root = document.querySelector('.ms'); if (!root) return;
var pin = root.querySelector('.ms-pin'), stage = root.querySelector('.md-stage');
var items = [].slice.call(root.querySelectorAll('.ms-it')), heads = items.map(function (it) { return it.querySelector('.ms-hd'); });
var glow = stage.querySelector('.md-glow'), title = stage.querySelector('.md-title');
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

var parts = [2, 3, 4, 5].map(function (k) {
  return { part: stage.querySelector('[data-part="' + k + '"]'), cast: stage.querySelector('[data-cast="' + k + '"]') };
});
var fulls = [1, 2, 3, 4, 5].map(function (k) { return stage.querySelector('[data-stage="' + k + '"]'); });
var N = 5, T_MAX = 4.6, LIFT = .28, START = .3, DUR = 1;
function cl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function inOut(v) { return v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2; }
function out(v) { return 1 - Math.pow(1 - v, 3); }
function soft(v) { return v * v * v * (v * (v * 6 - 15) + 10); }
// descent: decelerates into the seat with no hard start or stop
function glide(v) { return 1 - Math.pow(1 - soft(v), 1.6); }
function span() { return Math.max(1, pin.offsetHeight - innerHeight); }
function target() { return cl(-pin.getBoundingClientRect().top / span()) * T_MAX; }

var act = -1;
function setAct(i) {
  if (i === act) return; act = i;
  items.forEach(function (it, n) { it.classList.toggle('on', n === i); heads[n].setAttribute('aria-expanded', n === i ? 'true' : 'false'); });
}

function render(t) {
  var h = stage.clientHeight;
  var lands = parts.map(function (P, i) { return cl((t - i - START) / DUR); });
  parts.forEach(function (P, i) {
    var q = lands[i], land = glide(q), moving = q > 0 && q < 1;
    var y = reduce ? 0 : -(1 - land) * LIFT * h;
    P.part.style.transform = 'translate3d(0,' + y.toFixed(2) + 'px,0)';
    // fade runs across the first 70% of the descent, so the layer resolves as it lowers
    P.part.style.opacity = moving ? soft(cl(q / .7)).toFixed(3) : '0';
    // occlusion on the layer below: a gentle swell that peaks just before it seats
    P.cast.style.opacity = moving ? (.18 * Math.sin(Math.PI * soft(q))).toFixed(3) : '0';
  });
  // the layer is within a pixel of its seat for the last tenth, so the full render takes over there unseen
  var fade = [1].concat(lands.map(function (q) { return q >= 1 ? 1 : soft(cl((q - .9) / .1)); })), settled = 0;
  fade.forEach(function (f, j) { if (f > .999) settled = j; });
  fade.forEach(function (f, j) { fulls[j].style.opacity = (j < settled ? 0 : f).toFixed(3); });
  var last = soft(lands[lands.length - 1]), tt = soft(cl((last - .4) / .6));
  title.style.opacity = tt.toFixed(3);
  title.style.transform = reduce ? '' : 'translate3d(0,' + ((1 - tt) * 8).toFixed(2) + 'px,0)';
  glow.style.opacity = (last * .85).toFixed(3);
}

var cur = null, tgt = 0, running = false;
function tick() {
  tgt = target();
  setAct(Math.min(N - 1, Math.floor(tgt + .5)));
  if (cur === null || reduce) cur = tgt;
  var d = tgt - cur;
  cur = Math.abs(d) < .0004 ? tgt : cur + d * .085;
  render(cur);
  if (cur !== tgt) requestAnimationFrame(tick); else running = false;
}
function kick() { if (running) return; running = true; requestAnimationFrame(tick); }
addEventListener('scroll', kick, { passive: true });
addEventListener('resize', kick);

// decode every layer before the section arrives, so nothing pops in mid-descent
var imgs = [].slice.call(stage.querySelectorAll('img'));
new IntersectionObserver(function (es, o) {
  if (!es[0].isIntersecting) return; o.disconnect();
  imgs.forEach(function (im) { if (im.decode) im.decode().catch(function () {}); });
}, { rootMargin: '150% 0px' }).observe(root);

heads.forEach(function (b, i) {
  b.addEventListener('click', function () {
    var t = i === 0 ? 0 : Math.min(T_MAX, i + .3);
    scrollTo({ top: pin.getBoundingClientRect().top + pageYOffset + (t / T_MAX) * span(), behavior: reduce ? 'auto' : 'smooth' });
  });
});
tick();
})();
