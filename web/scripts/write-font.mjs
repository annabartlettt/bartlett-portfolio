/**
 * Writes the licensed Cinke Sans woff2 to disk before `next build` runs.
 *
 * The font is a paid typeface from cinketype. The licence covers using it on
 * the web, but not handing out copies, and this repo is public — so the file
 * is never committed. Vercel keeps it as a base64 environment variable
 * (CINKE_SANS_B64) and this script unpacks it at build time.
 *
 * Locally there is nothing to do: the real file already sits in src/fonts/,
 * untracked and gitignored.
 *
 * Runs automatically via the `prebuild` script in package.json.
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, "../src/fonts/CinkeSans-ExtraBold.woff2");
const b64 = process.env.CINKE_SANS_B64;

if (b64) {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, Buffer.from(b64, "base64"));
  console.log("[fonts] Cinke Sans written from CINKE_SANS_B64");
} else if (existsSync(target)) {
  console.log("[fonts] Cinke Sans already on disk, leaving it alone");
} else {
  console.error(
    [
      "",
      "[fonts] Cinke Sans is missing and CINKE_SANS_B64 is not set.",
      "",
      "  next/font/local reads this file at build time, so the build is",
      "  about to fail with a confusing module-not-found error instead.",
      "",
      "  On Vercel: add CINKE_SANS_B64 in Project Settings > Environment",
      "  Variables. Regenerate it with:",
      "    base64 -i web/src/fonts/CinkeSans-ExtraBold.woff2 | pbcopy",
      "",
      "  Locally: put the licensed woff2 at web/src/fonts/.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}
