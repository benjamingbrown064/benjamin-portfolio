/* Benjamin Brown · Discovery questionnaire. One question per screen, two journeys, type or talk.
   API: window.BBDiscovery.endpoint = 'https://…' (POST JSON, 2xx = sent). Without it, sending composes an email. */
(function () {
  var D = window.BBDiscoveryData,
    root = document.getElementById("dq");
  if (!D || !root) return;
  var KEY = "bb-discovery-v1",
    EMAIL = "hello@benjaminbrown.co",
    RANK = { open: 0, partly: 1, solid: 2 };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var I = {
    mic: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"></path></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>',
  };
  var area = function (n) {
    return D.areas.filter(function (a) {
      return a.n === n;
    })[0];
  };
  var S = load() || { j: null, i: 0, a: {}, notes: {}, c: {} };
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(S));
    } catch (e) {}
  }
  var stage = root.querySelector(".dq-stage"),
    prog = root.querySelector(".dq-prog"),
    back = root.querySelector("[data-dq-back]"),
    count = root.querySelector(".dq-count"),
    list = [],
    busy = false;

  function build() {
    list = [{ k: "intro" }, { k: "fork" }];
    if (!S.j) {
      return;
    }
    var J = D.journeys[S.j];
    J.steps.forEach(function (st) {
      var vis = [];
      st.qs.forEach(function (q, qi) {
        if (q.unless) {
          var v = S.a[S.j + st.n + "-" + q.unless[0]];
          if (v === q.unless[1]) return;
        }
        vis.push({ q: q, qi: qi });
      });
      vis.forEach(function (x, k) {
        list.push({
          k: "q",
          st: st,
          q: x.q,
          id: S.j + st.n + "-" + x.qi,
          of: [k + 1, vis.length],
          note: k === vis.length - 1 && x.q.t !== "text",
        });
      });
    });
    list.push({ k: "result" }, { k: "contact" }, { k: "done" });
  }

  /* progress: 11 segments in stage groups */
  function drawProg() {
    var groups = [["01", "02"], ["03", "04", "05"], ["06", "07", "08", "09"], ["10"], ["11"]];
    prog.innerHTML = groups
      .map(function (g) {
        return (
          '<span class="dq-pg">' +
          g
            .map(function (n) {
              return '<i data-n="' + n + '"><b></b></i>';
            })
            .join("") +
          "</span>"
        );
      })
      .join("");
  }
  function updProg() {
    var s = list[S.i] || {},
      cur = s.k === "q" ? s.st.n : null,
      past = s.k === "result" || s.k === "contact" || s.k === "done";
    [].forEach.call(prog.querySelectorAll("i"), function (el) {
      var n = el.dataset.n,
        f = 0;
      if (past) f = 1;
      else if (cur) {
        if (n < cur) f = 1;
        else if (n === cur) f = (s.of[0] - 0.5) / s.of[1];
      }
      el.querySelector("b").style.width = f * 100 + "%";
      el.classList.toggle("cur", n === cur);
    });
    root.classList.toggle("dq-has-prog", !!cur || past);
    count.textContent = cur ? "Step " + cur + " of 11" : s.k === "result" ? "Your first read" : s.k === "contact" ? "Send" : "";
    back.hidden = S.i === 0 || s.k === "done";
  }

  /* ---------- screens ---------- */
  function opts(scr, multi) {
    var v = S.a[scr.id];
    return (
      '<div class="dq-opts" role="' +
      (multi ? "group" : "radiogroup") +
      '" aria-label="' +
      esc(scr.q.q) +
      '">' +
      scr.q.o
        .map(function (o, k) {
          var on = multi ? (v || []).indexOf(o[0]) > -1 : v === o[0];
          return (
            '<button type="button" class="dq-o' +
            (on ? " on" : "") +
            '" role="' +
            (multi ? "checkbox" : "radio") +
            '" aria-checked="' +
            on +
            '" data-v="' +
            esc(o[0]) +
            '"><kbd>' +
            String.fromCharCode(65 + k) +
            "</kbd><span>" +
            esc(o[0]) +
            '</span><i class="dq-ck">' +
            I.check +
            "</i></button>"
          );
        })
        .join("") +
      "</div>"
    );
  }
  function field(val, ph, cls) {
    return (
      '<div class="dq-ta ' +
      (cls || "") +
      '"><textarea rows="1" placeholder="' +
      esc(ph) +
      '">' +
      esc(val || "") +
      '</textarea><div class="dq-ta-f"><button type="button" class="dq-mic" aria-pressed="false">' +
      I.mic +
      '<span class="l">Talk instead</span><span class="dq-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></button><span class="dq-ta-h">' +
      (SR ? "Speak naturally. It types as you talk." : "Voice needs Chrome, Edge or Safari.") +
      "</span></div></div>"
    );
  }
  function act(lbl, hint) {
    return (
      '<div class="dq-act"><button type="button" class="btn dq-next">' +
      lbl +
      ' <span class="arr">→</span></button>' +
      (hint ? '<span class="dq-kh">' + hint + "</span>" : "") +
      '<p class="dq-err" role="alert"></p></div>'
    );
  }
  function html(s) {
    if (s.k === "intro") {
      var resume = S.j && S.last > 1 && list[S.last] && list[S.last].k !== "done";
      return (
        '<div class="dq-in dq-intro"><span class="dq-k"><b>Discovery</b><span>Eleven steps · About five minutes</span></span><h1 class="dq-h">Ten areas. A few minutes. No wrong answers.</h1><p class="dq-lede">Most people don\'t know exactly what they need. That\'s what this is for.</p>' +
        '<ol class="dq-route">' +
        ["Direction", "Foundations", "Customer", "Build", "Where to start"]
          .map(function (t, k) {
            return "<li><span>" + (k < 4 ? "0" + (k + 1) : "→") + "</span>" + t + "</li>";
          })
          .join("") +
        "</ol>" +
        '<p class="dq-talk"><i>' +
        I.mic +
        "</i><span><b>Type or talk.</b> Every step has room for more. Press the mic and say it. Your words go straight into the field.</span></p>" +
        '<div class="dq-act">' +
        (resume
          ? '<button type="button" class="btn dq-next" data-resume>Pick up where you left off <span class="arr">→</span></button><button type="button" class="btn ghost" data-restart>Start again</button>'
          : '<button type="button" class="btn dq-next">Start <span class="arr">→</span></button><span class="dq-kh">press Enter ↵</span>') +
        "</div></div>"
      );
    }
    if (s.k === "fork") {
      return (
        '<div class="dq-in"><span class="dq-k"><b>00</b><span>Before we start</span></span><h1 class="dq-q">What are we looking at?</h1><div class="dq-opts dq-fork" role="radiogroup">' +
        [
          ["A", "Something new", "An idea, a new product or a new arm of a business."],
          ["B", "A business that's already running", "Something with customers, people and systems today."],
        ]
          .map(function (o) {
            var on = S.j === o[0];
            return (
              '<button type="button" class="dq-o dq-o-l' +
              (on ? " on" : "") +
              '" role="radio" aria-checked="' +
              on +
              '" data-j="' +
              o[0] +
              '"><kbd>' +
              o[0] +
              "</kbd><span><b>" +
              esc(o[1]) +
              "</b><small>" +
              esc(o[2]) +
              '</small></span><i class="dq-ck">' +
              I.check +
              "</i></button>"
            );
          })
          .join("") +
        "</div></div>"
      );
    }
    if (s.k === "q") {
      var a = area(s.st.n),
        q = s.q,
        top =
          '<span class="dq-k"><b>' +
          s.st.n +
          "</b><span>" +
          esc(a.stage) +
          " · " +
          esc(a.name) +
          "</span>" +
          (s.of[1] > 1 ? '<span class="dq-of">' + s.of[0] + " of " + s.of[1] + "</span>" : "") +
          '</span><h1 class="dq-q">' +
          esc(q.q) +
          "</h1>",
        body = "";
      if (q.t === "text")
        body =
          field(S.a[s.id], q.req ? "Type your answer, or press Talk instead" : "Optional. Type, or press Talk instead", "big") +
          act("OK", "⌘ + Enter ↵");
      else {
        body = (q.t === "multi" ? '<p class="dq-hint">Pick any that apply.</p>' : "") + opts(s, q.t === "multi");
        if (s.note) {
          var nv = S.notes[s.st.n] || "";
          body +=
            '<div class="dq-note' +
            (nv ? " open" : "") +
            '"><button type="button" class="dq-note-t" aria-expanded="' +
            !!nv +
            '"><i>' +
            I.plus +
            "</i>Anything to add?<span>Type or talk</span></button>" +
            field(nv, "Context, numbers, what you have tried. Say as much as you like.") +
            "</div>";
        }
        body += act("OK", "press Enter ↵");
      }
      return '<div class="dq-in">' + top + body + "</div>";
    }
    if (s.k === "result") return resultHtml();
    if (s.k === "contact") {
      var c = S.c || {};
      return (
        '<div class="dq-in"><span class="dq-k"><b>→</b><span>Last step</span></span><h1 class="dq-q">Let\'s talk.</h1><div class="dq-form">' +
        inp("name", "Name", c.name, "text", "name", 1) +
        inp("email", "Email", c.email, "email", "email", 1) +
        inp("company", "Company", c.company, "text", "organization", 0) +
        '</div><p class="dq-priv">Your answers and details are only used to reply to you. <a href="#">Privacy policy</a></p>' +
        act("Send my answers", "") +
        '<p class="dq-line">Every request gets a reference, and a reply within one working day.</p></div>'
      );
    }
    if (s.k === "done") {
      var first = ((S.c || {}).name || "").split(" ")[0];
      return (
        '<div class="dq-in dq-done"><span class="dq-k"><b>✓</b><span>Reference ' +
        esc(S.ref || "") +
        '</span></span><h1 class="dq-h">' +
        (first ? "Thank you, " + esc(first) + "." : "Thank you.") +
        '</h1><p class="dq-lede">' +
        (S.sentBy === "post"
          ? "Your answers have landed with me. A reply within one working day, from a person."
          : "Your email app has opened with everything filled in. Press send and it lands with me. A reply within one working day, from a person.") +
        '</p><div class="dq-act"><a class="btn" href="/">Back to the site</a><button type="button" class="btn ghost" data-copy>Copy my answers</button><button type="button" class="dq-lnk" data-restart>Start a new one</button></div></div>'
      );
    }
  }
  function inp(n, l, v, t, ac, req) {
    return (
      '<label class="dq-f"><span>' +
      l +
      (req ? "" : " <em>Optional</em>") +
      '</span><input name="' +
      n +
      '" type="' +
      t +
      '" autocomplete="' +
      ac +
      '" value="' +
      esc(v || "") +
      '"' +
      (req ? " required" : "") +
      "></label>"
    );
  }

  /* ---------- result ---------- */
  function signals() {
    var out = {};
    if (!S.j) return out;
    D.journeys[S.j].steps.forEach(function (st) {
      if (st.n === "11") return;
      var w = null;
      list.forEach(function (s) {
        if (s.k !== "q" || s.st.n !== st.n) return;
        var v = S.a[s.id];
        if (v == null || !s.q.o) return;
        /* typed answers have no options to score */ (Array.isArray(v) ? v : [v]).forEach(function (x) {
          var o = s.q.o.filter(function (o) {
            return o[0] === x;
          })[0];
          if (o && o[1] && (w === null || RANK[o[1]] < RANK[w])) w = o[1];
        });
      });
      out[st.n] = w || "solid";
    });
    return out;
  }
  function resultHtml() {
    var sg = signals(),
      ns = Object.keys(sg).sort(),
      open = ns.filter(function (n) {
        return sg[n] === "open";
      }),
      part = ns.filter(function (n) {
        return sg[n] === "partly";
      }),
      pick = open.length ? open : part,
      lead = "";
    if (!open.length && part.length) lead = '<p class="dq-lede">Nothing is broken. Here\'s where the gains are.</p>';
    if (!open.length && !part.length) lead = '<p class="dq-lede">Every answer came back solid. A conversation finds the next gain.</p>';
    var map =
      '<div class="dq-map" aria-label="All ten areas">' +
      ns
        .map(function (n) {
          var a = area(n);
          return '<div class="dq-cell s-' + sg[n] + '"><b>' + n + "</b><span>" + esc(a.name) + "</span></div>";
        })
        .join("") +
      '</div><div class="dq-leg"><span class="s-solid"><i></i>Solid</span><span class="s-partly"><i></i>Partly</span><span class="s-open"><i></i>Open</span></div>';
    var rows = pick
      .slice(0, 3)
      .map(function (n) {
        var a = area(n);
        return (
          '<li><span class="n">' +
          n +
          '</span><div><span class="nm">' +
          esc(a.name) +
          '</span><p class="q">' +
          esc(a.q) +
          '</p><p class="sk">' +
          a.skills.map(esc).join(" · ") +
          "</p></div></li>"
        );
      })
      .join("");
    var more = pick.length > 3 ? '<p class="dq-more">And ' + (pick.length - 3) + " more worth a look.</p>" : "";
    return (
      '<div class="dq-in dq-wide"><span class="dq-k"><b>→</b><span>Your first read</span></span><h1 class="dq-q">Here\'s where I\'d look first.</h1>' +
      lead +
      map +
      (rows ? '<ol class="dq-res">' + rows + "</ol>" : "") +
      more +
      '<p class="dq-line">This is a first read, not a diagnosis. Ten answers show where to look. A conversation shows what\'s there.</p>' +
      act("Send my answers", "") +
      "</div>"
    );
  }

  /* ---------- render + transitions ---------- */
  function render(dir) {
    build();
    if (S.i >= list.length) S.i = list.length - 1;
    var s = list[S.i],
      el = document.createElement("section");
    el.className = "dq-scr" + (dir ? (dir > 0 ? " in-f" : " in-b") : "");
    el.innerHTML = html(s);
    var old = stage.querySelector(".dq-scr:not(.out)");
    stopRec();
    var show = function () {
      stage.appendChild(el);
      stage.scrollTop = 0;
      wire(el, s);
      if (s.k !== "intro") S.last = S.i;
      updProg();
      save();
      setTimeout(
        function () {
          var f = el.querySelector(".dq-ta.big textarea, .dq-o.on, input, .dq-next");
          if (f && matchMedia("(hover:hover)").matches) f.focus({ preventScroll: true });
        },
        dir ? 420 : 60,
      );
    };
    if (old && dir && !RM()) {
      old.classList.add("out", dir < 0 ? "out-b" : "out-f");
      setTimeout(function () {
        old.remove();
        show();
      }, 230);
    } else {
      if (old) old.remove();
      show();
    }
  }
  function RM() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function go(d) {
    if (busy) return;
    /* the list of screens depends on the answers so far (the first choice adds the questions), so it is rebuilt before checking there is a next screen */ build();
    var n = S.i + d;
    if (n < 0 || n >= list.length) return;
    busy = true;
    S.i = n;
    render(d);
    setTimeout(function () {
      busy = false;
    }, 560);
  }
  function err(el, m) {
    var e = el.querySelector(".dq-err");
    if (e) {
      e.textContent = m;
      e.classList.remove("shake");
      void e.offsetWidth;
      e.classList.add("shake");
    }
  }
  function next(el, s) {
    if (s.k === "intro") {
      go(1);
      return;
    }
    if (s.k === "fork") {
      if (!S.j) {
        err(el, "Pick one to carry on.");
        return;
      }
      go(1);
      return;
    }
    if (s.k === "q") {
      var v = S.a[s.id];
      if (s.q.t === "single" && !v) {
        err(el, "Pick one to carry on.");
        return;
      }
      if (s.q.t === "multi" && !(v && v.length)) {
        err(el, "Pick at least one.");
        return;
      }
      if (s.q.t === "text" && s.q.req && !(v && v.trim())) {
        err(el, "A sentence is enough.");
        return;
      }
      go(1);
      return;
    }
    if (s.k === "result") {
      go(1);
      return;
    }
    if (s.k === "contact") {
      var f = el.querySelectorAll("input");
      S.c = {};
      [].forEach.call(f, function (i) {
        S.c[i.name] = i.value.trim();
      });
      save();
      if (!S.c.name || !S.c.email) {
        err(el, "Name and email are needed.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S.c.email)) {
        err(el, "That email does not look right.");
        return;
      }
      send(el);
    }
  }
  function wire(el, s) {
    el.querySelectorAll(".dq-o").forEach(function (b) {
      b.addEventListener("click", function () {
        pick(el, s, b);
      });
    });
    el.querySelectorAll(".dq-next").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.hasAttribute("data-resume")) {
          S.i = Math.max(2, Math.min(S.last, list.length - 2));
          render(1);
          return;
        }
        next(el, s);
      });
    });
    el.querySelectorAll("[data-restart]").forEach(function (b) {
      b.addEventListener("click", function () {
        stopRec();
        S = { j: null, i: 0, a: {}, notes: {}, c: {} };
        try {
          localStorage.removeItem(KEY);
        } catch (e) {}
        render(-1);
      });
    });
    var cp = el.querySelector("[data-copy]");
    if (cp)
      cp.addEventListener("click", function () {
        var t = summary();
        (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(
          function () {
            cp.textContent = "Copied";
          },
          function () {
            cp.textContent = "Copy failed";
          },
        );
      });
    el.querySelectorAll(".dq-ta").forEach(function (w) {
      var ta = w.querySelector("textarea"),
        inNote = !!w.closest(".dq-note");
      grow(ta);
      ta.addEventListener("input", function () {
        grow(ta);
        if (inNote) S.notes[s.st.n] = ta.value;
        else S.a[s.id] = ta.value;
        save();
      });
      w.querySelector(".dq-mic").addEventListener("click", function () {
        toggleRec(ta, w);
      });
    });
    var nt = el.querySelector(".dq-note-t");
    if (nt)
      nt.addEventListener("click", function () {
        var n = nt.parentNode,
          o = !n.classList.contains("open");
        n.classList.toggle("open", o);
        nt.setAttribute("aria-expanded", o);
        if (o)
          setTimeout(function () {
            n.querySelector("textarea").focus();
          }, 80);
      });
    el.querySelectorAll("input").forEach(function (i) {
      i.addEventListener("input", function () {
        S.c = S.c || {};
        S.c[i.name] = i.value;
        save();
      });
    });
  }
  function pick(el, s, b) {
    if (s.k === "fork") {
      var j = b.dataset.j;
      if (S.j !== j) {
        S.a = {};
        S.notes = {};
      }
      S.j = j;
      el.querySelectorAll(".dq-o").forEach(function (x) {
        var on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-checked", on);
      });
      save();
      setTimeout(function () {
        go(1);
      }, 320);
      return;
    }
    var v = b.dataset.v;
    if (s.q.t === "multi") {
      var arr = (S.a[s.id] || []).slice(),
        k = arr.indexOf(v);
      if (k > -1) arr.splice(k, 1);
      else arr.push(v);
      S.a[s.id] = arr;
      b.classList.toggle("on", k < 0);
      b.setAttribute("aria-checked", k < 0);
    } else {
      S.a[s.id] = v;
      el.querySelectorAll(".dq-o").forEach(function (x) {
        var on = x === b;
        x.classList.toggle("on", on);
        x.setAttribute("aria-checked", on);
      });
    }
    b.classList.remove("blink");
    void b.offsetWidth;
    b.classList.add("blink");
    var e = el.querySelector(".dq-err");
    if (e) e.textContent = "";
    save();
    if (s.q.t === "single" && !s.note)
      setTimeout(function () {
        if (list[S.i] === s) go(1);
      }, 420);
  }
  function grow(ta) {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, window.innerHeight * 0.42) + "px";
  }

  /* ---------- talk to type ---------- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition,
    rec = null,
    recTa = null,
    recW = null;
  function toggleRec(ta, w) {
    if (rec && recTa === ta) {
      stopRec();
      return;
    }
    stopRec();
    if (!SR) {
      hint(w, "Voice needs Chrome, Edge or Safari. You can still type.");
      return;
    }
    var base = ta.value.replace(/\s+$/, ""),
      fin = "";
    if (base) base += /[.!?]$/.test(base) ? " " : ". ";
    try {
      rec = new SR();
    } catch (e) {
      hint(w, "Voice is not available here. You can still type.");
      return;
    }
    rec.lang = navigator.language || "en-GB";
    rec.continuous = true;
    rec.interimResults = true;
    recTa = ta;
    recW = w;
    rec.onresult = function (e) {
      var im = "";
      for (var i = e.resultIndex; i < e.results.length; i++) {
        var r = e.results[i];
        if (r.isFinal) fin += r[0].transcript;
        else im += r[0].transcript;
      }
      var t = (fin + im).replace(/^\s+/, "");
      t = t.charAt(0).toUpperCase() + t.slice(1);
      ta.value = base + t;
      ta.dispatchEvent(new Event("input"));
      ta.scrollTop = ta.scrollHeight;
    };
    rec.onerror = function (e) {
      if (e.error === "not-allowed" || e.error === "service-not-allowed")
        hint(w, "Microphone access is blocked. Allow it in your browser, or type instead.");
      else if (e.error === "no-speech") hint(w, "I did not catch that. Press Talk instead and try again.");
      else if (e.error !== "aborted") hint(w, "Voice stopped. Press Talk instead to carry on.");
    };
    rec.onend = function () {
      if (recW === w) {
        ui(w, false);
        rec = null;
        recTa = null;
        recW = null;
      }
    };
    try {
      rec.start();
      ui(w, true);
    } catch (e) {
      hint(w, "Voice could not start. You can still type.");
    }
  }
  function stopRec() {
    if (rec) {
      try {
        rec.stop();
      } catch (e) {}
      if (recW) ui(recW, false);
    }
    rec = null;
    recTa = null;
    recW = null;
  }
  function ui(w, on) {
    var b = w.querySelector(".dq-mic");
    w.classList.toggle("rec", on);
    b.setAttribute("aria-pressed", on);
    b.querySelector(".l").textContent = on ? "Listening · tap to stop" : "Talk instead";
    if (on) hint(w, "Speak naturally. It types as you talk.");
  }
  function hint(w, m) {
    var h = w.querySelector(".dq-ta-h");
    if (h) h.textContent = m;
  }

  /* ---------- send ---------- */
  function summary() {
    var J = D.journeys[S.j] || {},
      L = [
        "Discovery · " + (J.name || ""),
        "Reference: " + (S.ref || "—"),
        "Name: " + (S.c.name || ""),
        "Email: " + (S.c.email || ""),
        "Company: " + (S.c.company || "—"),
        "",
      ];
    var sg = signals();
    list.forEach(function (s) {
      if (s.k !== "q") return;
      var a = area(s.st.n);
      if (s.of[0] === 1) L.push(s.st.n + " · " + a.name + (sg[s.st.n] ? " [" + sg[s.st.n] + "]" : ""));
      var v = S.a[s.id];
      L.push("  " + s.q.q);
      L.push("  → " + (Array.isArray(v) ? v.join(", ") : v || "—"));
      if (s.note && S.notes[s.st.n]) L.push("  Note: " + S.notes[s.st.n]);
      if (s.of[0] === s.of[1]) L.push("");
    });
    return L.join("\n");
  }
  function send(el) {
    S.ref = "BB-D-" + Date.now().toString(36).slice(-5).toUpperCase();
    save();
    var btn = el.querySelector(".dq-next");
    btn.disabled = true;
    var ep = window.BBDiscovery && window.BBDiscovery.endpoint;
    if (ep) {
      fetch(ep, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: S.ref, journey: S.j, answers: S.a, notes: S.notes, signals: signals(), contact: S.c, text: summary() }),
      })
        .then(function (r) {
          if (!r.ok) throw 0;
          S.sentBy = "post";
          go(1);
        })
        .catch(function () {
          btn.disabled = false;
          err(el, "That did not send. Try again, or email " + EMAIL + ".");
        });
      return;
    }
    S.sentBy = "mail";
    location.href =
      "mailto:" +
      EMAIL +
      "?subject=" +
      encodeURIComponent("Discovery · " + S.ref + (S.c.company ? " · " + S.c.company : "")) +
      "&body=" +
      encodeURIComponent(summary());
    setTimeout(function () {
      go(1);
    }, 400);
  }

  /* ---------- keys ---------- */
  document.addEventListener("keydown", function (e) {
    var el = stage.querySelector(".dq-scr:not(.out)"),
      s = list[S.i];
    if (!el || e.altKey) return;
    var t = e.target;
    if (t.tagName === "TEXTAREA") {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        next(el, s);
      }
      return;
    }
    if (t.tagName === "INPUT") {
      if (e.key === "Enter") {
        e.preventDefault();
        next(el, s);
      }
      return;
    }
    if (e.metaKey || e.ctrlKey) return;
    if (e.key === "Enter" && !(t.tagName === "BUTTON" || t.tagName === "A")) {
      e.preventDefault();
      var r = el.querySelector("[data-resume]");
      if (r) r.click();
      else next(el, s);
      return;
    }
    if (/^[a-z]$/i.test(e.key)) {
      var os = el.querySelectorAll(".dq-o"),
        k =
          s.k === "fork"
            ? e.key.toUpperCase() === "A"
              ? 0
              : e.key.toUpperCase() === "B"
                ? 1
                : -1
            : e.key.toUpperCase().charCodeAt(0) - 65;
      if (os[k]) {
        e.preventDefault();
        os[k].click();
      }
    }
  });
  back.addEventListener("click", function () {
    go(-1);
  });
  window.BBDiscovery = window.BBDiscovery || {};
  drawProg();
  build();
  if (S.i >= list.length) S.i = 0;
  if (list[S.i] && list[S.i].k === "done") S.i = 0;
  S.c = S.c || {};
  S.i = 0;
  render(0);
})();
