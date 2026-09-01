import { BSO } from "@/content/bso-tokens";
import { BsoPanel, BsoShelf, BsoPoster } from "./BsoKit";

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
    title: "Nine Posters — the seed system",
    body: "The origin sketch. It began as an audio-frequency visualizer — FFT bands and oscillators — then I rebuilt it into a grid of nested rectangles driven by Perlin noise and a short list of parameters. Nine quiet outputs prove the point: one sketch, one click, three concerts × three seeds.",
    width: 150,
    posters: [
      [
        "evo-01-seed-1.jpg",
        "A pale Mahler seed output — faint nested squares on near-white",
      ],
      ["evo-01-seed-2.jpg", "A pale Beethoven Missa Solemnis seed output"],
      ["evo-01-seed-3.jpg", "A pale Mozart & Strauss seed output"],
    ],
  },
  {
    n: "STAGE 02",
    title: "Milestone 01.03 — turning the dials",
    body: "Same code, dials cranked. I pushed gridScale, noiseScale and strokeAlpha far apart and swapped a palette per concert. Nothing is redrawn — each poster is a different feeling pulled from the same loop by changing numbers.",
    width: 132,
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
    title: "Refinement — type meets the field",
    body: "I demote the generative field to a background layer and composite a fixed type system — display serif over a sans event block — on top. The parameters now tune texture behind real hierarchy instead of being the whole poster.",
    width: 186,
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
    title: "The season — a signature per night",
    body: "Each night gets its own locked parameter set — a signature. Chevrons for Mahler, orthogonal weave for Opening Night, diamonds for the American program, a glowing lattice for Tchaikovsky, soft haze for the 125th. One type system, five textures, one season.",
    width: 150,
    posters: [
      [
        "season-01-opening-night.jpg",
        "Opening Night — Mozart & Strauss, orthogonal weave",
      ],
      ["season-02-mahler.jpg", "Mahler Symphony No. 4 — chevrons"],
      ["season-03-125th.jpg", "125th Anniversary — soft haze"],
      [
        "season-04-tchaikovsky.jpg",
        "Tchaikovsky Symphony No. 5 — glowing lattice",
      ],
      ["season-05-american.jpg", "American Composers Program — diamonds"],
    ],
  },
];

export default function BsoEvolution() {
  return (
    <BsoPanel
      note="nothing here is drawn by hand"
      kicker="EVOLUTION · THE CODE BEHIND THE SEASON"
      title="One sketch. Four moves. A whole season."
      blurb="Not one of these posters is drawn by hand. There is a single p5.js sketch, and each stage below is the same code carried one step further — a designer turning dials, then teaching the system to hold real typography — until five nights of the season share one set of rules and five different feelings."
    >
      <ol className="m-0 list-none p-0">
        {STAGES.map((s, i) => (
          <li
            key={s.n}
            className={i > 0 ? "mt-10 border-t pt-10" : ""}
            style={i > 0 ? { borderColor: BSO.line } : undefined}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div>
                <p
                  className="mono text-[10px] font-bold tracking-[0.18em]"
                  style={{ color: BSO.wine }}
                >
                  {s.n}
                </p>
                <h4
                  className="serif mt-1.5 text-[20px] leading-snug"
                  style={{ color: BSO.ink }}
                >
                  {s.title}
                </h4>
                <p className="mt-2.5 text-[13.5px] leading-relaxed">{s.body}</p>
              </div>

              <BsoShelf hint={s.posters.length > 3 ? "SCROLL →" : undefined}>
                {s.posters.map(([src, alt]) => (
                  <BsoPoster key={src} src={src} alt={alt} width={s.width} />
                ))}
              </BsoShelf>
            </div>
          </li>
        ))}
      </ol>
    </BsoPanel>
  );
}
