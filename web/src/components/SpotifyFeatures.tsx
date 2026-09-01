import { SP } from "@/content/spotify-tokens";
import { SpPanel } from "./SpotifyKit";

/**
 * The four screens Global Mode actually is.
 *
 * These mockups already carry their own iPhone bezel and ship as transparent
 * PNGs, so unlike the Financial Blueprint screens they need no device shell
 * building around them — one would only be a frame inside a frame. They do
 * need the dark ground they were drawn against, which is why this panel is
 * #121212.
 *
 * Captions are verbatim from her Figma frame "Section / 03 Global Mode".
 */

const FEATURES = [
  {
    src: "feature-01-global-map.png",
    n: "01 · GLOBAL MAP",
    title: "Pick a place, hear its music",
    body: "An interactive globe — tap any location to discover its music, beyond the algorithm.",
    alt: "The Global Mode map screen — a globe with a location search",
  },
  {
    src: "feature-02-region-playlists.png",
    n: "02 · REGION PLAYLISTS",
    title: "What’s trending, where",
    body: "Curated playlists by region — top hits, emerging artists, cultural influences, local radio.",
    alt: "Region playlists for Rome — top hits, emerging artists, cultural influences and local radio",
  },
  {
    src: "feature-03-lyrics-translation.png",
    n: "03 · LYRICS TRANSLATION",
    title: "Understand any song",
    body: "Toggle lyrics into your language — the barrier that made you skip a song, gone.",
    alt: "A song's lyrics with an English translation toggle",
  },
  {
    src: "feature-04-friend-activity.png",
    n: "04 · FRIEND ACTIVITY",
    title: "See where friends listen from",
    body: "Friends’ activity with geographic context — a reason to connect across the distance.",
    alt: "A friend's profile with listening history and activity",
  },
];

export default function SpotifyFeatures() {
  return (
    <SpPanel
      kicker="GLOBAL MODE · TWO FEATURES, ONE BRIDGE"
      title="Pick a place. Understand the song."
      blurb="The solution centers on two interconnected features — a regional/global mode and lyric translation — working together as one Global Mode. Pick a place to hear its music; toggle a song into your language to understand it."
    >
      <ul className="grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <li key={f.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/spotify/${f.src}`}
              alt={f.alt}
              loading="lazy"
              className="w-full"
            />
            <p
              className="mono mt-4 text-[9.5px] font-bold tracking-[0.16em]"
              style={{ color: SP.green }}
            >
              {f.n}
            </p>
            <p
              className="mt-1.5 text-[15px] leading-snug font-semibold"
              style={{ color: SP.white }}
            >
              {f.title}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed">{f.body}</p>
          </li>
        ))}
      </ul>
    </SpPanel>
  );
}
