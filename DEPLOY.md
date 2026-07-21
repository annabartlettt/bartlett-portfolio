# Deploying bartlettanna.com

Stack: Next.js 16 (App Router) in `web/` · Sanity CMS (project `rhkuh6nb`, dataset `production`) · Vercel.
The public site fetches from Sanity server-side; content is edited in the Sanity Studio (`studio/`).

## 1. Push to GitHub

```bash
cd ~/bartlett-portfolio
git remote add origin https://github.com/<you>/bartlett-portfolio.git
git push -u origin main
```

## 2. Vercel project

New Project → import the repo. **Set Root Directory to `web`.**
Add Environment Variables (Production + Preview):

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `rhkuh6nb` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-05-15` |
| `SANITY_API_READ_TOKEN` | *(copy from `web/.env.local` — never commit this)* |

Deploy → you get a `*.vercel.app` URL.

## 3. Custom domain

Vercel → Settings → Domains → add `bartlettanna.com` and `www.bartlettanna.com`.
At your registrar, set the records Vercel shows (typically):

- `A  @  76.76.21.21`
- `CNAME  www  cname.vercel-dns.com`

Old `/projects/*` links 301-redirect to the new `/work/*` pages automatically (see `web/next.config.ts`).

## 4. Sanity Studio (to edit content)

```bash
cd studio
npx sanity login       # first time
npx sanity deploy      # publishes an editable Studio at <name>.sanity.studio
```

Then in Sanity Manage → API → CORS Origins, add the Studio origin (and `http://localhost:3333` for local editing).
The schema is currently MCP-managed and mirrored in `studio/schemaTypes/*`; to make the Studio source authoritative run `npx sanity schema deploy`.

## Local dev

```bash
cd web && npm run dev       # site at :3000
cd studio && npm run dev    # studio at :3333
```
