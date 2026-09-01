import { SP } from "@/content/spotify-tokens";
import { SpPanel, SpCard, SpLabel } from "./SpotifyKit";

/**
 * What five participants actually did with it, and what it would be worth.
 *
 * Type throughout in her Figma frame "Section / 04 What I Learned", including
 * the finding she leads with — that translation made people care about songs
 * they had already skipped. Copy is verbatim.
 */

const FINDINGS = [
  {
    label: "STRUGGLED",
    title: "Excited, but lost",
    body: "People loved the Global Mode concept but got lost in the navigation.",
  },
  {
    label: "SIGNAL IT",
    title: "Signpost the translation",
    body: "First-time users needed clearer cues that translated lyrics were even available.",
  },
  {
    label: "THE SURPRISE",
    title: "Songs they’d skipped",
    body: "Translation created unexpected emotional connections to music they’d previously passed over.",
  },
];

const IMPACT = [
  { label: "USER", body: "Cross-cultural discovery; language barriers lowered." },
  { label: "BUSINESS", body: "Market differentiation; wider international reach." },
  { label: "CULTURAL", body: "Music as a path into language learning and curiosity." },
];

export default function SpotifyLearned() {
  return (
    <SpPanel
      kicker="WHAT I LEARNED · FROM USABILITY TESTING"
      title="Translation made people feel something."
      blurb="In moderated testing with five participants, people were excited by Global Mode but struggled with navigation, and first-timers needed clearer signals that translated lyrics existed."
    >
      <SpLabel>FROM USABILITY TESTING · 5 PARTICIPANTS</SpLabel>
      <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-3">
        {FINDINGS.map((f) => (
          <SpCard key={f.label} {...f} />
        ))}
      </ul>

      <div className="mt-10">
        <SpLabel>IMPACT</SpLabel>
        <ul className="grid list-none grid-cols-1 gap-x-6 gap-y-4 p-0 sm:grid-cols-3">
          {IMPACT.map((i) => (
            <li key={i.label}>
              <p
                className="mono text-[9.5px] font-bold tracking-[0.16em]"
                style={{ color: SP.green }}
              >
                {i.label}
              </p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed">{i.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <blockquote
        className="serif m-0 mt-10 border-l-2 pl-5 text-[17px] leading-snug italic"
        style={{ borderColor: SP.green, color: SP.white }}
      >
        “When a design class handed me something ambiguous, I had to decide
        where to take it. Taking charge of that direction is when I learned I
        could lead my own creative process.”
        <span
          className="mono mt-3 block text-[9.5px] tracking-[0.16em] not-italic"
          style={{ color: SP.grey }}
        >
          — PERSONAL REFLECTION
        </span>
      </blockquote>
    </SpPanel>
  );
}
