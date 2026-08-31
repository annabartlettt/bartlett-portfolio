"use client";

import { useState } from "react";
import Cabinet from "./Cabinet";
import SiteSearch from "./SiteSearch";
import type { Project, SearchData } from "@/sanity/types";

export const DISCIPLINES = [
  { value: "ux", title: "User Experience", accent: "#2F6D74" },
  { value: "computational", title: "Computational Design", accent: "#363f9e" },
  { value: "marcomm", title: "Marketing & Comms", accent: "#B5502F" },
  { value: "motion", title: "Motion & Video", accent: "#6B4E8E" },
];

/**
 * One sentence, then the work.
 *
 * The four disciplines used to be the way in, which meant a visitor met four
 * categories before meeting anything she made. They are a filter now, and the
 * projects themselves are the desktop: range shown by tagging each project
 * rather than by splitting the site into piles.
 */
export default function CabinetHome({
  projects,
  search,
}: {
  projects: Project[];
  search: SearchData;
}) {
  const [craft, setCraft] = useState<string | null>(null);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-6 sm:px-10">
        {/* The first thing a reviewer needs answered: what is this person. */}
        <p className="serif max-w-3xl text-lg leading-snug sm:text-xl">
          <b className="display">Anna Bartlett</b> is a designer in Washington DC
          working across brand and communications, product, and motion.
        </p>

        <h1 className="display mt-5 text-2xl leading-[1.15] sm:text-3xl md:text-4xl">
          What do you already know?
          <span className="mt-0.5 block sm:ml-[10%]">
            What do you need next?
          </span>
        </h1>

        <div className="mt-6 max-w-2xl">
          <SiteSearch data={search} />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <span className="mono mr-1 text-[10px] tracking-widest opacity-50">
            FILTER
          </span>
          <button
            onClick={() => setCraft(null)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              craft === null
                ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
                : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
            }`}
          >
            All
          </button>
          {DISCIPLINES.map((d) => {
            const on = craft === d.value;
            return (
              <button
                key={d.value}
                onClick={() => setCraft(on ? null : d.value)}
                className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
                  on
                    ? "text-[var(--cream)]"
                    : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
                }`}
                style={
                  on
                    ? { background: d.accent, borderColor: d.accent }
                    : { borderLeft: `4px solid ${d.accent}` }
                }
              >
                {d.title}
              </button>
            );
          })}
        </div>
      </section>

      <Cabinet projects={projects} craft={craft} />

      <section className="mx-auto max-w-6xl px-6 pt-4 sm:px-10">
        <dl className="border-t border-[var(--kraft)]">
          {[
            [
              "Education",
              "BFA Design, Marketing minor · Northeastern University · magna cum laude",
            ],
            [
              "Practice",
              "Interaction design · Research synthesis · Brand and communications · Motion",
            ],
            [
              "Available for",
              "Marketing and communications, design systems, civic and learning design · Washington DC",
            ],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col gap-1 border-b border-[var(--kraft)] py-2.5 sm:flex-row sm:gap-6"
            >
              <dt
                className="mono shrink-0 text-[10px] tracking-widest uppercase sm:w-36"
                style={{ color: "var(--ink)" }}
              >
                {k}
              </dt>
              <dd className="m-0 text-[13.5px] leading-snug opacity-80">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
