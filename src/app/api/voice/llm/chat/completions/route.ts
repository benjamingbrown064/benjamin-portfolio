import { timingSafeEqual } from "node:crypto";
import { rpc } from "@/lib/db";
import { CALL, readTicket } from "@/lib/call";
import { askToto, type Turn } from "@/lib/toto";
import { voiceAllowed } from "@/lib/voice";

export const maxDuration = 60;

/* Toto's brain for live voice calls. ElevenLabs runs the call and asks this endpoint for each reply, in the
   OpenAI Chat Completions format, streamed. It is not for browsers: it only answers requests carrying the
   secret that ElevenLabs holds, and every request must carry the signed ticket made when the call started.
   Limits are checked on every turn; when the call's allowance is used up Toto says so and ends the call. */

type Msg = { role?: string; content?: unknown };

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

  // Visitor and Toto turns only, alternating, starting and ending with the visitor.
  const turns: Turn[] = [];
  for (const m of messages.slice(-44)) {
    const role = m.role === "user" ? "user" : m.role === "assistant" ? "assistant" : null;
    const said = text(m.content).trim().slice(0, 1200);
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
        // Bill the call up to now, then check every limit before paying for a reply.
        await rpc("call_tick", { p_call: t.c, p_rate: CALL.perSecond, p_end: false });
        const voice = await voiceAllowed(t.s, t.i);
        if (Date.now() > t.x || !voice.allow) {
          const known = voice.allow ? voice.check.known : !("gate" in voice && voice.gate);
          goodbye(known || t.k
            ? "That is all the call time I have for today, so I will stop here. You can keep typing to me in the chat, or use the request form."
            : "That is the end of the free call. If you leave your name and email in the chat, we can carry on talking.");
        } else if (!turns.length || turns[turns.length - 1].role !== "user") {
          send(chunk({ role: "assistant", content: "" }));
        } else {
          const pre = await rpc<{ session_messages: number; known: boolean; ip_hour: number; ip_day: number; site_day: number; month_cost: number }>("chat_precheck", { p_session: t.s, p_ip: t.i });
          if (Number(pre.month_cost) >= LIMITS.monthlyUsd || pre.site_day >= LIMITS.siteDay || pre.ip_hour >= LIMITS.ipHour || pre.ip_day >= LIMITS.ipDay || pre.session_messages >= (pre.known ? LIMITS.sessionMessagesKnown : LIMITS.sessionMessages)) {
            goodbye("I have to stop here for now. The request form still works, and Ben reads every one.");
          } else {
            const question = turns[turns.length - 1].text;
            let first = true;
            const out = await askToto(turns, t.p, pre.known || t.k === 1, (delta) => {
              send(chunk(first ? { role: "assistant", content: delta } : { content: delta }));
              first = false;
            }, { call: true });
            if (first) send(chunk({ role: "assistant", content: out.reply }));
            // Page actions are carried out by the browser, through the call's client tool.
            for (const a of out.actions) if (a.type !== "report") callTool("site_action", { action: JSON.stringify(a) });
            await rpc("chat_log_turn", {
              p_session: t.s, p_ip: t.i, p_page: t.p, p_user: question, p_reply: out.reply,
              p_actions: out.actions.length ? out.actions : null,
              p_in: out.inputTokens, p_out: out.outputTokens, p_cost: out.cost, p_name: out.name, p_email: out.email,
            });
          }
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
