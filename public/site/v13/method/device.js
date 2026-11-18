/* The method, as a device. v6 (Ben's method-device-pack-v6, 18 Nov 2026): Blender renders through one fixed orthographic
   camera. Scroll runs 0-4.6, one unit per stage. At each stage layer P(k) lowers onto stack S(k-1); in the last tenth of
   the drop S(k) fades in with its true contact shadows and only the newest settled stack stays visible. Four live level
   meters are drawn on the base screen (meter 01 from the start, 02-04 wake as their layers land) and a green light comes
   on when the lid lands. Motion values are v6's; the list markup and layout are the site's (ms-*). */
(function () {
var root = document.querySelector('.ms'); if (!root) return;
var pin = root.querySelector('.ms-pin'), stage = root.querySelector('.md-stage'), frame = stage.querySelector('.md-frame');
var items = [].slice.call(root.querySelectorAll('.ms-it')), heads = items.map(function (it) { return it.querySelector('.ms-hd'); });
var glow = stage.querySelector('.md-glow'), title = stage.querySelector('.md-title'), led = stage.querySelector('.md-led');
var screenEl = stage.querySelector('.md-screen'), canvas = stage.querySelector('.md-meters'), ctx = canvas.getContext('2d');
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

var parts = [2, 3, 4, 5].map(function (k) {
  return { part: stage.querySelector('[data-part="' + k + '"]'), cast: stage.querySelector('[data-cast="' + k + '"]') };
});
var fulls = [1, 2, 3, 4, 5].map(function (k) { return stage.querySelector('[data-stage="' + k + '"]'); });
var N = 5, T_MAX = 4.6, LIFT = .2;
function cl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function ease(v) { return v < .5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2; }
function span() { return Math.max(1, pin.offsetHeight - innerHeight); }
function position() { return cl(-pin.getBoundingClientRect().top / span()) * T_MAX; }

var act = -1;
function setAct(i) {
  if (i === act) return; act = i;
  items.forEach(function (it, n) { it.classList.toggle('on', n === i); heads[n].setAttribute('aria-expanded', n === i ? 'true' : 'false'); });
}

// ---------- live meters ----------
// The screen graphic is 2000x520 px; the canvas covers its meter area from (1290, 70). TL/TR/BL are the screen corners
// projected into the 1440x1360 render (from device.py project); orthographic, so one 2D matrix places it exactly.
(function () {
  var TL = [374.48, 877.45], TR = [618.86, 999.64], BL = [374.48, 955.05];
  var a = (TR[0] - TL[0]) / 2000, b = (TR[1] - TL[1]) / 2000, c = (BL[0] - TL[0]) / 520, d = (BL[1] - TL[1]) / 520;
  var e = TL[0] + a * 1290 + c * 70, f = TL[1] + b * 1290 + d * 70;
  canvas.style.transform = 'matrix(' + [a, b, c, d, e, f].join(',') + ')';
})();
function fitScreen() { screenEl.style.transform = 'scale(' + (frame.clientWidth / 1440) + ')'; }
var M = { x0: 10, top: 8, colw: 104, gap: 52, segs: 9, segh: 24, seggap: 9, r: 7 };
var meterLevels = [1, 0, 0, 0], level = [0, 0, 0, 0], peak = [0, 0, 0, 0], peakHold = [0, 0, 0, 0], seed = [0, 1.7, 3.1, 4.6];
var LIT = 'rgb(208, 93, 40)', HOT = 'rgb(232, 168, 122)', PEAK = 'rgba(226, 140, 92, 0.9)';
function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); ctx.fill();
}
function signal(i, t) {
  var s = seed[i];
  var v = .52 + .22 * Math.sin(t * 1.9 + s) + .14 * Math.sin(t * 5.3 + s * 2.3) + .12 * Math.sin(t * 11.7 + s * .7) + (Math.random() < .04 ? .3 : 0);
  return Math.max(0, Math.min(1, v));
}
function drawMeters(t, dt) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < 4; i++) {
    var awake = meterLevels[i], target = awake * (reduce ? .35 + .15 * i : signal(i, t));
    level[i] += (target - level[i]) * (target > level[i] ? Math.min(1, dt * 28) : Math.min(1, dt * 7));
    if (level[i] >= peak[i]) { peak[i] = level[i]; peakHold[i] = .45; }
    else if ((peakHold[i] -= dt) < 0) peak[i] = Math.max(level[i], peak[i] - dt * .6);
    var lit = Math.round(level[i] * M.segs), pk = Math.min(M.segs - 1, Math.round(peak[i] * M.segs) - 1), x = M.x0 + i * (M.colw + M.gap);
    for (var k = 0; k < M.segs; k++) {
      var on = k < lit, isPeak = !on && k === pk && awake > .05;
      if (!on && !isPeak) continue;
      ctx.fillStyle = isPeak ? PEAK : (k >= M.segs - 2 ? HOT : LIT);
      ctx.shadowColor = 'rgba(255, 110, 40, 0.55)'; ctx.shadowBlur = 10;
      roundRect(x, M.top + (M.segs - 1 - k) * (M.segh + M.seggap), M.colw, M.segh, M.r);
    }
  }
  ctx.shadowBlur = 0;
}

function render() {
  var t = position(), h = stage.clientHeight;
  var lands = parts.map(function (P, i) { return cl((t - i - .52) / .62); });
  parts.forEach(function (P, i) {
    var q = lands[i], land = ease(q), moving = q > 0 && q < 1;
    P.part.style.transform = 'translate3d(0,' + (reduce ? 0 : -(1 - land) * LIFT * h).toFixed(1) + 'px,0)';
    P.part.style.opacity = moving ? cl(q / .18).toFixed(3) : '0';
    P.cast.style.opacity = moving ? (.2 * land * (1 - land) * 4).toFixed(3) : '0';
  });
  var fade = [1].concat(lands.map(function (q) { return q >= 1 ? 1 : cl((q - .9) / .1); })), settled = 0;
  fade.forEach(function (f, j) { if (f > .999) settled = j; });
  fade.forEach(function (f, j) { fulls[j].style.opacity = (j < settled ? 0 : f).toFixed(3); });
  var last = ease(lands[lands.length - 1]), done = lands[lands.length - 1] >= 1;
  title.style.opacity = cl((last - .6) / .4).toFixed(3);
  led.classList.toggle('on', done); glow.classList.toggle('on', done);
  meterLevels = [1, ease(lands[0]), ease(lands[1]), ease(lands[2])];
  fitScreen();
  setAct(Math.min(N - 1, Math.floor(t + .5)));
}

var running = false, lastT = 0, inView = true;
function loop(now) {
  var t = now / 1000, dt = Math.min(.05, lastT ? t - lastT : .016); lastT = t;
  drawMeters(t, dt);
  if (inView && !reduce) requestAnimationFrame(loop); else running = false;
}
function kick() { if (!running) { running = true; lastT = 0; requestAnimationFrame(loop); } }
var queued = false;
function onScroll() {
  if (queued) return; queued = true;
  requestAnimationFrame(function () { queued = false; render(); if (reduce) drawMeters(0, 1); });
}
addEventListener('scroll', onScroll, { passive: true });
addEventListener('resize', onScroll);

// decode every layer before the section arrives so nothing pops in mid-drop; run the meters only while on screen
var imgs = [].slice.call(stage.querySelectorAll('img'));
new IntersectionObserver(function (es, o) {
  if (!es[0].isIntersecting) return; o.disconnect();
  imgs.forEach(function (im) { if (im.decode) im.decode().catch(function () {}); });
}, { rootMargin: '150% 0px' }).observe(root);
new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView) kick(); }).observe(stage);

heads.forEach(function (b, i) {
  b.addEventListener('click', function () {
    var t = i === 0 ? 0 : Math.min(T_MAX, i + .3);
    scrollTo({ top: pin.getBoundingClientRect().top + pageYOffset + (t / T_MAX) * span(), behavior: reduce ? 'auto' : 'smooth' });
  });
});
render(); kick();
if (reduce) drawMeters(0, 1);
})();
