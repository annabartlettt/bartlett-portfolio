import type { Metadata } from "next";
import {
  Inter,
  Space_Mono,
  Spectral,
  Caveat,
  Playfair_Display,
} from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
import Dock from "@/components/Dock";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});
// The real brand face, licensed from cinketype and self-hosted. Declared at
// weight 400 because ExtraBold is the only cut we hold, and every rule that
// reaches for --font-display already asks for 400 (Archivo Black, the stand-in
// this replaces, was also a single 400-weight family). Archivo Black stays in
// the fallback stack so a failed load lands on the face the Figma files use.
const display = localFont({
  src: "../fonts/CinkeSans-ExtraBold.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["Archivo Black", "Helvetica Neue", "sans-serif"],
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
    default: "Anna Bartlett · Research Cabinet",
    template: "%s · Anna Bartlett",
  },
  description:
    "Anna Bartlett is a UX and learning designer in Washington DC who talks to people until the problem is clear, then designs learning experiences that give them their time back.",
  keywords: [
    "Anna Bartlett",
    "learning experience design",
    "design portfolio",
    "UX research",
    "computational design",
    "design systems",
    "AI in education",
  ],
  authors: [{ name: "Anna Bartlett" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Anna Bartlett · Research Cabinet",
    description: "Anna Bartlett is a designer in Washington DC who talks to people until the problem is clear, then designs learning experiences that give them their time back.",
    url: SITE_URL,
    siteName: "Anna Bartlett",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 627, alt: "Anna Bartlett: I design learning experiences that give people their time back. bartlettanna.com" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: "Anna Bartlett · Research Cabinet",
    description: "Anna Bartlett is a designer in Washington DC who talks to people until the problem is clear, then designs learning experiences that give them their time back.",
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
              <Link href="/printed-matter">Printed Matter</Link>
              <Link href="/about">About</Link>
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
