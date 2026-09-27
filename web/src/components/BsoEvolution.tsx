import { BSO } from "@/content/bso-tokens";
import { BsoPanel, BsoPoster } from "./BsoKit";

/**
 * One sketch, four moves, a whole season.
 *
 * This is the process evidence the case study was missing on the site: the
 * same p5.js sketch carried one step further at each stage, from nine quiet
 * seed outputs to five locked signatures. Every poster here is a real output
 * of hers, pulled from the Figma frame "Evolution — The Code Behind the
 * Season" and border-trimmed so they bleed.
 *
 * All stage copy is verbatim from that frame.
 */

const STAGES = [
  {
    n: "STAGE 01",
    title: "Nine posters: the seed system",
    body: "The origin sketch. It began as an audio-frequency visualizer, built on FFT bands and oscillators. Then I rebuilt it into a grid of nested rectangles driven by Perlin noise and a short list of parameters. Nine quiet outputs prove the point: one sketch, one click, three concerts × three seeds.",
    posters: [
      [
        "evo-01-seed-1.jpg",
        "A pale Mahler seed output, faint nested squares on near-white",
      ],
      ["evo-01-seed-2.jpg", "A pale Beethoven Missa Solemnis seed output"],
      ["evo-01-seed-3.jpg", "A pale Mozart & Strauss seed output"],
    ],
  },
  {
    n: "STAGE 02",
    title: "Milestone 01.03: turning the dials",
    body: "Same code, dials cranked. I pushed gridScale, noiseScale and strokeAlpha far apart and swapped a palette per concert. Nothing is redrawn. Each poster is a different feeling pulled from the same loop by changing numbers.",
    posters: [
      ["evo-02-dials-1.jpg", "Mahler in saturated green, dense nested squares"],
      ["evo-02-dials-2.jpg", "American Composers Program in bright blue"],
      ["evo-02-dials-3.jpg", "Season Opening in orange-red"],
      ["evo-02-dials-4.jpg", "Tchaikovsky's Fifth in maroon with diamonds"],
      ["evo-02-dials-5.jpg", "125th Anniversary Concert in teal"],
    ],
  },
  {
    n: "STAGE 03",
    title: "Refinement: type meets the field",
    body: "I demote the generative field to a background layer and composite a fixed type system on top: display serif over a sans event block. The parameters now tune texture behind real hierarchy instead of being the whole poster.",
    posters: [
      [
        "evo-03-type-1.jpg",
        "Mahler in sage with a full display-serif type hierarchy over the field",
      ],
      [
        "evo-03-type-2.jpg",
        "Opening Night in navy with the type system composited on top",
      ],
    ],
  },
  {
    n: "STAGE 04",
    title: "The season: a signature per night",
    body: "Each night gets its own locked parameter set, a signature. Chevrons for Mahler, orthogonal weave for Opening Night, diamonds for the American program, a glowing lattice for Tchaikovsky, soft haze for the 125th. One type system, five textures, one season.",
    posters: [] as string[][],
    note: "The five season posters lead this page, at the top.",
  },
];

export default function BsoEvolution() {
  return (
    <BsoPanel
      note="nothing here is drawn by hand"
      kicker="EVOLUTION · THE CODE BEHIND THE SEASON"
      title="One sketch. Four moves. A whole season."
      blurb="Not one of these posters is drawn by hand. There is a single p5.js sketch, and each stage below is the same code carried one step further. A designer turns the dials, then teaches the system to hold real typography, until five nights of the season share one set of rules and five different feelings."
    >
      <ol className="m-0 list-none p-0">
        {STAGES.map((s, i) => {
          const n = s.posters.length;
          return (
            <li
              key={s.n}
              className={i > 0 ? "mt-14 border-t pt-14" : ""}
              style={i > 0 ? { borderColor: BSO.line } : undefined}
            >
              {/* The work leads. On a phone the posters scroll sideways at
                  three-quarters of the screen; from sm up they share the full
                  width, and a two-poster stage is held narrower so it does not
                  turn into two billboards. */}
              {n === 0 ? null : (
              <div
                className={`no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-auto sm:grid sm:overflow-visible sm:px-0 ${
                  n <= 2 ? "sm:max-w-2xl sm:mx-0" : ""
                }`}
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
              >
                {s.posters.map(([src, alt]) => (
                  <div key={src} className="w-[72vw] shrink-0 snap-start sm:w-auto">
                    <BsoPoster src={src} alt={alt} />
                  </div>
                ))}
              </div>
              )}

              <div className={n === 0 ? "max-w-3xl" : "mt-7 max-w-3xl"}>
                <p
                  className="mono text-[11px] font-bold tracking-[0.18em]"
                  style={{ color: BSO.wine }}
                >
                  {s.n}
                </p>
                <h4
                  className="serif mt-2 text-[26px] leading-snug sm:text-[30px]"
                  style={{ color: BSO.ink }}
                >
                  {s.title}
                </h4>
                <p className="mt-3 text-[16px] leading-relaxed">{s.body}</p>
                {"note" in s && s.note && (
                  <p className="mono mt-3 text-[11px] tracking-[0.14em]" style={{ color: BSO.muted }}>
                    ↑ {s.note.toUpperCase()}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </BsoPanel>
  );
}
