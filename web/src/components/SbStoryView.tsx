"use client";

import { useState } from "react";
import { SB, tint } from "@/content/storybridge-tokens";
import { LEVELS, OPEN_STORY } from "@/content/storybridge-stories";

/**
 * The reader's side of the rule, built rather than exported: the level menu
 * defaults to Original, and choosing a band only changes the copy shown, with
 * a note that the author's words are kept. Replaces a flattened SVG whose
 * story details no longer matched the rest of the page.
 *
 * The rule in miniature: adaptation swaps words, never sentences. One
 * illustrative swap, highlighted so the reader can see exactly what moved.
 */
const SWAPS: [string, string][] = [["underestimated", "doubted"]];

function adapt(p: string) {
  const parts: (string | { word: string })[] = [p];
  for (const [from, to] of SWAPS) {
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (typeof part !== "string" || !part.includes(from)) continue;
      const [a, b] = part.split(from);
      parts.splice(i, 1, a, { word: to }, b);
    }
  }
  return parts;
}

export default function SbStoryView() {
  const [level, setLevel] = useState("Original");
  const options = ["Original", ...LEVELS];
  const chip = "mono rounded px-2 py-1 text-[10px] tracking-widest uppercase";

  return (
    <div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
    >
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3"
        style={{ borderColor: SB.line, background: "#fff" }}
      >
        <span className="sb-display text-[17px]">Storybridge</span>
        <span className="mono text-[11px] tracking-widest" style={{ color: SB.muted }}>
          READER
        </span>
      </div>

      <div
        className="flex flex-wrap items-center gap-2 border-b px-5 py-2.5"
        style={{ borderColor: SB.line }}
      >
        {["Read aloud", "K–2 mode", "Word help"].map((t) => (
          <span key={t} className={chip} style={{ background: SB.surface, color: SB.muted }}>
            {t}
          </span>
        ))}
        <label className="ml-auto flex items-center gap-2">
          <span className="mono text-[10px] tracking-widest uppercase" style={{ color: SB.muted }}>
            Reading level
          </span>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mono rounded border bg-white px-2 py-1 text-[11px]"
            style={{ borderColor: SB.line }}
          >
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-8 text-center">
        <span className={chip} style={{ background: tint(SB.mint, 32), color: SB.green }}>
          {OPEN_STORY.grade}
        </span>
        <h4 className="sb-display mt-3 text-3xl">{OPEN_STORY.title}</h4>
        <p className="mono mt-2 text-[11px] tracking-wide" style={{ color: SB.muted }}>
          by {OPEN_STORY.author} · {OPEN_STORY.meta}
        </p>
        <div className="mt-3 flex justify-center gap-2">
          {OPEN_STORY.tags.map((t) => (
            <span key={t} className={chip} style={{ background: SB.surface, color: SB.muted }}>
              {t}
            </span>
          ))}
        </div>

        <p
          className="mt-6 rounded-md px-3 py-2 text-left text-[12.5px]"
          style={{
            background: level === "Original" ? SB.surface : tint(SB.accent, 14),
            color: level === "Original" ? SB.muted : SB.accent,
          }}
        >
          {level === "Original"
            ? "You are reading the author's original words."
            : `Adapted for ${level} readers: vocabulary only, highlighted. Same sentences, same length; the original never changes.`}
        </p>

        <div className="mt-5 space-y-3 text-left text-[15px] leading-relaxed">
          {OPEN_STORY.paragraphs.map((p) => (
            <p key={p}>
              {level === "Original"
                ? p
                : adapt(p).map((x, i) =>
                    typeof x === "string" ? (
                      x
                    ) : (
                      <mark
                        key={i}
                        className="rounded px-0.5"
                        style={{ background: tint(SB.yellow, 55), color: SB.ink }}
                      >
                        {x.word}
                      </mark>
                    ),
                  )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
