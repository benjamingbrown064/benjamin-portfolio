"use client";

import { useEffect } from "react";
import { PacificClock } from "@/components/PacificClock";
import { useDesktop } from "./DesktopContext";

export function MenuBar() {
  const { menu, setMenu, closeFocused, closeAll, cleanUp, openWindow, focused } =
    useDesktop();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (menu) setMenu(null);
        else if (focused) closeFocused();
      }
    }
    function onPointer() {
      setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [closeFocused, focused, menu, setMenu]);

  return (
    <header className="os-menubar">
      <div className="os-menubar-left">
        <span className="os-wordmark">Benjamin Brown</span>
        <div className="os-menus" onPointerDown={(e) => e.stopPropagation()}>
          <div className={`os-menu${menu === "file" ? " is-open" : ""}`}>
            <button type="button" onClick={() => setMenu(menu === "file" ? null : "file")}>
              File
            </button>
            {menu === "file" && (
              <div className="os-menu-list" role="menu">
                <button type="button" role="menuitem" onClick={closeFocused} disabled={!focused}>
                  Close Window
                </button>
                <button type="button" role="menuitem" onClick={closeAll}>
                  Close All
                </button>
                <hr />
                <button type="button" role="menuitem" disabled>
                  Log Out
                </button>
              </div>
            )}
          </div>
          <div className={`os-menu${menu === "view" ? " is-open" : ""}`}>
            <button type="button" onClick={() => setMenu(menu === "view" ? null : "view")}>
              View
            </button>
            {menu === "view" && (
              <div className="os-menu-list" role="menu">
                <button type="button" role="menuitem" disabled>
                  as Icons
                </button>
                <button type="button" role="menuitem" disabled>
                  as List
                </button>
                <hr />
                <button type="button" role="menuitem" onClick={cleanUp}>
                  Clean Up
                </button>
                <button type="button" role="menuitem" onClick={() => openWindow("notes")}>
                  Notes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PacificClock hour12 className="os-menubar-clock" />
    </header>
  );
}
