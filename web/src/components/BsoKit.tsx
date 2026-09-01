import type { ReactNode } from "react";
import { BSO } from "@/content/bso-tokens";

/**
 * The shapes the Boston Symphony visuals are made of.
 *
 * Her Figma builds each one the same way: a sand panel carrying a mono kicker,
 * a serif headline and a standfirst, with the poster work below. Shared here so
 * the visuals read as one board rather than three separate ideas.
 */

export function BsoPanel({
  kicker,
  title,
  blurb,
  note,
  children,
}: {
  kicker: string;
  title: string;
  blurb?: string;
  /** The handwritten margin note that sits above the panel in her frames. */
  note?: string;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      {note && (
        <p
          className="hand mb-3 ml-1 text-[19px] leading-none"
          style={{ color: BSO.wine }}
        >
          {note}
        </p>
      )}
      <div
        className="overflow-hidden rounded-2xl px-5 py-7 sm:px-8 sm:py-9"
        style={{ background: BSO.panel, color: BSO.body }}
      >
        <p
          className="mono text-[11px] font-bold tracking-[0.16em]"
          style={{ color: BSO.wine }}
        >
          {kicker}
        </p>
        <h3
          className="serif mt-2 text-[26px] leading-tight sm:text-[30px]"
          style={{ color: BSO.ink }}
        >
          {title}
        </h3>
        {blurb && (
          <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed">
            {blurb}
          </p>
        )}
        <div className="mt-7">{children}</div>
      </div>
    </figure>
  );
}

/**
 * A horizontally scrolling shelf of posters.
 *
 * Some stages are five posters wide, which no case-study column holds. They
 * scroll — so the shelf says so: a fade at the cut edge and a mono count
 * underneath, or the last posters read as missing rather than offscreen.
 */
export function BsoShelf({
  children,
  hint,
}: {
  children: ReactNode;
  /** Omit when the shelf fits at desktop width. */
  hint?: string;
}) {
  return (
    <>
      <div className="relative">
        <div className="no-scrollbar -mx-5 flex items-start gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
          {children}
        </div>
        {hint && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -right-5 w-10 sm:-right-8 sm:w-14"
            style={{
              background: `linear-gradient(to right, transparent, ${BSO.panel})`,
            }}
          />
        )}
      </div>
      {hint && (
        <p
          className="mono mt-3 text-[9.5px] tracking-[0.16em]"
          style={{ color: BSO.muted }}
        >
          {hint}
        </p>
      )}
    </>
  );
}

/** One poster on the shelf, with its mono caption. */
export function BsoPoster({
  src,
  alt,
  caption,
  width,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
}) {
  return (
    <figure className="m-0 shrink-0" style={{ width }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/bso/${src}`}
        alt={alt}
        loading="lazy"
        className="w-full rounded-[3px]"
        style={{ boxShadow: "0 6px 18px rgba(33,26,23,0.22)" }}
      />
      {caption && (
        <figcaption
          className="mono mt-2 text-[9px] leading-snug tracking-[0.12em]"
          style={{ color: BSO.muted }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
