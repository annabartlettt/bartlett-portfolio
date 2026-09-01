import type { ReactNode } from "react";
import { FB } from "@/content/financial-blueprint-tokens";

/**
 * The two shapes every Financial Blueprint visual is made of.
 *
 * Her Figma builds each visual the same way: a lavender panel carrying a mono
 * kicker, a serif headline and an optional standfirst, with the artwork below.
 * Inside those panels the app is always the same phone. Both are here so the
 * five visuals stay identical to each other rather than five near-misses.
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

/* ---------------------------------------------------------------------------
 * The phone.
 *
 * Every screen is authored at a real iPhone's 390 x 844 and then scaled down
 * as a whole, rather than being redrawn small. Two reasons: the screens keep
 * true device proportions at any display width, and the interface type can be
 * written at the sizes iOS actually uses — 17px body, 30px titles — instead of
 * the 8px guesses that fitting a 190px box forced. Her own exported screens
 * are 390 x 844, so the built ones and the RetireMap images now sit in the
 * same device at the same scale.
 * ------------------------------------------------------------------------ */

/** iPhone logical points. */
export const SCREEN_W = 390;
export const SCREEN_H = 844;
const BEZEL = 12;
const DEVICE_W = SCREEN_W + BEZEL * 2;
const DEVICE_H = SCREEN_H + BEZEL * 2;

export function FbPhone({
  children,
  label,
  width = 200,
  /** Set for a full-bleed screen (an exported image) — drops the safe-area padding. */
  bleed = false,
}: {
  children: ReactNode;
  label?: string;
  width?: number;
  bleed?: boolean;
}) {
  const scale = width / DEVICE_W;

  return (
    <div className="shrink-0" style={{ width }}>
      <div style={{ width, height: DEVICE_H * scale, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: DEVICE_W,
            height: DEVICE_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            background: "#120A28",
            borderRadius: 58,
            padding: BEZEL,
          }}
        >
          <div
            style={{
              position: "relative",
              width: SCREEN_W,
              height: SCREEN_H,
              borderRadius: 46,
              overflow: "hidden",
              background: FB.screen,
              color: FB.cream,
            }}
          >
            {/* Dynamic Island — only over built screens. Her exported ones
                already contain their own status bar and tab bar, so an island
                and a home indicator would sit on top of real content. */}
            {!bleed && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 120,
                  height: 35,
                  borderRadius: 20,
                  background: "#0B0618",
                  zIndex: 2,
                }}
              />
            )}
            <div
              style={
                bleed
                  ? { width: SCREEN_W, height: SCREEN_H }
                  : { height: SCREEN_H, padding: "66px 22px 34px" }
              }
            >
              {children}
            </div>
            {/* home indicator */}
            {!bleed && (
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: 9,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 140,
                  height: 5,
                  borderRadius: 3,
                  background: "rgba(255,244,227,0.5)",
                  zIndex: 2,
                }}
              />
            )}
          </div>
        </div>
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
 * A horizontally scrolling strip of phones.
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
        <div className="no-scrollbar -mx-5 flex items-start gap-3 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8">
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
export function FbArrow({ top = 90 }: { top?: number }) {
  return (
    <span
      aria-hidden
      className="hidden shrink-0 text-lg sm:block"
      style={{ color: FB.violet, marginTop: top }}
    >
      →
    </span>
  );
}
