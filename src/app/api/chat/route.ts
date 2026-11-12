import { NextResponse } from "next/server";
import { rpc } from "@/lib/db";
import { fail, guard, str } from "@/lib/guard";
import { askToto, type Turn } from "@/lib/toto";

export const maxDuration = 30;

const LIMITS = {
  sessionMessages: 30, // per conversation, before the visitor has left an email
  sessionMessagesKnown: 100, // once they have
  ipHour: 40,
  ipDay: 80,
  siteDay: 1500,
  monthlyUsd: Number(process.env.CHAT_MONTHLY_CAP_USD ?? 40),
  messageChars: 1200,
  historyTurns: 16,
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type Precheck = { session_messages: number; ip_hour: number; ip_day: number; site_day: number; month_cost: number };

function limited(reply: string) {
  return NextResponse.json({ ok: true, limited: true, reply, actions: [] });
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return fail(503, "The assistant is not connected yet.");
  const g = await guard(request, { maxBytes: 40_000 });
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
    const known = Boolean(str(g.body.known, 5));
    if (Number(pre.month_cost) >= LIMITS.monthlyUsd || pre.site_day >= LIMITS.siteDay) {
      return limited("I am at my limit for now. The request form still works, and Ben reads every one. You can also email hello@benjaminbrown.co.");
    }
    if (pre.ip_hour >= LIMITS.ipHour || pre.ip_day >= LIMITS.ipDay) {
      return limited("That is as much as I can do for today. The request form is the best next step, or email hello@benjaminbrown.co.");
    }
    if (pre.session_messages >= (known ? LIMITS.sessionMessagesKnown : LIMITS.sessionMessages)) {
      return limited("We have covered a lot. The best next step is the request form, or a coffee with Ben. Both are on the Let’s talk page.");
    }

    const out = await askToto(turns, page);
    await rpc("chat_log_turn", {
      p_session: session, p_ip: g.ip, p_page: page, p_user: question, p_reply: out.reply,
      p_actions: out.actions.length ? out.actions : null,
      p_in: out.inputTokens, p_out: out.outputTokens, p_cost: out.cost, p_name: out.name, p_email: out.email,
    });
    return NextResponse.json({ ok: true, reply: out.reply, actions: out.actions, known: Boolean(out.email) || undefined });
  } catch (e) {
    console.error("chat: failed", e);
    return fail(502, "I could not answer that just now. Please try again, or use the request form.");
  }
}
