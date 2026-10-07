"use client";

import { useState, type ReactNode } from "react";
import { SB, tint } from "@/content/storybridge-tokens";
import { FEATURED, LEVELS } from "@/content/storybridge-stories";

/**
 * The StoryBridge loop, as one story's journey.
 *
 * Follow "The Youngest Teacher" from prompt to reader. A dashed path carries
 * it across six stops; each stop is a person (green) or the AI (clay), and the
 * AI is never first or last. Every stop shows the story as it looks at that
 * moment, in the product's own components, so the loop is something you watch
 * happen rather than a diagram you decode.
 */
type Step = {
  role: string;
  title: string;
  detail: string;
  ai: boolean;
  show: () => ReactNode;
};

const mono = "mono tracking-widest uppercase";

const card = (children: ReactNode) => (
  <div className="w-full max-w-[300px] rounded-xl bg-white p-4 text-left shadow-[0_10px_30px_-18px_rgba(0,0,0,0.5)]" style={{ color: SB.ink }}>
    {children}
  </div>
);

const STEPS: Step[] = [
  {
    role: "Prompt",
    title: "Weekly prompt",
    ai: false,
    detail: "A person starts it. Not an algorithm deciding what a class should write about this week.",
    show: () =>
      card(
        <>
          <p className={`${mono} text-[9.5px]`} style={{ color: SB.green }}>This week&rsquo;s prompt</p>
          <p className="sb-display mt-2 text-[17px] leading-snug">
            Write about a time someone younger taught you something.
          </p>
          <p className="mt-2 text-[11px]" style={{ color: SB.muted }}>Example prompt</p>
        </>,
      ),
  },
  {
    role: "Author",
    title: "A high schooler writes",
    ai: false,
    detail: "The story is written by a teenager for a real reader, which is the part a grade cannot substitute for.",
    show: () =>
      card(
        <>
          <span className={`${mono} rounded px-2 py-0.5 text-[9.5px]`} style={{ background: tint(SB.muted, 20), color: SB.muted }}>Draft</span>
          <p className="sb-display mt-2 text-[18px]">{FEATURED.title}</p>
          <div className="mt-3 space-y-1.5" aria-hidden>
            {[100, 92, 70].map((w) => (
              <div key={w} className="h-1.5 rounded-full" style={{ width: `${w}%`, background: SB.surface }} />
            ))}
          </div>
        </>,
      ),
  },
  {
    role: "AI",
    title: "AI moderates",
    ai: true,
    detail: "The first place the machine appears. It screens and flags. It does not decide, and it does not write.",
    show: () =>
      card(
        <>
          <p className="sb-display text-[16px]">{FEATURED.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className={`${mono} rounded px-2 py-1 text-[9.5px]`} style={{ background: tint(SB.mint, 32), color: SB.green }}>AI: Clear</span>
            <span className={`${mono} rounded px-2 py-1 text-[9.5px]`} style={{ background: tint(SB.coral, 30), color: "#9A3B40" }}>Age score: 30/100</span>
          </div>
          <p className="mt-3 text-[11.5px]" style={{ color: SB.muted }}>A label for a person to read, not a verdict.</p>
        </>,
      ),
  },
  {
    role: "Teacher",
    title: "A teacher publishes",
    ai: false,
    detail: "A person holds the gate. Nothing reaches a child because a score cleared a threshold on its own.",
    show: () =>
      card(
        <>
          <p className="sb-display text-[16px]">{FEATURED.title}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Approve", "Request changes", "Override"].map((b, i) => (
              <span
                key={b}
                className={`${mono} rounded-md px-2.5 py-1.5 text-[9.5px]`}
                style={i === 0 ? { background: SB.green, color: SB.paper } : { border: `1px solid ${SB.line}`, color: SB.muted }}
              >
                {b}
              </span>
            ))}
          </div>
          <span className={`${mono} mt-3 inline-block rounded px-2 py-1 text-[9.5px]`} style={{ background: SB.green, color: SB.paper }}>Published</span>
        </>,
      ),
  },
  {
    role: "AI",
    title: "AI adapts the level",
    ai: true,
    detail: "The second and last place the machine appears. It makes a version. The author's text is untouched.",
    show: () =>
      card(
        <>
          <p className={`${mono} text-[9.5px]`} style={{ color: SB.accent }}>Reading level</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Original", ...LEVELS].map((l, i) => (
              <span
                key={l}
                className="mono rounded-md px-2.5 py-1 text-[10.5px]"
                style={i === 0 ? { background: SB.accent, color: SB.paper } : { background: SB.surface, color: SB.muted }}
              >
                {l}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11.5px]" style={{ color: SB.muted }}>Original stays the default. Bands swap words, never sentences.</p>
        </>,
      ),
  },
  {
    role: "Reader",
    title: "A K-8 kid reads",
    ai: false,
    detail: "A person ends it, reading something another person wrote. Then the loop closes back to next week's prompt.",
    show: () => (
      <div className="w-full max-w-[300px] rounded-xl px-5 py-4 text-left" style={{ background: SB.paper, color: SB.ink }}>
        <p className={`${mono} text-[9.5px]`} style={{ color: SB.muted }}>Stories for you</p>
        <div className="mt-2 rounded-lg px-4 py-3" style={{ background: SB.accent, color: SB.paper }}>
          <p className="sb-display text-[17px] italic">{FEATURED.title}</p>
          <p className={`${mono} mt-1 text-[9px]`}>{FEATURED.byline.join(" · ")}</p>
        </div>
      </div>
    ),
  },
];

export default function SbLoop() {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const colour = step.ai ? SB.accent : SB.green;
  const go = (n: number) => setI((n + STEPS.length) % STEPS.length);

  return (
    <div className="rounded-2xl border p-5 sm:p-8" style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`${mono} text-[10px] font-bold`} style={{ color: SB.muted }}>
          Follow one story through the loop
        </p>
        <div className={`${mono} flex gap-5 text-[10px]`}>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SB.green }} aria-hidden />
            People
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SB.accent }} aria-hidden />
            AI
          </span>
        </div>
      </div>

      {/* The path: six stops on a dashed line that fills as the story travels */}
      <div className="relative mt-8 px-2">
        <div className="absolute left-6 right-6 top-[18px] border-t-2 border-dashed" style={{ borderColor: SB.line }} aria-hidden />
        <div
          className="absolute left-6 top-[18px] border-t-2 transition-all duration-500"
          style={{ borderColor: colour, width: `calc((100% - 3rem) * ${i / (STEPS.length - 1)})` }}
          aria-hidden
        />
        <ol className="relative flex list-none justify-between p-0">
          {STEPS.map((s, n) => {
            const c = s.ai ? SB.accent : SB.green;
            const on = n === i;
            const done = n < i;
            return (
              <li key={n} className="flex w-10 flex-col items-center">
                <button
                  onClick={() => setI(n)}
                  aria-label={`Step ${n + 1}: ${s.title}`}
                  aria-current={on ? "step" : undefined}
                  className="mono flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold transition"
                  style={{
                    background: on || done ? c : "#fff",
                    color: on || done ? SB.paper : c,
                    border: `2px solid ${c}`,
                    transform: on ? "scale(1.15)" : "none",
                  }}
                >
                  {String(n + 1).padStart(2, "0")}
                </button>
                <span
                  className={`${mono} mt-2 hidden text-center text-[9px] sm:block`}
                  style={{ color: on ? c : SB.muted }}
                >
                  {s.role}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* The stop: the story as it looks right now, beside what is happening */}
      <div key={i} className="sb-fade mt-8 grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="flex min-h-[230px] items-center justify-center rounded-2xl p-6" style={{ background: colour }}>
          {step.show()}
        </div>
        <div>
          <p className={`${mono} text-[10px] font-bold`} style={{ color: colour }}>
            Step {String(i + 1).padStart(2, "0")} · {step.ai ? "The AI" : "A person"} · {step.role}
          </p>
          <p className="sb-display mt-2 text-2xl leading-tight">{step.title}</p>
          <p className="mt-3 text-[15px] leading-snug">{step.detail}</p>
          <div className="mt-5 flex gap-2">
            <button
              onClick={() => go(i - 1)}
              className={`${mono} rounded-md border px-3.5 py-2 text-[10.5px]`}
              style={{ borderColor: SB.line, color: SB.muted, background: "#fff" }}
            >
              ← Back
            </button>
            <button
              onClick={() => go(i + 1)}
              className={`${mono} rounded-md px-3.5 py-2 text-[10.5px]`}
              style={{ background: SB.ink, color: SB.paper }}
            >
              {i === STEPS.length - 1 ? "Back to the prompt ↺" : "Next stop →"}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-7 text-center text-[13px]" style={{ color: SB.muted }}>
        Illich called this a learning web: people linked to people. The AI is the connective tissue, never the teacher.
      </p>
    </div>
  );
}
