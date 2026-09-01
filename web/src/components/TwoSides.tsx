/**
 * The disconnect, built as markup rather than shipped as a picture of markup.
 *
 * Same diagram as the Figma board, but the words are words: they scale, they
 * stack on a narrow screen, a screen reader can read them, and the site search
 * can find them. The exported SVG could do none of that, because its type was
 * outlined into paths.
 */
const SIDES = [
  {
    band: "Grades K-8",
    who: "K-8 Readers",
    needs: [
      "stories that feel relatable",
      "the right reading level",
      "a reason to keep reading",
    ],
  },
  {
    band: "Grades 9-12",
    who: "HS Writers",
    needs: ["a real audience", "purpose, not a grade", "ownership of their voice"],
  },
];

export default function TwoSides({ accent = "#B5502F" }: { accent?: string }) {
  return (
    <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
      {SIDES.map((s, i) => (
        <div key={s.who} className="contents">
          <div
            className="rounded-xl border bg-[var(--paper)] p-5"
            style={{ borderColor: "var(--kraft)" }}
          >
            <p
              className="mono text-[10px] font-bold tracking-widest uppercase"
              style={{ color: accent }}
            >
              {s.band}
            </p>
            <h3 className="display mt-1.5 text-xl">{s.who}</h3>
            <p className="mono mt-3 border-t border-[var(--kraft)] pt-3 text-[10px] tracking-widest opacity-55">
              THEY NEED
            </p>
            <ul className="mt-2 list-none space-y-1.5 p-0 text-[14px] leading-snug">
              {s.needs.map((n) => (
                <li key={n} className="flex gap-2">
                  <span aria-hidden style={{ color: accent }}>
                    •
                  </span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* the exchange, once, between the two cards */}
          {i === 0 && (
            <div className="flex flex-col items-center gap-1 py-2 sm:py-0">
              <span
                aria-hidden
                className="text-lg leading-none"
                style={{ color: accent }}
              >
                <span className="hidden sm:inline">⟷</span>
                <span className="sm:hidden">↕</span>
              </span>
              <span className="mono max-w-[7rem] text-center text-[9.5px] leading-tight tracking-widest opacity-60">
                EACH IS THE OTHER&rsquo;S ANSWER
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
