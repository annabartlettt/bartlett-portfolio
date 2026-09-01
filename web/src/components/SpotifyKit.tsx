import type { ReactNode } from "react";
import { SP } from "@/content/spotify-tokens";

/**
 * The shapes the Global Mode visuals are made of.
 *
 * These panels are dark where every other project's are light — her Figma case
 * study is built on #121212 throughout, and the phone mockups are transparent
 * PNGs carrying their own bezel, so a light panel would leave them floating in
 * the wrong colour.
 */

export function SpPanel({
  kicker,
  title,
  blurb,
  children,
}: {
  kicker: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-2xl px-5 py-8 sm:px-8 sm:py-10"
        style={{ background: SP.ink, color: SP.grey }}
      >
        <p
          className="mono text-[11px] font-bold tracking-[0.16em]"
          style={{ color: SP.green }}
        >
          {kicker}
        </p>
        <h3
          className="display mt-2 text-[26px] leading-tight sm:text-[30px]"
          style={{ color: SP.white }}
        >
          {title}
        </h3>
        {blurb && (
          <p className="mt-3 max-w-3xl text-[14.5px] leading-relaxed">{blurb}</p>
        )}
        <div className="mt-8">{children}</div>
      </div>
    </figure>
  );
}

/** A titled card on the dark — used for barriers, insights and findings. */
export function SpCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <li
      className="rounded-xl border p-5"
      style={{ background: SP.card, borderColor: SP.line }}
    >
      <p
        className="mono text-[9.5px] font-bold tracking-[0.16em]"
        style={{ color: SP.green }}
      >
        {label}
      </p>
      <p
        className="mt-2 text-[17px] leading-snug font-semibold"
        style={{ color: SP.white }}
      >
        {title}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed">{body}</p>
    </li>
  );
}

/** A small mono section label inside a panel. */
export function SpLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mono mb-3 text-[9.5px] font-bold tracking-[0.16em]"
      style={{ color: SP.grey }}
    >
      {children}
    </p>
  );
}
