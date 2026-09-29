import Link from "next/link";
import type { ReactNode } from "react";

/**
 * The calm split layout the homepage uses, for every other top-level page:
 * a quiet sticky column on the left (mark, page name, one line of context,
 * the email) and the page's content filling the right from the top.
 */
export default function SplitPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <main className="rc-split">
      <aside className="rc-side">
        <Link href="/" className="rc-side-mark" aria-label="Home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/mark/overprint.svg" alt="" width={62} height={76} />
        </Link>
        <p className="rc-side-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lede && <p className="rc-side-lede">{lede}</p>}
        <a className="rc-side-link" href="mailto:anna.bartlettt@gmail.com">
          Say hello →
        </a>
      </aside>
      <div className="rc-split-main">{children}</div>
    </main>
  );
}
