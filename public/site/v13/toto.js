/* Toto, the site assistant.
   A chat panel that talks to /api/chat. The server holds the model, the facts and the limits; this
   script shows the conversation and carries out the actions the server returns (move to a page,
   open the request form, open the coffee booking).
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
    '<button type="submit" aria-label="Send"><svg viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></button></form>' +
    '<div class="bba-foot"><span>' + NAME + ' is AI · hands over to Ben</span><button type="button" class="form">Request form ↗</button></div>');
  panel.setAttribute('aria-label', 'Chat with ' + NAME);

  var log = panel.querySelector('.bba-log');
  var input = panel.querySelector('textarea');
  var form = panel.querySelector('.bba-comp');
  var starters = panel.querySelector('.bba-starters');
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
    log.scrollTop = log.scrollHeight;
  }

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
  function ask(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    busy = true;
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
        messages: history.map(function (m) { return { role: m.role, text: m.text }; })
      })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); })
      .then(function (j) {
        if (!j.reply) throw new Error(j.error || 'no reply');
        if (j.known) write(localStorage, KEYS.known, '1');
        history.push({ role: 'assistant', text: j.reply });
        save(); render();
        run(j.actions);
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
    save(); render();
  });
  panel.querySelector('.form').addEventListener('click', function () { openRequest(); });
  panel.querySelector('.bba-x').addEventListener('click', function () { close(); });

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
