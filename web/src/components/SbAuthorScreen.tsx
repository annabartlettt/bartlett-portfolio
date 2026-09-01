/**
 * The StoryBridge author dashboard, built at desktop width.
 *
 * The Figma frame is a 400px card, so no export could have produced a desktop
 * screen from it. Built as markup instead: it is sharp at any size, the story
 * titles and states are real text the site search can reach, and it reflows on
 * a narrow screen instead of shrinking.
 */
const STATS = [
  { n: "7", label: "Published stories", note: "+2 this month" },
  { n: "97", label: "Total reads", note: "across all your stories" },
  { n: "1", label: "Active draft", note: "started yesterday" },
];

const STORIES = [
  { title: "The Youngest Teacher", state: "Published", meta: "Apr 23, 2026 · 41 reads" },
  { title: "The Rematch", state: "Published", meta: "Apr 12, 2026 · 33 reads" },
];

const LEVELS = ["3rd–4th", "5th–6th", "7th–8th"];

export default function SbAuthorScreen({ accent = "#B5502F" }: { accent?: string }) {
  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--kraft)", background: "var(--paper)" }}
    >
      {/* product chrome */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3"
        style={{ borderColor: "var(--kraft)" }}
      >
        <span className="display text-base">Storybridge</span>
        <nav className="mono flex gap-5 text-[11px] tracking-widest">
          <span style={{ color: accent, borderBottom: `2px solid ${accent}` }}>
            AUTHOR
          </span>
          <span className="opacity-50">READER</span>
          <span className="opacity-50">ADMIN</span>
        </nav>
        <span className="mono text-[11px] tracking-widest opacity-60">ANNA B.</span>
      </div>

      <div className="px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="display text-2xl">Welcome back, Anna</h3>
            <p className="mono mt-1 text-[11px] tracking-widest opacity-55">
              MONDAY, JULY 28
            </p>
          </div>
          <span
            className="mono rounded-md px-3 py-1.5 text-[11px] tracking-widest text-[var(--paper)]"
            style={{ background: accent }}
          >
            + NEW STORY
          </span>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border p-3"
              style={{ borderColor: "var(--kraft)" }}
            >
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
              style={{ borderColor: "var(--kraft)" }}
            >
              <div>
                <span
                  className="mono rounded px-1.5 py-0.5 text-[9px] tracking-widest text-[var(--paper)]"
                  style={{ background: "#3D5943" }}
                >
                  {st.state.toUpperCase()}
                </span>
                <p className="display mt-1.5 text-base">{st.title}</p>
                <p className="mono mt-0.5 text-[9.5px] tracking-widest opacity-50">
                  {st.meta.toUpperCase()}
                </p>
              </div>
              <span className="mono text-[10px] tracking-widest opacity-55">EDIT</span>
            </li>
          ))}
        </ul>

        {/* the rule, where the author meets it */}
        <div
          className="mt-6 rounded-lg border p-4"
          style={{ borderColor: "var(--kraft)", background: "var(--cream2)" }}
        >
          <p className="mono text-[10px] tracking-widest" style={{ color: accent }}>
            SEE HOW READERS EXPERIENCE IT
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {LEVELS.map((l, i) => (
              <span
                key={l}
                className="mono rounded-md px-2.5 py-1 text-[11px] tracking-widest"
                style={
                  i === 0
                    ? { background: accent, color: "var(--paper)" }
                    : { border: "1px solid var(--kraft)" }
                }
              >
                {l}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[12.5px] leading-snug opacity-70">
            Your original text is never changed. This is only what readers see.
          </p>
        </div>
      </div>
    </div>
  );
}
