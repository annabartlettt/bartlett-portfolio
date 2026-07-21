# bartlettanna.com — Interaction Map

The click-by-click spec for the Research Cabinet site. This is the **design→code handoff**:
for every clickable thing, what it does and whether it's needed for the first deploy.

## How to read this
- **✅ v1** — needed for a real, usable first launch.
- **⏳ later** — an enhancement; layer in after launch. The site deploys fine without it.
- **🖼 illustration** — a *picture of a product* inside a case study (app mockups, reading-level
  selectors, "READ ALOUD" bars). These are NOT interactive on the portfolio — they're images.
  You never have to make these functional.

Deployment is **incremental**. Everything marked ✅ = the launch. Everything ⏳ ships later
without redeploying the world.

---

## Global — appears on every page

| Element | On click → | v1? |
|---|---|---|
| Logo "Anna Bartlett · Research Cabinet" | Home (`/`) | ✅ |
| Nav: **Work** | Home (`/`) | ✅ |
| Nav: **Thinking** | `/thinking` | ✅ |
| Nav: **About** | `/about` | ✅ |
| Nav: **Contact** | `/contact` | ✅ |
| Hamburger (mobile) | Open/close mobile nav menu | ✅ |
| Footer tagline / email | `mailto:` link | ✅ |

---

## 1. Home / Work — the cabinet (`/`)

| Element | On click → | v1? |
|---|---|---|
| Hero "Open the cabinet ↓" | Smooth-scroll to the folder grid | ✅ |
| Hero "Read the thinking" | `/thinking` | ⏳ |
| **Folder card** (the Cabinet Module) | Opens that project's case study → `/work/[slug]` | ✅ **core** |
| Folder card hover | **CONFIRMED: hover-reveal.** At rest → lavender tab + title only. On hover → lifts + soft shadow, slides ~6px up, body expands to reveal ◆ Invisible System / ◇ Made Tangible / methods / tags. (See states page 12.) On touch/mobile there's no hover, so cards show tab + title + one line and tap opens. | ✅ |
| Category tab (Anxiety, Mobility, Learning, Access, AI Education, Pattern Recognition…) | Filters the grid to folders in that invisible-system; click again / "All" to clear | ⏳ (cheap — can be v1) |
| Hero "Read the thinking" | `/thinking` | ⏳ |

> **Homepage is slim** (as of 2026-07-08): Hero → Research Cabinet → Footer only. The meta sections (How I think, Systems Index, Methods) moved to `/thinking`.

**The Cabinet Module = one design, many projects.** You design the card *once*; the CMS fills it
with each project's data (title, colors, invisible-system, tags). Clicking any instance routes to
its case study. This is already how the live site works.

---

## 2. Case study — a folder opened (`/work/[project]`)

The destination of a cabinet click. Every project (Anoxity, StoryBridge, …) uses the same layout,
filled with its own content + brand colors.

| Element | On click → | v1? |
|---|---|---|
| "← Back to cabinet" | Home (`/`) | ✅ |
| Cover disclosure "Open the folder ↓" | Smooth-scroll to section 01 | ⏳ (nice, not required) |
| **Section drawer** ("Review the research", "Ecosystem analysis", etc.) | Expand / collapse the hidden drawer inline | ✅ **core** (this is the progressive-disclosure idea) |
| Footer CTA ("View full system" / "Visit the prototype") | Internal link or external prototype URL | ✅ |
| "Next · Folder 0X →" | The next project's case study | ⏳ (cheap — can be v1) |
| App mockups (Hi Anna, StoryBridge reader, reading-level toggles, phone screens) | Nothing — they're pictures of the product | 🖼 |
| Stats, notes panel, illustrations | Nothing — display only | 🖼 |

---

## 3. Thinking / About / Contact

| Page | Element | On click → | v1? |
|---|---|---|---|
| Thinking | **Holds 3 modules:** How I think (Observe→Pattern→Form) · Systems Index (10 entries, color-coded to folders, each ↳ links to a project) · Methods toolbox (8 methods) | System entries link to `/work/[slug]`; rest is read | ✅ page exists / ⏳ deep interactions |
| About | **Designed** (Figma page "14 · About — V2 site"): hero + portrait slot · 01 Positioning (spine + 3 domains, chips ↳ link to `/work/[slug]`) · 02 Path · 03 Toolkit · 04 Ethos | Portrait + résumé are drop-in slots | ✅ page exists / ⏳ interactions |
| About | Résumé (PDF) / Say hello | Download PDF · `/contact` | ⏳ |
| Contact | Email | `mailto:` | ✅ |
| Contact | **Contact form** (name/message → sends email) | Submit → server route → email | ⏳ (needs backend; email link covers v1) |

---

## States to design in Figma (your remaining design job)

For each interactive element, the states worth having in the file. If a state isn't designed,
I'll use a sensible default and you approve it on the live site.

- **Folder card:** default · hover (lift) · (optional) focus outline for keyboard/a11y
- **Category tab:** default · active/selected · hover
- **Section drawer:** collapsed · expanded
- **Nav link:** default · active (current page) · hover
- **Mobile:** the whole site at ~390px wide — cabinet stacks to 1 column, nav collapses to a menu
- **404 / empty:** a "folder not found" page (I can design a simple one)

That's it. Hover/active/mobile/collapsed-expanded — not every micro-state.

---

## ✅ v1 launch checklist (the minimum to deploy a real site)

1. Header nav + logo navigate ✅
2. Mobile menu works ✅
3. Folder card → case study ✅
4. Case study "back" → cabinet ✅
5. Section drawers expand/collapse ✅
6. Footer CTAs + email links ✅
7. Responsive (desktop + mobile) ✅
8. Basic hover states ✅

**Everything else is ⏳** — category filter, contact form, systems index, animations, related
projects. Ship the eight above and the site is live, real, and usable. Add the rest anytime.
