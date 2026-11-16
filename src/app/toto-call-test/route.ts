export const dynamic = "force-dynamic";

/* Private test page for live voice calls with Toto. Not linked from the site and not indexed. The call itself
   goes through /api/voice/call, which applies the same allowances, caps and checks as the live site will. */
export async function GET() {
  return new Response(PAGE, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow" } });
}

const PAGE = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow"><title>Toto call test</title>
<style>
:root{--bg:#0d0d0c;--fg:#f2efe8;--mute:#8f8b82;--acc:#ff5a1f;--line:#26251f}
*{box-sizing:border-box}html,body{margin:0;height:100%;background:var(--bg);color:var(--fg);font:16px/1.45 -apple-system,BlinkMacSystemFont,"Inter",system-ui,sans-serif}
main{min-height:100%;display:flex;flex-direction:column;align-items:center;padding:48px 20px calc(32px + env(safe-area-inset-bottom));gap:24px;max-width:560px;margin:0 auto}
h1{font-size:15px;font-weight:600;letter-spacing:.02em;margin:0;color:var(--mute);text-transform:uppercase}
.orb{width:168px;height:168px;border-radius:50%;border:0;background:radial-gradient(circle at 35% 30%,#ff8a5c,var(--acc) 55%,#c23a0a);box-shadow:0 0 0 0 rgba(255,90,31,.35);cursor:pointer;color:#fff;font:600 17px/1.2 inherit;transition:transform .25s ease,box-shadow .25s ease}
.orb:active{transform:scale(.97)}
body[data-mode=listening] .orb{box-shadow:0 0 0 calc(var(--lv,0)*28px) rgba(255,90,31,.25)}
body[data-mode=speaking] .orb{animation:talk 1.1s ease-in-out infinite}
body[data-mode=connecting] .orb{opacity:.6}
@keyframes talk{50%{transform:scale(1.06)}}
.st{min-height:24px;color:var(--mute);text-align:center}
.left{font-variant-numeric:tabular-nums;color:var(--mute);font-size:13px;min-height:18px}
.end{background:none;border:1px solid var(--line);color:var(--fg);border-radius:999px;padding:10px 22px;font:inherit;cursor:pointer}
.end[hidden]{display:none}
.log{width:100%;display:flex;flex-direction:column;gap:10px;margin-top:8px}
.m{padding:10px 14px;border-radius:14px;max-width:88%;white-space:pre-wrap}
.m.u{align-self:flex-end;background:#1d1c18}.m.a{align-self:flex-start;border:1px solid var(--line)}
.m.x{align-self:center;color:var(--mute);font-size:13px;border:1px dashed var(--line)}
.fast{color:var(--mute);font-size:13px;display:flex;gap:8px;align-items:center}
.note{color:var(--mute);font-size:13px;text-align:center;max-width:420px}
</style></head>
<body data-mode="idle"><main>
<h1>Toto · live call test</h1>
<button class="orb" type="button" aria-label="Talk to Toto">Talk to Toto</button>
<div class="st" aria-live="polite">Tap to start a call. Talk normally; you can cut in while he speaks.</div>
<label class="fast"><input type="checkbox"> Faster model (test)</label>
<div class="left"></div>
<button class="end" type="button" hidden>Hang up</button>
<div class="log" role="log"></div>
<p class="note">Test page. Calls use the real Toto and count towards the site's voice allowance. Headphones give the cleanest result; laptop speakers are part of the test.</p>
</main>
<script type="module">
import { Conversation } from "https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.36.1/+esm";
const $ = (s) => document.querySelector(s);
const orb = $(".orb"), st = $(".st"), left = $(".left"), endBtn = $(".end"), log = $(".log");
let conv = null, ticket = null, deadline = 0, timer = null, ended = false;
// The test page keeps its own conversation, separate from the chat panel's, so earlier chat use does not count here.
function session() {
  let v = null; try { v = localStorage.getItem("toto:call-test-sid"); } catch (e) {}
  if (!v) { v = crypto.randomUUID(); try { localStorage.setItem("toto:call-test-sid", v); } catch (e) {} }
  return v;
}
function mode(m, text) { document.body.dataset.mode = m; if (text != null) st.textContent = text; }
function line(cls, text) { const n = document.createElement("div"); n.className = "m " + cls; n.textContent = text; log.appendChild(n); n.scrollIntoView({ block: "end", behavior: "smooth" }); return n; }
function tick() {
  const s = Math.max(0, Math.round((deadline - Date.now()) / 1000));
  left.textContent = conv ? (Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0") + " left on this call") : "";
}
function finish(reason) {
  if (ended) return; ended = true;
  clearInterval(timer); left.textContent = "";
  endBtn.hidden = true; orb.textContent = "Talk to Toto"; mode("idle", reason || "Call ended. Tap to call again.");
  if (ticket) fetch("/api/voice/call", { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ op: "end", ticket }) }).catch(() => {});
  ticket = null; conv = null;
}
async function hangUp(reason) { const c = conv; finish(reason); if (c) { try { await c.endSession(); } catch (e) {} } }
async function start() {
  if (conv) return hangUp();
  ended = false; mode("connecting", "Connecting…"); orb.textContent = "…";
  try { const s = await navigator.mediaDevices.getUserMedia({ audio: true }); s.getTracks().forEach((t) => t.stop()); }
  catch (e) { mode("idle", "I need your microphone for a call."); orb.textContent = "Talk to Toto"; return; }
  let j = {};
  try {
    const r = await fetch("/api/voice/call", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ session: session(), page: "/", fast: document.querySelector(".fast input").checked }) });
    j = await r.json().catch(() => ({}));
  } catch (e) {}
  if (!j.ok) { mode("idle", j.error || "I could not start a call just now."); orb.textContent = "Talk to Toto"; return; }
  ticket = j.ticket; deadline = Date.now() + j.seconds * 1000;
  try {
    conv = await Conversation.startSession({
      conversationToken: j.token,
      connectionType: "webrtc",
      dynamicVariables: { ticket: j.ticket },
      clientTools: { site_action: (p) => { let a = {}; try { a = JSON.parse(p.action); } catch (e) {} line("x", "Toto would now: " + (a.type === "go_to" ? "open " + a.path : a.type === "open_request" ? "open the request form (" + a.request + ")" : a.type === "book_coffee" ? "open the coffee booking" : a.type)); } },
      onConnect: () => { mode("listening", "Connected. Toto will say hello."); endBtn.hidden = false; orb.textContent = "Hang up"; timer = setInterval(tick, 500); tick(); },
      onModeChange: ({ mode: m }) => mode(m === "speaking" ? "speaking" : "listening", m === "speaking" ? "Toto is speaking. Talk to cut in." : "Listening…"),
      onMessage: ({ message, source }) => { if (message) line(source === "user" ? "u" : "a", message); },
      onDisconnect: () => finish(),
      onError: (e) => { console.error(e); },
    });
  } catch (e) { console.error(e); finish("The call could not connect. Try again in a moment."); }
}
orb.addEventListener("click", start);
endBtn.addEventListener("click", () => hangUp());
// Nobody pays for a call left open in a hidden tab or on a locked phone.
document.addEventListener("visibilitychange", () => { if (document.hidden && conv) hangUp("Call ended because the page was hidden."); });
window.addEventListener("pagehide", () => { if (conv) hangUp(); });
setInterval(() => { if (conv) { const v = conv.getInputVolume ? conv.getInputVolume() : 0; document.body.style.setProperty("--lv", Math.min(1, v * 3).toFixed(2)); } }, 80);
</script></body></html>`;
