"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 02, shown instead of told: the brief's picture of the university
 * against the one she found while making the first posts. Same three colleges,
 * same weekly workshops. The only thing that changes between the two views is
 * whether the walls between colleges are visible.
 */

const COLLEGES = [
  { short: "CAMD", name: "College of Arts, Media and Design", href: "https://camd.northeastern.edu/" },
  { short: "D'AMORE-MCKIM", name: "D'Amore-McKim School of Business", href: "https://damore-mckim.northeastern.edu/" },
  { short: "KHOURY", name: "Khoury College of Computer Sciences", href: "https://www.khoury.northeastern.edu/" },
];

const VIEWS = [
  { key: "brief", label: "What the brief assumed" },
  { key: "noticed", label: "What I noticed" },
] as const;

type View = (typeof VIEWS)[number]["key"];

export default function CcSilos({ accent = "#111111" }: { accent?: string }) {
  const [view, setView] = useState<View>("brief");
  const noticed = view === "noticed";

  return (
    <figure className="m-0 my-10">
      <div role="tablist" aria-label="Two views of the same university" className="flex flex-wrap gap-2">
        {VIEWS.map((v) => (
          <button
            key={v.key}
            role="tab"
            aria-selected={view === v.key}
            onClick={() => setView(v.key)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              view === v.key
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#D9D9D9] hover:border-[#111111]"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-[#D9D9D9] bg-white p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-5">
          {COLLEGES.map((c) => (
            <div
              key={c.name}
              className="rounded-lg bg-[#F2F2F2] p-3 text-center transition-all duration-300"
              style={{
                border: noticed ? `3px solid ${accent}` : "1px solid #D9D9D9",
              }}
            >
              <p className="mono text-[9.5px] tracking-widest opacity-55">{c.short}</p>
              <p className="mt-1 text-[12.5px] font-medium leading-snug sm:text-[14px]">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#BDBDBD] underline-offset-4 transition hover:decoration-[#111111]"
                >
                  {c.name}
                  <span aria-hidden className="ml-1 text-[11px] no-underline" style={{ color: CC.red }}>
                    ↗
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
              <p className="serif mt-2 text-[12px] leading-snug opacity-75 sm:text-[13px]">
                Its own co-op outreach
              </p>
            </div>
          ))}
        </div>

        {/* the student between two colleges, only visible once the walls are */}
        <div className="mt-3 grid grid-cols-6" aria-hidden={!noticed}>
          <div
            className="col-span-2 col-start-2 flex justify-center transition-opacity duration-300"
            style={{ opacity: noticed ? 1 : 0 }}
          >
            <span
              className="mono rounded-full px-3 py-1 text-[9.5px] tracking-widest"
              style={{ background: CC.red, color: "#fff" }}
            >
              ▲ A COMBINED MAJOR, BETWEEN TWO
            </span>
          </div>
        </div>

        <div
          className="mt-3 rounded-lg p-3 text-center transition-all duration-300"
          style={
            noticed
              ? { border: "1px dashed #111111", opacity: 0.5 }
              : { background: accent, color: "#fff", border: `1px solid ${accent}` }
          }
        >
          <p className="text-[14px] font-medium">Career design workshops, every week</p>
          <p className="mono mt-1 text-[10px] tracking-widest opacity-80">
            {noticed ? "RUNNING THE WHOLE TIME. I HADN'T HEARD OF THEM." : "ONE ACCOUNT SHOWS EVERY STUDENT"}
          </p>
        </div>
      </div>

      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75" aria-live="polite">
        {noticed
          ? "The resources were real. The information stayed inside each college, and students between colleges fell through."
          : "The brief: post what exists, and every student finds what they need."}
      </figcaption>
    </figure>
  );
}
