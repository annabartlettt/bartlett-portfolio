import type { ReactNode } from "react";
import { FB } from "@/content/financial-blueprint-tokens";

/**
 * The two shapes every Financial Blueprint visual is made of.
 *
 * Her Figma builds each visual the same way: a lavender panel carrying a mono
 * kicker, a serif headline and an optional standfirst, with the artwork below.
 * Inside those panels the app is always the same dark purple rounded screen.
 * Both are here so the five visuals stay identical to each other rather than
 * five near-misses.
 */

export function FbPanel({
  kicker,
  title,
  blurb,
  note,
  children,
  wide,
}: {
  kicker: string;
  title: string;
  blurb?: string;
  /** The handwritten margin note that sits above the panel in her frames. */
  note?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <figure className="m-0">
      {note && (
        <p
          className="hand mb-3 ml-1 text-[19px] leading-none"
          style={{ color: FB.violet }}
        >
          {note}
        </p>
      )}
      <div
        className="overflow-hidden rounded-2xl px-5 py-7 sm:px-8 sm:py-9"
        style={{ background: FB.panel, color: FB.ink }}
      >
        <p
          className="mono text-[11px] font-bold tracking-[0.16em]"
          style={{ color: FB.violet }}
        >
          {kicker}
        </p>
        <h3 className="serif mt-2 text-[26px] leading-tight sm:text-[30px]">
          {title}
        </h3>
        {blurb && (
          <p
            className="mt-2 max-w-3xl text-[14.5px] leading-snug"
            style={{ color: FB.muted }}
          >
            {blurb}
          </p>
        )}
        <div className={wide ? "mt-7" : "mt-7 max-w-full"}>{children}</div>
      </div>
    </figure>
  );
}

/** One app screen: the dark purple card the product lives inside. */
export function FbScreen({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  /** The mono caption printed under the screen in her storyboards. */
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex shrink-0 flex-col ${className}`}>
      <div
        className="flex flex-col rounded-xl p-3.5"
        style={{ background: FB.screen, color: FB.cream }}
      >
        {children}
      </div>
      {label && (
        <p
          className="mono mt-2 text-[9.5px] tracking-[0.14em]"
          style={{ color: FB.muted }}
        >
          {label}
        </p>
      )}
    </div>
  );
}

/**
 * A horizontally scrolling strip of screens.
 *
 * Her storyboards are six screens wide, which no case-study column can hold.
 * Rather than shrink them past legibility they scroll — so the strip has to
 * say so: a fade at the cut edge, and a mono count underneath. Without both,
 * the last screens simply look missing.
 */
export function FbRibbon({
  children,
  hint,
}: {
  children: ReactNode;
  /** Omit when the strip fits at desktop width — a fade over content that is
   *  not actually cut just dims the last screen for no reason. */
  hint?: string;
}) {
  return (
    <>
      <div className="relative">
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
          {children}
        </div>
        {hint && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -right-5 w-10 sm:-right-8 sm:w-14"
            style={{
              background: `linear-gradient(to right, transparent, ${FB.panel})`,
            }}
          />
        )}
      </div>
      {hint && (
        <p
          className="mono mt-3 text-[9.5px] tracking-[0.16em]"
          style={{ color: FB.muted }}
        >
          {hint}
        </p>
      )}
    </>
  );
}

/** The violet chevron her frames use between storyboard steps. */
export function FbArrow() {
  return (
    <span
      aria-hidden
      className="hidden shrink-0 self-center text-lg sm:block"
      style={{ color: FB.violet }}
    >
      →
    </span>
  );
}
