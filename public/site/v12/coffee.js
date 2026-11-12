/* Benjamin Brown V12 · "Let's grab a coffee" booking modal. Pick a format, a day and a time, then name and email.
   Open:  any [data-coffee-open] element, the #coffee hash, or window.BBCoffee.open().
   Calendar hook (to wire to the real calendar):
     window.BBCoffee.availability = async (date) => ['09:00','10:30', …]   // free slots for that day, HH:MM in Ben's time zone
     window.BBCoffee.book = async (booking) => true                       // create the event; return true when booked
   Without them it shows sample weekday slots and fires a 'bb:coffee' event with the booking. */
(function () {
  if (window.BBCoffee) return;
  const TZ = "America/Los_Angeles",
    TZL = "Costa Mesa time (PT)",
    DAYS_AHEAD = 42;
  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const svg = (d) => '<svg viewBox="0 0 24 24" aria-hidden="true">' + d + "</svg>";
  const MARK =
    '<svg class="cf-mk" viewBox="0 0 64 64" aria-hidden="true"><path d="M14 38V13L24 8V38Z" fill="currentColor"></path><circle cx="32" cy="38" r="13" fill="none" stroke="currentColor" stroke-width="10"></circle></svg>';
  const XI = svg('<path d="M6 6l12 12M18 6L6 18"></path>'),
    L = svg('<path d="M15 6l-6 6 6 6"></path>'),
    R = svg('<path d="M9 6l6 6-6 6"></path>'),
    CK = svg('<path d="M5 12.5l4.5 4.5L19 7.5"></path>');
  const CUP = svg(
    '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"></path><path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16"></path><path d="M8.5 3.5v2.5M12 3.5v2.5"></path>',
  );
  const VID = svg('<rect x="3" y="6.5" width="12.5" height="11" rx="2.5"></rect><path d="M15.5 10.5l5-3v9l-5-3"></path>');
  const CAL = svg('<rect x="4" y="5.5" width="16" height="14.5" rx="2.5"></rect><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"></path>');
  const FMT = [
    { id: "person", n: "In person", d: "Costa Mesa, CA", ico: CUP },
    { id: "video", n: "Video call", d: "Google Meet link", ico: VID },
  ];
  const MON = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    WD = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    WDL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const ymd = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const sample = (d) => {
    const base = ["08:30", "09:30", "10:30", "12:00", "13:30", "15:00", "16:00"],
      seed = d.getDate() * 7 + d.getMonth() * 3;
    return base.filter((_, i) => (seed + i * 3) % 5 !== 0);
  };
  const nice = (t) => {
    const [h, m] = t.split(":").map(Number);
    return ((h + 11) % 12) + 1 + ":" + String(m).padStart(2, "0") + (h < 12 ? " am" : " pm");
  };
  function mount(root) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const first = new Date(today);
    first.setDate(first.getDate() + 1);
    const last = new Date(today);
    last.setDate(last.getDate() + DAYS_AHEAD);
    const isAv = (d) => d >= first && d <= last && d.getDay() !== 0 && d.getDay() !== 6;
    const S = { fmt: "video", view: new Date(first.getFullYear(), first.getMonth(), 1), day: null, time: null, slots: [] };
    root.innerHTML =
      '<div class="cf"><header class="cf-top"><span class="cf-brand">' +
      MARK +
      'Benjamin Brown<sup>®</sup></span><button type="button" class="cf-x" data-close aria-label="Close">' +
      XI +
      '</button></header><div class="cf-body"><div class="cf-intro"><div class="eb"><b>30 min</b><span>On me</span></div><h2>Let\'s grab a coffee.</h2><p>Virtual or in person, whichever suits you. Pick a time that works and I will send an invite.</p><div class="cf-fmt" role="radiogroup" aria-label="Format">' +
      FMT.map(
        (f) =>
          '<button type="button" class="cf-f" role="radio" aria-checked="' +
          (f.id === S.fmt) +
          '" data-f="' +
          f.id +
          '"><span class="ic">' +
          f.ico +
          "</span><span><b>" +
          f.n +
          "</b><small>" +
          f.d +
          '</small></span><span class="ck">' +
          CK +
          "</span></button>",
      ).join("") +
      '</div><div class="cf-meta"><span>' +
      CAL +
      "Weekdays</span><span>Times in " +
      TZL +
      '</span></div></div><div class="cf-pick"></div></div></div>';
    const el = root.firstElementChild,
      pick = el.querySelector(".cf-pick");
    const fmtOf = () => FMT.find((f) => f.id === S.fmt);
    const calHTML = () => {
      const y = S.view.getFullYear(),
        m = S.view.getMonth(),
        start = (new Date(y, m, 1).getDay() + 6) % 7,
        n = new Date(y, m + 1, 0).getDate();
      const prevOk = new Date(y, m, 1) > new Date(first.getFullYear(), first.getMonth(), 1),
        nextOk = new Date(y, m + 1, 1) <= last;
      let cells = "";
      for (let i = 0; i < start; i++) cells += "<span></span>";
      for (let d = 1; d <= n; d++) {
        const dt = new Date(y, m, d),
          av = isAv(dt),
          sel = S.day && ymd(S.day) === ymd(dt);
        cells +=
          '<button type="button" class="cf-d' +
          (av ? " av" : "") +
          (ymd(dt) === ymd(today) ? " today" : "") +
          '" data-d="' +
          ymd(dt) +
          '"' +
          (av ? "" : " disabled") +
          ' aria-pressed="' +
          !!sel +
          '" aria-label="' +
          WDL[dt.getDay()] +
          " " +
          d +
          " " +
          MON[m] +
          (av ? "" : ", unavailable") +
          '">' +
          d +
          "</button>";
      }
      return (
        '<div class="cf-cal"><div class="cf-cal-h"><b>' +
        MON[m] +
        " " +
        y +
        '</b><div class="nv"><button type="button" class="cf-nb" data-nav="-1" aria-label="Previous month"' +
        (prevOk ? "" : " disabled") +
        ">" +
        L +
        '</button><button type="button" class="cf-nb" data-nav="1" aria-label="Next month"' +
        (nextOk ? "" : " disabled") +
        ">" +
        R +
        '</button></div></div><div class="cf-grid">' +
        WD.map(
          (w) =>
            '<span class="wd">' +
            w.slice(0, 1) +
            '<span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">' +
            w.slice(1) +
            "</span></span>",
        ).join("") +
        cells +
        "</div></div>"
      );
    };
    const slotsHTML = () => {
      if (!S.day) return '<div class="cf-slots"><h3>Pick a day</h3><p class="cf-empty">Open days are shaded. Times appear here.</p></div>';
      const d = S.day;
      return (
        '<div class="cf-slots"><h3>' +
        WDL[d.getDay()].slice(0, 3) +
        " " +
        d.getDate() +
        " " +
        MON[d.getMonth()].slice(0, 3) +
        "</h3>" +
        (S.slots.length
          ? '<div class="cf-sl">' +
            S.slots
              .map((t, i) => '<button type="button" class="cf-s" data-t="' + t + '" style="--i:' + i + '">' + nice(t) + "</button>")
              .join("") +
            "</div>"
          : '<p class="cf-empty">Nothing free that day. Try another.</p>') +
        "</div>"
      );
    };
    const drawPick = () => {
      pick.innerHTML = calHTML() + slotsHTML();
    };
    const loadSlots = async (d) => {
      S.day = d;
      S.slots = [];
      drawPick();
      let s;
      try {
        s = window.BBCoffee.availability ? await window.BBCoffee.availability(new Date(d), S.fmt) : sample(d);
      } catch (e) {
        s = sample(d);
      }
      if (S.day !== d) return;
      S.slots = s || [];
      drawPick();
      const f = pick.querySelector(".cf-s");
      if (f && matchMedia("(min-width:961px)").matches) f.focus({ preventScroll: true });
      else {
        const body = el.querySelector(".cf-body"),
          sl = pick.querySelector(".cf-slots");
        if (body && sl) {
          let y = 0,
            n = sl;
          while (n && n !== body) {
            y += n.offsetTop;
            n = n.offsetParent;
          }
          body.scrollTo({ top: Math.max(0, y - 16), behavior: "smooth" });
        }
      }
    };
    const label = () => WDL[S.day.getDay()] + " " + S.day.getDate() + " " + MON[S.day.getMonth()] + " · " + nice(S.time) + " PT";
    const drawForm = () => {
      const f = fmtOf();
      pick.innerHTML =
        '<div class="cf-step" style="grid-column:1/-1"><button type="button" class="cf-back" data-back>' +
        L +
        'Change time</button><div class="cf-sum"><span class="ic">' +
        f.ico +
        "</span><span><b>" +
        esc(label()) +
        "</b><small>30 minutes · " +
        esc(f.n) +
        (f.id === "person" ? " · Costa Mesa, address with the invite" : " · link with the invite") +
        '</small></span></div><form class="cf-fl" novalidate><div class="cf-fd"><label for="cf-n">Name</label><input id="cf-n" name="name" autocomplete="name" placeholder="Your name"></div><div class="cf-fd"><label for="cf-e">Email</label><input id="cf-e" name="email" type="email" autocomplete="email" placeholder="you@company.com"></div><div class="cf-fd"><label for="cf-t">Anything to cover?<em>optional</em></label><textarea id="cf-t" name="note" rows="1" placeholder="A line or two is plenty"></textarea></div><div><button type="submit" class="cf-btn cf-go">Book coffee <span class="arr">→</span></button><div class="cf-err" aria-live="polite"></div></div></form></div>';
      setTimeout(() => pick.querySelector("#cf-n").focus({ preventScroll: true }), 200);
    };
    const drawDone = (b, ok) => {
      const f = fmtOf();
      pick.innerHTML =
        '<div class="cf-step cf-done" style="grid-column:1/-1"><span class="ok">' +
        CK +
        "</span><h3>" +
        (ok ? "See you then." : "Request sent.") +
        "</h3><p>" +
        (ok
          ? "The invite is on its way to " + esc(b.email) + "."
          : "Ben will confirm by email at " + esc(b.email) + " within one working day.") +
        '</p><div class="cf-sum"><span class="ic">' +
        f.ico +
        "</span><span><b>" +
        esc(label()) +
        "</b><small>30 minutes · " +
        esc(f.n) +
        '</small></span></div><div class="cf-acts"><button type="button" class="cf-btn" data-close>Done</button></div></div>';
    };
    el.addEventListener("click", (e) => {
      const f = e.target.closest(".cf-f");
      if (f) {
        S.fmt = f.dataset.f;
        el.querySelectorAll(".cf-f").forEach((b) => b.setAttribute("aria-checked", b === f));
        if (S.day && !S.time) loadSlots(S.day);
        else if (S.time && pick.querySelector(".cf-sum") && !pick.querySelector(".cf-done"))
          pick.querySelector(".cf-sum").outerHTML = (() => {
            const x = document.createElement("div");
            x.innerHTML =
              '<div class="cf-sum"><span class="ic">' +
              fmtOf().ico +
              "</span><span><b>" +
              esc(label()) +
              "</b><small>30 minutes · " +
              esc(fmtOf().n) +
              (S.fmt === "person" ? " · Costa Mesa, address with the invite" : " · link with the invite") +
              "</small></span></div>";
            return x.innerHTML;
          })();
        return;
      }
      const nv = e.target.closest("[data-nav]");
      if (nv) {
        S.view = new Date(S.view.getFullYear(), S.view.getMonth() + +nv.dataset.nav, 1);
        drawPick();
        return;
      }
      const d = e.target.closest(".cf-d.av");
      if (d) {
        const [y, m, dd] = d.dataset.d.split("-").map(Number);
        loadSlots(new Date(y, m - 1, dd));
        return;
      }
      const s = e.target.closest(".cf-s");
      if (s) {
        S.time = s.dataset.t;
        drawForm();
        return;
      }
      if (e.target.closest("[data-back]")) {
        S.time = null;
        drawPick();
      }
    });
    el.addEventListener("input", (e) => {
      const f = e.target.closest(".cf-fd");
      if (f) f.classList.remove("bad");
      const er = el.querySelector(".cf-err");
      if (er) er.textContent = "";
    });
    el.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fm = e.target,
        n = fm.name.value.trim(),
        em = fm.email.value.trim(),
        er = fm.querySelector(".cf-err");
      const bad = !n ? fm.name : !/^\S+@\S+\.\S+$/.test(em) ? fm.email : null;
      if (bad) {
        bad.closest(".cf-fd").classList.add("bad");
        er.textContent =
          bad === fm.name ? "Your name is needed" : em ? "That email does not look right" : "Your email is needed for the invite";
        bad.focus({ preventScroll: true });
        return;
      }
      const btn = fm.querySelector(".cf-go");
      btn.disabled = true;
      btn.innerHTML = 'Booking <span class="arr">…</span>';
      const b = {
        date: ymd(S.day),
        time: S.time,
        timeZone: TZ,
        duration: 30,
        format: S.fmt,
        name: n,
        email: em,
        note: fm.note.value.trim(),
        page: location.href,
      };
      let ok = false;
      try {
        if (window.BBCoffee.book) ok = !!(await window.BBCoffee.book(b));
      } catch (x) {}
      try {
        const all = JSON.parse(localStorage.getItem("bb:coffee") || "[]");
        all.push(b);
        localStorage.setItem("bb:coffee", JSON.stringify(all.slice(-20)));
      } catch (x) {}
      try {
        window.dispatchEvent(new CustomEvent("bb:coffee", { detail: b }));
      } catch (x) {}
      drawDone(b, ok);
    });
    drawPick();
  }
  let modal, last;
  function open() {
    last = document.activeElement;
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "cf-modal";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      modal.setAttribute("aria-label", "Book a coffee with Ben");
      modal.innerHTML = '<div class="cf-scrim" data-close></div><div class="cf-panel"></div>';
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
          const f = [...modal.querySelectorAll("button:not([disabled]),input,textarea,a[href]")].filter((x) => x.offsetParent !== null);
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
    mount(modal.querySelector(".cf-panel"));
    modal.classList.remove("out");
    modal.classList.add("on");
    document.documentElement.classList.add("cf-lock");
    setTimeout(() => {
      const f = modal.querySelector('.cf-f[aria-checked="true"]');
      f && f.focus({ preventScroll: true });
    }, 80);
  }
  function close() {
    if (!modal || !modal.classList.contains("on")) return;
    modal.classList.add("out");
    setTimeout(
      () => {
        modal.classList.remove("on", "out");
        document.documentElement.classList.remove("cf-lock");
      },
      matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 280,
    );
    if (last && last.focus) last.focus({ preventScroll: true });
  }
  window.BBCoffee = { open, close, availability: null, book: null };
  const boot = () => {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-coffee-open]");
      if (!a) return;
      e.preventDefault();
      open();
    });
    if (location.hash === "#coffee") open();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
