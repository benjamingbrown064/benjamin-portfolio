import type { SVGProps } from "react";

/** One stroke language for the whole site. Hairline on a 32 viewBox. */
export const STROKE = 1.25;

export type MarkName = "flag" | "tee" | "split" | "letter" | "canvas" | "arrow";

type MarkProps = SVGProps<SVGSVGElement> & {
  accent?: boolean;
};

function frame(props: SVGProps<SVGSVGElement>) {
  const { className, ...rest } = props;
  return {
    viewBox: "0 0 32 32",
    fill: "none",
    className: className ? `mark ${className}` : "mark",
    "aria-hidden": true as const,
    ...rest,
  };
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: STROKE,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Flag on a pin. Accent fills the cloth once or twice — never as a theme. */
export function FlagMark({ accent = false, ...props }: MarkProps) {
  return (
    <svg {...frame(props)}>
      <path d="M9 4.5v23" {...stroke} />
      <path d="M6.5 27.5h5" {...stroke} />
      <path
        d="M9 5.5h13.5l-3.4 4.4 3.4 4.4H9"
        {...stroke}
        fill={accent ? "var(--flag)" : "none"}
      />
    </svg>
  );
}

/** A tee. The idea, not a sport. */
export function TeeMark(props: MarkProps) {
  return (
    <svg {...frame(props)}>
      <path d="M10.5 7.5h11" {...stroke} />
      <path d="M12 7.5c.4 2.4 1.6 5.2 4 8.6" {...stroke} />
      <path d="M20 7.5c-.4 2.4-1.6 5.2-4 8.6" {...stroke} />
      <path d="M16 16.1v10.4" {...stroke} />
    </svg>
  );
}

/** An 80/20 split. The short arc is the twenty percent. */
export function SplitMark(props: MarkProps) {
  return (
    <svg {...frame(props)}>
      <circle cx="16" cy="16" r="10" {...stroke} />
      <path d="M16 6v10L25.5 12.9" {...stroke} />
    </svg>
  );
}

/** A letter that has landed. */
export function LetterMark(props: MarkProps) {
  return (
    <svg {...frame(props)}>
      <rect x="6" y="7.5" width="20" height="13" {...stroke} />
      <path d="M6 7.5l10 7 10-7" {...stroke} />
      <path d="M9 25.5h14" {...stroke} />
      <path d="M12 28h8" {...stroke} />
    </svg>
  );
}

/** A canvas with one stroke of paint. */
export function CanvasMark(props: MarkProps) {
  return (
    <svg {...frame(props)}>
      <rect x="7" y="6" width="18" height="14.5" {...stroke} />
      <path d="M10.5 16.5c2.8-5.2 6.2-1.4 9.2-7.2" {...stroke} />
    </svg>
  );
}

export function ArrowMark(props: MarkProps) {
  return (
    <svg {...frame(props)}>
      <path d="M5.5 16h21" {...stroke} />
      <path d="M20.5 9.5L26.5 16l-6 6.5" {...stroke} />
    </svg>
  );
}

const MARKS = {
  flag: FlagMark,
  tee: TeeMark,
  split: SplitMark,
  letter: LetterMark,
  canvas: CanvasMark,
  arrow: ArrowMark,
};

export function Mark({
  name,
  accent,
  className,
}: {
  name: MarkName;
  accent?: boolean;
  className?: string;
}) {
  const Cmp = MARKS[name];
  return <Cmp accent={accent} className={className} />;
}
