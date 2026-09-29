"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/image";
import type { Project } from "@/sanity/types";

/**
 * The cabinet, laid out as a cabinet.
 *
 * Same thesis and the same two questions as before — the change is the flow.
 * A visitor now moves through drawers: the index states who she is and hands
 * them the search, the work drawer opens folders one at a time, the thinking
 * drawer is the shorter index behind them, and the closing drawer is the ask.
 *
 * The discipline tabs used to be a chip row floating above a grid. They are
 * the hero's folder tabs now, so choosing one both answers "what do you need
 * next?" and files the drawer below to match.
 *
 * Layout and feel follow the V2 Research Cabinet design study; the words are
 * the site's own.
 */

export const DISCIPLINES = [
  // Research leads the row because it is the largest craft here (7 of 9) and
  // the through-line the rest hang off. Moss, so it does not collide with the
  // UX teal or the computational indigo.
  { value: "research", title: "Research", short: "Research", accent: "#5B7553" },
  { value: "ux", title: "User Experience", short: "UX", accent: "#2F6D74" },
  { value: "computational", title: "Computational Design", short: "Computational", accent: "#363f9e" },
  { value: "marcomm", title: "Marketing & Comms", short: "Marketing", accent: "#B5502F" },
  { value: "motion", title: "Motion & Video", short: "Motion", accent: "#6B4E8E" },
];

/* The other half of the overprint. Disciplines say how a project was made;
   domains say what it was made about. Deliberately NOT a filter — a hiring
   manager arrives looking for a craft, not a worldview — so these ride along
   as a chip on the card instead. Inks are Risograph, per brand book 33. */
export const DOMAINS = [
  // `ink` is the true Riso value and is what marks and fills use. `text` is the
  // same hue walked down until 9.5px of it clears AA on paper — Riso yellow and
  // fluorescent green are far too light to set type in.
  { value: "health", title: "Health", ink: "#3D8E84", text: "#2A6259" },
  { value: "learning", title: "Learning", ink: "#FFB511", text: "#8A5E00" },
  { value: "civic", title: "Civic", ink: "#FF6E40", text: "#B03A12" },
  { value: "culture", title: "Culture", ink: "#A4DC30", text: "#4F6B12" },
];

export function domainOf(p: Project) {
  const first = (p.domains ?? [])[0];
  return DOMAINS.find((d) => d.value === first) ?? null;
}

export type MotionLevel = "full" | "gentle" | "off";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/** Reads the OS motion preference without a render-then-correct flash. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

/**
 * Drawers opening on scroll. Off entirely at `off`, so the whole page is just
 * there — which is also what a visitor gets if this never runs.
 */
function useDrawersOpening(
  root: React.RefObject<HTMLDivElement | null>,
  level: MotionLevel,
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(
      el.querySelectorAll<HTMLElement>("[data-rc-reveal]"),
    );
    if (targets.length === 0) return;

    if (level === "off") {
      el.classList.remove("rc-anim");
      targets.forEach((t) => {
        delete (t as HTMLElement).dataset.rcIn;
        t.style.transitionDelay = "";
      });
      return;
    }

    el.classList.add("rc-anim");
    targets.forEach((t) => delete (t as HTMLElement).dataset.rcIn);

    const io = new IntersectionObserver(
      (rows) => {
        rows.forEach((r, i) => {
          if (!r.isIntersecting) return;
          (r.target as HTMLElement).style.transitionDelay =
            `${Math.min(i, 5) * 70}ms`;
          (r.target as HTMLElement).dataset.rcIn = "";
          io.unobserve(r.target);
        });
      },
      { rootMargin: "0px 0px -11% 0px", threshold: 0.08 },
    );

    // Reveal state is a data attribute, not a class, and that is the whole
    // fix. These cards are React-rendered with className="rc-gcard", so every
    // re-render rewrote className and wiped a class added out here — meaning
    // one click on a sort button blanked all nine folders permanently. React
    // never sets data-rc-in, so it leaves it alone.
    //
    // The MutationObserver below covers the other half: genuinely new nodes
    // (a filter widening the deck) that the initial pass never saw.
    const seen = new WeakSet<Element>();
    const watch = (node: Element) => {
      if (seen.has(node)) return;
      seen.add(node);
      io.observe(node);
    };
    targets.forEach(watch);

    // Anything replaced while the drawer is already on screen is revealed on
    // the spot rather than handed to the observer. The observer is the right
    // tool for a first scroll down the page and the wrong one here: it is
    // asynchronous, and browsers stop servicing it in a background tab, so a
    // re-sort could leave the gallery blank until something else woke it.
    const reveal = (node: Element) => {
      const r = node.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        (node as HTMLElement).dataset.rcIn = "";
        return true;
      }
      return false;
    };
    const take = (node: Element) => {
      if (seen.has(node)) return;
      if (reveal(node)) {
        seen.add(node);
        return;
      }
      watch(node);
    };

    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-rc-reveal]")) take(n);
          n.querySelectorAll?.("[data-rc-reveal]").forEach(take);
        });
      }
    });
    mo.observe(el, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [root, level]);
}

/**
 * Faint parallax: depth into the cabinet. Only at `full`.
 *
 * Each element reports its distance from the centre of the viewport as -1..1
 * and gets that fraction of its own amplitude, written to --rc-drift so the
 * hover transforms keep working on top of it.
 */
const DRIFT: { sel: string; amp: number; box: "self" | "parent" }[] = [
  { sel: ".rc-par", amp: -30, box: "parent" },
  { sel: ".rc-edge", amp: -9, box: "self" },
  { sel: ".rc-pf .ptab", amp: -7, box: "parent" },
];

function useDrift(
  root: React.RefObject<HTMLDivElement | null>,
  level: MotionLevel,
) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const nodes = DRIFT.flatMap(({ sel, amp, box }) =>
      Array.from(el.querySelectorAll<HTMLElement>(sel)).map((node) => ({
        node,
        amp,
        box: box === "self" ? node : (node.parentElement ?? node),
      })),
    );
    if (nodes.length === 0) return;

    if (level !== "full") {
      nodes.forEach(({ node }) => node.style.removeProperty("--rc-drift"));
      return;
    }

    let raf = 0;
    const loop = () => {
      const vh = window.innerHeight;
      for (const { node, amp, box } of nodes) {
        const r = box.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const t = (r.top + r.height / 2 - vh / 2) / (vh / 2);
        node.style.setProperty("--rc-drift", `${(t * amp).toFixed(2)}px`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      nodes.forEach(({ node }) => node.style.removeProperty("--rc-drift"));
    };
  }, [root, level]);
}


export default function CabinetHome({ projects }: { projects: Project[] }) {
  // Motion follows the visitor's own OS setting. The on-page Full / Gentle /
  // Off control was one more thing to read on a page that should be calm.
  const prefersReduced = usePrefersReducedMotion();
  const motion: MotionLevel = prefersReduced ? "off" : "full";
  const rootRef = useRef<HTMLDivElement>(null);

  useDrawersOpening(rootRef, motion);
  useDrift(rootRef, motion);

  // One list, in folder order.
  const ordered = useMemo(
    () =>
      [...projects].sort((a, b) =>
        (a.folderNumber ?? "").localeCompare(b.folderNumber ?? ""),
      ),
    [projects],
  );

  return (
    <div ref={rootRef}>
      {/* Split layout, after Naseem Mohideen's work page: a quiet column on
          the left that says who she is, and the work filling the right side
          from the top of the screen. On a phone the column sits above the
          grid. */}
      <div className="rc-split">
        <aside className="rc-side" id="top">
          <Link href="/about" className="rc-side-mark" aria-label="About Anna Bartlett">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mark/overprint.svg" alt="" width={62} height={76} />
          </Link>

          <h1 data-rc-reveal>
            Anna Bartlett is a creative technologist in Washington DC working
            across{" "}
            <span>research, brand, product, and generative systems.</span>
          </h1>

          {/* What she is doing right now, one line, where a hiring reader
              actually looks. Keep it current: it goes stale faster than
              anything else on the site. */}
          <p className="rc-now" data-rc-reveal>
            <b>Currently</b>{" "}
            Prototyping with FirstGlance · open to design roles in Washington DC
          </p>

          <a className="rc-side-link" href="mailto:anna.bartlettt@gmail.com" data-rc-reveal>
            Say hello →
          </a>
        </aside>

        <section className="rc-split-work" id="work" aria-label="Selected work">
          {ordered.map((p) => (
            <Link
              key={p._id}
              href={`/work/${p.slug}`}
              className="rc-gcard"
              data-rc-reveal
            >
              <div className="rc-gshot">
                {p.slideImage?.asset ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={urlFor(p.slideImage).width(1100).auto("format").url()}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="lab">No cover yet</span>
                )}
              </div>
              <h4>{p.title}</h4>
              {p.invisibleSystem && <p className="sys">{p.invisibleSystem}</p>}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
