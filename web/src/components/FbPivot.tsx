import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel } from "./FbKit";

/**
 * The pivot — RetireMap becomes a dictionary.
 *
 * The two "before" screens are the original app, so they stay as exported
 * images; the argument next to them is type and is built. Keeping them side by
 * side is the whole point of the frame — the wall of questions on the left is
 * what the paragraphs on the right are about.
 */

const BEFORE = [
  {
    src: "pivot-before-01-imagine.png",
    alt: "RetireMap onboarding, screen one — “Imagine”, with Urban environment and Rural setting to choose from",
  },
  {
    src: "pivot-before-02-retirement-years.png",
    alt: "RetireMap onboarding, screen two — “Where do you invision spending most of your retirement years?”, Rural setting selected",
  },
];

const ARGUMENT = [
  {
    label: "WHAT WASN’T WORKING",
    color: FB.muted,
    body: "RetireMap made you finish a retirement-lifestyle questionnaire and generate an avatar before you could learn a thing — then walk a locked, linear map. Great for a demo; wrong for how young adults actually reach for money help.",
  },
  {
    label: "THE REDIRECT",
    color: FB.violet,
    body: "Drop the retirement framing and the gate entirely. Keep what worked — the micro-lessons, the term quizzes, the chatbot — and make it on-demand: a financial dictionary you can open to any word, in any order.",
  },
  {
    label: "AFTER →",
    color: FB.greenInk,
    body: "That became Financial Blueprint — the built product in §03 The Product.",
  },
];

export default function FbPivot() {
  return (
    <FbPanel
      note="how the pivot actually looked"
      kicker="THE PIVOT · RETIREMAP → THE DICTIONARY"
      title="We cut the retirement gate."
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <p
            className="mono text-[9.5px] font-bold tracking-[0.16em]"
            style={{ color: FB.muted }}
          >
            BEFORE — A WALL OF QUESTIONS
          </p>
          <div className="mt-3 flex items-center gap-3">
            {BEFORE.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.src}
                src={`/images/financial-blueprint/${b.src}`}
                alt={b.alt}
                width={390}
                height={844}
                loading="lazy"
                className="w-[46%] max-w-[134px] rounded-lg"
                style={{ background: FB.screen }}
              />
            ))}
            <span
              aria-hidden
              className="mono text-lg"
              style={{ color: FB.violet }}
            >
              ↠
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {ARGUMENT.map((a) => (
            <div key={a.label}>
              <p
                className="mono text-[9.5px] font-bold tracking-[0.16em]"
                style={{ color: a.color }}
              >
                {a.label}
              </p>
              <p className="mt-1.5 text-[14.5px] leading-snug">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FbPanel>
  );
}
