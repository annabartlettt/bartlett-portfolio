"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  {
    href: "/",
    label: "Work",
    // the folder this whole site is built out of
    path: "M4 8.5 Q4 5 7.5 5 H11 Q13 5 14 6.5 L15.5 8.5 H18.5 Q21 8.5 21 11 V17 Q21 19.5 18.5 19.5 H5.5 Q3 19.5 3 17 V8.5 Z",
  },
  {
    href: "/thinking",
    label: "Thinking",
    path: "M6 3.5 H15 L19 7.5 V20.5 H6 Z M8.5 10 H16 M8.5 13 H16 M8.5 16 H13.5",
    stroke: true,
  },
  {
    href: "/about",
    label: "About",
    path: "M12 12 a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2 Z M4.8 20.2 a7.2 7.2 0 0 1 14.4 0",
    stroke: true,
  },
  {
    href: "/contact",
    label: "Contact",
    path: "M3.5 6.5 H20.5 V17.5 H3.5 Z M3.5 6.5 L12 13.5 L20.5 6.5",
    stroke: true,
  },
];

/**
 * A dock. Fixed to the bottom of the screen, because on a desktop that is
 * where the way out of whatever you are looking at lives.
 *
 * Icons alone would ask a reviewer to decode a menu, so the label of whatever
 * you are hovering rides above the dock, and the page you are on keeps its
 * name visible without being hovered at all.
 */
export default function Dock() {
  const path = usePathname();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4"
    >
      <ul
        className="flex list-none items-center gap-1.5 rounded-full border p-1.5 shadow-[0_8px_28px_-14px_rgba(44,42,39,.7)] backdrop-blur"
        style={{
          borderColor: "var(--kraft)",
          background: "color-mix(in srgb, var(--paper) 88%, transparent)",
        }}
      >
        {ITEMS.map((it) => {
          const current =
            it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <li key={it.href} className="group relative">
              <Link
                href={it.href}
                aria-label={it.label}
                aria-current={current ? "page" : undefined}
                className="flex h-11 w-11 items-center justify-center rounded-full border transition"
                style={
                  current
                    ? {
                        background: "var(--charcoal)",
                        borderColor: "var(--charcoal)",
                        color: "var(--cream)",
                      }
                    : { borderColor: "transparent", color: "var(--charcoal)" }
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[19px] w-[19px]"
                  fill={it.stroke ? "none" : "currentColor"}
                  stroke={it.stroke ? "currentColor" : "none"}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d={it.path} />
                </svg>
              </Link>

              {/* the name, on hover or when you are on it */}
              <span
                className={`mono pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] tracking-widest whitespace-nowrap uppercase transition-opacity ${
                  current ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: "var(--charcoal)", color: "var(--cream)" }}
              >
                {it.label}
              </span>

              {current && (
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                  style={{ background: "var(--pink)" }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
