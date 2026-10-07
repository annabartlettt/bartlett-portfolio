"use client";

import { useState, type ReactNode } from "react";
import { SB, tint } from "@/content/storybridge-tokens";
import { FEATURED, LEVELS, LIBRARY } from "@/content/storybridge-stories";

/**
 * The StoryBridge loop, as a click-through of the real screens.
 *
 * One story, "The Youngest Teacher", travels from a teacher's prompt to a
 * young reader. Each stop is the full page someone actually sees at that
 * moment, built from the product's own components, in a browser frame. The
 * dashed path above is the progress bar: green stops are people, clay stops
 * are the AI, and the AI is never first or last.
 */
const mono = "mono tracking-widest uppercase";
type Role = "Author" | "Reader" | "Admin";

/* ---------- shared chrome ---------- */

function Frame({ role, children }: { role: Role; children: ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-xl border bg-white shadow-[0_24px_50px_-30px_rgba(0,0,0,0.55)]"
      style={{ borderColor: SB.line, color: SB.ink }}
    >
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: SB.line, background: SB.surface }} aria-hidden>
        {[0, 1, 2].map((d) => (
          <span key={d} className="h-2.5 w-2.5 rounded-full" style={{ background: SB.line }} />
        ))}
        <span className="mono ml-3 rounded px-2 py-0.5 text-[10px]" style={{ background: "#fff", color: SB.muted }}>
          storybridge.app/{role.toLowerCase()}
        </span>
      </div>
      <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: SB.line }}>
        <span className="sb-display text-[17px]">Storybridge</span>
        <nav className={`${mono} flex gap-1 text-[10px]`}>
          {(["Author", "Reader", "Admin"] as Role[]).map((r) => (
            <span key={r} className="rounded-md px-2.5 py-1" style={r === role ? { background: SB.accent, color: SB.paper } : { color: SB.muted }}>
              {r}
            </span>
          ))}
        </nav>
        <span className={`${mono} text-[10px]`} style={{ color: SB.muted }}>
          {role === "Admin" ? "Ms. Rivera" : role === "Reader" ? "Maya, 4th" : "Anna B."}
        </span>
      </div>
      <div className="min-h-[360px] p-5 sm:p-7" style={{ background: SB.paper }}>
        {children}
      </div>
    </div>
  );
}

const Btn = ({ children, solid = true, color = SB.accent }: { children: ReactNode; solid?: boolean; color?: string }) => (
  <span
    className={`${mono} inline-block rounded-md px-3.5 py-2 text-[10.5px]`}
    style={solid ? { background: color, color: SB.paper } : { border: `1px solid ${SB.line}`, color: SB.ink, background: "#fff" }}
  >
    {children}
  </span>
);

const Chip = ({ children, bg = SB.surface, fg = SB.muted }: { children: ReactNode; bg?: string; fg?: string }) => (
  <span className={`${mono} inline-block rounded px-2 py-1 text-[9.5px]`} style={{ background: bg, color: fg }}>
    {children}
  </span>
);

const SAMPLE = [
  "My cousin Leo is six, and last summer he taught me how to be patient.",
  "He wanted to learn to ride a bike, and I wanted to get it over with.",
];

/* ---------- the six pages ---------- */

const PromptPage = () => (
  <Frame role="Author">
    <p className={`${mono} text-[10px]`} style={{ color: SB.green }}>This week&rsquo;s prompt · from Ms. Rivera</p>
    <div className="mt-3 rounded-xl px-5 py-5" style={{ background: SB.green, color: SB.paper }}>
      <p className="sb-display text-2xl leading-snug">Write about a time someone younger taught you something.</p>
      <p className="mt-2 text-[12.5px] opacity-85">Due Friday · 300 to 800 words · readers in grades 3 to 8</p>
    </div>
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Btn>Start writing</Btn>
      <Btn solid={false}>Or set your own prompt</Btn>
    </div>
    <p className={`${mono} mt-7 text-[10px]`} style={{ color: SB.muted }}>Past prompts</p>
    <ul className="mt-2 list-none space-y-2 p-0 text-[13px]">
      {["A game you lost and learned from", "An object that belongs to your family"].map((t) => (
        <li key={t} className="flex items-center justify-between rounded-lg border bg-white px-3 py-2" style={{ borderColor: SB.line }}>
          {t}
          <Chip>Closed</Chip>
        </li>
      ))}
    </ul>
  </Frame>
);

const WritePage = () => (
  <Frame role="Author">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Chip bg={tint(SB.muted, 20)}>Draft · saved</Chip>
      <span className="mono text-[10.5px]" style={{ color: SB.muted }}>412 words</span>
    </div>
    <p className="sb-display mt-4 text-3xl">{FEATURED.title}</p>
    <div className="mt-2 flex flex-wrap gap-2">
      <Chip>Family</Chip>
      <Chip bg="#fff" fg={SB.muted}>+ add a tag</Chip>
    </div>
    <div className="mt-5 space-y-3 rounded-lg border bg-white p-4 text-[14.5px] leading-relaxed" style={{ borderColor: SB.line }}>
      {SAMPLE.map((p) => (
        <p key={p}>{p}</p>
      ))}
      <span className="inline-block h-4 w-0.5 animate-pulse align-middle" style={{ background: SB.accent }} aria-hidden />
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      <Btn>Submit for review</Btn>
      <Btn solid={false}>Save draft</Btn>
    </div>
  </Frame>
);

const ScreenPage = () => (
  <Frame role="Author">
    <Chip bg={tint(SB.accent, 18)} fg={SB.accent}>AI screening · complete</Chip>
    <p className="sb-display mt-3 text-2xl">{FEATURED.title}</p>
    <div className="mt-4 grid gap-2 sm:grid-cols-2">
      {["Language", "Violence", "Sensitive topics", "Personal information"].map((c) => (
        <div key={c} className="flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-[13px]" style={{ borderColor: SB.line }}>
          {c}
          <Chip bg={tint(SB.mint, 32)} fg={SB.green}>Clear</Chip>
        </div>
      ))}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Chip bg={tint(SB.coral, 30)} fg="#9A3B40">Age score: 30/100</Chip>
      <span className="text-[12.5px]" style={{ color: SB.muted }}>Suitable for grade 3 and up</span>
    </div>
    <div className="mt-5 rounded-lg px-4 py-3 text-[13.5px]" style={{ background: SB.surface }}>
      These are labels, not a decision. Your story has gone to <b>Ms. Rivera</b> for review.
    </div>
  </Frame>
);

const ReviewPage = () => (
  <Frame role="Admin">
    <div className="grid gap-4 md:grid-cols-[0.9fr_1.4fr]">
      <div>
        <p className={`${mono} text-[10px]`} style={{ color: SB.muted }}>Moderation queue · 3</p>
        <ul className="mt-2 list-none space-y-2 p-0">
          {[
            { t: FEATURED.title, v: "AI: Clear", on: true },
            { t: "The Group Chat", v: "Flagged", on: false },
            { t: "Third Quarter", v: "AI: Clear", on: false },
          ].map((q) => (
            <li
              key={q.t}
              className="rounded-lg border px-3 py-2 text-[13px]"
              style={{ borderColor: q.on ? SB.green : SB.line, background: q.on ? tint(SB.mint, 22) : "#fff" }}
            >
              <span className="sb-display block text-[14px]">{q.t}</span>
              <span className={`${mono} text-[9px]`} style={{ color: q.v === "Flagged" ? SB.accent : SB.green }}>{q.v}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border bg-white p-4" style={{ borderColor: SB.line }}>
        <p className="sb-display text-xl">{FEATURED.title}</p>
        <p className="mono mt-1 text-[10.5px]" style={{ color: SB.muted }}>by Anna B. · original text</p>
        <p className="mt-3 text-[13.5px] leading-relaxed">{SAMPLE[0]}</p>
        <p className="mt-3 rounded px-3 py-2 text-[12px]" style={{ background: SB.surface, color: SB.muted }}>
          AI report: all categories clear · age score 30/100
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Btn color={SB.green}>Approve</Btn>
          <Btn solid={false}>Request changes</Btn>
          <Btn solid={false}>Override</Btn>
        </div>
      </div>
    </div>
  </Frame>
);

const LevelPage = () => (
  <Frame role="Author">
    <Chip bg={SB.green} fg={SB.paper}>Published</Chip>
    <p className="sb-display mt-3 text-2xl">{FEATURED.title}</p>
    <p className={`${mono} mt-5 text-[10px]`} style={{ color: SB.accent }}>✨ See how readers experience it</p>
    <div className="mt-2 flex flex-wrap gap-2">
      {["Original", ...LEVELS].map((l, i) => (
        <span key={l} className="mono rounded-md px-3 py-1.5 text-[11px]" style={i === 1 ? { background: SB.accent, color: SB.paper } : { background: SB.surface, color: SB.muted }}>
          {l}
        </span>
      ))}
    </div>
    <div className="mt-4 rounded-lg border bg-white p-4 text-[14.5px] leading-relaxed" style={{ borderColor: SB.line }}>
      My cousin Leo is six, and last summer he taught me how to be{" "}
      <mark className="rounded px-0.5" style={{ background: tint(SB.yellow, 55), color: SB.ink }}>calm</mark>.
    </div>
    <p className="mt-3 text-[12.5px]" style={{ color: SB.muted }}>
      Previewing 3rd–4th: one word swapped, highlighted. Your original text is never changed. Readers start on Original.
    </p>
  </Frame>
);

const ReadPage = () => (
  <Frame role="Reader">
    <div className="rounded-xl px-5 py-5" style={{ background: SB.accent, color: SB.paper }}>
      <p className={`${mono} text-[9.5px] opacity-80`}>New this week · picked for you</p>
      <p className="sb-display mt-1 text-2xl italic">{FEATURED.title}</p>
      <p className={`${mono} mt-1.5 text-[10px]`}>{FEATURED.byline.join(" · ")}</p>
      <p className="mt-3 max-w-md text-[13px] opacity-90">A cousin learns patience from a six-year-old on a bike.</p>
      <span className={`${mono} mt-4 inline-block rounded-md bg-white px-3.5 py-2 text-[10.5px]`} style={{ color: SB.accent }}>Read story →</span>
    </div>
    <p className="sb-display mt-6 text-xl">Browse Stories</p>
    <div className="mt-3 grid grid-cols-3 gap-3">
      {LIBRARY.slice(0, 3).map((s) => (
        <div key={s.title} className="overflow-hidden rounded-lg border" style={{ borderColor: SB.line }}>
          <div className="h-10" style={{ background: s.c }} />
          <div className="bg-white px-2.5 py-2">
            <p className="sb-display truncate text-[13px]">{s.title}</p>
            <p className={`${mono} mt-0.5 text-[8.5px]`} style={{ color: SB.muted }}>{s.grade} · {s.tag}</p>
          </div>
        </div>
      ))}
    </div>
  </Frame>
);

const STEPS = [
  { who: "A teacher", role: "Prompt", ai: false, title: "A teacher's prompt reaches the writer", page: <PromptPage />,
    detail: "A person starts it. Not an algorithm deciding what a class should write about this week." },
  { who: "A high schooler", role: "Write", ai: false, title: "A high schooler writes", page: <WritePage />,
    detail: "The story is written by a teenager for a real reader, which is the part a grade cannot substitute for." },
  { who: "The AI", role: "Screen", ai: true, title: "The AI screens it", page: <ScreenPage />,
    detail: "The first place the machine appears. It screens and labels. It does not decide, and it does not write." },
  { who: "A teacher", role: "Review", ai: false, title: "A teacher approves it", page: <ReviewPage />,
    detail: "A person holds the gate. Nothing reaches a child because a score cleared a threshold on its own." },
  { who: "The AI", role: "Adapt", ai: true, title: "The AI offers reading levels", page: <LevelPage />,
    detail: "The second and last place the machine appears. It swaps words for a band. The author's text is untouched." },
  { who: "A young reader", role: "Read", ai: false, title: "A K-8 kid reads it", page: <ReadPage />,
    detail: "A person ends it, reading something another person wrote. Then the loop closes back to next week's prompt." },
];

export default function SbLoop() {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const color = step.ai ? SB.accent : SB.green;
  const go = (n: number) => setI((n + STEPS.length) % STEPS.length);

  return (
    <div className="rounded-2xl border p-5 sm:p-8" style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`${mono} text-[10px] font-bold`} style={{ color: SB.muted }}>
          One story, start to finish · {i + 1} of {STEPS.length}
        </p>
        <div className={`${mono} flex gap-5 text-[10px]`}>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SB.green }} aria-hidden />
            People
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: SB.accent }} aria-hidden />
            AI
          </span>
        </div>
      </div>

      {/* Progress: a dashed path that fills as the story travels */}
      <div className="relative mt-7 px-2">
        <div className="absolute left-6 right-6 top-[18px] border-t-2 border-dashed" style={{ borderColor: SB.line }} aria-hidden />
        <div
          className="absolute left-6 top-[18px] border-t-2 transition-all duration-500"
          style={{ borderColor: color, width: `calc((100% - 3rem) * ${i / (STEPS.length - 1)})` }}
          aria-hidden
        />
        <ol className="relative flex list-none justify-between p-0">
          {STEPS.map((s, n) => {
            const c = s.ai ? SB.accent : SB.green;
            const on = n === i;
            const done = n < i;
            return (
              <li key={n} className="flex w-10 flex-col items-center">
                <button
                  onClick={() => setI(n)}
                  aria-label={`Step ${n + 1}: ${s.title}`}
                  aria-current={on ? "step" : undefined}
                  className="mono flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold transition"
                  style={{
                    background: on || done ? c : "#fff",
                    color: on || done ? SB.paper : c,
                    border: `2px solid ${c}`,
                    transform: on ? "scale(1.15)" : "none",
                  }}
                >
                  {String(n + 1).padStart(2, "0")}
                </button>
                <span className={`${mono} mt-2 hidden text-center text-[9px] sm:block`} style={{ color: on ? c : SB.muted }}>
                  {s.role}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* The slide: the caption, then the real page */}
      <div key={i} className="sb-fade mt-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className={`${mono} text-[10px] font-bold`} style={{ color: color }}>
              Step {String(i + 1).padStart(2, "0")} · {step.who}
            </p>
            <p className="sb-display mt-1.5 text-2xl leading-tight">{step.title}</p>
            <p className="mt-2 text-[14.5px] leading-snug" style={{ color: SB.muted }}>{step.detail}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(i - 1)}
              aria-label="Previous step"
              className={`${mono} rounded-md border px-3.5 py-2 text-[10.5px]`}
              style={{ borderColor: SB.line, color: SB.muted, background: "#fff" }}
            >
              ←
            </button>
            <button
              onClick={() => go(i + 1)}
              className={`${mono} rounded-md px-3.5 py-2 text-[10.5px]`}
              style={{ background: SB.ink, color: SB.paper }}
            >
              {i === STEPS.length - 1 ? "Back to the prompt ↺" : "Next →"}
            </button>
          </div>
        </div>

        <div className="mt-5 rounded-2xl p-3 sm:p-5" style={{ background: tint(color, 16) }}>
          {step.page}
        </div>
      </div>

      <p className="mt-6 text-center text-[13px]" style={{ color: SB.muted }}>
        Illich called this a learning web: people linked to people. The AI is the connective tissue, never the teacher.
        <span className="block text-[11px] opacity-80">Story text, names, and prompts are sample content for the walkthrough.</span>
      </p>
    </div>
  );
}
