import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel, FbRibbon } from "./FbKit";

/**
 * The concept before the pivot.
 *
 * Unlike the other Financial Blueprint visuals, these six screens are real
 * artefacts — the original RetireMap app, exported from her Figma as the raw
 * source images they already were. Rebuilding them as markup would have meant
 * redrawing work she did in 2024, so the screens stay images and only the
 * frame around them is built.
 */

const SCREENS = [
  {
    src: "retiremap-01-splash.png",
    label: "SPLASH",
    alt: "RetireMap splash screen — “Road to Financial Freedom” and a Play button",
  },
  {
    src: "retiremap-02-onboarding-quiz.png",
    label: "ONBOARDING QUIZ",
    alt: "Onboarding quiz asking how you see yourself making extravagant investments in the future",
  },
  {
    src: "retiremap-03-generated-avatar.png",
    label: "GENERATED AVATAR",
    alt: "The generated avatar screen, listing good health, rural setting, retirement home and community involved",
  },
  {
    src: "retiremap-04-lesson-map.png",
    label: "THE LESSON MAP",
    alt: "A Duolingo-style lesson map with Saving, Budgeting and Debt management nodes",
  },
  {
    src: "retiremap-05-a-lesson.png",
    label: "A LESSON",
    alt: "A budgeting lesson with Income unlocked and Expenses and Tracking still locked",
  },
  {
    src: "retiremap-06-dictionary.png",
    label: "THE DICTIONARY",
    alt: "The financial dictionary screen showing 50% toward financial freedom",
  },
];

export default function FbRetireMap() {
  return (
    <FbPanel
      note="the concept before the pivot"
      kicker="DESIGN EXPLORATIONS · “RETIREMAP”"
      title="It started as a game about retirement."
      blurb="The first concept — “RetireMap” — walked you through a retirement-lifestyle quiz, built you an avatar, and unlocked a Duolingo-style map of financial lessons."
      wide
    >
      <FbRibbon hint="SIX SCREENS · SCROLL →">
        {SCREENS.map((s) => (
          <div key={s.src} className="w-[176px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/financial-blueprint/${s.src}`}
              alt={s.alt}
              width={390}
              height={844}
              loading="lazy"
              className="w-full max-w-full rounded-xl"
              style={{ background: FB.screen }}
            />
            <p
              className="mono mt-2 text-[9.5px] tracking-[0.14em]"
              style={{ color: FB.muted }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </FbRibbon>
    </FbPanel>
  );
}
