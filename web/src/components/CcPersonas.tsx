"use client";

import { useState } from "react";

/**
 * The persona sheets — one template, thirteen majors.
 *
 * These are the artefact the research was for. They are not user personas in the
 * design-process sense: they point the other way. Each one is an employer-facing
 * sell sheet that answers "what does a Northeastern student in this major
 * actually bring", in the language a hiring manager already uses — coursework,
 * industry-aligned skills, the job titles they could be hired into.
 *
 * Shown as sheets rather than rebuilt in markup, because the point being made is
 * that the layout never moves. Thirteen majors, one grid, one lockup, one closing
 * paragraph — only the contents and the sidebar's colour change.
 */

const SHEETS = [
  { major: "UI / UX", slug: "ui-ux" },
  { major: "Graphic Design", slug: "graphic-design" },
  { major: "Journalism", slug: "journalism" },
  { major: "Communications", slug: "communications" },
  { major: "Photography", slug: "photography" },
  { major: "Video Arts", slug: "video-arts" },
  { major: "Animation", slug: "animation" },
  { major: "Game Design", slug: "game-design" },
  { major: "Game Art & Animation", slug: "game-art-and-animation" },
  { major: "Theatre", slug: "theatre" },
  { major: "Music", slug: "music" },
  { major: "Music Industry", slug: "music-industry" },
  { major: "Music Technology", slug: "music-technology" },
];

export default function CcPersonas({ accent = "#363f9e" }: { accent?: string }) {
  const [i, setI] = useState(0);
  const sheet = SHEETS[i];

  return (
    <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        WHAT THE RESEARCH WAS FOR · THIRTEEN SHEETS
      </p>
      <h2 className="display mt-3 text-3xl">
        Translating a major into an employer&rsquo;s language.
      </h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">
        The focus groups told us what students were carrying. These told employers
        what students were bringing. Every arts, media and design major got a
        sheet — the coursework they have actually taken, the skills that map to an
        industry title, and the roles they could be hired into. One template,
        thirteen majors, so a recruiter reading their fourth one already knows
        where to look.
      </p>

      <div className="mt-7 flex flex-wrap gap-2">
        {SHEETS.map((s, n) => (
          <button
            key={s.slug}
            onClick={() => setI(n)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              n === i
                ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--cream)]"
                : "border-[var(--kraft)] hover:border-[var(--charcoal)]"
            }`}
          >
            {s.major}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-[540px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/central-coop/persona-${sheet.slug}.jpg`}
          alt={`Central Co-op employer persona sheet for a ${sheet.major} student seeking a first co-op — personal attributes, experiential projects, industry-aligned skills, potential job titles, relevant coursework and professional activities`}
          className="block w-full rounded-xl border"
          style={{ borderColor: "var(--kraft)" }}
        />
        <p className="mono mt-3 text-[11px] tracking-widest opacity-60">
          {String(i + 1).padStart(2, "0")} / {SHEETS.length} ·{" "}
          {sheet.major.toUpperCase()}
        </p>
      </div>

      <p className="serif mt-6 text-base leading-relaxed opacity-75">
        The sidebar carries a different colour per major and the rest of the grid
        holds still, which is the whole trick: a set of thirteen has to read as one
        set. It is also the piece of this co-op I would redo first — the sheets use
        stock portraits and lean on business-school rankings that do not belong on
        an arts and design page.
      </p>
    </section>
  );
}
