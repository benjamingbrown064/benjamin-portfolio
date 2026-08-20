"use client";

import { COSTA_MESA } from "@/lib/desktop";
import { DesktopProvider } from "./DesktopContext";
import { MenuBar } from "./MenuBar";
import { DesktopIcons } from "./DesktopIcons";
import { Dock } from "./Dock";
import { OpenWindows } from "./windowContents";

function BeachMark() {
  return (
    <svg className="os-beach" viewBox="0 0 220 120" aria-hidden="true">
      <path d="M8 88c36-18 70-8 104-18 28-8 52-22 100-14" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M148 86v-28h22v28" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M144 58h30" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M159 58v-16" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M48 96v-34" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M48 64c-16-10-14-24-4-22 2 8 10 12 4 22z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M48 64c16-10 14-24 4-22-2 8-10 12-4 22z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M86 100v-40" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M86 62c-18-12-16-28-5-26 3 10 12 14 5 26z" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M86 62c18-12 16-28 5-26-3 10-12 14-5 26z" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function DesktopStage() {
  return (
    <div className="desktop-shell">
      <MenuBar />
      <div className="desktop-stage">
        <DesktopIcons />
        <OpenWindows />
        <div className="os-place">
          <BeachMark />
          <p>
            {COSTA_MESA.name}
            <br />
            {COSTA_MESA.coords}
          </p>
        </div>
        <Dock />
      </div>
    </div>
  );
}

export function Desktop() {
  return (
    <DesktopProvider>
      <DesktopStage />
    </DesktopProvider>
  );
}
