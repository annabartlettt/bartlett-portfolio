import { BSO } from "@/content/bso-tokens";
import { BsoPanel } from "./BsoKit";

/**
 * The system in the wild.
 *
 * Six placements at six scales — highway to tote — all generated from the one
 * sketch. This is the payoff for the "rules beat artifacts" argument: nothing
 * here was redrawn for its format. Photographs and labels are hers, from the
 * Figma frame "Section / 03 Applications Drawer (expanded)".
 */

const PLACEMENTS = [
  {
    src: "app-billboard-opening-night.jpg",
    label: "Highway billboard — Opening Night",
    alt: "A highway billboard carrying the Opening Night poster",
  },
  {
    src: "app-building-wall-american.jpg",
    label: "Building wall — American Composers",
    alt: "The American Composers Program poster printed across a building wall",
  },
  {
    src: "app-bus-wrap-mahler.jpg",
    label: "Transit bus wrap — Mahler",
    alt: "A city bus wrapped in the teal Mahler poster artwork",
  },
  {
    src: "app-bus-shelter.jpg",
    label: "Bus shelter — three nights",
    alt: "A bus shelter panel showing the Tchaikovsky poster",
  },
  {
    src: "app-tote-tchaikovsky.jpg",
    label: "Tote bag — Tchaikovsky merch",
    alt: "A tote bag printed with the Tchaikovsky poster",
  },
  {
    src: "app-street-banner-opening-night.jpg",
    label: "Street banner — Opening Night",
    alt: "A wide street banner carrying the Opening Night artwork",
    // genuinely 3.9:1 — cropping it to the tile ratio would throw the banner
    // away, so it sits inside the tile instead of filling it
    wide: true,
  },
];

export default function BsoApplications() {
  return (
    <BsoPanel
      note="one sketch, every scale"
      kicker="APPLICATIONS · THE SYSTEM IN THE WILD"
      title="Highway to tote, nothing redrawn."
      blurb="The same system across scales — highway, hoarding, transit and merch, all generated from one sketch."
    >
      <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {PLACEMENTS.map((p) => (
          <li key={p.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/bso/${p.src}`}
              alt={p.alt}
              loading="lazy"
              className={`aspect-[4/3] w-full rounded-lg ${
                p.wide ? "object-contain p-3" : "object-cover"
              }`}
              style={p.wide ? { background: "#DCD0B4" } : undefined}
            />
            <p
              className="mono mt-2 text-[9.5px] leading-snug tracking-[0.12em]"
              style={{ color: BSO.muted }}
            >
              {p.label.toUpperCase()}
            </p>
          </li>
        ))}
      </ul>
    </BsoPanel>
  );
}
