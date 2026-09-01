import { BSO } from "@/content/bso-tokens";
import { BsoPanel } from "./BsoKit";

/**
 * The parameter sweep — same code, three nights.
 *
 * The argument of this section is that the difference between these posters is
 * a number, not a decision, so each one is captioned with the parameter that
 * moved. Her Figma frame "Section / 02 The Parameters" pairs the same three
 * posters with the same three values; both are verbatim.
 */

const SWEEP = [
  {
    src: "season-02-mahler.jpg",
    night: "Mahler · Symphony No. 4",
    param: "dense chevrons · noise 0.03",
    alt: "The Mahler poster — dense chevrons across a teal field",
  },
  {
    src: "season-04-tchaikovsky.jpg",
    night: "Tchaikovsky · Symphony No. 5",
    param: "diamonds + glow · layers 8",
    alt: "The Tchaikovsky poster — a glowing diamond lattice on wine",
  },
  {
    src: "season-03-125th.jpg",
    night: "125th Anniversary",
    param: "soft weave · alpha 0.34",
    alt: "The 125th Anniversary poster — a soft green weave",
  },
];

export default function BsoParameters() {
  return (
    <BsoPanel
      note="the music sets the parameters"
      kicker="THE PARAMETERS · SAME CODE, THREE NIGHTS"
      title="The music sets the parameters."
      blurb="Before each poster, I tuned a handful of parameters to the feeling of that night’s programme — a calm Mozart opener, a triumphant Tchaikovsky, a monumental Beethoven anniversary. The same code produces all five; the piece decides the colour, the form, and the density."
    >
      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-3">
        {SWEEP.map((s) => (
          <li key={s.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/bso/${s.src}`}
              alt={s.alt}
              loading="lazy"
              className="w-full rounded-[3px]"
              style={{ boxShadow: "0 6px 18px rgba(33,26,23,0.22)" }}
            />
            <p
              className="mono mt-3 text-[9.5px] font-bold tracking-[0.14em]"
              style={{ color: BSO.wine }}
            >
              {s.param}
            </p>
            <p className="mt-1 text-[12.5px] leading-snug">{s.night}</p>
          </li>
        ))}
      </ul>
      <p
        className="mono mt-6 text-[9.5px] leading-relaxed tracking-[0.14em]"
        style={{ color: BSO.muted }}
      >
        PARAMETER SWEEP · SAME CODE, THREE NIGHTS — DENSITY, LAYERS &amp; STROKE
        ALPHA DO THE WORK
      </p>
    </BsoPanel>
  );
}
