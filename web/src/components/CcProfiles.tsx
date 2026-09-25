"use client";

import { useState } from "react";
import { CC } from "@/content/central-coop-tokens";

/**
 * Section 03: two real profiles side by side, and a way to compare them one
 * template part at a time. The point the text makes (one InDesign template,
 * sections that shift by major) is visible here in the headings themselves.
 * Every list item is copied from the exported PDFs.
 */

type Part = { heading: string; items: string[] };

const PROFILES: { major: string; slug: string; parts: Part[] }[] = [
  {
    major: "Animation",
    slug: "animation",
    parts: [
      {
        heading: "Personal Attributes",
        items: [
          "Candidate for B.F.A. in Media Arts",
          "Concentration in Animation",
          "Mastering digital illustrations, character design, and both 2D and 3D animations",
          "Developing strong conceptual, narrative, and technical skills in animation",
          "Collaborative team player eager to work across interactive media",
        ],
      },
      {
        heading: "Relevant Coursework",
        items: [
          "Movement and Time",
          "Animation Basics",
          "Contemporary Art and Design History",
          "Narrative Basics",
          "Animation 1",
        ],
      },
      {
        heading: "Experiential Projects",
        items: [
          "Design and execute a digital marketing campaign",
          "Lead the design of social media content for a campus club",
          "Redesigning a Brand Identity",
        ],
      },
      {
        heading: "Industry-Aligned Skills",
        items: [
          "Character Animation",
          "Substance Painter",
          "ZBrush",
          "Autodesk Maya",
          "Adobe Creative Cloud (Photoshop, Illustrator, After Effects)",
        ],
      },
      {
        heading: "Potential Job Titles",
        items: [
          "Animator",
          "Character Designer",
          "3D Modeler",
          "Visual Effects Artist",
          "Motion Graphics Designer",
          "Game Animator",
        ],
      },
      {
        heading: "Professional Activities & Interests",
        items: [
          "Peer Tutor at Northeastern",
          "Established a freelance design network",
          "Eboard member of Anime of NU Club",
          "Member of NU Animation Club",
          "Interested in animated films, video games, visual effects, and interactive media studios",
        ],
      },
    ],
  },
  {
    major: "Communications",
    slug: "communications",
    parts: [
      {
        heading: "Personal Attributes",
        items: [
          "A dual major with Business Administration or Design",
          "Critical, well-rounded thinker with skills in written and oral communication",
          "Unparalleled interpersonal and listening abilities",
          "Enthusiastic team players who know how to work well in groups",
          "Media savvy with news literacy",
          "Specializes in creating cohesive and impactful brand identities",
        ],
      },
      {
        heading: "Relevant Coursework",
        items: [
          "Introduction to Marketing",
          "Public Speaking",
          "Media Culture & Society",
          "Communication Research Methods",
        ],
      },
      {
        heading: "Experiential Positions",
        items: [
          "Marketing Intern",
          "E-Board Member of Student Organization",
          "Retail or Service Work",
          "Summer Camp Counselor",
        ],
      },
      {
        heading: "Industry-Aligned Skills",
        items: [
          "Basic Marketing Principles",
          "Public Speaking",
          "Canva",
          "Social Media",
          "Adobe Suite",
          "Research report writing",
        ],
      },
      {
        heading: "Fields of Interest",
        items: ["Product Marketing", "Social Media Marketing", "Public Relations", "Human Resources"],
      },
      {
        heading: "Extracurricular Interests",
        items: [
          "Northeastern University Marketing Association",
          "Public Relations Student Society of America",
          "TEDx Northeastern",
          "WRBB 104.9 Radio",
          "Tastemakers Magazine",
        ],
      },
    ],
  },
];

const SLOTS = ["Who they are", "Coursework", "Experience", "Skills", "Where they go", "Outside class"];

export default function CcProfiles({ accent = "#111111" }: { accent?: string }) {
  const [slot, setSlot] = useState(2);
  const [a, b] = PROFILES;
  const shifts = a.parts[slot].heading !== b.parts[slot].heading;

  return (
    <figure className="m-0 my-10">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {PROFILES.map((p) => (
          <div key={p.slug}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/central-coop/persona-${p.slug}.jpg`}
              alt={`Central Co-op student profile for a ${p.major} student seeking a first co-op, built from the shared InDesign template`}
              loading="lazy"
              className="block w-full rounded-lg border border-[#D9D9D9]"
            />
            <p className="mono mt-2 text-[10.5px] tracking-widest opacity-60">
              {p.major.toUpperCase()} · SEEKING FIRST CO-OP
            </p>
          </div>
        ))}
      </div>

      <p className="mono mt-8 text-[11px] tracking-widest opacity-60">
        COMPARE ONE PART OF THE TEMPLATE
      </p>
      <div role="tablist" aria-label="Template parts" className="mt-3 flex flex-wrap gap-2">
        {SLOTS.map((s, n) => (
          <button
            key={s}
            role="tab"
            aria-selected={slot === n}
            onClick={() => setSlot(n)}
            className={`mono rounded-full border px-3 py-1.5 text-[11px] tracking-widest uppercase transition ${
              slot === n
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#D9D9D9] hover:border-[#111111]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-5" aria-live="polite">
        {PROFILES.map((p) => {
          const part = p.parts[slot];
          return (
            <div
              key={p.slug}
              className="rounded-xl border border-[#D9D9D9] bg-white p-5"
              style={{ borderTop: `4px solid ${CC.red}` }}
            >
              <p className="mono text-[10px] tracking-widest opacity-55">{p.major.toUpperCase()}</p>
              <h3
                className="display mt-1 text-xl"
                style={{ color: shifts ? CC.red : accent }}
              >
                {part.heading}
              </h3>
              <ul className="mt-3 list-none space-y-1.5 p-0 text-[14px] leading-snug">
                {part.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden className="text-[9px] leading-[1.9]" style={{ color: CC.red }}>
                      ■
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <figcaption className="serif mt-3 text-base leading-relaxed opacity-75">
        {shifts
          ? "Same slot, different heading. An animation student is described by projects; a communications student by positions held."
          : "Same slot, same heading. The template holds still so the contents can change."}
      </figcaption>
    </figure>
  );
}
