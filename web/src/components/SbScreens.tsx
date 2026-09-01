"use client";

import { useState } from "react";
import { SB } from "@/content/storybridge-tokens";

/**
 * StoryBridge, running, at desktop width.
 *
 * The Figma frames are 400px cards, so no export could have produced a desktop
 * screen from them. Built as markup instead, with the product's own role nav
 * doing the switching: the finding of this project was that an author, a
 * reader and an administrator need three different shapes, and the fastest way
 * to show that is to let someone move between them.
 *
 * All content is from her designs. Nothing here is invented.
 */
type Role = "author" | "reader" | "admin";

const ROLES: { id: Role; label: string }[] = [
  { id: "author", label: "Author" },
  { id: "reader", label: "Reader" },
  { id: "admin", label: "Admin" },
];

const CAPTION: Record<Role, string> = {
  author: "Writes outward. Their own work, and one control that matters more than the rest.",
  reader: "Browses inward. A wall of covers, filtered to the level they read at.",
  admin: "Neither. A queue, and the counts that say whether it is under control.",
};

const AUTHOR_STATS = [
  { n: "7", label: "Published stories", note: "+2 this month" },
  { n: "136", label: "Total reads", note: "across all your stories" },
  { n: "2", label: "Active drafts", note: "started this week" },
];

const STORIES = [
  { title: "The Youngest Teacher", meta: "Apr 23, 2026 · 41 reads" },
  { title: "The Rematch", meta: "Apr 12, 2026 · 33 reads" },
];

const LEVELS = ["3rd–4th", "5th–6th", "7th–8th"];

const LIBRARY = [
  { title: "The Rematch", grade: "Grade 5–6", tag: "Sports", c: SB.blue },
  { title: "My Dad's Old Car", grade: "Grade 5–6", tag: "Family", c: SB.blue },
  { title: "The Group Chat", grade: "Grade 7–8", tag: "Friendship", c: SB.coral },
  { title: "Saturday Morning Pancakes", grade: "Grade 3–4", tag: "Family", c: SB.yellow },
  { title: "The Book I Didn't Want to Read", grade: "Grade 5–6", tag: "School", c: SB.coral },
  { title: "Third Quarter", grade: "Grade 7–8", tag: "Sports", c: SB.mint },
];

const ADMIN_STATS = [
  { n: "0", label: "Pending review" },
  { n: "7", label: "Stories published" },
  { n: "0", label: "Flagged" },
  { n: "1", label: "Active authors" },
];

const PIPELINE = [
  "Author submits a story",
  "AI scans for content categories",
  "Score of 85 or above auto-publishes",
  "Any flag sends it here for review",
];

export default function SbScreens() {
  const accent = SB.accent;
  const [role, setRole] = useState<Role>("author");
  const [level, setLevel] = useState(0);

  const card = "rounded-lg border p-3";
  const cardStyle = { borderColor: SB.line };

  return (
    <figure className="m-0">
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
      >
        {/* product chrome — the nav is the interaction */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3"
          style={{ borderColor: SB.line }}
        >
          <span className="display text-base">Storybridge</span>
          <nav className="flex gap-1" aria-label="StoryBridge role">
            {ROLES.map((r) => {
              const on = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  aria-pressed={on}
                  className="mono rounded-md px-2.5 py-1 text-[11px] tracking-widest uppercase transition"
                  style={
                    on
                      ? { background: accent, color: SB.paper }
                      : { color: SB.muted }
                  }
                >
                  {r.label}
                </button>
              );
            })}
          </nav>
          <span className="mono text-[11px] tracking-widest opacity-60">ANNA B.</span>
        </div>

        <div className="px-5 py-6 sm:px-7">
          {role === "author" && (
            <>
              <h3 className="display text-2xl">Welcome back, Anna</h3>
              <p className="mono mt-1 text-[11px] tracking-widest opacity-55">
                MONDAY, JULY 28
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {AUTHOR_STATS.map((s) => (
                  <div key={s.label} className={card} style={cardStyle}>
                    <div className="display text-2xl" style={{ color: accent }}>
                      {s.n}
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-snug">{s.label}</div>
                    <div className="mono mt-1 text-[9.5px] tracking-widest opacity-50">
                      {s.note.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mono mt-7 text-[10px] tracking-widest opacity-55">
                YOUR STORIES
              </p>
              <ul className="mt-2 list-none space-y-2 p-0">
                {STORIES.map((st) => (
                  <li
                    key={st.title}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
                    style={cardStyle}
                  >
                    <div>
                      <span
                        className="mono rounded px-1.5 py-0.5 text-[9px] tracking-widest"
                        style={{ background: SB.green, color: SB.paper }}
                      >
                        PUBLISHED
                      </span>
                      <p className="display mt-1.5 text-base">{st.title}</p>
                      <p className="mono mt-0.5 text-[9.5px] tracking-widest opacity-50">
                        {st.meta.toUpperCase()}
                      </p>
                    </div>
                    <span className="mono text-[10px] tracking-widest opacity-55">
                      EDIT
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 rounded-lg border p-4"
                style={{ borderColor: SB.line, background: SB.surface }}
              >
                <p className="mono text-[10px] tracking-widest" style={{ color: accent }}>
                  SEE HOW READERS EXPERIENCE IT
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {LEVELS.map((l, i) => (
                    <button
                      key={l}
                      onClick={() => setLevel(i)}
                      aria-pressed={i === level}
                      className="mono rounded-md px-2.5 py-1 text-[11px] tracking-widest transition"
                      style={
                        i === level
                          ? { background: accent, color: SB.paper }
                          : { border: `1px solid ${SB.line}` }
                      }
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[12.5px] leading-snug opacity-70">
                  Previewing <b>{LEVELS[level]}</b>. Your original text is never
                  changed. This is only what readers see.
                </p>
              </div>
            </>
          )}

          {role === "reader" && (
            <>
              <div
                className="rounded-lg px-4 py-3"
                style={{ background: accent, color: SB.paper }}
              >
                <p className="display text-base italic">The Youngest Teacher</p>
                <p className="mono mt-0.5 text-[9.5px] tracking-widest opacity-85">
                  ANNA BARTLETT · FAMILY · UNITED STATES
                </p>
              </div>

              <div className="mt-6 flex items-baseline justify-between">
                <h3 className="display text-2xl">Browse Stories</h3>
                <span className="mono text-[10px] tracking-widest opacity-55">
                  VIEW ALL →
                </span>
              </div>

              <ul className="mt-4 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3">
                {LIBRARY.map((s) => (
                  <li key={s.title} className="overflow-hidden rounded-lg border" style={cardStyle}>
                    <div className="h-16" style={{ background: s.c }} />
                    <div className="p-2.5">
                      <p className="display text-[13.5px] leading-tight">{s.title}</p>
                      <p className="mono mt-1.5 text-[9px] tracking-widest opacity-55">
                        {s.grade.toUpperCase()} · {s.tag.toUpperCase()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {role === "admin" && (
            <>
              <h3 className="display text-2xl">Platform Overview</h3>
              <p className="mt-1.5 max-w-xl text-[13px] leading-snug opacity-70">
                Stories are scanned automatically for age-appropriate content.
                Anything flagged appears here for a person to review.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ADMIN_STATS.map((s) => (
                  <div key={s.label} className={card} style={cardStyle}>
                    <div className="display text-2xl" style={{ color: accent }}>
                      {s.n}
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="mono mt-7 text-[10px] tracking-widest opacity-55">
                HOW MODERATION WORKS
              </p>
              <ol className="mt-2 list-none space-y-1.5 p-0">
                {PIPELINE.map((step, i) => (
                  <li key={step} className="flex gap-2.5 text-[13px] leading-snug">
                    <span
                      className="mono shrink-0 text-[10px] tracking-widest"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div
                className="mt-6 flex items-center justify-between rounded-lg border p-3"
                style={cardStyle}
              >
                <span className="display text-base">Moderation Queue</span>
                <span className="mono text-[10px] tracking-widest opacity-55">
                  0 ITEMS
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <figcaption className="mono mt-3 text-[11px] leading-relaxed tracking-wide opacity-60">
        {CAPTION[role]}
      </figcaption>
    </figure>
  );
}
