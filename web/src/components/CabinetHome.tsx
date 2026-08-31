"use client";

import { useRef, useState } from "react";
import Cabinet from "./Cabinet";
import type { Project, Category } from "@/sanity/types";

export const DISCIPLINES = [
  {
    value: "ux",
    title: "User Experience",
    line: "Apps, platforms and services people have to find their way through.",
  },
  {
    value: "computational",
    title: "Computational Design",
    line: "Code and data as material. Generative systems, p5.js, physicalisation.",
  },
  {
    value: "marcomm",
    title: "Marketing & Comms",
    line: "Brand systems, social, and the calendar underneath them.",
  },
  {
    value: "motion",
    title: "Motion & Video",
    line: "Shot, cut and scored. Premiere Pro, short form, stop motion.",
  },
];

/**
 * The landing page and the cabinet share one piece of state.
 *
 * Someone arriving here is usually looking for one kind of work, so the four
 * doors sit above the fold and open the cabinet already filtered. Choosing a
 * craft clears any theme filter, because a visitor who wants motion wants all
 * of it, not motion within whichever theme happened to be selected.
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
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d) => {
            const on = craft === d.value;
            return (
              <button
                key={d.value}
                onClick={() => open(d.value)}
                aria-pressed={on}
                className={`group rounded-xl border p-4 text-left transition ${
                  on
                    ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
                    : "border-[var(--kraft)] bg-[var(--paper)] hover:border-[var(--charcoal)]"
                }`}
              >
                <p className="display text-lg leading-snug">{d.title}</p>
                <p className="mt-1 text-[13px] leading-snug opacity-75">
                  {d.line}
                </p>
                <p className="mono mt-3 text-[10px] tracking-widest opacity-60">
                  {on ? "SHOWING ↓" : "OPEN ↓"}
                </p>
              </button>
            );
          })}
        </div>
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
