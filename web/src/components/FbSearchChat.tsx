import { FB } from "@/content/financial-blueprint-tokens";
import { FbPanel, FbScreen, FbRibbon } from "./FbKit";

/**
 * The two features that became the front door — smart search and the chat bot.
 *
 * Built rather than exported for the same reason as the W-4 flow: the point of
 * the frame is what the interface *says* — a plain-English query and a plain-
 * English answer — and that argument dies at PNG scale. The three notes beside
 * the screens are her copy, verbatim.
 */

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
  const mono = "mono tracking-[0.14em]";
  const BODY = "min-h-[340px] w-[196px]";

  return (
    <FbPanel
      note="ask in your own words"
      kicker="TWO FEATURES · SEARCH + CHAT"
      title="Ask in your own words. Get a straight answer."
      wide
    >
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)]">
        <div>
          <FbRibbon>
            {/* smart search */}
            <FbScreen label="SMART SEARCH">
              <div className={BODY}>
                <p
                  className="text-[15px] font-bold"
                  style={{ color: FB.green }}
                >
                  Hi Anna!
                </p>
                <p className="mt-1 text-[10.5px] opacity-80">
                  Have a question?
                </p>
                <div
                  className="mt-3 rounded-lg px-2.5 py-2 text-[12px] font-bold"
                  style={{ background: FB.card, color: FB.ink }}
                >
                  <span aria-hidden>🔍</span> W-4
                </div>

                <p className="mt-4 text-[11.5px] font-bold">
                  Suggested quizzes
                </p>
                <p className="text-[9.5px]" style={{ color: FB.green }}>
                  because you asked about W-4
                </p>
                <div
                  className="mt-2 rounded-lg border px-2.5 py-2"
                  style={{ borderColor: FB.cream }}
                >
                  <p className={`${mono} text-[8px] opacity-75`}>
                    UNIT 6 · FIRST JOB
                  </p>
                  <p className="text-[13px] font-bold">Forms</p>
                </div>

                <p className="mt-4 text-[11.5px] font-bold">
                  Continue Learning
                </p>
                <div
                  className="mt-2 flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2"
                  style={{ borderColor: FB.cream }}
                >
                  <div>
                    <p className={`${mono} text-[8px] opacity-75`}>UNIT 1</p>
                    <p className="text-[12px] font-bold">Budgeting Basics</p>
                    <p className="text-[9px] opacity-70">70% complete</p>
                  </div>
                  <span
                    className="h-5 w-5 shrink-0 rounded-full"
                    style={{ background: FB.violet }}
                    aria-hidden
                  />
                </div>
              </div>
            </FbScreen>

            {/* the chat bot */}
            <FbScreen label="CHAT BOT">
              <div className={`${BODY} flex flex-col`}>
                <p
                  className="text-[13px] font-bold"
                  style={{ color: FB.green }}
                >
                  Your financial helper
                </p>
                <div className="mt-3 flex-1 space-y-2">
                  {THREAD.map((m) => (
                    <p
                      key={m.text}
                      className={`rounded-lg px-2.5 py-2 text-[9.5px] leading-snug ${
                        m.from === "user" ? "ml-6 font-bold" : "mr-5"
                      }`}
                      style={
                        m.from === "user"
                          ? { background: FB.violet, color: FB.cream }
                          : { background: FB.card, color: FB.ink }
                      }
                    >
                      {m.text}
                    </p>
                  ))}
                </div>
                <div
                  className="mt-3 flex items-center justify-between rounded-full px-3 py-2 text-[9.5px]"
                  style={{ background: FB.screenInset }}
                >
                  <span className="opacity-60">Ask anything…</span>
                  <span aria-hidden>🎙</span>
                </div>
              </div>
            </FbScreen>
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
