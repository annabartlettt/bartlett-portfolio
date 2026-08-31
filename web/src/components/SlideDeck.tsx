"use client";

import { useRef, useState } from "react";

/**
 * A set of related images from one piece of published work, shown the way it
 * was published: one slide at a time.
 *
 * The track is a scroll-snap row, so touch swipe comes free and the arrows
 * only have to nudge it. `numbered` treats the order as meaningful, which it
 * is for a carousel, where the sequence is part of the design.
 */
export default function SlideDeck({
  kicker,
  title,
  blurb,
  slides,
  numbered = false,
  accent = "#B5502F",
  border = true,
}: {
  kicker: string;
  title: string;
  blurb: string;
  slides: { src: string; alt: string; label?: string }[];
  numbered?: boolean;
  accent?: string;
  border?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const last = slides.length - 1;

  function go(next: number) {
    const n = Math.max(0, Math.min(last, next));
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    setI(n);
  }

  function onScroll() {
    const el = track.current;
    if (!el) return;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== i) setI(Math.max(0, Math.min(last, n)));
  }

  const arrow =
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border bg-[var(--paper)] text-lg leading-none transition disabled:pointer-events-none disabled:opacity-0";

  return (
    <section
      className={`mx-auto max-w-4xl px-6 py-14 ${
        border ? "border-b border-[var(--kraft)]" : ""
      }`}
    >
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        {kicker}
      </p>
      <h2 className="display mt-3 text-3xl">{title}</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">{blurb}</p>

      <div className="relative mt-8 mx-auto" style={{ maxWidth: 460 }}>
        <div
          ref={track}
          onScroll={onScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl border"
          style={{ borderColor: "var(--kraft)", scrollSnapType: "x mandatory" }}
          aria-label={`${title} — ${slides.length} slides`}
        >
          {slides.map((s) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              loading="lazy"
              className="block w-full flex-none snap-center"
              style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
            />
          ))}
        </div>

        {slides.length > 1 && (
          <>
            <button
              onClick={() => go(i - 1)}
              disabled={i === 0}
              aria-label="Previous slide"
              className={`${arrow} -left-3`}
              style={{ borderColor: "var(--kraft)" }}
            >
              ‹
            </button>
            <button
              onClick={() => go(i + 1)}
              disabled={i === last}
              aria-label="Next slide"
              className={`${arrow} -right-3`}
              style={{ borderColor: "var(--kraft)" }}
            >
              ›
            </button>
          </>
        )}
      </div>

      <div
        className="mono mx-auto mt-3 flex items-baseline gap-3 text-[11px] tracking-widest"
        style={{ maxWidth: 460 }}
      >
        {numbered && (
          <span style={{ color: accent }}>
            {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        )}
        {slides[i]?.label && <span className="opacity-60">{slides[i].label}</span>}
        {!numbered && !slides[i]?.label && (
          <span className="opacity-60">
            {i + 1} of {slides.length}
          </span>
        )}
      </div>
    </section>
  );
}
