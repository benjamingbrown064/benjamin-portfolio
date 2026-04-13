import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { MDXComponents } from "@/components/ui/MDXComponents";
import { getPostBySlug, getAllSlugs, getRelatedPosts, formatDate } from "@/lib/blog";
import { SITE } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Benjamin Brown`,
      description: post.excerpt,
      url: `${SITE.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category, 3);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 md:pt-20">

        {/* Article header */}
        <header className="py-16 md:py-24 border-b border-[#E8E8E3]">
          <div className="site-container">
            {/* Breadcrumb */}
            <div className="flex items-center gap-4 mb-10">
              <Link
                href="/blog"
                className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999] hover:text-black transition-colors duration-200"
              >
                ← The Build Log
              </Link>
              <span className="text-[#E8E8E3]">/</span>
              <span className="tag-label">/{post.category}</span>
            </div>

            {/* Title */}
            <h1 className="font-serif font-black text-4xl md:text-6xl uppercase tracking-[-0.04em] text-black leading-none mb-8 max-w-[800px]">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-6">
              <span className="font-sans text-sm text-[#999999]">
                {formatDate(post.date)}
              </span>
              <span className="font-sans text-sm text-[#BFBFBA]">·</span>
              <span className="font-sans text-sm text-[#999999]">
                {post.readTime} min read
              </span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="py-16 md:py-20">
          <div className="site-container">
            <div className="max-w-[720px]">
              {/* Excerpt */}
              <p className="font-serif font-bold text-xl md:text-2xl italic text-[#333333] leading-snug mb-12 pb-12 border-b border-[#E8E8E3]">
                {post.excerpt}
              </p>

              {/* MDX content */}
              <div className="prose-content">
                <MDXRemote source={post.content} components={MDXComponents} />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-[#E8E8E3] flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 bg-[#F5F5F0] font-sans text-xs font-medium text-[#666666] border border-[#E8E8E3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share / copy link */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999]">
                  Share
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${SITE.url}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200"
                >
                  Twitter / X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE.url}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* More Posts */}
        {related.length > 0 && (
          <section className="py-16 md:py-20 border-t border-[#E8E8E3] bg-[#F5F5F0]">
            <div className="site-container">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-serif font-bold text-2xl uppercase tracking-[-0.02em] text-black">
                  More Posts
                </h2>
                <Link
                  href="/blog"
                  className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200"
                >
                  All Posts →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group block border-t border-[#E8E8E3] pt-6 hover:border-black transition-colors duration-300"
                  >
                    <span className="tag-label block mb-3">/{p.category}</span>
                    <h3 className="font-serif font-bold text-lg uppercase tracking-[-0.02em] text-black mb-2 group-hover:text-[#333333] transition-colors duration-200 leading-snug">
                      {p.title}
                    </h3>
                    <p className="font-sans text-xs text-[#999999]">
                      {formatDate(p.date)} · {p.readTime} min
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
