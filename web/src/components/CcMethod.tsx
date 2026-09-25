"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 04: the method as a sequence you can step through, plus the anatomy
 * of one session. Nothing here existed before the co-ops built it, which is
 * why it is drawn as a pipeline rather than described as one.
 */

const STEPS = [
  { name: "Propose", detail: "Pitched a focus group topic. My supervisor approved it before anything else happened." },
  { name: "Protocol", detail: "Wrote the questions, phrased so they wouldn't push students toward an answer." },
  { name: "Recruit", detail: "Mail merge to student lists from the co-op coordinators. The pitch: a real conversation, with feedback going straight to the Chancellor's office." },
  { name: "Sign up", detail: "One short form: home college, class year, co-ops completed, combined major, international status, availability." },
  { name: "Assign", detail: "Students placed into sessions based on their answers, with similar co-op experience in the same room." },
  { name: "Run", detail: "Four sessions of five to eight students at the Stearns Center. Twenty-five students in total." },
  { name: "Synthesize", detail: "A notetaker and a recording for every session, combined with the live poll data." },
  { name: "Present", detail: "The Senior Vice Chancellor for Education Innovation and her team." },
  { name: "Hand off", detail: "A written guide for the co-ops who came after us, kept in the Central Co-op archives." },
];

export default function CcMethod({ accent = "#111111" }: { accent?: string }) {
  const [i, setI] = useState(0);

  return (
    <figure className="m-0 my-10">
      <figcaption className="mono text-[11px] tracking-widest opacity-60">
        THE PIPELINE · STEP THROUGH IT
      </figcaption>

      <ol className="mt-4 grid list-none grid-cols-3 gap-2 p-0 sm:grid-cols-9">
        {STEPS.map((s, n) => {
          const done = n <= i;
          return (
            <li key={s.name}>
              <button
                onClick={() => setI(n)}
                aria-current={n === i ? "step" : undefined}
                className="w-full rounded-lg border px-1 py-2 text-center transition"
                style={{
                  borderColor: n === i ? CC.red : done ? accent : "#D9D9D9",
                  background: n === i ? CC.red : done ? "#F2F2F2" : "#fff",
                  color: n === i ? "#fff" : undefined,
                }}
              >
                <span className="mono block text-[9.5px] tracking-widest opacity-70">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="block text-[12px] font-medium leading-tight">{s.name}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-3 rounded-xl border border-[#D9D9D9] bg-white p-5"
        style={{ borderLeft: `4px solid ${CC.red}` }}
        aria-live="polite"
      >
        <p className="mono text-[10px] tracking-widest" style={{ color: CC.red }}>
          STEP {String(i + 1).padStart(2, "0")} OF {STEPS.length}
        </p>
        <p className="serif mt-1 text-lg leading-relaxed">{STEPS[i].detail}</p>
        <div className="mono mt-4 flex justify-between text-[11px] tracking-widest">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="underline-offset-2 hover:underline disabled:opacity-30"
          >
            ◂ BACK
          </button>
          <button
            onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
            disabled={i === STEPS.length - 1}
            className="underline-offset-2 hover:underline disabled:opacity-30"
            style={{ color: accent }}
          >
            NEXT ▸
          </button>
        </div>
      </div>

      {/* one session, to scale */}
      <p className="mono mt-8 text-[11px] tracking-widest opacity-60">ONE SESSION · 60 MINUTES, TO SCALE</p>
      <div className="mt-3 flex h-12 overflow-hidden rounded-lg border border-[#D9D9D9] text-[12px]">
        <div
          className="flex items-center px-3 font-medium"
          style={{ flex: 50, background: "#F2F2F2" }}
        >
          50 min · structured discussion
        </div>
        <div
          className="flex items-center justify-center px-2 text-center font-medium leading-tight"
          style={{ flex: 10, background: CC.red, color: "#fff" }}
        >
          10 · polls
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="rounded-lg border border-[#D9D9D9] bg-white p-3 text-center">
            <p className="mono text-[9.5px] tracking-widest opacity-55">SESSION {n}</p>
            <p className="display mt-1 text-lg">5 to 8</p>
            <p className="mono text-[9.5px] tracking-widest opacity-55">STUDENTS</p>
          </div>
        ))}
      </div>
      <p className="serif mt-3 text-base leading-relaxed opacity-75">
        Four sessions, twenty-five students, grouped by co-op experience.
      </p>
    </figure>
  );
}
