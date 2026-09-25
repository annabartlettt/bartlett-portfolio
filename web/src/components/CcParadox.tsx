"use client";

import { useEffect, useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 06: the Northeastern Paradox as the loop it is. A circular problem
 * reads as a sentence on the page; drawn, you can watch it fail to exit.
 */

const NODES = [
  { big: "You need experience", small: "to get a co-op" },
  { big: "You need a co-op", small: "to get experience" },
  { big: "Experience is what co-op is for", small: "so the loop starts again" },
];

export default function CcParadox({ accent = "#111111" }: { accent?: string }) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !playing) return;
    const t = setInterval(() => setI((n) => (n + 1) % NODES.length), 1800);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono flex items-center justify-between gap-4 text-[11px] tracking-widest opacity-60">
        <span>THE NORTHEASTERN PARADOX</span>
        <button onClick={() => setPlaying((p) => !p)} className="underline-offset-2 hover:underline">
          {playing ? "PAUSE" : "PLAY"}
        </button>
      </figcaption>

      <div className="mt-4 grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {NODES.map((n, k) => (
          <div key={n.big} className="contents">
            <button
              onClick={() => {
                setPlaying(false);
                setI(k);
              }}
              className="rounded-xl border p-5 text-left transition-all duration-500"
              style={{
                borderColor: i === k ? CC.red : "#D9D9D9",
                background: i === k ? CC.red : "#fff",
                color: i === k ? "#fff" : undefined,
              }}
            >
              <span className="display block text-xl leading-snug">{n.big}</span>
              <span className="mono mt-2 block text-[10.5px] tracking-widest opacity-75">
                {n.small.toUpperCase()}
              </span>
            </button>
            {k < NODES.length - 1 && (
              <span aria-hidden className="self-center text-center text-lg" style={{ color: accent }}>
                <span className="hidden sm:inline">→</span>
                <span className="sm:hidden">↓</span>
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mono mt-2 text-center text-[10.5px] tracking-widest" style={{ color: CC.red }} aria-hidden>
        ↺ AND BACK TO THE START
      </p>
    </figure>
  );
}
