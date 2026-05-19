-- ============================================================
-- Summit / High Points
-- Supabase schema for canonical peaks + personal climb journals
-- ============================================================

create extension if not exists "uuid-ossp";

-- ============================================================
-- Canonical peaks
-- Keeps the original 50 state highpoints dataset intact.
-- ============================================================
create table if not exists public.peaks (
  id text primary key,
  slug text unique not null,
  name text not null,
  state text not null,
  state_code char(2) not null,
  elevation_ft integer not null,
  prominence_ft integer,
  latitude numeric(9,6) not null,
  longitude numeric(9,6) not null,
  difficulty text check (difficulty in ('easy','moderate','hard','technical')),
  region text not null,
  short_description text,
  long_description text,
  hero_image_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.peak_tags (
  id uuid primary key default uuid_generate_v4(),
  peak_id text not null references public.peaks(id) on delete cascade,
  tag text not null,
  unique (peak_id, tag)
);

alter table public.peaks enable row level security;
alter table public.peak_tags enable row level security;

create policy "Peaks are public"
  on public.peaks for select
  to anon, authenticated
  using (true);

create policy "Peak tags are public"
  on public.peak_tags for select
  to anon, authenticated
  using (true);

-- ============================================================
-- Public profiles
-- Contains only fields safe to expose on public profile pages.
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null,
  bio text,
  avatar_url text,
  home_base text,
  favorite_region text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are public"
  on public.profiles for select
  to anon, authenticated
  using (true);

create policy "Users manage own profile"
  on public.profiles for all
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ============================================================
-- Private personal peak records
-- This is the full journal entry, including private notes.
-- Public pages never read directly from this table.
-- ============================================================
create table if not exists public.peak_records (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  canonical_peak_id text references public.peaks(id) on delete set null,
  slug text not null,
  peak_name text not null,
  location_label text,
  state text,
  country text default 'United States',
  latitude double precision,
  longitude double precision,
  status text not null check (
    status in ('want_to_climb','planning','partially_climbed','visited','completed','revisit')
  ) default 'want_to_climb',
  date_climbed date,
  planned_for date,
  route_name text,
  companions text,
  weather text,
  difficulty text,
  distance_miles double precision,
  elevation_gain_ft integer,
  duration_minutes integer,
  notes text,
  anecdotes text,
  special_memories text,
  private_notes text,
  public_notes text,
  favorite_moment text,
  lessons_learned text,
  gear_notes text,
  audio_transcript text,
  external_album_links text[] not null default '{}',
  hero_photo_url text,
  is_published boolean not null default false,
  show_notes_publicly boolean not null default true,
  show_media_publicly boolean not null default true,
  show_stats_publicly boolean not null default true,
  show_strava_publicly boolean not null default true,
  strava_activity_url text,
  strava_activity_title text,
  strava_activity_date date,
  strava_distance_miles double precision,
  strava_elevation_gain_ft integer,
  strava_moving_time_minutes integer,
  strava_pace_text text,
  strava_route_map_image_url text,
  strava_source text not null default 'manual' check (strava_source in ('manual','link','oauth')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, slug)
);

create table if not exists public.peak_record_media (
  id uuid primary key default uuid_generate_v4(),
  peak_record_id uuid not null references public.peak_records(id) on delete cascade,
  storage_path text,
  media_url text not null,
  thumb_url text,
  caption text,
  source_type text not null default 'upload' check (source_type in ('upload','external')),
  visibility text not null default 'private' check (visibility in ('private','public')),
  is_highlight boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.peak_records enable row level security;
alter table public.peak_record_media enable row level security;

create policy "Users manage own peak records"
  on public.peak_records for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users manage own record media"
  on public.peak_record_media for all
  to authenticated
  using (
    exists (
      select 1
      from public.peak_records peak_records
      where peak_records.id = peak_record_media.peak_record_id
        and peak_records.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.peak_records peak_records
      where peak_records.id = peak_record_media.peak_record_id
        and peak_records.user_id = auth.uid()
    )
  );

-- ============================================================
-- Public published copies
-- Only contains fields the owner explicitly chose to share.
-- ============================================================
create table if not exists public.published_peak_records (
  id uuid primary key default uuid_generate_v4(),
  peak_record_id uuid unique not null references public.peak_records(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  username text not null,
  user_display_name text not null,
  user_avatar_url text,
  canonical_peak_id text references public.peaks(id) on delete set null,
  slug text not null,
  peak_name text not null,
  location_label text,
  state text,
  country text,
  latitude double precision,
  longitude double precision,
  status text not null check (
    status in ('want_to_climb','planning','partially_climbed','visited','completed','revisit')
  ),
  date_climbed date,
  route_name text,
  weather text,
  difficulty text,
  distance_miles double precision,
  elevation_gain_ft integer,
  duration_minutes integer,
  public_notes text,
  anecdotes text,
  special_memories text,
  favorite_moment text,
  lessons_learned text,
  gear_notes text,
  audio_transcript text,
  external_album_links text[] not null default '{}',
  hero_photo_url text,
  strava_activity_url text,
  strava_activity_title text,
  strava_activity_date date,
  strava_distance_miles double precision,
  strava_elevation_gain_ft integer,
  strava_moving_time_minutes integer,
  strava_pace_text text,
  strava_route_map_image_url text,
  strava_source text not null default 'manual' check (strava_source in ('manual','link','oauth')),
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (username, slug)
);

create table if not exists public.published_peak_record_media (
  id uuid primary key default uuid_generate_v4(),
  peak_record_id uuid not null references public.peak_records(id) on delete cascade,
  media_url text not null,
  thumb_url text,
  caption text,
  source_type text not null default 'upload' check (source_type in ('upload','external')),
  is_highlight boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.published_peak_records enable row level security;
alter table public.published_peak_record_media enable row level security;

create policy "Published peak records are public"
  on public.published_peak_records for select
  to anon, authenticated
  using (true);

create policy "Published peak record media is public"
  on public.published_peak_record_media for select
  to anon, authenticated
  using (true);

-- ============================================================
-- Timestamps
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_peak_records_updated_at on public.peak_records;
create trigger set_peak_records_updated_at
before update on public.peak_records
for each row execute function public.set_updated_at();

drop trigger if exists set_published_peak_records_updated_at on public.published_peak_records;
create trigger set_published_peak_records_updated_at
before update on public.published_peak_records
for each row execute function public.set_updated_at();

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_peak_records_user_id on public.peak_records(user_id);
create index if not exists idx_peak_records_status on public.peak_records(status);
create index if not exists idx_peak_records_canonical_peak_id on public.peak_records(canonical_peak_id);
create index if not exists idx_peak_record_media_record_id on public.peak_record_media(peak_record_id);
create index if not exists idx_published_peak_records_username on public.published_peak_records(username);
create index if not exists idx_published_peak_records_user_id on public.published_peak_records(user_id);
create index if not exists idx_published_peak_record_media_record_id on public.published_peak_record_media(peak_record_id);

-- ============================================================
-- Storage buckets
-- Run in Supabase SQL editor or dashboard as needed.
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('climb-photos', 'climb-photos', true);
-- insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);

-- Recommended storage policies:
-- 1. authenticated users can upload/update/delete in climb-photos where folder name starts with auth.uid()
-- 2. public read on climb-photos only if you want published images to be public
-- 3. authenticated users manage their own avatar objects
