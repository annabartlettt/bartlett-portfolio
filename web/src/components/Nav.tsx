"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Work", href: "/" },
  { label: "Thinking", href: "/thinking" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Hover turns blue, the page you are on turns pink.
 *
 * Lifted from the mobile nav in her June concept, where the current item was
 * the only pink thing on the screen. The colour carries it; the wording that
 * sat beside it there was noise in a horizontal header.
 */
export default function Nav() {
  const path = usePathname();

  return (
    <nav className="flex items-baseline gap-5">
      {LINKS.map((n) => {
        const current =
          n.href === "/" ? path === "/" : path.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            data-current={current}
            aria-current={current ? "page" : undefined}
            className="nav-link mono text-[11px] uppercase tracking-widest opacity-70"
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
