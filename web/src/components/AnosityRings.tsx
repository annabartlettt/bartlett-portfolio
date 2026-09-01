"use client";

/**
 * Anosity — the ring system, walkable.
 *
 * The static diagram asks you to accept that anxiety separates into four
 * domains. Touching it makes the separation the thing you do: you pick a ring,
 * you see only that domain's patterns, and each one you name lands as a dot on
 * its own ring. Four rings fill independently, which is the whole argument —
 * the parts are not one feeling, and the centre never moves.
 *
 * Injected into the Anosity case study after section 04.
 * Self-contained: local palette, no external UI deps, no randomness (dot
 * positions are fixed so server and client render identically).
 */

import { useState } from "react";

const C = {
  ink: "#363a5e",
  inkMuted: "#6b7091",
  inkFaint: "#9aa0bf",
  surface: "#ffffff",
  sunken: "#f4f6fe",
  border: "#e4e7f4",
};

type DomainKey = "thoughts" | "physical" | "behaviors" | "emotions";

type Domain = {
  key: DomainKey;
  name: string;
  tint: string;
  deep: string;
  radius: number;
  blurb: string;
  patterns: string[];
  /** Fixed dot angles, in degrees. Deterministic on purpose. */
  angles: number[];
};

const DOMAINS: Domain[] = [
  {
    key: "thoughts",
    name: "Thoughts",
    tint: "#e4d2f8",
    deep: "#8a63c4",
    radius: 62,
    blurb: "The commentary. Usually the only part people can name.",
    patterns: ["Worry about future events", "Racing or repeating thoughts", "Mind going blank"],
    angles: [-78, 24, 140],
  },
  {
    key: "physical",
    name: "Physical",
    tint: "#c1e3d4",
    deep: "#3f8e74",
    radius: 92,
    blurb: "Where it lands in the body, often before the thought arrives.",
    patterns: ["Muscle tension", "Restlessness", "Fatigue"],
    angles: [-46, 62, 186],
  },
  {
    key: "behaviors",
    name: "Behaviors",
    tint: "#f5e08c",
    deep: "#a0850f",
    radius: 122,
    blurb: "What you do about it. The part that quietly keeps the loop fed.",
    patterns: ["Avoiding the task", "Checking and re-checking", "Over-preparing"],
    angles: [-104, 16, 128],
  },
  {
    key: "emotions",
    name: "Emotions",
    tint: "#fbdcc6",
    deep: "#bf6b39",
    radius: 152,
    blurb: "The feeling underneath, including the relief that rewards avoidance.",
    patterns: ["Dread", "Irritability", "Relief after cancelling"],
    angles: [-62, 40, 152],
  },
];

const ENV_RADIUS = 182;
const CENTRE = 200;
const RING_W = 24;

/** Polar → cartesian, for placing a dot on a ring. */
function onRing(radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CENTRE + radius * Math.cos(rad), y: CENTRE + radius * Math.sin(rad) };
}

type Marked = Record<DomainKey, number[]>;
const EMPTY: Marked = { thoughts: [], physical: [], behaviors: [], emotions: [] };

export default function AnosityRings() {
  const [active, setActive] = useState<DomainKey | null>(null);
  const [marked, setMarked] = useState<Marked>(EMPTY);

  const current = DOMAINS.find((d) => d.key === active) ?? null;
  const mappedCount = DOMAINS.filter((d) => marked[d.key].length > 0).length;
  const total = DOMAINS.reduce((n, d) => n + marked[d.key].length, 0);

  function toggle(key: DomainKey, index: number) {
    setMarked((prev) => {
      const has = prev[key].includes(index);
      return {
        ...prev,
        [key]: has ? prev[key].filter((i) => i !== index) : [...prev[key], index],
      };
    });
  }

  return (
    <section className="my-16" aria-labelledby="rings-heading">
      <div
        className="rounded-2xl border p-6 sm:p-8"
        style={{ background: C.sunken, borderColor: C.border }}
      >
        <div className="mono text-[11px] tracking-widest" style={{ color: C.inkFaint }}>
          TRY IT
        </div>
        <h3
          id="rings-heading"
          className="display mt-2 text-2xl sm:text-3xl"
          style={{ color: C.ink }}
        >
          Pick a ring. Name what&rsquo;s in it.
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: C.inkMuted }}>
          This is the mapping screen, pulled out of the phone. Choose a domain, then name the
          patterns that belong to you — each one lands on its own ring. Nothing here is scored.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-center">
          {/* ---- the rings ---- */}
          <div className="mx-auto w-full max-w-[420px]">
            <svg viewBox="0 0 400 400" className="w-full" role="group" aria-label="The Anosity ring system">
              {/* environment — context, not selectable */}
              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={ENV_RADIUS}
                fill="none"
                stroke="#d5e0fa"
                strokeWidth={22}
                opacity={active ? 0.25 : 0.5}
                style={{ transition: "opacity 200ms ease" }}
              />

              {DOMAINS.map((d) => {
                const isActive = active === d.key;
                const dim = active !== null && !isActive;
                return (
                  <g key={d.key}>
                    <circle
                      cx={CENTRE}
                      cy={CENTRE}
                      r={d.radius}
                      fill="none"
                      stroke={d.tint}
                      strokeWidth={isActive ? RING_W + 4 : RING_W}
                      opacity={dim ? 0.3 : 1}
                      style={{ transition: "opacity 200ms ease, stroke-width 200ms ease" }}
                    />
                    {/* hit area */}
                    <circle
                      cx={CENTRE}
                      cy={CENTRE}
                      r={d.radius}
                      fill="none"
                      stroke="transparent"
                      strokeWidth={RING_W + 10}
                      className="cursor-pointer focus:outline-none"
                      style={{ pointerEvents: "stroke" }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      aria-label={`${d.name} ring — ${d.blurb}`}
                      onClick={() => setActive(isActive ? null : d.key)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(isActive ? null : d.key);
                        }
                      }}
                    />
                    {marked[d.key].map((i) => {
                      const p = onRing(d.radius, d.angles[i]);
                      return (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={7}
                          fill={d.deep}
                          stroke={C.surface}
                          strokeWidth={3}
                          opacity={dim ? 0.35 : 1}
                          style={{ transition: "opacity 200ms ease" }}
                        />
                      );
                    })}
                  </g>
                );
              })}

              <circle cx={CENTRE} cy={CENTRE} r={40} fill={C.ink} />
              <text
                x={CENTRE}
                y={CENTRE + 5}
                textAnchor="middle"
                fill={C.surface}
                style={{ font: "600 15px system-ui, sans-serif" }}
              >
                Mind
              </text>
            </svg>
          </div>

          {/* ---- the panel ---- */}
          <div>
            {current ? (
              <div>
                <div
                  className="mono text-[11px] tracking-widest"
                  style={{ color: current.deep }}
                >
                  {current.name.toUpperCase()}
                </div>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: C.ink }}>
                  {current.blurb}
                </p>
                <ul className="mt-4 flex list-none flex-col gap-2 p-0">
                  {current.patterns.map((p, i) => {
                    const on = marked[current.key].includes(i);
                    return (
                      <li key={p} className="m-0">
                        <button
                          type="button"
                          onClick={() => toggle(current.key, i)}
                          aria-pressed={on}
                          className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition-colors"
                          style={{
                            background: on ? current.tint : C.surface,
                            border: `1px solid ${on ? current.deep : C.border}`,
                            color: C.ink,
                          }}
                        >
                          <span>{p}</span>
                          <span
                            aria-hidden
                            className="ml-3 shrink-0 text-xs"
                            style={{ color: on ? current.deep : C.inkFaint }}
                          >
                            {on ? "on the ring" : "+ add"}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mono mt-4 text-[11px] tracking-widest underline underline-offset-4"
                  style={{ color: C.inkMuted }}
                >
                  BACK TO ALL RINGS
                </button>
              </div>
            ) : (
              <div>
                <p className="text-[15px] leading-relaxed" style={{ color: C.ink }}>
                  Five rings. The outer one is your environment — the context the other four sit
                  inside. The centre is the part that stays still.
                </p>
                <ul className="mt-4 flex list-none flex-col gap-2 p-0">
                  {DOMAINS.map((d) => (
                    <li key={d.key} className="m-0">
                      <button
                        type="button"
                        onClick={() => setActive(d.key)}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors"
                        style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.ink }}
                      >
                        <span
                          aria-hidden
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ background: d.tint, border: `2px solid ${d.deep}` }}
                        />
                        <span className="flex-1">{d.name}</span>
                        <span className="text-xs" style={{ color: C.inkFaint }}>
                          {marked[d.key].length > 0 ? `${marked[d.key].length} named` : "—"}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* progress */}
            <div className="mt-6 border-t pt-4" style={{ borderColor: C.border }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: C.ink }}>
                  {mappedCount} of 4 domains mapped
                </span>
                {total > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMarked(EMPTY);
                      setActive(null);
                    }}
                    className="mono text-[11px] tracking-widest underline underline-offset-4"
                    style={{ color: C.inkMuted }}
                  >
                    CLEAR
                  </button>
                )}
              </div>
              <div className="mt-2 flex gap-1.5" aria-hidden>
                {DOMAINS.map((d) => (
                  <span
                    key={d.key}
                    className="h-1.5 flex-1 rounded-full transition-colors"
                    style={{
                      background: marked[d.key].length > 0 ? d.deep : C.border,
                    }}
                  />
                ))}
              </div>
              <p className="mono mt-3 text-[11px] leading-relaxed" style={{ color: C.inkFaint }}>
                {total === 0
                  ? "NOTHING NAMED YET. THAT IS ALSO A RESULT."
                  : "FOUR RINGS FILL SEPARATELY. THE CENTRE DOES NOT MOVE."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
