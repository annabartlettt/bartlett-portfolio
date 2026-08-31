/**
 * ANNA, set vertically in the empty half of the hero.
 *
 * Each letter has its own resting angle, so the word looks placed by hand
 * rather than typeset. They drop in once on load, staggered, and lean apart
 * slightly on hover. Anyone who has asked their system not to animate gets
 * the finished arrangement and nothing else.
 */
const LETTERS = [
  { ch: "A", r: "-7deg", x: "-6px", d: "0.05s" },
  { ch: "n", r: "6deg", x: "5px", d: "0.14s" },
  { ch: "n", r: "-5deg", x: "-4px", d: "0.23s" },
  { ch: "a", r: "8deg", x: "6px", d: "0.32s" },
];

export default function NameMark() {
  return (
    <div
      aria-hidden
      className="name-mark pointer-events-none absolute right-6 top-14 hidden select-none flex-col items-center lg:flex"
    >
      {LETTERS.map((l, i) => (
        <span
          key={i}
          className="name-letter display block text-[76px] leading-[0.82] font-bold xl:text-[92px]"
          style={
            {
              color: "var(--ink)",
              "--r": l.r,
              "--x": l.x,
              animationDelay: l.d,
            } as React.CSSProperties
          }
        >
          {l.ch}
        </span>
      ))}
    </div>
  );
}
