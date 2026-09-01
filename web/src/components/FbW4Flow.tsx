import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel, FbPhone, FbArrow, FbRibbon } from "./FbKit";

/**
 * "Help me finish my W-4." — one task, start to finish.
 *
 * Six phones with a storyboard rail above them. Built rather than exported: a
 * flattened six-up PNG renders the interface type at around 7px and loses the
 * whole argument, and the ribbon has to scroll on a phone rather than shrink
 * to nothing.
 *
 * Everything inside a screen is written at real iPhone sizes — 390 points
 * wide, 17px body, 30px titles — and FbPhone scales the device down as a
 * whole. All copy is verbatim from her Figma frame "Product / The W-4 Flow".
 */

const RAIL = ["ENTICE", "ENTER", "ENGAGE", "EXIT", "EXTEND", "END"];

/** Display width of each device in the ribbon. */
const W = 244;
/** Vertical middle of a device at that width, so the arrows line up with it. */
const MID = Math.round((868 * W) / 414 / 2) - 12;

function Ring() {
  // 50% of a circle, drawn rather than imaged so it stays crisp at any scale.
  const r = 62;
  const c = 2 * Math.PI * r;
  return (
    <svg
      viewBox="0 0 150 150"
      width={150}
      height={150}
      role="img"
      aria-label="50 percent mastered"
      style={{ display: "block", margin: "26px auto" }}
    >
      <circle
        cx="75"
        cy="75"
        r={r}
        fill="none"
        stroke={FB.screenInset}
        strokeWidth="12"
      />
      <circle
        cx="75"
        cy="75"
        r={r}
        fill="none"
        stroke={FB.green}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={`${c / 2} ${c}`}
        transform="rotate(-90 75 75)"
      />
      <text
        x="75"
        y="86"
        textAnchor="middle"
        fill={FB.cream}
        fontSize="32"
        fontWeight="700"
      >
        50%
      </text>
    </svg>
  );
}

export default function FbW4Flow() {
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
        <FbPhone width={W} label="1 · WELCOME">
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 30, lineHeight: 1.15, fontWeight: 700 }}>
              Welcome to Financial Blueprint
            </p>
            <p style={{ fontSize: 16, marginTop: 14, opacity: 0.75 }}>
              Plain-language money help, on demand.
            </p>
            <span
              style={{
                marginTop: 34,
                padding: "13px 30px",
                borderRadius: 999,
                background: FB.green,
                color: FB.screen,
                fontSize: 17,
                fontWeight: 700,
              }}
            >
              Get started
            </span>
          </div>
        </FbPhone>

        <FbArrow top={MID} />

        {/* 2 — search */}
        <FbPhone width={W} label="2 · SEARCH “W-4”">
          <p style={{ fontSize: 30, fontWeight: 700, color: FB.green }}>
            Hi Anna!
          </p>
          <p style={{ fontSize: 15, marginTop: 6, opacity: 0.8 }}>
            Have a question?
          </p>
          <div
            style={{
              marginTop: 18,
              padding: "14px 16px",
              borderRadius: 14,
              background: FB.cream,
              color: FB.ink,
              fontSize: 17,
              fontWeight: 700,
            }}
          >
            <span aria-hidden>🔍</span> W-4
          </div>
          <p
            className="mono"
            style={{
              marginTop: 22,
              fontSize: 11,
              letterSpacing: "0.14em",
              opacity: 0.7,
            }}
          >
            SUGGESTED
          </p>
          <div
            style={{
              marginTop: 8,
              padding: "12px 15px",
              borderRadius: 14,
              border: `1.5px solid ${FB.cream}`,
            }}
          >
            <p style={{ fontSize: 13, opacity: 0.8 }}>UNIT 6 · Forms</p>
            <p style={{ fontSize: 19, fontWeight: 700, marginTop: 2 }}>
              The W-4
            </p>
          </div>
        </FbPhone>

        <FbArrow top={MID} />

        {/* 3 — suggested lesson */}
        <FbPhone width={W} label="3 · SUGGESTED LESSON">
          <p style={{ fontSize: 24, fontWeight: 700 }}>Suggested for you</p>
          <p style={{ fontSize: 14, marginTop: 5, color: FB.green }}>
            because you searched “W-4”
          </p>
          <div
            style={{
              marginTop: 20,
              padding: 18,
              borderRadius: 16,
              background: FB.screenInset,
            }}
          >
            <span
              aria-hidden
              style={{
                display: "block",
                width: 56,
                height: 56,
                borderRadius: 8,
                background: "#CDBDF2",
              }}
            />
            <p
              className="mono"
              style={{
                marginTop: 20,
                fontSize: 11,
                letterSpacing: "0.14em",
                opacity: 0.75,
              }}
            >
              UNIT 6 · FIRST JOB
            </p>
            <p style={{ fontSize: 28, fontWeight: 700, marginTop: 2 }}>Forms</p>
          </div>
        </FbPhone>

        <FbArrow top={MID} />

        {/* 4 — complete the W-4 */}
        <FbPhone width={W} label="4 · COMPLETE THE W-4">
          <p style={{ fontSize: 24, fontWeight: 700 }}>Complete a W-4</p>
          <p style={{ fontSize: 14, marginTop: 5, opacity: 0.75 }}>
            Lesson 1 · First Job
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: "20px 0 0" }}>
            {[
              "Personal information",
              "Filing status",
              "Withholding allowances",
            ].map((row) => (
              <li
                key={row}
                style={{
                  marginBottom: 12,
                  padding: "16px 15px",
                  borderRadius: 12,
                  background: "#CDBDF2",
                  color: FB.screen,
                  fontSize: 17,
                  fontWeight: 700,
                }}
              >
                {row}
              </li>
            ))}
          </ul>
        </FbPhone>

        <FbArrow top={MID} />

        {/* 5 — the chat bot */}
        <FbPhone width={W} label="5 · ASK THE CHAT BOT">
          <p style={{ fontSize: 22, fontWeight: 700, color: FB.green }}>
            Chat Bot
          </p>
          <p
            style={{
              marginTop: 22,
              marginLeft: 52,
              padding: "13px 15px",
              borderRadius: 14,
              background: FB.violet,
              color: FB.cream,
              fontSize: 15,
              lineHeight: 1.32,
              fontWeight: 700,
            }}
          >
            Should I claim 0 allowances?
          </p>
          <p
            style={{
              marginTop: 14,
              marginRight: 44,
              padding: "13px 15px",
              borderRadius: 14,
              background: FB.card,
              color: FB.ink,
              fontSize: 15,
              lineHeight: 1.32,
            }}
          >
            With one job, 0 withholds the most — you’ll likely get a refund at
            tax time.
          </p>
        </FbPhone>

        <FbArrow top={MID} />

        {/* 6 — progress */}
        <FbPhone width={W} label="6 · TRACK PROGRESS">
          <p style={{ fontSize: 22, fontWeight: 700 }}>Financial Dictionary</p>
          <Ring />
          <p
            className="mono"
            style={{ fontSize: 11, letterSpacing: "0.14em", opacity: 0.7 }}
          >
            MASTERED
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, marginTop: 10 }}>
            <span aria-hidden>✓ </span>Forms
          </p>
          <p style={{ fontSize: 18, marginTop: 8, opacity: 0.6 }}>
            <span aria-hidden>✓ </span>Understanding income
          </p>
        </FbPhone>
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
