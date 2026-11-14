import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { insert, rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { askToto, type Action, type TotoResult, type Turn } from "@/lib/toto";
import { VOICE, sayChunker, signSay, type Sayable } from "@/lib/voice";

export const maxDuration = 60;

const LIMITS = {
  sessionMessages: 30, // per conversation, before the visitor has left an email
  sessionMessagesKnown: 100, // once they have
  ipHour: 40,
  ipDay: 80,
  siteDay: 1500,
  monthlyUsd: Number(process.env.CHAT_MONTHLY_CAP_USD ?? 40),
  messageChars: 1200,
  historyTurns: 44, // long enough to hold a whole discovery conversation
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Precheck = { session_messages: number; known: boolean; name: string | null; email: string | null; reports: number; ip_hour: number; ip_day: number; site_day: number; month_cost: number };

function limited(reply: string) {
  return NextResponse.json({ ok: true, limited: true, reply, actions: [] });
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return fail(503, "The assistant is not connected yet.");
  const g = await guard(request, { maxBytes: 70_000 });
  if (!g.ok) return g.response;

  const session = str(g.body.session, 40);
  if (!session || !UUID_RE.test(session)) return fail(400, "Invalid session.");
  const page = (str(g.body.page, 80) ?? "/").replace(/[^a-z0-9/_-]/gi, "") || "/";

  const raw = Array.isArray(g.body.messages) ? g.body.messages : [];
  const history: Turn[] = [];
  for (const m of raw.slice(-LIMITS.historyTurns)) {
    const role = (m as Turn)?.role;
    const text = str((m as Turn)?.text, LIMITS.messageChars);
    if ((role === "user" || role === "assistant") && text) history.push({ role, text });
  }
  // The model needs alternating turns that start and end with the visitor.
  while (history.length && history[0].role !== "user") history.shift();
  const turns: Turn[] = [];
  for (const t of history) {
    if (turns.length && turns[turns.length - 1].role === t.role) turns[turns.length - 1] = t;
    else turns.push(t);
  }
  if (!turns.length || turns[turns.length - 1].role !== "user") return fail(400, "Nothing to answer.");
  const question = turns[turns.length - 1].text;

  try {
    const pre = await rpc<Precheck>("chat_precheck", { p_session: session, p_ip: g.ip });
    if (Number(pre.month_cost) >= LIMITS.monthlyUsd || pre.site_day >= LIMITS.siteDay) {
      return limited("I am at my limit for now. The request form still works, and Ben reads every one. You can also email hello@benjaminbrown.co.");
    }
    if (pre.ip_hour >= LIMITS.ipHour || pre.ip_day >= LIMITS.ipDay) {
      return limited("That is as much as I can do for today. The request form is the best next step, or email hello@benjaminbrown.co.");
    }
    if (!pre.known && pre.session_messages >= LIMITS.sessionMessages) {
      // Ask once: the visitor leaves a name and email and the conversation carries on.
      return NextResponse.json({ ok: true, limited: true, gate: true, reply: "Happy to keep going. Leave your name and email below and we can carry on.", actions: [] });
    }
    if (pre.session_messages >= LIMITS.sessionMessagesKnown) {
      return limited("We have covered a lot. The best next step is the request form, or a coffee with Ben. Both are on the Let’s talk page.");
    }

    // Everything after the model has answered: the first-look report, the log, and the final reply.
    const finish = async (out: TotoResult) => {
      const actions: Action[] = [...out.actions];
      let reply = out.reply;

      // A first-look report is saved against the visitor's details, so those come first, and it is
      // limited to a few a day per visitor.
      if (out.report) {
        const email = out.email ?? pre.email;
        if (!email) {
          reply = "Before I put your first look together, what is your name and email? Then I can save it for you and Ben.";
        } else if (pre.reports >= 3) {
          reply = "I have already put together a few first looks for you today. The request form is the best next step from here.";
        } else {
          const ref = `BB-D-${randomBytes(3).toString("hex").toUpperCase()}`;
          await insert("discovery_submissions", {
            ref,
            journey: "conversation",
            name: out.name ?? pre.name,
            email,
            company: out.report.company,
            answers: { session, areas: out.report.areas, start: out.report.start, fit: out.report.fit },
            signals: Object.fromEntries(out.report.areas.map((a) => [a.n, a.signal])),
            summary: out.report.summary,
            ip_hash: g.ip,
          });
          actions.unshift({ type: "report", ref, report: out.report });
        }
      }
      const log = () =>
        rpc("chat_log_turn", {
          p_session: session, p_ip: g.ip, p_page: page, p_user: question, p_reply: reply,
          p_actions: actions.length ? actions : null,
          p_in: out.inputTokens, p_out: out.outputTokens, p_cost: out.cost, p_name: out.name, p_email: out.email,
        });
      return { reply, actions, known: pre.known || Boolean(out.email), log };
    };

    // The browser can ask for the reply as a stream, so the words show as they are written and, for a spoken
    // question, the voice can start on the first sentence. Lines are JSON, one per event:
    //   {t:"d",v}  more words · {t:"s",say}  a signed piece ready to be spoken · {t:"done",reply,actions,known,say?}
    if ((request.headers.get("accept") ?? "").includes("text/event-stream")) {
      const wantVoice = g.body.voice === true;
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          // If the visitor closes the page mid-reply the stream is gone, but the turn must still be finished and
          // logged, because the model has been paid for and the limits count on the log.
          let open = true;
          const send = (event: Record<string, unknown>) => {
            if (!open) return;
            try {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
            } catch {
              open = false;
            }
          };
          try {
            let streamed = "";
            const chunker = sayChunker(VOICE.maxSpeakChars);
            const out = await askToto(turns, page, pre.known, (delta) => {
              streamed += delta;
              send({ t: "d", v: delta });
              if (wantVoice) for (const piece of chunker.push(delta)) send({ t: "s", say: signSay(session, piece) });
            });
            if (wantVoice) for (const piece of chunker.end()) send({ t: "s", say: signSay(session, piece) });
            const done = await finish(out);
            // If the final reply is not what was streamed (a fallback line, or the report rules above), the
            // browser is given the right words to say instead.
            let say: Sayable[] | undefined;
            if (wantVoice && done.reply.trim() !== streamed.trim()) {
              const c = sayChunker(VOICE.maxSpeakChars);
              say = [...c.push(done.reply), ...c.end()].map((piece) => signSay(session, piece));
            }
            send({ t: "done", reply: done.reply, actions: done.actions, known: done.known, ...(say ? { say } : {}) });
            await done.log();
          } catch (e) {
            console.error("chat: stream failed", e);
            send({ t: "error", error: "I could not answer that just now. Please try again, or use the request form." });
          } finally {
            try {
              controller.close();
            } catch {
              // already closed by the browser going away
            }
          }
        },
      });
      return new Response(stream, { headers: { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store, no-transform", "x-accel-buffering": "no" } });
    }

    const done = await finish(await askToto(turns, page, pre.known));
    await done.log();
    return NextResponse.json({ ok: true, reply: done.reply, actions: done.actions, known: done.known });
  } catch (e) {
    console.error("chat: failed", e);
    return fail(502, "I could not answer that just now. Please try again, or use the request form.");
  }
}
