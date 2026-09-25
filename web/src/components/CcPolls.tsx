"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * The live polls from the focus groups, rebuilt from the Mentimeter export in
 * the site's own type. Every figure carries the n the slide reported, and the
 * numbers match the presentation deck given to the Senior Vice Chancellor.
 *
 * Three pieces are exported separately so the case study can set each one
 * directly under the paragraph that interprets it.
 */

type Group = "feeling" | "effort" | "system" | "positive" | "other";

/** Sized the way Mentimeter sized them: 3 = most chosen, 2 = second, 1 = the rest. */
const WORDS: { w: string; size: 1 | 2 | 3; group: Group }[] = [
  { w: "difficult", size: 1, group: "effort" },
  { w: "arduous", size: 1, group: "effort" },
  { w: "straightforward", size: 1, group: "positive" },
  { w: "draining", size: 1, group: "feeling" },
  { w: "emerging", size: 1, group: "other" },
  { w: "nervous", size: 1, group: "feeling" },
  { w: "tedious", size: 1, group: "effort" },
  { w: "anxious", size: 1, group: "feeling" },
  { w: "stressful", size: 3, group: "feeling" },
  { w: "crappy", size: 1, group: "other" },
  { w: "busy", size: 1, group: "effort" },
  { w: "long", size: 2, group: "effort" },
  { w: "isolating", size: 1, group: "feeling" },
  { w: "preserving", size: 1, group: "other" },
  { w: "intense", size: 1, group: "effort" },
  { w: "unresponsive", size: 1, group: "system" },
  { w: "chaotic", size: 1, group: "system" },
  { w: "competitive", size: 1, group: "system" },
];

const FILTERS: { key: Group | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "feeling", label: "How it felt" },
  { key: "effort", label: "The effort" },
  { key: "system", label: "The system" },
  { key: "positive", label: "Positive" },
];

const FILTER_NOTES: Record<string, string> = {
  all: "Twelve students, 23 words. Bigger means more students chose it.",
  feeling: "Stressful, the most chosen word of all, sits here.",
  effort: "Long was the second most chosen word.",
  system: "The only group a university can change directly. Unresponsive is what the NUworks dashboard suggestion was for.",
  positive: "One word out of 23.",
};

const OBSTACLES = [
  { name: "Competition level", note: "" },
  { name: "Interview preparation", note: "The one the university could most directly teach." },
  { name: "Professional networking", note: "" },
  { name: "Resume development", note: "Resume workshops already ran every week." },
];

const RESOURCES = [
  { label: "Co-op advisor", pct: 73, of11: 8 },
  { label: "NUworks", pct: 18, of11: 2 },
  { label: "Co-op class", pct: 9, of11: 1 },
  { label: "Career Services", pct: 0, of11: 0 },
  { label: "Other", pct: 0, of11: 0 },
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
        active
          ? "border-[#111111] bg-[#111111] text-white"
          : "border-[#D9D9D9] hover:border-[#111111]"
      }`}
    >
      {children}
    </button>
  );
}

export function PollWords({ accent = "#111111" }: { accent?: string }) {
  const [f, setF] = useState<Group | "all">("all");
  // One ink per group, so the three readings are visible before any filter is touched.
  const ink: Record<Group, string> = {
    feeling: accent,
    effort: CC.gray,
    system: CC.red,
    positive: "#A3A3A3",
    other: "#C4C4C4",
  };
  const size = { 1: "text-[20px] sm:text-[24px]", 2: "text-[34px] sm:text-[44px]", 3: "text-[48px] sm:text-[64px]" };

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        ONE WORD FOR THE CO-OP SEARCH · 23 RESPONSES
      </figcaption>
      <div role="tablist" aria-label="Group the words" className="mt-3 flex flex-wrap gap-2">
        {FILTERS.map((x) => (
          <Chip key={x.key} active={f === x.key} onClick={() => setF(x.key)}>
            {x.key !== "all" && (
              <span
                aria-hidden
                className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
                style={{ background: ink[x.key] }}
              />
            )}
            {x.label}
          </Chip>
        ))}
      </div>
      <ul className="mt-5 flex list-none flex-wrap items-baseline justify-center gap-x-5 gap-y-1 rounded-xl border border-[#D9D9D9] bg-white px-4 py-8 sm:gap-x-7">
        {WORDS.map((x) => {
          const on = f === "all" || x.group === f;
          return (
            <li
              key={x.w}
              className={`display leading-tight transition-opacity duration-300 ${size[x.size]}`}
              style={{ color: ink[x.group], opacity: on ? 1 : 0.15 }}
            >
              {x.w}
            </li>
          );
        })}
      </ul>
      <p className="serif mt-3 text-base leading-relaxed opacity-75" aria-live="polite">
        {FILTER_NOTES[f]}
      </p>
    </figure>
  );
}

export function PollRanking({ accent = "#111111" }: { accent?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        OBSTACLES, RANKED MOST TO LEAST CHALLENGING · 11 RESPONSES
      </figcaption>
      <ol className="mt-4 list-none p-0">
        {OBSTACLES.map((o, n) => (
          <li key={o.name} className="border-b border-[#D9D9D9] last:border-0">
            <button
              onClick={() => setOpen(open === n ? null : n)}
              disabled={!o.note}
              aria-expanded={o.note ? open === n : undefined}
              className="flex w-full items-baseline gap-4 py-3 text-left disabled:cursor-default"
            >
              <span className="mono text-[11px] font-bold tracking-widest" style={{ color: CC.red }}>
                {String(n + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px]" style={{ color: accent }}>
                {o.name}
              </span>
              {o.note && (
                <span className="mono ml-auto text-[10px] tracking-widest opacity-55">
                  {open === n ? "－" : "＋ WHY IT MATTERS"}
                </span>
              )}
            </button>
            {o.note && open === n && (
              <p className="serif -mt-1 pb-3 pl-9 text-base leading-relaxed opacity-80">{o.note}</p>
            )}
          </li>
        ))}
      </ol>
      <p className="serif mt-3 text-base leading-relaxed opacity-75">
        A ranking, so there are no bar lengths here to suggest distances nobody measured.
      </p>
    </figure>
  );
}

export function PollResources({ accent = "#111111" }: { accent?: string }) {
  const [hover, setHover] = useState(0);
  const r = RESOURCES[hover];

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        MOST-USED CAMPUS RESOURCE FOR CO-OP GUIDANCE · 11 RESPONSES
      </figcaption>
      <div className="mt-5 flex flex-col gap-3">
        {RESOURCES.map((x, n) => (
          <button
            key={x.label}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onClick={() => setHover(n)}
            className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-left sm:grid-cols-[9rem_1fr_3rem]"
          >
            <span className="text-[14px] leading-snug">{x.label}</span>
            <span className="h-3 w-full rounded-full" style={{ background: "#D9D9D9" }}>
              <span
                className="block h-3 rounded-full transition-all"
                style={{
                  width: `${x.pct}%`,
                  background: n === 0 ? CC.red : accent,
                  opacity: hover === n ? 1 : 0.55,
                }}
              />
            </span>
            <span
              className="display text-right text-[18px] tabular-nums"
              style={{ color: n === 0 ? CC.red : accent }}
            >
              {x.pct}%
            </span>
          </button>
        ))}
      </div>
      <p className="serif mt-4 text-base leading-relaxed opacity-75" aria-live="polite">
        <b className="font-semibold">{r.label}:</b> {r.of11} of 11 students.
        {r.label === "Career Services" && " The office built to share the advisors' load, and nobody named it."}
        {r.label === "Co-op advisor" && " One person carrying most of the guidance."}
      </p>
    </figure>
  );
}

/** The research sub-page shows all three together. */
export default function CcPolls({ accent = "#111111" }: { accent?: string }) {
  return (
    <section className="mx-auto max-w-4xl border-b border-[#D9D9D9] px-6 py-14">
      <p className="mono text-[12px] font-bold tracking-widest" style={{ color: accent }}>
        TEN MINUTES OF EVERY SIXTY · THE LIVE POLLS
      </p>
      <h2 className="display mt-3 text-3xl">Asked out loud, answered on their phones.</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">
        Fifty minutes of discussion, then ten of Mentimeter. The polls caught what a room will type but
        not say. Some students had to leave before the end, so the later polls have fewer responses.
      </p>
      <PollWords accent={accent} />
      <PollRanking accent={accent} />
      <PollResources accent={accent} />
    </section>
  );
}
