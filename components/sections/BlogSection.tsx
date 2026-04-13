"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Seed post data — full MDX system built in Phase 5
const SEED_POSTS = [
  {
    slug: "why-i-build-in-public",
    title: "Why I Build In Public",
    category: "BUILDING",
    date: "Apr 2025",
    excerpt:
      "Building in the open isn't a marketing tactic. It's a commitment to accountability — to your audience, your customers, and yourself.",
  },
  {
    slug: "ai-wont-replace-builders",
    title: "AI Won't Replace Builders",
    category: "AI",
    date: "Mar 2025",
    excerpt:
      "The builders who understand their domain deeply, who know what good looks like, who can navigate the gap between what AI produces and what actually works — they become more valuable, not less.",
  },
  {
    slug: "from-idea-to-mvp-in-6-weeks",
    title: "From Idea to MVP in 6 Weeks",
    category: "BUILDING",
    date: "Feb 2025",
    excerpt:
      "Six weeks is not a long time. But it's long enough to build something real if you start with brutal clarity about what you're not building.",
  },
];

export function BlogSection() {
  return (
    <section
      id="blog"
      className="py-20 md:py-28 border-t border-[#E8E8E3]"
    >
      <div className="site-container">
        <SectionHeader number="007" tag="/BLOG" />

        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none">
            The Build Log
          </h2>
          <Link
            href="/blog"
            className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200 border-b border-[#E8E8E3] hover:border-black pb-1"
          >
            All Posts →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEED_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-t border-[#E8E8E3] pt-6 hover:border-black transition-colors duration-300"
            >
              <span className="tag-label block mb-3">/{post.category}</span>
              <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mb-3 group-hover:text-[#333333] transition-colors duration-200 leading-snug">
                {post.title}
              </h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed line-clamp-3 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-sans text-xs text-[#999999]">{post.date}</span>
                <span className="font-sans text-xs font-medium tracking-[0.08em] uppercase text-black group-hover:text-[#666666] transition-colors duration-200">
                  Read →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
