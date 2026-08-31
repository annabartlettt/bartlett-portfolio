"use client";

import { useRef, useState } from "react";
import Cabinet from "./Cabinet";
import SiteSearch from "./SiteSearch";
import FolderIcon from "./FolderIcon";
import type { Project, SearchData } from "@/sanity/types";

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
  search,
}: {
  projects: Project[];
  search: SearchData;
}) {
  const [craft, setCraft] = useState<string | null>(null);
  const cabinet = useRef<HTMLDivElement>(null);

  function open(value: string) {
    setCraft(craft === value ? null : value);
    cabinet.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* The desktop is the page. No frame, no card: it fills the screen and
          the bar sits on the bottom edge of it. */}
      <section
        className="flex min-h-[calc(100svh-3.6rem)] flex-col"
        style={{ background: "var(--paper)" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-12 sm:px-10">
            <h1 className="display text-3xl leading-[1.15] sm:text-4xl md:text-5xl">
              What do you already know?
              <span className="mt-1 block sm:ml-[12%] md:ml-[18%]">
                What do you need next?
              </span>
            </h1>

            <div className="mt-8 max-w-2xl sm:ml-[12%] md:ml-[18%]">
              <SiteSearch data={search} />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6">
              {DISCIPLINES.map((d) => {
                const on = craft === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => open(d.value)}
                    aria-pressed={on}
                    className="group flex flex-col items-center text-center"
                  >
                    <FolderIcon
                      color={d.accent}
                      className={`w-24 transition-transform duration-200 sm:w-28 ${
                        on
                          ? "-translate-y-1 scale-105"
                          : "group-hover:-translate-y-1 group-hover:scale-105"
                      }`}
                    />
                    <span
                      className="mt-2 rounded px-2 py-0.5 text-[13px] leading-snug font-medium transition-colors"
                      style={
                        on
                          ? { background: d.accent, color: "var(--paper)" }
                          : { color: d.accent }
                      }
                    >
                      {d.title}
                    </span>
                  </button>
                );
              })}
            </div>
        </div>

        {/* the bar along the bottom edge of the screen */}
        <div
          className="border-t-2"
          style={{
            borderColor: "var(--charcoal)",
            background: "var(--cream2)",
          }}
        >
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-2.5 sm:px-10">
            <span className="display text-sm tracking-[0.22em] uppercase">
              Anna Bartlett
            </span>
            <span className="mono text-[10px] tracking-widest opacity-55">
              {craft
                ? `${DISCIPLINES.find((d) => d.value === craft)?.title.toUpperCase()} — OPEN`
                : `${projects.length} FOLDERS`}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
        {/* The facts, for anyone who wants them before the work. */}
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

      <div ref={cabinet}>
        <Cabinet projects={projects} craft={craft} onCraft={setCraft} />
      </div>
    </>
  );
}
