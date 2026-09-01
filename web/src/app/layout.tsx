import type { Metadata } from "next";
import {
  Inter,
  Space_Mono,
  Archivo_Black,
  Spectral,
  Caveat,
  Playfair_Display,
} from "next/font/google";
import Link from "next/link";
import Dock from "@/components/Dock";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});
const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});
// StoryBridge's own display face, so the built product screens are set in the
// typeface the product actually uses rather than the site's.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-hand",
});

const SITE_URL = "https://bartlettanna.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Anna Bartlett — Research Cabinet",
    template: "%s · Anna Bartlett",
  },
  description:
    "I investigate complex human systems and turn them into experiences people can understand, question, and act on — a research cabinet of design work.",
  keywords: [
    "Anna Bartlett",
    "design portfolio",
    "UX research",
    "computational design",
    "design systems",
    "AI in education",
  ],
  authors: [{ name: "Anna Bartlett" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anna Bartlett — Research Cabinet",
    description: "What do you already know? What do you need next? The two questions behind every folder.",
    url: SITE_URL,
    siteName: "Anna Bartlett",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anna Bartlett — Research Cabinet",
    description: "What do you already know? What do you need next? The two questions behind every folder.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${display.variable} ${spectral.variable} ${playfair.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b-2 border-[var(--charcoal)] bg-[var(--cream)]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link
              href="/"
              className="mono text-[11px] tracking-widest opacity-80"
            >
              ANNA BARTLETT · RESEARCH CABINET
            </Link>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        {/* The bar along the bottom of the screen, on every page. */}
        <footer
          className="mt-24 border-t-2 pb-16"
          style={{
            borderColor: "var(--charcoal)",
            background: "var(--cream2)",
          }}
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-2.5 sm:px-10">
            <Link href="/" className="display text-sm tracking-[0.22em] uppercase">
              Anna Bartlett
            </Link>
            <span className="mono text-[10px] tracking-widest opacity-55">
              WASHINGTON DC · {new Date().getFullYear()}
            </span>
          </div>
        </footer>

        <Dock />
      </body>
    </html>
  );
}
