"use client";

import { useEffect } from "react";

/**
 * Scroll behaviour for the Boston Symphony case study.
 *
 * Two things happen as you read down the page. The page colour drifts toward a
 * soft tint of whichever night's poster the section belongs to (any element
 * with `data-scene`), and headings, copy and panels rise into place as they
 * arrive (any element with `data-reveal`).
 *
 * The hidden-until-seen state only switches on once this has mounted, so with
 * JavaScript off the page reads normally. Reduced-motion users get the colour
 * changes without the movement (see globals.css).
 */
export default function BsoScrollFx() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("bso-fx");

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            reveal.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => reveal.observe(el));

    // A thin band across the middle of the screen decides the scene, so the
    // colour changes when a section is actually being read, not when its edge
    // first peeks in.
    const scene = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const bg = (e.target as HTMLElement).dataset.scene;
          if (bg) root.style.setProperty("--bso-scene", bg);
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    document.querySelectorAll("[data-scene]").forEach((el) => scene.observe(el));

    return () => {
      reveal.disconnect();
      scene.disconnect();
      root.classList.remove("bso-fx");
      root.style.removeProperty("--bso-scene");
    };
  }, []);

  return null;
}
