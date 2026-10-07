"use client";

import { useState, type ReactNode } from "react";
import { SB, tint } from "@/content/storybridge-tokens";
import {
  AUTHOR_STATS,
  FEATURED,
  LEVELS,
  LIBRARY,
  QUEUE,
} from "@/content/storybridge-stories";

/**
 * The design system as something to play with rather than a sheet to scan.
 * Pick a component from the row of chips; it appears large, running, in the
 * product's own palette and type, with the one job it does and where it lives
 * in the three roles. Where a component has states, you can step through them.
 * Every example uses the same stories as the rest of the page.
 */
const mono = "mono tracking-widest uppercase";

type Part = {
  name: string;
  job: string;
  lives: string;
  render: (step: number) => ReactNode;
  steps?: string[];
};

function BrowseCard({ s }: { s: (typeof LIBRARY)[number] }) {
  return (
    <div
      className="w-[240px] overflow-hidden rounded-xl border"
      style={{ borderColor: SB.line, background: SB.paper }}
    >
      <div className="flex h-24 items-center justify-center text-2xl" style={{ background: s.c, color: "#fff" }}>
        ✦
      </div>
      <div className="px-4 py-3">
        <p className="sb-display text-[17px] leading-tight">{s.title}</p>
        <p className={`${mono} mt-1.5 text-[10px]`} style={{ color: SB.muted }}>
          {s.grade} · {s.tag}
        </p>
      </div>
    </div>
  );
}

const BADGES = [
  { t: "Published", bg: SB.green, fg: SB.paper },
  { t: "Draft", bg: tint(SB.muted, 20), fg: SB.muted },
  { t: "Age score: 30/100", bg: tint(SB.coral, 30), fg: "#9A3B40" },
  { t: "AI: Flagged · review", bg: tint(SB.accent, 18), fg: SB.accent },
];

const PARTS: Part[] = [
  {
    name: "Browse card",
    job: "A cover colour, the title, then reading level and theme. Nothing ranked.",
    lives: "Reader · Browse Stories",
    steps: LIBRARY.map((s) => s.title),
    render: (n) => <BrowseCard s={LIBRARY[n]} />,
  },
  {
    name: "Featured story",
    job: "One story at a time gets the banner, with the writer named first.",
    lives: "Reader · top of the home screen",
    render: () => (
      <div className="w-full max-w-md rounded-xl px-6 py-5" style={{ background: SB.accent, color: SB.paper }}>
        <p className="sb-display text-2xl italic">{FEATURED.title}</p>
        <p className={`${mono} mt-1.5 text-[11px]`}>{FEATURED.byline.join(" · ")}</p>
      </div>
    ),
  },
  {
    name: "Badge",
    job: "What state a story is in, and what the AI thought of it. The AI's view is always a label, never a decision.",
    lives: "Author · Your Stories · Admin · Moderation Queue",
    steps: BADGES.map((b) => b.t),
    render: (n) => (
      <span className={`${mono} rounded px-3 py-1.5 text-[12px]`} style={{ background: BADGES[n].bg, color: BADGES[n].fg }}>
        {BADGES[n].t}
      </span>
    ),
  },
  {
    name: "Level picker",
    job: "The author previews each band; the reader opts in. Original is always the default.",
    lives: "Author · See how readers experience it",
    steps: ["Original", ...LEVELS],
    render: (n) => (
      <div className="w-full max-w-md rounded-xl border bg-white p-4" style={{ borderColor: SB.line }}>
        <p className={`${mono} text-[10px]`} style={{ color: SB.accent }}>See how readers experience it</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Original", ...LEVELS].map((l, i) => (
            <span
              key={l}
              className="mono rounded-md px-3 py-1.5 text-[11px]"
              style={i === n ? { background: SB.accent, color: SB.paper } : { background: SB.surface, color: SB.muted }}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[12.5px]" style={{ color: SB.muted }}>
          {n === 0
            ? "Readers see your words exactly as written."
            : `Previewing ${LEVELS[n - 1]}. Your original text is never changed.`}
        </p>
      </div>
    ),
  },
  {
    name: "Queue item",
    job: "What the AI screened, waiting for a person. Flagged stories cannot publish on their own.",
    lives: "Admin · Moderation Queue",
    steps: QUEUE.map((q) => q.title),
    render: (n) => {
      const q = QUEUE[n];
      return (
        <div className="flex w-full max-w-md items-center justify-between gap-3 rounded-xl border bg-white px-4 py-3" style={{ borderColor: SB.line }}>
          <p className="sb-display text-[16px]">{q.title}</p>
          <span
            className={`${mono} shrink-0 rounded px-2 py-1 text-[10px]`}
            style={q.flagged ? { background: tint(SB.accent, 18), color: SB.accent } : { background: tint(SB.mint, 32), color: SB.green }}
          >
            {q.verdict}
          </span>
        </div>
      );
    },
  },
  {
    name: "Stat card",
    job: "One number, one word under it. Reads, not streaks.",
    lives: "Author · dashboard",
    steps: AUTHOR_STATS.map((s) => s.short),
    render: (n) => (
      <div className="w-[220px] rounded-xl border bg-white px-5 py-4" style={{ borderColor: SB.line }}>
        <p className={`${mono} text-[10px]`} style={{ color: SB.muted }}>{AUTHOR_STATS[n].label}</p>
        <p className="sb-display mt-1 text-4xl">{AUTHOR_STATS[n].n}</p>
        <p className="mt-1 text-[12.5px]" style={{ color: SB.muted }}>{AUTHOR_STATS[n].note}</p>
      </div>
    ),
  },
  {
    name: "Button",
    job: "One action leads each screen; everything else is quiet.",
    lives: "Author · New Story · Reader · Read Story",
    steps: ["Primary", "Secondary"],
    render: (n) =>
      n === 0 ? (
        <span className={`${mono} rounded-md px-5 py-2.5 text-[12px]`} style={{ background: SB.accent, color: SB.paper }}>
          New story
        </span>
      ) : (
        <span className={`${mono} rounded-md border bg-white px-5 py-2.5 text-[12px]`} style={{ borderColor: SB.line, color: SB.ink }}>
          Edit
        </span>
      ),
  },
  {
    name: "Role tabs",
    job: "Which of the three roles you are in. The same header on every side.",
    lives: "Every screen",
    steps: ["Author", "Reader", "Admin"],
    render: (n) => (
      <div className="flex w-full max-w-md items-center justify-between rounded-xl border bg-white px-4 py-3" style={{ borderColor: SB.line }}>
        <span className="sb-display text-[16px]">Storybridge</span>
        <span className={`${mono} flex gap-1 text-[10.5px]`}>
          {["Author", "Reader", "Admin"].map((r, i) => (
            <span key={r} className="rounded-md px-2.5 py-1" style={i === n ? { background: SB.accent, color: SB.paper } : { color: SB.muted }}>
              {r}
            </span>
          ))}
        </span>
      </div>
    ),
  },
];

export default function SbExplorer() {
  const [p, setP] = useState(0);
  const [step, setStep] = useState(0);
  const part = PARTS[p];
  const steps = part.steps ?? [];

  return (
    <div className="rounded-2xl border p-5 sm:p-7" style={{ borderColor: SB.line, background: "#fff", color: SB.ink }}>
      <p className={`${mono} text-[10px]`} style={{ color: SB.muted }}>
        Eight components · pick one
      </p>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="StoryBridge components">
        {PARTS.map((x, n) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={n === p}
            onClick={() => {
              setP(n);
              setStep(0);
            }}
            className="rounded-lg px-3.5 py-2 text-[13px] transition"
            style={
              n === p
                ? { background: SB.green, color: SB.paper }
                : { background: tint(SB.mint, 26), color: SB.green }
            }
          >
            {x.name}
          </button>
        ))}
      </div>

      <div key={`${p}-${step}`} className="sb-fade mt-5 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <div
          className="flex min-h-[220px] items-center justify-center rounded-xl p-6"
          style={{ background: SB.paper, border: `1px dashed ${SB.line}` }}
        >
          {part.render(step)}
        </div>
        <div className="flex flex-col justify-center">
          <p className="sb-display text-2xl">{part.name}</p>
          <p className="mt-2 text-[14.5px] leading-snug">{part.job}</p>
          <p className={`${mono} mt-4 text-[10px]`} style={{ color: SB.muted }}>Lives in</p>
          <p className="mt-1 text-[13px]" style={{ color: SB.muted }}>{part.lives}</p>

          {steps.length > 1 && (
            <>
              <p className={`${mono} mt-4 text-[10px]`} style={{ color: SB.muted }}>
                States · {step + 1} of {steps.length}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {steps.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setStep(i)}
                    className="mono rounded border px-2 py-1 text-[10.5px] transition"
                    style={
                      i === step
                        ? { background: SB.ink, color: SB.paper, borderColor: SB.ink }
                        : { borderColor: SB.line, color: SB.muted }
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
