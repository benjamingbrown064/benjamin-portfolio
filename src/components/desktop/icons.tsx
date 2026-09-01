import type { FileIcon } from "@/lib/desktop";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FileGlyph({ name }: { name: FileIcon }) {
  switch (name) {
    case "heart":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path
            d="M16 25s-8.5-5.2-11-10.2C3.4 11.6 5 8 8.6 8c2.2 0 3.6 1.4 4.4 2.8C13.8 9.4 15.2 8 17.4 8 21 8 22.6 11.6 21 14.8 18.5 19.8 16 25 16 25z"
            {...stroke}
          />
        </svg>
      );
    case "w":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6.5 9.5l4.2 14 5.3-10.2 5.3 10.2 4.2-14" {...stroke} />
        </svg>
      );
    case "capitol":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 5.5v3" {...stroke} />
          <path d="M10 12.5c0-3.4 2.7-6 6-6s6 2.6 6 6" {...stroke} />
          <path d="M7.5 12.5h17" {...stroke} />
          <path d="M9 12.5v10M13.5 12.5v10M18.5 12.5v10M23 12.5v10" {...stroke} />
          <path d="M6 22.5h20" {...stroke} />
          <path d="M5 26.5h22" {...stroke} />
        </svg>
      );
    case "z":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M8 9.5h16L8 22.5h16" {...stroke} />
        </svg>
      );
    case "court":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 12.5h20L16 6.5 6 12.5z" {...stroke} />
          <path d="M9.5 12.5v10M16 12.5v10M22.5 12.5v10" {...stroke} />
          <path d="M6 22.5h20M5 26.5h22" {...stroke} />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="7" y="7" width="18" height="18" rx="3" {...stroke} />
          <path d="M11 16.2l3.4 3.3 6.8-7" {...stroke} />
        </svg>
      );
  }
}

export function NotesGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M9 7.5h14v18H9z" {...stroke} />
      <path d="M12 6.5v3M16 6.5v3M20 6.5v3" {...stroke} />
      <path d="M12 14.5h8M12 18.5h8M12 22.5h5" {...stroke} />
    </svg>
  );
}

export function MessagesGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M7 8.5h18v12H13l-6 4.5v-16.5z" {...stroke} />
      <path d="M12 14.5h.1M16 14.5h.1M20 14.5h.1" {...stroke} />
    </svg>
  );
}

export function PhoneGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M10 6.5h5l1.5 5-3 2c1.4 3 3.8 5.4 6.8 6.8l2-3 5 1.5v5c0 1.4-1.3 2.6-2.8 2.3C13.8 24.4 7.6 18.2 6.2 9.3 5.9 7.8 7.1 6.5 8.5 6.5H10z"
        {...stroke}
      />
    </svg>
  );
}

export function MailGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5.5" y="9" width="21" height="14" rx="1.5" {...stroke} />
      <path d="M6 10l10 7 10-7" {...stroke} />
    </svg>
  );
}
