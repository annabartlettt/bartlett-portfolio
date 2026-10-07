"use client";

import { useState } from "react";
import { SB, tint } from "@/content/storybridge-tokens";

/**
 * Feedback, traced to what it changed.
 *
 * Pick who you want to hear from, then tap anything they said: the panel
 * beside it shows what the team did with it, marked as changed, kept, next,
 * or still open. Everything comes from sections 9, 11, 13, 14 and the
 * addendum of the team's ARTG 5000 final report, paraphrased.
 */
type Status = "Changed" | "Kept" | "Next" | "Open";

const STATUS: Record<Status, { bg: string; fg: string }> = {
  Changed: { bg: SB.green, fg: SB.paper },
  Kept: { bg: SB.ink, fg: SB.paper },
  Next: { bg: SB.accent, fg: SB.paper },
  Open: { bg: tint(SB.muted, 22), fg: SB.muted },
};

type Line = { said: string; status: Status; outcome: string; why: string };

const GROUPS: { who: string; band: string; colour: string; lines: Line[] }[] = [
  {
    who: "Teachers",
    band: "Educators",
    colour: SB.green,
    lines: [
      {
        said: "We would not trust AI moderation or leveling without a final human review.",
        status: "Changed",
        outcome: "AI became a quiet moderator, not a content generator",
        why: "The biggest shift in the project. A teacher approves, rejects, or overrides every story before a child sees it.",
      },
      {
        said: "We need control over content and assignments, and to see what students are doing.",
        status: "Next",
        outcome: "A teacher admin role that curates the library",
        why: "Filter by genre, grade, or subject, and send writing prompts straight to student authors.",
      },
      {
        said: "It has to fit the daily classroom routine, not sit beside it.",
        status: "Open",
        outcome: "Classroom pilot",
        why: "The prototype can't answer this. Only a real class, over real weeks, can.",
      },
      {
        said: "The cross-age connection is the strength. It makes the work meaningful.",
        status: "Kept",
        outcome: "Connection stays the reason the system exists",
        why: "Every later decision protects the older writer and the younger reader on either end.",
      },
    ],
  },
  {
    who: "High school writers",
    band: "Grades 9-12",
    colour: SB.accent,
    lines: [
      {
        said: "Writing for a younger reader felt more purposeful than a typical assignment.",
        status: "Kept",
        outcome: "A real reader at the end of every story",
        why: "The premise held: an audience did what a grade alone couldn't.",
      },
      {
        said: "We want more flexible prompts, and a clearer way to set our own.",
        status: "Changed",
        outcome: "Writers can tag their stories and set their own prompts",
        why: "In early testing, choosing their own prompts and tags gave writers more ownership of the work.",
      },
      {
        said: "Tie it to a class grade, or it competes with everything else.",
        status: "Open",
        outcome: "How StoryBridge counts in a class",
        why: "A real tension: grading could raise participation but pull writing back toward the grade.",
      },
      {
        said: "Who keeps our data, and who keeps this running next year?",
        status: "Open",
        outcome: "Data and long-term upkeep",
        why: "Named as a risk in the report. Privacy already limits what readers see to a first name and grade.",
      },
    ],
  },
];

export default function SbVoices() {
  const [g, setG] = useState(0);
  const [l, setL] = useState(0);
  const group = GROUPS[g];
  const line = group.lines[l];
  const mono = "mono tracking-widest uppercase";

  return (
    <div className="mt-8" style={{ color: SB.ink }}>
      {/* Who are you hearing from */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Who we heard from">
        {GROUPS.map((x, n) => (
          <button
            key={x.who}
            role="tab"
            aria-selected={n === g}
            onClick={() => {
              setG(n);
              setL(0);
            }}
            className="rounded-xl px-4 py-2.5 text-left transition"
            style={
              n === g
                ? { background: x.colour, color: SB.paper }
                : { background: "#fff", border: `1px solid ${SB.line}`, color: SB.ink }
            }
          >
            <span className={`${mono} block text-[9.5px]`} style={{ opacity: 0.8 }}>{x.band}</span>
            <span className="sb-display block text-[17px]">{x.who}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr]">
        {/* What they said */}
        <div className="space-y-2.5 rounded-2xl p-4 sm:p-5" style={{ background: tint(group.colour, 12) }}>
          <p className={`${mono} text-[10px]`} style={{ color: group.colour }}>What they said · tap one</p>
          {group.lines.map((x, n) => {
            const on = n === l;
            const bg = on ? group.colour : "#fff";
            return (
              <div key={x.said} className="flex items-end gap-2">
                <span
                  className="mono flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{ background: on ? group.colour : tint(group.colour, 30), color: on ? SB.paper : group.colour }}
                  aria-hidden
                >
                  {group.who[0]}
                </span>
                <button
                  onClick={() => setL(n)}
                  aria-pressed={on}
                  className="relative max-w-[88%] px-4 py-2.5 text-left text-[14px] leading-snug shadow-[0_6px_16px_-12px_rgba(0,0,0,0.45)] transition"
                  style={{ background: bg, color: on ? SB.paper : SB.ink, borderRadius: "18px 18px 18px 4px" }}
                >
                  <span
                    className="absolute -left-[5px] bottom-0 h-3 w-3"
                    style={{ background: bg, clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                    aria-hidden
                  />
                  {x.said}
                </button>
              </div>
            );
          })}
        </div>

        {/* What it changed */}
        <div
          key={`${g}-${l}`}
          className="sb-fade flex flex-col justify-center rounded-2xl border bg-white p-5 sm:p-7"
          style={{ borderColor: SB.line }}
        >
          <p className={`${mono} text-[10px]`} style={{ color: SB.muted }}>What it changed</p>
          <span
            className={`${mono} mt-3 inline-block self-start rounded px-2.5 py-1 text-[10.5px]`}
            style={{ background: STATUS[line.status].bg, color: STATUS[line.status].fg }}
          >
            {line.status}
          </span>
          <p className="sb-display mt-3 text-2xl leading-snug">{line.outcome}</p>
          <p className="mt-3 text-[14.5px] leading-snug" style={{ color: SB.muted }}>{line.why}</p>

          <div className="mt-6 flex flex-wrap gap-3 border-t pt-4" style={{ borderColor: SB.line }}>
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <span key={s} className={`${mono} flex items-center gap-1.5 text-[9.5px]`} style={{ color: SB.muted }}>
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS[s].bg }} aria-hidden />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        Paraphrased from validation conversations with high school writers and teachers · K-8 readers not yet tested
      </p>
    </div>
  );
}
