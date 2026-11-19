/* v12: The method, as a device (Blender renders, method-v8, 20 Nov 2026: satin finish, device D1..D5 and floor shadow H1..H5 as separate layers; live screen meters, green finish light).
   Timing, easing and the weighted scroll are unchanged from the version before (Ben: "keep the current speed"). Scroll runs 0–4.6, one unit per stage. At each stage layer P(k) lowers onto device D(k-1);
   in the last tenth of the drop D(k) fades in over it, and only the newest settled one stays visible. The floor shadow mixes from H(k-1) to H(k) as the layer comes down.
   Scroll is eased toward its target every frame so the motion reads as weight, not as the wheel. Previous version: device-v1.js. */
(function () {
var root = document.querySelector('.ms'); if (!root) return;
var pin = root.querySelector('.ms-pin'), stage = root.querySelector('.md-stage');
var items = [].slice.call(root.querySelectorAll('.ms-it')), heads = items.map(function (it) { return it.querySelector('.ms-hd'); });
// mobile card title comes from the area name
items.forEach(function (it) { var bd = it.querySelector('.ms-bd'), nm = it.querySelector('.ms-hd b'); if (bd && nm) bd.setAttribute('data-t', nm.textContent); });
var glow = stage.querySelector('.md-glow'), title = stage.querySelector('.md-title');
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

var parts = [2, 3, 4, 5].map(function (k) {
  return { part: stage.querySelector('[data-part="' + k + '"]'), cast: stage.querySelector('[data-cast="' + k + '"]') };
});
var fulls = [1, 2, 3, 4, 5].map(function (k) { return stage.querySelector('[data-stage="' + k + '"]'); });
var shadows = [1, 2, 3, 4, 5].map(function (k) { return stage.querySelector('[data-shadow="' + k + '"]'); });
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
  // the floor shadow grows with each layer: one smooth mix between the shadow before and after, weighted by how far the layer has dropped
  var sh = lands.reduce(function (a, q) { return a + glide(q); }, 0), sj = Math.min(3, Math.floor(sh)), sw = sh - sj;
  shadows.forEach(function (el, n) { el.style.opacity = (n === sj ? 1 - sw : n === sj + 1 ? sw : 0).toFixed(4); });
  var last = soft(lands[lands.length - 1]), tt = soft(cl((last - .4) / .6));
  title.style.opacity = tt.toFixed(3);
  title.style.transform = reduce ? '' : 'translate3d(0,' + ((1 - tt) * 8).toFixed(2) + 'px,0)';
  var done = lands[lands.length - 1] >= 1;
  finish.classList.toggle('on', done); glow.classList.toggle('on', done);
  // meter 01 is the base (Direction); 02 to 04 wake as their layers land
  awake = [1, inOut(lands[0]), inOut(lands[1]), inOut(lands[2])];
  fitScreen();
}

// live meters. Screen graphic is 2000×520; the canvas covers its meter area from (1290,70).
var finish = stage.querySelector('.md-finish'), screenEl = stage.querySelector('.md-screen'), canvas = screenEl.querySelector('canvas'), ctx = canvas.getContext('2d');
(function () {
  // Screen corners projected into the 1440×1360 render (python device.py project). v8's camera is a real perspective
  // lens, so the canvas is fitted with a full projective (homography) transform rather than a flat one.
  var P = { tl: [373.49, 877.80], tr: [611.67, 1014.12], br: [613.09, 1093.37], bl: [377.74, 953.74] };
  var x0 = P.tl[0], y0 = P.tl[1], x1 = P.tr[0], y1 = P.tr[1], x2 = P.br[0], y2 = P.br[1], x3 = P.bl[0], y3 = P.bl[1];
  var dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  var den = dx1 * dy2 - dx2 * dy1, g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
  var a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, c = x0, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3, f = y0;
  // canvas pixel (px, py) is screen-graphic pixel (1290 + px, 70 + py) of 2000×520
  var su = 1 / 2000, sv = 1 / 520, ou = 1290 / 2000, ov = 70 / 520;
  canvas.style.transform = 'matrix3d(' + [a * su, d * su, 0, g * su, b * sv, e * sv, 0, h * sv, 0, 0, 1, 0, a * ou + b * ov + c, d * ou + e * ov + f, 0, g * ou + h * ov + 1].join(',') + ')';
})();
// the stage shows source 200–1300 on both axes
function fitScreen() { var s = stage.clientWidth / 1100; screenEl.style.transform = 'translate(' + (-200 * s) + 'px,' + (-200 * s) + 'px) scale(' + s + ')'; }
var M = { x0: 10, top: 8, colw: 104, gap: 52, segs: 9, segh: 24, seggap: 9, r: 7 };
var awake = [1, 0, 0, 0], level = [0, 0, 0, 0], peak = [0, 0, 0, 0], hold = [0, 0, 0, 0], seed = [0, 1.7, 3.1, 4.6];
var LIT = 'rgb(230,104,50)', HOT = 'rgb(246,176,140)', PEAK = 'rgba(240,140,96,.9)'; // matched to the v8 rendered screen
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill(); }
function sig(i, t) { var s = seed[i]; return cl(.52 + .22 * Math.sin(t * 1.9 + s) + .14 * Math.sin(t * 5.3 + s * 2.3) + .12 * Math.sin(t * 11.7 + s * .7) + (Math.random() < .04 ? .3 : 0)); }
function draw(t, dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = 'rgba(255,110,40,.55)'; ctx.shadowBlur = 10;
  for (var i = 0; i < 4; i++) {
    var w = awake[i], tg = w * (reduce ? .35 + .15 * i : sig(i, t));
    // fast attack, slower release, short peak hold
    level[i] += (tg - level[i]) * Math.min(1, dt * (tg > level[i] ? 28 : 7));
    if (level[i] >= peak[i]) { peak[i] = level[i]; hold[i] = .45; } else if ((hold[i] -= dt) < 0) peak[i] = Math.max(level[i], peak[i] - dt * .6);
    var lit = Math.round(level[i] * M.segs), pk = Math.min(M.segs - 1, Math.round(peak[i] * M.segs) - 1), x = M.x0 + i * (M.colw + M.gap);
    for (var k = 0; k < M.segs; k++) {
      var on = k < lit, isPk = !on && k === pk && w > .05;
      if (!on && !isPk) continue;
      ctx.fillStyle = isPk ? PEAK : (k >= M.segs - 2 ? HOT : LIT);
      rr(x, M.top + (M.segs - 1 - k) * (M.segh + M.seggap), M.colw, M.segh, M.r);
    }
  }
  ctx.shadowBlur = 0;
}
var mRun = false, lastT = 0, inView = false;
function loop(now) {
  var t = now / 1000, dt = Math.min(.05, lastT ? t - lastT : .016); lastT = t;
  draw(t, dt);
  if (inView && !reduce) requestAnimationFrame(loop); else mRun = false;
}
function mKick() { if (reduce) { draw(0, 1); return; } if (!mRun) { mRun = true; lastT = 0; requestAnimationFrame(loop); } }
new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView) mKick(); }).observe(stage);

var cur = null, tgt = 0, running = false;
function tick() {
  tgt = target();
  setAct(Math.min(N - 1, Math.floor(tgt + .5)));
  if (cur === null || reduce) cur = tgt;
  var d = tgt - cur;
  cur = Math.abs(d) < .0004 ? tgt : cur + d * .085;
  render(cur);
  if (reduce) draw(0, 1);
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
