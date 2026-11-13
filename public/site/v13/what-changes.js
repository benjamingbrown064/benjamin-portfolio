/* "What changes" dialog on the home page: Agile, Agentic, Fast, Simple, Passionate, Reliable.
   Opened by the + button on each card (.oc-more[data-oc]). Layout from the design of 13 November 2026:
   a counter and close button, a small label, the headline, two paragraphs, three points as cards,
   and Previous / Next across the foot. Styles are in v13/site.css (.why-*). */
(function () {
  'use strict';
  var ITEMS = [
    {
      "name": "Agile",
      "title": "Decided by who ships it",
      "body": [
        "Design and code are one person. Nothing gets lost between brief and build.",
        "The person who hears the change makes the change. Usually the same day."
      ],
      "points": [
        "Scope reviewed with you, every week",
        "Changes land in Friday's staging build",
        "You speak to the person writing the code"
      ]
    },
    {
      "name": "Agentic",
      "title": "AI where it earns its keep",
      "body": [
        "LLMs in production since day one. I know where they pay back. And where they quietly burn money.",
        "Agents take the repetitive, high-volume work. Your people keep the judgement calls, with the data in front of them."
      ],
      "points": [
        "One agent. One job. One owner.",
        "A person signs off anything that matters",
        "Cost tracked per task"
      ]
    },
    {
      "name": "Fast",
      "title": "Weeks, not quarters",
      "body": [
        "First screens in week two. In production by week twelve. A staging build every Friday.",
        "You see working software early. Feedback arrives while it's still cheap to act on."
      ],
      "points": [
        "Week one: scope and set-up",
        "Week two: first screens",
        "Week twelve: in production"
      ]
    },
    {
      "name": "Simple",
      "title": "One channel, one update",
      "body": [
        "One Slack channel. One written update a week. One dashboard. No surprises on the invoice.",
        "You always know what's done, what's next and what it costs. No chasing."
      ],
      "points": [
        "One Slack channel for everything",
        "A written update every week",
        "One dashboard for progress and spend"
      ]
    },
    {
      "name": "Passionate",
      "title": "Skin in the game",
      "body": [
        "I run my own products too. I know what your decisions weigh.",
        "I treat your budget and your team's time like my own. If it isn't worth building, I'll say so."
      ],
      "points": [
        "Five companies started",
        "Twenty-six products shipped",
        "I'd rather tell you in week one than in month six"
      ]
    },
    {
      "name": "Reliable",
      "title": "Built to hand over",
      "body": [
        "Every build ships with the training and documentation to run it. When your team gets stuck, they fix it. They don't call me.",
        "Reliability is what happens after I leave. Twenty of my twenty-six products run without me."
      ],
      "points": [
        "Documented as it's built",
        "Training for the people who'll run it",
        "A clean handover, then I step back"
      ]
    }
  ];

  var triggers = document.querySelectorAll('[data-oc]');
  if (!triggers.length) return;

  var ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"></path></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>';

  var dlg = document.createElement('dialog');
  dlg.className = 'why-dlg';
  dlg.id = 'why-dlg';
  dlg.setAttribute('aria-labelledby', 'why-t');
  dlg.innerHTML =
    '<div class="why-in">' +
      '<div class="why-top"><p class="why-count"><b data-why="n"></b> / ' + pad(ITEMS.length) + ' · What changes</p>' +
      '<button type="button" class="why-x" data-why="close" aria-label="Close"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg></button></div>' +
      '<p class="why-k" data-why="k"></p>' +
      '<h3 class="why-t" id="why-t" data-why="t"></h3>' +
      '<div class="why-b" data-why="b"></div>' +
      '<ul class="why-l" data-why="l"></ul>' +
    '</div>' +
    '<div class="why-ft">' +
      '<button type="button" class="why-nv" data-why="prev">' + ARROW_L + '<span><small>Previous</small><b></b></span></button>' +
      '<button type="button" class="why-nv nx" data-why="next"><span><small>Next</small><b></b></span>' + ARROW_R + '</button>' +
    '</div>';
  document.body.appendChild(dlg);

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function part(name) { return dlg.querySelector('[data-why="' + name + '"]'); }
  function wrap(i) { return (i + ITEMS.length) % ITEMS.length; }
  function fillText(parent, tag, lines) {
    parent.textContent = '';
    lines.forEach(function (line) { var el = document.createElement(tag); el.textContent = line; parent.appendChild(el); });
  }

  var current = 0, opener = null;
  function show(i) {
    current = wrap(i);
    var item = ITEMS[current];
    part('n').textContent = pad(current + 1);
    part('k').textContent = item.name;
    part('t').textContent = item.title + '.';
    fillText(part('b'), 'p', item.body);
    fillText(part('l'), 'li', item.points);
    part('prev').querySelector('b').textContent = ITEMS[wrap(current - 1)].name;
    part('next').querySelector('b').textContent = ITEMS[wrap(current + 1)].name;
    dlg.scrollTop = 0;
  }
  function open(i, from) {
    opener = from || null;
    show(i);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    document.documentElement.classList.add('dlg-open');
  }
  function closed() {
    document.documentElement.classList.remove('dlg-open');
    if (opener && opener.focus) opener.focus({ preventScroll: true });
    opener = null;
  }
  function close() { if (dlg.close) dlg.close(); else { dlg.removeAttribute('open'); closed(); } }

  [].forEach.call(triggers, function (b) {
    b.addEventListener('click', function (e) { e.stopPropagation(); open(+b.getAttribute('data-oc'), b); });
  });
  dlg.addEventListener('close', closed);
  part('close').addEventListener('click', close);
  part('prev').addEventListener('click', function () { show(current - 1); });
  part('next').addEventListener('click', function () { show(current + 1); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); }); // a click on the backdrop
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(current + 1);
    else if (e.key === 'ArrowLeft') show(current - 1);
  });
})();
