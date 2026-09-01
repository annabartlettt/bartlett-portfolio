import { SP } from "@/content/spotify-tokens";
import { SpPanel, SpCard, SpLabel } from "./SpotifyKit";

/**
 * The three things standing between a listener and everyone else.
 *
 * Pure type in her Figma frame "Section / 01 The Distance", so pure type here —
 * flattening three named barriers to an image would only make them smaller and
 * unselectable. Copy is verbatim.
 */

const BARRIERS = [
  {
    label: "GEOGRAPHIC",
    title: "Distance & time zones",
    body: "Friends and scenes in other regions are hard to reach — and impossible to listen alongside.",
  },
  {
    label: "CULTURAL",
    title: "No window into elsewhere",
    body: "Little visibility into what a place is actually listening to, or why it matters there.",
  },
  {
    label: "LANGUAGE",
    title: "Lyrics you can’t follow",
    body: "A song in another language stays at arm’s length — you skip it before it can land.",
  },
];

export default function SpotifyBarriers() {
  return (
    <SpPanel
      kicker="THE DISTANCE · THREE THINGS IN THE WAY"
      title="Everywhere, and nowhere near anyone."
      blurb="Spotify reaches almost everywhere — but its listeners still can’t reach each other. Three things sit in the way, and the design has to answer all three."
    >
      <SpLabel>THREE THINGS IN THE WAY</SpLabel>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
        {BARRIERS.map((b) => (
          <SpCard key={b.label} {...b} />
        ))}
      </ul>

      <blockquote
        className="serif m-0 mt-8 border-l-2 pl-5 text-[19px] leading-snug italic"
        style={{ borderColor: SP.green, color: SP.white }}
      >
        You can stream a song from anywhere — and still feel nowhere near the
        people who love it.
      </blockquote>
    </SpPanel>
  );
}
