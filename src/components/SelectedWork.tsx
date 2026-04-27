"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECT_CARDS } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function SelectedWork() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateEdges = () => {
      const max = track.scrollWidth - track.clientWidth;
      setCanPrev(track.scrollLeft > 4);
      setCanNext(track.scrollLeft < max - 4);
    };
    updateEdges();
    track.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);

    let down = false;
    let startX = 0;
    let startScroll = 0;
    let moved = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("dragging");
      track.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      track.scrollLeft = startScroll - dx;
    };
    const endDrag = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      track.classList.remove("dragging");
      try { track.releasePointerCapture(e.pointerId); } catch {}
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved > 6) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove);
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".work-card");
    const cardWidth = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="block-section work-section" id="work">
      <div className="container-x">
        <div className="work-head">
          <Reveal>
            <div>
              <span className="micro">Selected work</span>
              <h2 className="why-head">
                Recent projects
                <br />
                from the studio.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="intro">
              A short edit of the products I&apos;ve designed, built and still
              operate today. Drag, scroll or use the arrows to browse.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="work-rail">
        <div className="work-rail-track" ref={trackRef} role="region" aria-label="Selected work">
          {PROJECT_CARDS.map((p) => (
            <Link key={p.slug} className="work-card" href={`/work/${p.slug}`} draggable={false}>
              <div className="cover">
                <Image
                  src={p.cover}
                  alt={p.coverAlt}
                  fill
                  sizes="(min-width: 820px) 380px, 80vw"
                  className="cover-img"
                  style={{ objectFit: "cover" }}
                  draggable={false}
                />
                <span className={`tag ${p.status === "beta" ? "beta" : p.status === "dev" ? "dev" : ""}`.trim()}>
                  <span className="d" />
                  {p.statusLabel}
                </span>
              </div>
              <h3 className="title">{p.title}</h3>
              <p className="desc">{p.desc}</p>
              <div className="meta">
                <span>{p.meta}</span>
                <span className="arrow">→</span>
              </div>
            </Link>
          ))}
          <div className="work-rail-end" aria-hidden="true" />
        </div>
      </div>

      <div className="container-x">
        <div className="work-rail-controls">
          <span className="work-rail-hint">Drag or scroll &rarr;</span>
          <div className="work-rail-buttons">
            <button
              type="button"
              className="rail-btn"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Previous projects"
            >
              ←
            </button>
            <button
              type="button"
              className="rail-btn"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Next projects"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
