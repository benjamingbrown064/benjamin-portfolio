"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DesktopFileId } from "@/lib/desktop";

export type WindowId =
  | "notes"
  | "messages"
  | "mail"
  | "whatsapp"
  | DesktopFileId;

type OpenWindow = {
  id: WindowId;
  x: number;
  y: number;
  z: number;
};

type MenuName = "file" | "view" | null;

type DesktopContextValue = {
  open: OpenWindow[];
  focused: WindowId | null;
  selectedIcon: string | null;
  menu: MenuName;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  closeFocused: () => void;
  closeAll: () => void;
  focusWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, x: number, y: number) => void;
  setSelectedIcon: (id: string | null) => void;
  setMenu: (menu: MenuName) => void;
  cleanUp: () => void;
};

const DesktopContext = createContext<DesktopContextValue | null>(null);

const DEFAULTS: Record<string, { x: number; y: number }> = {
  notes: { x: 280, y: 56 },
  messages: { x: 340, y: 88 },
  mail: { x: 360, y: 100 },
  whatsapp: { x: 380, y: 112 },
  "love-warranty": { x: 250, y: 72 },
  warrantyos: { x: 270, y: 84 },
  govscape: { x: 290, y: 96 },
  zebi: { x: 310, y: 108 },
  wilbolaw: { x: 330, y: 120 },
  taskbox: { x: 350, y: 132 },
};

function nextZ(open: OpenWindow[]) {
  return open.reduce((max, win) => Math.max(max, win.z), 10) + 1;
}

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<OpenWindow[]>([
    { id: "notes", x: DEFAULTS.notes.x, y: DEFAULTS.notes.y, z: 20 },
  ]);
  const [focused, setFocused] = useState<WindowId | null>("notes");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [menu, setMenu] = useState<MenuName>(null);

  const openWindow = useCallback((id: WindowId) => {
    setOpen((current) => {
      const existing = current.find((win) => win.id === id);
      if (existing) {
        const z = nextZ(current);
        setFocused(id);
        return current.map((win) => (win.id === id ? { ...win, z } : win));
      }
      const pos = DEFAULTS[id] ?? { x: 300, y: 90 };
      const z = nextZ(current);
      setFocused(id);
      return [...current, { id, x: pos.x, y: pos.y, z }];
    });
    setMenu(null);
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setOpen((current) => {
      const next = current.filter((win) => win.id !== id);
      setFocused((prev) => {
        if (prev !== id) return prev;
        return next.at(-1)?.id ?? null;
      });
      return next;
    });
  }, []);

  const closeFocused = useCallback(() => {
    if (focused) closeWindow(focused);
    setMenu(null);
  }, [closeWindow, focused]);

  const closeAll = useCallback(() => {
    setOpen([]);
    setFocused(null);
    setMenu(null);
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setFocused(id);
    setOpen((current) => {
      const z = nextZ(current);
      return current.map((win) => (win.id === id ? { ...win, z } : win));
    });
    setMenu(null);
  }, []);

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setOpen((current) =>
      current.map((win) => (win.id === id ? { ...win, x, y } : win)),
    );
  }, []);

  const cleanUp = useCallback(() => {
    setOpen((current) =>
      current.map((win, index) => ({
        ...win,
        x: (DEFAULTS[win.id] ?? { x: 280, y: 56 }).x + index * 16,
        y: (DEFAULTS[win.id] ?? { x: 280, y: 56 }).y + index * 12,
      })),
    );
    setMenu(null);
  }, []);

  const value = useMemo(
    () => ({
      open,
      focused,
      selectedIcon,
      menu,
      openWindow,
      closeWindow,
      closeFocused,
      closeAll,
      focusWindow,
      moveWindow,
      setSelectedIcon,
      setMenu,
      cleanUp,
    }),
    [
      open,
      focused,
      selectedIcon,
      menu,
      openWindow,
      closeWindow,
      closeFocused,
      closeAll,
      focusWindow,
      moveWindow,
      cleanUp,
    ],
  );

  return <DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>;
}

export function useDesktop() {
  const ctx = useContext(DesktopContext);
  if (!ctx) throw new Error("useDesktop must be used inside DesktopProvider");
  return ctx;
}
