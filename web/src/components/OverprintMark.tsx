"use client";

import { useEffect, useRef } from "react";
import type { MotionLevel } from "./CabinetHome";

/**
 * The mark, out of register.
 *
 * One element for the whole page. It opens at hero size in the right-hand
 * column, and over the first screen of scrolling it travels to the corner and
 * shrinks — so there is no loader and no curtain, just the thing you came for
 * arriving and then getting out of the way. Content is under the fold the
 * whole time.
 *
 * The play is the identity, not decoration: the two letters drift apart and
 * turn away from each other as you scroll, and three times down the page they
 * come back into register and the overprint appears — the third colour that
 * belongs to neither of them. You have to arrive at it.
 *
 * Paths are Anna's own export from the brand book, unchanged. They are two
 * groups rather than one flat image because they have to move independently,
 * and the pink stays on multiply so the overlap keeps mixing itself rather
 * than being a third fill somebody picked.
 */

const A_PATH =
  "M192.177 202.077C229.188 202.077 250.541 231.962 261.218 267.539L367.982 658.885C378.659 698.019 357.306 728.616 321.718 728.616H62.6353C27.0471 728.616 5.69414 698.019 16.3706 658.885L123.135 267.539C133.812 231.962 155.165 202.077 192.177 202.077ZM155.165 340.116H229.188V482.423H155.165V340.116Z";
const B_PATH =
  "M234.882 52.6542C234.882 24.1927 249.118 9.96191 277.588 9.96191H448.412C523.147 9.96191 583.647 70.4427 583.647 145.154C583.647 193.539 560.871 236.231 525.994 262.558C560.871 288.885 590.765 331.577 590.765 415.539C590.765 490.25 530.265 550.731 455.529 550.731H277.588C249.118 550.731 234.882 536.5 234.882 508.039V52.6542ZM348.765 84.6734H448.412V205.635H348.765V84.6734ZM348.765 355.058H462.647V476.02H348.765V355.058Z";

/** How many times the letters come back into register over a full page. */
const REGISTERS = 3;
const HERO_W = 300;
const CORNER_W = 84;
const RATIO = 740 / 605;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export default function OverprintMark({ motion }: { motion: MotionLevel }) {
  const root = useRef<HTMLDivElement>(null);
  const aRef = useRef<SVGGElement>(null);
  const bRef = useRef<SVGGElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // At `off` it parks in the hero slot, in register, and never moves.
    if (motion === "off") {
      const slot = document.querySelector(".rc-heromark");
      const r = slot?.getBoundingClientRect();
      el.style.width = `${HERO_W}px`;
      if (r) {
        el.style.left = `${r.left + window.scrollX}px`;
        el.style.top = `${r.top + window.scrollY}px`;
        el.style.position = "absolute";
      }
      return;
    }

    const amp = motion === "gentle" ? 0.45 : 1;
    let raf = 0;

    const loop = () => {
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? clamp01(window.scrollY / max) : 0;

      // q: hero → corner over the first 70% of a screen
      const q = clamp01(window.scrollY / (vh * 0.7));
      // never wider than the column it rests in, so a phone does not get a
      // 300px mark shouldering the headline off the screen
      const heroW = Math.min(HERO_W, window.innerWidth * 0.42);
      const w = lerp(heroW, CORNER_W, q);
      el.style.width = `${w}px`;

      // The hero slot is a real element, so the resting position is measured
      // rather than guessed and it survives any layout change.
      const slot = document.querySelector(".rc-heromark");
      const s = slot?.getBoundingClientRect();
      const heroX = s ? s.left : window.innerWidth * 0.62;
      const heroY = s ? s.top : vh * 0.3;
      const cornerX = window.innerWidth - CORNER_W - 30;
      const cornerY = vh - CORNER_W * RATIO - 104;

      el.style.transform = `translate3d(${lerp(heroX, cornerX, q).toFixed(1)}px, ${lerp(heroY, cornerY, q).toFixed(1)}px, 0)`;
      el.style.opacity = String(lerp(1, 0.92, q));

      // 0 at each register point, 1 at maximum separation between them
      const sep = Math.abs(Math.sin(p * Math.PI * REGISTERS)) * amp;
      const dx = (sep * 5.2).toFixed(2);
      const dy = (sep * 2).toFixed(2);
      const rot = (sep * 26).toFixed(1);
      aRef.current?.setAttribute(
        "style",
        `transform: translate(${-dx}%, ${-dy}%) rotateY(${-rot}deg); transform-origin: 32% 50%`,
      );
      bRef.current?.setAttribute(
        "style",
        `mix-blend-mode: multiply; transform: translate(${dx}%, ${dy}%) rotateY(${rot}deg); transform-origin: 68% 50%`,
      );
      if (tagRef.current) tagRef.current.style.opacity = sep < 0.05 ? "1" : "0";

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [motion]);

  return (
    <div className="rc-omark" ref={root}>
      <svg viewBox="0 0 605 740" role="img" aria-label="Anna Bartlett">
        <g ref={aRef}>
          <path fillRule="evenodd" clipRule="evenodd" d={A_PATH} fill="#2F3AB5" />
        </g>
        <g ref={bRef} style={{ mixBlendMode: "multiply" }}>
          <path fillRule="evenodd" clipRule="evenodd" d={B_PATH} fill="#D43F7D" />
        </g>
      </svg>
      <span className="rc-omark-tag" ref={tagRef} aria-hidden>
        In register
      </span>
    </div>
  );
}
