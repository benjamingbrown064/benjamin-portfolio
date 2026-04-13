import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { getAllPosts, BLOG_CATEGORIES, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Build Log",
  description: "Daily posts documenting the build of every product. Written in Benjamin's voice — direct, confident, practical.",
  openGraph: {
    title: "The Build Log — Benjamin Brown",
    description: "Daily posts documenting the build of every product.",
    url: `${SITE.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 md:pt-20">
        {/* Header */}
        <section className="py-16 md:py-24 border-b border-[#E8E8E3]">
          <div className="site-container">
            <div className="flex items-center justify-between mb-2">
              <span className="section-num">007</span>
              <span className="tag-label">/BLOG</span>
            </div>
            <h1 className="font-serif font-black text-5xl md:text-7xl uppercase tracking-[-0.04em] text-black leading-none mt-8 mb-6">
              The Build Log
            </h1>
            <p className="font-sans text-lg text-[#666666] max-w-[480px]">
              Daily posts documenting the build of every product — the decisions, the failures, and the lessons.
            </p>
          </div>
        </section>

        {/* Category filters */}
        <section className="border-b border-[#E8E8E3] py-4 overflow-x-auto">
          <div className="site-container flex items-center gap-6 min-w-max">
            <Link
              href="/blog"
              className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-black border-b border-black pb-0.5"
            >
              All
            </Link>
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999] hover:text-black transition-colors duration-200"
              >
                /{cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Post grid */}
        <section className="py-16 md:py-20">
          <div className="site-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-t border-[#E8E8E3] pt-6 hover:border-black transition-colors duration-300"
    >
      <span className="tag-label block mb-3">/{post.category}</span>
      <h2 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mb-3 group-hover:text-[#333333] transition-colors duration-200 leading-snug">
        {post.title}
      </h2>
      <p className="font-sans text-sm text-[#666666] leading-relaxed line-clamp-3 mb-5">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs text-[#999999]">{formatDate(post.date)}</span>
          <span className="font-sans text-xs text-[#BFBFBA]">·</span>
          <span className="font-sans text-xs text-[#999999]">{post.readTime} min read</span>
        </div>
        <span className="font-sans text-xs font-medium tracking-[0.08em] uppercase text-black group-hover:text-[#666666] transition-colors duration-200">
          Read →
        </span>
      </div>
    </Link>
  );
}
