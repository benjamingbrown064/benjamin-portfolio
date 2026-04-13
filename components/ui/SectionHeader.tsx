"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  number: string;       // e.g. "001"
  tag: string;          // e.g. "/PORTFOLIO"
  className?: string;
}

export function SectionHeader({ number, tag, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-12", className)}>
      <span className="section-num">{number}</span>
      <span className="tag-label">{tag}</span>
    </div>
  );
}
