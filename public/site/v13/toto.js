/* Harvey, the site assistant.
   A chat layer that talks to /api/chat. The server holds the model, the facts and the limits; this
   script shows the conversation and carries out the actions the server returns (move to a page,
   open the request form, open the coffee booking). Voice: the visitor's words appear in the conversation as they
   speak (BBVoice in site.js), and the reply to a spoken message is read aloud piece by piece as it is written (/api/voice/speak).
   The line under Harvey's name always says what is happening: listening, thinking or speaking.

   Layout: before a chat there is only the launcher. Once open, phones get a caption dock pinned to the
   bottom (current line, previous line, controls, with the full transcript a tap away); anything wider gets
   a 400px panel docked to the right, with the page itself narrowed so the panel never covers it. Both share
   the same conversation engine below - only the markup and CSS differ by width.
   API kept from the design: window.BBAgentDesk.open() / close() / ask(text), and any element with
   [data-agent-open] opens it. */
(function () {
  'use strict';
  if (window.BBAgentDesk) return;

  var NAME = 'Harvey';
  var GREETING = "Hi, I'm Harvey, Ben's AI assistant. I can answer questions about the work, the method and pricing, show you around, or open a request for Ben. What are you working on?";
  var GREETING_SPOKEN = "Hi, it's Harvey. How can I help?";
  var STARTERS = ['What does Ben do?', 'Run a quick discovery', 'Show me the work', 'I would like to talk to Ben'];
  var HOME_SECTIONS = { work: 'work', method: 'services', pricing: 'pricing', testimonials: 'testimonials' };
  // Human labels for the ring + "Moved to" note. Anything not listed falls back to a heading inside the target.
  var SECTION_LABELS = { work: 'Work', services: 'The method', 'method-stack': 'The method', pricing: 'Pricing', testimonials: 'Testimonials', contact: 'Start here' };
  var TOPIC_LABELS = { work: 'the work', services: 'the method', 'method-stack': 'the method', pricing: 'pricing', testimonials: 'testimonials', contact: 'getting started' };
  var KEYS = { history: 'toto:chat', session: 'toto:sid', seen: 'toto:seen', known: 'toto:known', reopen: 'toto:reopen', resume: 'toto:resume', ended: 'toto:ended' };
  var MAX_STORED = 60;

  /* ---------- storage ---------- */
  function read(store, key) { try { return store.getItem(key); } catch (e) { return null; } }
  function write(store, key, value) { try { store.setItem(key, value); } catch (e) {} }
  function remove(store, key) { try { store.removeItem(key); } catch (e) {} }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16);
    });
  }
  // One id per visitor conversation, shared with the voice recorder in site.js.
  var session = read(localStorage, KEYS.session);
  if (!session) { session = uuid(); write(localStorage, KEYS.session, session); }

  var history = [];
  try { history = JSON.parse(read(localStorage, KEYS.history) || '[]'); } catch (e) {}
  if (!Array.isArray(history) || !history.length) history = [{ role: 'assistant', text: GREETING }];
  function save() { write(localStorage, KEYS.history, JSON.stringify(history.slice(-MAX_STORED))); }
  var topics = []; // section keys visited this run, for the ending summary
  try { topics = JSON.parse(read(sessionStorage, 'toto:topics') || '[]'); } catch (e) {}
  function saveTopics() { write(sessionStorage, 'toto:topics', JSON.stringify(topics)); }
  function noteTopic(key) { if (key && TOPIC_LABELS[key] && topics.indexOf(key) < 0) { topics.push(key); saveTopics(); } }

  /* ---------- markup ---------- */
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  var MARK = '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 38V13L24 8V38Z" fill="currentColor" stroke="none"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';
  var IC = {
    mic: '<svg class="i-mic" viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path></svg>',
    send: '<svg class="i-send" viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"></path></svg>',
    kb: '<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3"></rect><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"></path></svg>',
    tr: '<svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg>'
  };

  // Root holding everything the layer draws. data-phase (closed/open/ended) and the mobile/desktop CSS do the rest.
  var root = el('div', 'hv-root');
  root.setAttribute('data-phase', 'closed');

  var launch = el('button', 'hv-launch', MARK + '<i class="hv-bd"></i>');
  launch.type = 'button';
  launch.setAttribute('aria-label', 'Chat with ' + NAME);

  var panel = el('aside', 'bba hv-panel',
    '<div class="bba-head"><span class="av" aria-hidden="true">H<span class="sq"></span></span>' +
    '<div class="bba-who"><b>' + NAME + '</b><span class="s" aria-live="polite">Ben’s AI assistant</span></div>' +
    '<button type="button" class="hush" hidden>Stop</button>' +
    '<button type="button" class="tr" aria-expanded="false">Transcript ' + IC.tr + '</button>' +
    '<button type="button" class="bba-x" aria-label="End chat">' + IC.x + '</button></div>' +
    '<div class="bba-log" role="log" aria-live="polite"></div>' +
    '<div class="hv-cap" aria-live="polite"><p class="hv-cap-prev"></p><p class="hv-cap-cur"></p></div>' +
    '<div class="hv-end"><p class="eh">Chat ended</p><p class="es" aria-live="polite"></p><div class="eb">' +
    '<button type="button" class="done">Done</button><button type="button" class="keep">Keep talking</button></div></div>' +
    '<div class="bba-starters"></div>' +
    '<form class="bba-comp"><textarea rows="1" maxlength="1200" placeholder="' + (window.BBVoice && window.BBVoice.supported ? 'Type, or tap the mic to call…' : 'Ask anything…') + '" aria-label="Message"></textarea>' +
    '<div class="bba-ear" hidden><span class="lv" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="t">Listening…</span><button type="button" class="cancel">Cancel</button></div>' +
    '<button type="button" class="kbt" aria-label="Type instead">' + IC.kb + '</button>' +
    '<button type="button" class="mic" aria-label="Speak your message" aria-pressed="false">' + IC.mic + IC.send + '</button>' +
    '<button type="submit" class="send" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></button></form>' +
    '<div class="bba-foot"><span>' + NAME + ' is AI · hands over to Ben</span><button type="button" class="form">Request form ↗</button></div>');
  panel.setAttribute('aria-label', 'Chat with ' + NAME);

  /* While on a call the panel can be tucked away: a small bar keeps the call in view, with mute and hang up,
     and the page stays visible. Styled here; the main stylesheet is bundled from the design files. */
  var bar = el('div', 'bba-callbar',
    '<button type="button" class="cb-open" aria-label="Open the chat"><i class="cb-dot" aria-hidden="true"></i><span class="cb-t">On a call with ' + NAME + '</span></button>' +
    '<button type="button" class="cb-mute" aria-pressed="false">Mute</button><button type="button" class="cb-end">Hang up</button>');
  bar.hidden = true;
  bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', 'Call with ' + NAME);
  var barStyle = el('style', null, '.bba-callbar{position:fixed;right:90px;bottom:28px;z-index:81;display:flex;align-items:center;gap:6px;padding:6px;background:var(--ink,#0a0a0a);color:var(--bone,#f4f1ea);border-radius:999px;box-shadow:0 10px 28px rgba(10,10,10,.22);font:600 13.5px/1 var(--sans,system-ui,sans-serif)}' +
    '.bba-callbar[hidden]{display:none}.bba-callbar button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;padding:9px 12px;border-radius:999px}' +
    '.bba-callbar .cb-open{display:flex;align-items:center;gap:9px;padding-left:10px}.bba-callbar .cb-mute,.bba-callbar .cb-end{background:rgba(255,255,255,.1)}' +
    '.bba-callbar .cb-end{background:#ff5a1f;color:#fff}.bba-callbar .cb-mute[aria-pressed=true]{background:#f4f1ea;color:#0a0a0a}' +
    '.bba-callbar .cb-dot{width:10px;height:10px;border-radius:50%;background:#3ad07a;transition:transform .08s linear}' +
    '.bba-callbar[data-mode=speaking] .cb-dot{background:#ff5a1f}' +
    '@media (max-width:560px){.bba-callbar{right:86px;left:12px;bottom:118px;justify-content:space-between}.bba-callbar .cb-t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:34vw}}');

  // Ring + "Moved to" note live on the page itself, over whatever Harvey just scrolled to - not inside the panel.
  var ring = el('div', 'hv-ring', '<b></b>');
  var toast = el('div', 'hv-toast', '<span class="tt"></span><button type="button" class="back">Back</button>');
  toast.setAttribute('role', 'status');

  var log = panel.querySelector('.bba-log');
  var input = panel.querySelector('textarea');
  var form = panel.querySelector('.bba-comp');
  var starters = panel.querySelector('.bba-starters');
  var mic = panel.querySelector('.mic');
  var ear = panel.querySelector('.bba-ear');
  var statusLine = panel.querySelector('.bba-head .s');
  var hush = panel.querySelector('.hush');
  var trBtn = panel.querySelector('.tr');
  var capPrev = panel.querySelector('.hv-cap-prev');
  var capCur = panel.querySelector('.hv-cap-cur');
  var endSummary = panel.querySelector('.hv-end .es');
  var bars = [].slice.call(ear.querySelectorAll('.lv i'));

  /* What Harvey is doing right now, shown under his name and used to style the panel. */
  var STATES = { idle: 'Ben’s AI assistant', listening: 'Listening…', hearing: 'Working out what you said…', thinking: 'Thinking…', speaking: 'Speaking…' };
  function setState(name) {
    panel.setAttribute('data-state', name);
    statusLine.textContent = STATES[name] || STATES.idle;
    hush.hidden = name !== 'speaking';
  }
  function thinkingBubble(label) {
    var n = el('div', 'bba-think', '<span class="bba-think-d"><i></i><i></i><i></i></span><span class="bba-think-l"></span>');
    n.querySelector('.bba-think-l').textContent = label;
    n.setAttribute('role', 'status');
    return n;
  }
  STARTERS.forEach(function (text) {
    var b = el('button'); b.type = 'button'; b.textContent = text;
    b.addEventListener('click', function () { ask(text); });
    starters.appendChild(b);
  });

  /* The caption dock shows the live and previous line; the full transcript opens above it. On a call the
     spoken-to text is revealed word by word on a timer, since the call library only hands over full lines. */
  var capTimer = null;
  function who(m) { return m.role === 'user' ? 'You' : NAME; }
  function setCaptionLive(text) { clearInterval(capTimer); capCur.textContent = text; }
  function revealCaption(text) {
    clearInterval(capTimer);
    var words = text.split(/\s+/), i = 0;
    capCur.textContent = '';
    capTimer = setInterval(function () {
      i++; capCur.textContent = words.slice(0, i).join(' ');
      if (i >= words.length) clearInterval(capTimer);
    }, 220);
  }
  function updateCaption() {
    var n = history.length, last = history[n - 1], prev = history[n - 2];
    capPrev.textContent = prev ? who(prev) + ': ' + prev.text : '';
    if (last) setCaptionLive(last.text);
  }
  function openLog(on) {
    if (on == null) on = !panel.classList.contains('open-log');
    panel.classList.toggle('open-log', on);
    trBtn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if (on) log.scrollTop = log.scrollHeight;
  }
  trBtn.addEventListener('click', function () { openLog(); });

  function render() {
    log.textContent = '';
    history.forEach(function (m) {
      var n = el('div', 'bba-msg' + (m.role === 'user' ? ' u' : '') + (m.error ? ' err' : ''));
      n.textContent = m.text; // text only: nothing from the server or the visitor is treated as HTML
      log.appendChild(n);
      if (m.report) log.appendChild(reportCard(m.report));
    });
    starters.style.display = history.some(function (m) { return m.role === 'user'; }) ? 'none' : '';
    if (gate) { log.appendChild(gate); openLog(true); } // the gate is a form: it must not be hidden in the caption dock
    log.scrollTop = log.scrollHeight;
    updateCaption();
  }

  /* The first-look report at the end of a discovery by conversation. Built from text nodes only. */
  var SIGNALS = { solid: 'Solid', partly: 'Partly there', open: 'Open' };
  function reportCard(data) {
    var r = data.report || {}, card = el('div', 'bba-report');
    function add(tag, cls, text) { var n = el(tag, cls); n.textContent = text; card.appendChild(n); return n; }
    add('span', 'k', 'First look · ' + (data.ref || ''));
    add('b', 't', r.company ? 'Where ' + r.company + ' should start' : 'Where to start');
    if (r.summary) add('p', 's', r.summary);
    var starts = (r.start || []).map(function (n) { var a = (r.areas || []).filter(function (x) { return x.n === n; })[0]; return a ? a.name : null; }).filter(Boolean);
    if (starts.length) add('p', 'st', 'Start with: ' + starts.join(', ') + '.');
    var list = el('ul', 'ar');
    (r.areas || []).forEach(function (a) {
      var li = el('li', a.signal), top = el('div', 'h'), nm = el('span', 'n'), sg = el('span', 'g'), nt = el('span', 'd');
      nm.textContent = a.n + '  ' + a.name; sg.textContent = SIGNALS[a.signal] || ''; nt.textContent = a.note || '';
      top.appendChild(nm); top.appendChild(sg); li.appendChild(top); if (a.note) li.appendChild(nt); list.appendChild(li);
    });
    card.appendChild(list);
    add('small', 'f', 'An automated first look, based only on what you told me. A full Discovery is Ben’s own appraisal of the business.');
    var row = el('div', 'bt'), book = el('button'), talk = el('button', 'ghost');
    book.type = talk.type = 'button'; book.textContent = 'Book a Discovery'; talk.textContent = 'Talk to Ben';
    book.addEventListener('click', function () { openRequest('discovery', (r.company ? r.company + ': ' : '') + 'first look ' + (data.ref || '') + (starts.length ? ', start with ' + starts.join(', ') : '')); });
    talk.addEventListener('click', function () { openCoffee(); });
    row.appendChild(book); row.appendChild(talk); card.appendChild(row);
    return card;
  }

  function note(text) { history.push({ role: 'assistant', text: text, error: true }); render(); }

  /* ---------- actions returned by the server ---------- */
  function openRequest(type, summary) {
    close();
    if (window.BBContact) window.BBContact.open({ type: type, brief: summary || '' });
    else location.href = '/contact#request';
  }
  function openCoffee() {
    close();
    if (window.BBCoffee) window.BBCoffee.open();
    else location.href = '/contact#coffee';
  }

  /* ---------- moving the page: ring, "Moved to" note, Back ----------
     Scrolling runs its own tween rather than the browser's smooth scroll, and re-reads the target's position
     every frame, because images loading in above it shift the page while it moves. */
  var moveTok = 0, prevScrollY = null, ringTimer = null, toastTimer = null;
  function labelFor(id, target) {
    if (SECTION_LABELS[id]) return SECTION_LABELS[id];
    var h = target && target.querySelector && target.querySelector('h1,h2');
    if (h && h.textContent.trim()) return h.textContent.trim().split(/\s+/).slice(0, 4).join(' ');
    return (id || '').replace(/-/g, ' ').replace(/^\w/, function (c) { return c.toUpperCase(); });
  }
  // On the mobile dock the panel sits over the bottom of the page; the side panel on wider screens never
  // overlaps the page at all, since the page itself is narrowed instead.
  var wideMQ = window.matchMedia ? matchMedia('(min-width:761px)') : null;
  function isWide() { return wideMQ ? wideMQ.matches : innerWidth >= 761; }
  function dockInset() { return panel.classList.contains('on') && !isWide() ? panel.offsetHeight + 16 : 16; }
  function targetY(target) {
    var inset = dockInset(), y = target.getBoundingClientRect().top + window.scrollY - inset;
    return Math.max(0, Math.min(y, document.scrollingElement.scrollHeight - window.innerHeight));
  }
  function tween(getY, done) {
    var tok = ++moveTok, y0 = window.scrollY, t0 = performance.now(), dur = Math.min(1100, Math.max(500, Math.abs(getY() - y0) * .12));
    function ease(x) { return 1 - Math.pow(1 - x, 4); }
    function step(now) {
      if (tok !== moveTok) return;
      var k = Math.min(1, (now - t0) / dur), y = getY();
      window.scrollTo(0, y0 + (y - y0) * ease(k));
      if (k < 1) return requestAnimationFrame(step);
      var n = 0;
      (function hold() {
        if (tok !== moveTok) return;
        var y2 = getY();
        if (Math.abs(window.scrollY - y2) > 1) window.scrollTo(0, y2);
        if (++n < 12) return requestAnimationFrame(hold);
        if (done) done();
      })();
    }
    requestAnimationFrame(step);
  }
  function hideRing() { ring.classList.remove('on'); clearTimeout(ringTimer); }
  function showRing(target, label) {
    var r = target.getBoundingClientRect(), p = 10;
    if (r.bottom < 0 || r.top > innerHeight) return;
    Object.assign(ring.style, { left: r.left - p + 'px', top: r.top - p + window.scrollY + 'px', width: r.width + p * 2 + 'px', height: r.height + p * 2 + 'px' });
    ring.style.position = 'absolute';
    ring.querySelector('b').textContent = label;
    ring.classList.add('on');
    clearTimeout(ringTimer); ringTimer = setTimeout(hideRing, 4200);
  }
  function hideMoveToast() { toast.classList.remove('on'); clearTimeout(toastTimer); }
  function showMoveToast(label, canBack) {
    toast.querySelector('.tt').innerHTML = 'Moved to <b>' + label.replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }) + '</b>';
    toast.querySelector('.back').hidden = !canBack;
    toast.classList.add('on');
    clearTimeout(toastTimer); toastTimer = setTimeout(hideMoveToast, 5200);
  }
  toast.querySelector('.back').addEventListener('click', function () {
    hideMoveToast(); hideRing();
    if (prevScrollY != null) tween(function () { return prevScrollY; });
  });
  // A scroll the visitor starts themselves cancels Harvey's move and hides the ring.
  ['wheel', 'touchstart'].forEach(function (ev) { addEventListener(ev, function () { moveTok++; }, { passive: true }); });
  addEventListener('scroll', function () { if (ring.classList.contains('on')) hideRing(); }, { passive: true });

  /* Collapses any expanded transcript so the page is visible again - the "chat shrinks to compact" moment. */
  function compactChat() { openLog(false); }

  /* Scrolls a section into view and marks it with the ring. Same contract as before: true if a target was found. */
  function moveToSection(id, fromVisitor) {
    var target = id && document.getElementById(id);
    if (!target) return false;
    noteTopic(id === HOME_SECTIONS.method ? 'method' : (Object.keys(HOME_SECTIONS).filter(function (k) { return HOME_SECTIONS[k] === id; })[0] || id));
    var label = labelFor(id, target);
    compactChat();
    prevScrollY = fromVisitor ? null : window.scrollY;
    hideRing();
    tween(function () { return targetY(target); }, function () { showRing(target, label); });
    showMoveToast(label, !fromVisitor);
    return true;
  }
  function goTo(path, section) {
    var id = section && (HOME_SECTIONS[section] || section);
    if (path === location.pathname) {
      if (!moveToSection(id)) window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    compactChat();
    if (id) write(sessionStorage, 'toto:section', id);
    write(sessionStorage, KEYS.reopen, '1'); // keep the conversation open on the next page
    location.href = path + (id ? '#' + id : '');
  }
  function run(actions) {
    (actions || []).forEach(function (a, i) {
      setTimeout(function () {
        if (a.type === 'go_to') goTo(a.path, a.section);
        else if (a.type === 'open_request') openRequest(a.request, a.summary);
        else if (a.type === 'book_coffee') openCoffee();
      }, 700 + i * 300);
    });
  }
  /* A report belongs to the reply it came with, so it is kept with that message and survives page changes. */
  function attachReport(actions) {
    (actions || []).forEach(function (a) {
      if (a.type !== 'report') return;
      history[history.length - 1].report = { ref: a.ref, report: a.report };
      save(); render();
    });
  }

  /* ---------- sending ---------- */
  var busy = false;
  var asking = null; // the question being answered right now; abort() withdraws it (see phone-call mode in the voice section)
  function ask(text, spoken) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    stopSpeaking();
    history = history.filter(function (m) { return !m.error; });
    var mark = history.length, aborted = false, wire = window.AbortController ? new AbortController() : null;
    // Counted once per visit and per way of asking, so analytics shows how many people used the chat, not how chatty they were.
    try { var tk = 'toto:tracked:' + (spoken ? 'voice' : 'typed'); if (!sessionStorage.getItem(tk)) { sessionStorage.setItem(tk, '1'); track('toto_message', { method: spoken ? 'voice' : 'typed' }); } } catch (e) {}
    history.push({ role: 'user', text: text });
    save(); render();
    input.value = ''; input.style.height = '';
    log.appendChild(thinkingBubble(NAME + ' is thinking')); log.scrollTop = log.scrollHeight;
    setState('thinking');

    // The reply arrives as a stream: the words are shown as they are written, and for a spoken question each
    // piece is spoken as soon as it is ready, so the voice starts on the first sentence. The caption dock's
    // current line mirrors the same bubble as it grows.
    var bubble = null, shown = '', talk = spoken ? startTalk() : null, finished = false;
    var me = asking = {
      /* The visitor carried on talking before he began to answer: take the question and any reply back out. */
      abort: function () {
        if (aborted) return;
        aborted = true; busy = false; if (asking === me) asking = null;
        if (wire) wire.abort();
        if (talk) { talk.after = null; talkFinish(talk, false); }
        history.length = mark; save(); render();
      }
    };
    function finishTurn(j) {
      if (aborted) return;
      finished = true;
      if (j.known) write(localStorage, KEYS.known, '1');
      history.push({ role: 'assistant', text: j.reply, local: !!j.limited });
      save(); render();
      if (!talk || talk.dead) setState('idle');
      attachReport(j.actions);
      if (j.gate || j.limited || !talk) hangUp(); // nothing will be spoken, so the open microphone is closed here
      if (j.gate) { if (talk) talkFinish(talk, false); showGate(); return; }
      if (talk && j.say) talkReplace(talk, j.say);
      // A spoken question gets a spoken answer; any move to another page waits until he has finished.
      // Hands-free: once he has finished speaking, and nothing is about to move the visitor elsewhere, listen for the next question.
      if (talk && !j.limited) talkEnd(talk, function (heardOut) {
        run(j.actions);
        var moving = (j.actions || []).some(function (a) { return a.type !== 'report'; });
        if (heardOut && !moving && isOpen() && !busy && !recording && !gate) startRecording(true);
      });
      else { if (talk) talkFinish(talk, false); run(j.actions); }
    }
    function onEvent(ev) {
      if (aborted) return;
      if (ev.t === 'd') {
        if (!bubble) {
          var th = log.querySelector('.bba-think'); if (th) th.parentNode.removeChild(th);
          bubble = el('div', 'bba-msg'); log.appendChild(bubble);
          if (!talk) setState('idle');
        }
        shown += ev.v; var text = shown.replace(/^\s+/, ''); bubble.textContent = text; log.scrollTop = log.scrollHeight;
        setCaptionLive(text);
      } else if (ev.t === 's') { if (talk) talkAdd(talk, ev.say); }
      else if (ev.t === 'done') finishTurn(ev);
      else if (ev.t === 'error') throw new Error(ev.error || 'no reply');
    }

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'text/event-stream' },
      signal: wire ? wire.signal : undefined,
      body: JSON.stringify({
        session: session,
        page: location.pathname,
        known: read(localStorage, KEYS.known) || '',
        voice: !!spoken,
        // Lines this script wrote itself (limit notices, the thank-you after the details step) are not sent back.
        messages: history.filter(function (m) { return !m.local && !m.error; }).map(function (m) { return { role: m.role, text: m.text }; }).slice(-44)
      })
    })
      .then(function (r) {
        // Limits and errors come back as one plain answer, not a stream.
        if ((r.headers.get('content-type') || '').indexOf('text/event-stream') < 0 || !r.body || !r.body.getReader) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            if (!j.reply) throw new Error(j.error || 'no reply');
            finishTurn(j);
          });
        }
        var reader = r.body.getReader(), decoder = new TextDecoder(), buffer = '';
        function pump() {
          return reader.read().then(function (step) {
            if (step.done) { if (!finished) throw new Error('no reply'); return; }
            buffer += decoder.decode(step.value, { stream: true });
            var cut;
            while ((cut = buffer.indexOf('\n\n')) >= 0) {
              var frame = buffer.slice(0, cut); buffer = buffer.slice(cut + 2);
              frame.split('\n').forEach(function (line) { if (line.indexOf('data:') === 0) onEvent(JSON.parse(line.slice(5))); });
            }
            return pump();
          });
        }
        return pump();
      })
      .catch(function (e) {
        if (finished || aborted) return; // the reply is already in, or was withdrawn
        hangUp();
        if (talk) talkFinish(talk, false);
        var msg = e && e.message && e.message !== 'no reply' && e.message.length < 200 ? e.message : 'I could not answer that just now. Please try again, or use the request form.';
        history.push({ role: 'assistant', text: msg, error: true });
        render(); setState('idle');
      })
      .then(function () { if (!aborted) { busy = false; if (asking === me) asking = null; } });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); } });
  input.addEventListener('input', function () { input.style.height = ''; input.style.height = Math.min(120, input.scrollHeight) + 'px'; });
  panel.querySelector('.kbt').addEventListener('click', function () { panel.classList.add('typing'); input.focus({ preventScroll: true }); });
  panel.querySelector('.form').addEventListener('click', function () { openRequest(); });

  /* ---------- the ask-once details step ----------
     Two steps: name and email, then the six-digit code sent to that email. The code proves the address is theirs. */
  var gate = null;
  function showGate() {
    if (gate) { render(); return; }
    gate = el('form', 'bba-gate',
      '<input type="text" name="name" placeholder="Your name" autocomplete="name" aria-label="Your name" required maxlength="120">' +
      '<input type="email" name="email" placeholder="you@company.com" autocomplete="email" aria-label="Your email" required maxlength="200">' +
      '<input type="text" name="code" placeholder="6-digit code from the email" inputmode="numeric" autocomplete="one-time-code" aria-label="Code from the email" maxlength="7" hidden>' +
      '<button type="submit">Send me a code</button>' +
      '<small>Used so Ben can follow up. See the <a href="/privacy">privacy page</a>.</small><span class="bba-gate-err" aria-live="polite"></span>');
    var step = 'details', name = '';
    gate.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = gate.querySelector('button'), err = gate.querySelector('.bba-gate-err');
      var codeIn = gate.elements.code;
      btn.disabled = true; err.textContent = '';
      var post = function (url, body) {
        return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.ok = r.ok && j.ok !== false; return j; }); });
      };
      if (step === 'details') {
        name = gate.elements.name.value.trim();
        post('/api/visitor/code', { session: session, name: name, email: gate.elements.email.value.trim() })
          .then(function (j) {
            btn.disabled = false;
            if (!j.ok) { err.textContent = j.error || 'The code did not send. Please try again.'; return; }
            step = 'code';
            gate.elements.name.readOnly = gate.elements.email.readOnly = true;
            codeIn.hidden = false; codeIn.required = true; codeIn.focus({ preventScroll: true });
            btn.textContent = 'Carry on';
            err.textContent = 'Code sent. Check your email (and spam).';
          })
          .catch(function () { btn.disabled = false; err.textContent = 'The code did not send. Please try again.'; });
        return;
      }
      post('/api/visitor', { session: session, code: codeIn.value })
        .then(function (j) {
          if (!j.ok) {
            btn.disabled = false; err.textContent = j.error || 'That did not work. Please try again.';
            if (j.expired) { step = 'details'; codeIn.value = ''; codeIn.hidden = true; codeIn.required = false; gate.elements.name.readOnly = gate.elements.email.readOnly = false; btn.textContent = 'Send me a code'; }
            return;
          }
          write(localStorage, KEYS.known, '1');
          gate = null;
          // Pick the conversation up where it stopped: drop the notice and re-ask the question that met the gate.
          history = history.filter(function (m) { return !m.error && !m.local; });
          var last = history[history.length - 1], pending = last && last.role === 'user' && !last.call ? history.pop().text : '';
          history.push({ role: 'assistant', text: 'Thanks, ' + name.split(' ')[0] + '. You can carry on typing, or tap the microphone to talk.', local: true });
          save(); render();
          if (pending) ask(pending); else input.focus({ preventScroll: true });
        })
        .catch(function () { btn.disabled = false; err.textContent = 'That did not save. Please try again.'; });
    });
    render();
  }

  /* ---------- voice ---------- */
  var voice = window.BBVoice;
  var SILENCE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  var recording = null, player = null;
  if (!voice || !voice.supported) mic.hidden = true;

  function unlockAudio() {
    // Phones only let a page play sound that started from a tap, so the player is started here, silently.
    if (!player) {
      player = new Audio();
      var next = function () { var t = talk; if (t && t.playing) { t.playing = false; talkNext(t); } };
      player.addEventListener('ended', next); player.addEventListener('error', next);
    }
    try { player.src = SILENCE; var p = player.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }

  /* A spoken reply is a queue of short pieces. The first is played straight from the server as it is made, so
     the voice starts quickly; the ones after it are fetched while it plays, so they follow without a gap. */
  var talk = null;
  function sayUrl(p) { return '/api/voice/speak?s=' + encodeURIComponent(session) + '&e=' + p.e + '&g=' + p.g + '&t=' + encodeURIComponent(p.text); }
  function startTalk() {
    stopSpeaking();
    var t = { queue: [], playing: false, ended: false, after: null, dead: false, started: false };
    t.timer = setTimeout(function () { stopTalk(t); }, 90000); // never hold a page move for longer than this
    talk = t;
    return t;
  }
  function talkAdd(t, p) {
    if (t.dead || !player || !isOpen()) return;
    var item = { url: sayUrl(p), blob: null, ready: null };
    if (t.started) {
      item.ready = fetch(item.url).then(function (r) { return r.ok ? r.blob() : null; })
        .then(function (b) { item.blob = b ? URL.createObjectURL(b) : null; item.failed = !b; })
        .catch(function () { item.failed = true; });
    }
    t.started = true;
    t.queue.push(item); talkNext(t);
  }
  function talkNext(t) {
    if (t.dead || t.playing) return;
    var item = t.queue.shift();
    if (!item) { if (t.ended) talkFinish(t, true); return; }
    t.playing = true;
    var go = function () {
      if (t.dead) return;
      if (item.failed) { t.playing = false; return talkNext(t); }
      hangUp(); // he is answering now, so the microphone held open for a change of mind is closed
      player.src = item.blob || item.url;
      launch.classList.add('speaking'); setState('speaking');
      var p = player.play();
      if (p && p.catch) p.catch(function () { if (t.playing) { t.playing = false; talkNext(t); } });
    };
    if (item.ready) item.ready.then(go); else go();
  }
  /* The server found the final words differ from what it streamed: say these instead. */
  function talkReplace(t, pieces) {
    if (t.dead) return;
    t.queue = []; t.playing = false; t.started = false;
    try { player.pause(); } catch (e) {}
    pieces.forEach(function (p) { talkAdd(t, p); });
  }
  /* No more pieces are coming. `after(heardOut)` runs when he has finished; heardOut is false if he was stopped. */
  function talkEnd(t, after) {
    t.ended = true; t.after = after;
    if (t.dead) { after(false); return; }
    if (!t.playing && !t.queue.length) talkFinish(t, t.started);
  }
  function talkFinish(t, heardOut) {
    if (t.dead) return;
    t.dead = true; clearTimeout(t.timer);
    if (talk === t) talk = null;
    launch.classList.remove('speaking');
    if (panel.getAttribute('data-state') === 'speaking') setState('idle');
    if (t.after) t.after(heardOut);
  }
  function stopTalk(t) {
    if (player && !player.paused) { try { player.pause(); } catch (e) {} }
    // If the reply is still being written, its actions run when it lands; talkEnd sees the talk is over.
    talkFinish(t, false);
  }
  function stopSpeaking() { if (talk) stopTalk(talk); else if (player && !player.paused) { try { player.pause(); } catch (e) {} } }
  hush.addEventListener('click', stopSpeaking);

  /* Listening: the words go into a bubble as they are spoken. It sends when the visitor pauses, or when they tap send. */
  var liveBubble = null;
  function listeningUI(on) {
    form.classList.toggle('listening', on);
    ear.hidden = !on; input.hidden = on;
    mic.classList.toggle('rec', on);
    mic.setAttribute('aria-pressed', on ? 'true' : 'false');
    mic.setAttribute('aria-label', on ? 'Send what you said' : 'Speak your message');
    if (!on) { bars.forEach(function (b) { b.style.transform = ''; }); if (liveBubble && liveBubble.parentNode) liveBubble.parentNode.removeChild(liveBubble); liveBubble = null; }
  }
  var QUIET_MS = 8000; // hands-free listening gives up quietly if nobody speaks
  function startRecording(handsFree) {
    if (!handsFree) unlockAudio();
    stopSpeaking();
    history = history.filter(function (m) { return !m.error; }); render();
    var waiting = thinkingBubble('Working out what you said'), heardWords = false, quiet = null, handedOver = false;
    function liveBubbleOn(text) {
      liveBubble = el('div', 'bba-msg u live' + (text ? ' has' : '')); liveBubble.textContent = text || 'Listening…';
      log.appendChild(liveBubble); log.scrollTop = log.scrollHeight;
    }
    recording = voice.listen({
      onStart: function () {
        listeningUI(true); setState('listening');
        liveBubbleOn('');
        if (handsFree) quiet = setTimeout(function () { if (!heardWords) stopRecording(true); }, QUIET_MS);
      },
      onWords: function (text) {
        if (!liveBubble || !text) return;
        heardWords = true; liveBubble.classList.add('has'); liveBubble.textContent = text; log.scrollTop = log.scrollHeight;
        ear.querySelector('.t').textContent = 'Pause or tap send';
      },
      /* Phone-call mode. A short pause sends what was said straight away, but the microphone stays open until he
         starts to speak. If the visitor carries on talking in that moment, the question is taken back and he
         keeps listening, so a pause for thought does not get them cut off. */
      onUtterance: function (text) {
        handedOver = true; clearTimeout(quiet);
        listeningUI(false);
        ask(text, true);
      },
      onResume: function () {
        handedOver = false;
        if (asking) asking.abort();
        listeningUI(true); setState('listening'); liveBubbleOn('');
      },
      onLevel: function (v) {
        bars.forEach(function (b, i) { b.style.transform = 'scaleY(' + (0.25 + Math.min(1, v * (0.6 + 0.4 * Math.sin(i * 1.9 + Date.now() / 140) + 0.4)) * 0.75).toFixed(2) + ')'; });
      },
      onStop: function () {
        clearTimeout(quiet);
        if (handedOver) return; // the message is already being answered; nothing on screen changes
        listeningUI(false); ear.querySelector('.t').textContent = 'Listening…';
        if (!heardWords && recording) { setState('hearing'); log.appendChild(waiting); log.scrollTop = log.scrollHeight; }
      }
    });
    recording.done.then(function (heard) {
      recording = null;
      if (waiting.parentNode) waiting.parentNode.removeChild(waiting);
      if (heard.released || handedOver) return; // already handed over and being answered
      setState('idle');
      if (heard.cancelled) return;
      if (heard.text) return ask(heard.text, true);
      note(heard.error);
      if (heard.gate) showGate();
    });
  }
  function stopRecording(cancel) { if (recording) { if (cancel) recording.cancel(); else recording.stop(); } }
  function hangUp() { if (recording && recording.release) recording.release(); }
  // Starting a call stops any speech already playing first, so tapping the mic always interrupts him.
  mic.addEventListener('click', function () { if (call) hangUpCall(); else if (recording) stopRecording(); else if (!busy) startCall(); });
  ear.querySelector('.cancel').addEventListener('click', function () { if (call) hangUpCall(); else stopRecording(true); });

  /* ---------- live voice calls ----------
     The microphone starts a call: ElevenLabs runs it (listening, turn-taking, cutting in, Rory's voice) and asks this
     site's server for every reply, so Harvey's facts and rules are the same as in the chat. Both sides appear in the
     chat as text. If calls are switched off, the microphone falls back to the older record-and-reply voice. */
  var CALL_SRC = (document.currentScript && document.currentScript.getAttribute('data-call')) || '/site/v13/vendor/call.mjs';
  var call = null; // { conv, ticket, known, deadline, timer, pending, ended }
  function inCall() { return !!call; }
  function syncBar() {
    bar.hidden = !call || isOpen();
    if (call) bar.setAttribute('data-mode', panel.getAttribute('data-state') === 'speaking' ? 'speaking' : 'listening');
  }
  function setMuted(m) {
    if (!call) return;
    call.muted = !!m;
    try { if (call.conv) call.conv.setMicMuted(call.muted); } catch (e) {}
    var b = bar.querySelector('.cb-mute'); b.setAttribute('aria-pressed', call.muted ? 'true' : 'false'); b.textContent = call.muted ? 'Unmute' : 'Mute';
  }
  /* Tuck the panel away without ending the call. */
  function minimize() {
    setPhase('closed', true);
    syncBar();
  }
  function callUI(on) {
    listeningUI(on);
    if (on) { ear.querySelector('.t').textContent = 'On a call · listening'; ear.querySelector('.cancel').textContent = 'Hang up'; mic.setAttribute('aria-label', 'Hang up'); }
    else { ear.querySelector('.cancel').textContent = 'Cancel'; ear.querySelector('.t').textContent = 'Listening…'; }
  }
  function earlierTurns() {
    var out = history.filter(function (m) { return !m.local && !m.error && (m.role === 'user' || m.role === 'assistant'); }).slice(-12)
      .map(function (m) { return { role: m.role, content: String(m.text).slice(0, 600) }; });
    if (!out.some(function (m) { return m.role === 'user'; })) return '';
    try { return btoa(unescape(encodeURIComponent(JSON.stringify(out)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); } catch (e) { return ''; }
  }
  function callLine(role, text) {
    text = (text || '').trim();
    if (!/[\p{L}\p{N}]/u.test(text)) return; // a silent turn comes through as "..."
    if (text === '[arrived]') return;
    text = text.replace(/\[[a-z][a-z ]{1,20}\]\s*/gi, '').trim(); // voice tags such as [warm] shape the voice, they are not words
    if (!text) return;
    var last = history[history.length - 1];
    if (last && last.role === role && last.text === text) return; // the greeting is already on screen
    history.push({ role: role, text: text, call: true });
    if (call) { call.lines = (call.lines || []).concat([{ role: role, text: text }]).slice(-24); }
    save(); render();
    // The call library hands over the whole line at once; the caption reveals it word by word to stand in for timing.
    if (role !== 'user') revealCaption(text);
  }
  function endCall(after) {
    var c = call; if (!c) { if (after) after(); return; }
    call = null;
    clearInterval(c.timer);
    callUI(false); setState('idle'); launch.classList.remove('speaking');
    bar.hidden = true; var mb = bar.querySelector('.cb-mute'); mb.setAttribute('aria-pressed', 'false'); mb.textContent = 'Mute';
    if (c.ticket) {
      try { fetch('/api/voice/call', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'end', ticket: c.ticket }) }).catch(function () {}); } catch (e) {}
    }
    var conv = c.conv; c.conv = null;
    if (conv) { try { conv.endSession(); } catch (e) {} }
    // A short note in the chat: what was talked about and the next step. Not when the call only moved to another page.
    if (!c.quiet && c.ticket && (c.lines || []).filter(function (l) { return l.role === 'user'; }).length >= 2) {
      fetch('/api/voice/call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'note', ticket: c.ticket, lines: c.lines }) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (j && j.ok && j.note) { history.push({ role: 'assistant', text: j.note, local: true, note: true }); save(); render(); } })
        .catch(function () {});
    }
    // At the end of the free call, offer the details step so they can carry on.
    if (!c.known && !c.byVisitor && !c.quiet && Date.now() > c.deadline - 15000 && !gate) showGate();
    if (after) setTimeout(after, 150);
  }
  /* A page action during a call waits until Harvey has finished his line: he must have been quiet for a moment, not just
     paused between sentences. Then the call ends and the action runs. A move to another page carries the call on there. */
  var SETTLE_MS = 1200;
  function callAction(a) {
    if (!call || !a || a.type === 'report') return;
    var c = call;
    if (a.type === 'go_to' && a.path === location.pathname) { run([a]); return; } // already here: just scroll, keep talking
    c.pending = a;
    var go = function () {
      if (c.pending !== a || call !== c) return;
      c.pending = null; clearTimeout(c.settle); clearTimeout(c.hardStop);
      if (a.type === 'go_to') { write(sessionStorage, KEYS.resume, String(Date.now())); write(sessionStorage, 'toto:calllines', JSON.stringify(c.lines || [])); }
      c.quiet = true;
      endCall(function () { run([a]); });
    };
    c.settleNow = function () { clearTimeout(c.settle); c.settle = setTimeout(go, SETTLE_MS); };
    c.settleNow(); // if he is already quiet, this fires; speaking again restarts it
    c.hardStop = setTimeout(go, 12000);
  }
  function startCall(resume) {
    if (call || busy) return;
    if (!resume) unlockAudio();
    stopSpeaking();
    history = history.filter(function (m) { return !m.error; }); render();
    var c = call = { conv: null, ticket: null, known: false, deadline: 0, timer: null, pending: null, byVisitor: false };
    callUI(true); setState('thinking'); ear.querySelector('.t').textContent = 'Connecting…';
    syncBar(); bar.querySelector('.cb-t').textContent = resume ? 'Reconnecting to ' + NAME + '…' : 'On a call with ' + NAME;
    var fail = function (msg, gateToo) { if (call === c) { call = null; callUI(false); setState('idle'); } if (msg) note(msg); if (gateToo) showGate(); };
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (s) { s.getTracks().forEach(function (t) { t.stop(); }); })
      .then(function () {
        return fetch('/api/voice/call', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: session, page: location.pathname }) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); });
      }, function () { throw { mic: true }; })
      .then(function (j) {
        if (call !== c) return;
        if (j.status === 503) { call = null; callUI(false); setState('idle'); return startRecording(); } // calls are off: the older voice still works
        if (!j.ok) return fail(j.error || 'I could not start a call just now. You can type instead.', !!j.gate);
        c.ticket = j.ticket; c.known = !!j.known; c.deadline = Date.now() + j.seconds * 1000;
        var hadChat = history.some(function (m) { return m.role === 'user'; });
        c.resume = !!resume;
        if (resume) { try { c.lines = JSON.parse(read(sessionStorage, 'toto:calllines') || '[]'); } catch (e) {} remove(sessionStorage, 'toto:calllines'); }
        c.greeting = resume ? '' : hadChat ? 'I’m listening. Go ahead.' : GREETING_SPOKEN;
        return import(CALL_SRC).then(function (lib) {
          if (call !== c) return;
          return lib.Conversation.startSession({
            conversationToken: j.token,
            connectionType: 'webrtc',
            dynamicVariables: { ticket: j.ticket, before: earlierTurns(), greeting: c.greeting },
            clientTools: { site_action: function (p) { var a = null; try { a = JSON.parse(p.action); } catch (e) {} callAction(a); } },
            onConnect: function () {
              if (call !== c) return;
              // Arriving on a new page mid-call: Harvey opens by saying where they are, then carries on.
              if (c.resume) setTimeout(function () { if (call === c && c.conv) try { c.conv.sendUserMessage('[arrived]'); } catch (e) {} }, 250);
              setState('listening'); ear.querySelector('.t').textContent = 'On a call · listening';
              bar.querySelector('.cb-t').textContent = 'On a call with ' + NAME; syncBar();
              c.timer = setInterval(function () {
                if (call !== c || !c.conv) return;
                // Backstop: Harvey ends the call himself when its time is up, at the next turn; this ends it if nobody speaks.
                if (Date.now() > c.deadline + 8000) return endCall();
                var v = c.conv.getInputVolume ? c.conv.getInputVolume() : 0;
                bar.querySelector('.cb-dot').style.transform = 'scale(' + (1 + Math.min(1, (c.muted ? 0 : v) * 4) * .7).toFixed(2) + ')';
                bars.forEach(function (b, i) { b.style.transform = 'scaleY(' + (0.25 + Math.min(1, v * 3 * (0.6 + 0.4 * Math.sin(i * 1.9 + Date.now() / 140) + 0.4)) * 0.75).toFixed(2) + ')'; });
              }, 80);
            },
            onModeChange: function (m) {
              if (call !== c) return;
              var speaking = m && m.mode === 'speaking';
              setState(speaking ? 'speaking' : 'listening'); hush.hidden = true;
              launch.classList.toggle('speaking', speaking);
              ear.querySelector('.t').textContent = speaking ? 'On a call · talk to cut in' : 'On a call · listening';
              if (c.pending) { if (speaking) clearTimeout(c.settle); else c.settleNow(); }
              syncBar();
            },
            onMessage: function (m) {
              if (call !== c || !m || !m.message) return;
              // The spoken hello repeats what is already on screen, so it is not added again.
              if (!c.greeted && m.source !== 'user') { c.greeted = true; if (m.message.trim() === c.greeting) return; }
              callLine(m.source === 'user' ? 'user' : 'assistant', m.message);
            },
            onDisconnect: function () { if (call === c) endCall(); },
            onError: function (e) { try { console.error('call', e); } catch (x) {} }
          }).then(function (conv) { if (call === c) c.conv = conv; else { try { conv.endSession(); } catch (e) {} } });
        });
      })
      .catch(function (e) {
        if (resume) { fail('Tap the microphone to carry on our call.'); open(); return; }
        if (e && e.mic) return fail('I need microphone access for a call. You can type instead.');
        fail('The call could not connect. Please try again, or type.');
      });
  }
  function hangUpCall() { if (call) { call.byVisitor = true; endCall(); } }
  // Nobody pays for a call left running in a hidden tab or on a locked phone.
  document.addEventListener('visibilitychange', function () { if (document.hidden && call) endCall(); });
  window.addEventListener('pagehide', function () { if (call) endCall(); });

  /* ---------- phases: closed (launcher only) · open · ended (summary in place) ---------- */
  function isOpen() { return root.getAttribute('data-phase') === 'open'; }
  function track(name, params) { if (window.BBTrack) window.BBTrack(name, params); }
  function summaryText() {
    var q = history.filter(function (m) { return m.role === 'user'; }).length;
    if (!q) return 'You did not ask anything this time. ' + NAME + ' is here whenever you need him.';
    var t = topics.map(function (k) { return TOPIC_LABELS[k]; }), list = t.length > 1 ? t.slice(0, -1).join(', ') + ' and ' + t[t.length - 1] : t[0];
    return 'You asked ' + q + (q === 1 ? ' question' : ' questions') + (t.length ? ', about ' + list : '') + '. Ben gets a short summary, so you won’t need to repeat yourself.';
  }
  function setPhase(p, skipTrack) {
    root.setAttribute('data-phase', p);
    var h = history.length > 1;
    launch.querySelector('.hv-bd').textContent = h ? String(history.length - 1) : '';
    launch.setAttribute('aria-label', p === 'closed' && h ? 'Resume the conversation with ' + NAME : 'Chat with ' + NAME);
    if (p === 'ended') { endSummary.textContent = summaryText(); write(sessionStorage, KEYS.ended, '1'); }
    if (p !== 'open') { hideRing(); hideMoveToast(); }
    if (!skipTrack && p === 'open') track('toto_open');
  }
  function open() {
    bar.hidden = true;
    document.documentElement.classList.add('bba-open');
    panel.classList.add('on');
    setPhase('open');
    write(localStorage, KEYS.seen, '1');
    render();
    setTimeout(function () { input.focus({ preventScroll: true }); }, 400);
  }
  function close() {
    if (call) { minimize(); return; } // the call carries on in the small bar
    stopRecording(true);
    stopSpeaking();
    panel.classList.remove('on');
    document.documentElement.classList.remove('bba-open');
    setPhase('closed');
  }
  panel.querySelector('.bba-x').addEventListener('click', function () {
    // The × no longer wipes the conversation: it shows a short summary in place, with a way back in.
    stopRecording(true); stopSpeaking();
    setPhase('ended');
  });
  panel.querySelector('.hv-end .done').addEventListener('click', function () { close(); });
  panel.querySelector('.hv-end .keep').addEventListener('click', function () { setPhase('open'); });
  launch.addEventListener('click', function () { if (isOpen()) close(); else open(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-agent-open]');
    if (a) { e.preventDefault(); open(); }
  });

  function mount() {
    root.appendChild(launch);
    root.appendChild(panel);
    root.appendChild(ring);
    root.appendChild(toast);
    document.body.appendChild(root);
    document.head.appendChild(barStyle);
    document.body.appendChild(bar);
    bar.querySelector('.cb-open').addEventListener('click', function () { open(); });
    bar.querySelector('.cb-end').addEventListener('click', function () { hangUpCall(); });
    bar.querySelector('.cb-mute').addEventListener('click', function () { setMuted(!(call && call.muted)); });
    if (read(localStorage, KEYS.seen)) launch.classList.add('seen');
    setPhase('closed', true);
    var section = read(sessionStorage, 'toto:section'); remove(sessionStorage, 'toto:section');
    if (location.hash && read(sessionStorage, KEYS.reopen)) setTimeout(function () { moveToSection(section || location.hash.slice(1), true); }, 600);
    if (read(sessionStorage, KEYS.reopen)) { remove(sessionStorage, KEYS.reopen); open(); }
    // A call that moved the visitor here picks up again by itself, if it moved them within the last half minute.
    var resumeAt = Number(read(sessionStorage, KEYS.resume) || 0);
    remove(sessionStorage, KEYS.resume);
    if (resumeAt && Date.now() - resumeAt < 30000 && voice && voice.supported) {
      // The call carries on in the small bar, so the new page is in full view.
      if (isOpen()) minimize();
      setTimeout(function () { startCall(true); }, 300);
    }
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  window.BBAgentDesk = { open: open, close: close, ask: function (text) { open(); ask(text); } };
})();
