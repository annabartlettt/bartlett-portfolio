"use client";

import { useRef, useState } from "react";
import Cabinet from "./Cabinet";
import type { Project, Category } from "@/sanity/types";

export const DISCIPLINES = [
  {
    value: "ux",
    index: "F01 · RESEARCH & PROTOTYPING",
    title: "User Experience",
    line: "Apps, platforms and services people have to find their way through.",
    accent: "#2F6D74",
    tint: "#eaf1f1",
  },
  {
    value: "computational",
    index: "F02 · CODE AS MATERIAL",
    title: "Computational Design",
    line: "Code and data as material. Generative systems, p5.js, physicalisation.",
    accent: "#363f9e",
    tint: "#ecedf6",
  },
  {
    value: "marcomm",
    index: "F03 · BRAND & SOCIAL",
    title: "Marketing & Comms",
    line: "Brand systems, social, and the calendar underneath them.",
    accent: "#B5502F",
    tint: "#f8ece7",
  },
  {
    value: "motion",
    index: "F04 · SHOOT & CUT",
    title: "Motion & Video",
    line: "Shot, cut and scored. Premiere Pro, short form, stop motion.",
    accent: "#6B4E8E",
    tint: "#f0ebf6",
  },
];

/**
 * The landing page and the cabinet share one piece of state.
 *
 * Someone arriving here is usually looking for one kind of work, so the four
 * folders sit above the fold and open the cabinet already filtered. Choosing a
 * craft clears any theme filter, because a visitor who wants motion wants all
 * of it, not motion within whichever theme happened to be selected.
 *
 * The cards are drawn as folders because that is what the rest of the site
 * calls them: a coloured tab, a sheet of paper behind, and on hover the paper
 * slides out as though something is being pulled from the drawer.
 */
export default function CabinetHome({
  projects,
  categories,
}: {
  projects: Project[];
  categories: Category[];
}) {
  const [craft, setCraft] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const cabinet = useRef<HTMLDivElement>(null);

  function open(value: string) {
    setCraft(craft === value ? null : value);
    setTheme(null);
    cabinet.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-12">
        <p className="mono text-xs tracking-widest opacity-70">
          01 · INDEX · OPENING THE CABINET
        </p>
        <h1 className="display mt-3 text-4xl leading-[1.06] md:text-5xl">
          What do you already know?
          <br />
          What do you need next?
        </h1>
        <p className="serif mt-4 max-w-2xl text-lg italic opacity-80">
          The questions design school taught me, pointed at mobility data,
          anxiety, literacy, a symphony season, and a brand new university
          office. I have never once needed different ones.
        </p>

        <p className="mono mt-8 text-[11px] tracking-widest opacity-60">
          START WHEREVER YOU LIKE ↓
        </p>

        <div className="mt-4 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d) => {
            const on = craft === d.value;
            return (
              <button
                key={d.value}
                onClick={() => open(d.value)}
                aria-pressed={on}
                className="group relative block h-full pt-4 text-left"
              >
                {/* The tab, tucked under the cover so the two read as one piece. */}
                <span
                  aria-hidden
                  className={`absolute left-5 top-0 h-6 rounded-t-md transition-all duration-200 ${
                    on ? "w-32" : "w-24 group-hover:w-28"
                  }`}
                  style={{ background: d.accent }}
                />

                {/* The sheet inside, sliding out from under the cover. */}
                <span
                  aria-hidden
                  className={`absolute inset-x-1.5 top-4 bottom-0 rounded-xl border transition-transform duration-200 ${
                    on
                      ? "translate-y-2.5"
                      : "translate-y-1 group-hover:translate-y-2"
                  }`}
                  style={{
                    background: "var(--cream2)",
                    borderColor: "var(--kraft)",
                  }}
                />

                <div
                  className="relative flex h-full flex-col rounded-xl border p-4 transition-all duration-200 group-hover:-translate-y-0.5"
                  style={{
                    background: on ? d.tint : "var(--paper)",
                    borderColor: on ? d.accent : "var(--kraft)",
                    boxShadow: on
                      ? `0 8px 20px -12px ${d.accent}`
                      : "0 2px 8px -6px rgba(44,42,39,.4)",
                  }}
                >
                  <p
                    className="mono text-[9px] font-bold tracking-widest"
                    style={{ color: d.accent }}
                  >
                    {d.index}
                  </p>
                  <span
                    aria-hidden
                    className="mt-2 mb-2.5 block border-t border-dashed"
                    style={{ borderColor: on ? d.accent : "var(--kraft)" }}
                  />
                  <p
                    className="display text-lg leading-snug"
                    style={{ color: on ? d.accent : undefined }}
                  >
                    {d.title}
                  </p>
                  <p className="mt-1 flex-1 text-[13px] leading-snug opacity-75">
                    {d.line}
                  </p>
                  <p
                    className="mono mt-4 text-[10px] font-bold tracking-widest"
                    style={{ color: d.accent }}
                  >
                    {on ? "↳ SHOWING BELOW" : "↳ OPEN"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* The facts, for anyone who wants them before the work. */}
        <dl className="mt-10 border-t border-[var(--kraft)]">
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

      <div ref={cabinet}>
        <Cabinet
          projects={projects}
          categories={categories}
          craft={craft}
          onCraft={setCraft}
          theme={theme}
          onTheme={setTheme}
        />
      </div>
    </>
  );
}
