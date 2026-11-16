import { timingSafeEqual } from "node:crypto";
import { rpc } from "@/lib/db";
import { CALL, readTicket } from "@/lib/call";
import { askToto, type Turn } from "@/lib/toto";
import { voiceAllowed } from "@/lib/voice";

export const maxDuration = 60;
// ElevenLabs calls from the US and the model is answered there too, so replies are written in the US. The
// London database checks run alongside the model, so the distance to them costs nothing.
export const preferredRegion = "iad1";

/* Toto's brain for live voice calls. ElevenLabs runs the call and asks this endpoint for each reply, in the
   OpenAI Chat Completions format, streamed. It is not for browsers: it only answers requests carrying the
   secret that ElevenLabs holds, and every request must carry the signed ticket made when the call started.
   Limits are checked on every turn; when the call's allowance is used up Toto says so and ends the call. */

type Msg = { role?: string; content?: unknown };

const ARRIVED = "(Not the visitor's words: the call has just reconnected because you moved them to this page. Open with one short sentence about what they are now looking at, then carry the conversation on from where it was. Do not greet them again.)";

const LIMITS = { sessionMessages: 30, sessionMessagesKnown: 100, ipHour: 40, ipDay: 80, siteDay: 1500, monthlyUsd: Number(process.env.CHAT_MONTHLY_CAP_USD ?? 40) };

function text(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((p) => (typeof p === "string" ? p : typeof p?.text === "string" ? p.text : "")).join("");
  return "";
}

function authorised(request: Request): boolean {
  const want = CALL.llmSecret;
  const got = (request.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return Boolean(want) && want.length === got.length && timingSafeEqual(Buffer.from(want), Buffer.from(got));
}

export async function POST(request: Request) {
  const t0 = Date.now();
  if (!authorised(request)) return new Response("Not allowed", { status: 401 });
  let body: { messages?: Msg[]; model?: string };
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid request", { status: 400 });
  }
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const system = messages.filter((m) => m.role === "system").map((m) => text(m.content)).join("\n");
  const t = readTicket(/ticket=([A-Za-z0-9_.-]+)/.exec(system)?.[1] ?? "", true);
  if (!t) return new Response("No call", { status: 403 });

  // The chat so far, if the visitor typed before starting the call, so Toto carries on rather than starting over.
  // It comes from the browser, as typed history does on /api/chat, and is held to the same limits.
  const earlier: Msg[] = [];
  try {
    const raw = /before=([A-Za-z0-9_-]+)/.exec(system)?.[1];
    if (raw) for (const m of (JSON.parse(Buffer.from(raw, "base64url").toString()) as Msg[]).slice(-12)) if (m && typeof m === "object") earlier.push(m);
  } catch {
    // ignore a bad history; the call carries on without it
  }
  // Visitor and Toto turns only, alternating, starting and ending with the visitor.
  const turns: Turn[] = [];
  for (const m of [...earlier, ...messages].slice(-44)) {
    const role = m.role === "user" ? "user" : m.role === "assistant" ? "assistant" : null;
    let said = text(m.content).trim().slice(0, 1200);
    // Sent by the browser when a call reconnects after moving the visitor to another page.
    if (role === "user" && said === "[arrived]") said = ARRIVED;
    if (!role || !said) continue;
    if (turns.length && turns[turns.length - 1].role === role) turns[turns.length - 1] = { role, text: `${turns[turns.length - 1].text} ${said}` };
    else turns.push({ role, text: said });
  }
  while (turns.length && turns[0].role !== "user") turns.shift();

  const encoder = new TextEncoder();
  const created = Math.floor(Date.now() / 1000);
  const chunk = (delta: Record<string, unknown>, finish: string | null = null) =>
    encoder.encode(`data: ${JSON.stringify({ id: `toto-${t.c}`, object: "chat.completion.chunk", created, model: "toto", choices: [{ index: 0, delta, finish_reason: finish }] })}\n\n`);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let open = true;
      const send = (b: Uint8Array) => {
        if (!open) return;
        try {
          controller.enqueue(b);
        } catch {
          open = false; // the visitor cut in and ElevenLabs dropped this reply
        }
      };
      let tool = 0;
      const callTool = (name: string, args: Record<string, unknown>) =>
        send(chunk({ tool_calls: [{ index: tool++, id: `call_${t.c.slice(0, 8)}_${tool}`, type: "function", function: { name, arguments: JSON.stringify(args) } }] }));
      const goodbye = (line: string) => {
        send(chunk({ role: "assistant", content: line }));
        callTool("end_call", { reason: "allowance", message: "" });
      };
      try {
        type Pre = { session_messages: number; known: boolean; ip_hour: number; ip_day: number; site_day: number; month_cost: number };
        const question = turns.length && turns[turns.length - 1].role === "user" ? turns[turns.length - 1].text : "";
        // The reply is started straight away and the limit checks run alongside it, so they add no delay. Nothing
        // is passed on to the call until the checks have cleared; if they fail, the reply is never heard.
        let cleared = false;
        let held: string[] = [];
        let first = true;
        let tFirst = 0;
        const forward = (delta: string) => {
          if (first) tFirst = Date.now();
          send(chunk(first ? { role: "assistant", content: delta } : { content: delta }));
          first = false;
        };
        const reply = question && Date.now() <= t.x
          ? askToto(turns, t.p, t.k === 1, (delta) => { if (cleared) forward(delta); else held.push(delta); }, { call: true, ...(t.m ? { model: "claude-haiku-5-5" } : {}) })
          : null;
        reply?.catch(() => {}); // handled below
        // Bill the call up to now, and check every limit.
        const [, voice, pre] = await Promise.all([
          rpc("call_tick", { p_call: t.c, p_rate: CALL.perSecond, p_end: false }),
          voiceAllowed(t.s, t.i),
          rpc<Pre>("chat_precheck", { p_session: t.s, p_ip: t.i }),
        ]);
        const tChecked = Date.now();
        const overMessages = Number(pre.month_cost) >= LIMITS.monthlyUsd || pre.site_day >= LIMITS.siteDay || pre.ip_hour >= LIMITS.ipHour || pre.ip_day >= LIMITS.ipDay || pre.session_messages >= (pre.known ? LIMITS.sessionMessagesKnown : LIMITS.sessionMessages);
        if (Date.now() > t.x || !voice.allow) {
          const known = voice.allow ? voice.check.known : !("gate" in voice && voice.gate);
          goodbye(known || t.k
            ? "That is all the call time I have for today, so I will stop here. You can keep typing to me in the chat, or use the request form."
            : "That is the end of the free call. If you leave your name and email in the chat, we can carry on talking.");
        } else if (!reply) {
          send(chunk({ role: "assistant", content: "" }));
        } else if (overMessages) {
          goodbye("I have to stop here for now. The request form still works, and Ben reads every one.");
        } else {
          cleared = true;
          const early = held; held = [];
          for (const d of early) forward(d);
          const out = await reply;
          console.log(JSON.stringify({ voiceLlm: { checks: tChecked - t0, firstWords: tFirst ? tFirst - t0 : null, done: Date.now() - t0, turns: turns.length, tokensIn: out.inputTokens, cost: Number(out.cost.toFixed(5)), fast: Boolean(t.m), from: request.headers.get("x-vercel-ip-country") } }));
          if (first) send(chunk({ role: "assistant", content: out.reply }));
          // Page actions are carried out by the browser, through the call's client tool.
          for (const a of out.actions) if (a.type !== "report") callTool("site_action", { action: JSON.stringify(a) });
          await rpc("chat_log_turn", {
            p_session: t.s, p_ip: t.i, p_page: t.p, p_user: question === ARRIVED ? "(arrived on the page)" : question, p_reply: out.reply.replace(/\[[a-z][a-z ]{1,20}\]\s*/gi, "").trim(),
            p_actions: out.actions.length ? out.actions : null,
            p_in: out.inputTokens, p_out: out.outputTokens, p_cost: out.cost, p_name: out.name, p_email: out.email,
          });
        }
        send(chunk({}, tool ? "tool_calls" : "stop"));
        send(encoder.encode("data: [DONE]\n\n"));
      } catch (e) {
        console.error("voice/llm: failed", e);
        send(chunk({ role: "assistant", content: "Sorry, I lost my train of thought there. Could you say that again?" }));
        send(chunk({}, "stop"));
        send(encoder.encode("data: [DONE]\n\n"));
      } finally {
        try {
          controller.close();
        } catch {
          // already gone
        }
      }
    },
  });
  return new Response(stream, { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store, no-transform", "x-accel-buffering": "no" } });
}
