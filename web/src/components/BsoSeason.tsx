import { BSO } from "@/content/bso-tokens";
import { BsoPoster } from "./BsoKit";

/**
 * The season: the five posters she considers the real work, shown first and
 * large. Each night's signature (from the Evolution frame's stage 04 copy) sits
 * under its poster, so the result and the mechanism arrive together.
 */
const NIGHTS = [
  ["season-01-opening-night.jpg", "Opening Night · Mozart & Strauss", "orthogonal weave"],
  ["season-02-mahler.jpg", "Mahler · Symphony No. 4", "chevrons"],
  ["season-03-125th.jpg", "125th Anniversary · Missa Solemnis", "soft haze"],
  ["season-04-tchaikovsky.jpg", "Tchaikovsky · Symphony No. 5", "glowing lattice"],
  ["season-05-american.jpg", "American Composers Program", "diamonds"],
] as const;

export default function BsoSeason() {
  return (
    <div>
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
        {NIGHTS.map(([src, name, signature]) => (
          <figure key={src} className="m-0 w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
            <BsoPoster src={src} alt={`${name}, ${signature}`} />
            <figcaption className="mt-3">
              <span
                className="mono block text-[11px] font-bold tracking-[0.14em]"
                style={{ color: BSO.wine }}
              >
                {signature}
              </span>
              <span className="mt-1 block text-[15px] leading-snug" style={{ color: BSO.ink }}>
                {name}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p
        className="mono mt-6 text-[11px] tracking-[0.16em]"
        style={{ color: BSO.muted }}
      >
        THE SEASON · ONE TYPE SYSTEM, FIVE TEXTURES, ONE SKETCH
      </p>
    </div>
  );
}
