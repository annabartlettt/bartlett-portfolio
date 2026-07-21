"use client";

/**
 * Anosity — "A Visual Spark / Early Lo-fis" editorial beat.
 * Injected into the Anosity case study after section 02 (The Translation).
 * Self-contained: local asset data, Anosity palette, no external UI deps.
 * Assets live in /public/images/anosity/early-lofis/ — source filename → role
 * is kept obvious in the data objects below.
 */

import { useState } from "react";

const BASE = "/images/anosity/early-lofis";

// Anosity accents — this section owns them (not global tokens).
const C = {
  ink: "#363a5e", // deep slate-indigo (text + synthesis band)
  lavender: "#c4b4e4",
  coral: "#e39b86",
  mint: "#a6d9c5",
  yellow: "#e8cf6e",
};

type Shot = { file: string; alt: string; w: number; h: number };

// role → source screen (renamed from the original exports)
const SHOTS = {
  // onboarding / context flow (390×844)  ← Onboarding Tutorial + Account Setup*
  welcome: { file: "onboarding-welcome.png", w: 390, h: 844, alt: "Anosity welcome screen with the hand-drawn A logo and a Sign Up button" },
  about: { file: "onboarding-about-nondiagnostic.png", w: 390, h: 844, alt: "Onboarding screen explaining Anosity is a self-discovery tool, not a diagnostic instrument" },
  curious: { file: "onboarding-curious-awareness.png", w: 390, h: 844, alt: "Onboarding screen introducing the idea of curious awareness" },
  name: { file: "onboarding-name.png", w: 390, h: 844, alt: "Onboarding step asking for the user's name" },
  gad: { file: "onboarding-gad-screening.png", w: 390, h: 844, alt: "Onboarding question about a GAD diagnosis, with Yes, No, and Unsure options" },
  stigma: { file: "onboarding-stigma.png", w: 390, h: 844, alt: "Onboarding screen about stigma and anxiety" },
  // home + reflection flow (393×852)  ← Home Page*
  homeFull: { file: "home-full-grid.png", w: 393, h: 852, alt: "Home screen showing a full grid of mental and physical symptom cards, all equally weighted" },
  homeCollapsed: { file: "home-collapsed.png", w: 393, h: 852, alt: "Home screen with the symptom list collapsed so the daily reflection field leads" },
  checkinChoice: { file: "checkin-choice.png", w: 393, h: 852, alt: "Reflection asking whether the user knows how to make Excessive Worry stop, with Yes, No and Neutral" },
  checkinScale: { file: "checkin-scale.png", w: 393, h: 852, alt: "Reflection rating how often worries feel excessive on a 1 to 5 scale" },
  checkinRing: { file: "checkin-ring.png", w: 393, h: 852, alt: "Concentric-ring visualization summarizing a reflection on Excessive Worry" },
  // early thinking (landscape)
  mapPlanning: { file: "mindmap-planning.png", w: 1780, h: 1010, alt: "Early planning map branching Generalized Anxiety Disorder into hidden anxiety and where it shows up across body, mind and behavior, plus an emotion-tracking idea" },
  mapComponents: { file: "mindmap-components.png", w: 1086, h: 776, alt: "Synthesized concept map linking stigma, symptom masking, habit loops and curious awareness" },
  london: { file: "spark-london-tube.png", w: 558, h: 744, alt: "A poster on a London Underground platform reading The Anxious Generation, Est. 1995, seen above patterned Tube seats" },
} satisfies Record<string, Shot>;

const COLUMNS = [
  {
    n: "01",
    key: "TRUST",
    accent: C.lavender,
    title: "Explain before asking.",
    copy: "Early onboarding introduced Anosity as a reflective guide before asking the user to track anything. The entry needed to establish purpose, expectations, and control before requesting personal input.",
    tag: "PURPOSE BEFORE DISCLOSURE",
  },
  {
    n: "02",
    key: "AGENCY",
    accent: C.mint,
    title: "Let the user choose what to notice.",
    copy: "The first flows explored a personalized starting point rather than one fixed assessment. Users could choose the areas they wanted to understand, so the experience felt relevant instead of like a verdict.",
    tag: "CHOICE OVER COMPLETENESS",
  },
  {
    n: "03",
    key: "HIERARCHY",
    accent: C.yellow,
    title: "Design one calm next step.",
    copy: "The home studies tested how much to show at once. The direction sharpened as one primary check-in gained emphasis and trends, resources, and secondary tools moved into supporting roles.",
    tag: "ONE ACTION BEFORE MANY INSIGHTS",
  },
];

const PRINCIPLES = [
  "CONTEXT BEFORE COLLECTION",
  "NEUTRAL LANGUAGE",
  "USER-SELECTED FOCUS",
  "ONE CLEAR NEXT STEP",
];

function Screen({
  shot,
  className = "",
  style,
}: {
  shot: Shot;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${BASE}/${shot.file}`}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading="lazy"
      decoding="async"
      className={`h-auto max-w-full rounded-[14px] border border-[var(--kraft)] bg-white shadow-sm ${className}`}
      style={style}
    />
  );
}

function Eyebrow({ children, color = C.ink }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="mono text-[11px] font-bold tracking-[0.22em]" style={{ color }}>
      {children}
    </p>
  );
}

export default function EarlyLofis() {
  const [showFlow, setShowFlow] = useState(false);

  return (
    <section
      aria-labelledby="early-lofis-heading"
      className="border-b border-[var(--kraft)] bg-[var(--cream)]"
    >
      {/* ── A · VISUAL SPARK ─────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,300px)_1fr] md:gap-12">
          <figure className="order-2 md:order-1">
            <Screen shot={SHOTS.london} className="w-full max-w-[280px]" />
            <figcaption className="mono mt-3 max-w-[280px] text-[10px] leading-relaxed tracking-wide text-[var(--charcoal)]/60">
              Visual reference observed in London. Communication inspiration—not a
              research source for Anosity.
            </figcaption>
          </figure>
          <div className="order-1 md:order-2">
            <Eyebrow color={C.coral}>A VISUAL SPARK · LONDON</Eyebrow>
            <h2
              id="visual-spark-heading"
              className="serif mt-3 text-3xl leading-tight md:text-4xl"
              style={{ color: C.ink }}
            >
              Making an invisible experience hard to ignore.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--charcoal)]/85">
              While living in London, I kept seeing <em>The Anxious Generation: Est. 1995</em>{" "}
              displayed across the city. I had not read the book and did not use it as
              research; what stayed with me was the campaign&rsquo;s repetition and blunt
              public presence. It made an often-private subject feel visible in shared space.
            </p>
            <p
              className="serif mt-5 max-w-xl border-l-2 pl-4 text-[17px] italic leading-relaxed"
              style={{ borderColor: C.coral, color: C.ink }}
            >
              The influence was communication, not content: name the tension directly, then
              give people a gentler way in.
            </p>
          </div>
        </div>
      </div>

      {/* ── BRIDGE · MAPPING THE PROBLEM ─────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="border-t border-[var(--kraft)] pt-12">
          <Eyebrow>BEFORE THE WIREFRAMES · MAPPING THE PROBLEM</Eyebrow>
          <h3 className="serif mt-3 max-w-2xl text-2xl leading-snug md:text-3xl" style={{ color: C.ink }}>
            First I mapped the tangle, then I looked for the pattern.
          </h3>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--charcoal)]/85">
            The earliest work wasn&rsquo;t screens. It was trying to see the whole system —
            where hidden anxiety lives across body, mind, and behavior, and where a gentler,
            noticing-based intervention could sit.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-end">
            <figure>
              <Screen shot={SHOTS.mapPlanning} className="w-full" />
              <figcaption className="mono mt-2 text-[10px] tracking-wide text-[var(--charcoal)]/60">
                Figuring out what to build — the raw planning map.
              </figcaption>
            </figure>
            <figure className="relative">
              <span
                className="hand absolute -top-7 left-0 text-xl md:-left-6"
                style={{ color: C.coral }}
                aria-hidden="true"
              >
                sprawl → structure
              </span>
              <Screen shot={SHOTS.mapComponents} className="w-full" />
              <figcaption className="mono mt-2 text-[10px] tracking-wide text-[var(--charcoal)]/60">
                Gathering the moving parts into one picture.
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* ── B · EARLY LO-FIS ─────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="border-t border-[var(--kraft)] pt-12">
          <Eyebrow>EARLY LO-FIS · FINDING THE ENTRY POINT</Eyebrow>
          <h2
            id="early-lofis-heading"
            className="serif mt-3 max-w-3xl text-3xl leading-tight md:text-4xl"
            style={{ color: C.ink }}
          >
            Before adding features, I tested how the experience should begin.
          </h2>
          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p className="max-w-xl text-[15px] leading-relaxed text-[var(--charcoal)]/85">
              The first wireframes weren&rsquo;t about visual polish. They tested how much
              context Anosity should provide, what users should control, and how the product
              could invite reflection without feeling like another assessment or performance
              dashboard.
            </p>
            <span className="hand text-xl" style={{ color: C.ink }} aria-hidden="true">
              structure first · styling later
            </span>
          </div>

          {/* three numbered editorial columns */}
          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {COLUMNS.map((col) => (
              <div key={col.n}>
                <p className="mono text-[12px] font-bold tracking-widest" style={{ color: col.accent }}>
                  {col.n} / {col.key}
                </p>
                <h3 className="serif mt-2 text-xl" style={{ color: C.ink }}>
                  {col.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[var(--charcoal)]/80">
                  {col.copy}
                </p>
                <p
                  className="mono mt-4 inline-block rounded-full border px-3 py-1.5 text-[10px] tracking-widest"
                  style={{ borderColor: col.accent, color: C.ink }}
                >
                  {col.tag}
                </p>
              </div>
            ))}
          </div>

          {/* ── lower visual field · three deliberate groups ── */}

          {/* GROUP 01 — onboarding collage (Trust) */}
          <div className="mt-14 border-t border-dashed border-[var(--kraft)] pt-10">
            <p className="mono text-[11px] tracking-widest" style={{ color: C.lavender }}>
              01 · ENTRY &amp; ONBOARDING
            </p>
            <div className="mt-5 flex flex-wrap items-end gap-4 md:gap-0">
              <div className="relative">
                <Screen shot={SHOTS.welcome} className="relative z-20 w-48 md:w-56" />
                <span
                  className="hand mt-2 block text-lg md:absolute md:-right-40 md:top-1/2 md:mt-0"
                  style={{ color: C.lavender }}
                  aria-hidden="true"
                >
                  Context before collection.
                </span>
              </div>
              <Screen
                shot={SHOTS.about}
                className="z-10 w-36 md:-ml-8 md:w-44 md:rotate-[-3deg]"
              />
              <Screen
                shot={SHOTS.curious}
                className="z-0 w-36 md:-ml-6 md:w-44 md:rotate-[2.5deg]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFlow((s) => !s)}
              aria-expanded={showFlow}
              aria-controls="full-early-flow"
              className="mono mt-8 rounded-full border px-4 py-2 text-[11px] tracking-widest transition-colors outline-none focus-visible:ring-2 motion-reduce:transition-none"
              style={{ borderColor: C.ink, color: C.ink }}
            >
              {showFlow ? "－ HIDE FULL FLOW" : "＋ VIEW FULL EARLY FLOW"}
            </button>
            {showFlow && (
              <div id="full-early-flow" className="mt-5 flex flex-wrap gap-4">
                <Screen shot={SHOTS.name} className="w-32 md:w-36" />
                <Screen shot={SHOTS.gad} className="w-32 md:w-36" />
                <Screen shot={SHOTS.stigma} className="w-32 md:w-36" />
              </div>
            )}
          </div>

          {/* GROUP 02 — reflection flow (Agency) */}
          <div className="mt-14 border-t border-dashed border-[var(--kraft)] pt-10">
            <p className="mono text-[11px] tracking-widest" style={{ color: C.mint }}>
              02 · CHOOSING WHAT TO NOTICE
            </p>
            <div className="mt-5 flex flex-wrap items-start gap-6">
              {[
                { shot: SHOTS.checkinChoice, label: "a gentle question" },
                { shot: SHOTS.checkinScale, label: "rate, don't judge" },
                { shot: SHOTS.checkinRing, label: "the pattern, made visible" },
              ].map((item, i) => (
                <figure key={item.shot.file} className="w-40 md:w-44">
                  <Screen shot={item.shot} className="w-full" />
                  <figcaption className="mono mt-2 text-[10px] tracking-widest text-[var(--charcoal)]/65">
                    {`0${i + 1}`} · {item.label.toUpperCase()}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* GROUP 03 — home hierarchy comparison (Hierarchy) */}
          <div className="mt-14 border-t border-dashed border-[var(--kraft)] pt-10">
            <p className="mono text-[11px] tracking-widest" style={{ color: C.yellow }}>
              03 · FROM MANY MODULES TO ONE ACTION
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-8">
              <figure className="w-44 md:w-52">
                <Screen shot={SHOTS.homeFull} className="w-full" />
                <figcaption className="mono mt-2 text-[10px] tracking-wide text-[var(--charcoal)]/65">
                  Full symptom grid — everything weighted the same.
                </figcaption>
              </figure>
              <span className="hand text-xl" style={{ color: C.yellow }} aria-hidden="true">
                fewer competing actions →
              </span>
              <figure className="w-44 md:w-52">
                <Screen shot={SHOTS.homeCollapsed} className="w-full" />
                <figcaption className="mono mt-2 text-[10px] tracking-wide text-[var(--charcoal)]/65">
                  Collapsed — the daily reflection field leads.
                </figcaption>
              </figure>
            </div>
            <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-[var(--charcoal)]/80">
              Early versions treated several modules as equally important. The refined
              direction made the primary reflection action easier to find and moved the
              symptom list into a supporting role.
            </p>
          </div>
        </div>
      </div>

      {/* ── SYNTHESIS STRIP ──────────────────────────────── */}
      <div className="w-full" style={{ background: C.ink }}>
        <div className="mx-auto max-w-5xl px-6 py-16 text-[var(--cream)]">
          <p className="mono text-[11px] tracking-widest opacity-70">THE LO-FIS ESTABLISHED</p>
          <div className="mt-4 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="serif max-w-3xl text-3xl leading-tight md:text-4xl">
                The tone of the product was a structural decision before it became a visual one.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed opacity-80">
                These explorations did not define the final interface. They defined the
                conditions it needed to protect: clarity, agency, and nonjudgmental reflection.
              </p>
            </div>
            <ul className="mono flex flex-wrap gap-2 text-[10px] tracking-widest md:max-w-[220px] md:justify-end">
              {PRINCIPLES.map((t) => (
                <li key={t} className="rounded-full border border-[var(--cream)]/40 px-3 py-1.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
