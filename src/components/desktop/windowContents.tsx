"use client";

import { useState } from "react";
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
import { Window } from "./Window";
import { useDesktop } from "./DesktopContext";

export function NotesWindow() {
  return (
    <Window id="notes" title="Notes" width={540}>
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
    </Window>
  );
}

export function ProjectWindow({ file }: { file: DesktopFile }) {
  return (
    <Window id={file.id} title={file.title} width={480}>
      <div className="finder-copy">
        <p className="finder-kind">{file.kind}</p>
        <p>{file.text}</p>
        <ul className="finder-links">
          {file.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                {link.label}
              </a>
            </li>
          ))}
          {file.caseStudy ? (
            <li>
              <a href={file.caseStudy}>Case study</a>
            </li>
          ) : null}
        </ul>
      </div>
    </Window>
  );
}

export function MessagesWindow() {
  const [body, setBody] = useState("");

  const smsHref = body
    ? `${PHONE_SMS}?body=${encodeURIComponent(body)}`
    : PHONE_SMS;
  const mailHref = `mailto:${MAIL_TO}?subject=${encodeURIComponent("Hello")}&body=${encodeURIComponent(body)}`;

  return (
    <Window id="messages" title="Messages" width={420}>
      <form
        className="compose"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = smsHref;
        }}
      >
        <p className="compose-to">
          To Ben · {PHONE_DISPLAY}
        </p>
        <label className="sr-only" htmlFor="message-body">
          Message
        </label>
        <textarea
          id="message-body"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message"
        />
        <div className="compose-actions">
          <button type="submit">Text</button>
          <a className="compose-alt" href={mailHref}>
            Email instead
          </a>
        </div>
      </form>
    </Window>
  );
}

export function MailWindow() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <Window id="mail" title="Mail" width={420}>
      <form
        className="compose"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = href;
        }}
      >
        <p className="compose-to">To {MAIL_TO}</p>
        <label className="sr-only" htmlFor="mail-subject">
          Subject
        </label>
        <input
          id="mail-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
        />
        <label className="sr-only" htmlFor="mail-body">
          Message
        </label>
        <textarea
          id="mail-body"
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a note"
        />
        <div className="compose-actions">
          <button type="submit">Open Mail</button>
        </div>
      </form>
    </Window>
  );
}

export function WhatsAppWindow() {
  return (
    <Window id="whatsapp" title="WhatsApp" width={360}>
      <div className="finder-copy">
        <p>A WhatsApp chat with Ben. This opens WhatsApp, not a fake inbox.</p>
        <ul className="finder-links">
          <li>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              wa.me/19498670232
            </a>
          </li>
        </ul>
      </div>
    </Window>
  );
}

export function OpenWindows() {
  const { open } = useDesktop();
  const ids = new Set(open.map((win) => win.id));

  return (
    <>
      {ids.has("notes") ? <NotesWindow /> : null}
      {ids.has("messages") ? <MessagesWindow /> : null}
      {ids.has("mail") ? <MailWindow /> : null}
      {ids.has("whatsapp") ? <WhatsAppWindow /> : null}
      {DESKTOP_FILES.filter((file) => ids.has(file.id)).map((file) => (
        <ProjectWindow key={file.id} file={file} />
      ))}
    </>
  );
}
