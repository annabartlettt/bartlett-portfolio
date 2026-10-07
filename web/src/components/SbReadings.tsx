"use client";

import { useState } from "react";
import { SB, tint } from "@/content/storybridge-tokens";

/**
 * The three readings, one at a time.
 *
 * The board used to show all three as dense cards side by side, which read as
 * a wall of text. Now a reader picks a reading and watches it turn into a
 * decision as a short exchange: what the reading argues, what StoryBridge did
 * about it, and the question it left the team holding. Each line is short;
 * the color carries which reading you are in.
 */
const GOLD = "color-mix(in srgb, #F5C842 62%, #1E1B18)";

const READINGS = [
  {
    who: "Ivan Illich",
    title: "Deschooling Society",
    color: SB.accent,
    claim: "Real learning is a web linking people to each other, not permission handed down by an institution.",
    became: "So StoryBridge is that web: a high schooler and a K-8 reader connect directly, and teens write for a reader rather than a grade.",
    question: "Is our AI a car, a black box, or a mechanical donkey, a tool you understand? We chose the donkey.",
  },
  {
    who: "Nabeel Gillani",
    title: "Education as a social system",
    color: SB.ink,
    claim: "Children's outcomes are shaped by networks of people far more than by content delivery.",
    became: "So we optimized for one cross-age connection instead of test scores. The AI sits in the middle; the people stay on both ends.",
    question: "What should AI in education optimize for: content delivery, or connection-building?",
  },
  {
    who: "Chetty et al.",
    title: "Neighborhoods and mobility",
    color: GOLD,
    claim: "Exposure shapes what a child believes is possible. You cannot become what you cannot imagine.",
    became: "So a young reader meets a real older writer, and sees people like them authoring stories worth reading.",
    question: "Can AI disrupt unequal network formation instead of mirroring it?",
  },
];

export default function SbReadings({ bare = false }: { bare?: boolean }) {
  const [i, setI] = useState(0);
  const r = READINGS[i];

  return (
    <div style={{ color: SB.ink }}>
      {!bare && (
        <p className="mono text-[10px] font-bold tracking-widest uppercase" style={{ color: SB.accent }}>
          Ideation · The readings
        </p>
      )}

      {/* Pick a reading */}
      <div role="tablist" aria-label="Course readings" className="grid gap-2 sm:grid-cols-3">
        {READINGS.map((x, n) => {
          const on = n === i;
          return (
            <button
              key={x.who}
              role="tab"
              aria-selected={on}
              onClick={() => setI(n)}
              className="rounded-xl px-4 py-3.5 text-left transition"
              style={{
                background: on ? x.color : "#fff",
                color: on ? SB.paper : SB.ink,
                border: `1px solid ${on ? x.color : SB.line}`,
              }}
            >
              <span
                className="mono block text-[9.5px] font-bold tracking-widest uppercase"
                style={{ color: on ? SB.paper : x.color, opacity: on ? 0.8 : 1 }}
              >
                Reading {String(n + 1).padStart(2, "0")} · {x.who}
              </span>
              <span className="sb-display mt-1 block text-[17px] leading-tight">{x.title}</span>
            </button>
          );
        })}
      </div>

      {/* The exchange: argues, became, asks */}
      <div
        key={i}
        className="sb-fade mt-4 rounded-2xl p-5 sm:p-7"
        style={{ background: tint(r.color, 12) }}
        role="tabpanel"
      >
        <div className="max-w-xl rounded-lg bg-white px-4 py-3" style={{ border: `1px solid ${SB.line}` }}>
          <p className="mono text-[9.5px] tracking-widest uppercase" style={{ color: SB.muted }}>
            The reading argues
          </p>
          <p className="mt-1.5 text-[15px] leading-snug">{r.claim}</p>
        </div>

        <div
          className="ml-auto mt-3 max-w-xl rounded-lg px-4 py-3"
          style={{ background: r.color, color: SB.paper }}
        >
          <p className="mono text-[9.5px] tracking-widest uppercase opacity-80">It became</p>
          <p className="sb-display mt-1.5 text-[17px] leading-snug">{r.became}</p>
        </div>

        <div
          className="mt-3 max-w-xl rounded-lg bg-white px-4 py-3"
          style={{ borderLeft: `4px solid ${r.color}` }}
        >
          <p className="mono text-[9.5px] tracking-widest uppercase" style={{ color: SB.muted }}>
            The question it left us
          </p>
          <p className="mt-1.5 text-[14.5px] leading-snug italic">{r.question}</p>
        </div>
      </div>

      {/* The rule it set, and why it matters */}
      <figure
        className="m-0 mt-4 rounded-2xl px-6 py-7 text-center sm:px-10"
        style={{ background: SB.green, color: SB.paper }}
      >
        <p className="mono text-[10px] tracking-widest uppercase opacity-75">The principle underneath</p>
        <blockquote className="sb-display mx-auto mt-3 max-w-2xl text-xl leading-snug sm:text-2xl">
          &ldquo;You rarely see who your students become. You teach them anyway, so
          they have the best chance. We built the AI to protect that
          relationship, never replace it.&rdquo;
        </blockquote>
        <figcaption className="mono mt-4 text-[10px] tracking-widest uppercase opacity-75">
          From a note about my mom, an educator
        </figcaption>
      </figure>
    </div>
  );
}
