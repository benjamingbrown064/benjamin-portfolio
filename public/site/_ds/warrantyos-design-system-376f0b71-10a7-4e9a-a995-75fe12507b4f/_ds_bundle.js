/* @ds-bundle: {"format":4,"namespace":"WarrantyOSDesignSystem_376f0b","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"Dot","sourcePath":"components/brand/Dot.jsx"},{"name":"Endorsement","sourcePath":"components/brand/Endorsement.jsx"},{"name":"GLYPHS","sourcePath":"components/brand/Glyph.jsx"},{"name":"Glyph","sourcePath":"components/brand/Glyph.jsx"},{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"MonogramMark","sourcePath":"components/brand/Monogram.jsx"},{"name":"Monogram","sourcePath":"components/brand/Monogram.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"DotList","sourcePath":"components/data/DotList.jsx"},{"name":"Figure","sourcePath":"components/data/Figure.jsx"},{"name":"HairGrid","sourcePath":"components/data/HairGrid.jsx"},{"name":"MicroLabel","sourcePath":"components/data/HairGrid.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Eyebrow","sourcePath":"components/navigation/Eyebrow.jsx"},{"name":"NavItem","sourcePath":"components/navigation/NavItem.jsx"},{"name":"Pill","sourcePath":"components/status/Pill.jsx"},{"name":"StatusDot","sourcePath":"components/status/StatusDot.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Tile","sourcePath":"components/surfaces/Tile.jsx"}],"sourceHashes":{"assets/motion/animations-v3.jsx":"06ae64d470d6","assets/motion/tweaks-panel.jsx":"d259e3a86f73","components/actions/Button.jsx":"4d0bb7e15fca","components/brand/Dot.jsx":"0044a542d8df","components/brand/Endorsement.jsx":"7ac8e2c80f3e","components/brand/Glyph.jsx":"3f7217c75c7c","components/brand/Lockup.jsx":"a5d771f2178b","components/brand/Monogram.jsx":"cd79474a4fbe","components/brand/Wordmark.jsx":"74df8bc0bd30","components/data/DotList.jsx":"6c2b5a0f980c","components/data/Figure.jsx":"43ae61cb89a4","components/data/HairGrid.jsx":"443252f86e01","components/forms/Input.jsx":"4655dcd7573b","components/navigation/Eyebrow.jsx":"6f9a6b005f02","components/navigation/NavItem.jsx":"d2d53be62561","components/status/Pill.jsx":"85f71fab45cc","components/status/StatusDot.jsx":"8711620e9e7a","components/surfaces/Card.jsx":"ac01d9a2a9b6","components/surfaces/Tile.jsx":"7e2de2af9689","ui_kits/dealer-portal/ClaimsDesk.jsx":"ac60d3c11a7e","ui_kits/dealer-portal/CustomerPortal.jsx":"c24a1928dd58","ui_kits/dealer-portal/DealerPortal.jsx":"b950c8a2fbd5","ui_kits/dealer-portal/Programme.jsx":"c1fb7f7510b7","ui_kits/dealer-portal/Shell.jsx":"30579eeecfc5"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WarrantyOSDesignSystem_376f0b = window.WarrantyOSDesignSystem_376f0b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/motion/animations-v3.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// animations-v3.jsx — continuous-composition animation engine.
//
// THE MODEL: the animation is ONE element tree rendered as a pure function
// of one authored-time axis. Nothing mounts or unmounts at section
// boundaries, so any element can move, morph, or persist across them by
// ordinary interpolation. The scene list (OM_SCENES) is the user-control
// view — names, order, playback durations — and the engine derives the cue
// table from it, so structure has exactly one source and cannot drift.
//
// API INDEX (every export is a window global):
//   <CompositionStage width height scenes={window.OM_SCENES}
//                     playback={window.OM_PLAYBACK} bg>
//     <Piece />   — ONE component, the whole animation
//   </CompositionStage>
//   useComposition() -> {T, CUES, time, duration, authoredTotal, playing}
//     T: authored seconds (warped per-section by user trims/speeds) —
//        key ALL choreography to T, never to wall-clock time
//     CUES: {SectionName: authoredStart} derived from OM_SCENES; an unknown
//        name returns NaN and raises a preview-only badge (never exports);
//        duplicate section names bind to the first occurrence
//   <Shot from={CUES.Build} to={CUES.Close}> — children visible between two
//     authored times (an authored hard cut in one line); children stay
//     mounted (media keeps its readiness) and are hidden outside the window
//   <Captions items={[{at, until?, text}, ...]} /> — ONE caption element,
//     at most one visible at a time, keyed to T; 'until' defaults to the
//     next item's 'at'; a last item with no 'until' stays to the end
//   WATERCOLOR (only when the Watercolor illustration skill is active —
//   otherwise ignore these entries). A painting is a function(p) written
//   against the paint kit, on a width x height sheet; it needs
//   watercolor_kit.js loaded by a <script> tag before this engine, must
//   be a stable function defined once (module scope, never an inline
//   arrow), and every component below renders <img> elements, so it all
//   exports by construction.
//   <WatercolorPainting painting={fn} from={CUES.X} to={CUES.Y} width height
//     seed scale quality style /> — the painting assembled from its own
//     STROKES: each wash / ink line / splatter is a separate layer
//     stacked over the paper, appearing in painting order between two
//     authored times (washes bloom in, ink draws tip to tail). This is the
//     default way to show a watercolor being painted. It keeps the sheet's
//     aspect ratio (size it with style, e.g. {position:'absolute', left,
//     top, width}). scale is the layers' render resolution over width x
//     height (default 1, a deliberate weight-over-dpi trade — raise it
//     toward the zoom factor if the composition zooms into the painting,
//     or toward the devicePixelRatio for a hero-sized sheet); quality is
//     0..1 layer image quality (default 0.92; 1 is the encoder's maximum).
//   useWatercolorLayers(fn, {width, height, seed, scale, quality}) -> L
//     (null if the kit isn't loaded — load watercolor_kit.js before the
//     engine — or if the painting fails to build) — the painting taken apart into strokes, for
//     choreography beyond in-order painting: L.count strokes, L.kind(i)
//     ('wash' | 'gradedWash' | 'glaze' | 'ink' | 'hatch' | 'splatter' |
//     'dryStroke' | 'reserve' | 'caption'), L.span(i) = the stroke's
//     {from, to} share of the painting's 0..1 timeline; call L.warm()
//     once after load so finished strokes pre-render off the critical
//     path (WatercolorPainting does this itself). Compose with:
//   <WatercolorSheet layers={L} style>children</WatercolorSheet> — the
//     paper the strokes sit on (keeps the sheet's aspect ratio), and
//   <WatercolorStroke index={i} at={0..1} style /> — stroke i as its own
//     element, placed where it was painted; at is its painting progress
//     (0 hidden, 1 finished — drive it from T with animate()); style lets
//     you move, scale, rotate, or fade the stroke (transform / opacity).
//     Strokes are paint, so they multiply: overlapping strokes darken
//     where they cross, as in the still image, within a few 8-bit levels
//     (tighter still at quality 1). The sheet clips to its
//     box — for strokes that fly in from outside it, set
//     style={{overflow: 'visible'}} on the WatercolorSheet. 'reserve' strokes
//     are erasures (lifted paper) — keep them where they were painted and
//     reveal them in order after the strokes they erase; moving an erase
//     around has no sensible meaning.
//   <WatercolorReveal painting={fn} from={CUES.X} to={CUES.Y} width height
//     seed steps scale format quality style />, or <WatercolorReveal
//     frames={[src, ...]} from to /> — the whole painting as ONE flat
//     image that paints on (frames pre-baked in the background, so it is
//     the lightest option and the one to zoom or pan over as a single
//     picture). Prefer WatercolorPainting when the strokes themselves
//     should appear one by one or be individually animated. format is
//     the image MIME type (default image/jpeg), quality 0..1 (default
//     0.88). Frames bake at width x height times scale (default: the
//     device pixel ratio, capped at 2) — if the composition zooms INTO
//     the painting, raise scale toward the maximum zoom so frames stay
//     crisp. The kit caps a sheet at ~12M pixels and the components clamp
//     scale to stay under it; exported video sharpness also depends on
//     the export dialog's own resolution choice.
//   Motion: Easing.{linear, easeIn|Out|InOutQuad/Cubic/Quart/Expo/Sine,
//     easeIn|Out|InOutBack, easeOutElastic}, interpolate(input, output, ease),
//     animate({from, to, start, end, ease}) -> fn(T), clamp(v, min, max)
//   Plumbing (rarely needed): Stage, PlaybackBar, TimelineContext,
//     useTime, useTimeline
//   Seek event (host/export transport): 'data-om-seek-to-time-frame',
//     detail {time, sync, playing} — the stage owns it; never implement it
//     yourself
//
// THE AUTHORING CONTRACT — this is what makes the host timeline's trim and
// speed gestures write back into YOUR file, so follow it exactly:
//   1. Declare the scene list as a JSON string literal in a plain inline
//      <script> of the main document (NOT type="text/babel", NOT a sibling
//      .jsx — only vanilla inline scripts are addressable for write-back):
//        <script>window.OM_SCENES = '[{"name":"Opening","dur":3,"desc":"The logo fades in and the title settles"},{"name":"Build","dur":5,"desc":"Bars grow to their final values"}]';</script>
//      Give every entry a "desc": one short plain-words sentence saying
//      what happens in that section. The user reads it in the timeline's
//      section popover — keep it true whenever you edit the section.
//   2. Pass the string through untouched:
//        <CompositionStage scenes={window.OM_SCENES} ...>
//   3. ALSO declare the playback setting the same way:
//        <script>window.OM_PLAYBACK = '{"mode":"loop"}';</script>
//      and pass it through untouched (values: '{"mode":"loop"}' or
//      '{"mode":"times","count":N}'; omitting keeps loop behavior but
//      leaves the host Repeat control read-only for this document).
//   IMPORTANT — the exportable-video contract: CompositionStage/Stage OWNS
//   it (the data-om-exportable-video-with-duration-secs attribute, the
//   data-om-seek-to-time-frame listener, the svg/foreignObject wrapper,
//   and font inlining). NEVER put the exportable attribute on any other
//   element — a second "exportable root" makes the host timeline and the
//   video exporter bind to the wrong element, and playback control /
//   export silently break.
//
// HOW TIME WORKS: each OM_SCENES entry is a named slice of the authored
// timeline. CUES.Name is that section's authored start (the running sum of
// authored lengths, in literal order). useComposition().T is the authored
// clock: when the user trims or speeds a section on the host timeline, the
// engine replays that section's SAME authored slice over the new playback
// length — your choreography retimes, never cuts off. The optional "nat"
// field on an entry is the engine's authored-length anchor — the host
// timeline stamps it on the first retime; don't set it by hand.
//
// CUE-FIRST DISCIPLINE (what makes a piece read as one continuous video):
//   1. Write the OM_SCENES literal FIRST — it is the piece's outline.
//   2. One helper component per section for readability, but ALL of them
//      render ALL the time inside the one tree, keyed to CUES — never
//      conditionally mounted per section.
//   3. Define exactly three motion helpers up front (e.g.
//      MOTION = {enter, draw, pop} wrapping Easing curves) and use no
//      easing or transform outside them; one caption element, one visible
//      at a time (<Captions> has this built in).
//   A shared element that crosses a boundary is just motion whose start
//   and end straddle a cue: animate({from, to, start: CUES.Build - 0.4,
//   end: CUES.Build + 0.6})(T) glides through the boundary, and a user
//   slowing either section slows the glide without breaking it.
//
// RENDER FROM T ONLY: the exporter seeks each frame with a synchronous
// commit and may serialize the stage the moment the seek event returns —
// anything painted from useEffect or your own requestAnimationFrame lags
// that commit and exports stale. Render everything visible from T and this
// is automatic. A seeked frame is a deterministic render at that time.
//
// HARD CUTS are content now, not structure: wrap a shot's elements in
// <Shot from to> (visibility toggles at the cues; children stay mounted so
// images and videos hold their readiness). Shot also doubles as the
// perf gate for heavy far-away beats.
//
// LOOP SEAMS are the one surviving boundary rule: a looping piece shows
// its last authored frame immediately before its first — make them match
// (settle your choreography by authoredTotal, open it at 0).
//
// DIAGNOSTICS: choreography that references an unknown section name (a
// rename or deletion in OM_SCENES) shows a badge below the stage in the
// preview, outside the exportable svg — visible in preview screenshots,
// never in the exported video. An OM_SCENES section with no choreography
// keyed to it is a valid empty beat, not an error.
/* END USAGE */

// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// How long a marked (detail.playing === true) host seek keeps the
// external-playback latch alive with no successor. The host play bar's
// seek pump is one-in-flight/latest-wins, so its inter-seek gap is tens
// of milliseconds in the worst case — 400ms is far above that, so a
// marked stream that dies mid-play decays the latch promptly.
var SS_EXT_PLAY_MS = 400;

// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try {
          cssRules = ss.cssRules;
        } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => {
                if (!r.ok) throw 0;
                return r.text();
              });
              for (const ff of txt.match(/@font-face\s*{[^}]*}/g) || []) rules.push({
                css: ff,
                base: ss.href
              });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({
              css: r.cssText,
              base: ss.href || location.href
            });
          }
        }
      }
      const toDataURL = url => fetch(url).then(r => {
        if (!r.ok) throw 0;
        return r.blob();
      }).then(b => new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => res(url);
        fr.readAsDataURL(b);
      })).catch(() => url);
      const parts = await Promise.all(rules.map(async ({
        css,
        base
      }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css,
          m;
        while (m = re.exec(css)) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs;
          try {
            abs = new URL(u, base).href;
          } catch {
            continue;
          }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  // Parsed playback object ({mode:'loop'} | {mode:'times',count:N}) or
  // null. When present it overrides the legacy loop prop — CompositionStage
  // passes the validated value from the OM_PLAYBACK authoring contract.
  playback = null,
  persistKey = 'animstage-v3',
  children
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280;
  height = +height || 720;
  duration = +duration || 10;
  fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';
  const playTimes = playback && playback.mode === 'times' ? playback.count : null;
  const loopEff = playback ? playback.mode === 'loop' : loop;
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  // The external-playback latch: true while the HOST play bar is driving
  // time forward as genuine continuous playback (its play-loop seeks
  // carry detail.playing === true). The engine's own clock stays paused
  // the whole time — exactly one clock ever drives — so this is a
  // separate bit, not a second meaning for `playing`. Set and cleared
  // in the seek handler below; decays via SS_EXT_PLAY_MS when the
  // marked stream stops without a parting unmarked seek.
  const [extPlay, setExtPlay] = React.useState(false);
  const extPlayTimerRef = React.useRef(null);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Passes completed since playback last started. Lives in a ref so the
  // per-frame wrap can count without re-running this effect; reset on
  // every (re)start so a fresh play (or a host restart) gets the full
  // run count again.
  const passesRef = React.useRef(0);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    passesRef.current = 0;
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (playTimes !== null) {
            // Play N times then hold the last frame — the partial pass a
            // mid-timeline start produces counts as a pass, so the piece
            // never runs longer than N full durations.
            passesRef.current += 1;
            if (passesRef.current >= playTimes) {
              next = duration;
              setPlaying(false);
            } else {
              next = next % duration;
            }
          } else if (loopEff) {
            next = next % duration;
          } else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loopEff, playTimes]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol + the editor's play bar: hosts dispatch this
  // event per frame; pause + sync the playhead so the frame shows exactly
  // that timestamp. The host play bar marks its play-loop seeks with
  // detail.playing === true — the mark latches extPlay (playback is
  // playback even when a host clock drives it), while ANY unmarked seek
  // (scrub, step, export frame, the transport's pause park) clears the
  // latch in the same commit it retimes, so a seeked frame still renders
  // exactly one scene's state. The engine's own clock pauses either way.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    // Sync-seek capability: a dispatcher that marks its seek with
    // detail.sync === true gets the commit applied via ReactDOM.flushSync,
    // so the stage DOM reflects the seeked frame the moment dispatchEvent
    // returns. The video exporter keys off the data-om-sync-seek
    // advertisement to drop its two-display-refresh settle (that wait only
    // exists to let React's async commit land — serialization needs the
    // committed DOM, not the paint). Feature-detected: a runtime without
    // ReactDOM.flushSync never advertises and every seek takes the async
    // path. Unmarked seeks (scrubs, the host play bar) stay async — a
    // forced sync render per pointermove would tax the editor for no one.
    const canSyncSeek = typeof ReactDOM !== 'undefined' && typeof ReactDOM.flushSync === 'function';
    const onSeek = e => {
      const apply = () => {
        setPlaying(false);
        const hostPlay = !!(e.detail && e.detail.playing === true);
        if (extPlayTimerRef.current) {
          clearTimeout(extPlayTimerRef.current);
          extPlayTimerRef.current = null;
        }
        if (hostPlay) {
          // Watchdog: the latch is only as alive as its seek stream. If the
          // host stops without a parting seek (tab jank, bar unmount), the
          // latch decays on its own rather than stranding extPlaying true.
          extPlayTimerRef.current = setTimeout(() => {
            extPlayTimerRef.current = null;
            setExtPlay(false);
          }, SS_EXT_PLAY_MS);
        }
        setExtPlay(hostPlay);
        setTime(clamp(e.detail.time, 0, duration));
      };
      // flushSync is safe here: a native DOM listener runs outside React's
      // lifecycle, and the exporter's dispatchEvent is synchronous, so the
      // commit lands in the same JS task — the engine's own rAF loop can
      // never interleave between seek and serialize.
      if (canSyncSeek && e.detail && e.detail.sync === true) {
        ReactDOM.flushSync(apply);
      } else {
        apply();
      }
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    if (canSyncSeek) el.setAttribute('data-om-sync-seek', 'true');
    return () => {
      el.removeEventListener('data-om-seek-to-time-frame', onSeek);
      el.removeAttribute('data-om-sync-seek');
      if (extPlayTimerRef.current) {
        clearTimeout(extPlayTimerRef.current);
        extPlayTimerRef.current = null;
      }
      // Drop the latch too: this cleanup runs on every duration change
      // (an agent edit can retime mid-host-play, no gesture involved) and
      // the new effect instance arms no watchdog — clearing only the
      // timer could strand extPlay true forever if the marked stream died
      // in the gap. Fail toward cut: the next marked seek re-latches.
      setExtPlay(false);
    };
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(
  // extPlaying is ADDITIVE: "time is advancing under an external
  // driver's continuous playback". `playing` keeps meaning the
  // engine's OWN clock — the hidden PlaybackBar glyph (and through it
  // the host's clock-reporter/adoption channel) reads that — and
  // CompositionClock is the one consumer that widens to either.
  () => ({
    time: displayTime,
    duration,
    playing,
    extPlaying: extPlay,
    setTime,
    setPlaying
  }), [displayTime, duration, playing, extPlay]);
  return (
    /*#__PURE__*/
    // data-om-starter: inert presence marker — Claude Design's starter-usage
    // probe reads it; it renders nothing. Keep it on this root element.
    React.createElement("div", {
      ref: stageRef,
      "data-om-starter": "animations-v3",
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 0
      }
    }, /*#__PURE__*/React.createElement("svg", {
      ref: canvasRef,
      width: width,
      height: height,
      "data-om-exportable-video-with-duration-secs": duration,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        flexShrink: 0,
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("foreignObject", {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%"
    }, /*#__PURE__*/React.createElement("div", {
      xmlns: "http://www.w3.org/1999/xhtml",
      style: {
        width,
        height,
        background,
        position: 'relative',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
      value: ctxValue
    }, children))))), /*#__PURE__*/React.createElement(PlaybackBar, {
      time: displayTime,
      actualTime: time,
      duration: duration,
      playing: playing,
      onPlayPause: () => setPlaying(p => !p),
      onReset: () => {
        setTime(0);
      },
      onSeek: t => setTime(t),
      onHover: t => setHoverTime(t)
    }))
  );
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    "data-omelette-chrome": true,
    style: {
      // Slimmed to visually match the host editor bar's basic row (the
      // single-scrubber look): transport first, tighter metrics, quieter
      // chrome. Shown only outside the app — the host bar suppresses this
      // whenever it is present.
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 12px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 6,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)), typeof VideoEncoder !== 'undefined' && /*#__PURE__*/React.createElement(IconButton, {
    title: "Export video",
    onClick: () => window.parent.postMessage({
      type: 'omelette:request-video-export'
    }, '*')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v7m0 0L4 6m3 3l3-3M2 12h10",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}

// ── Scene-list plumbing ──────────────────────────────────────────────────
// Guest-side validation of a scene list (the engine's own inputs: the
// authored prop, and host-dispatched updates). Mirrors the host parser's
// shape rules and constants — keep in sync with parseTimelineScenes in
// apps/web/src/shared/timeline.ts (16KB raw cap, 50 entries, dur finite in
// (0, 300]); returns null on any violation.
function ssParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 16 * 1024) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (!Array.isArray(parsed) || parsed.length === 0 || parsed.length > 50) return null;
  for (var i = 0; i < parsed.length; i++) {
    var s = parsed[i];
    if (typeof s !== 'object' || s === null) return null;
    if (typeof s.name !== 'string' || typeof s.dur !== 'number') return null;
    if (!isFinite(s.dur) || s.dur <= 0 || s.dur > 300) return null;
  }
  return parsed;
}

// Guest-side validation of the playback value — mirrors the host parser
// (shared/timeline.ts parseTimelinePlayback): {"mode":"loop"} or
// {"mode":"times","count":1..99}, strict all-or-nothing, null otherwise.
// Callers treat null as the loop default.
function ppParse(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > 256) return null;
  var parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return null;
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;
  var keys = Object.keys(parsed);
  if (parsed.mode === 'loop') return keys.length === 1 ? {
    mode: 'loop'
  } : null;
  if (parsed.mode === 'times') {
    if (keys.length !== 2) return null;
    var c = parsed.count;
    if (typeof c !== 'number' || c !== Math.floor(c) || c < 1 || c > 99) return null;
    return {
      mode: 'times',
      count: c
    };
  }
  return null;
}

// Stamps the playback attribute VERBATIM from the authored raw string (the
// host's write-back anchors on that exact value) and listens for the
// host's post-write update event. Same shape as SceneSync; only rendered
// when the document authors a playback literal — an absent contract means
// the attribute stays absent and the document plays its default.
function PlaybackSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-playback', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      if (ppParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-playback-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-playback-update', onEvent);
      root.removeAttribute('data-om-timeline-playback');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}

// Renders inside the Stage (so it can reach the exportable root via
// closest()): stamps the scenes attribute VERBATIM from the current raw
// string — the host's write-back anchors on that exact value — and listens
// for the host's post-write update event.
function SceneSync(props) {
  var ref = React.useRef(null);
  var raw = props.raw;
  var onUpdate = props.onUpdate;
  React.useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var root = el.closest('[data-om-exportable-video-with-duration-secs]');
    if (!root) return;
    root.setAttribute('data-om-timeline-scenes', raw);
    var onEvent = function (e) {
      var next = e && e.detail;
      // Ignore anything that doesn't validate — a bad update must not tear
      // down a working composition.
      if (ssParse(next)) onUpdate(next);
    };
    root.addEventListener('data-om-timeline-scenes-update', onEvent);
    return function () {
      root.removeEventListener('data-om-timeline-scenes-update', onEvent);
      root.removeAttribute('data-om-timeline-scenes');
    };
  }, [raw, onUpdate]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      display: 'none'
    }
  });
}

// ── Continuous composition ──────────────────────────────────────────────

var CompositionContext = React.createContext(null);
function useComposition() {
  var ctx = React.useContext(CompositionContext);
  if (!ctx) throw new Error('useComposition() must be called inside <CompositionStage>');
  return ctx;
}
function ccDerive(scenes) {
  var playStart = 0;
  var authStart = 0;
  var sections = [];
  var table = Object.create(null);
  for (var i = 0; i < scenes.length; i++) {
    var s = scenes[i];
    var nat = typeof s.nat === 'number' && isFinite(s.nat) && s.nat > 0 ? s.nat : s.dur;
    sections.push({
      name: s.name,
      playStart: playStart,
      dur: s.dur,
      authStart: authStart,
      nat: nat
    });
    if (!Object.prototype.hasOwnProperty.call(table, s.name)) {
      table[s.name] = Math.round(authStart * 1000) / 1000;
    }
    playStart += s.dur;
    authStart += nat;
  }
  return {
    sections: sections,
    table: table,
    total: Math.round(playStart * 1000) / 1000,
    authoredTotal: Math.round(authStart * 1000) / 1000
  };
}
function ccWarp(d, t) {
  var ss = d.sections;
  if (ss.length === 0) return 0;
  var idx = ss.length - 1;
  for (var i = 0; i < ss.length; i++) {
    if (t < ss[i].playStart + ss[i].dur) {
      idx = i;
      break;
    }
  }
  var s = ss[idx];
  var local = Math.min(Math.max(t - s.playStart, 0), s.dur);
  var T = s.authStart + (s.dur > 0 ? local * (s.nat / s.dur) : 0);
  return Math.min(T, d.authoredTotal);
}
var CC_META = Object.assign(Object.create(null), {
  toString: 1,
  toLocaleString: 1,
  valueOf: 1,
  toJSON: 1,
  then: 1,
  constructor: 1,
  hasOwnProperty: 1,
  isPrototypeOf: 1,
  propertyIsEnumerable: 1,
  default: 1
});
function ccCueProxy(table, unknownRef) {
  if (typeof Proxy !== 'function') return table;
  return new Proxy(table, {
    get: function (target, prop) {
      if (typeof prop !== 'string' || prop in target) return target[prop];
      if (CC_META[prop] || prop.indexOf('@@') === 0) return Object.prototype[prop];
      unknownRef.current[prop] = true;
      return NaN;
    }
  });
}
function CcUnknownWatch(props) {
  var tl = useTimeline();
  React.useEffect(function () {
    var next = Object.keys(props.unknownRef.current).sort().join(', ');
    if (next !== props.badge) props.setBadge(next);
  }, [tl.time]);
  return null;
}
function CompositionClock(props) {
  var tl = useTimeline();
  var d = props.derived;
  var T = ccWarp(d, tl.time);
  var value = React.useMemo(function () {
    return {
      T: T,
      CUES: props.cues,
      time: tl.time,
      duration: tl.duration,
      authoredTotal: d.authoredTotal,
      playing: tl.playing || tl.extPlaying === true
    };
  }, [T, props.cues, tl.time, tl.duration, d, tl.playing, tl.extPlaying]);
  return /*#__PURE__*/React.createElement(CompositionContext.Provider, {
    value: value
  }, props.children);
}
function Shot(props) {
  var c = useComposition();
  var from = +props.from;
  var to = props.to == null ? Infinity : +props.to;
  var on = isFinite(from) && c.T >= from && c.T < to;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      visibility: on ? 'visible' : 'hidden'
    }
  }, props.children);
}
var CAPTION_FADE = 0.18;
function Captions(props) {
  var c = useComposition();
  var t = c.T;
  var items = (props.items || []).filter(function (it) {
    return it && isFinite(+it.at);
  }).sort(function (a, b) {
    return a.at - b.at;
  });
  var active = null;
  var end = Infinity;
  for (var i = 0; i < items.length; i++) {
    if (t < items[i].at) break;
    active = items[i];
    end = typeof active.until === 'number' && isFinite(active.until) ? active.until : i + 1 < items.length ? items[i + 1].at : Infinity;
  }
  if (!active || t >= end) return null;
  var o = Math.min(1, (t - active.at) / CAPTION_FADE);
  if (isFinite(end)) o = Math.min(o, (end - t) / CAPTION_FADE);
  o = Math.max(0, Math.min(1, o));
  return /*#__PURE__*/React.createElement("div", {
    "data-om-caption": true,
    style: Object.assign({
      position: 'absolute',
      left: '8%',
      right: '8%',
      bottom: '7%',
      textAlign: 'center',
      opacity: o,
      pointerEvents: 'none',
      font: '500 30px Inter, system-ui, sans-serif',
      color: '#f6f4ef',
      textShadow: '0 1px 14px rgba(0,0,0,0.45)'
    }, props.style)
  }, active.text);
}
function CompositionStage(props) {
  var width = +props.width || 1280;
  var height = +props.height || 720;
  var bg = props.bg || '#0b0b0e';
  var autoplay = props.autoplay == null ? true : String(props.autoplay) !== 'false';
  var loop = props.loop == null ? true : String(props.loop) !== 'false';
  var state = React.useState(props.scenes);
  var raw = state[0];
  var setRaw = state[1];
  var scenes = React.useMemo(function () {
    return ssParse(raw);
  }, [raw]);
  var pstate = React.useState(props.playback);
  var praw = pstate[0];
  var setPraw = pstate[1];
  var pb = React.useMemo(function () {
    return ppParse(praw);
  }, [praw]);
  var unknownRef = React.useRef({});
  var badgeState = React.useState('');
  var badge = badgeState[0];
  var setBadge = badgeState[1];
  var derived = React.useMemo(function () {
    unknownRef.current = {};
    return scenes ? ccDerive(scenes) : null;
  }, [scenes]);
  var cues = React.useMemo(function () {
    return derived ? ccCueProxy(derived.table, unknownRef) : null;
  }, [derived]);
  React.useEffect(function () {
    var next = Object.keys(unknownRef.current).sort().join(', ');
    if (next !== badge) setBadge(next);
  });
  if (!scenes) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0e',
        color: '#c96442',
        font: '500 16px Inter, system-ui, sans-serif',
        textAlign: 'center'
      }
    }, "animations-v3: the scenes prop isn't a valid JSON scene list", /*#__PURE__*/React.createElement("br", null), "(expected '[", '{', "\"name\":\"\u2026\",\"dur\":N", '}', ", \u2026]')");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Stage, {
    width: width,
    height: height,
    duration: derived.total,
    background: bg,
    autoplay: autoplay,
    loop: loop,
    playback: pb
  }, /*#__PURE__*/React.createElement(SceneSync, {
    raw: raw,
    onUpdate: setRaw
  }), typeof praw === 'string' && praw !== '' && /*#__PURE__*/React.createElement(PlaybackSync, {
    raw: praw,
    onUpdate: setPraw
  }), /*#__PURE__*/React.createElement(CompositionClock, {
    derived: derived,
    cues: cues
  }, props.children), /*#__PURE__*/React.createElement(CcUnknownWatch, {
    unknownRef: unknownRef,
    badge: badge,
    setBadge: setBadge
  })), badge !== '' &&
  /*#__PURE__*/
  // Sibling of Stage, outside the exportable <svg>: visible in the
  // preview (and its screenshots), never in the exported video.
  React.createElement("div", {
    "data-om-unknown-cues": true,
    style: {
      position: 'absolute',
      left: 12,
      bottom: 56,
      zIndex: 10,
      padding: '6px 10px',
      borderRadius: 6,
      background: 'rgba(0,0,0,0.72)',
      color: '#e8906a',
      font: '500 12px Inter, system-ui, sans-serif',
      pointerEvents: 'none'
    }
  }, "choreography references unknown section", badge.indexOf(',') >= 0 ? 's' : '', ": ", badge));
}

// Strokes as layers: paint multiplies, so stroke images stacked with
// mix-blend-mode:multiply over the paper reproduce the flat render.

var WC_PIXEL_CAP = 11000000;
function wcLayerOpts(props) {
  var w = +props.width || 900,
    h = +props.height || 1200;
  var askScale = +props.scale || 1;
  return {
    width: w,
    height: h,
    scale: Math.min(askScale, Math.sqrt(WC_PIXEL_CAP / (w * h))),
    seed: props.seed == null ? undefined : +props.seed,
    quality: props.quality == null ? undefined : +props.quality
  };
}
var wcWarned = {};
function wcWarnOnce(key, message, err) {
  if (wcWarned[key]) return;
  wcWarned[key] = true;
  console.warn(message, err);
}
function useWatercolorLayers(painting, opts) {
  var kit = window.WatercolorKit;
  if (typeof painting !== 'function' || !kit || typeof kit.layers !== 'function') return null;
  try {
    return kit.layers(painting, wcLayerOpts(opts || {}));
  } catch (e) {
    wcWarnOnce('layers:' + e, 'watercolor painting failed to build; rendering the fallback sheet', e);
    return null;
  }
}
var WatercolorSheetContext = React.createContext(null);
function WatercolorSheet(props) {
  var L = props.layers || null;
  var style = Object.assign({
    position: 'relative',
    display: 'block',
    width: '100%',
    aspectRatio: L ? L.width + ' / ' + L.height : '3 / 4',
    isolation: 'isolate',
    overflow: 'hidden'
  }, props.style);
  if (!L) {
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign(style, {
        background: '#f4f1e8',
        color: '#8a8270',
        font: '12px system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      })
    }, "watercolor-kit.js not loaded (or the painting failed to build)");
  }
  return /*#__PURE__*/React.createElement(WatercolorSheetContext.Provider, {
    value: L
  }, /*#__PURE__*/React.createElement("div", {
    style: style,
    "data-om-watercolor-sheet": true
  }, /*#__PURE__*/React.createElement("img", {
    src: L.paper,
    alt: props.alt || '',
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      display: 'block'
    }
  }), props.children));
}
function WatercolorStroke(props) {
  var fromSheet = React.useContext(WatercolorSheetContext);
  var L = props.layers || fromSheet;
  if (!L) return null;
  var i = +props.index;
  if (!(i >= 0) || i >= L.count) return null;
  var at = props.at == null ? 1 : clamp(+props.at, 0, 1);
  if (!(at > 0)) return null;
  var box, src;
  try {
    box = L.box(i);
    src = box ? L.src(i, at) : null;
  } catch (e) {
    wcWarnOnce('stroke:' + i + ':' + e, 'watercolor stroke ' + i + ' failed to render; skipping it', e);
    return null;
  }
  if (!box || !src) return null;
  var style = Object.assign({
    position: 'absolute',
    display: 'block',
    left: box.x * 100 + '%',
    top: box.y * 100 + '%',
    width: box.w * 100 + '%',
    height: box.h * 100 + '%',
    mixBlendMode: L.kind(i) === 'reserve' ? 'normal' : 'multiply',
    pointerEvents: 'none'
  }, props.style);
  return /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    "data-om-watercolor-stroke": i,
    "data-om-stroke-kind": L.kind(i),
    style: style
  });
}

// The default watercolor moment: the painting assembled from its strokes,
// each appearing in painting order (a pure function of T).
function WatercolorPainting(props) {
  var c = useComposition();
  var from = +props.from || 0;
  var to = props.to == null ? from + 6 : +props.to;
  var u = clamp((c.T - from) / Math.max(to - from, 0.001), 0, 1);
  var eased = Easing.easeInOutQuad(u);
  var L = useWatercolorLayers(props.painting, props);
  var tick = React.useState(0)[1];
  var warmed = React.useRef(null);
  React.useEffect(function () {
    if (!L || typeof L.warm !== 'function') return;
    var p = L.warm();
    if (warmed.current === p) return;
    var live = true;
    p.then(function () {
      warmed.current = p;
      if (live) tick(function (x) {
        return x + 1;
      });
    });
    return function () {
      live = false;
    };
  }, [L && L.paper, props.painting]);
  var strokes = [];
  if (L) {
    for (var i = 0; i < L.count; i++) {
      var sp = L.span(i);
      var at = clamp((eased - sp.from) / Math.max(sp.to - sp.from, 1e-6), 0, 1);
      if (at <= 0) break;
      strokes.push(/*#__PURE__*/React.createElement(WatercolorStroke, {
        key: i,
        layers: L,
        index: i,
        at: at
      }));
    }
  }
  return /*#__PURE__*/React.createElement(WatercolorSheet, {
    layers: L,
    style: props.style,
    alt: props.alt
  }, strokes);
}

// Paint-on watercolor reveal as a pure function of T — an <img> with a data:
// URL (the exporter serializes those as-is; a live canvas would export blank).
function WatercolorReveal(props) {
  var c = useComposition();
  var from = +props.from || 0;
  var to = props.to == null ? from + 6 : +props.to;
  var u = clamp((c.T - from) / Math.max(to - from, 0.001), 0, 1);
  var style = Object.assign({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  }, props.style);
  var frames = Array.isArray(props.frames) && props.frames.length ? props.frames : null;
  var steps = frames ? frames.length - 1 : Math.max(1, Math.round(+props.steps || 36));
  var i = Math.min(steps, Math.round(Easing.easeInOutQuad(u) * steps));
  var painting = typeof props.painting === 'function' ? props.painting : null;
  var kit = window.WatercolorKit;
  var w = +props.width || 900,
    h = +props.height || 1200;
  var askScale = +props.scale || Math.min(2, window.devicePixelRatio || 1);
  var opts = {
    width: w,
    height: h,
    scale: Math.min(askScale, Math.sqrt(11000000 / (w * h))),
    seed: props.seed == null ? undefined : +props.seed,
    steps: steps,
    type: props.format || 'image/jpeg',
    quality: props.quality == null ? 0.88 : +props.quality
  };
  var key = opts.width + 'x' + opts.height + '#' + opts.seed + '@' + opts.scale + '/' + steps + ':' + opts.type + '/' + opts.quality;
  var cache = React.useRef({
    fn: null,
    key: '',
    frames: {},
    baking: false
  }).current;
  var tick = React.useState(0)[1];
  if (cache.fn !== painting && String(cache.fn) !== String(painting) || cache.key !== key) {
    cache.key = key;
    cache.frames = {};
    cache.baking = false;
  }
  cache.fn = painting;
  React.useEffect(function () {
    if (frames || cache.baking || !painting || !kit || typeof kit.bake !== 'function') return;
    cache.baking = true;
    var target = cache.frames;
    try {
      kit.bake(painting, opts, function (n, _t, url) {
        target[n] = url;
      }).then(function (all) {
        if (cache.frames !== target) return;
        for (var n = 0; n < all.length; n++) target[n] = all[n];
        tick(function (x) {
          return x + 1;
        });
      }).catch(function () {
        /* failed bake: the guarded lazy path below still renders */
      });
    } catch (e) {
      /* oversized painting: the guarded lazy path below still renders */
    }
  });
  if (frames) return /*#__PURE__*/React.createElement("img", {
    src: frames[i],
    alt: props.alt || '',
    style: style
  });
  if (!kit || !painting) {
    return /*#__PURE__*/React.createElement("div", {
      style: Object.assign({
        width: '100%',
        height: '100%',
        background: '#f4f1e8',
        color: '#8a8270',
        font: '12px system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }, props.style)
    }, "watercolor-kit.js not loaded (or no painting function)");
  }
  if (!cache.frames[i]) {
    try {
      cache.frames[i] = kit.frame(painting, Object.assign({}, opts, {
        at: i / steps
      }));
    } catch (e) {
      return /*#__PURE__*/React.createElement("div", {
        style: Object.assign({
          width: '100%',
          height: '100%',
          background: '#f4f1e8',
          color: '#8a8270',
          font: '12px system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }, props.style)
      }, "painting too large to render (", String(e && e.message).slice(0, 80), ")");
    }
  }
  return /*#__PURE__*/React.createElement("img", {
    src: cache.frames[i],
    alt: props.alt || '',
    style: style
  });
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Stage,
  PlaybackBar,
  CompositionStage,
  useComposition,
  Shot,
  Captions,
  WatercolorReveal,
  WatercolorPainting,
  WatercolorSheet,
  WatercolorStroke,
  useWatercolorLayers
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/motion/animations-v3.jsx", error: String((e && e.message) || e) }); }

// assets/motion/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/motion/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
const BTN_VARIANTS = {
  ink: {
    background: 'var(--ink)',
    color: 'var(--white)',
    border: '1px solid transparent',
    hover: 'var(--graphite)'
  },
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)',
    border: '1px solid transparent',
    hover: 'var(--gold)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--ink)',
    border: '1px solid var(--divider)',
    hover: 'var(--card)'
  },
  white: {
    background: 'var(--white)',
    color: 'var(--ink)',
    border: '1px solid transparent',
    hover: 'var(--card)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--white)',
    border: '1px solid rgba(255,255,255,.28)',
    hover: 'rgba(255,255,255,.06)'
  }
};
const BTN_SIZES = {
  sm: {
    padding: '9px 18px',
    fontSize: 13
  },
  md: {
    padding: '11px 22px',
    fontSize: 14
  },
  lg: {
    padding: '14px 26px',
    fontSize: 15
  }
};
function Button({
  variant = 'ink',
  size = 'md',
  disabled = false,
  onClick,
  children,
  type = 'button',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const v = BTN_VARIANTS[variant] || BTN_VARIANTS.ink;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 999,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      lineHeight: 1.2,
      cursor: disabled ? 'default' : 'pointer',
      whiteSpace: 'nowrap',
      transition: 'background-color 120ms var(--ease)',
      opacity: disabled ? 0.4 : 1,
      ...BTN_SIZES[size],
      background: hover && !disabled ? v.hover : v.background,
      color: v.color,
      border: v.border,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/brand/Dot.jsx
try { (() => {
function Dot({
  size = 10,
  style
}) {
  return /*#__PURE__*/React.createElement("i", {
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      background: 'var(--gold)',
      display: 'inline-block',
      flex: 'none',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Dot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Dot.jsx", error: String((e && e.message) || e) }); }

// components/brand/Glyph.jsx
try { (() => {
const GLYPHS = {
  "claim": ["M6 27h20", "M9 15l7 7 7-7", "#M16 5v13"],
  "support": ["r4,7,24,16,3", "M12 23l4 5 4-5", "#M16 12v6"],
  "onboard": ["M18 5h8v22h-8", "M5 16h11", "#M12 11l5 5-5 5"],
  "complete": ["c16,16,11", "#M11 16.4l3.9 3.9L22 12.6"],
  "cycle": ["M27 16A11 11 0 0 0 16 5", "M5 16A11 11 0 0 0 16 27", "C16,16,2.8"],
  "growth": ["M5 24l7-7 5 5 10-10", "M21 12h6v6", "C12,17,2.6"],
  "reports": ["r7,4,18,24,2", "M11 23h10", "M12 23v-5", "M20 23v-9", "#M16 23v-7"],
  "dealer": ["r6,6,20,20,2", "R9.6,9.6,6,6,1"],
  "renewals": ["M26 16a10 10 0 0 1-17 7", "M6 16a10 10 0 0 1 17-7", "#M23 5v4.5h-4.5"],
  "live": ["c16,16,11", "#M16 10v12"],
  "cover": ["M5 27V16a11 11 0 0 1 22 0v11", "C16,18,3"],
  "careers": ["c12,11,4.5", "M4 26a8 8 0 0 1 16 0", "#M23.5 6.5v6", "#M20.5 9.5h6"],
  "mail": ["r3,7,26,18,2.5", "#M4.2 8.6L16 17l11.8-8.4"],
  "ledger": ["r6,5,20,22,2", "M11 12h10", "M11 17h10", "#M11 22h6"],
  "people": ["c12,11,4.5", "M4 26a8 8 0 0 1 16 0", "C23.5,9,3.2"],
  "lock": ["r7,14,18,13,2.5", "M11 14v-3.5a5 5 0 0 1 10 0V14", "C16,20.5,2.4"],
  "exportd": ["M6 27h20", "M9 15l7 7 7-7", "#M16 5v13"]
};
function Glyph({
  name,
  size = 26,
  spark = 'deep',
  style
}) {
  const s = spark === 'bright' ? 'var(--gold)' : spark === 'deep' ? 'var(--gold-deep)' : spark;
  const parts = GLYPHS[name] || [];
  const kids = parts.map((p, i) => {
    const k = p[0];
    if (k === 'M') return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: p
    });
    if (k === '#') return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: p.slice(1),
      stroke: s
    });
    const n = p.slice(1).split(',').map(Number);
    if (k === 'c') return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: n[0],
      cy: n[1],
      r: n[2]
    });
    if (k === 'C') return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: n[0],
      cy: n[1],
      r: n[2],
      fill: s,
      stroke: "none"
    });
    if (k === 'r') return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: n[0],
      y: n[1],
      width: n[2],
      height: n[3],
      rx: n[4]
    });
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: n[0],
      y: n[1],
      width: n[2],
      height: n[3],
      rx: n[4],
      fill: s,
      stroke: "none"
    });
  });
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    }
  }, kids);
}
Object.assign(__ds_scope, { GLYPHS, Glyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Glyph.jsx", error: String((e && e.message) || e) }); }

// components/brand/Monogram.jsx
try { (() => {
// Peaks mark: two rounded triangles; both legs sweep into the overlap. Path data in a 1024 tile.
const MG_RIGHT = 'M424.5 403.2A92 92 0 0 1 508.2 273L751.8 273A92 92 0 0 1 835.5 403.2L695.5 709.7A72 72 0 0 1 564.5 709.7Z';
const MG_LEFT = 'M188.5 403.2A92 92 0 0 1 272.2 273L515.8 273A92 92 0 0 1 599.5 403.2L459.5 709.7A72 72 0 0 1 328.5 709.7Z';
const MG_LEG = 'M188.5 403.2A92 92 0 0 1 272.2 273C379 273 401.8 353.4 444.5 447L512 594.7L459.5 709.7A72 72 0 0 1 328.5 709.7Z';
const MG_LEG_R = 'M751.8 273A92 92 0 0 1 835.5 403.2L695.5 709.7A72 72 0 0 1 564.5 709.7L512 594.7L579.5 447C622.2 353.4 645 273 751.8 273Z';
const MG_TONES = {
  ink: {
    tile: 'var(--ink)',
    a: 'var(--mark-amber)',
    b: 'var(--mark-pale)',
    bOp: 1
  },
  gold: {
    tile: 'var(--gold)',
    a: 'var(--ink)',
    b: 'color-mix(in srgb, var(--ink) 50%, var(--gold))',
    bOp: 1
  },
  inverse: {
    tile: 'var(--white)',
    a: 'var(--mark-deep)',
    b: 'var(--mark-gold)',
    bOp: 1,
    ring: true
  }
};

// Bare mark, no tile — used by Lockup. height in px; width follows the mark's 666:482 box.
function MonogramMark({
  height = 32,
  tone = 'ink',
  style
}) {
  const t = MG_TONES[tone] || MG_TONES.ink;
  const id = 'mk' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "179 272 666 482",
    height: height,
    width: height * 666 / 482,
    style: {
      display: 'inline-block',
      flex: 'none',
      ...style
    },
    role: "img",
    "aria-label": "WarrantyOS"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "272.2",
    y1: "0",
    x2: "781.8",
    y2: "0",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    style: {
      stopColor: t.a
    }
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    style: {
      stopColor: t.b,
      stopOpacity: t.bOp
    }
  }))), /*#__PURE__*/React.createElement("path", {
    d: MG_RIGHT,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEFT,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEG,
    style: {
      fill: t.a
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEG_R,
    style: {
      fill: t.b,
      fillOpacity: t.bOp
    }
  }));
}
function Monogram({
  size = 44,
  tone = 'ink',
  round = false,
  style
}) {
  const t = MG_TONES[tone] || MG_TONES.ink;
  const id = 'mg' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const k = round ? 0.8 : 1;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: 'none',
      width: size,
      height: size,
      borderRadius: round ? 999 : 'var(--radius-monogram, 22%)',
      background: t.tile,
      boxShadow: t.ring ? 'inset 0 0 0 1px var(--divider)' : undefined,
      overflow: 'hidden',
      ...style
    },
    role: "img",
    "aria-label": "WarrantyOS"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1024 1024",
    width: size,
    height: size,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: id,
    x1: "272.2",
    y1: "0",
    x2: "781.8",
    y2: "0",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    style: {
      stopColor: t.a
    }
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    style: {
      stopColor: t.b,
      stopOpacity: t.bOp
    }
  }))), /*#__PURE__*/React.createElement("g", {
    transform: `translate(512 512) scale(${k}) translate(-512 -512)`
  }, /*#__PURE__*/React.createElement("path", {
    d: MG_RIGHT,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEFT,
    fill: `url(#${id})`
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEG,
    style: {
      fill: t.a
    }
  }), /*#__PURE__*/React.createElement("path", {
    d: MG_LEG_R,
    style: {
      fill: t.b,
      fillOpacity: t.bOp
    }
  }))));
}
Object.assign(__ds_scope, { MonogramMark, Monogram });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Monogram.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 26,
  tone = 'ink',
  mono = false,
  style
}) {
  const color = tone === 'white' ? 'var(--white)' : 'var(--ink)';
  const os = mono ? tone === 'white' ? 'inherit' : 'var(--white)' : 'var(--gold)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      letterSpacing: 'var(--wordmark-track)',
      lineHeight: 1,
      color,
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'baseline',
      fontSize: size,
      ...style
    }
  }, "warranty", /*#__PURE__*/React.createElement("span", {
    style: {
      color: os
    }
  }, "os"));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Endorsement.jsx
try { (() => {
function Endorsement({
  label = 'Warranty by',
  onDark = false,
  size = 19,
  mono = false
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: Math.round(size * 0.63)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: Math.max(10, Math.round(size * 0.6)),
      color: onDark ? '#8A8A90' : 'var(--slate)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: Math.round(size * 1.05),
      background: onDark ? '#2E2E33' : 'var(--divider)'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: size,
    tone: onDark ? 'white' : 'ink',
    mono: mono || onDark
  }));
}
Object.assign(__ds_scope, { Endorsement });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Endorsement.jsx", error: String((e && e.message) || e) }); }

// components/brand/Lockup.jsx
try { (() => {
// Mark runs from the ascender line (top of the "t", 0.687em in Outfit Bold) to the baseline.
const LK_ASC = 0.687;
const LK_TONES = {
  light: {
    mk: 'inverse',
    wm: 'ink',
    mono: false
  },
  dark: {
    mk: 'ink',
    wm: 'white',
    mono: false
  },
  gold: {
    mk: 'gold',
    wm: 'ink',
    mono: true
  }
};
function Lockup({
  size = 32,
  tone = 'light',
  stacked = false,
  style
}) {
  const t = LK_TONES[tone] || LK_TONES.light;
  if (stacked) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: Math.round(size * 0.36),
        flex: 'none',
        ...style
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.MonogramMark, {
      height: Math.round(size * 1.6),
      tone: t.mk
    }), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
      size: size,
      tone: t.wm,
      mono: t.mono
    }));
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: Math.round(size * 0.24),
      flex: 'none',
      lineHeight: 1,
      fontSize: size,
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MonogramMark, {
    height: size * LK_ASC,
    tone: t.mk
  }), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: size,
    tone: t.wm,
    mono: t.mono
  }));
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/data/DotList.jsx
try { (() => {
function DotList({
  items = [],
  onDark = false,
  fontSize = 16,
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      margin: 0,
      padding: 0,
      listStyle: 'none',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '16px 1fr',
      alignItems: 'start',
      gap: 12,
      fontFamily: 'var(--font-sans)',
      fontSize,
      lineHeight: 1.5,
      color: onDark ? 'var(--ink-body)' : 'var(--slate)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--gold)',
      marginTop: '.5em',
      marginLeft: 4
    }
  }), /*#__PURE__*/React.createElement("span", null, it))));
}
Object.assign(__ds_scope, { DotList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DotList.jsx", error: String((e && e.message) || e) }); }

// components/data/Figure.jsx
try { (() => {
function Figure({
  label,
  value,
  size = 28,
  onDark = false,
  accent = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      lineHeight: 1.4,
      letterSpacing: '.26em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: onDark ? 'var(--ink-label)' : 'var(--label)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: size,
      fontWeight: 500,
      letterSpacing: size >= 40 ? '-.03em' : 0,
      marginTop: 4,
      color: accent && onDark ? 'var(--gold)' : onDark ? 'var(--white)' : 'var(--ink)'
    }
  }, value));
}
Object.assign(__ds_scope, { Figure });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Figure.jsx", error: String((e && e.message) || e) }); }

// components/data/HairGrid.jsx
try { (() => {
function HairGrid({
  columns = '1fr 1fr',
  onDark = false,
  cellPadding = '20px 24px',
  children,
  style
}) {
  const line = onDark ? 'var(--hair)' : 'var(--divider)';
  const cellBg = onDark ? 'var(--ink)' : 'var(--white)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: columns,
      gap: 1,
      background: line,
      border: '1px solid ' + line,
      borderRadius: 18,
      overflow: 'hidden',
      ...style
    }
  }, React.Children.map(children, (c, i) => c == null ? null : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: cellBg,
      padding: cellPadding,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, c)));
}
function MicroLabel({
  children,
  onDark = false,
  strong = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      lineHeight: 1.4,
      letterSpacing: '.26em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: strong ? onDark ? 'var(--white)' : 'var(--ink)' : onDark ? 'var(--ink-label)' : 'var(--label)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { HairGrid, MicroLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/HairGrid.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  value,
  defaultValue,
  placeholder,
  mono = false,
  onChange,
  type = 'text',
  style
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      lineHeight: 1.4,
      letterSpacing: '.26em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: 'var(--label)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("input", {
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      height: 44,
      padding: '0 14px',
      borderRadius: 8,
      border: '1px solid ' + (focus ? 'var(--ink)' : 'var(--divider)'),
      background: 'var(--white)',
      color: 'var(--ink)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: mono ? 14 : 15,
      outline: 'none',
      transition: 'border-color 120ms var(--ease)',
      minWidth: 0
    }
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  onDark = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 3,
      background: 'var(--gold)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '.3em',
      textTransform: 'uppercase',
      fontWeight: 600,
      color: onDark ? 'var(--ink-label)' : 'var(--label)'
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavItem.jsx
try { (() => {
function NavItem({
  label,
  active = false,
  onDark = false,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const strong = onDark ? 'var(--white)' : 'var(--ink)';
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'none',
      border: 0,
      padding: '6px 0',
      paddingLeft: active ? 0 : 17,
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active || hover ? strong : onDark ? 'var(--ink-body)' : 'var(--slate)',
      transition: 'color 120ms var(--ease)',
      textAlign: 'left',
      ...style
    }
  }, active ? /*#__PURE__*/React.createElement("i", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--gold)',
      display: 'inline-block',
      flex: 'none'
    }
  }) : null, label);
}
Object.assign(__ds_scope, { NavItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavItem.jsx", error: String((e && e.message) || e) }); }

// components/status/Pill.jsx
try { (() => {
const PILL_TONES = {
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)'
  },
  outline: {
    background: 'var(--white)',
    color: 'var(--ink)',
    boxShadow: 'inset 0 0 0 1px var(--divider)'
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--white)'
  },
  white: {
    background: 'var(--white)',
    color: 'var(--ink)'
  }
};
function Pill({
  tone = 'outline',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 26,
      padding: '0 12px',
      borderRadius: 999,
      fontFamily: 'var(--font-sans)',
      fontSize: 11.5,
      fontWeight: 600,
      letterSpacing: '.02em',
      whiteSpace: 'nowrap',
      alignSelf: 'flex-start',
      ...PILL_TONES[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/Pill.jsx", error: String((e && e.message) || e) }); }

// components/status/StatusDot.jsx
try { (() => {
function StatusDot({
  label,
  live = false,
  onDark = false,
  style
}) {
  const on = live;
  const textColor = on ? onDark ? 'var(--white)' : 'var(--ink)' : 'var(--label)';
  const off = onDark ? 'var(--ink-dot-off)' : 'var(--divider)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: textColor,
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: on ? 'var(--gold)' : off,
      display: 'inline-block',
      flex: 'none',
      transition: 'background-color 320ms var(--ease)'
    }
  }), label);
}
Object.assign(__ds_scope, { StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/status/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
const CARD_TONES = {
  card: {
    background: 'var(--card)',
    color: 'var(--ink)'
  },
  white: {
    background: 'var(--white)',
    color: 'var(--ink)'
  },
  paper: {
    background: 'var(--paper)',
    color: 'var(--ink)'
  },
  graphite: {
    background: 'var(--graphite)',
    color: 'var(--white)'
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--white)'
  },
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)'
  }
};
function Card({
  tone = 'card',
  padding = 28,
  radius = 18,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: radius,
      padding,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      ...CARD_TONES[tone],
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tile.jsx
try { (() => {
const TILE_TONES = {
  card: {
    background: 'var(--card)',
    color: 'var(--ink)'
  },
  white: {
    background: 'var(--white)',
    color: 'var(--ink)',
    boxShadow: '0 1px 3px rgba(0,0,0,.05)'
  },
  ink: {
    background: 'var(--ink)',
    color: 'var(--white)'
  },
  graphite: {
    background: 'var(--graphite)',
    color: 'var(--white)'
  },
  gold: {
    background: 'var(--gold)',
    color: 'var(--ink)'
  }
};
function Tile({
  tone = 'card',
  size = 52,
  glyph,
  glyphSize,
  children,
  style
}) {
  const spark = tone === 'ink' || tone === 'graphite' ? 'bright' : 'deep';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      flex: 'none',
      width: size,
      height: size,
      ...TILE_TONES[tone],
      ...style
    }
  }, glyph ? /*#__PURE__*/React.createElement(__ds_scope.Glyph, {
    name: glyph,
    size: glyphSize || Math.round(size * 0.5),
    spark: spark
  }) : children);
}
Object.assign(__ds_scope, { Tile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dealer-portal/ClaimsDesk.jsx
try { (() => {
const {
  Button,
  Card,
  HairGrid,
  MicroLabel,
  Pill,
  DotList,
  Figure,
  Tile
} = window.WOS;
const CLAIMS = [{
  id: 'CLM-2207',
  policy: 'WOS-4461-C',
  customer: 'Priya Shah',
  vehicle: 'Qashqai · YR68 LNB',
  fault: 'Turbocharger actuator failure',
  cost: '£1,184.00',
  mileage: '48,210',
  received: '24 Mar 2026 · 09:12',
  history: ['Serviced at Hartwell, Jan 2026', 'Warranty registered 18 Mar 2026', 'No previous claims'],
  status: 'Pending'
}, {
  id: 'CLM-2205',
  policy: 'WOS-4212-A',
  customer: 'Dan Price',
  vehicle: 'Golf · WP20 XLM',
  fault: 'Rear window regulator',
  cost: '£236.40',
  mileage: '31,905',
  received: '23 Mar 2026 · 16:40',
  history: ['Serviced at Hartwell, Oct 2025', 'One previous claim, Aug 2025'],
  status: 'Pending'
}, {
  id: 'CLM-2198',
  policy: 'WOS-3988-B',
  customer: 'Amy Clarke',
  vehicle: 'Fiesta · MA18 JKD',
  fault: 'Clutch master cylinder',
  cost: '£412.00',
  mileage: '57,330',
  received: '21 Mar 2026 · 11:03',
  history: ['Serviced at Hartwell, Feb 2026'],
  status: 'Settled'
}];
function ClaimsDeskScreen() {
  const [claims, setClaims] = React.useState(CLAIMS);
  const [sel, setSel] = React.useState(CLAIMS[0].id);
  const c = claims.find(x => x.id === sel);
  const decide = s => setClaims(claims.map(x => x.id === sel ? {
    ...x,
    status: s
  } : x));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      maxWidth: 1120
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Claims desk",
    title: "Claims to decide today"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '380px 1fr',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, claims.map(x => /*#__PURE__*/React.createElement("button", {
    key: x.id,
    onClick: () => setSel(x.id),
    style: {
      all: 'unset',
      cursor: 'pointer',
      borderRadius: 18,
      padding: '18px 20px',
      background: x.id === sel ? 'var(--card)' : '#fff',
      boxShadow: x.id === sel ? 'none' : 'inset 0 0 0 1px var(--divider)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: mono
  }, x.id), /*#__PURE__*/React.createElement(Pill, {
    tone: x.status === 'Settled' ? 'ink' : x.status === 'Declined' ? 'white' : 'outline',
    style: x.status === 'Declined' ? {
      boxShadow: 'inset 0 0 0 1px var(--divider)'
    } : null
  }, x.status)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '-.02em'
    }
  }, x.fault), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--slate)'
    }
  }, x.customer, " \xB7 ", x.vehicle)))), /*#__PURE__*/React.createElement(Card, {
    tone: "white",
    style: {
      boxShadow: 'inset 0 0 0 1px var(--divider)',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    glyph: "claim",
    tone: "card"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, c.id, " \xB7 received ", c.received), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-.03em',
      marginTop: 6
    }
  }, c.fault))), /*#__PURE__*/React.createElement(HairGrid, {
    columns: "repeat(4,1fr)",
    cellPadding: "16px 20px"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, "Policy"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      marginTop: 6
    }
  }, c.policy)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, "Vehicle"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      marginTop: 6
    }
  }, c.vehicle)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, "Mileage"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      marginTop: 6
    }
  }, c.mileage)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, "Repair cost"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...mono,
      marginTop: 6
    }
  }, c.cost))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, {
    strong: true
  }, "Vehicle history"), /*#__PURE__*/React.createElement(DotList, {
    style: {
      marginTop: 14
    },
    fontSize: 15,
    items: c.history
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      borderTop: '1px solid var(--divider)',
      paddingTop: 20
    }
  }, c.status === 'Pending' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "gold",
    onClick: () => decide('Settled')
  }, "Approve claim"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => decide('Declined')
  }, "Decline"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--slate)',
      marginLeft: 8
    }
  }, "Covered under section 4.2, turbo and forced induction.")) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--slate)'
    }
  }, c.status === 'Settled' ? 'Approved. The customer and the workshop have been told.' : 'Declined. The customer has been sent the reason.', " ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      decide('Pending');
    }
  }, "Reopen"))))));
}
window.ClaimsDeskScreen = ClaimsDeskScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dealer-portal/ClaimsDesk.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dealer-portal/CustomerPortal.jsx
try { (() => {
const {
  Button,
  Card,
  DotList,
  Endorsement,
  MicroLabel,
  Tile
} = window.WOS;
function CustomerPortalScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      maxWidth: 1120
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Customer portal",
    title: "What Sarah sees",
    action: /*#__PURE__*/React.createElement(MicroLabel, null, "Preview \xB7 in the dealer's name")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      borderRadius: 18,
      padding: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      borderRadius: 18,
      maxWidth: 760,
      margin: '0 auto',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 32px',
      borderBottom: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement(DealerMark, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(MicroLabel, null, "Golf \xB7 LM70 KFD \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      letterSpacing: 0
    }
  }, "WOS-4471-B")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 34,
      fontWeight: 600,
      letterSpacing: '-.03em',
      lineHeight: 1.1,
      marginTop: 10
    }
  }, "Your 24-month warranty is active.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 22
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "white",
    glyph: "cover",
    size: 44
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-.028em',
      marginTop: 16
    }
  }, "What's covered"), /*#__PURE__*/React.createElement(DotList, {
    style: {
      marginTop: 12
    },
    fontSize: 14,
    items: ['Engine and gearbox', 'Turbo and fuel system', 'Electrics and cooling']
  })), /*#__PURE__*/React.createElement(Card, {
    padding: 22
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "white",
    glyph: "claim",
    size: 44
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-.028em',
      marginTop: 16
    }
  }, "What to do"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--slate)',
      marginTop: 12
    }
  }, "Stop driving if a warning light stays on. Call us before any repair starts.")), /*#__PURE__*/React.createElement(Card, {
    padding: 22
  }, /*#__PURE__*/React.createElement(Tile, {
    tone: "white",
    glyph: "support",
    size: 44
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: '-.028em',
      marginTop: 16
    }
  }, "Who to call"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--slate)',
      marginTop: 12
    }
  }, "Hartwell service desk", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--ink)'
    }
  }, "01632 960 214")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Start a claim"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline"
  }, "Download certificate"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 32px',
      borderTop: '1px solid var(--divider)'
    }
  }, /*#__PURE__*/React.createElement(Endorsement, {
    label: "Administered by",
    size: 12
  })))));
}
window.CustomerPortalScreen = CustomerPortalScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dealer-portal/CustomerPortal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dealer-portal/DealerPortal.jsx
try { (() => {
const {
  Button,
  Card,
  Figure,
  HairGrid,
  MicroLabel,
  Pill,
  StatusDot,
  Input
} = window.WOS;
const SEED = [{
  id: 'WOS-4468-A',
  customer: 'James Okafor',
  vehicle: 'Octavia · KP19 WZT',
  term: '12 months',
  date: '21 Mar 2026',
  status: 'Live'
}, {
  id: 'WOS-4461-C',
  customer: 'Priya Shah',
  vehicle: 'Qashqai · YR68 LNB',
  term: '24 months',
  date: '18 Mar 2026',
  status: 'Live'
}, {
  id: 'WOS-4455-B',
  customer: 'Mark Ellis',
  vehicle: 'Focus · DE17 HPX',
  term: '12 months',
  date: '11 Mar 2026',
  status: 'Pending'
}, {
  id: 'WOS-3902-A',
  customer: 'Helen Moss',
  vehicle: 'Corsa · LC16 RVA',
  term: '12 months',
  date: '02 Mar 2025',
  status: 'Lapsed'
}];
function RegisterPanel({
  onCancel,
  onSubmit
}) {
  const [f, setF] = React.useState({
    customer: 'Sarah Kent',
    vehicle: 'Golf',
    reg: 'LM70 KFD',
    term: '24 months',
    premium: '£649.00'
  });
  const set = k => e => setF({
    ...f,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '-.028em'
    }
  }, "Register policy"), /*#__PURE__*/React.createElement(MicroLabel, null, "Certificate issues on save")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Customer",
    value: f.customer,
    onChange: set('customer')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Vehicle",
    value: f.vehicle,
    onChange: set('vehicle')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Registration",
    mono: true,
    value: f.reg,
    onChange: set('reg')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Term",
    value: f.term,
    onChange: set('term')
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Premium",
    mono: true,
    value: f.premium,
    onChange: set('premium')
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => onSubmit(f)
  }, "Register policy"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: onCancel
  }, "Cancel")));
}
function DealerPortalScreen() {
  const [rows, setRows] = React.useState(SEED);
  const [open, setOpen] = React.useState(false);
  const [fresh, setFresh] = React.useState(null);
  const submit = f => {
    const id = 'WOS-4471-B';
    setRows([{
      id,
      customer: f.customer,
      vehicle: f.vehicle + ' · ' + f.reg,
      term: f.term,
      date: '24 Mar 2026',
      status: 'Live'
    }, ...rows.filter(r => r.id !== id)]);
    setFresh(id);
    setOpen(false);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      maxWidth: 1120
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Dealer portal",
    title: "Policies",
    action: !open && /*#__PURE__*/React.createElement(Button, {
      onClick: () => setOpen(true)
    }, "Register policy")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Figure, {
    label: "Fund position",
    value: "\xA3412,800"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Figure, {
    label: "Live policies",
    value: "1,284"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Figure, {
    label: "Registered \xB7 March",
    value: "96"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Figure, {
    label: "Renewals due",
    value: "42"
  }))), open && /*#__PURE__*/React.createElement(RegisterPanel, {
    onCancel: () => setOpen(false),
    onSubmit: submit
  }), /*#__PURE__*/React.createElement(HairGrid, {
    columns: "150px 1.1fr 1.4fr 110px 150px 110px",
    cellPadding: "15px 20px"
  }, /*#__PURE__*/React.createElement(MicroLabel, null, "Policy"), /*#__PURE__*/React.createElement(MicroLabel, null, "Customer"), /*#__PURE__*/React.createElement(MicroLabel, null, "Vehicle"), /*#__PURE__*/React.createElement(MicroLabel, null, "Term"), /*#__PURE__*/React.createElement(MicroLabel, null, "Registered"), /*#__PURE__*/React.createElement(MicroLabel, null, "Status"), rows.flatMap(r => [/*#__PURE__*/React.createElement("span", {
    key: r.id + 'a',
    style: mono
  }, r.id), /*#__PURE__*/React.createElement("span", {
    key: r.id + 'b',
    style: {
      fontSize: 15,
      fontWeight: r.id === fresh ? 600 : 400
    }
  }, r.customer), /*#__PURE__*/React.createElement("span", {
    key: r.id + 'c',
    style: {
      fontSize: 15,
      color: 'var(--slate)'
    }
  }, r.vehicle), /*#__PURE__*/React.createElement("span", {
    key: r.id + 'd',
    style: {
      fontSize: 15,
      color: 'var(--slate)'
    }
  }, r.term), /*#__PURE__*/React.createElement("span", {
    key: r.id + 'e',
    style: mono
  }, r.date), r.id === fresh ? /*#__PURE__*/React.createElement(StatusDot, {
    key: r.id + 'f',
    live: true,
    label: "Live",
    style: {
      fontSize: 14,
      fontWeight: 600
    }
  }) : /*#__PURE__*/React.createElement(Pill, {
    key: r.id + 'f',
    tone: r.status === 'Lapsed' ? 'ink' : 'outline'
  }, r.status)])));
}
window.DealerPortalScreen = DealerPortalScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dealer-portal/DealerPortal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dealer-portal/Programme.jsx
try { (() => {
const {
  Card,
  Figure,
  HairGrid,
  MicroLabel,
  Button
} = window.WOS;
const BARS = [['Oct', 34], ['Nov', 48], ['Dec', 44], ['Jan', 62], ['Feb', 71], ['Mar', 88]];
function ProgrammeScreen() {
  const [cur, setCur] = React.useState(5);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      maxWidth: 1120
    }
  }, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Programme",
    title: "The shape of the book",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "outline"
    }, "Export")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ink)',
      borderRadius: 18,
      padding: '30px 34px',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    onDark: true,
    accent: true,
    size: 40,
    label: "Fund position",
    value: "\xA3412,800"
  }), /*#__PURE__*/React.createElement(Figure, {
    onDark: true,
    size: 40,
    label: "Loss ratio",
    value: "38.4%"
  }), /*#__PURE__*/React.createElement(Figure, {
    onDark: true,
    size: 40,
    label: "Renewal rate",
    value: "71%"
  }), /*#__PURE__*/React.createElement(Figure, {
    onDark: true,
    size: 40,
    label: "Claims \xB7 March",
    value: "23"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(MicroLabel, {
    strong: true
  }, "Fund, last six months"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, '£' + Math.round(412800 * BARS[cur][1] / 88).toLocaleString('en-GB'))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 220,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 10,
      padding: '24px 0 10px'
    }
  }, BARS.map(([m, h], i) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => setCur(i),
    style: {
      all: 'unset',
      cursor: 'pointer',
      flex: 1,
      height: h + '%',
      background: i === cur ? 'var(--gold)' : 'var(--divider)',
      borderRadius: '6px 6px 0 0',
      transition: 'background-color 120ms var(--ease)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, BARS.map(([m], i) => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      flex: 1,
      textAlign: 'center',
      fontSize: 12,
      fontWeight: i === cur ? 600 : 400,
      color: i === cur ? 'var(--ink)' : 'var(--label)'
    }
  }, m)))), /*#__PURE__*/React.createElement(HairGrid, {
    columns: "1fr 110px 120px",
    cellPadding: "14px 20px"
  }, /*#__PURE__*/React.createElement(MicroLabel, null, "Renewals due"), /*#__PURE__*/React.createElement(MicroLabel, null, "Expires"), /*#__PURE__*/React.createElement(MicroLabel, null, "Premium"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Helen Moss"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "02 Apr"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "\xA3349"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Ravi Patel"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "06 Apr"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "\xA3499"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Laura Finch"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "11 Apr"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "\xA3649"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, "Owen Grant"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "19 Apr"), /*#__PURE__*/React.createElement("span", {
    style: mono
  }, "\xA3349"))));
}
window.ProgrammeScreen = ProgrammeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dealer-portal/Programme.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dealer-portal/Shell.jsx
try { (() => {
const {
  NavItem,
  Endorsement,
  Eyebrow,
  MicroLabel
} = window.WOS;
const MODULES = ['Dealer portal', 'Claims desk', 'Customer portal', 'Programme'];
function DealerMark({
  size = 17
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 6,
      background: '#B3122C',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: 16
    }
  }, "H"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size,
      fontWeight: 700,
      letterSpacing: '-.02em'
    }
  }, "Hartwell Motors"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 9,
      fontWeight: 600,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: '#B3122C',
      marginTop: 2
    }
  }, "Approved Used")));
}
function Shell({
  screen,
  onNav,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '248px 1fr',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      borderRight: '1px solid var(--divider)',
      padding: '28px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement(DealerMark, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, MODULES.map(m => /*#__PURE__*/React.createElement(NavItem, {
    key: m,
    label: m,
    active: m === screen,
    onClick: () => onNav(m)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--slate)',
      lineHeight: 1.5
    }
  }, "Signed in as ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)',
      fontWeight: 600
    }
  }, "Tom Hartwell")), /*#__PURE__*/React.createElement(Endorsement, {
    size: 14
  }))), /*#__PURE__*/React.createElement("main", {
    style: {
      overflow: 'auto',
      padding: '40px 56px 56px'
    }
  }, children));
}
function PageHead({
  eyebrow,
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 18,
      fontSize: 34,
      lineHeight: 1.1,
      letterSpacing: '-.03em',
      fontWeight: 600
    }
  }, title)), action);
}
const mono = {
  fontFamily: 'var(--font-mono)',
  fontVariantNumeric: 'tabular-nums',
  fontSize: 14,
  whiteSpace: 'nowrap'
};
Object.assign(window, {
  Shell,
  PageHead,
  DealerMark,
  MODULES,
  mono
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dealer-portal/Shell.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Dot = __ds_scope.Dot;

__ds_ns.Endorsement = __ds_scope.Endorsement;

__ds_ns.GLYPHS = __ds_scope.GLYPHS;

__ds_ns.Glyph = __ds_scope.Glyph;

__ds_ns.Lockup = __ds_scope.Lockup;

__ds_ns.MonogramMark = __ds_scope.MonogramMark;

__ds_ns.Monogram = __ds_scope.Monogram;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.DotList = __ds_scope.DotList;

__ds_ns.Figure = __ds_scope.Figure;

__ds_ns.HairGrid = __ds_scope.HairGrid;

__ds_ns.MicroLabel = __ds_scope.MicroLabel;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.NavItem = __ds_scope.NavItem;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tile = __ds_scope.Tile;

})();
