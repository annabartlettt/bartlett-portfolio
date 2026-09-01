import { SB, tint } from "@/content/storybridge-tokens";

/**
 * The readings board, built rather than embedded.
 *
 * The export was 1.5MB of outlined type — sharp, unsearchable, unreadable to
 * a screen reader, and unreflowable on a phone. This is the same board as
 * markup: the three readings, what each one became, and the two panels
 * underneath that set the rule.
 */
const GOLD = "color-mix(in srgb, #F5C842 62%, #1E1B18)";

const READINGS = [
  {
    n: "Reading 01",
    who: "Ivan Illich",
    title: "Deschooling Society",
    rule: SB.accent,
    claim:
      "Learning should happen through use and relationships, not institutional permission. Schools monopolise knowledge; real learning is a web linking people to resources and to each other.",
    became:
      "StoryBridge is that web. A high-schooler and a K-8 reader connect directly. Kids learn by reading real stories, teens learn by writing for a real reader rather than for a grade.",
    note: "The test: is our AI a car, a black box, or a mechanical donkey, a tool you understand? We chose the donkey.",
    noteColour: SB.accent,
  },
  {
    n: "Reading 02",
    who: "Nabeel Gillani",
    title: "Education as a social system",
    rule: SB.ink,
    claim:
      "Children's outcomes are shaped by networks — families, neighbourhoods, relationships — far more than by content delivery. Design AI for connection, not for optimising content.",
    became:
      "So we optimised for one cross-age connection instead of test scores. The AI sits in the middle of the loop; the people stay on both ends.",
    note: "What should AI in education optimise for: content delivery, or connection-building?",
    noteColour: SB.muted,
  },
  {
    n: "Reading 03",
    who: "Chetty et al.",
    title: "Neighbourhoods and mobility",
    rule: GOLD,
    claim:
      "Networks that cut across class and background drive mobility more than school quality does. Exposure shapes what a child believes is possible, and you cannot do what you cannot imagine.",
    became:
      "Exposure by design: a young reader meets a real older writer, and sees people like them authoring stories worth reading, across ages and backgrounds.",
    note: "Can AI disrupt unequal network formation instead of mirroring it?",
    noteColour: GOLD,
  },
];

export default function SbReadings() {
  return (
    <div
      className="rounded-xl border p-6 sm:p-8"
      style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
    >
      <p
        className="mono text-[10px] font-bold tracking-widest uppercase"
        style={{ color: SB.accent }}
      >
        Ideation · The readings
      </p>
      <h3 className="sb-display mt-3 text-2xl leading-snug sm:text-[28px]">
        We didn&rsquo;t wireframe our way in. We read our way in.
      </h3>
      <p className="mt-2 text-[13.5px] leading-snug" style={{ color: SB.muted }}>
        Every decision traces back to an ARTG 5000 reading. The theory was the
        ideation stage.
      </p>

      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {READINGS.map((r) => (
          <article
            key={r.n}
            className="overflow-hidden rounded-lg border"
            style={{ borderColor: SB.line, background: "#fff" }}
          >
            <div style={{ background: r.rule, height: 4 }} aria-hidden />
            <div className="p-4">
              <p
                className="mono text-[9.5px] font-bold tracking-widest uppercase"
                style={{ color: r.rule }}
              >
                {r.n} · {r.who}
              </p>
              <h4 className="sb-display mt-2 text-lg leading-tight">{r.title}</h4>
              <p className="mt-2.5 text-[12.5px] leading-snug" style={{ color: SB.muted }}>
                {r.claim}
              </p>

              <p
                className="mono mt-4 text-[9.5px] font-bold tracking-widest uppercase"
                style={{ color: r.rule }}
              >
                Became →
              </p>
              <p className="mt-1.5 text-[12.5px] leading-snug">{r.became}</p>

              <p
                className="mt-3 text-[12px] leading-snug"
                style={{ color: r.noteColour }}
              >
                {r.note}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div
          className="rounded-lg p-5"
          style={{ background: tint(SB.accent, 14) }}
        >
          <p
            className="mono text-[9.5px] font-bold tracking-widest uppercase"
            style={{ color: SB.accent }}
          >
            The critique that set the rule
          </p>
          <p className="mt-2.5 text-[13px] leading-snug">
            Learning analytics cannot see the whole child, and when AI
            summarises it always leaves something out. So the AI adapts the
            reading level. It never rewrites the story.
          </p>
        </div>

        <blockquote
          className="m-0 py-1 pl-5"
          style={{ borderLeft: `3px solid ${SB.green}` }}
        >
          <p className="sb-display text-[15px] leading-relaxed italic">
            &ldquo;You rarely see who your students become. You teach them
            anyway, so they have the best chance. We built the AI to protect
            that relationship, never replace it.&rdquo;
          </p>
          <footer
            className="mono mt-2.5 text-[9.5px] tracking-widest uppercase"
            style={{ color: SB.muted }}
          >
            Design principle · from a note about my mom, an educator
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
