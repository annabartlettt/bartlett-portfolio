"use client";

import { useRef, useState } from "react";

export type Deck = {
  /** Tab label. */
  name: string;
  /** Permalink to the post this ran as. */
  href: string;
  /** One line under the tabs, specific to this deck. */
  note?: string;
  slides: { src: string; alt: string; label?: string }[];
};

/**
 * Published carousels, shown the way they were published: one slide at a time.
 *
 * Several decks share a section when they share a template, which is the
 * point being made — the tabs let a reader move between them and see the same
 * skeleton wearing different clothes.
 *
 * The track is a scroll-snap row, so touch swipe comes free and the arrows
 * only have to nudge it.
 */
export default function SlideDeck({
  kicker,
  title,
  blurb,
  decks,
  numbered = false,
  accent = "#B5502F",
  border = true,
}: {
  kicker: string;
  title: string;
  blurb: string;
  decks: Deck[];
  numbered?: boolean;
  accent?: string;
  border?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [d, setD] = useState(0);
  const [i, setI] = useState(0);

  const deck = decks[d];
  const last = deck.slides.length - 1;

  function go(next: number) {
    const n = Math.max(0, Math.min(last, next));
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: n * el.clientWidth, behavior: "smooth" });
    setI(n);
  }

  function pick(next: number) {
    setD(next);
    setI(0);
    track.current?.scrollTo({ left: 0 });
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

      {decks.length > 1 && (
        <div className="mt-7 flex flex-wrap gap-2">
          {decks.map((x, n) => (
            <button
              key={x.name}
              onClick={() => pick(n)}
              className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
                n === d
                  ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
                  : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
              }`}
            >
              {x.name}
            </button>
          ))}
        </div>
      )}

      {deck.note && (
        <p className="serif mt-5 text-base leading-relaxed opacity-75">
          {deck.note}
        </p>
      )}

      <div className="relative mx-auto mt-6" style={{ maxWidth: 460 }}>
        <div
          ref={track}
          onScroll={onScroll}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
            if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
          }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl border"
          style={{ borderColor: "var(--kraft)" }}
          aria-label={`${deck.name} — ${deck.slides.length} slides`}
        >
          {deck.slides.map((s) => (
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

        {deck.slides.length > 1 && (
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
        className="mono mx-auto mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] tracking-widest"
        style={{ maxWidth: 460 }}
      >
        {numbered && (
          <span style={{ color: accent }}>
            {String(i + 1).padStart(2, "0")} /{" "}
            {String(deck.slides.length).padStart(2, "0")}
          </span>
        )}
        {deck.slides[i]?.label && (
          <span className="opacity-60">{deck.slides[i].label}</span>
        )}
        <a
          href={deck.href}
          target="_blank"
          rel="noopener"
          className="ml-auto underline opacity-60 hover:opacity-100"
        >
          view post ↗
        </a>
      </div>
    </section>
  );
}
