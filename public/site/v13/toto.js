/* Toto, the site assistant.
   A chat panel that talks to /api/chat. The server holds the model, the facts and the limits; this
   script shows the conversation and carries out the actions the server returns (move to a page,
   open the request form, open the coffee booking). Voice: a spoken message is recorded in the browser,
   turned into text by /api/voice/listen, and the reply to a spoken message is read aloud by /api/voice/speak.
   API kept from the design: window.BBAgentDesk.open() / close() / ask(text), and any element with
   [data-agent-open] opens the panel. */
(function () {
  'use strict';
  if (window.BBAgentDesk) return;

  var NAME = 'Toto';
  var GREETING = "Hi, I'm Toto, Ben's AI assistant. I can answer questions about the work, the method and pricing, show you around, or open a request for Ben. What are you working on?";
  var STARTERS = ['What does Ben do?', 'Which way of working fits me?', 'Show me the work', 'I would like to talk to Ben'];
  var HOME_SECTIONS = { work: 'work', method: 'services', pricing: 'pricing', testimonials: 'testimonials' };
  var KEYS = { history: 'toto:chat', session: 'toto:sid', seen: 'toto:seen', known: 'toto:known', reopen: 'toto:reopen' };
  var MAX_STORED = 40;

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
  var session = read(localStorage, KEYS.session);
  if (!session) { session = uuid(); write(localStorage, KEYS.session, session); }

  var history = [];
  try { history = JSON.parse(read(localStorage, KEYS.history) || '[]'); } catch (e) {}
  if (!Array.isArray(history) || !history.length) history = [{ role: 'assistant', text: GREETING }];
  function save() { write(localStorage, KEYS.history, JSON.stringify(history.slice(-MAX_STORED))); }

  /* ---------- markup ---------- */
  function el(tag, cls, html) { var n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; }
  var MARK = '<svg class="mark" viewBox="0 0 64 64" aria-hidden="true"><path d="M19 13V38" stroke="currentColor" stroke-width="10" stroke-linecap="round" fill="none"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';

  var launch = el('button', 'bba-launch', MARK + '<span class="x" aria-hidden="true">×</span><span class="ping"></span>');
  launch.type = 'button';
  launch.setAttribute('aria-label', 'Chat with ' + NAME);
  launch.setAttribute('aria-expanded', 'false');

  var panel = el('aside', 'bba',
    '<div class="bba-head"><span class="av" aria-hidden="true">T<span class="sq"></span></span>' +
    '<div><b>' + NAME + '</b><span class="s">Ben’s AI assistant</span></div>' +
    '<button type="button" class="clr">Clear</button>' +
    '<button type="button" class="bba-x" aria-label="Close chat"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"></path></svg></button></div>' +
    '<div class="bba-log" role="log" aria-live="polite"></div>' +
    '<div class="bba-starters"></div>' +
    '<form class="bba-comp"><textarea rows="1" maxlength="1200" placeholder="Ask anything…" aria-label="Message"></textarea>' +
    '<button type="button" class="mic" aria-label="Speak your message" aria-pressed="false"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path></svg></button>' +
    '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></button></form>' +
    '<div class="bba-foot"><span>' + NAME + ' is AI · hands over to Ben</span><button type="button" class="form">Request form ↗</button></div>');
  panel.setAttribute('aria-label', 'Chat with ' + NAME);

  var log = panel.querySelector('.bba-log');
  var input = panel.querySelector('textarea');
  var form = panel.querySelector('.bba-comp');
  var starters = panel.querySelector('.bba-starters');
  var mic = panel.querySelector('.mic');
  STARTERS.forEach(function (text) {
    var b = el('button'); b.type = 'button'; b.textContent = text;
    b.addEventListener('click', function () { ask(text); });
    starters.appendChild(b);
  });

  function render() {
    log.textContent = '';
    history.forEach(function (m) {
      var n = el('div', 'bba-msg' + (m.role === 'user' ? ' u' : '') + (m.error ? ' err' : ''));
      n.textContent = m.text; // text only: nothing from the server or the visitor is treated as HTML
      log.appendChild(n);
    });
    starters.style.display = history.some(function (m) { return m.role === 'user'; }) ? 'none' : '';
    if (gate) log.appendChild(gate);
    log.scrollTop = log.scrollHeight;
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
  function goTo(path, section) {
    var id = section && HOME_SECTIONS[section];
    if (path === location.pathname) {
      var target = id && document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
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

  /* ---------- sending ---------- */
  var busy = false;
  function ask(text, spoken) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
    stopSpeaking();
    history = history.filter(function (m) { return !m.error; });
    history.push({ role: 'user', text: text });
    save(); render();
    input.value = ''; input.style.height = '';
    var typing = el('div', 'bba-typing', '<i></i><i></i><i></i>');
    log.appendChild(typing); log.scrollTop = log.scrollHeight;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session: session,
        page: location.pathname,
        known: read(localStorage, KEYS.known) || '',
        // Lines this script wrote itself (limit notices, the thank-you after the details step) are not sent back.
        messages: history.filter(function (m) { return !m.local && !m.error; }).map(function (m) { return { role: m.role, text: m.text }; })
      })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); })
      .then(function (j) {
        if (!j.reply) throw new Error(j.error || 'no reply');
        if (j.known) write(localStorage, KEYS.known, '1');
        history.push({ role: 'assistant', text: j.reply, local: !!j.limited });
        save(); render();
        if (j.gate) { showGate(); return; }
        // A spoken question gets a spoken answer; any move to another page waits until he has finished.
        if (spoken && !j.limited) speak(function () { run(j.actions); });
        else run(j.actions);
      })
      .catch(function (e) {
        var msg = e && e.message && e.message !== 'no reply' && e.message.length < 200 ? e.message : 'I could not answer that just now. Please try again, or use the request form.';
        history.push({ role: 'assistant', text: msg, error: true });
        render();
      })
      .then(function () { busy = false; });
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); ask(input.value); });
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(input.value); } });
  input.addEventListener('input', function () { input.style.height = ''; input.style.height = Math.min(120, input.scrollHeight) + 'px'; });
  panel.querySelector('.clr').addEventListener('click', function () {
    history = [{ role: 'assistant', text: GREETING }];
    session = uuid(); write(localStorage, KEYS.session, session);
    remove(localStorage, KEYS.known); gate = null; stopSpeaking();
    save(); render();
  });
  panel.querySelector('.form').addEventListener('click', function () { openRequest(); });
  panel.querySelector('.bba-x').addEventListener('click', function () { close(); });

  /* ---------- the ask-once details step ---------- */
  var gate = null;
  function showGate() {
    if (gate) { render(); return; }
    gate = el('form', 'bba-gate',
      '<input type="text" name="name" placeholder="Your name" autocomplete="name" aria-label="Your name" required maxlength="120">' +
      '<input type="email" name="email" placeholder="you@company.com" autocomplete="email" aria-label="Your email" required maxlength="200">' +
      '<button type="submit">Carry on</button>' +
      '<small>Used so Ben can follow up. See the <a href="/privacy">privacy page</a>.</small><span class="bba-gate-err" aria-live="polite"></span>');
    gate.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = gate.querySelector('button'), err = gate.querySelector('.bba-gate-err');
      var name = gate.elements.name.value.trim(), email = gate.elements.email.value.trim();
      btn.disabled = true; err.textContent = '';
      fetch('/api/visitor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: session, name: name, email: email }) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.ok = r.ok && j.ok !== false; return j; }); })
        .then(function (j) {
          if (!j.ok) { btn.disabled = false; err.textContent = j.error || 'That did not save. Please try again.'; return; }
          write(localStorage, KEYS.known, '1');
          gate = null;
          // Pick the conversation up where it stopped: drop the notice and re-ask the question that met the gate.
          history = history.filter(function (m) { return !m.error && !m.local; });
          var last = history[history.length - 1], pending = last && last.role === 'user' ? history.pop().text : '';
          history.push({ role: 'assistant', text: 'Thanks, ' + name.split(' ')[0] + '.', local: true });
          save(); render();
          if (pending) ask(pending); else input.focus({ preventScroll: true });
        })
        .catch(function () { btn.disabled = false; err.textContent = 'That did not save. Please try again.'; });
    });
    render();
  }

  /* ---------- voice ---------- */
  var canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);
  var MAX_CLIP_MS = 45000;
  var SILENCE = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
  var recorder = null, chunks = [], startedAt = 0, clipTimer = null, player = null, afterSpeech = null;
  if (!canRecord) mic.hidden = true;

  function clipType() {
    var types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'];
    for (var i = 0; i < types.length; i++) if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(types[i])) return types[i];
    return '';
  }
  function unlockAudio() {
    // Phones only let a page play sound that started from a tap, so the player is started here, silently.
    if (!player) { player = new Audio(); player.addEventListener('ended', speechDone); player.addEventListener('error', speechDone); }
    try { player.src = SILENCE; var p = player.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }
  function speechDone() { var next = afterSpeech; afterSpeech = null; launch.classList.remove('speaking'); if (next) next(); }
  function stopSpeaking() { if (player && !player.paused) { try { player.pause(); } catch (e) {} } speechDone(); }
  function speak(then) {
    afterSpeech = then || null;
    var done = false, finish = function () { if (!done) { done = true; speechDone(); } };
    fetch('/api/voice/speak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ session: session }) })
      .then(function (r) { return r.ok ? r.blob() : null; })
      .then(function (blob) {
        if (!blob || !player) return finish();
        player.src = URL.createObjectURL(blob);
        launch.classList.add('speaking');
        var p = player.play();
        if (p && p.catch) p.catch(finish);
        setTimeout(finish, 60000); // never hold a page move for longer than a minute
      })
      .catch(finish);
  }

  function startRecording() {
    unlockAudio(); stopSpeaking();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var type = clipType();
      recorder = type ? new MediaRecorder(stream, { mimeType: type }) : new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      recorder.onstop = function () { stream.getTracks().forEach(function (t) { t.stop(); }); sendClip(); };
      recorder.start();
      startedAt = Date.now();
      mic.classList.add('rec'); mic.setAttribute('aria-pressed', 'true'); mic.setAttribute('aria-label', 'Stop and send');
      input.placeholder = 'Listening… tap the mic to send';
      clipTimer = setTimeout(stopRecording, MAX_CLIP_MS);
    }).catch(function () { note('I need microphone access to listen. You can type instead.'); });
  }
  function stopRecording() {
    clearTimeout(clipTimer);
    mic.classList.remove('rec'); mic.setAttribute('aria-pressed', 'false'); mic.setAttribute('aria-label', 'Speak your message');
    input.placeholder = 'Ask anything…';
    if (recorder && recorder.state !== 'inactive') recorder.stop();
  }
  function sendClip() {
    var seconds = (Date.now() - startedAt) / 1000;
    var type = ((recorder && recorder.mimeType) || 'audio/webm').split(';')[0];
    recorder = null;
    if (seconds < 0.6 || !chunks.length || busy) return;
    busy = true;
    var typing = el('div', 'bba-typing', '<i></i><i></i><i></i>');
    log.appendChild(typing); log.scrollTop = log.scrollHeight;
    fetch('/api/voice/listen', {
      method: 'POST',
      headers: { 'Content-Type': type, 'x-toto-session': session, 'x-toto-seconds': seconds.toFixed(1) },
      body: new Blob(chunks, { type: type })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (j) {
        busy = false;
        if (j.text) return ask(j.text, true);
        history = history.filter(function (m) { return !m.error; });
        note(j.error || 'I did not catch that. Try again, or type it.');
        if (j.gate) showGate();
      })
      .catch(function () { busy = false; note('I could not hear that just now. Please type it instead.'); });
  }
  mic.addEventListener('click', function () { if (recorder) stopRecording(); else if (!busy) startRecording(); });

  /* ---------- open / close ---------- */
  function isOpen() { return panel.classList.contains('on'); }
  function open() {
    panel.classList.add('on');
    document.documentElement.classList.add('bba-open');
    launch.classList.add('on', 'seen');
    launch.setAttribute('aria-label', 'Close chat');
    launch.setAttribute('aria-expanded', 'true');
    write(localStorage, KEYS.seen, '1');
    render();
    setTimeout(function () { input.focus({ preventScroll: true }); }, 400);
  }
  function close() {
    if (recorder) stopRecording();
    stopSpeaking();
    panel.classList.remove('on');
    document.documentElement.classList.remove('bba-open');
    launch.classList.remove('on');
    launch.setAttribute('aria-label', 'Chat with ' + NAME);
    launch.setAttribute('aria-expanded', 'false');
  }
  launch.addEventListener('click', function () { if (isOpen()) close(); else open(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-agent-open]');
    if (a) { e.preventDefault(); open(); }
  });

  function mount() {
    document.body.appendChild(launch);
    document.body.appendChild(panel);
    if (read(localStorage, KEYS.seen)) launch.classList.add('seen');
    render();
    if (read(sessionStorage, KEYS.reopen)) { remove(sessionStorage, KEYS.reopen); open(); }
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  window.BBAgentDesk = { open: open, close: close, ask: function (text) { open(); ask(text); } };
})();
