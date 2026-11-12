/* Benjamin Brown V12 · contact flow. One question per screen, slides sideways between them. Five request types, each with its own questions.
   Modal:   any [data-contact-open] element (optional data-type="project|files|bug|support|assets", data-brief="…"), or the #request hash.
   Inline:  <div data-bb-contact></div>
   API:     window.BBContact.open({type,brief}) · window.BBContact.endpoint = 'https://…' (POST multipart, 2xx = sent). Without an endpoint the receipt composes the email. */
(function () {
  if (window.BBContact) return;
  const EMAIL = "hello@benjaminbrown.co",
    MAXF = 5,
    MAXB = 25 * 1024 * 1024;
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const svg = (d) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>";
  const MARK =
    '<svg class="bf-mk" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 38V13L24 8V38Z" fill="currentColor"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';
  const SYS = ["WarrantyOS", "Taskbox", "Govscape", "WilboLaw", "Ascra", "Ghost Mode", "Other"];
  const LEGACY = { new: "project", consulting: "project", training: "assets" };
  const TYPES = [
    {
      id: "project",
      n: "New project",
      d: "Something you want built.",
      ico: '<path d="M12 5v14M5 12h14"></path>',
      sec: "The project",
      q: [
        {
          k: "brief",
          t: "area",
          l: "What are you trying to build?",
          s: "Brief",
          h: "The problem, who it is for, and where you are up to. Rough is fine.",
          p: "Start typing…",
          r: 1,
        },
        {
          k: "stage",
          t: "chips",
          l: "Where are you up to?",
          s: "Stage",
          o: ["Just an idea", "Designs or a spec", "Live product", "Needs a rebuild"],
        },
        {
          k: "budget",
          t: "chips",
          l: "What is the budget?",
          s: "Budget",
          o: (function () {
            var c = "£";
            try {
              if (localStorage.getItem("bb:cur") === "usd") c = "$";
            } catch (e) {}
            return ["Under " + c + "10k", c + "10–25k", c + "25–50k", c + "50–100k", c + "100k+"];
          })(),
        },
        { k: "timeline", t: "chips", l: "When do you need it?", s: "Timeline", o: ["ASAP", "1–3 months", "3+ months", "Just exploring"] },
        { k: "files", t: "files", l: "Anything useful to share?", s: "Files", h: "Decks, specs, sketches. Optional." },
      ],
    },
    {
      id: "discovery",
      n: "Discovery",
      d: "An appraisal of where the business is and where to go next.",
      ico: '<circle cx="11" cy="11" r="6.5"></circle><path d="M16 16l4.5 4.5"></path>',
      sec: "The business",
      q: [
        {
          k: "brief",
          t: "area",
          l: "What is the business, and what prompted this?",
          s: "Brief",
          h: "What you do, roughly how many people, and what made you look now.",
          p: "Start typing…",
          r: 1,
        },
        { k: "size", t: "chips", l: "How big is the team?", s: "Team", o: ["Just me", "2–10", "11–50", "51–200", "200+"] },
        {
          k: "areas",
          t: "chips",
          multi: 1,
          l: "Where do you think the gaps are?",
          s: "Areas",
          h: "Pick any that apply.",
          o: ["Strategy", "Finance", "Operations", "Data", "Compliance", "Product", "Marketing", "Sales", "Support", "Technology"],
        },
        {
          k: "timeline",
          t: "chips",
          l: "When do you want to start?",
          s: "Timeline",
          o: ["ASAP", "1–3 months", "3+ months", "Just exploring"],
        },
        { k: "files", t: "files", l: "Anything useful to share?", s: "Files", h: "Decks, org charts, reports. Optional." },
      ],
    },
    {
      id: "files",
      n: "Project files",
      d: "Specs, documents or details for live work.",
      ico: '<path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"></path><path d="M12 16.5v-5M9.6 13.6l2.4-2.4 2.4 2.4"></path>',
      sec: "The files",
      q: [
        { k: "project", t: "chips", l: "Which project is this for?", s: "Project", o: SYS, other: 1, r: 1 },
        {
          k: "contents",
          t: "chips",
          multi: 1,
          l: "What are you sending?",
          s: "Contents",
          h: "Pick any that apply.",
          o: ["Specification", "Designs", "Brand assets", "Content or copy", "Data", "Something else"],
        },
        {
          k: "files",
          t: "files",
          l: "Send the files.",
          s: "Files",
          h: "PDF, Word, Excel, images or a zip. Or share a link instead.",
          link: 1,
          r: "link",
        },
        {
          k: "notes",
          t: "area",
          l: "Anything I should know?",
          s: "Notes",
          h: "What changed, what to read first, or what it replaces.",
          p: "Optional",
          o: 1,
        },
      ],
    },
    {
      id: "bug",
      n: "Report a bug",
      d: "Something is broken or behaving oddly.",
      ico: '<path d="M12 4.2l8.6 15H3.4z"></path><path d="M12 10.2v4M12 16.8h.01"></path>',
      sec: "The bug",
      q: [
        { k: "system", t: "chips", l: "Which system?", s: "System", o: SYS, other: 1, r: 1 },
        {
          k: "severity",
          t: "chips",
          l: "How bad is it?",
          s: "Severity",
          o: ["Blocking work", "Something is broken", "Minor or cosmetic"],
          r: 1,
        },
        {
          k: "steps",
          t: "area",
          l: "What happened?",
          s: "What happened",
          h: "What you did, what you expected, and what happened instead.",
          p: "Start typing…",
          r: 1,
        },
        { k: "where", t: "text", l: "Where does it happen?", s: "Where", p: "Page, screen or URL", o: 1 },
        { k: "device", t: "text", l: "Which device and browser?", s: "Device", p: "iPhone 15 · Safari", o: 1 },
        {
          k: "files",
          t: "files",
          l: "Got a screenshot or a recording?",
          s: "Files",
          h: "Drop, browse or paste a screenshot. Optional.",
          acc: "image/*,video/*,.pdf,.txt,.log",
        },
      ],
    },
    {
      id: "support",
      n: "Support request",
      d: "Help, access or a small change.",
      ico: '<circle cx="12" cy="12" r="8.5"></circle><circle cx="12" cy="12" r="3.5"></circle><path d="M6 6l3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5"></path>',
      sec: "The request",
      q: [
        { k: "system", t: "chips", l: "Which system?", s: "System", o: SYS, other: 1, r: 1 },
        {
          k: "topic",
          t: "chips",
          l: "What do you need?",
          s: "Topic",
          o: ["How do I…", "Access or accounts", "A small change", "Data or reports", "Something else"],
          r: 1,
        },
        {
          k: "brief",
          t: "area",
          l: "Tell me more.",
          s: "Details",
          h: "What you are trying to do and where you are stuck.",
          p: "Start typing…",
          r: 1,
        },
        { k: "priority", t: "chips", l: "When do you need it?", s: "Priority", o: ["Today", "This week", "No rush"] },
        { k: "files", t: "files", l: "Anything to attach?", s: "Files", h: "Screenshots or documents. Optional." },
      ],
    },
    {
      id: "assets",
      n: "Request assets",
      d: "Training or marketing materials.",
      ico: '<path d="M7 3.5h7l4.5 4.5v12.5h-11.5z"></path><path d="M14 3.5V8h4.5M12.75 11v6M10.25 14.6l2.5 2.5 2.5-2.5"></path>',
      sec: "The assets",
      q: [
        {
          k: "assets",
          t: "chips",
          multi: 1,
          l: "What do you need?",
          s: "Assets",
          h: "Pick any that apply.",
          o: ["Training guide", "Video walkthrough", "Slide deck", "Marketing copy", "Brand assets", "Case study"],
          r: 1,
        },
        { k: "system", t: "chips", l: "For which product?", s: "Product", o: SYS, other: 1 },
        {
          k: "audience",
          t: "chips",
          l: "Who is it for?",
          s: "Audience",
          o: ["New starters", "The whole team", "Customers", "Sales and partners"],
        },
        {
          k: "format",
          t: "chips",
          multi: 1,
          l: "Which format?",
          s: "Format",
          h: "Pick any that apply.",
          o: ["PDF", "Slides", "Video", "Editable files"],
        },
        { k: "due", t: "date", l: "When do you need it by?", s: "Needed by", o: 1 },
        {
          k: "notes",
          t: "area",
          l: "Anything else I should know?",
          s: "Notes",
          h: "Where it will be used, brand rules, examples you like.",
          p: "Optional",
          o: 1,
        },
        { k: "files", t: "files", l: "Any reference files?", s: "Files", h: "Examples, brand guides, existing material. Optional." },
      ],
    },
  ];
  const YOU = [
    { k: "name", t: "text", l: "What should I call you?", s: "Name", p: "Your name", r: 1, ac: "name", you: 1 },
    { k: "email", t: "email", l: "Where should I reply?", s: "Email", p: "you@company.com", r: 1, ac: "email", you: 1 },
    { k: "company", t: "text", l: "Which company or team?", s: "Company", p: "Optional", o: 1, ac: "organization", you: 1 },
  ];

  const UP = svg('<path d="M12 16V5M7.5 9.5L12 5l4.5 4.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"></path>'),
    XI = svg('<path d="M6 6l12 12M18 6L6 18"></path>'),
    CK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"></path>'),
    BK = svg('<path d="M19 12H5M11 6l-6 6 6 6"></path>');
  const kb = (n) => (n < 1024 ? n + " B" : n < 1048576 ? Math.round(n / 1024) + " KB" : (n / 1048576).toFixed(1) + " MB");
  const isEmail = (v) => /^\S+@\S+\.\S+$/.test(v);
  function mount(root, opts) {
    opts = opts || {};
    const S = {
      t: TYPES.find((x) => x.id === (LEGACY[opts.type] || opts.type)) || TYPES[0],
      i: 0,
      ans: {},
      you: {},
      files: {},
      sent: false,
    };
    root.innerHTML =
      '<div class="bf' +
      (opts.modal ? "" : " bf-inline") +
      '"><header class="bf-top"><span class="bf-brand">' +
      MARK +
      'Benjamin Brown<sup>®</sup></span><div class="bf-tr"><span class="bf-count" aria-live="polite"></span>' +
      (opts.modal ? '<button type="button" class="bf-x" data-close aria-label="Close">' + XI + "</button>" : "") +
      '</div></header><i class="bf-prog"><b></b></i><div class="bf-stage"></div><footer class="bf-foot"></footer></div>';
    const el = root.firstElementChild,
      stage = el.querySelector(".bf-stage"),
      foot = el.querySelector(".bf-foot"),
      count = el.querySelector(".bf-count"),
      prog = el.querySelector(".bf-prog b");
    const A = () => (S.ans[S.t.id] = S.ans[S.t.id] || {});
    const F = () => (S.files[S.t.id] = S.files[S.t.id] || []);
    const steps = () => ["type"].concat(S.t.q, YOU, ["review"]);
    const getv = (q) => (q.you ? S.you[q.k] : A()[q.k]);
    const setv = (q, v) => {
      if (q.you) S.you[q.k] = v;
      else A()[q.k] = v;
    };
    const qOf = (k) => S.t.q.concat(YOU).find((x) => x.k === k);
    const eyebrow = (n, txt) =>
      '<div class="bf-eb bf-a" style="--d:0"><span class="n">' + String(n).padStart(2, "0") + "</span><span>" + esc(txt) + "</span></div>";
    const optsHTML = (q) => {
      const v = getv(q),
        sel = (x) => (q.multi ? (v || []).includes(x) : v === x);
      return (
        '<div class="bf-opts" role="' +
        (q.multi ? "group" : "radiogroup") +
        '" aria-label="' +
        esc(q.l) +
        '">' +
        q.o
          .map(
            (o, j) =>
              '<button type="button" class="bf-opt" role="' +
              (q.multi ? "checkbox" : "radio") +
              '" aria-checked="' +
              sel(o) +
              '" data-k="' +
              q.k +
              '" data-v="' +
              esc(o) +
              '"><span class="key">' +
              String.fromCharCode(65 + j) +
              '</span><span class="tx">' +
              esc(o) +
              '</span><span class="ck">' +
              CK +
              "</span></button>",
          )
          .join("") +
        "</div>" +
        (q.other
          ? '<div class="bf-other' +
            (v === "Other" ? " on" : "") +
            '"><div><input class="bf-in bf-sm" type="text" data-k="' +
            q.k +
            '_other" placeholder="Which one?" aria-label="Which one?" value="' +
            esc(A()[q.k + "_other"] || "") +
            '"' +
            (v === "Other" ? "" : ' tabindex="-1"') +
            "></div></div>"
          : "")
      );
    };
    const ctlHTML = (q) => {
      const v = getv(q) || "";
      if (q.t === "chips") return optsHTML(q);
      if (q.t === "files")
        return (
          '<label class="bf-drop"><input type="file" multiple' +
          (q.acc ? ' accept="' + q.acc + '"' : "") +
          '><span class="ic">' +
          UP +
          '</span><span class="t">Drop files here or <u>browse</u></span><span class="s">Up to ' +
          MAXF +
          ' files, 25 MB each</span></label><ul class="bf-files"></ul>' +
          (q.link
            ? '<div class="bf-or"><label for="bf-link-' +
              S.t.id +
              '">Or share a link</label><input id="bf-link-' +
              S.t.id +
              '" class="bf-in bf-sm" type="url" inputmode="url" data-k="link" placeholder="Drive, Dropbox, Figma or Notion" value="' +
              esc(A().link || "") +
              '"></div>'
            : "")
        );
      if (q.t === "area")
        return (
          '<textarea class="bf-in" rows="1" data-k="' +
          q.k +
          '" placeholder="' +
          esc(q.p || "") +
          '" aria-label="' +
          esc(q.l) +
          '">' +
          esc(v) +
          "</textarea>"
        );
      return (
        '<input class="bf-in" type="' +
        q.t +
        '" data-k="' +
        q.k +
        '" placeholder="' +
        esc(q.p || "") +
        '" aria-label="' +
        esc(q.l) +
        '"' +
        (q.ac ? ' autocomplete="' + q.ac + '"' : "") +
        ' value="' +
        esc(v) +
        '">'
      );
    };
    const slideHTML = (s, i) => {
      if (s === "type")
        return (
          '<section class="bf-slide" data-i="0"><div class="bf-c"><div class="bf-eb bf-a" style="--d:0"><span class="n">01</span><span>Start here</span></div><h2 class="bf-q bf-a" style="--d:1">How can I help?</h2><p class="bf-h bf-a" style="--d:2">Pick one. I will only ask what I need to get started.</p><div class="bf-types bf-a" style="--d:3" role="radiogroup" aria-label="What you need">' +
          TYPES.map(
            (t, j) =>
              '<button type="button" class="bf-type" role="radio" aria-checked="' +
              (t.id === S.t.id) +
              '" data-type="' +
              t.id +
              '"><span class="ic">' +
              svg(t.ico) +
              "</span><span><b>" +
              esc(t.n) +
              '</b><span class="d">' +
              esc(t.d) +
              '</span></span><span class="k">' +
              (j + 1) +
              "</span></button>",
          ).join("") +
          "</div>" +
          '<button type="button" class="bf-say bf-a" style="--d:4" data-bb-speak><span class="ic">' +
          svg('<rect x="9" y="3" width="6" height="11" rx="3"></rect><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"></path>') +
          '</span><span class="tx"><b>Or just say it</b><span class="d">Tell me what you need. I will fill the form in for you to check.</span></span></button>' +
          "</div></section>"
        );
      if (s === "review")
        return (
          '<section class="bf-slide" data-i="' +
          i +
          '"><div class="bf-c">' +
          eyebrow(i + 1, "Review") +
          '<h2 class="bf-q bf-a" style="--d:1">Read it back.</h2><p class="bf-h bf-a" style="--d:2">Lands at ' +
          EMAIL +
          '. A reply within one working day.</p><dl class="bf-sum bf-a" style="--d:3"></dl></div></section>'
        );
      const you = s.you;
      return (
        '<section class="bf-slide" data-i="' +
        i +
        '" data-k="' +
        s.k +
        '">' +
        '<div class="bf-c">' +
        eyebrow(i + 1, you ? "You" : S.t.sec) +
        '<h2 class="bf-q bf-a" style="--d:1">' +
        esc(s.l) +
        "</h2>" +
        (s.h ? '<p class="bf-h bf-a" style="--d:2">' + esc(s.h) + "</p>" : "") +
        '<div class="bf-ctl bf-a" style="--d:3">' +
        ctlHTML(s) +
        '</div><div class="bf-err" aria-live="polite"></div></div></section>'
      );
    };
    let slides = [];
    const build = () => {
      stage.innerHTML = steps().map(slideHTML).join("");
      slides = [...stage.querySelectorAll(".bf-slide")];
      slides.forEach((s, i) => {
        s.classList.toggle("cur", i === S.i);
        s.classList.toggle("past", i < S.i);
        s.inert = i !== S.i;
      });
      const fz = stage.querySelector(".bf-drop");
      if (fz) bindDrop(fz.closest(".bf-slide"));
      stage.querySelectorAll(".bf-files").forEach(drawFiles);
    };
    const drawFiles = (ul) => {
      ul.innerHTML = F()
        .map((x, j) => {
          const ext = (x.file.name.split(".").pop() || "file").slice(0, 4);
          return (
            '<li><span class="th"' +
            (x.url ? ' style="background-image:url(' + x.url + ')"' : "") +
            ">" +
            (x.url ? "" : esc(ext)) +
            '</span><span class="nm"><span>' +
            esc(x.file.name) +
            "</span><small>" +
            kb(x.file.size) +
            '</small></span><button type="button" class="rm" data-j="' +
            j +
            '" aria-label="Remove ' +
            esc(x.file.name) +
            '">' +
            XI +
            "</button></li>"
          );
        })
        .join("");
    };
    const addFiles = (sl, list) => {
      const L = F(),
        err = sl.querySelector(".bf-err");
      let skip = 0;
      [...list].forEach((f) => {
        if (L.length >= MAXF || f.size > MAXB || L.some((x) => x.file.name === f.name && x.file.size === f.size)) {
          skip++;
          return;
        }
        L.push({ file: f, url: /^image\//.test(f.type) ? URL.createObjectURL(f) : "" });
      });
      err.textContent = skip
        ? (skip === 1 ? "One file was skipped" : skip + " files were skipped") + ". Files must be under 25 MB, " + MAXF + " at most."
        : "";
      sl.classList.remove("bad");
      drawFiles(sl.querySelector(".bf-files"));
      paint();
    };
    const bindDrop = (sl) => {
      const z = sl.querySelector(".bf-drop"),
        inp = z.querySelector("input");
      inp.addEventListener("change", () => {
        addFiles(sl, inp.files);
        inp.value = "";
      });
      ["dragenter", "dragover"].forEach((e) =>
        z.addEventListener(e, (ev) => {
          ev.preventDefault();
          z.classList.add("over");
        }),
      );
      z.addEventListener("dragleave", (ev) => {
        if (!z.contains(ev.relatedTarget)) z.classList.remove("over");
      });
      z.addEventListener("drop", (ev) => {
        ev.preventDefault();
        z.classList.remove("over");
        if (ev.dataTransfer && ev.dataTransfer.files.length) addFiles(sl, ev.dataTransfer.files);
      });
      sl.querySelector(".bf-files").addEventListener("click", (ev) => {
        const b = ev.target.closest(".rm");
        if (!b) return;
        const x = F().splice(+b.dataset.j, 1)[0];
        if (x && x.url) URL.revokeObjectURL(x.url);
        drawFiles(sl.querySelector(".bf-files"));
        paint();
      });
    };
    const filled = (q) => {
      if (q.t === "files") return F().length > 0 || (q.link && !!(A().link || "").trim());
      const v = getv(q);
      return Array.isArray(v) ? v.length > 0 : !!String(v || "").trim();
    };
    const check = (q) => {
      if (!q.r) return "";
      if (q.k === "email") {
        const v = (S.you.email || "").trim();
        return !v ? "Your email is needed so I can reply" : isEmail(v) ? "" : "That email does not look right";
      }
      if (q.r === "link") return filled(q) ? "" : "Add a file or share a link";
      return filled(q) ? "" : "This one is needed";
    };
    const paint = () => {
      const all = steps(),
        s = all[S.i],
        n = all.length;
      if (S.sent) {
        count.style.opacity = 0;
        prog.style.width = "100%";
        return;
      }
      count.style.opacity = 1;
      count.innerHTML = "<b>" + (S.i + 1) + "</b> / " + n;
      prog.style.width = ((S.i / (n - 1)) * 100).toFixed(1) + "%";
      let hint = "",
        label = "Next",
        skip = false;
      if (s === "type") {
        hint = "Press <kbd>1</kbd>–<kbd>6</kbd> or <kbd>Enter</kbd>";
        label = "Continue";
      } else if (s === "review") {
        hint = "Press <kbd>Enter</kbd> to send";
        label = "Send to Ben";
      } else {
        if (s.t === "chips")
          hint = s.multi
            ? "Pick any, then press <kbd>Enter</kbd>"
            : "Press <kbd>A</kbd>–<kbd>" + String.fromCharCode(64 + s.o.length) + "</kbd> to choose";
        else if (s.t === "area") hint = "<kbd>Enter</kbd> to continue · <kbd>Shift</kbd> + <kbd>Enter</kbd> for a new line";
        else if (s.t === "files") hint = "Drop, browse or paste";
        else hint = "Press <kbd>Enter</kbd> to continue";
        skip = !s.r && !filled(s);
        label = skip ? "Skip" : all[S.i + 1] === "review" ? "Review" : "Next";
      }
      const cur = foot.querySelector(".bf-next");
      if (!cur) {
        foot.innerHTML =
          '<button type="button" class="bf-back" aria-label="Back">' +
          BK +
          '</button><span class="bf-hint"></span><button type="button" class="bf-btn bf-next"></button>';
      }
      const b = foot.querySelector(".bf-back"),
        nx = foot.querySelector(".bf-next");
      b.hidden = S.i === 0;
      foot.querySelector(".bf-hint").innerHTML = hint;
      nx.classList.toggle("skip", skip);
      if (!nx.disabled) nx.innerHTML = esc(label) + ' <span class="arr">→</span>';
    };
    const focusCur = () => {
      const sl = slides[S.i];
      if (!sl) return;
      const f =
        sl.querySelector('.bf-in:not([tabindex="-1"]):not([data-k="link"])') ||
        sl.querySelector('[aria-checked="true"]') ||
        sl.querySelector(".bf-opt,.bf-type,.bf-drop input,.bf-edit");
      if (f) f.focus({ preventScroll: true });
    };
    let busy = 0;
    const go = (n) => {
      if (n < 0 || n >= slides.length || n === S.i) return;
      const prev = S.i;
      S.i = n;
      if (slides[n].dataset.i && steps()[n] === "review") fillReview();
      slides.forEach((s, i) => {
        s.classList.toggle("cur", i === n);
        s.classList.toggle("past", i < n);
        s.inert = i !== n;
        s.classList.remove("bad", "shake");
      });
      slides[n].scrollTop = 0;
      paint();
      clearTimeout(busy);
      busy = setTimeout(focusCur, matchMedia("(prefers-reduced-motion: reduce)").matches ? 50 : 420);
    };
    const fail = (sl, msg) => {
      sl.querySelector(".bf-err").textContent = msg;
      sl.classList.remove("shake");
      void sl.offsetWidth;
      sl.classList.add("bad", "shake");
      const f = sl.querySelector('.bf-in:not([tabindex="-1"])');
      if (f) f.focus({ preventScroll: true });
    };
    const next = () => {
      const s = steps()[S.i],
        sl = slides[S.i];
      if (s === "review") return send();
      if (s !== "type") {
        const m = check(s);
        if (m) return fail(sl, m);
      }
      go(S.i + 1);
    };
    const pickType = (id) => {
      const t = TYPES.find((x) => x.id === id);
      if (!t) return;
      stage.querySelectorAll(".bf-type").forEach((b) => b.setAttribute("aria-checked", b.dataset.type === id));
      if (t.id !== S.t.id) {
        S.t = t;
        if (opts.brief && !A().brief && !A().steps) {
          const q = t.q.find((x) => x.t === "area");
          if (q) A()[q.k] = opts.brief;
        }
        const keep = S.i;
        build();
        S.i = keep;
      }
      paint();
    };
    const fillReview = () => {
      const dl = stage.querySelector(".bf-sum");
      if (!dl) return;
      const all = steps(),
        rows = [["Request", S.t.n, 0]];
      all.forEach((q, i) => {
        if (typeof q === "string") return;
        let v;
        if (q.t === "files") {
          v = F()
            .map((x) => x.file.name)
            .join("\n");
          if (q.link && A().link) v = (v ? v + "\n" : "") + A().link;
        } else {
          v = getv(q);
          if (Array.isArray(v)) v = v.join(", ");
          if (v === "Other" && A()[q.k + "_other"]) v = A()[q.k + "_other"];
        }
        if (v && String(v).trim()) rows.push([q.s, v, i]);
      });
      dl.innerHTML = rows
        .map(
          (r) =>
            "<div><dt>" +
            esc(r[0]) +
            "</dt><dd>" +
            esc(r[1]) +
            '</dd><button type="button" class="bf-edit" data-go="' +
            r[2] +
            '">Edit</button></div>',
        )
        .join("");
    };
    stage.addEventListener("click", (e) => {
      const t = e.target.closest(".bf-type");
      if (t) {
        pickType(t.dataset.type);
        setTimeout(() => go(1), 280);
        return;
      }
      const o = e.target.closest(".bf-opt");
      if (o) {
        const q = qOf(o.dataset.k),
          grp = o.parentElement;
        if (q.multi) {
          const a = (getv(q) || []).slice(),
            j = a.indexOf(o.dataset.v);
          j < 0 ? a.push(o.dataset.v) : a.splice(j, 1);
          setv(q, a);
          o.setAttribute("aria-checked", j < 0);
        } else {
          setv(q, o.dataset.v);
          grp.querySelectorAll(".bf-opt").forEach((b) => b.setAttribute("aria-checked", b === o));
          const oth = grp.parentElement.querySelector(".bf-other");
          if (oth) {
            const on = o.dataset.v === "Other";
            oth.classList.toggle("on", on);
            oth.querySelector("input").tabIndex = on ? 0 : -1;
            if (on) {
              setTimeout(() => oth.querySelector("input").focus({ preventScroll: true }), 250);
            }
          }
          if (o.dataset.v !== "Other") {
            const at = S.i;
            setTimeout(() => {
              if (S.i === at) next();
            }, 380);
          }
        }
        o.classList.remove("pop");
        void o.offsetWidth;
        o.classList.add("pop");
        slides[S.i].classList.remove("bad");
        slides[S.i].querySelector(".bf-err").textContent = "";
        paint();
        return;
      }
      const ed = e.target.closest(".bf-edit");
      if (ed) {
        go(+ed.dataset.go);
      }
    });
    stage.addEventListener("input", (e) => {
      const k = e.target.dataset.k;
      if (!k) return;
      const q = qOf(k);
      if (q) setv(q, e.target.value);
      else A()[k] = e.target.value;
      const sl = e.target.closest(".bf-slide");
      sl.classList.remove("bad");
      sl.querySelector(".bf-err").textContent = "";
      paint();
    });
    foot.addEventListener("click", (e) => {
      if (e.target.closest(".bf-back")) go(S.i - 1);
      else if (e.target.closest(".bf-next")) next();
    });
    el.addEventListener("keydown", (e) => {
      if (S.sent) return;
      const tg = e.target,
        inText = /INPUT|TEXTAREA/.test(tg.tagName) && tg.type !== "file";
      const s = steps()[S.i];
      if (e.key === "Enter" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (tg.tagName === "TEXTAREA" && e.shiftKey) return;
        if (tg.tagName === "BUTTON" && !tg.classList.contains("bf-opt") && !tg.classList.contains("bf-type")) return;
        if (tg.classList && tg.classList.contains("bf-type")) {
          e.preventDefault();
          tg.click();
          return;
        }
        e.preventDefault();
        next();
        return;
      }
      if (inText || e.metaKey || e.ctrlKey || e.altKey) return;
      if (s === "type" && /^[1-6]$/.test(e.key)) {
        e.preventDefault();
        const b = stage.querySelectorAll(".bf-type")[+e.key - 1];
        b.focus({ preventScroll: true });
        b.click();
        return;
      }
      if (s && s.t === "chips" && /^[a-z]$/i.test(e.key)) {
        const j = e.key.toUpperCase().charCodeAt(0) - 65,
          b = slides[S.i].querySelectorAll(".bf-opt")[j];
        if (b) {
          e.preventDefault();
          b.focus({ preventScroll: true });
          b.click();
        }
      }
    });
    el.addEventListener("paste", (e) => {
      const sl = slides[S.i];
      if (!sl || !sl.querySelector(".bf-drop") || !e.clipboardData || !e.clipboardData.files.length) return;
      e.preventDefault();
      addFiles(sl, e.clipboardData.files);
    });
    let sx = 0,
      sy = 0,
      tracking = false;
    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "touch") return;
      tracking = true;
      sx = e.clientX;
      sy = e.clientY;
    });
    stage.addEventListener("pointerup", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - sx,
        dy = e.clientY - sy;
      if (Math.abs(dx) < 70 || Math.abs(dy) > Math.abs(dx) * 0.7 || S.sent) return;
      dx < 0 ? next() : go(S.i - 1);
    });
    async function send() {
      const nx = foot.querySelector(".bf-next");
      if (nx.disabled) return;
      nx.disabled = true;
      nx.innerHTML = 'Sending <span class="arr">…</span>';
      const data = {},
        rows = [];
      steps().forEach((q) => {
        if (typeof q === "string" || q.t === "files") return;
        let v = getv(q);
        if (Array.isArray(v)) v = v.join(", ");
        if (v === "Other" && A()[q.k + "_other"]) v = A()[q.k + "_other"];
        if (v && String(v).trim()) {
          data[q.k] = String(v).trim();
          rows.push([q.s, data[q.k]]);
        }
      });
      if (A().link) {
        data.link = A().link.trim();
        rows.push(["Link", data.link]);
      }
      const files = F().map((x) => x.file);
      if (files.length) rows.push(["Files", files.map((f) => f.name).join("\n")]);
      const dt = new Date(),
        ref =
          "BB-" +
          String(dt.getFullYear()).slice(2) +
          String(dt.getMonth() + 1).padStart(2, "0") +
          "-" +
          Math.floor(1000 + Math.random() * 9000);
      const payload = Object.assign({ ref, type: S.t.id, typeLabel: S.t.n }, data, {
        files: files.map((f) => f.name).join(", "),
        at: dt.toISOString(),
        page: location.href,
      });
      let sent = false;
      const ep = window.BBContact.endpoint;
      let srv = null;
      if (window.BBSend) {
        try {
          srv = await window.BBSend(payload, files);
        } catch (x) {}
        if (srv && srv.ok) {
          sent = true;
          if (srv.ref) {
            payload.ref = srv.ref;
          }
        }
      } else if (ep) {
        try {
          const fd = new FormData();
          Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
          files.forEach((f) => fd.append("files", f, f.name));
          const r = await fetch(ep, { method: "POST", body: fd });
          sent = r.ok;
        } catch (x) {}
      }
      try {
        const all = JSON.parse(localStorage.getItem("bb3:requests") || "[]");
        all.push(payload);
        localStorage.setItem("bb3:requests", JSON.stringify(all.slice(-20)));
      } catch (x) {}
      const mailto =
        "mailto:" +
        EMAIL +
        "?subject=" +
        encodeURIComponent("[" + ref + "] " + S.t.n + (data.company ? " · " + data.company : "")) +
        "&body=" +
        encodeURIComponent(rows.map((r) => r[0] + ": " + r[1]).join("\n") + "\n\nRef " + ref);
      const sec = document.createElement("section");
      sec.className = "bf-slide";
      sec.innerHTML =
        '<div class="bf-c bf-rc"><span class="ok bf-a" style="--d:0">' +
        CK +
        '</span><div class="bf-eb bf-a" style="--d:1"><span class="n">' +
        esc(payload.ref) +
        "</span><span>" +
        esc(S.t.n) +
        '</span></div><h2 class="bf-q bf-a" style="--d:2">' +
        (sent ? "With Ben." : "One more step.") +
        '</h2><p class="bf-h bf-a" style="--d:3">' +
        (sent
          ? "It is with Ben. Expect a reply within one working day." +
            (srv && srv.failed && srv.failed.length
              ? " " +
                (srv.failed.length === 1 ? "One file" : srv.failed.length + " files") +
                " did not upload (" +
                esc(srv.failed.join(", ")) +
                "); reply to the confirmation or email " +
                EMAIL +
                " to send " +
                (srv.failed.length === 1 ? "it" : "them") +
                "."
              : "")
          : "No server is wired to this form yet, so it opens your mail app with the request written out." +
            (files.length
              ? " Attach your " + (files.length === 1 ? "file" : files.length + " files") + " to the email before you send it."
              : "") +
            " It lands at " +
            EMAIL +
            ".") +
        "</p></div>";
      stage.appendChild(sec);
      slides.push(sec);
      S.sent = true;
      go(slides.length - 1);
      foot.innerHTML =
        '<span class="bf-hint">Reference ' +
        esc(payload.ref) +
        '</span><button type="button" class="bf-btn skip bf-again">Send another</button>' +
        (sent
          ? opts.modal
            ? '<button type="button" class="bf-btn" data-close>Done</button>'
            : ""
          : '<a class="bf-btn" href="' + mailto + '">Open in mail <span class="arr">→</span></a>');
      foot.querySelector(".bf-again").addEventListener("click", () => mount(root, Object.assign({}, opts, { type: S.t.id, brief: "" })));
      try {
        window.dispatchEvent(new CustomEvent("bb:request", { detail: payload }));
      } catch (x) {}
    }
    if (opts.brief) {
      const q = S.t.q.find((x) => x.t === "area");
      if (q) A()[q.k] = opts.brief;
    }
    build();
    paint();
    setTimeout(focusCur, opts.modal ? 120 : 0);
    /* Fill the form from structured answers (used by "say it"). Only values the form itself offers are accepted. */
    const fill = (d) => {
      d = d || {};
      const t = TYPES.find((x) => x.id === d.type);
      if (t) S.t = t;
      const a = d.answers || {},
        y = d.you || {};
      S.t.q.concat(YOU).forEach((q) => {
        let v = q.you ? y[q.k] : a[q.k];
        if (v == null || q.t === "files") return;
        if (q.t === "chips") {
          const ok = (x) => q.o.includes(x);
          if (q.multi) {
            v = (Array.isArray(v) ? v : [v]).filter(ok);
            if (v.length) setv(q, v);
          } else if (ok(v)) setv(q, v);
        } else if (q.t === "date") {
          if (/^\d{4}-\d{2}-\d{2}$/.test(v)) setv(q, v);
        } else if (typeof v === "string" && v.trim()) setv(q, v.trim().slice(0, 4000));
      });
      S.i = 0;
      build();
      const all = steps();
      let n = all.findIndex((q) => typeof q !== "string" && check(q));
      if (n < 0) n = all.length - 1;
      go(n);
    };
    const schema = () => ({
      types: TYPES.map((t) => ({
        id: t.id,
        name: t.n,
        about: t.d,
        fields: t.q
          .filter((q) => q.t !== "files")
          .map((q) => ({
            key: q.k,
            question: q.l,
            kind: q.t,
            options: q.o && q.t === "chips" ? q.o : undefined,
            many: q.multi ? true : undefined,
          })),
      })),
    });
    const api = { el, go, pickType, fill, schema };
    root.__bbForm = api;
    return api;
  }
  let modal, last;
  function open(opts) {
    opts = opts || {};
    last = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "bf-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Contact Ben");
      modal.innerHTML = '<div class="bf-scrim" data-close></div><div class="bf-panel"></div>';
      document.body.appendChild(modal);
      modal.addEventListener("click", (e) => {
        if (e.target.closest("[data-close]")) close();
      });
      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("on")) return;
        if (e.key === "Escape") {
          e.preventDefault();
          close();
          return;
        }
        if (e.key === "Tab") {
          const f = [
            ...modal.querySelectorAll(
              '.bf-top button,.bf-slide.cur a[href],.bf-slide.cur button,.bf-slide.cur input:not([tabindex="-1"]),.bf-slide.cur textarea,.bf-foot a[href],.bf-foot button:not([hidden])',
            ),
          ].filter((x) => x.offsetParent !== null && !x.closest("[inert]"));
          if (!f.length) return;
          const a = f[0],
            z = f[f.length - 1];
          if (e.shiftKey && document.activeElement === a) {
            e.preventDefault();
            z.focus();
          } else if (!e.shiftKey && document.activeElement === z) {
            e.preventDefault();
            a.focus();
          }
        }
      });
    }
    const inst = mount(modal.querySelector(".bf-panel"), Object.assign({ modal: 1 }, opts));
    modal.classList.remove("out");
    modal.classList.add("on");
    document.documentElement.classList.add("bf-lock");
    return inst;
  }
  function close() {
    if (!modal || !modal.classList.contains("on")) return;
    modal.classList.add("out");
    setTimeout(
      () => {
        modal.classList.remove("on", "out");
        document.documentElement.classList.remove("bf-lock");
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280,
    );
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  window.BBContact = { open, close, mount, types: TYPES.map((t) => ({ id: t.id, label: t.n })), endpoint: null };
  const boot = () => {
    document.querySelectorAll("[data-bb-contact]").forEach((r) => mount(r, { type: r.dataset.type }));
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-contact-open]");
      if (!a) return;
      e.preventDefault();
      open({ type: a.dataset.type, brief: a.dataset.brief });
    });
    if (location.hash === "#request") open();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
