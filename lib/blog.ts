import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  featuredImage?: string;
  tags: string[];
  readTime: number;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  
  const posts = files.map((filename) => {
    const slug = filename.replace(".mdx", "");
    const rawFile = fs.readFileSync(path.join(BLOG_DIR, filename), "utf-8");
    const { data, content } = matter(rawFile);
    
    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "BUILDING",
      excerpt: data.excerpt || "",
      featuredImage: data.featuredImage,
      tags: data.tags || [],
      readTime: data.readTime || 5,
      content,
    } as BlogPost;
  });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  
  const rawFile = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawFile);
  
  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    category: data.category || "BUILDING",
    excerpt: data.excerpt || "",
    featuredImage: data.featuredImage,
    tags: data.tags || [],
    readTime: data.readTime || 5,
    content,
  };
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  const all = getAllPosts();
  const related = all.filter(
    (p) => p.slug !== currentSlug && p.category === category
  );
  const others = all.filter(
    (p) => p.slug !== currentSlug && p.category !== category
  );
  return [...related, ...others].slice(0, limit);
}

export const BLOG_CATEGORIES = ["BUILDING", "AI", "STRATEGY", "LESSONS"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
