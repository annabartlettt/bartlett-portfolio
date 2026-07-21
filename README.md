# Anna Bartlett — Research Cabinet

Portfolio site for bartlettanna.com. Monorepo:

```
bartlett-portfolio/
├── web/      Next.js 16 frontend (App Router, Tailwind, next-sanity)
└── studio/   Sanity Studio (content editing UI)
```

**Sanity project:** `rhkuh6nb` · dataset `production`

## Run it

```bash
# frontend  → http://localhost:3000
cd web && npm run dev

# studio    → http://localhost:3333  (first time: npx sanity login)
cd studio && npm install && npm run dev
```

## Content model (Sanity)

- **project** — the folders: title, folderNumber, category, invisibleSystem,
  madeTangible, methods, themeTags, brand colors, meta, cover, sections[], notes.
- **section** — a case-study rhythm: number, kicker, title, body, rhythm,
  accent, image, stats[], drawer.
- **category** — the invisible-system filter tabs.
- **method** — reusable methods.

The schema is currently **MCP-managed** (deployed via the Sanity MCP). To make
the Studio the source of truth, edit `studio/schemaTypes/*` and run
`cd studio && npx sanity login && npx sanity schema deploy`.

## Deploy (later)

- Web → Vercel (root dir `web`), add the same env vars, point bartlettanna.com.
- Studio → `cd studio && npx sanity deploy` (hosted at *.sanity.studio) or Vercel.
