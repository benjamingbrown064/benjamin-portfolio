// Vercel BotID for the plain-HTML pages: tags the requests that start a call so the server can tell people from scripts.
import { initBotId } from "botid/client/core";
initBotId({ protect: [{ path: "/api/voice/call", method: "POST" }, { path: "/api/visitor/code", method: "POST" }] });
