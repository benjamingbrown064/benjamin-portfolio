const WL = window.WilboLawDesignSystem_c42bb7;
const wlPad = n => String(n).padStart(2, '0');

const WL_METHOD = [
  ['Direction', '01', 'Business management and strategy', 'Where are you, and where do you want to be?', ['Research', 'Positioning', 'Go-to-market'], ['4', 'Questions every case answers']],
  ['Direction', '02', 'Financial', 'Where is money made, lost and stuck?', ['Exposure scenario'], ['60', 'Days a vague supplemental request can cost']],
  ['Foundations', '03', 'Operations', 'How does the work get done today?', ['Today view', 'Case plan', 'Diary and deadlines'], ['1', 'Next step on every file']],
  ['Foundations', '04', 'Data', 'What does the business know, and can it be trusted?', ['OCR and page reading', 'Document typing and timeline', 'Legal library'], ['320 pages', 'Longest scan read']],
  ['Foundations', '05', 'Compliance and governance', 'What must not be broken?', ['Citation check', 'Approval and audit log', 'Role-based access'], ['0', 'Letters sent without a lawyer’s yes']],
  ['Customer', '06', 'Product development', 'Is what you sell what people want?', ['QME assessment', 'Report-to-report comparison', 'Drafting in the firm’s format'], ['35', 'Checks on every report']],
  ['Customer', '07', 'Marketing and brand', 'Do the right people know it exists?', ['Brand', 'Imagery', 'Marketing site', 'Trust page', 'Demo booking'], ['4', 'Promises on the trust page']],
  ['Customer', '08', 'Sales', 'Does interest turn into revenue you can forecast?', ['Lead generation'], ['20', 'Minutes for a demo']],
  ['Customer', '09', 'Customer support', 'Do customers stay, and can you cope with more of them?', ['Help centre', 'Support panel', 'In-app feedback'], ['11', 'Help guides']],
  ['Build', '10', 'Technical development', 'What needs building, and in what order?', ['Automated testing', 'Error alerts and health checks', 'Long-scan reading'], ['1,056', 'Automated tests']],
];

const WL_PRODUCTS = [
  ['Today', 'A morning view of the caseload: due, waiting and new, across every file.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/01-today.png" alt="The Today view: Needs you, with five items due, new or late across the caseload" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['The file', 'Every page read and typed, scans included, on one timeline.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/02-the-file.png" alt="The Martinez case file: four documents, 530 pages, each typed and dated" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['Issues', '35 checks on the QME or AME report, each with its severity and its page.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/03-issues.png" alt="Issues on Dr. Chen’s PQME: three high-severity issues, each linked to its page" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['What changed', 'Add the supplemental and see what the doctor fixed, what they didn’t and how the rating moved.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/04-what-changed.png" alt="What changed in the supplemental: DRE III to DRE II, 6 of 10 questions answered, 4 still open" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['Drafts', 'Supplemental requests, depo outlines, objections, records requests and subpoenas, in the firm’s format.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/05-drafts.png" alt="A supplemental request draft on Alder & Marsh letterhead, citing QME p.4" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['Status reports', '30-day reports, initial file reviews and conference summaries the examiner can read in a minute.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/06-status-reports.png" alt="A 30-day status report for the claims examiner, with the next step" width="1280" height="1600" loading="lazy" decoding="async" />],
  ['Exposure', 'A PD rating and an exposure scenario from the 2005 rating schedule, with the maths shown.', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/07-exposure.png" alt="Exposure on the lumbar spine: 12% as rated, 5–8% if DRE II, with the maths shown" width="1280" height="1600" loading="lazy" decoding="async" />],
];

const WL_ENG = [
  ['Citation check', 'Every quote and page in a draft is checked against the case file before the draft can be approved.'],
  ['Lawyer’s yes', 'WilboLaw drafts, and a lawyer approves. Nothing is sent anywhere on its own.'],
  ['Audit log', 'Every upload, issue, draft and approval is recorded against the person who did it.'],
  ['Firm isolation', 'Each firm’s data is kept separate, and access is by role: Partner, attorney, paralegal.'],
  ['Automated testing', 'Nothing ships until 1,056 tests pass, browser tests included.'],
  ['OCR', 'Scanned files are read page by page, so a 300-page scan has real page numbers.'],
  ['Word and PDF', 'Every draft exports on the firm’s letterhead, with blanks marked until they’re filled.'],
  ['Legal library', 'The Labor Code, CCR Title 8, the 2005 rating schedule and the firm’s own licensed AMA Guides.'],
];

const WL_DAY = [
  ['The report arrives.', 'Dr. Chen’s PQME is added to the Martinez file. WilboLaw reads all of it and checks it against the rest of the file.', () => <WlmFile fresh />],
  ['The issues.', 'Four high-severity issues, each with its page. One: the history leaves out the low back soreness Martinez admitted to in her deposition, though Chen lists the deposition as reviewed.', () => <WlmIssues items={[2, 0]} more={2} />],
  ['The plan.', 'The case Plan sets the next move and says why: ask for a supplemental report before the MSC.', () => <WlmPlan />],
  ['The draft.', 'A supplemental request to Dr. Chen, on Alder & Marsh letterhead, with ten questions tied to the pages. Sarah Novak reads it, fills in the date and approves it.', () => <WlmDraft />, 'Approve and export PDF.'],
  ['The supplemental.', 'Chen replies. WilboLaw compares it with the first report: the lumbar rating moved from DRE III to DRE II, 6 of 10 questions answered, 4 still open.', () => <WlmCompare />],
  ['The update.', 'The plan updates to object to the four open issues. A 30-day status report for the claims examiner is drafted from the work already done: “Dr. Chen rated the lower back at 12%. We think the report doesn’t support that number, and we have asked him to explain it.”', () => <WlmStatus />],
];

const WL_OUT = [
  ['Marketing site', 'Win the medical-legal fight before the MSC.', '', '16/10', () => <WlmSite />, 'ink'],
  ['Trust page', 'Built to be checked.', '', '4/5', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/site-02-trust.png" alt="Built to be checked: four safeguards, each switched on, with 16 citations checked on the Martinez supplemental request" width="1280" height="1600" loading="lazy" decoding="async" />, 'shot'],
  ['Demo booking', 'See it on one of your own QME reports.', 'Book 20 minutes and bring a report, redacted if you prefer.', '4/5', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/site-03-demo-booking.png" alt="Book a demo form filled in, with a redacted PQME report attached and a 20-minute slot on Tue 24 Nov at 10:00" width="1280" height="1220" loading="lazy" decoding="async" />, 'shot'],
  ['Help centre', 'One short guide per job.', 'Every button a guide names is checked against the app.', '4/5', () => <img className="wl-tile-img" src="../assets/web/wilbolaw/tiles/site-04-help-centre.png" alt="Help centre with a search field and five short guides, each with its reading time" width="1280" height="1128" loading="lazy" decoding="async" />, 'shot'],
];

function wlFitAll() {
  document.querySelectorAll('[data-fit]').forEach(el => {
    const p = el.parentElement, cs = getComputedStyle(p);
    const aw = p.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const ah = p.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    el.style.zoom = 1;
    el.style.zoom = Math.min(1, aw / el.offsetWidth, (ah > 40 ? ah : 1e4) / el.offsetHeight);
  });
}

function WlResult({ items }) {
  const r = (items || []).filter(x => x && x[0] && x[1]);
  if (!r.length) return null;
  return <dl className="wx-res">{r.map(([v, l]) => <div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl>;
}

function WlEyebrow({ children, onDark }) {
  return <div className="wx-eb"><WL.Kicker as="span" size={11} tone={onDark ? 'onDark' : 'accentText'}>{children}</WL.Kicker></div>;
}

function WlHead({ eyebrow, title, lede, onDark, children }) {
  return <div className="wx-h wx-rv"><WlEyebrow onDark={onDark}>{eyebrow}</WlEyebrow><h2>{title}</h2>{lede ? <p className="wx-lede">{lede}</p> : null}{children}</div>;
}

function WlLink({ href, variant = 'primary', children, ext }) {
  return <a className="wx-bl" href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}><WL.Button variant={variant} style={{ height: 48, padding: '0 22px', fontSize: 15 }}>{children}</WL.Button></a>;
}

function WlPhoto({ src, alt, pos, className = 'wx-photo' }) {
  return <figure className={className + ' wl-ph wx-rv'} style={className === 'wx-photo' ? { marginBottom: 0 } : null}><img src={src} alt={alt} loading="lazy" style={pos ? { objectPosition: pos } : null} /></figure>;
}

function WlScrollText({ text }) {
  const ref = React.useRef(null);
  const words = text.split(' ');
  const [lit, setLit] = React.useState(0);
  React.useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) { setLit(words.length); return; }
    let raf = 0;
    const run = () => { raf = 0; const r = ref.current.getBoundingClientRect(), vh = innerHeight; const start = vh * .85, end = vh * .4; const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * .6))); setLit(Math.round(p * words.length)); };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);
  return <p className="big wx-read" ref={ref} aria-label={text}>{words.map((w, i) => <span key={i} aria-hidden="true" className={i < lit ? 'on' : ''}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}</p>;
}

function WlRail({ className, children }) {
  const t = React.useRef(null);
  const [st, setSt] = React.useState({ a: true, b: false });
  const upd = () => { const e = t.current; if (e) setSt({ a: e.scrollLeft < 4, b: e.scrollLeft + e.clientWidth >= e.scrollWidth - 4 }); };
  React.useEffect(() => {
    const e = t.current;
    const sync = () => { const it = e.querySelector('.wx-it'); if (it) e.style.scrollPaddingInline = (it.offsetLeft - e.offsetLeft) + 'px'; upd(); };
    const reset = () => { sync(); e.scrollLeft = 0; upd(); };
    reset(); const id = setTimeout(reset, 400); addEventListener('load', reset); addEventListener('resize', sync);
    return () => { clearTimeout(id); removeEventListener('load', reset); removeEventListener('resize', sync); };
  }, []);
  const go = d => { const e = t.current, it = e.querySelector('.wx-it'); e.scrollBy({ left: (it.offsetWidth + 20) * d, behavior: 'smooth' }); };
  const arrow = d => <svg viewBox="0 0 24 24"><path d={d < 0 ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}></path></svg>;
  return (
    <div className={className + ' wx-rv'}>
      <div className="wx-track" ref={t} onScroll={upd}>{children}</div>
      <div className="wx-nav"><button type="button" className="wx-btn" aria-label="Previous" disabled={st.a} onClick={() => go(-1)}>{arrow(-1)}</button><button type="button" className="wx-btn" aria-label="Next" disabled={st.b} onClick={() => go(1)}>{arrow(1)}</button></div>
    </div>
  );
}

const WL_DAY_FILMS = [["01","The PQME report arrives and its three checks against the file tick off"],["02","The two quotes are highlighted and the mismatch between them is flagged"],["03","Reading finishes and the supplemental request becomes the next move"],["04","Citations count up to 16, the checks tick off and Approve becomes available"],["05","DRE III is struck through for DRE II and the answered bar fills to 6 of 10"],["06","The plan updates and objecting to the four open issues becomes next"]];

function WlDay() {
  const [cur, setCur] = React.useState(0);
  const [auto, setAuto] = React.useState(!matchMedia('(prefers-reduced-motion:reduce)').matches);
  const [seen, setSeen] = React.useState(0);
  const [done, setDone] = React.useState(-1);
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => { const io = new IntersectionObserver(es => es.forEach(e => setVis(e.isIntersecting)), { threshold: .4 }); io.observe(ref.current); return () => io.disconnect(); }, []);
  React.useEffect(() => { setSeen(n => Math.max(n, cur)); setDone(-1); }, [cur]);
  // Advance when the current step's animation has finished (fallback after 14s if it never reports).
  React.useEffect(() => { if (!auto || !vis) return; const next = () => setCur(c => (c + 1) % WL_DAY.length); const id = setTimeout(next, done === cur ? 1400 : 14000); return () => clearTimeout(id); }, [auto, vis, cur, done]);
  const d = WL_DAY[cur];
  return (
    <div ref={ref} className="wx-rv">
      <div className="wx-stage wl-day">{WL_DAY.map((s, i) => <div key={i} className={'wx-scene' + (i === cur ? ' on' : '')}>{i <= seen + 1 ? <WlFilm src={'wl-anim/day-' + WL_DAY_FILMS[i][0] + '.html'} title={'Animation: ' + WL_DAY_FILMS[i][1]} active={i === cur} paused={!vis} onEnd={() => setDone(i)} /> : null}</div>)}</div>
      <div className="wx-tl" style={{ '--p': cur / (WL_DAY.length - 1) }}>
        {WL_DAY.map((s, i) => <button key={i} type="button" aria-label={s[0]} className={i === cur ? 'on' : i < cur ? 'past' : ''} onClick={() => { setAuto(false); setCur(i); }}><i></i>{wlPad(i + 1)}</button>)}
      </div>
      <div className="wx-dtx"><h3>{d[0]}</h3><p>{d[1]}{d[3] ? <> <b>{d[3]}</b></> : null}</p></div>
    </div>
  );
}

function WlLogo() {
  const [k, setK] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => { const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { setK(1); io.disconnect(); } }), { threshold: .5 }); io.observe(ref.current); return () => io.disconnect(); }, []);
  const h = Math.max(44, Math.min(104, Math.min(window.innerWidth, 1400) * .07));
  return (
    <div className="wx-b logo wx-rv" ref={ref}>
      <div key={k} className={'wx-lu' + (k ? ' wx-play' : '')} style={{ gap: h * .3 }}><span className="m"><WL.Logo variant="mark" inverse size={h} /></span><span className="t wl-wm" style={{ fontSize: h * .674 }}>Wilbo<span>Law</span></span></div>
      <button type="button" className="wx-replay" onClick={() => setK(k + 1)}>Replay</button>
    </div>
  );
}

// Films: bundled animations shown without their player chrome.
// Default: loops once in view (hero). once: plays once in view, holds before its fade-out, offers Replay.
// active (controlled): plays from the start while active, pauses otherwise; onEnd fires when it settles.
function WlFilm({ src = 'wilbolaw-film.html', title = 'WilboLaw demo: Sarah reviews Dr. Chen’s report, drafts a supplemental request tied to page 4 and sends it', once = false, active, paused = false, onEnd }) {
  const ref = React.useRef(null), ctl = React.useRef(null);
  const controlled = active !== undefined;
  const actRef = React.useRef(active), pauseRef = React.useRef(paused), endRef = React.useRef(onEnd);
  actRef.current = active; pauseRef.current = paused; endRef.current = onEnd;
  const [ended, setEnded] = React.useState(false);
  React.useEffect(() => () => ctl.current && ctl.current.stop(), []);
  // Becoming active starts from the first frame; leaving rests, then rewinds once hidden so a revisit never flashes the old end state.
  React.useEffect(() => {
    const c = ctl.current; if (!controlled || !c || !c.ready) return;
    if (active) { c.pending = true; if (!pauseRef.current) c.play(); }
    else { c.hold(); const id = setTimeout(() => { if (!actRef.current) c.reset(); }, 450); return () => clearTimeout(id); }
  }, [active]);
  // Scrolling away pauses; coming back resumes where it was.
  React.useEffect(() => { const c = ctl.current; if (!controlled || !c || !c.ready || !actRef.current) return; paused ? c.hold() : (c.pending ? c.play() : c.resume()); }, [paused]);
  const onLoad = () => {
    const f = ref.current; let tries = 0;
    const strip = () => {
      let d; try { d = f.contentDocument; } catch (e) { return; }
      const sv = d && d.querySelector('[data-om-exportable-video-with-duration-secs]');
      if (!sv) { if (tries++ < 120) setTimeout(strip, 100); return; }
      const area = sv.parentElement, root = area.parentElement;
      if (area.nextElementSibling) area.nextElementSibling.style.display = 'none';
      root.style.background = 'transparent'; sv.style.boxShadow = 'none';
      d.documentElement.style.background = d.body.style.background = 'transparent';
      const st = d.createElement('style');
      st.textContent = 'svg[data-om-exportable-video-with-duration-secs]{transform:scale(var(--wl-fit,1))!important;transform-origin:center!important;box-shadow:none!important}';
      d.head.appendChild(st);
      const W = +sv.getAttribute('width') || 1920, H = +sv.getAttribute('height') || 1080;
      const fit = () => { d.documentElement.style.setProperty('--wl-fit', String(Math.min(f.clientWidth / W, f.clientHeight / H))); area.style.setProperty('padding', '0', 'important'); root.style.setProperty('padding', '0', 'important'); };
      fit(); setTimeout(fit, 60); new ResizeObserver(fit).observe(f); addEventListener('resize', fit);
      const btn = t => d.querySelector('[title="' + t + '"]');
      const dur = parseFloat(sv.getAttribute('data-om-exportable-video-with-duration-secs')) || 8;
      // Stop before a closing "Out" scene (it fades to empty for looping), so a one-shot rests on its finished frame.
      let out = 0; try { const sc = JSON.parse(f.contentWindow.OM_SCENES || '[]'); const l = sc[sc.length - 1]; if (l && /^out$/i.test(l.name)) out = +l.dur || 0; } catch (e) {}
      const loop = !once && !controlled, stopAt = Math.max(.5, dur - (loop ? 0 : out));
      let playing = true, timer = 0, started = false, io = null, remaining = stopAt * 1000, t0 = 0, finished = false;
      const toStart = () => { const r = btn('Return to start (0)'); if (r) r.click(); };
      const toggle = () => { const pb = btn('Play/pause (space)'); if (pb) pb.click(); else f.contentWindow.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', key: ' ' })); playing = !playing; };
      const finish = () => { if (playing) toggle(); finished = true; if (once) setEnded(true); endRef.current && endRef.current(); };
      const arm = () => { if (loop) return; t0 = performance.now(); timer = setTimeout(finish, remaining); };
      const play = () => { clearTimeout(timer); toStart(); if (!playing) toggle(); setEnded(false); finished = false; remaining = stopAt * 1000; ctl.current.pending = false; arm(); };
      const hold = () => { clearTimeout(timer); if (playing) { toggle(); remaining = Math.max(0, remaining - (performance.now() - t0)); } };
      const resume = () => { if (!playing && !finished && remaining > 0) { toggle(); arm(); } };
      const reset = () => { clearTimeout(timer); if (playing) toggle(); toStart(); finished = false; remaining = stopAt * 1000; };
      toStart(); toggle();
      ctl.current = { play, hold, resume, reset, pending: true, ready: false, stop: () => { clearTimeout(timer); io && io.disconnect(); } };
      const imgs = [...d.images].filter(i => !i.complete).map(i => new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }));
      const ready = Promise.all([d.fonts ? d.fonts.ready : null, ...imgs]);
      Promise.race([ready, new Promise(r => setTimeout(r, 4000))]).then(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        fit(); f.classList.add('on'); ctl.current.ready = true;
        if (controlled) { if (actRef.current && !pauseRef.current) setTimeout(() => { if (actRef.current && !pauseRef.current && ctl.current.pending) play(); }, 200); return; }
        io = new IntersectionObserver(es => { if (!started && es[0].isIntersecting) { started = true; io.disconnect(); setTimeout(play, 350); } }, { threshold: once ? .45 : .2 });
        io.observe(f);
      })));
    };
    strip();
  };
  return <><iframe ref={ref} className="wl-film" src={src} title={title} onLoad={onLoad} tabIndex={-1} loading={loopLazy(once, controlled)} />{once && <button type="button" className={'wl-replay' + (ended ? ' on' : '')} tabIndex={ended ? 0 : -1} aria-hidden={!ended} onClick={() => ctl.current && ctl.current.play()}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>Replay</button>}</>;
}
function loopLazy(once, controlled) { return once || controlled ? 'lazy' : 'eager'; }

function WlPage() {
  React.useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.wx-rv').forEach(el => io.observe(el));
    wlFitAll(); addEventListener('resize', wlFitAll); addEventListener('load', wlFitAll);
    document.fonts && document.fonts.ready.then(wlFitAll);
    return () => { io.disconnect(); removeEventListener('resize', wlFitAll); };
  }, []);
  let n = 0;
  return (
    <>
      <header className="wx-hero" data-screen-label="01 Hero"><div className="w">
        <div className="ic wx-rv"><span className="wl-tile"><WL.Logo variant="mark" inverse size={56} /></span></div>
        <div className="wx-rv"><WlEyebrow>WilboLaw · Case study</WlEyebrow></div>
        <h1 className="wx-rv">Every claim has a page.</h1>
        <p className="wx-lede wx-rv">WilboLaw reads a California workers’ comp file the way a careful defense attorney would. It finds what’s wrong with the medical-legal report, shows the page it’s on and drafts the letter that fixes it. A lawyer approves everything.</p>
        <p className="wx-role wx-rv">Designed and built by Benjamin Brown.</p>
        <div className="wx-cta wx-rv"><WlLink href="#how">See how it works</WlLink><WlLink href="https://wilbolaw.com" variant="default" ext>Visit WilboLaw</WlLink></div>
        <div className="wx-lead">
          <WlPhoto className="wx-lead-ph" src="../assets/web/wl/hero-window-reading.png" alt="A man reading a printed document on a window seat in a dark wood-panelled room" pos="50% 30%" />
          <div className="wx-film wx-rv wl-app"><WlFilm /></div>
        </div>
        <dl className="wx-meta wx-rv">
          <div><dt>Checks on every QME report</dt><dd>35</dd></div>
          <div><dt>Letters in the firm’s format</dt><dd>10</dd></div>
          <div><dt>Automated tests</dt><dd>1,056</dd></div>
          <div><dt>Longest scan read</dt><dd>320<small> pages</small></dd></div>
        </dl>
      </div></header>

      <section className="wx-sec wx-say" data-screen-label="02 The project"><div className="w">
        <div className="wx-rv"><WlEyebrow>The project</WlEyebrow></div>
        <WlScrollText text="A QME report decides most of what a workers’ comp case is worth, and it can run to hundreds of pages." />
        <p className="wx-lede wx-rv">Defense attorneys carry 80 to 150 files each. Thin apportionment, impairments added instead of combined, a history that contradicts the deposition: if nobody raises it before the MSC, it usually stays. WilboLaw does the first read so the attorney’s time goes on strategy. It’s a review layer, not a drafting machine. Every issue it raises is tied to a page, and nothing leaves without a lawyer’s yes.</p>
        <WlPhoto src="../assets/web/wl/attorney-desktop.png" alt="An attorney working at a desktop computer in a bright office" pos="50% 35%" />
        <p className="wx-capc wx-rv"><b>The file.</b> Where the case is won or lost.</p>
      </div></section>

      <section className="wx-sec" id="how" style={{ paddingTop: 0 }} data-screen-label="03 How it works"><div className="w">
        <WlHead eyebrow="How it works" title="Read by the software. Decided by the lawyer." lede="WilboLaw does the reading, the checking and the first draft. The attorney makes the call." />
        <div className="wx-rows">
          <div className="wx-row wx-rv"><div className="wx-pan card wl-anim"><WlFilm once src="wl-anim/01-the-file.html" title="Animation: the four case documents are read, then the case timeline builds" /></div><div className="wx-copy"><span className="n">01 · The file</span><h3>Drop the whole file in.</h3><p>QME and AME reports, supplementals, treating records, depositions and letters, scanned or not. <b>Every page is read, typed and dated, and put on the case timeline.</b></p><WlResult items={[['320 pages', 'Longest scan read']]} /></div></div>
          <div className="wx-row flip wx-rv"><div className="wx-pan card wl-anim"><WlFilm once src="wl-anim/02-the-issues.html" title="Animation: 35 checks run, two high issues appear and page 4 opens on the source sentence" /></div><div className="wx-copy"><span className="n">02 · The issues</span><h3>Know what’s wrong, and exactly where.</h3><p>Each report is checked against the AMA Guides 5th edition, the Labor Code and the case law a defense attorney would cite: method, apportionment, Almaraz/Guzman, rating arithmetic and history. <b>Each issue comes with its severity and the page it’s on.</b></p><WlResult items={[['35', 'Checks on every report']]} /></div></div>
          <div className="wx-row wx-rv"><div className="wx-pan ink wl-anim"><WlFilm once src="wl-anim/03-the-letter.html" title="Animation: the supplemental request is drafted with citations, checked and made ready to approve" /></div><div className="wx-copy"><span className="n">03 · The letter</span><h3>The fix, drafted from the problem.</h3><p>An issue becomes a supplemental report request, a deposition outline or an objection, on the firm’s letterhead and in its format. <b>Citations are checked before a draft can be approved.</b> Anything left blank is marked.</p><WlResult items={[['10', 'Letters in the firm’s format']]} /></div></div>
        </div>
      </div></section>

      <section className="wx-sec wx-grey" id="day" data-screen-label="04 A day with WilboLaw"><div className="w">
        <WlHead eyebrow="A day with WilboLaw" title="From the report to the reply." />
        <WlDay />
        <WlPhoto src="../assets/web/wl/attorney-reading-table.png" alt="An attorney reading a printed page, pen in hand, across a table from a client" pos="50% 35%" />
        <p className="wx-capc wx-rv"><b>The examiner gets an update they can read in a minute.</b> Nobody re-read the report to write it.</p>
      </div></section>

      <section className="wx-sec" id="product" data-screen-label="05 Product"><div className="w">
        <WlHead eyebrow="The caseload" title="Every file, one next step." lede="Today shows what needs you across all your cases: what’s due, what’s waiting on someone else and what came in overnight. Each case has a Plan with the next move and why. Paralegals see what’s assigned to them." />
        <div className="wx-film wx-rv wl-today wl-anim" style={{ marginTop: 0 }}><WlFilm once src="wl-anim/today.html" title="Animation: overnight items land in Needs you, the top item explains its next step, and the late AME supplemental is chased and drops off the list" /></div>
        <p className="wx-capc wx-rv"><b>Today.</b> The morning view of the caseload.</p>
        <div className="wx-hl wx-rv" style={{ marginTop: 'clamp(104px,12vw,168px)' }}><div><WlEyebrow>Product</WlEyebrow><h2>One app. Seven jobs.</h2></div><p className="wx-lede">Everything the attorney, the paralegal and the claims examiner touch, built around the same case file.</p></div>
        <WlRail className="wx-pr">
          {WL_PRODUCTS.map(([k, p, mock], i) => <article key={k} className="wx-it"><div className="wx-card wl-ftile">{mock()}</div><div className="wx-cap"><span className="k">{wlPad(i + 1)} · {k}</span><p>{p}</p></div></article>)}
        </WlRail>
      </div></section>

      <section className="wx-sec wx-ink" id="engineering" data-screen-label="06 Under the hood"><div className="w">
        <WlHead onDark eyebrow="Under the hood" title="Built to be checked." lede="The WCAB has sanctioned filings with AI-invented citations. WilboLaw is built so every citation can be checked." />
        <div className="wx-nums wx-rv" style={{ gridTemplateColumns: 'repeat(2,minmax(0,1fr))' }}><div><b>10</b><span>Letters in the firm’s format</span></div><div><b>35</b><span>Checks per report</span></div></div>
        <div className="wx-eng">
          <div className="wx-acc wx-rv">{WL_ENG.map(([t, p], i) => <details key={t} name="wl-eng" open={i === 0}><summary>{t}<i></i></summary><p>{p}</p></details>)}</div>
          <div className="wx-stack wx-rv">
            <div className="wx-lay"><span>Surfaces</span><div className="wx-chips"><b>Today</b><b>Case file</b><b>Drafts</b><b>Library</b></div></div>
            <div className="wx-lay"><span>Records</span><div className="wx-chips"><b>Cases</b><b>Documents</b><b>Issues</b><b>Letters</b></div></div>
            <div className="wx-lay ag"><span>Agent layer</span><div className="wx-chips"><b>Reading</b><b>Assessment</b><b>Drafting</b><b>Comparison</b></div></div>
            <div className="wx-lay"><span>Platform</span><div className="wx-chips"><b>Claude</b><b>Voyage</b><b>OCR</b><b>Word/PDF</b></div></div>
          </div>
        </div>
        <WlPhoto src="../assets/web/wl/attorney-steps-phone-v2.png" alt="An attorney walking down stone steps outside a building, reading her phone with a folio under her arm" pos="70% 40%" />
      </div></section>

      <section className="wx-sec" id="brand" data-screen-label="07 Brand"><div className="w">
        <WlHead eyebrow="Brand" title="Ink, fog, one blue." lede="Black does the work. One muted blue marks the thing to act on, and red is only for severity. Set in Archivo, with Martian Mono for page cites and case numbers. No italics anywhere." />
        <div className="wx-bento">
          <WlLogo />
          <div className="wx-b wx-rv" style={{ background: 'var(--obsidian)', color: '#fff' }}><span className="l">Ink</span><span className="v">#0D0D0D</span></div>
          <div className="wx-b wx-rv" style={{ background: 'var(--fog)', boxShadow: 'inset 0 0 0 1px var(--line)' }}><span className="l">Fog</span><span className="v">#F5F5F5</span></div>
          <div className="wx-b wx-rv" style={{ background: 'var(--moonstone)' }}><span className="l">Blue</span><span className="v">#519CAB</span></div>
          <div className="wx-b wx-rv" style={{ background: 'var(--moonstone-deep)', color: '#fff' }}><span className="l">Deep blue</span><span className="v">#2C6B77</span></div>
          <div className="wx-b wx-rv" style={{ background: 'var(--crit)', color: '#fff' }}><span className="l">Severity red</span><span className="v">#A8321C</span></div>
          <div className="wx-b ty wx-rv"><span className="l">Archivo and Martian Mono</span><div className="row"><span className="aa">Aa</span><span style={{ fontFamily: 'var(--fmono)', fontSize: 12, color: 'var(--slate)' }}>ADJ14892037 · QME p.4 · Nov 18, 2026</span></div></div>
          <div className="wx-b ai wx-rv"><WL.Logo variant="seal" size={88} /></div>
        </div>
        <WlPhoto src="../assets/web/wl/meeting-room-doorway.png" alt="Seen through a doorway, an attorney holding printed pages talks with two colleagues at a meeting table" pos="60% 45%" />
        <p className="wx-capc wx-rv"><b>Imagery.</b> Real offices, paper on the desk, mid-task moments. A finger on a line of a printed report.</p>
      </div></section>

      <section className="wx-sec wx-grey" id="launch" data-screen-label="08 Launch"><div className="w">
        <WlHead eyebrow="Launch" title="From one interview to a demo pipeline." lede="It started with one defense partner describing the first 90 minutes of every QME. The research set the message, and the site, the trust page and the demo all say it the same way." />
        <div className="wx-desk wx-rv"><div className="scr wl-scr"><div data-fit=""><WlmSite /></div></div></div>
        <p className="wx-capc wx-rv"><b>Marketing site.</b> Where the demo request starts.</p>
        <div className="wx-hl wx-rv" style={{ marginTop: 'clamp(104px,12vw,168px)' }}><div><WlEyebrow>Launch</WlEyebrow><h2>Everything that went out.</h2></div></div>
        <WlRail className="wx-cm">
          {WL_OUT.map(([k, t, more, ar, body, tone], i) => <article key={k} className="wx-it"><div className={'wx-card wl-oc' + (tone ? ' ' + tone : '')} style={{ aspectRatio: ar }}>{tone === 'shot' ? body() : <div data-fit="">{body()}</div>}</div><div className="wx-cap"><span className="k">{wlPad(i + 1)} · {k}</span><p><b>{t}</b>{more ? ' ' + more : ''}</p></div></article>)}
        </WlRail>
        <div className="wx-two wx-rv">
          <div><h3>Content</h3><p>A help centre written from how the app actually behaves, one guide per job. A test confirms that every button a guide quotes really exists, so a renamed button fails the build instead of leaving a guide wrong.</p></div>
          <div><h3>Lead generation</h3><p>A demo-led motion: the attorney brings their own QME report, redacted if they prefer, and sees what WilboLaw finds on it in 20 minutes.</p></div>
        </div>
      <WlPhoto src="../assets/web/wl/demo-table-review.png" alt="Two people at a table under a pendant lamp, one pointing to a line on a printed report while the other marks it with a pen" pos="50% 50%" />
        <p className="wx-capc wx-rv"><b>The demo.</b> Their own report, on the table.</p>
      </div></section>

      <section className="wx-sec" id="method" data-screen-label="09 The method"><div className="w">
        <WlHead eyebrow="The method" title="Ten questions. 28 answers." lede="Every project gets looked at through the same ten areas, in the same order. This is what each one produced here." />
        <div className="wx-mt">
          {['Direction', 'Foundations', 'Customer', 'Build'].map((stg, si) => <div key={stg} className="wx-mt-st">
            <div className="wx-mt-k wx-rv"><span>Stage {si + 1}</span><b>{stg}</b><i></i></div>
            <div className="wx-dl wx-mt-g">{WL_METHOD.filter(a => a[0] === stg).map(([, num, name, q, items, res]) => <div key={num} className="wx-ar wx-rv">
              <h4><span>{num} · {name}</span><span>{wlPad(items.length)}</span></h4>
              <p className="wx-ar-q">{q}</p>
              <ul>{items.map(it => { n++; return <li key={it}><span>{wlPad(n)}</span>{it}</li>; })}</ul>
              <WlResult items={[res]} />
            </div>)}</div>
          </div>)}
        </div>
        <div className="wx-mt-ft wx-rv"><a href="../services.html">See the method <span aria-hidden="true">→</span></a></div>
      </div></section>

      <section className="wx-sec wx-grey wx-end" data-screen-label="10 End"><div className="w">
        <div className="wx-rv"><WlEyebrow>WilboLaw</WlEyebrow></div>
        <h2 className="wx-rv">What could eight of your people run?</h2>
        <div className="wx-cta wx-rv"><WlLink href="../contact.html">Let’s talk</WlLink><WlLink href="https://wilbolaw.com" variant="default" ext>Visit WilboLaw</WlLink></div>
        <a className="wx-next wx-rv" href="warrantyos-v2.html"><div><WL.Kicker>Next case study</WL.Kicker><h2>WarrantyOS</h2><span className="wx-go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></span></div><div className="media"><img src="../assets/web/warrantyos-team.jpg" alt="Three colleagues talking as they walk through an office" loading="lazy" /></div></a>
      </div></section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('wx-root')).render(<WlPage />);
