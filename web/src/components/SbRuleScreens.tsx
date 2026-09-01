"use client";

import { useState } from "react";

/**
 * The two screens where the rule is actually enforced, built rather than
 * exported. The Figma frames are 413px wide and go soft on any decent
 * display; this stays sharp, reflows, and can be read aloud.
 *
 * Content is from her designs.
 */
const GREEN = "#2F5233";
const GREEN_BG = "#DCE8DE";
const FLAG_BG = "#F6DFDA";

const STATS = [
  { n: "7", label: "Published" },
  { n: "136", label: "Reads" },
  { n: "2", label: "Drafts" },
];

const LEVELS = ["3rd–4th", "5th–6th", "7th–8th"];

const QUEUE = [
  { title: "The Secret Garden…", verdict: "AI: CLEAR", flagged: false },
  { title: "Storm Season", verdict: "AI: FLAGGED — review", flagged: true },
  { title: "My Robot Friend", verdict: "AI: CLEAR", flagged: false },
];

export default function SbRuleScreens({ accent = "#B5502F" }: { accent?: string }) {
  const [view, setView] = useState<"levels" | "queue">("levels");
  const [level, setLevel] = useState(0);

  const tab = (on: boolean) =>
    `mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
      on
        ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
        : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
    }`;

  const navItem = (label: string, on: boolean) => (
    <span
      key={label}
      className="mono text-[11px] tracking-widest"
      style={
        on
          ? { color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: 2 }
          : { opacity: 0.5 }
      }
    >
      {label}
    </span>
  );

  return (
    <figure className="m-0">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setView("levels")} className={tab(view === "levels")}>
          Levels, not rewrites
        </button>
        <button onClick={() => setView("queue")} className={tab(view === "queue")}>
          A human decides
        </button>
      </div>

      <div
        className="mt-5 overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--kraft)", background: "var(--paper)" }}
      >
        {/* window chrome */}
        <div
          className="flex flex-wrap items-center gap-5 border-b px-5 py-3"
          style={{ borderColor: "var(--kraft)" }}
        >
          <span className="flex gap-1.5" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-2.5 w-2.5 rounded-full"
                style={{ background: "var(--kraft)" }}
              />
            ))}
          </span>
          <span className="display text-base">Storybridge</span>
          <nav className="flex gap-5">
            {navItem("Author", view === "levels")}
            {navItem("Reader", false)}
            {navItem("Admin", view === "queue")}
          </nav>
        </div>

        <div className="px-5 py-6 sm:px-7">
          {view === "levels" ? (
            <>
              <h3 className="display text-2xl">Welcome back, Anna</h3>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border p-3"
                    style={{ borderColor: "var(--kraft)" }}
                  >
                    <div className="display text-2xl">{s.n}</div>
                    <div className="mono mt-0.5 text-[11px] tracking-widest opacity-60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-4 rounded-lg border p-4"
                style={{ borderColor: "var(--kraft)" }}
              >
                <div className="flex flex-wrap gap-2">
                  <span
                    className="mono rounded px-2 py-0.5 text-[9.5px] tracking-widest"
                    style={{ background: GREEN_BG, color: GREEN }}
                  >
                    PUBLISHED
                  </span>
                  <span
                    className="mono rounded px-2 py-0.5 text-[9.5px] tracking-widest"
                    style={{ background: FLAG_BG, color: accent }}
                  >
                    AGE SCORE 30/100
                  </span>
                </div>
                <p className="display mt-3 text-xl">The Youngest Teacher</p>
              </div>

              <p className="mt-6 text-[13.5px] font-semibold">
                <span aria-hidden>✨ </span>See how readers experience it
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {LEVELS.map((l, i) => (
                  <button
                    key={l}
                    onClick={() => setLevel(i)}
                    aria-pressed={i === level}
                    className="mono rounded-md px-3 py-1.5 text-[11px] tracking-widest transition"
                    style={
                      i === level
                        ? { background: accent, color: "var(--paper)" }
                        : { background: "var(--cream2)" }
                    }
                  >
                    {l}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-snug opacity-70">
                Previewing <b>{LEVELS[level]}</b>. Your original text is never
                changed. This is only what readers see.
              </p>
            </>
          ) : (
            <>
              <h3 className="display text-2xl">Moderation Queue</h3>
              <p className="mono mt-1 text-[11px] tracking-widest opacity-55">
                AI SCREENS FIRST — A HUMAN DECIDES.
              </p>

              <ul className="mt-5 list-none space-y-3 p-0">
                {QUEUE.map((q) => (
                  <li
                    key={q.title}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                    style={{ borderColor: "var(--kraft)" }}
                  >
                    <div>
                      <p className="display text-lg">{q.title}</p>
                      <span
                        className="mono mt-2 inline-block rounded px-2 py-0.5 text-[9.5px] tracking-widest"
                        style={
                          q.flagged
                            ? { background: FLAG_BG, color: accent }
                            : { background: GREEN_BG, color: GREEN }
                        }
                      >
                        {q.verdict}
                      </span>
                    </div>
                    <span
                      className="mono rounded-md px-4 py-2 text-[11px] tracking-widest text-[var(--paper)]"
                      style={{ background: GREEN }}
                    >
                      Review
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <figcaption className="mono mt-3 text-[11px] tracking-wide opacity-60">
        {view === "levels"
          ? "The author keeps the original and previews what each band reads."
          : "The AI marks its judgement. A person acts on it."}
      </figcaption>
    </figure>
  );
}
