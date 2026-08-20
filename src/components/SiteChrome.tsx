import type { ReactNode } from "react";
import Link from "next/link";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-chrome">
      <header className="site-chrome-bar">
        <Link href="/">Desktop</Link>
        <span>Benjamin Brown</span>
      </header>
      {children}
    </div>
  );
}
