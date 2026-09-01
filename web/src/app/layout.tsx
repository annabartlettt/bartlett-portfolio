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
        <div className="flex-1">{children}</div>

        {/* The bottom of the cabinet, on every page. Indigo, so on the home
            page it reads as one band with the closing drawer above it. */}
        <footer className="rc-sitefoot">
          <div className="rc-sitefoot-inner">
            <nav aria-label="Footer">
              <Link href="/">Work</Link>
              <Link href="/thinking">Thinking</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </nav>
            <span>
              © {new Date().getFullYear()} Anna Bartlett · Research Cabinet ·
              Washington DC
            </span>
          </div>
        </footer>

        <Dock />
      </body>
    </html>
  );
}
