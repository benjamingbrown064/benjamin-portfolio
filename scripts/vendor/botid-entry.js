// Vercel BotID for the plain-HTML pages: tags the requests that start a call so the server can tell people from scripts.
import { initBotId } from "botid/client/core";
initBotId({
  protect: ["/api/voice/call", "/api/visitor/code", "/api/requests", "/api/discovery", "/api/bookings", "/api/subscribe", "/api/brief"].map((path) => ({ path, method: "POST" })),
});
