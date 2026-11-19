/* Home banner "flick" (Ben, 19 Nov 2026): the sofa photo cuts through 15 backgrounds, one every 0.4 s, plays once and
   stays on the moon. Frame 1 is in the page so the banner shows at once; the other 14 load in the background and the
   run starts only when every frame is decoded, so it never stutters or shows a blank. Visitors who ask for reduced
   motion go straight to the moon. Same in light and dark mode. Frames: /site/v13/hero-flick/01-15.webp. */
(function () {
var img = document.querySelector('.hero-fig .frame img.h-flick'); if (!img) return;
var N = 15, STEP = 400, BASE = '/site/v13/hero-flick/';
var srcs = []; for (var i = 1; i <= N; i++) srcs.push(BASE + (i < 10 ? '0' : '') + i + '.webp');
var last = srcs[N - 1];
if (matchMedia('(prefers-reduced-motion: reduce)').matches) { img.src = last; return; }
function load(s) {
  var im = new Image(); im.decoding = 'async'; im.src = s;
  return (im.decode ? im.decode() : new Promise(function (ok, no) { im.onload = ok; im.onerror = no; })).then(function () { return im; });
}
var hero = document.querySelector('.hero');
function whenReady() {
  // let the banner's own entrance (fade in, headline rise) finish first
  return new Promise(function (ok) {
    var t0 = performance.now();
    (function wait() { if ((hero && hero.classList.contains('ready') && performance.now() - t0 > 1200) || performance.now() - t0 > 4000) ok(); else setTimeout(wait, 100); })();
  });
}
function start() {
  Promise.all(srcs.map(load)).then(function (frames) {
    return whenReady().then(function () { return frames; });
  }).then(function (frames) {
    var k = 0;
    (function next() {
      k++;
      if (k >= N) return;
      img.src = frames[k].src;
      setTimeout(next, STEP);
    })();
  }).catch(function () { /* a frame failed to load: leave the first photo in place */ });
}
if (document.readyState === 'complete') start(); else addEventListener('load', start);
})();
