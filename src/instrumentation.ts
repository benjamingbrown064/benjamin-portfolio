// Error reporting (Sentry). Off until SENTRY_DSN is set in the hosting settings. Every failure the server already
// writes to its log with console.error is also sent to Sentry, so the routes do not each need to know about it.
// No visitor details are attached: this version of the SDK collects cookies, headers and request bodies unless
// told not to, so each of those is switched off below.
import * as Sentry from "@sentry/nextjs";

export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn || process.env.NEXT_RUNTIME !== "nodejs") return;
  Sentry.init({
    dsn,
    environment: process.env.VERCEL_ENV ?? "development",
    tracesSampleRate: 0,
    dataCollection: { userInfo: false, cookies: false, httpHeaders: false, httpBodies: [], urlQueryParams: false, genAI: { inputs: false, outputs: false }, databaseQueryData: false, stackFrameVariables: false },
    integrations: [Sentry.captureConsoleIntegration({ levels: ["error"] })],
  });
}

export const onRequestError = Sentry.captureRequestError;
