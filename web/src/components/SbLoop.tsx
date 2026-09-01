"use client";

import { useState } from "react";
import { SB, tint } from "@/content/storybridge-tokens";

/**
 * The StoryBridge loop, walkable.
 *
 * The point of the diagram is that the AI appears twice and never at either
 * end, which a static picture asks you to verify by counting. Stepping through
 * it makes the alternation the thing you experience: every step you land on is
 * either a person or the machine, and the machine is never first or last.
 */
type Step = {
  n: string;
  role: string;
  title: string;
  line: string;
  chips?: string[];
  ai: boolean;
  detail: string;
};

const STEPS: Step[] = [
  { n: "01", role: "Prompt", title: "Weekly prompt", line: "A reason to write, fresh every week.", ai: false,
    detail: "A person starts it. Not an algorithm deciding what a class should write about this week." },
  { n: "02", role: "Author", title: "A high-schooler writes", line: "An original story, in their own voice.", chips: ["HS Writer"], ai: false,
    detail: "The story is written by a teenager for a real reader, which is the part a grade cannot substitute for." },
  { n: "03", role: "AI", title: "AI moderates", line: "Screens for safe, age-appropriate content.", chips: ["Auto-screen"], ai: true,
    detail: "The first place the machine appears. It screens and flags. It does not decide, and it does not write." },
  { n: "04", role: "Admin", title: "A teacher publishes", line: "A human reviews and approves it.", chips: ["Published"], ai: false,
    detail: "A person holds the gate. Nothing reaches a child because a score cleared a threshold on its own." },
  { n: "05", role: "AI", title: "AI adapts the level", line: "The original is preserved. The reader picks.", chips: ["3–4", "5–6", "7–8"], ai: true,
    detail: "The second and last place the machine appears. It makes a version. The author's text is untouched." },
  { n: "06", role: "Reader", title: "A K-8 kid reads", line: "At their level, in the author's words.", chips: ["K-8 Reader"], ai: false,
    detail: "A person ends it, reading something another person wrote. The loop closes back to the prompt." },
];

export default function SbLoop() {
  const [active, setActive] = useState<number | null>(null);
  const step = active === null ? null : STEPS[active];

  return (
    <div
      className="rounded-xl border p-6 sm:p-8"
      style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span
          className="mono rounded-md px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase"
          style={{ background: SB.accent, color: SB.paper }}
        >
          The StoryBridge loop
        </span>
        <div className="mono flex gap-5 text-[10px] tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: SB.green }} aria-hidden />
            People
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: SB.accent }} aria-hidden />
            AI · the bridge
          </span>
        </div>
      </div>

      <ol className="mt-6 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s, i) => {
          const on = active === i;
          const edge = s.ai ? SB.accent : SB.green;
          return (
            <li key={s.n}>
              <button
                onClick={() => setActive(on ? null : i)}
                aria-pressed={on}
                className="w-full rounded-lg border p-4 text-left transition"
                style={{
                  borderColor: on ? edge : SB.line,
                  borderLeft: `4px solid ${edge}`,
                  background: on ? tint(edge, 10) : "#fff",
                  opacity: active === null || on ? 1 : 0.55,
                }}
              >
                <p
                  className="mono text-[9.5px] font-bold tracking-widest uppercase"
                  style={{ color: edge }}
                >
                  {s.n} · {s.role}
                </p>
                <p className="sb-display mt-1.5 text-lg leading-tight">{s.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-snug" style={{ color: SB.muted }}>
                  {s.line}
                </p>
                {s.chips && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <span
                        key={c}
                        className="mono rounded border px-1.5 py-0.5 text-[9px] tracking-widest uppercase"
                        style={{ borderColor: edge, color: edge }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-5 rounded-lg p-5 text-center"
        style={{ background: SB.surface }}
        aria-live="polite"
      >
        {step ? (
          <>
            <p
              className="mono text-[9.5px] font-bold tracking-widest uppercase"
              style={{ color: step.ai ? SB.accent : SB.green }}
            >
              Step {step.n} · {step.ai ? "the machine" : "a person"}
            </p>
            <p className="sb-display mx-auto mt-2 max-w-xl text-lg leading-snug">
              {step.detail}
            </p>
            <button
              onClick={() => setActive(null)}
              className="mono mt-3 text-[10px] tracking-widest uppercase underline"
              style={{ color: SB.muted }}
            >
              Back to the whole loop
            </button>
          </>
        ) : (
          <>
            <p
              className="mono text-[9.5px] font-bold tracking-widest uppercase"
              style={{ color: SB.accent }}
            >
              What makes it work
            </p>
            <p className="sb-display mx-auto mt-2 max-w-md text-xl leading-snug">
              AI carries the story across. The people stay on both ends.
            </p>
            <p className="mt-2 text-[13px]" style={{ color: SB.muted }}>
              Every step is either a person or the AI, and never the AI on its
              own. Open one to see which.
            </p>
          </>
        )}
      </div>

      <p
        className="mt-5 text-center text-[12.5px] italic"
        style={{ color: SB.muted }}
      >
        Illich called this a learning web: people linked to people. The AI is
        the connective tissue, never the teacher.
      </p>
    </div>
  );
}
