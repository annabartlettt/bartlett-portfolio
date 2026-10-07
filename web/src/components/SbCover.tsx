import { SB } from "@/content/storybridge-tokens";
import { FEATURED, LIBRARY } from "@/content/storybridge-stories";

/**
 * The case-study cover, built from the same components and stories as every
 * other StoryBridge screen on the page, so it stays sharp and never drifts
 * from them. It replaces an exported image that carried older placeholder
 * stories.
 */
export default function SbCover() {
  const mono = "mono tracking-widest uppercase";
  return (
    <div
      className="mt-12 overflow-hidden rounded-2xl border shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]"
      style={{ borderColor: SB.line, background: SB.paper, color: SB.ink }}
      aria-label="The StoryBridge reader home: a featured story and six stories to browse"
      role="img"
    >
      <div
        className="flex items-center justify-between border-b px-5 py-3 sm:px-7"
        style={{ borderColor: SB.line, background: "#fff" }}
      >
        <span className="sb-display text-[17px] sm:text-xl">Storybridge</span>
        <nav className={`${mono} hidden gap-2 text-[11px] sm:flex`}>
          <span className="px-3 py-1.5" style={{ color: SB.muted }}>Author</span>
          <span className="rounded-md px-3 py-1.5" style={{ background: SB.accent, color: SB.paper }}>
            Reader
          </span>
          <span className="px-3 py-1.5" style={{ color: SB.muted }}>Admin</span>
        </nav>
        <span className={`${mono} text-[11px]`} style={{ color: SB.muted }}>Anna B.</span>
      </div>

      <div className="px-5 py-6 sm:px-7 sm:py-8">
        <div className="rounded-xl px-5 py-5 sm:px-7" style={{ background: SB.accent, color: SB.paper }}>
          <p className="sb-display text-xl italic sm:text-2xl">{FEATURED.title}</p>
          <p className={`${mono} mt-1.5 text-[10px] sm:text-[11px]`}>
            {FEATURED.byline.join(" · ")}
          </p>
        </div>

        <div className="mt-7 flex items-baseline justify-between">
          <p className="sb-display text-2xl sm:text-3xl">Browse Stories</p>
          <span className={`${mono} text-[10px]`} style={{ color: SB.muted }}>View all →</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {LIBRARY.map((s) => (
            <div
              key={s.title}
              className="overflow-hidden rounded-lg border"
              style={{ borderColor: SB.line, background: SB.paper }}
            >
              <div className="h-12 sm:h-16" style={{ background: s.c }} />
              <div className="px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="sb-display truncate text-[13px] sm:text-[15px]">{s.title}</p>
                <p className={`${mono} mt-1 text-[9px] sm:text-[10px]`} style={{ color: SB.muted }}>
                  {s.grade} · {s.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
