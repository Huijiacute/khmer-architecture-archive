-- Khmer Architecture Archive — `entries` table + Row Level Security
-- Sprint 2, Lab 6. Run this ONCE in the Supabase SQL Editor:
--   Dashboard → your project → SQL Editor → New query → paste → Run
--
-- Part 1 of the lab. This is the schema (the columns) plus the four
-- policies (the locks). The locks go in BEFORE any data exists.
--
-- Design notes (read these against what the worksheet asked for):
--   * Every human-readable field is bilingual, because the Sprint 1 data
--     in data/entries.js is bilingual. English + Khmer are separate columns
--     so Khmer is never flattened away (AGENTS.md rule 6).
--   * Only the fields an entry genuinely cannot exist without are NOT NULL
--     (title_en, era_en, location_en). Khmer and secondary fields stay
--     nullable so a future contributor form is not forced to fill everything.
--   * "places" lists are stored as text[] — Postgres arrays — matching the
--     JS arrays in the data file, no lossy comma-joining.
--   * The three required system columns are exactly as the worksheet dictates:
--       id uuid primary key default gen_random_uuid()
--       created_at timestamptz not null default now()
--       owner uuid not null references auth.users (id)

create table entries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  owner         uuid not null references auth.users (id),

  -- Title (name of the landmark)
  title_en      text not null,
  title_km      text,

  -- Era / period
  era_en        text not null,
  era_km        text,

  -- Location (province / city)
  location_en   text not null,
  location_km   text,

  -- Year built / dedicated
  year_en       text,
  year_km       text,

  -- Short description
  description_en text,
  description_km text,

  -- Longer narrative / story
  story_en      text,
  story_km      text,

  -- Who contributed / stewards this record
  contributor_en text,
  contributor_km text,

  -- Notable places / features within the landmark
  places_en     text[],
  places_km     text[],

  -- Media + detail link
  image_url     text,
  action_href   text
);

-- ── Row Level Security: the locks ────────────────────────────────────
-- Pasted exactly as given in the lab worksheet.

alter table entries enable row level security;

create policy "anyone can read entries"
  on entries for select using (true);

create policy "owners add their own entries"
  on entries for insert with check (auth.uid() = owner);

create policy "owners edit their own entries"
  on entries for update using (auth.uid() = owner);

create policy "owners delete their own entries"
  on entries for delete using (auth.uid() = owner);