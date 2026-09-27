import { BSO } from "@/content/bso-tokens";
import { BsoPanel } from "./BsoKit";

/**
 * The parameters, shown as the raw material: backgrounds straight out of the
 * sketch, before any type went on top. Three nights' palettes large, then one
 * palette in the order she saved it, so the dials can be seen moving.
 *
 * The files carry no record of the values used, so the captions describe what
 * each field does rather than quoting numbers.
 */

const FIELDS = [
  {
    src: "bg-teal-chevrons.jpg",
    look: "teal · soft chevrons",
    alt: "A raw teal background: faint cream chevrons drifting across the field",
  },
  {
    src: "bg-slate-brackets.jpg",
    look: "slate · bracket grid",
    alt: "A raw slate background: a tight grid of nested open brackets",
  },
  {
    src: "bg-wine-lattice.jpg",
    look: "wine · diamond lattice",
    alt: "A raw wine background: a tilted lattice of glowing diamonds",
  },
];

const SWEEP = Array.from({ length: 9 }, (_, i) => `bg-wine-sweep-${String(i + 1).padStart(2, "0")}.jpg`);

export default function BsoParameters() {
  return (
    <BsoPanel
      note="the music sets the parameters"
      kicker="THE PARAMETERS · SAME CODE, NO TYPE YET"
      title="The music sets the parameters."
      blurb="Before each poster, I tuned a handful of parameters to the feeling of that night’s programme: a calm Mozart opener, a triumphant Tchaikovsky, a monumental Beethoven anniversary. These are the backgrounds straight out of the sketch, before any type went on top."
    >
      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-3">
        {FIELDS.map((f) => (
          <li key={f.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/bso/${f.src}`}
              alt={f.alt}
              loading="lazy"
              className="w-full rounded-[3px]"
              style={{ boxShadow: "0 6px 18px rgba(33,26,23,0.22)" }}
            />
            <p
              className="mono mt-3 text-[11px] font-bold tracking-[0.14em]"
              style={{ color: BSO.wine }}
            >
              {f.look}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t pt-10" style={{ borderColor: BSO.line }}>
        <p
          className="mono text-[11px] font-bold tracking-[0.16em]"
          style={{ color: BSO.wine }}
        >
          ONE PALETTE, IN THE ORDER I SAVED IT
        </p>
        <p className="mt-2 max-w-3xl text-[16px] leading-relaxed">
          Same code, same wine. As the numbers moved, the field went from a few
          scattered diamonds to a dense lattice to a cloud.
        </p>
        <ol className="no-scrollbar -mx-5 mt-6 flex list-none snap-x gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-9 sm:overflow-visible sm:px-0">
          {SWEEP.map((src, i) => (
            <li key={src} className="w-[38vw] shrink-0 snap-start sm:w-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/bso/${src}`}
                alt={`Wine background, save ${i + 1} of 9`}
                loading="lazy"
                className="w-full rounded-[2px]"
                style={{ boxShadow: "0 4px 12px rgba(33,26,23,0.18)" }}
              />
              <p className="mono mt-2 text-[10px] tracking-[0.14em]" style={{ color: BSO.muted }}>
                {String(i + 1).padStart(2, "0")}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </BsoPanel>
  );
}
