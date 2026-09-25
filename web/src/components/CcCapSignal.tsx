"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 06: the 100-application cap, which sounds like a wall and worked
 * like a flag. Drag the count and watch what reaching 100 actually triggers.
 */

const CAP = 100;

export default function CcCapSignal({ accent = "#111111" }: { accent?: string }) {
  const [apps, setApps] = useState(60);
  const [lifted, setLifted] = useState(false);
  const reached = apps >= CAP;

  const stages = [
    { label: "Applying", on: true },
    { label: "Reaches 100", on: reached },
    { label: "Advisor checks in", on: reached },
    { label: "Cap lifted", on: reached && lifted },
  ];

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        THE CAP · 100 APPLICATIONS PER CO-OP CYCLE
      </figcaption>

      <div className="mt-4 rounded-xl border border-[#D9D9D9] bg-white p-5">
        <label className="flex items-baseline justify-between gap-4" htmlFor="cc-apps">
          <span className="text-[14px]">One student&rsquo;s applications this cycle</span>
          <span className="display text-3xl tabular-nums" style={{ color: reached ? CC.red : accent }}>
            {apps}
          </span>
        </label>
        <input
          id="cc-apps"
          type="range"
          min={0}
          max={CAP}
          value={apps}
          onChange={(e) => {
            setApps(Number(e.target.value));
            setLifted(false);
          }}
          className="mt-3 w-full"
          style={{ accentColor: reached ? CC.red : accent }}
        />

        <ol className="mt-5 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4">
          {stages.map((s, n) => (
            <li
              key={s.label}
              className="rounded-lg border px-3 py-2 text-center text-[12.5px] font-medium transition-all duration-300"
              style={{
                borderColor: s.on ? (n === 0 ? accent : CC.red) : "#D9D9D9",
                background: s.on ? (n === 0 ? accent : CC.red) : "transparent",
                color: s.on ? "#fff" : undefined,
                opacity: s.on ? 1 : 0.5,
              }}
            >
              <span className="mono block text-[9.5px] tracking-widest opacity-70">
                {String(n + 1).padStart(2, "0")}
              </span>
              {s.label}
            </li>
          ))}
        </ol>

        <div className="mt-4 min-h-[3.5rem]" aria-live="polite">
          {!reached && (
            <p className="serif text-base leading-relaxed opacity-75">
              Drag to 100 to see what the cap does.
            </p>
          )}
          {reached && !lifted && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="serif text-base leading-relaxed">
                The cap flags this student to their advisor, who can see who needs help first.
              </p>
              <button
                onClick={() => setLifted(true)}
                className="mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest"
                style={{ borderColor: CC.red, color: CC.red }}
              >
                TALK IT THROUGH ▸
              </button>
            </div>
          )}
          {reached && lifted && (
            <p className="serif text-base leading-relaxed">
              After a conversation about the role they actually want, or once they withdraw some
              applications, the advisor lifts the cap.
            </p>
          )}
        </div>
      </div>
      <p className="serif mt-3 text-base leading-relaxed opacity-75">
        A signal, not a wall. Students in the focus groups still named it as a pain point.
      </p>
    </figure>
  );
}
