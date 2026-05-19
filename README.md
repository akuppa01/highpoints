# Summit — Peaks, Hikes, and Highpoints Tracker

A premium personal climbing journal built on top of the original **US state highpoints** experience. Track every summit, relive every climb, keep a flexible planning board, and publish a polished public profile.

Built to feel like a product, not a side project.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) — App Router, TypeScript |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) — dark-first design system |
| Database | [Supabase](https://supabase.com) — PostgreSQL + Auth + Storage |
| Map | [react-simple-maps](https://www.react-simple-maps.io) — SVG US map via US Atlas TopoJSON |
| Animation | [Framer Motion](https://www.framer.com/motion) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Playfair Display (display) · Inter (body) · Geist Mono (stats) |
| Deployment | [Vercel](https://vercel.com) |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo>
cd highpoints
npm install
```

### 2. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in your Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-jwt
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_PROJECT_REF=YOUR_PROJECT_REF
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_REF:YOUR_PASSWORD@aws-0-YOUR-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_REF.supabase.co:5432/postgres
```

Notes:
- The app still uses `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` for auth, storage, and personal records.
- `DATABASE_URL` is the pooled runtime connection and must use Supavisor username format `postgres.[PROJECT_REF]`.
- `DIRECT_URL` is reserved for migrations, schema pushes, and direct admin access.
- Without Supabase, the public highpoints browsing experience still works with static seed data. Auth, dashboard records, publishing, and uploads require Supabase.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

### Create a project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon key** into `.env.local`
3. Copy your pooled and direct Postgres strings from **Project Settings → Database**

### Postgres connection rules

- App runtime and health checks should use the pooled URL in `DATABASE_URL`
- Migrations and schema pushes should use the direct URL in `DIRECT_URL`
- Supavisor pooled usernames must use:
  - `postgres.[PROJECT_REF]`
- Direct Postgres usernames remain:
  - `postgres`

Example pooled runtime URL:

```env
DATABASE_URL=postgresql://postgres.eeaezeuwtiqztussuxgo:YOUR_PASSWORD@aws-1-us-west-2.pooler.supabase.com:6543/postgres?pgbouncer=true
```

Example direct migration URL:

```env
DIRECT_URL=postgresql://postgres:YOUR_PASSWORD@db.eeaezeuwtiqztussuxgo.supabase.co:5432/postgres
```

### Apply the schema

In the Supabase dashboard → **SQL Editor**, run:

```sql
-- Paste contents of supabase/schema.sql
```

### Seed the database

```sql
-- Paste contents of supabase/seed.sql
```

This inserts all 50 state highpoints with full metadata. The app keeps those as canonical public peak pages while allowing each signed-in user to create their own personal climb records on top.

### Storage buckets

In the Supabase dashboard → Storage, create two public buckets:
- `climb-photos` — user-uploaded climb photos
- `avatars` — user profile avatars

For auth:
- Enable Email OTP / Magic Link
- Enable Google provider
- Add `${NEXT_PUBLIC_SITE_URL}/auth/callback` as an allowed redirect URL

### Health checks

- API route: `/api/health/db`
- CLI command:

```bash
npm run db:health
```

The health check uses `DATABASE_URL`, reports masked config details, and classifies failures as auth, network, pooler, or unknown.

---

## Project Structure

```
highpoints/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page
│   ├── login/page.tsx          # Magic link + Google sign-in
│   ├── dashboard/              # Personal board, record editor, publish flow
│   ├── auth/                   # Supabase callback + sign-in routes
│   ├── peaks/
│   │   ├── page.tsx            # All 50 peaks grid with filters
│   │   └── [slug]/page.tsx     # Individual peak detail page
│   ├── u/[username]/           # Public adventure profile
│   │   └── climbs/[slug]/      # Public climb page
│   └── map/
│       └── page.tsx            # Interactive US map
├── components/
│   ├── layout/                 # Nav, Footer
│   ├── home/                   # Hero, ProgressOverview, FeaturedPeaks, MapPreview, StateGrid
│   ├── dashboard/              # Dashboard stats, board/list, editor form
│   └── public/                 # Journey map, share cards, copy-link button
│   ├── map/                    # USMap (react-simple-maps)
│   └── peaks/                  # PeakCard
├── lib/
│   ├── data/
│   │   ├── peaks-data.ts       # All 50 peaks + sample static climbs
│   │   └── records.ts          # Typed auth/profile/record/public data helpers
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── config.ts
│   │   ├── middleware.ts
│   │   └── server.ts
│   └── utils.ts                # Formatting, class merging, helpers
├── types/
│   └── index.ts                # TypeScript types for Peak, Climb, etc.
└── supabase/
    ├── schema.sql              # Profiles, peak records, published copies, RLS
    └── seed.sql                # Canonical 50-highpoints seed data
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, progress stats, map preview, featured peaks |
| `/peaks` | Grid of all 50 state highpoints, filterable by status and region |
| `/peaks/[slug]` | Full editorial peak detail with stats, photos, notes, links |
| `/map` | Interactive US map with progress sidebar |
| `/login` | Magic link + Google sign-in |
| `/dashboard` | Personal climb journal board/list view |
| `/dashboard/new` | Create a canonical or custom peak record |
| `/dashboard/records/[id]` | Edit notes, media, visibility, and publish state |
| `/u/[username]` | Public adventure portfolio |
| `/u/[username]/climbs/[slug]` | Public climb story page |

---

## Seed Data

The app ships with static seed data for all **50 state highpoints** and detailed climb logs for **7 completed peaks**:

| State | Peak | Elevation | Completed |
|-------|------|-----------|-----------|
| Texas | Guadalupe Peak | 8,749 ft | ✓ March 2023 |
| Colorado | Mount Elbert | 14,440 ft | ✓ July 2023 |
| California | Mount Whitney | 14,505 ft | ✓ September 2023 |
| Arizona | Humphreys Peak | 12,633 ft | ✓ May 2023 |
| New Hampshire | Mount Washington | 6,288 ft | ✓ October 2023 |
| New York | Mount Marcy | 5,344 ft | ✓ October 2023 |
| Tennessee | Clingmans Dome | 6,643 ft | ✓ April 2024 |

---

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard or:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add SUPABASE_PROJECT_REF
vercel env add DATABASE_URL
vercel env add DIRECT_URL
```

Or connect your GitHub repo directly to Vercel for automatic deploys.

### Vercel notes

- Set `NEXT_PUBLIC_SITE_URL=https://highpoints.vercel.app` in production
- Use the pooled `DATABASE_URL` in Vercel runtime env vars
- Do not use `DIRECT_URL` in runtime code paths; keep it available for migrations/admin tasks only
- Add `https://highpoints.vercel.app/auth/callback` as a Supabase redirect URL

---

## Implemented Foundation

### Auth + persistence
- Supabase-backed user profiles
- Magic link sign-in
- Google sign-in
- Middleware-based auth session refresh

### Personal climb journal
- User-scoped peak records for canonical or custom peaks
- Board and list dashboard views
- Structured record editor for notes, memories, stats, media, and Strava metadata
- Publish controls with per-section public visibility

### Public sharing
- Public profile pages at `/u/[username]`
- Public climb pages at `/u/[username]/climbs/[slug]`
- Profile stats aggregation
- Responsive share-card components for profile and climb recaps

## Remaining Follow-Up Ideas

- Strava OAuth enrichment using `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET`
- OG image export or downloadable rendered share cards
- Richer album link previews and extraction where APIs allow it safely
- Drag-and-drop board interactions
- Route traces / GPX overlays / terrain map upgrades

---

## Design Decisions

- **Static-first public experience**: The original highpoints content still works without any backend. Supabase is additive for personalization.
- **Dark mode only**: The design is built around a dark palette — charcoal backgrounds, earthy green accent, warm off-white text.
- **Typography**: Playfair Display for editorial headings (cinematic feel), Inter for body, Geist Mono for data/stats.
- **Privacy model**: Personal notes live in private `peak_records`; public pages read from separately published copies so drafts and private fields do not leak.
- **Map library**: `react-simple-maps` still powers the canonical US map. Public profile pages use a lighter custom journey map for generic worldwide peaks.

---

## Local Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
```
