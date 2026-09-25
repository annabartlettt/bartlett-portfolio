"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 08: the four suggestions from the presentation, each one opening onto
 * the evidence it answered. Recommendations read as opinions until you can see
 * what they were built on, so the trail is one click away rather than implied.
 */

const SUGGESTIONS = [
  {
    title: "A real-time application dashboard in NUworks",
    why: "So students could see where they stood, and employers would be held accountable.",
    evidence: [
      "\"Unresponsive\" in the one-word poll",
      "NUworks transparency named as a pain point",
      "\"Stressful\" and \"anxious\" in the one-word poll",
    ],
  },
  {
    title: "Career preparation organized by industry, not by major",
    why: "Careers now cross disciplines.",
    evidence: [
      "Combined majors and the gray area",
      "Marketing and communications jobs drew applicants from every college",
    ],
  },
  {
    title: "A bigger role for the Career Design Center",
    why: "To take pressure off co-op advisors.",
    evidence: [
      "73% named their co-op advisor as their main resource",
      "0% named Career Services",
      "Students didn't know the career design center existed",
    ],
  },
  {
    title: "Rebuild the first-year Intro to College class",
    why: "Into an actionable guide to becoming marketable before the search starts.",
    evidence: [
      "The Northeastern Paradox",
      "Students wished they had built projects and experience sooner",
      "Students called the class irrelevant to co-op",
    ],
  },
];

export default function CcSuggestions({ accent = "#111111" }: { accent?: string }) {
  const [open, setOpen] = useState(0);

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        FOUR SUGGESTIONS · OPEN ONE TO SEE WHAT IT WAS BUILT ON
      </figcaption>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SUGGESTIONS.map((s, n) => {
          const on = open === n;
          return (
            <button
              key={s.title}
              onClick={() => setOpen(n)}
              aria-expanded={on}
              className="rounded-xl border p-5 text-left transition-all duration-300"
              style={{
                borderColor: on ? accent : "#D9D9D9",
                background: on ? accent : "#fff",
                color: on ? "#fff" : undefined,
              }}
            >
              <span className="mono block text-[10px] tracking-widest opacity-70">
                SUGGESTION {String(n + 1).padStart(2, "0")}
              </span>
              <span className="display mt-1 block text-lg leading-snug">{s.title}</span>
              <span className="serif mt-2 block text-[14.5px] leading-snug opacity-85">{s.why}</span>
            </button>
          );
        })}
      </div>

      <div
        className="mt-3 rounded-xl border bg-white p-5"
        style={{ borderColor: CC.red, borderLeftWidth: 4 }}
        aria-live="polite"
      >
        <p className="mono text-[10px] tracking-widest" style={{ color: CC.red }}>
          THE EVIDENCE BEHIND SUGGESTION {String(open + 1).padStart(2, "0")}
        </p>
        <ul className="mt-3 list-none space-y-2 p-0">
          {SUGGESTIONS[open].evidence.map((e) => (
            <li key={e} className="flex gap-3 text-[15px] leading-snug">
              <span aria-hidden style={{ color: CC.red }}>
                ◆
              </span>
              <span>{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
