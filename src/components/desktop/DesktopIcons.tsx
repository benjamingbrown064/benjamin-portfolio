"use client";

import { DESKTOP_FILES } from "@/lib/desktop";
import { FileGlyph } from "./icons";
import { useDesktop } from "./DesktopContext";

export function DesktopIcons() {
  const { selectedIcon, setSelectedIcon, openWindow } = useDesktop();

  return (
    <ul className="os-icons">
      {DESKTOP_FILES.map((file) => (
        <li key={file.id}>
          <button
            type="button"
            className={`os-icon${selectedIcon === file.id ? " is-selected" : ""}`}
            onClick={() => {
              setSelectedIcon(file.id);
              openWindow(file.id);
            }}
          >
            <span className="os-icon-tile" style={{ background: file.color }}>
              <FileGlyph name={file.icon} />
            </span>
            <span className="os-icon-label">{file.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
