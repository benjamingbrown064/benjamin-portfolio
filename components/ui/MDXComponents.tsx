import { ReactNode } from "react";

// Custom MDX components for styled rendering
export const MDXComponents = {
  h1: ({ children }: { children: ReactNode }) => (
    <h1 className="font-serif font-black text-3xl md:text-4xl uppercase tracking-[-0.03em] text-black mt-12 mb-6 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="font-serif font-bold text-2xl md:text-3xl uppercase tracking-[-0.02em] text-black mt-10 mb-5 leading-tight">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mt-8 mb-4">
      {children}
    </h3>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="font-sans text-base text-[#333333] leading-relaxed mb-5">
      {children}
    </p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="mb-5 space-y-2 pl-0">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="mb-5 space-y-2 pl-0 counter-reset-item">
      {children}
    </ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="font-sans text-base text-[#333333] leading-relaxed flex items-start gap-3">
      <span className="w-1.5 h-1.5 bg-[#BFBFBA] rounded-full flex-shrink-0 mt-2.5" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-black pl-6 my-8 py-1">
      <div className="font-serif font-bold text-xl md:text-2xl italic text-black leading-snug">
        {children}
      </div>
    </blockquote>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-black">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="font-mono text-sm bg-[#F5F5F0] text-[#333333] px-1.5 py-0.5 rounded">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-[#0D0D0D] text-[#E8E8E3] p-6 overflow-x-auto font-mono text-sm leading-relaxed my-6">
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="border-t border-[#E8E8E3] my-10" />
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-black underline underline-offset-2 decoration-[#BFBFBA] hover:decoration-black transition-colors duration-200"
    >
      {children}
    </a>
  ),
};
