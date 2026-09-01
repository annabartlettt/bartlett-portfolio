import { SB, tint } from "@/content/storybridge-tokens";

/**
 * The StoryBridge component system, running.
 *
 * These were exported at 180 to 900 pixels, which is fine for a Figma board
 * and useless on a page. Built instead, in the system's own palette, so a
 * reader can see the actual thing rather than a photograph of it — and so the
 * states sit next to each other, which is the only way a component set makes
 * its point.
 */
const label = "mono text-[9.5px] tracking-widest uppercase";

function Row({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col gap-3 border-b py-5 sm:flex-row sm:items-center sm:gap-8"
      style={{ borderColor: SB.line }}
    >
      <div className="sm:w-40 sm:shrink-0">
        <p className={label} style={{ color: SB.accent }}>
          {name}
        </p>
        <p className="mt-1 text-[12px] leading-snug" style={{ color: SB.muted }}>
          {note}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function SbSystem() {
  const badge = (text: string, bg: string, fg: string) => (
    <span
      className={`${label} rounded px-2 py-1`}
      style={{ background: bg, color: fg }}
    >
      {text}
    </span>
  );

  return (
    <div
      className="rounded-xl border p-5 sm:p-7"
      style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
    >
      <Row name="Badge" note="What state a story is in.">
        {badge("Published", tint(SB.mint, 34), SB.green)}
        {badge("Draft", tint(SB.muted, 20), SB.muted)}
        {badge("AI: Flagged", tint(SB.accent, 18), SB.accent)}
      </Row>

      <Row name="Button" note="One action per screen leads.">
        <span
          className="mono rounded-md px-4 py-2 text-[11px] tracking-widest"
          style={{ background: SB.accent, color: SB.paper }}
        >
          Read Story →
        </span>
        <span
          className="mono rounded-md border px-4 py-2 text-[11px] tracking-widest"
          style={{ borderColor: SB.line, color: SB.ink }}
        >
          Clear all
        </span>
      </Row>

      <Row name="Nav tab" note="Which of the three roles you are in.">
        <span
          className="mono text-[11px] tracking-widest"
          style={{
            color: SB.accent,
            borderBottom: `2px solid ${SB.accent}`,
            paddingBottom: 3,
          }}
        >
          Reader
        </span>
        <span className="mono text-[11px] tracking-widest" style={{ color: SB.muted }}>
          Admin
        </span>
      </Row>

      <Row name="Tag" note="Theme and reading level, never ranked.">
        {["Family", "Memory", "Grade 5–6"].map((t) => (
          <span
            key={t}
            className="mono rounded px-2 py-1 text-[10px] tracking-widest"
            style={{ background: SB.surface, color: SB.muted }}
          >
            {t}
          </span>
        ))}
      </Row>

      <Row name="Stat card" note="One number, one word under it.">
        {[
          ["7", "Published"],
          ["136", "Reads"],
        ].map(([n, l]) => (
          <div
            key={l}
            className="rounded-lg border px-4 py-3"
            style={{ borderColor: SB.line }}
          >
            <div className="sb-display text-2xl">{n}</div>
            <div className={label} style={{ color: SB.muted }}>
              {l}
            </div>
          </div>
        ))}
      </Row>

      <Row name="Browse card" note="A cover, then who wrote it and where from.">
        {[
          { t: "Grandma's Soup", m: "Food · Korea", c: SB.mint },
          { t: "Diwali Lights", m: "Celebration · India", c: SB.blue },
        ].map((s) => (
          <div
            key={s.t}
            className="w-[150px] overflow-hidden rounded-lg border"
            style={{ borderColor: SB.line }}
          >
            <div className="h-16" style={{ background: s.c }} />
            <div className="px-2.5 py-2">
              <p className="sb-display text-[13px] leading-tight">{s.t}</p>
              <p className={`${label} mt-1`} style={{ color: SB.muted }}>
                {s.m}
              </p>
            </div>
          </div>
        ))}
      </Row>

      <Row name="Story card" note="A result. Level first, then the first line.">
        <div
          className="max-w-[430px] rounded-lg border p-4"
          style={{ borderColor: SB.line, borderLeft: `3px solid ${SB.mint}` }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <p className="sb-display text-[15px]">My Grandmother&rsquo;s Hands</p>
            {badge("Grade 5–6", tint(SB.mint, 34), SB.green)}
          </div>
          <p className={`${label} mt-1.5`} style={{ color: SB.muted }}>
            by Amara N. · 14 readers
          </p>
          <p className="mt-2 text-[12.5px] leading-snug" style={{ color: SB.muted }}>
            She kneaded the dough like she was kneading time itself.
          </p>
          <div className="mt-2 flex gap-2">
            {["Family", "Love"].map((t) => (
              <span
                key={t}
                className="mono rounded px-2 py-0.5 text-[10px] tracking-widest"
                style={{ background: SB.surface, color: SB.muted }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Row>

      <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:gap-8">
        <div className="sm:w-40 sm:shrink-0">
          <p className={label} style={{ color: SB.accent }}>
            App header
          </p>
          <p className="mt-1 text-[12px] leading-snug" style={{ color: SB.muted }}>
            The same on all three sides.
          </p>
        </div>
        <div
          className="flex w-full flex-wrap items-center justify-between gap-4 rounded-lg border px-4 py-2.5"
          style={{ borderColor: SB.line }}
        >
          <span className="sb-display text-[15px]">Storybridge</span>
          <nav className="mono flex gap-5 text-[11px] tracking-widest">
            <span style={{ color: SB.muted }}>Author</span>
            <span
              style={{
                color: SB.accent,
                borderBottom: `2px solid ${SB.accent}`,
                paddingBottom: 3,
              }}
            >
              Reader
            </span>
            <span style={{ color: SB.muted }}>Admin</span>
          </nav>
          <span className="mono text-[11px] tracking-widest" style={{ color: SB.muted }}>
            Alex R.
          </span>
        </div>
      </div>
    </div>
  );
}
