"use client";

import { useState, type ReactNode } from "react";
import {
  ETHOS_PASSAGES,
  FLAG_STATEMENT,
  GOLF_LINE,
  IDENTITY_LINE,
  IDENTITY_NAME,
  IDENTITY_PLACE,
} from "@/lib/ethos";
import {
  DESKTOP_FILES,
  MAIL_TO,
  PHONE_DISPLAY,
  PHONE_SMS,
  WHATSAPP_URL,
  type DesktopFile,
} from "@/lib/desktop";
import { PacificClock } from "@/components/PacificClock";
import { FileGlyph, MailGlyph, MessagesGlyph, NotesGlyph, PhoneGlyph } from "@/components/desktop/icons";

type Screen = "home" | "notes" | "messages" | DesktopFile["id"];

export function MobileHome() {
  const [screen, setScreen] = useState<Screen>("home");
  const file = DESKTOP_FILES.find((item) => item.id === screen);

  return (
    <div className="ios-shell">
      <header className="ios-status">
        <span>Benjamin Brown</span>
        <PacificClock hour12 />
      </header>

      {screen === "home" ? (
        <main className="ios-home">
          <p className="ios-place">
            {IDENTITY_NAME} · {IDENTITY_PLACE}
          </p>
          <section className="ios-group" aria-label="Notes">
            <button type="button" className="ios-row" onClick={() => setScreen("notes")}>
              <span className="ios-row-icon notes">
                <NotesGlyph />
              </span>
              <span className="ios-row-copy">
                <strong>Notes</strong>
                <small>The flag, and his words</small>
              </span>
              <span className="ios-chevron" aria-hidden="true">
                ›
              </span>
            </button>
          </section>

          <section className="ios-group" aria-label="Files">
            {DESKTOP_FILES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="ios-row"
                onClick={() => setScreen(item.id)}
              >
                <span className="ios-row-icon" style={{ background: item.color }}>
                  <FileGlyph name={item.icon} />
                </span>
                <span className="ios-row-copy">
                  <strong>{item.title}</strong>
                  <small>{item.kind}</small>
                </span>
                <span className="ios-chevron" aria-hidden="true">
                  ›
                </span>
              </button>
            ))}
          </section>

          <section className="ios-group" aria-label="Talk">
            <a className="ios-row" href={`mailto:${MAIL_TO}`}>
              <span className="ios-row-icon mail">
                <MailGlyph />
              </span>
              <span className="ios-row-copy">
                <strong>Mail</strong>
                <small>{MAIL_TO}</small>
              </span>
            </a>
            <button type="button" className="ios-row" onClick={() => setScreen("messages")}>
              <span className="ios-row-icon messages">
                <MessagesGlyph />
              </span>
              <span className="ios-row-copy">
                <strong>Messages</strong>
                <small>{PHONE_DISPLAY}</small>
              </span>
              <span className="ios-chevron" aria-hidden="true">
                ›
              </span>
            </button>
            <a className="ios-row" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span className="ios-row-icon whatsapp">
                <PhoneGlyph />
              </span>
              <span className="ios-row-copy">
                <strong>WhatsApp</strong>
                <small>{PHONE_DISPLAY}</small>
              </span>
            </a>
          </section>
        </main>
      ) : null}

      {screen === "notes" ? (
        <MobileSheet title="Notes" onBack={() => setScreen("home")}>
          <article className="notes-copy">
            <p className="notes-kicker">
              {IDENTITY_NAME}
              <br />
              {IDENTITY_PLACE}
            </p>
            <p>{IDENTITY_LINE}</p>
            <p>{GOLF_LINE}</p>
            <p>{FLAG_STATEMENT}</p>
            {ETHOS_PASSAGES.map((passage) => (
              <p key={passage.mark}>{passage.text}</p>
            ))}
          </article>
        </MobileSheet>
      ) : null}

      {file ? (
        <MobileSheet title={file.title} onBack={() => setScreen("home")}>
          <div className="finder-copy">
            <p className="finder-kind">{file.kind}</p>
            <p>{file.text}</p>
            <ul className="finder-links">
              {file.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </MobileSheet>
      ) : null}

      {screen === "messages" ? (
        <MobileSheet title="Messages" onBack={() => setScreen("home")}>
          <div className="finder-copy">
            <p>Text Ben at {PHONE_DISPLAY}, or email if that’s easier.</p>
            <ul className="finder-links">
              <li>
                <a href={PHONE_SMS}>Open Messages</a>
              </li>
              <li>
                <a href={`mailto:${MAIL_TO}`}>Email {MAIL_TO}</a>
              </li>
            </ul>
          </div>
        </MobileSheet>
      ) : null}
    </div>
  );
}

function MobileSheet({
  title,
  onBack,
  children,
}: {
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <main className="ios-sheet">
      <button type="button" className="ios-back" onClick={onBack}>
        ‹ Home
      </button>
      <h1>{title}</h1>
      {children}
    </main>
  );
}
