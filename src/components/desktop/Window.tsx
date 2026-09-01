"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useDesktop, type WindowId } from "./DesktopContext";

type WindowProps = {
  id: WindowId;
  title: string;
  width?: number;
  children: ReactNode;
};

export function Window({ id, title, width = 520, children }: WindowProps) {
  const { open, focused, focusWindow, closeWindow, moveWindow } = useDesktop();
  const win = open.find((item) => item.id === id);
  const drag = useRef<{ ox: number; oy: number; sx: number; sy: number } | null>(null);

  if (!win) return null;

  function onDragStart(e: PointerEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    focusWindow(id);
    drag.current = { ox: e.clientX, oy: e.clientY, sx: win!.x, sy: win!.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onDragMove(e: PointerEvent<HTMLElement>) {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.ox;
    const dy = e.clientY - drag.current.oy;
    const x = Math.max(8, drag.current.sx + dx);
    const y = Math.max(32, drag.current.sy + dy);
    moveWindow(id, x, y);
  }

  function onDragEnd() {
    drag.current = null;
  }

  const isFocused = focused === id;

  return (
    <div
      role="dialog"
      aria-labelledby={`${id}-title`}
      className={`os-window${isFocused ? " is-focused" : ""}`}
      style={{ left: win.x, top: win.y, zIndex: win.z, width }}
      onPointerDown={() => focusWindow(id)}
    >
      <header
        className="os-titlebar"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <div className="os-lights">
          <button
            type="button"
            className="os-light close"
            aria-label={`Close ${title}`}
            onClick={() => closeWindow(id)}
          />
          <span className="os-light idle" aria-hidden="true" />
          <span className="os-light idle" aria-hidden="true" />
        </div>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      <div className="os-window-body">{children}</div>
    </div>
  );
}
