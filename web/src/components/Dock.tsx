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
 * The nav, as tabs along the bottom edge of the cabinet.
 *
 * It used to be a dark floating pill with icons only, which read as a phone
 * dock sitting on top of a paper site. It is the same shape as the drawer
 * tabs now — kraft borders, card ground, mono labels always visible — so it
 * belongs to the cabinet instead of hovering over it. The page you are on is
 * the one tab pulled open, marked in pink like every other current state.
 */
export default function Dock() {
  const path = usePathname();

  return (
    <nav aria-label="Main" className="dock">
      <ul className="dock-tabs">
        {ITEMS.map((it) => {
          const current =
            it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={current ? "page" : undefined}
                data-current={current || undefined}
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  fill={it.stroke ? "none" : "currentColor"}
                  stroke={it.stroke ? "currentColor" : "none"}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={it.path} />
                </svg>
                <span>{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
