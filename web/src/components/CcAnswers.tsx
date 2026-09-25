"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 06: all fourteen open answers, verbatim, from the two sessions that
 * reached the open question. The text claims a theme; the filter lets a reader
 * check the claim against the raw answers instead of taking it on trust.
 */

type Theme = "guidance" | "sooner" | "peers" | "felt";

const ANSWERS: { text: string; theme: Theme }[] = [
  { text: "Have projects before applying (first cycle) that you can talk about.", theme: "sooner" },
  { text: "resume workshop", theme: "guidance" },
  { text: "Start gaining professional/technical experience as soon as you can before Co-Op starts.", theme: "sooner" },
  { text: "Had more sessions on building projects for resume and more intensive questions for different technical questions.", theme: "guidance" },
  { text: "portfolio building advice", theme: "guidance" },
  { text: "There's a website which has previous neu coops giving their experience at a company. Really helpful to watch before interview prep, and why they want to apply", theme: "peers" },
  { text: "Don't be afraid to turn down offers", theme: "guidance" },
  { text: "Guidance for internationals! Less jobs and even less return offers generally", theme: "guidance" },
  { text: "Job searching sucks if you're an art related major", theme: "felt" },
  { text: "I find myself split between academic responsibilities and application efforts.", theme: "felt" },
  { text: "Take clinical skills classes earlier to expand job options.", theme: "sooner" },
  { text: "More guidance on creating your own co-op would have been good. It was relatively easy to set up for me but really worked because I was able to reach out to my connections and advocate for myself.", theme: "guidance" },
  { text: "Find a mentor or people with different coops and just have them refer you to their coop - for your first one at least will make it a lot easier", theme: "peers" },
  { text: "Knowing about the pacing/course scheduling of the major as well as knowing what my options were outside of NuWorks. Once I learned how to self-develop a co-op I never looked back.", theme: "sooner" },
];

const THEMES: { key: Theme | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "guidance", label: "Guidance and advice" },
  { key: "sooner", label: "Knowing sooner" },
  { key: "peers", label: "Past co-ops" },
  { key: "felt", label: "How it felt" },
];

/** Set the word itself in bold wherever a student used it. */
function withGuidance(text: string) {
  const parts = text.split(/(guidance|Guidance)/);
  return parts.map((p, k) =>
    /guidance/i.test(p) ? (
      <b key={k} className="font-semibold" style={{ color: CC.red }}>
        {p}
      </b>
    ) : (
      <span key={k}>{p}</span>
    ),
  );
}

export default function CcAnswers({ accent = "#111111" }: { accent?: string }) {
  const [t, setT] = useState<Theme | "all">("all");
  const count = (k: Theme | "all") => (k === "all" ? ANSWERS.length : ANSWERS.filter((a) => a.theme === k).length);

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest" style={{ color: accent }}>
        &ldquo;WHAT&rsquo;S ONE PIECE OF ADVICE OR RESOURCE THAT WOULD HAVE MADE YOUR CO-OP SEARCH EASIER?&rdquo;
      </figcaption>
      <div role="tablist" aria-label="Filter answers by theme" className="mt-3 flex flex-wrap gap-2">
        {THEMES.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={t === x.key}
            onClick={() => setT(x.key)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              t === x.key
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#D9D9D9] hover:border-[#111111]"
            }`}
          >
            {x.label} · {count(x.key)}
          </button>
        ))}
      </div>

      <ul className="mt-5 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
        {ANSWERS.map((a) => {
          const on = t === "all" || a.theme === t;
          return (
            <li
              key={a.text}
              className="rounded-xl border bg-white p-4 transition-all duration-300"
              style={{
                borderColor: on && t !== "all" ? CC.red : "#D9D9D9",
                opacity: on ? 1 : 0.25,
              }}
            >
              <blockquote className="m-0 text-[14px] leading-snug">{withGuidance(a.text)}</blockquote>
            </li>
          );
        })}
      </ul>
      <p className="serif mt-3 text-base leading-relaxed opacity-75">
        All fourteen answers, verbatim, from the two sessions that reached this question.
      </p>
    </figure>
  );
}
