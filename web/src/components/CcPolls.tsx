/**
 * The live polls that ran inside the focus groups.
 *
 * Ten of each session's sixty minutes were Mentimeter — the room answering on
 * their phones while the discussion was still warm. The exported slides are
 * Mentimeter's chrome (its logo, its blues, its reaction counters), so they are
 * rebuilt here in the cabinet's own type instead of screenshotted: the numbers
 * are the evidence, the branding around them is not.
 *
 * Rebuilding also forced an honest question about form. Only one of the five
 * results is a chart. A single word per student is a list; 100%-and-four-zeroes
 * is a headline, not five bars; a ranking is a ranking, and drawing it as bars
 * would invent magnitudes nobody measured. One question — how well does
 * Northeastern prepare you — put two answers on one shared 1–10 scale, and that
 * one is a chart.
 *
 * Every figure below is labelled with the n the slide itself reported. These are
 * per-session polls, not the full twenty-five.
 */

/** One word for the co-op search. Seven responses, six words — so one repeated. */
const WORDS = [
  "isolating",
  "anxious",
  "stressful",
  "long",
  "emerging",
  "preserving",
];

/** Same question, same 1–10 scale, two halves of the job. */
const SCALE = [
  { label: "the technical side of applying", value: 4.5 },
  { label: "the interpersonal side of applying", value: 6.5 },
];

/** Ranked, not measured — so it is rendered as a rank, not as bar lengths. */
const OBSTACLES = [
  "Competition level",
  "Professional networking",
  "Interview preparation",
  "Resume development",
];

/** What would have made it easier — in their words, untouched. */
const ASKS = [
  "Take clinical skills classes earlier to expand job options.",
  "Find a mentor or people with different coops and just have them refer you to their coop — for your first one at least will make it a lot easier.",
  "More guidance on creating your own co-op would have been good. It was relatively easy to set up for me but really worked because I was able to reach out to my connections and advocate for myself.",
  "Knowing about the pacing/course scheduling of the major as well as knowing what my options were outside of NUworks. Once I learned how to self-develop a co-op I never looked back.",
];

export default function CcPolls({ accent = "#363f9e" }: { accent?: string }) {
  return (
    <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-14">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        TEN MINUTES OF EVERY SIXTY · THE LIVE POLLS
      </p>
      <h2 className="display mt-3 text-3xl">
        Asked out loud, answered on their phones.
      </h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">
        Fifty minutes of discussion, then ten of Mentimeter. The polls were there
        to catch what a room will type but not say — and they are the part of the
        research that reads the same to a stakeholder as it did to us.
      </p>

      {/* ── one word ─────────────────────────────────────────────────────── */}
      <figure className="mt-10 m-0">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          ONE WORD FOR THE CO-OP SEARCH · 7 RESPONSES
        </figcaption>
        <ul className="mt-4 flex list-none flex-wrap items-baseline gap-x-7 gap-y-2 p-0">
          {WORDS.map((w) => (
            <li
              key={w}
              className="display text-[26px] leading-tight sm:text-[30px]"
              style={{ color: accent }}
            >
              {w}
            </li>
          ))}
        </ul>
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          Six words from seven students, set at one size because that is what the
          data says — each was one person answering once. Five of the six describe
          a feeling rather than a task.
        </p>
      </figure>

      {/* ── the one real chart ───────────────────────────────────────────── */}
      <figure className="mt-11 m-0">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          HOW WELL DOES NORTHEASTERN PREPARE YOU? · 1–10
        </figcaption>

        <div className="mt-5 flex flex-col gap-5">
          {SCALE.map((s) => (
            <div key={s.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] leading-snug">{s.label}</span>
                <span
                  className="display text-[22px] tabular-nums"
                  style={{ color: accent }}
                >
                  {s.value.toFixed(1)}
                </span>
              </div>
              {/* track + fill; one hue, because both bars are the same measure */}
              <div
                className="mt-2 h-2 w-full rounded-full"
                style={{ background: "var(--kraft)" }}
              >
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${s.value * 10}%`,
                    background: accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mono mt-3 flex justify-between text-[10px] tracking-widest opacity-55">
          <span>MINIMAL PREPARATION</span>
          <span>EXTENSIVE PREPARATION</span>
        </div>

        <p className="serif mt-4 text-base leading-relaxed opacity-75">
          Two points of gap, and it falls on the half the university teaches most
          explicitly. Students rate themselves better at talking to a stranger
          than at the résumés, portfolios and technical screens the co-op class
          is supposed to cover.
        </p>
      </figure>

      {/* ── the headline number ──────────────────────────────────────────── */}
      <figure className="mt-11 m-0">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          MOST-USED CAMPUS RESOURCE
        </figcaption>
        <p
          className="display mt-3 text-[64px] leading-none"
          style={{ color: accent }}
        >
          100%
        </p>
        <p className="serif mt-3 text-lg leading-relaxed">
          said <b className="font-semibold">their co-op advisor</b>. Career
          Services, the co-op class, NUworks and “other” each took nought.
        </p>
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          A clean sweep is not a chart, so it is not drawn as one. It is also the
          most load-bearing number in the study: every student was routed through
          one person, and the offices built to share that load were not being
          reached.
        </p>
      </figure>

      {/* ── the ranking ──────────────────────────────────────────────────── */}
      <figure className="mt-11 m-0">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          OBSTACLES, RANKED MOST TO LEAST CHALLENGING
        </figcaption>
        <ol className="mt-4 list-none space-y-0 p-0">
          {OBSTACLES.map((o, n) => (
            <li
              key={o}
              className="flex items-baseline gap-4 border-b border-[var(--kraft)] py-3 last:border-0"
            >
              <span
                className="mono text-[11px] font-bold tracking-widest"
                style={{ color: accent }}
              >
                {String(n + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px]">{o}</span>
            </li>
          ))}
        </ol>
        <p className="serif mt-3 text-base leading-relaxed opacity-75">
          Ranked, not scored — so there are no bar lengths here to imply distances
          nobody measured. What the order says is that the two things students put
          at the top are the two the university has least control over.
        </p>
      </figure>

      {/* ── what they asked for ──────────────────────────────────────────── */}
      <figure className="mt-11 m-0">
        <figcaption className="mono text-[11px] tracking-widest opacity-60">
          “WHAT WOULD HAVE MADE YOUR SEARCH EASIER?”
        </figcaption>
        <ul className="mt-4 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {ASKS.map((a) => (
            <li
              key={a}
              className="rounded-xl border border-[var(--kraft)] bg-[var(--paper)] p-5"
            >
              <blockquote className="m-0 text-[14px] leading-snug">
                {a}
              </blockquote>
            </li>
          ))}
        </ul>
        <p className="serif mt-4 text-base leading-relaxed opacity-75">
          Three of the four answers describe something a person told them, not
          something the university published. That is the finding the office could
          act on: the co-op process was already being taught peer to peer, just
          not by design.
        </p>
      </figure>
    </section>
  );
}
