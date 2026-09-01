import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel } from "./FbKit";

/**
 * Who Financial Blueprint is for — the persona and the interview quotes.
 *
 * Her Figma frame "Research / Who It's For" is entirely type: a persona card,
 * four quotes and the how-might-we they produced. Flattening that to a PNG
 * would have cost the quotes their selectability and made a 588px-tall image
 * of text that reflows perfectly well as markup, so it is markup.
 *
 * Every word is hers, verbatim from the frame.
 */

const HARD = [
  "Balancing expenses for the first time",
  "Managing income from a part-time job",
  "No time to research personal finance",
];

const QUOTES = [
  "Most banking apps are full of jargon I’m not familiar with.",
  "Zogo? Generic. Boring quizzes — basically Duolingo.",
  "I don’t have the time to research personal finance.",
  "Honestly, it’s just… information overload.",
];

export default function FbVoices() {
  return (
    <FbPanel
      note="their real words, not paraphrased"
      kicker="RESEARCH · WHO IT’S FOR"
      title="One user, sharply drawn."
      blurb="Financial Blueprint designs for one moment: the first time a young adult has to manage money alone."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        {/* the persona */}
        <div
          className="rounded-xl border p-5"
          style={{ background: FB.card, borderColor: FB.line }}
        >
          <span
            className="block h-9 w-9 rounded-full"
            style={{ background: FB.greenInk }}
            aria-hidden
          />
          <p className="serif mt-5 text-[19px] leading-tight">
            First-time financial independence
          </p>
          <p
            className="mt-2 text-[12.5px] leading-snug"
            style={{ color: FB.muted }}
          >
            4th-year CS student · University of Pennsylvania · 21 · Ridgewood,
            NJ
          </p>
          <hr
            className="my-4 border-0 border-t"
            style={{ borderColor: FB.line }}
          />
          <p
            className="mono text-[9.5px] font-bold tracking-[0.16em]"
            style={{ color: FB.violet }}
          >
            WHAT&rsquo;S HARD
          </p>
          <ul className="mt-2 list-none space-y-1 p-0">
            {HARD.map((h) => (
              <li key={h} className="text-[12.5px] leading-snug">
                <span aria-hidden style={{ color: FB.muted }}>
                  ·{" "}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* what they actually said */}
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
          {QUOTES.map((q) => (
            <li
              key={q}
              className="rounded-xl border p-5"
              style={{ background: FB.card, borderColor: FB.line }}
            >
              <blockquote className="m-0 text-[14.5px] leading-snug font-medium">
                &ldquo;{q}&rdquo;
              </blockquote>
              <p
                className="mono mt-3 text-[9.5px] tracking-[0.14em]"
                style={{ color: FB.muted }}
              >
                — YOUNG ADULT, INTERVIEW
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* the how-might-we the interviews produced */}
      <div
        className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-xl px-5 py-4"
        style={{ background: FB.greenWash }}
      >
        <span
          className="mono text-[10px] font-bold tracking-[0.16em]"
          style={{ color: FB.greenInk }}
        >
          HMW
        </span>
        <p className="m-0 text-[14.5px] leading-snug font-semibold">
          Offer free, professional financial help to young adults — in plain
          language, on demand.
        </p>
      </div>
    </FbPanel>
  );
}
