"use client";

import { MailGlyph, MessagesGlyph, NotesGlyph, PhoneGlyph } from "./icons";
import { useDesktop } from "./DesktopContext";

export function Dock() {
  const { openWindow } = useDesktop();

  return (
    <nav className="os-dock" aria-label="Dock">
      <button type="button" onClick={() => openWindow("notes")}>
        <span className="os-dock-icon notes">
          <NotesGlyph />
        </span>
        <span className="os-dock-label">Notes</span>
      </button>
      <button type="button" onClick={() => openWindow("messages")}>
        <span className="os-dock-icon messages">
          <MessagesGlyph />
        </span>
        <span className="os-dock-label">Messages</span>
      </button>
      <button type="button" onClick={() => openWindow("whatsapp")}>
        <span className="os-dock-icon whatsapp">
          <PhoneGlyph />
        </span>
        <span className="os-dock-label">WhatsApp</span>
      </button>
      <button type="button" onClick={() => openWindow("mail")}>
        <span className="os-dock-icon mail">
          <MailGlyph />
        </span>
        <span className="os-dock-label">Mail</span>
      </button>
    </nav>
  );
}
