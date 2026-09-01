import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel, FbPhone, FbRibbon } from "./FbKit";

/**
 * The two features that became the front door — smart search and the chat bot.
 *
 * Built rather than exported for the same reason as the W-4 flow: the point of
 * the frame is what the interface *says* — a plain-English query and a plain-
 * English answer — and that argument dies at PNG scale. Screens are authored
 * at a real iPhone's 390 points and scaled down whole. The three notes beside
 * them are her copy, verbatim.
 */

const W = 226;

const NOTES = [
  {
    label: "SMART SEARCH",
    color: FB.violet,
    body: "Search a term in plain English and Blueprint surfaces the exact micro-lesson — Unit 6, Forms, the W-4 — no syllabus to climb and no jargon to decode first.",
  },
  {
    label: "THE CHAT BOT",
    color: FB.violet,
    body: "For the oddly-specific questions a lesson can’t predict — “Should I claim 0 allowances?” — the bot answers in the moment, with hints tuned to the user’s situation.",
  },
  {
    label: "FROM THE RESEARCH",
    color: FB.greenInk,
    body: "Users didn’t want another course to finish. They wanted a straight answer, fast — so search and chat became the front door, not a locked path.",
  },
];

const THREAD = [
  { from: "user", text: "Should I claim 0 allowances?" },
  {
    from: "bot",
    text: "One job, no dependents? Claiming 0 withholds the most — expect a refund. 1 gives more per paycheck.",
  },
  { from: "user", text: "What about a side gig?" },
  {
    from: "bot",
    text: "Then add extra withholding — I’ll open the Multiple Jobs Worksheet with you.",
  },
];

export default function FbSearchChat() {
  const cardBorder = { borderRadius: 14, border: `1.5px solid ${FB.cream}` };

  return (
    <FbPanel
      note="ask in your own words"
      kicker="TWO FEATURES · SEARCH + CHAT"
      title="Ask in your own words. Get a straight answer."
      wide
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <FbRibbon>
            {/* smart search */}
            <FbPhone width={W} label="SMART SEARCH">
              <p style={{ fontSize: 30, fontWeight: 700, color: FB.green }}>
                Hi Anna!
              </p>
              <p style={{ fontSize: 15, marginTop: 6, opacity: 0.8 }}>
                Have a question?
              </p>
              <div
                style={{
                  marginTop: 16,
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: FB.card,
                  color: FB.ink,
                  fontSize: 17,
                  fontWeight: 700,
                }}
              >
                <span aria-hidden>🔍</span> W-4
              </div>

              <p style={{ marginTop: 26, fontSize: 19, fontWeight: 700 }}>
                Suggested quizzes
              </p>
              <p style={{ fontSize: 13, marginTop: 2, color: FB.green }}>
                because you asked about W-4
              </p>
              <div
                style={{ marginTop: 10, padding: "12px 15px", ...cardBorder }}
              >
                <p
                  className="mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    opacity: 0.75,
                  }}
                >
                  UNIT 6 · FIRST JOB
                </p>
                <p style={{ fontSize: 21, fontWeight: 700, marginTop: 2 }}>
                  Forms
                </p>
              </div>

              <p style={{ marginTop: 26, fontSize: 19, fontWeight: 700 }}>
                Continue Learning
              </p>
              <div
                style={{
                  marginTop: 10,
                  padding: "12px 15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  ...cardBorder,
                }}
              >
                <div>
                  <p
                    className="mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      opacity: 0.75,
                    }}
                  >
                    UNIT 1
                  </p>
                  <p style={{ fontSize: 19, fontWeight: 700, marginTop: 2 }}>
                    Budgeting Basics
                  </p>
                  <p style={{ fontSize: 13, marginTop: 3, opacity: 0.7 }}>
                    70% complete
                  </p>
                </div>
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: FB.violet,
                  }}
                />
              </div>
            </FbPhone>

            {/* the chat bot */}
            <FbPhone width={W} label="CHAT BOT">
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ fontSize: 22, fontWeight: 700, color: FB.green }}>
                  Your financial helper
                </p>
                <div style={{ flex: 1, marginTop: 20 }}>
                  {THREAD.map((m) => (
                    <p
                      key={m.text}
                      style={{
                        marginBottom: 12,
                        marginLeft: m.from === "user" ? 56 : 0,
                        marginRight: m.from === "user" ? 0 : 48,
                        padding: "12px 15px",
                        borderRadius: 14,
                        fontSize: 14,
                        lineHeight: 1.34,
                        fontWeight: m.from === "user" ? 700 : 400,
                        background: m.from === "user" ? FB.violet : FB.card,
                        color: m.from === "user" ? FB.cream : FB.ink,
                      }}
                    >
                      {m.text}
                    </p>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderRadius: 999,
                    background: FB.screenInset,
                    fontSize: 14,
                  }}
                >
                  <span style={{ opacity: 0.6 }}>Ask anything…</span>
                  <span aria-hidden>🎙</span>
                </div>
              </div>
            </FbPhone>
          </FbRibbon>
        </div>

        {/* what the two features are for */}
        <div className="space-y-5">
          {NOTES.map((n) => (
            <div key={n.label}>
              <p
                className="mono text-[9.5px] font-bold tracking-[0.16em]"
                style={{ color: n.color }}
              >
                {n.label}
              </p>
              <p className="mt-1.5 text-[14.5px] leading-snug">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </FbPanel>
  );
}
