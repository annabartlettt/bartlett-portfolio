import { SP } from "@/content/spotify-tokens";
import { SpPanel, SpCard, SpLabel } from "./SpotifyKit";

/**
 * How "share with a friend" works everywhere but Spotify.
 *
 * The two teardown boards are real artefacts — six-step annotated flows she
 * built for X and LinkedIn — so they stay as images. The four findings they
 * produced are type, and are built.
 *
 * The boards are dense at this width on purpose: what they show is that the
 * comparison was done step by step, not that any one annotation is legible.
 */

const METHODS = [
  {
    label: "COMPETITIVE ANALYSIS",
    body: "X · LinkedIn · YouTube — low-friction sharing & contextual discovery",
  },
  {
    label: "USER INTERVIEWS",
    body: "Discovery habits, social listening, regional-music connection",
  },
];

const TEARDOWNS = [
  {
    src: "teardown-x.jpg",
    label: "SHARING ON X — DISCOVER → SHARE FLOW",
    alt: "A six-step annotated teardown of discovering and sharing a post on X",
  },
  {
    src: "teardown-linkedin.jpg",
    label: "SHARING ON LINKEDIN — DISCOVER → SHARE FLOW",
    alt: "A six-step annotated teardown of discovering and sharing a post on LinkedIn",
  },
];

const INSIGHTS = [
  {
    label: "DIVERSE LISTENING",
    title: "Social and solitary",
    body: "People listen both to connect and to be alone — social features have to flex to both.",
  },
  {
    label: "MULTI-PLATFORM",
    title: "A bridge, not a silo",
    body: "Listeners juggle Spotify, Apple, YouTube, TikTok — room for Spotify to bridge casual and engaged listening.",
  },
  {
    label: "GEOGRAPHIC BARRIERS",
    title: "Time zones divide",
    body: "Regional differences and time zones make it hard to connect with listeners elsewhere.",
  },
  {
    label: "CULTURAL GAP",
    title: "No view of regional trends",
    body: "Little visibility into what other cultures listen to blocks real cross-cultural discovery.",
  },
];

export default function SpotifyResearch() {
  return (
    <SpPanel
      kicker="THE RESEARCH · HOW SHARING WORKS ELSEWHERE"
      title="I took apart the apps that already got this right."
      blurb="Competitive analysis across X, LinkedIn and YouTube surfaced best practices for low-friction sharing and contextual discovery; interviews mapped how people actually find music and connect around it."
    >
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
        {METHODS.map((m) => (
          <li
            key={m.label}
            className="rounded-xl border p-4"
            style={{ background: SP.card, borderColor: SP.line }}
          >
            <p
              className="mono text-[9.5px] font-bold tracking-[0.16em]"
              style={{ color: SP.green }}
            >
              {m.label}
            </p>
            <p className="mt-2 text-[13px] leading-relaxed">{m.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <SpLabel>
          COMPETITIVE ANALYSIS · HOW “SHARE WITH A FRIEND” WORKS ELSEWHERE
        </SpLabel>
        <ul className="grid list-none grid-cols-1 gap-5 p-0">
          {TEARDOWNS.map((t) => (
            <li key={t.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/spotify/${t.src}`}
                alt={t.alt}
                loading="lazy"
                className="w-full rounded-lg"
                style={{ background: "#FFFFFF" }}
              />
              <p
                className="mono mt-2 text-[9px] tracking-[0.14em]"
                style={{ color: SP.grey }}
              >
                {t.label}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <SpLabel>WHAT THE RESEARCH FOUND</SpLabel>
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {INSIGHTS.map((i) => (
            <SpCard key={i.label} {...i} />
          ))}
        </ul>
      </div>
    </SpPanel>
  );
}
