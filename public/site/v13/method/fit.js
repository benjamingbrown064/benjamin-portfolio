/* Site addition (Doug, 19 Nov 2026): keep the method list inside the pinned screen with room underneath.
   With a stage open (Customer has four rows) the list in the design is taller than most laptop screens, so it ran
   past the bottom of the pinned view and met the next section with no space below it. On wide layouts this scales
   the left column down just enough that the tallest stage fits with a clear gap at the bottom. One scale per screen
   size (worked out for the tallest stage), so the text does not change size as you scroll. Phones are left alone. */
(function () {
var root = document.querySelector('.ms'); if (!root) return;
var stick = root.querySelector('.ms-stick'), ui = root.querySelector('.ms-ui');
var bodies = [].slice.call(root.querySelectorAll('.ms-bd'));
var wide = matchMedia('(min-width: 861px)'), GAP = 48;
function fit() {
  ui.style.transform = ''; ui.style.transformOrigin = '';
  if (!wide.matches) return;
  var open = root.querySelector('.ms-it.on .ms-bd');
  var openH = open ? open.getBoundingClientRect().height : 0;
  var tallest = Math.max.apply(null, bodies.map(function (b) { return b.firstElementChild.scrollHeight; }));
  var u = ui.getBoundingClientRect(), s = stick.getBoundingClientRect();
  var need = u.height - openH + tallest, room = s.bottom - u.top - GAP;
  var k = Math.min(1, room / need);
  if (k < 0.999) { ui.style.transformOrigin = '0 0'; ui.style.transform = 'scale(' + k.toFixed(4) + ')'; }
}
var t; function soon() { clearTimeout(t); t = setTimeout(fit, 80); }
addEventListener('resize', soon);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
addEventListener('load', fit);
fit();
})();
