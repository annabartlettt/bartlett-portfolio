"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/bso/index.html";

/**
 * Embeds the p5.js sketch that generated the BSO season backgrounds.
 * The sketch reports its own content height, so the frame follows it
 * instead of scrolling internally when the panel stacks on mobile.
 */
export default function BsoSketch({ accent = "#5D2242" }: { accent?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(920);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== frameRef.current?.contentWindow) return;
      const data = e.data as { type?: string; height?: number };
      if (data?.type === "bso-sketch-height" && typeof data.height === "number") {
        setHeight(Math.min(2400, Math.max(480, Math.ceil(data.height))));
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section className="mx-auto max-w-4xl border-b border-[var(--kraft)] px-6 py-16">
      <p
        className="mono text-[12px] font-bold tracking-widest"
        style={{ color: accent }}
      >
        INTERLUDE · THE SKETCH ITSELF
      </p>
      <h2 className="display mt-3 text-3xl">Turn the dials.</h2>
      <p className="serif mt-4 text-lg leading-relaxed opacity-90">
        This is the sketch, running — the same grid of open nested squares, the same
        noise field, the same parameter names that generated the season backgrounds.
        Four of the saved states come straight out of the file. Everything past that
        is you.
      </p>

      <div
        className="mt-8 overflow-hidden rounded-xl border"
        style={{ borderColor: accent }}
      >
        <iframe
          ref={frameRef}
          src={SRC}
          title="Interactive p5.js sketch — the Boston Symphony Orchestra season generator"
          loading="lazy"
          className="block w-full"
          style={{ height, border: 0 }}
        />
      </div>

      <p className="mono mt-3 text-[11px] tracking-wide opacity-60">
        Drag a slider and the whole field re-composes ·{" "}
        <a href={SRC} target="_blank" rel="noopener" className="underline">
          open full screen ↗
        </a>
      </p>
    </section>
  );
}
