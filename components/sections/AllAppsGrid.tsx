"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ALL_APPS } from "@/content/apps";

export function AllAppsGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="apps"
      className="py-20 md:py-28 border-t border-[#E8E8E3] bg-[#F5F5F0]"
      onMouseMove={handleMouseMove}
    >
      <div className="site-container">
        <SectionHeader number="004" tag="/APPS" />

        <div className="flex items-end justify-between mb-12">
          <h2 className="font-serif font-black text-4xl md:text-5xl uppercase tracking-[-0.03em] text-black leading-none">
            All Apps
          </h2>
          <span className="font-sans text-xs text-[#999999]">
            {ALL_APPS.length} Products
          </span>
        </div>

        {/* App rows */}
        <div className="divide-y divide-[#E8E8E3]">
          {ALL_APPS.map((app, i) => (
            <Link
              key={app.slug}
              href={`/apps/${app.slug}`}
              className="group flex items-center justify-between py-5 hover:bg-white transition-colors duration-200 -mx-4 px-4"
              onMouseEnter={() => setHoveredSlug(app.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              {/* Number */}
              <span className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase text-[#BFBFBA] w-10 flex-shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Name */}
              <div className="flex-1 mx-4">
                <h3 className="font-serif font-bold text-lg md:text-xl uppercase tracking-[-0.02em] text-black group-hover:text-[#333333] transition-colors duration-200">
                  {app.name}
                </h3>
                <p className="font-sans text-xs text-[#999999] mt-0.5">
                  {app.category}
                </p>
              </div>

              {/* Status + year */}
              <div className="flex items-center gap-4">
                <span className="hidden md:block font-sans text-xs text-[#999999]">
                  {app.year}
                </span>
                <span
                  className={`font-sans text-[10px] font-medium tracking-[0.1em] uppercase px-3 py-1 ${
                    app.status === "Live"
                      ? "bg-black text-white"
                      : app.status === "In Build"
                      ? "bg-[#E8E8E3] text-[#666666]"
                      : "bg-[#F5F5F0] text-[#999999] border border-[#E8E8E3]"
                  }`}
                >
                  {app.status}
                </span>
                <span className="font-sans text-xs text-[#BFBFBA] group-hover:text-black transition-colors duration-200">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Hover-reveal image (Gordian-style) */}
      {hoveredSlug && (
        <div
          className="fixed pointer-events-none z-50 w-40 h-28 bg-[#F5F5F0] border border-[#E8E8E3] overflow-hidden shadow-lg transition-opacity duration-200"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y - 56,
          }}
        >
          <Image
            src={`/images/app-${hoveredSlug}-placeholder.jpg`}
            alt=""
            fill
            className="object-cover"
            sizes="160px"
            onError={() => {}}
          />
          {/* Fallback */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F0]">
            <span className="font-serif font-black text-3xl text-[#E8E8E3] uppercase">
              {ALL_APPS.find((a) => a.slug === hoveredSlug)?.name.charAt(0)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
