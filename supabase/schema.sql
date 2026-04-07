-- ============================================================
-- Summit — US State Highpoints Tracker
-- Supabase Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- users
-- ============================================================
create table if not exists public.users (
  id          uuid primary key default uuid_generate_v4(),
  auth_id     uuid unique references auth.users(id) on delete cascade,
  name        text not null,
  username    text unique not null,
  email       text unique not null,
  avatar_url  text,
  bio         text,
  home_state  text,
  created_at  timestamptz not null default now()
);

-- RLS
alter table public.users enable row level security;

create policy "Users can read own profile"
  on public.users for select
  using (auth.uid() = auth_id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = auth_id);

-- ============================================================
-- peaks
-- ============================================================
create table if not exists public.peaks (
  id               text primary key,       -- e.g. 'tx', 'co'
  slug             text unique not null,   -- e.g. 'guadalupe-peak'
  name             text not null,
  state            text not null,
  state_code       char(2) not null,
  elevation_ft     integer not null,
  prominence_ft    integer,
  latitude         numeric(9,6) not null,
  longitude        numeric(9,6) not null,
  difficulty       text check (difficulty in ('easy','moderate','hard','technical')),
  region           text not null,
  short_description text,
  long_description  text,
  hero_image_url   text,
  featured         boolean not null default false,
  created_at       timestamptz not null default now()
);

-- Peaks are publicly readable
alter table public.peaks enable row level security;

create policy "Peaks are publicly readable"
  on public.peaks for select
  to anon, authenticated
  using (true);

-- ============================================================
-- peak_tags
-- ============================================================
create table if not exists public.peak_tags (
  id       uuid primary key default uuid_generate_v4(),
  peak_id  text not null references public.peaks(id) on delete cascade,
  tag      text not null,
  unique (peak_id, tag)
);

alter table public.peak_tags enable row level security;

create policy "Peak tags are publicly readable"
  on public.peak_tags for select
  to anon, authenticated
  using (true);

-- ============================================================
-- climbs
-- ============================================================
create table if not exists public.climbs (
  id                  uuid primary key default uuid_generate_v4(),
  user_id             uuid not null references public.users(id) on delete cascade,
  peak_id             text not null references public.peaks(id) on delete cascade,
  completed           boolean not null default false,
  completed_date      date,
  distance_miles      numeric(5,2),
  elevation_gain_ft   integer,
  duration_minutes    integer,
  route_name          text,
  route_description   text,
  strava_url          text,
  alltrails_url       text,
  personal_notes      text,
  weather_notes       text,
  gear_notes          text,
  rating              smallint check (rating between 1 and 5),
  created_at          timestamptz not null default now(),
  unique (user_id, peak_id)
);

alter table public.climbs enable row level security;

create policy "Users can read own climbs"
  on public.climbs for select
  using (
    user_id in (
      select id from public.users where auth_id = auth.uid()
    )
  );

create policy "Users can insert own climbs"
  on public.climbs for insert
  with check (
    user_id in (
      select id from public.users where auth_id = auth.uid()
    )
  );

create policy "Users can update own climbs"
  on public.climbs for update
  using (
    user_id in (
      select id from public.users where auth_id = auth.uid()
    )
  );

create policy "Users can delete own climbs"
  on public.climbs for delete
  using (
    user_id in (
      select id from public.users where auth_id = auth.uid()
    )
  );

-- ============================================================
-- climb_photos
-- ============================================================
create table if not exists public.climb_photos (
  id         uuid primary key default uuid_generate_v4(),
  climb_id   uuid not null references public.climbs(id) on delete cascade,
  image_url  text not null,
  caption    text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.climb_photos enable row level security;

create policy "Users can read photos for own climbs"
  on public.climb_photos for select
  using (
    climb_id in (
      select c.id from public.climbs c
      join public.users u on u.id = c.user_id
      where u.auth_id = auth.uid()
    )
  );

create policy "Users can insert photos for own climbs"
  on public.climb_photos for insert
  with check (
    climb_id in (
      select c.id from public.climbs c
      join public.users u on u.id = c.user_id
      where u.auth_id = auth.uid()
    )
  );

create policy "Users can delete photos for own climbs"
  on public.climb_photos for delete
  using (
    climb_id in (
      select c.id from public.climbs c
      join public.users u on u.id = c.user_id
      where u.auth_id = auth.uid()
    )
  );

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_climbs_user_id on public.climbs(user_id);
create index if not exists idx_climbs_peak_id on public.climbs(peak_id);
create index if not exists idx_climbs_completed on public.climbs(completed);
create index if not exists idx_climb_photos_climb_id on public.climb_photos(climb_id);
create index if not exists idx_peaks_state_code on public.peaks(state_code);
create index if not exists idx_peaks_featured on public.peaks(featured);

-- ============================================================
-- Storage buckets (run via Supabase dashboard or CLI)
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('climb-photos', 'climb-photos', true);
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
