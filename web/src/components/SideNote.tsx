"use client";

import { useId, useState, type CSSProperties, type ReactNode } from "react";

/**
 * One margin note and the phrase it belongs to.
 *
 * Wide screens: the note is always visible in the margin, quiet gray. Hovering
 * or focusing either the phrase or the note lights both in the project color;
 * clicking the phrase keeps them lit. Narrow screens: no margin, so the phrase
 * is a button that opens the note inline under its sentence.
 */
export default function SideNote({
  n,
  note,
  source,
  href,
  color,
  children,
}: {
  n: number;
  note: string;
  source?: string;
  href?: string;
  color: string;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const id = useId();
  const on = hover || pinned;
  const vars = { "--sn": color } as CSSProperties;

  return (
    <>
      <button
        type="button"
        className="sn-anchor"
        data-on={on}
        aria-expanded={pinned}
        aria-controls={id}
        style={vars}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        onClick={() => setPinned((p) => !p)}
      >
        {children}
        <sup className="sn-num">{n}</sup>
      </button>
      <span
        id={id}
        role="note"
        className="sn-note"
        data-on={on}
        data-open={pinned}
        style={vars}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <span className="sn-n" aria-hidden>
          {n}
        </span>
        {note}
        {source &&
          (href ? (
            <a className="sn-src hand" href={href} target="_blank" rel="noopener noreferrer">
              {source} ↗
            </a>
          ) : (
            <span className="sn-src hand">{source}</span>
          ))}
      </span>
    </>
  );
}
