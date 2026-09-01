import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel, FbScreen, FbArrow, FbRibbon } from "./FbKit";

/**
 * "Help me finish my W-4." — one task, start to finish.
 *
 * Six screens with a storyboard rail above them. These are built rather than
 * exported: at the size a case study shows a six-up ribbon, a flattened PNG
 * would render the interface type at around 7px and lose it entirely, and the
 * ribbon has to be able to scroll on a phone rather than shrink to nothing.
 *
 * All copy is verbatim from her Figma frame "Product / The W-4 Flow".
 */

const RAIL = ["ENTICE", "ENTER", "ENGAGE", "EXIT", "EXTEND", "END"];

/** The dark screens share one body height so the ribbon reads as a strip. */
const BODY = "min-h-[300px] w-[190px]";

function Ring() {
  // 50% of a circle, drawn rather than imaged so it stays crisp at any size.
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 72 72"
      className="mx-auto my-3 h-[72px] w-[72px]"
      role="img"
      aria-label="50 percent mastered"
    >
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={FB.screenInset}
        strokeWidth="6"
      />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={FB.green}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${c / 2} ${c}`}
        transform="rotate(-90 36 36)"
      />
      <text
        x="36"
        y="41"
        textAnchor="middle"
        fill={FB.cream}
        fontSize="15"
        fontWeight="700"
      >
        50%
      </text>
    </svg>
  );
}

export default function FbW4Flow() {
  const inset = { background: FB.screenInset };
  const mono = "mono tracking-[0.14em]";

  return (
    <FbPanel
      note="one task, start to finish"
      kicker="THE FLOW · A REAL SCENARIO"
      title="“Help me finish my W-4.”"
      blurb="One task from start to finish — how a first-timer completes a W-4 with Financial Blueprint, no jargon and no dead ends."
      wide
    >
      {/* the storyboard rail */}
      <ol className="mono -mt-2 mb-6 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[10px] font-bold tracking-[0.16em]">
        {RAIL.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              style={{ color: i === RAIL.length - 1 ? FB.greenInk : FB.muted }}
            >
              {step}
            </span>
            {i < RAIL.length - 1 && (
              <span aria-hidden style={{ color: FB.line }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      <FbRibbon hint="SIX STEPS · SCROLL →">
        {/* 1 — welcome */}
        <FbScreen label="1 · WELCOME">
          <div
            className={`${BODY} flex flex-col items-center justify-center text-center`}
          >
            <p className="text-[15px] leading-tight font-bold">
              Welcome to Financial Blueprint
            </p>
            <p className="mt-2 text-[10.5px] leading-snug opacity-75">
              Plain-language money help, on demand.
            </p>
            <span
              className="mt-5 rounded-full px-4 py-1.5 text-[11px] font-bold"
              style={{ background: FB.green, color: FB.screen }}
            >
              Get started
            </span>
          </div>
        </FbScreen>

        <FbArrow />

        {/* 2 — search */}
        <FbScreen label="2 · SEARCH “W-4”">
          <div className={BODY}>
            <p className="text-[15px] font-bold" style={{ color: FB.green }}>
              Hi Anna!
            </p>
            <p className="mt-1 text-[10.5px] opacity-80">Have a question?</p>
            <div
              className="mt-3 rounded-lg px-2.5 py-2 text-[11.5px] font-bold"
              style={{ background: FB.cream, color: FB.ink }}
            >
              <span aria-hidden>🔍</span> W-4
            </div>
            <p className={`${mono} mt-3 text-[8.5px] opacity-70`}>SUGGESTED</p>
            <div
              className="mt-1.5 rounded-lg border px-2.5 py-2"
              style={{ borderColor: FB.cream }}
            >
              <p className="text-[9.5px] opacity-80">UNIT 6 · Forms</p>
              <p className="text-[12px] font-bold">The W-4</p>
            </div>
          </div>
        </FbScreen>

        <FbArrow />

        {/* 3 — suggested lesson */}
        <FbScreen label="3 · SUGGESTED LESSON">
          <div className={BODY}>
            <p className="text-[13.5px] font-bold">Suggested for you</p>
            <p className="mt-1 text-[10px]" style={{ color: FB.green }}>
              because you searched “W-4”
            </p>
            <div className="mt-3 rounded-lg p-3" style={inset}>
              <span
                className="block h-8 w-8 rounded"
                style={{ background: "#CDBDF2" }}
                aria-hidden
              />
              <p className={`${mono} mt-3 text-[8.5px] opacity-75`}>
                UNIT 6 · FIRST JOB
              </p>
              <p className="text-[15px] font-bold">Forms</p>
            </div>
          </div>
        </FbScreen>

        <FbArrow />

        {/* 4 — complete the W-4 */}
        <FbScreen label="4 · COMPLETE THE W-4">
          <div className={BODY}>
            <p className="text-[13.5px] font-bold">Complete a W-4</p>
            <p className="mt-1 text-[10px] opacity-75">Lesson 1 · First Job</p>
            <ul className="mt-3 list-none space-y-2 p-0">
              {[
                "Personal information",
                "Filing status",
                "Withholding allowances",
              ].map((row) => (
                <li
                  key={row}
                  className="rounded-lg px-2.5 py-2.5 text-[11px] font-bold"
                  style={{ background: "#CDBDF2", color: FB.screen }}
                >
                  {row}
                </li>
              ))}
            </ul>
          </div>
        </FbScreen>

        <FbArrow />

        {/* 5 — the chat bot */}
        <FbScreen label="5 · ASK THE CHAT BOT">
          <div className={BODY}>
            <p className="text-[13px] font-bold" style={{ color: FB.green }}>
              Chat Bot
            </p>
            <p
              className="mt-3 ml-6 rounded-lg px-2.5 py-2 text-[10px] leading-snug font-bold"
              style={{ background: FB.violet, color: FB.cream }}
            >
              Should I claim 0 allowances?
            </p>
            <p
              className="mt-2 mr-5 rounded-lg px-2.5 py-2 text-[10px] leading-snug"
              style={{ background: FB.card, color: FB.ink }}
            >
              With one job, 0 withholds the most — you’ll likely get a refund at
              tax time.
            </p>
          </div>
        </FbScreen>

        <FbArrow />

        {/* 6 — progress */}
        <FbScreen label="6 · TRACK PROGRESS">
          <div className={BODY}>
            <p className="text-[13px] font-bold">Financial Dictionary</p>
            <Ring />
            <p className={`${mono} text-[8.5px] opacity-70`}>MASTERED</p>
            <p className="mt-1.5 text-[11px] font-bold">
              <span aria-hidden>✓ </span>Forms
            </p>
            <p className="mt-1 text-[11px] opacity-60">
              <span aria-hidden>✓ </span>Understanding income
            </p>
          </div>
        </FbScreen>
      </FbRibbon>

      <p
        className="serif mt-6 text-[17px] font-semibold"
        style={{ color: FB.greenInk }}
      >
        <span aria-hidden>↠ </span>empowered, and in control of her money.
      </p>
    </FbPanel>
  );
}
