import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { getAppBySlug, getAdjacentApps, ALL_SLUGS } from "@/content/apps/index";
import { SITE } from "@/lib/constants";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const app = getAppBySlug(params.slug);
  if (!app) return {};
  return {
    title: `${app.name} — App Case Study`,
    description: app.tagline,
    openGraph: {
      title: `${app.name} — ${app.tagline}`,
      description: app.overview,
      url: `${SITE.url}/apps/${app.slug}`,
    },
  };
}

export default function AppPage({ params }: PageProps) {
  const app = getAppBySlug(params.slug);
  if (!app) notFound();

  const { prev, next } = getAdjacentApps(params.slug);

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 md:pt-20">

        {/* Hero */}
        <section className="border-b border-[#E8E8E3] bg-[#F5F5F0]">
          <div className="site-container py-16 md:py-24">
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/#apps"
                className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999] hover:text-black transition-colors duration-200"
              >
                ← All Apps
              </Link>
              <span className="text-[#E8E8E3]">/</span>
              <span className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#999999]">
                {app.category}
              </span>
            </div>

            <div className="flex items-start justify-between gap-8 mb-12">
              <div>
                <h1 className="font-serif font-black text-5xl md:text-7xl uppercase tracking-[-0.04em] text-black leading-none mb-4">
                  {app.name}
                </h1>
                <p className="font-sans text-lg text-[#666666] max-w-[560px]">
                  {app.tagline}
                </p>
              </div>
              <div className="flex-shrink-0 text-right">
                <span
                  className={`inline-block font-sans text-xs font-medium tracking-[0.1em] uppercase px-3 py-1.5 mb-2 ${
                    app.status === "Live"
                      ? "bg-black text-white"
                      : app.status === "In Build"
                      ? "bg-[#E8E8E3] text-[#666666]"
                      : "bg-white border border-[#E8E8E3] text-[#999999]"
                  }`}
                >
                  {app.status}
                </span>
                <p className="font-sans text-xs text-[#999999]">{app.year}</p>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative w-full h-[300px] md:h-[480px] bg-[#E8E8E3] overflow-hidden">
              <Image
                src={`/images/app-${app.slug}-hero.jpg`}
                alt={`${app.name} screenshot`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                onError={() => {}}
              />
              {/* Fallback */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif font-black text-[120px] md:text-[200px] text-white uppercase tracking-[-0.04em] select-none opacity-40">
                  {app.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-24 border-b border-[#E8E8E3]">
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <p className="tag-label mb-4">Overview</p>
                <p className="font-sans text-base text-[#333333] leading-relaxed">
                  {app.overview}
                </p>

                {app.problem && (
                  <div className="mt-8">
                    <p className="tag-label mb-3 text-[#999999]">The Problem</p>
                    <p className="font-sans text-sm text-[#666666] leading-relaxed">
                      {app.problem}
                    </p>
                  </div>
                )}

                {app.solution && (
                  <div className="mt-6">
                    <p className="tag-label mb-3 text-[#999999]">The Solution</p>
                    <p className="font-sans text-sm text-[#666666] leading-relaxed">
                      {app.solution}
                    </p>
                  </div>
                )}
              </div>

              <div>
                {/* Metrics */}
                {app.metrics && app.metrics.length > 0 && (
                  <div className="mb-10">
                    <p className="tag-label mb-4">Outcomes</p>
                    <ul className="space-y-3">
                      {app.metrics.map((metric) => (
                        <li
                          key={metric}
                          className="flex items-center gap-3 font-sans text-sm text-[#333333]"
                        >
                          <span className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                <div>
                  <p className="tag-label mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {app.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1.5 bg-[#F5F5F0] font-sans text-xs font-medium text-[#333333] border border-[#E8E8E3]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features — detailed case studies only */}
        {app.features.length > 0 && (
          <section className="py-16 md:py-24 border-b border-[#E8E8E3] bg-[#F5F5F0]">
            <div className="site-container">
              <p className="tag-label mb-12">Features</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {app.features.map((feature, i) => (
                  <div key={feature.title} className="border-t-2 border-black pt-6">
                    <span className="font-sans text-[10px] font-medium tracking-[0.14em] uppercase text-[#999999] block mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mb-3">
                      {feature.title}
                    </h3>
                    <p className="font-sans text-sm text-[#666666] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Next / Prev navigation */}
        {(prev || next) && (
          <section className="py-12 border-t border-[#E8E8E3]">
            <div className="site-container">
              <div className="flex items-center justify-between">
                {prev ? (
                  <Link
                    href={`/apps/${prev.slug}`}
                    className="group flex items-center gap-4 hover:opacity-70 transition-opacity duration-200"
                  >
                    <span className="font-sans text-lg text-[#BFBFBA] group-hover:text-black transition-colors duration-200">←</span>
                    <div>
                      <p className="tag-label text-[#999999] mb-1">Previous</p>
                      <p className="font-serif font-bold text-lg uppercase tracking-[-0.02em] text-black">
                        {prev.name}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {next ? (
                  <Link
                    href={`/apps/${next.slug}`}
                    className="group flex items-center gap-4 text-right hover:opacity-70 transition-opacity duration-200"
                  >
                    <div>
                      <p className="tag-label text-[#999999] mb-1">Next</p>
                      <p className="font-serif font-bold text-lg uppercase tracking-[-0.02em] text-black">
                        {next.name}
                      </p>
                    </div>
                    <span className="font-sans text-lg text-[#BFBFBA] group-hover:text-black transition-colors duration-200">→</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
