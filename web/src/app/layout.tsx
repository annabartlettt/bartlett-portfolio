import type { Metadata } from "next";
import {
  Inter,
  Space_Mono,
  Archivo_Black,
  Spectral,
  Caveat,
} from "next/font/google";
import Link from "next/link";
import Nav from "@/components/Nav";
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
      className={`${inter.variable} ${mono.variable} ${display.variable} ${spectral.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b-2 border-[var(--charcoal)] bg-[var(--cream)]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="mono text-[11px] tracking-widest opacity-80"
            >
              ANNA BARTLETT · RESEARCH CABINET
            </Link>
            <Nav />
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="mt-24 border-t-2 border-[var(--charcoal)] bg-[var(--ink)] px-6 py-12 text-[var(--cream)]">
          <div className="mx-auto max-w-6xl">
            <p className="serif text-2xl italic">
              What do you already know? What do you need next?
            </p>
            <p className="mono mt-3 text-[11px] tracking-widest opacity-70">
              ANNA BARTLETT · {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
