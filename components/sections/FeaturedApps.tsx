"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FEATURED_APPS } from "@/content/apps";

export function FeaturedApps() {
  return (
    <section
      id="portfolio"
      className="py-20 md:py-28 border-t border-[#E8E8E3] bg-[#F5F5F0]"
    >
      <div className="site-container">
        <SectionHeader number="002" tag="/PORTFOLIO" />

        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none">
            Selected<br />Work
          </h2>
          <Link
            href="/#apps"
            className="font-sans text-xs font-medium tracking-[0.1em] uppercase text-[#666666] hover:text-black transition-colors duration-200 border-b border-[#E8E8E3] hover:border-black pb-1"
          >
            View All →
          </Link>
        </div>

        {/* Asymmetric 2x2 grid — right column offset down */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column — normal */}
          <div className="flex flex-col gap-6">
            {FEATURED_APPS.slice(0, 2).map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
          {/* Right column — offset down on desktop */}
          <div className="flex flex-col gap-6 md:mt-16">
            {FEATURED_APPS.slice(2, 4).map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AppCard({ app }: { app: (typeof FEATURED_APPS)[0] }) {
  return (
    <Link
      href={`/apps/${app.slug}`}
      className="group block bg-white border border-[#E8E8E3] overflow-hidden hover:border-[#999999] transition-colors duration-300"
    >
      {/* Image area */}
      <div className="relative w-full h-52 bg-[#F5F5F0] overflow-hidden">
        <Image
          src={`/images/app-${app.slug}-placeholder.jpg`}
          alt={app.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => {}}
        />
        {/* Fallback */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif font-black text-5xl text-[#E8E8E3] uppercase tracking-[-0.03em]">
            {app.name.charAt(0)}
          </span>
        </div>
        {/* Category tag */}
        <span className="absolute top-4 left-4 tag-label bg-white px-3 py-1">
          /{app.category.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans text-xs text-[#999999]">{app.year}</span>
          <span
            className={`font-sans text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-1 ${
              app.status === "Live"
                ? "bg-black text-white"
                : "bg-[#F5F5F0] text-[#666666]"
            }`}
          >
            {app.status}
          </span>
        </div>
        <h3 className="font-serif font-bold text-xl uppercase tracking-[-0.02em] text-black mb-2 group-hover:text-[#333333] transition-colors duration-200">
          {app.name}
        </h3>
        <p className="font-sans text-sm text-[#666666] leading-relaxed line-clamp-2">
          {app.description}
        </p>
        <div className="mt-4 flex items-center gap-2 font-sans text-xs font-medium tracking-[0.08em] uppercase text-black">
          View Case Study
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
