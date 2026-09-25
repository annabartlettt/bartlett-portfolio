"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 07: the first run and the next run, one switch apart. Every "next
 * run" line is a lesson Anna and the team actually took from the sessions; none
 * of them is a hypothetical improvement added for the page.
 */

const ROWS = [
  {
    topic: "Questions",
    first: "Asked how rejection felt. Honest answers, nothing to act on.",
    next: "Every question leads to something the administration can change.",
  },
  {
    topic: "Notes",
    first: "Thorough notes, but no record of who said what.",
    next: "Each speaker's major and class year written beside their words.",
  },
  {
    topic: "Turnout",
    first: "Students signed up and didn't always show up.",
    next: "Invite more students than each session needs, and confirm the day before.",
  },
  {
    topic: "Timing",
    first: "Invitations went out late in the semester.",
    next: "Invitations go out early in the semester.",
  },
  {
    topic: "Reach",
    first: "Recruited through a mail merge alone.",
    next: "Also reach student clubs through Instagram, as a student suggested.",
  },
];

export default function CcRedo({ accent = "#111111" }: { accent?: string }) {
  const [next, setNext] = useState(false);

  return (
    <figure className="m-0 my-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          {next ? "THE NEXT RUN" : "THE FIRST RUN"}
        </figcaption>
        <button
          role="switch"
          aria-checked={next}
          onClick={() => setNext((v) => !v)}
          className="mono flex items-center gap-3 text-[11px] tracking-widest"
        >
          <span className={next ? "opacity-50" : ""}>FIRST RUN</span>
          <span
            className="relative inline-block h-6 w-11 rounded-full transition"
            style={{ background: next ? CC.red : "#D9D9D9" }}
          >
            <span
              className="absolute top-1 h-4 w-4 rounded-full bg-white transition-all"
              style={{ left: next ? "1.5rem" : "0.25rem" }}
            />
          </span>
          <span className={next ? "" : "opacity-50"} style={{ color: next ? CC.red : undefined }}>
            NEXT RUN
          </span>
        </button>
      </div>

      <ul className="mt-4 list-none p-0" aria-live="polite">
        {ROWS.map((r) => (
          <li
            key={r.topic}
            className="grid grid-cols-[6rem_1fr] items-baseline gap-4 border-b border-[#D9D9D9] py-3 last:border-0"
          >
            <span className="mono text-[10.5px] font-bold tracking-widest" style={{ color: accent }}>
              {r.topic.toUpperCase()}
            </span>
            <span className={`serif text-[16.5px] leading-snug ${next ? "" : "opacity-80"}`}>
              {next ? r.next : r.first}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
