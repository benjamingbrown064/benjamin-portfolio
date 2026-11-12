(function () {
  var hx = document.querySelector(".hx2");
  if (!hx) return;
  var pin = hx.querySelector(".h2-pin"),
    stick = hx.querySelector(".h2-stick"),
    list = hx.querySelector(".h2-steps"),
    steps = [].slice.call(hx.querySelectorAll(".h2-steps button")),
    panel = hx.querySelector(".h2-panel"),
    wf = hx.querySelector(".h2-waffle"),
    ai = hx.querySelector("[data-ai]"),
    hu = hx.querySelector("[data-hu]"),
    cells = [],
    cur = -1,
    lastR = -1,
    top = 80,
    ticking = false;
  var N = steps.length,
    K = [0, 20, 45, 65, 80];
  for (var k = 0; k < 100; k++) {
    var c = document.createElement("i");
    wf.appendChild(c);
    cells.push(c);
  }
  function set(v) {
    var r = Math.round(v);
    panel.style.setProperty("--s", v);
    if (r === lastR) return;
    lastR = r;
    ai.textContent = r + "%";
    if (hd) hd.setAttribute("aria-valuenow", r);
    hu.textContent = 100 - r + "%";
    for (var k = 0; k < 100; k++) cells[k].classList.toggle("ai", k < r);
  }
  function act(n) {
    if (n === cur) return;
    cur = n;
    steps.forEach(function (s, j) {
      s.classList.toggle("on", j === n);
      s.classList.toggle("done", j < n);
      s.setAttribute("aria-current", j === n ? "step" : "false");
    });
  }
  function val(p) {
    var x = p * N - 0.5;
    if (x <= 0) return K[0];
    if (x >= N - 1) return K[N - 1];
    var i = Math.floor(x),
      f = x - i;
    f = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
    return K[i] + (K[i + 1] - K[i]) * f;
  }
  function pinned() {
    return getComputedStyle(stick).position === "sticky";
  }
  function prog() {
    var r = pin.getBoundingClientRect(),
      vh = innerHeight;
    if (pinned()) {
      var d = r.height - stick.offsetHeight;
      return d > 0 ? Math.max(0, Math.min(1, (top - r.top) / d)) : 0;
    }
    var s = panel.getBoundingClientRect();
    return Math.max(0, Math.min(1, (vh * 0.85 - s.top) / (vh * 0.85)));
  }
  function upd() {
    ticking = false;
    if (manual && !pinned()) return;
    var p = prog();
    list.style.setProperty("--p", p);
    set(val(p));
    act(Math.min(N - 1, Math.floor(p * N)));
  }
  function size() {
    top = Math.max(72, Math.round((innerHeight - stick.offsetHeight) / 2));
    stick.style.top = top + "px";
    upd();
  }
  addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(upd);
      }
    },
    { passive: true },
  );
  addEventListener("resize", size);
  steps.forEach(function (s, j) {
    s.addEventListener("click", function () {
      if (!pinned()) return;
      var r = pin.getBoundingClientRect(),
        d = r.height - stick.offsetHeight;
      scrollTo({ top: scrollY + r.top - top + d * ((j + 0.5) / N), behavior: "smooth" });
    });
  });
  function grp(k) {
    for (var g = 1; g < N; g++) if (k < K[g]) return g;
    return N - 1;
  }
  function jump(g) {
    if (!pinned()) return;
    var r = pin.getBoundingClientRect(),
      d = r.height - stick.offsetHeight;
    scrollTo({ top: scrollY + r.top - top + d * ((g + 0.5) / N), behavior: "smooth" });
  }
  cells.forEach(function (c, k) {
    var g = grp(k);
    c.setAttribute("data-g", g);
    c.title = steps[g].querySelector(".t").textContent;
    c.addEventListener("click", function () {
      jump(g);
    });
    c.addEventListener("pointerenter", function () {
      wf.classList.add("hv");
      cells.forEach(function (x) {
        x.classList.toggle("hov", x.getAttribute("data-g") == g);
      });
    });
  });
  wf.addEventListener("pointerleave", function () {
    wf.classList.remove("hv");
    cells.forEach(function (x) {
      x.classList.remove("hov");
    });
  });
  var bar = hx.querySelector(".hx-bar"),
    hd = hx.querySelector(".hx-handle"),
    manual = false;
  function inv(v) {
    if (v <= K[0]) return 0.5 / N;
    if (v >= K[N - 1]) return (N - 0.5) / N;
    var i = 0;
    while (i < N - 2 && v > K[i + 1]) i++;
    var t = (v - K[i]) / (K[i + 1] - K[i]),
      f = t < 0.5 ? Math.sqrt(t / 2) : 1 - Math.sqrt((1 - t) / 2);
    return (i + f + 0.5) / N;
  }
  function drive(v) {
    v = Math.max(K[0], Math.min(K[N - 1], v));
    var p = inv(v);
    if (pinned()) {
      var r = pin.getBoundingClientRect(),
        d = r.height - stick.offsetHeight;
      scrollTo({ top: scrollY + r.top - top + d * p, behavior: "instant" });
    } else {
      manual = true;
      list.style.setProperty("--p", p);
      set(v);
      act(Math.min(N - 1, Math.floor(p * N)));
    }
  }
  function at(e) {
    var r = bar.getBoundingClientRect();
    drive(((e.clientX - r.left) / r.width) * 100);
  }
  bar.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    try {
      bar.setPointerCapture(e.pointerId);
    } catch (_) {}
    at(e);
    function mv(ev) {
      at(ev);
    }
    function up() {
      bar.removeEventListener("pointermove", mv);
      bar.removeEventListener("pointerup", up);
      bar.removeEventListener("pointercancel", up);
    }
    bar.addEventListener("pointermove", mv);
    bar.addEventListener("pointerup", up);
    bar.addEventListener("pointercancel", up);
  });
  hd.addEventListener("keydown", function (e) {
    var s = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1, Home: -100, End: 100 }[e.key];
    if (!s) return;
    e.preventDefault();
    drive(lastR + s);
  });
  size();
})();
(function () {
  var dlg = document.getElementById("oc-dlg");
  if (!dlg) return;
  var D = [
      [
        "Agile",
        "Decided by who ships it",
        [
          "Design and code are the same person. Nothing gets lost between the brief and the build.",
          "When something needs to change, the person who hears it is the person who changes it. That usually means the same day.",
        ],
        ["Scope reviewed with you every week", "Changes land in the next Friday staging build", "You speak to the person writing the code"],
      ],
      [
        "Agentic",
        "AI where it earns its keep",
        [
          "LLMs in production since day one. I know where they pay back and where they quietly burn money.",
          "Agents take the repetitive, high-volume work. Your people keep the judgement calls, with the data in front of them.",
        ],
        ["Each agent has one job and one owner", "A person signs off anything that matters", "Running cost tracked per task"],
      ],
      [
        "Fast",
        "Weeks, not quarters",
        [
          "First screens in week two, in production by week twelve. Staging every Friday.",
          "You see working software early, so feedback arrives while it is still cheap to act on.",
        ],
        ["Week one: scope and set-up", "Week two: first screens", "Week twelve: in production"],
      ],
      [
        "Simple",
        "One channel, one update",
        [
          "One Slack channel, one weekly written update, one dashboard. No invoice surprises.",
          "You always know what is done, what is next and what it costs, without chasing anyone for it.",
        ],
        ["One Slack channel for everything", "A written update every week", "One dashboard for progress and spend"],
      ],
      [
        "Passionate",
        "Skin in the game",
        [
          "I run my own products too. I know the weight of the decisions you are making.",
          "I treat your budget and your team’s time the way I treat my own. If something is not worth building, I will say so.",
        ],
        ["Five companies started", "Twenty-six products shipped", "I would rather tell you in week one than in month six"],
      ],
      [
        "Reliable",
        "Built to hand over",
        [
          "Every build ships with the training and documentation to run it. When your team gets stuck, they fix it. They do not call me.",
          "Reliability is measured by what happens after I leave. Twenty of the twenty-six products I have shipped run without me.",
        ],
        ["Documentation written as it is built", "Training for the people who will run it", "A clean handover, then I step back"],
      ],
    ],
    IC = [
      '<path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15"></path>',
      '<path d="M12 3c.8 5 4 8.2 9 9-5 .8-8.2 4-9 9-.8-5-4-8.2-9-9 5-.8 8.2-4 9-9z"></path>',
      '<circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3.5 2"></path>',
      '<path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-5 4V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5z"></path>',
      '<circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"></circle>',
      '<circle cx="8" cy="15" r="4.5"></circle><path d="M11.3 11.7 19 4M16 7l2.5 2.5M13.8 9.2l2 2"></path>',
    ],
    cur = 0,
    last = null,
    q = function (s) {
      return dlg.querySelector(s);
    };
  function fill(i) {
    cur = i;
    var d = D[i];
    q("[data-dlg-ic]").innerHTML = '<svg viewBox="0 0 24 24">' + IC[i] + "</svg>";
    q("[data-dlg-k]").textContent = d[0] + ".";
    q("[data-dlg-t]").textContent = d[1];
    q("[data-dlg-b]").innerHTML = d[2]
      .map(function (p) {
        return "<p>" + p + "</p>";
      })
      .join("");
    q("[data-dlg-l]").innerHTML = d[3]
      .map(function (p) {
        return "<li>" + p + "</li>";
      })
      .join("");
    var n = D[(i + 1) % D.length];
    q("[data-dlg-next]").innerHTML = "Next: " + n[0] + ' <span aria-hidden="true">→</span>';
  }
  function open(i, b) {
    last = b;
    fill(i);
    if (dlg.showModal) dlg.showModal();
    else dlg.setAttribute("open", "");
    document.documentElement.classList.add("dlg-open");
  }
  function done() {
    if (!document.documentElement.classList.contains("dlg-open")) return;
    document.documentElement.classList.remove("dlg-open");
    if (last) {
      last.focus();
      last = null;
    }
  }
  function close() {
    if (dlg.close) dlg.close();
    else dlg.removeAttribute("open");
    done();
  }
  dlg.addEventListener("close", done);
  dlg.addEventListener("cancel", function (e) {
    e.preventDefault();
    close();
  });
  document.querySelectorAll("[data-oc]").forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      open(+b.getAttribute("data-oc"), b);
    });
  });
  q("[data-dlg-close]").addEventListener("click", close);
  q("[data-dlg-next]").addEventListener("click", function () {
    fill((cur + 1) % D.length);
  });
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) close();
  });
})();
(function () {
  var dlg = document.getElementById("sv-dlg");
  if (!dlg) return;
  var S = [
      {
        t: "Innovation planning",
        k: "People · Skills",
        l: "Where AI would pay back in your business, and in what order.",
        b: [
          "I look at how the work gets done today: who does it, where the hours go and what repeats. Then I set out what to change first, and what to leave alone.",
          "You leave with a plan your own team can act on, whether or not I build any of it.",
        ],
        i: [
          "A map of roles, capacity and where the hours go",
          "A shortlist of what to build, in order",
          "The skills your team would need to run it",
          "A straight answer on what is not worth doing",
        ],
        c: "Get started",
        y: "consulting",
      },
      {
        t: "Discovery and strategy",
        k: "People",
        l: "One week to cut the idea down to the smallest thing worth shipping.",
        b: [
          "Every engagement starts with a one-week discovery. I sit with the people who will use it, write the problem down and test the scope against the budget.",
          "I would rather tell you no in week one than in month six.",
        ],
        i: [
          "Time with the people who will run it",
          "The problem and the scope, in writing",
          "A fixed price for the build",
          "The risks named up front",
        ],
        c: "Get started",
        y: "consulting",
      },
      {
        t: "Product design",
        k: "Tools",
        l: "High-fidelity design, by the person who will build it.",
        b: [
          "Design and code are the same person, so nothing gets lost between the brief and the build.",
          "First screens arrive in week two. You see real screens early, while changes are still cheap to make.",
        ],
        i: [
          "User flows and screen designs",
          "A prototype your team can click through",
          "A design system the build runs on",
          "A review with you every week",
        ],
        c: "Start a project",
        y: "new",
      },
      {
        t: "Full-stack build",
        k: "Tools",
        l: "Front end, back end and deployment, from one pair of hands.",
        b: [
          "In production by week twelve, with a staging build every Friday so you can see the progress for yourself.",
          "One Slack channel, one weekly written update, one dashboard. No invoice surprises.",
        ],
        i: [
          "Front end, back end and database",
          "Hosting and deployment set up",
          "A staging build every Friday",
          "Two rounds of post-launch iteration",
        ],
        c: "Start a project",
        y: "new",
      },
      {
        t: "AI integration",
        k: "Tools · Skills",
        l: "AI where it earns its keep, inside the tools your team already opens.",
        b: [
          "Agents take the repetitive, high-volume work. Your people keep the judgement calls, with the data in front of them.",
          "I have run LLMs in production since day one. I know where they pay back and where they quietly burn money.",
        ],
        i: [
          "Agents for the repetitive, high-volume work",
          "Built into the systems you already run",
          "A person signs off anything that matters",
          "Your team trained to run and adjust them",
        ],
        c: "Start a project",
        y: "new",
      },
      {
        t: "Team training",
        k: "Skills",
        l: "The skills to run what I build, taught while it is being built.",
        b: [
          "Every build ships with the training and documentation to run it. When your team gets stuck, they fix it. They do not call me.",
          "Training is also available on its own, for teams who want more from the tools they already have.",
        ],
        i: [
          "Hands-on sessions using your own work",
          "Written documentation for every system",
          "Half-day workshops or ongoing sessions",
          "Remote or on site",
        ],
        c: "Get started",
        y: "training",
      },
      {
        t: "Fractional CTO",
        k: "People",
        l: "A senior builder at your table, one or two days a week.",
        b: [
          "For founders who need senior design and build judgement without hiring a full-time lead.",
          "It runs monthly, from £9,500 a month. Pause or cancel with 30 days notice.",
        ],
        i: [
          "Architecture and technical decisions",
          "Hiring and delivery discipline",
          "Investor-grade reporting",
          "One or two days a week, embedded",
        ],
        c: "Get started",
        y: "consulting",
      },
    ],
    cur = 0,
    last = null,
    root = document.documentElement,
    q = function (s) {
      return dlg.querySelector(s);
    };
  function fill(i) {
    cur = i;
    var d = S[i];
    q("[data-sv-n]").textContent = ("0" + (i + 1)).slice(-2);
    q("[data-sv-t]").textContent = d.t;
    q("[data-sv-k]").textContent = d.k;
    q("[data-sv-l]").textContent = d.l;
    q("[data-sv-b]").innerHTML = d.b
      .map(function (p) {
        return "<p>" + p + "</p>";
      })
      .join("");
    q("[data-sv-i]").innerHTML = d.i
      .map(function (p) {
        return "<li>" + p + "</li>";
      })
      .join("");
    q("[data-sv-cta]").textContent = d.c;
    q("[data-sv-next]").innerHTML = "Next: " + S[(i + 1) % S.length].t + ' <span aria-hidden="true">→</span>';
    dlg.scrollTop = 0;
  }
  function open(i, el) {
    last = el;
    fill(i);
    if (dlg.showModal) dlg.showModal();
    else dlg.setAttribute("open", "");
    root.classList.add("dlg-open");
  }
  function done() {
    if (!root.classList.contains("dlg-open")) return;
    root.classList.remove("dlg-open");
    if (last) {
      last.focus();
      last = null;
    }
  }
  function close() {
    if (dlg.close) dlg.close();
    else dlg.removeAttribute("open");
    done();
  }
  dlg.addEventListener("close", done);
  dlg.addEventListener("cancel", function (e) {
    e.preventDefault();
    close();
  });
  document.querySelectorAll(".svc[data-svc]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      open(+a.getAttribute("data-svc"), a);
    });
    a.addEventListener("keydown", function (e) {
      if (e.key === " ") {
        e.preventDefault();
        open(+a.getAttribute("data-svc"), a);
      }
    });
  });
  q("[data-sv-close]").addEventListener("click", close);
  q("[data-sv-next]").addEventListener("click", function () {
    fill((cur + 1) % S.length);
  });
  q("[data-sv-cta]").addEventListener("click", function (e) {
    e.preventDefault();
    var y = S[cur].y,
      t = S[cur].t;
    last = null;
    close();
    if (window.BBContact && window.BBContact.open)
      window.BBContact.open({
        type: y,
        brief: "I am interested in " + t.toLowerCase().replace("ai ", "AI ").replace(" cto", " CTO") + ".",
      });
  });
  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) close();
  });
})();
(function () {
  var el = document.querySelector(".sh-glow");
  if (!el) return;
  function mv(e) {
    var r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  }
  el.addEventListener("pointerenter", function (e) {
    mv(e);
    el.style.setProperty("--on", 1);
  });
  el.addEventListener("pointermove", mv);
  el.addEventListener("pointerleave", function () {
    el.style.setProperty("--on", 0);
  });
})();
(function () {
  [].forEach.call(document.querySelectorAll(".lt-c[data-ov]"), function (c) {
    var ov = c.querySelector(".lt-ov"),
      t = ov && ov.querySelector("template");
    if (!t) return;
    function play() {
      c.classList.add("is-hover");
      [].slice.call(ov.children).forEach(function (n) {
        if (n !== t) n.remove();
      });
      ov.appendChild(t.content.cloneNode(true));
    }
    function stop() {
      c.classList.remove("is-hover");
    }
    c.addEventListener("mouseenter", play);
    c.addEventListener("mouseleave", stop);
    c.addEventListener("focus", play);
    c.addEventListener("blur", stop);
  });
})();
