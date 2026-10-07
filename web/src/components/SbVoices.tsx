import { SB, tint } from "@/content/storybridge-tokens";

/**
 * What the people on both ends said, laid out the way a teaching center
 * reports a round of focus groups: who we heard from, what they said, and
 * what the team changed because of it.
 *
 * Everything here comes from section 11 and the addendum of the team's
 * ARTG 5000 final report. Names are first names only, as in the report.
 */
const GROUPS = [
  {
    who: "High school writers",
    band: "Grades 9-12",
    colour: SB.accent,
    heard: [
      "Writing for a younger reader felt more purposeful than a typical assignment.",
      "They wanted more flexible prompts, and a clearer way to set their own.",
      "Tie it to a class grade, or it competes with everything else.",
      "Who keeps our data, and who keeps this running next year?",
    ],
  },
  {
    who: "Teachers",
    band: "Educators",
    colour: SB.green,
    heard: [
      "The cross-age connection is the strength. It makes the work meaningful.",
      "It has to fit the daily classroom routine, not sit beside it.",
      "We need control over content and assignments, and to see what students are doing.",
      "We would not trust AI moderation or leveling without a final human review.",
    ],
  },
];

const CHANGES = [
  {
    from: "AI as a content generator",
    to: "AI as a quiet moderator and leveler",
    why: "Teachers' trust came first.",
  },
  {
    from: "AI decides what gets published",
    to: "A teacher approves, rejects, or overrides",
    why: "A person has the last word.",
  },
  {
    from: "A like button",
    to: "Add to collection",
    why: "Active choosing over passive scrolling.",
  },
];

export default function SbVoices() {
  return (
    <div className="mt-8" style={{ color: SB.ink }}>
      <div className="grid gap-4 md:grid-cols-2">
        {GROUPS.map((g) => (
          <article
            key={g.who}
            className="overflow-hidden rounded-xl border"
            style={{ borderColor: SB.line, background: "#fff" }}
          >
            <div style={{ background: g.colour, height: 4 }} aria-hidden />
            <div className="p-5">
              <p
                className="mono text-[10px] font-bold tracking-widest uppercase"
                style={{ color: g.colour }}
              >
                {g.band}
              </p>
              <h4 className="sb-display mt-1.5 text-lg leading-tight">{g.who}</h4>
              <ul className="mt-3 space-y-2.5 p-0">
                {g.heard.map((h) => (
                  <li
                    key={h}
                    className="list-none border-l-2 pl-3 text-[13.5px] leading-snug"
                    style={{ borderColor: tint(g.colour, 45) }}
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div
        className="mt-4 rounded-xl p-5 sm:p-6"
        style={{ background: SB.surface }}
      >
        <p
          className="mono text-[10px] font-bold tracking-widest uppercase"
          style={{ color: SB.accent }}
        >
          What we changed because of it
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {CHANGES.map((c) => (
            <div key={c.to}>
              <p className="text-[12.5px] leading-snug line-through" style={{ color: SB.muted }}>
                {c.from}
              </p>
              <p className="sb-display mt-1 text-[15px] leading-snug">{c.to}</p>
              <p className="mt-1.5 text-[12px] leading-snug" style={{ color: SB.muted }}>
                {c.why}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        Paraphrased from validation conversations with high school writers and
        teachers · K-8 readers not yet tested
      </p>
    </div>
  );
}
