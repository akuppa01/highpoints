# Summit — US State Highpoints Tracker

A premium personal tracker for **state highpointing** across the United States. Track every summit, relive every climb, and showcase your progress across all 50 states.

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
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Without Supabase**: The app works fully with static seed data out of the box. Supabase is only required to persist user climbs and enable auth.

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

### Apply the schema

In the Supabase dashboard → **SQL Editor**, run:

```sql
-- Paste contents of supabase/schema.sql
```

### Seed the database

```sql
-- Paste contents of supabase/seed.sql
```

This inserts all 50 state highpoints with full metadata.

### Storage buckets

In the Supabase dashboard → **Storage**, create two public buckets:
- `climb-photos` — for user-uploaded climb photos
- `avatars` — for user profile avatars

---

## Project Structure

```
highpoints/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing page
│   ├── peaks/
│   │   ├── page.tsx            # All 50 peaks grid with filters
│   │   └── [slug]/page.tsx     # Individual peak detail page
│   └── map/
│       └── page.tsx            # Interactive US map
├── components/
│   ├── layout/                 # Nav, Footer
│   ├── home/                   # Hero, ProgressOverview, FeaturedPeaks, MapPreview, StateGrid
│   ├── map/                    # USMap (react-simple-maps)
│   └── peaks/                  # PeakCard
├── lib/
│   ├── data/
│   │   └── peaks-data.ts       # All 50 peaks + 7 sample climbs (static seed)
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   └── server.ts           # Server Supabase client (RSC-compatible)
│   └── utils.ts                # Formatting, class merging, helpers
├── types/
│   └── index.ts                # TypeScript types for Peak, Climb, etc.
└── supabase/
    ├── schema.sql              # Full database schema with RLS policies
    └── seed.sql                # All 50 highpoints seed data
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, progress stats, map preview, featured peaks |
| `/peaks` | Grid of all 50 state highpoints, filterable by status and region |
| `/peaks/[slug]` | Full editorial peak detail with stats, photos, notes, links |
| `/map` | Interactive US map with progress sidebar |

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
```

Or connect your GitHub repo directly to Vercel for automatic deploys.

---

## Roadmap

The codebase is designed to evolve into a full social platform:

### v0.2 — Auth & User Accounts
- [ ] Supabase Auth (email + OAuth)
- [ ] User profiles (`/u/[username]`)
- [ ] Personalized climb tracking

### v0.3 — Social Layer
- [ ] Public profiles
- [ ] Leaderboard (most peaks, highest elevation, etc.)
- [ ] Follow / activity feed

### v0.4 — Rich Content
- [ ] User photo uploads to Supabase Storage
- [ ] Journal entries with rich text
- [ ] Route GPX file uploads + map overlay

### v0.5 — Shareability
- [ ] Spotify Wrapped-style share cards (`/share/[username]`)
- [ ] OG image generation (`/api/og`)
- [ ] Embeddable progress widget

### v0.6 — Map Upgrade
- [ ] Upgrade to Mapbox GL JS for 3D terrain
- [ ] Summit markers with elevation labels
- [ ] Route traces on map

### v0.7 — Admin
- [ ] Protected admin panel at `/admin`
- [ ] Add/edit climbs via UI (currently done via Supabase dashboard or seed data)

---

## Design Decisions

- **Static-first**: The app works without any backend by using hardcoded seed data. Supabase is additive.
- **Dark mode only**: The design is built around a dark palette — charcoal backgrounds, earthy green accent, warm off-white text.
- **Typography**: Playfair Display for editorial headings (cinematic feel), Inter for body, Geist Mono for data/stats.
- **Map library**: `react-simple-maps` chosen over Mapbox for zero API key requirement in MVP. Upgrading to Mapbox for 3D terrain is documented in the roadmap.
- **No CMS**: Content lives in `lib/data/peaks-data.ts` for now. Easily migrated to Supabase or a headless CMS later.

---

## Local Commands

```bash
npm run dev        # Start dev server with Turbopack
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint
```
