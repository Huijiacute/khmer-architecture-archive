-- Khmer Living Archive — Supabase database schema
-- Run this once in the Supabase SQL editor:
--   Dashboard → your project → SQL Editor → New query → paste → Run
--
-- What it does:
--   1. Creates a `profiles` table, one row per contributor account.
--   2. Turns on Row Level Security (RLS) so each user can only read/edit
--      their own profile.
--   3. Adds a trigger so that whenever someone signs up (a row is added to
--      the built-in auth.users table), a matching profiles row is created
--      automatically. This is what makes "contributor accounts" work.
--
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / DROP ... IF EXISTS.

-- 1. Profiles table -----------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  display_name text,
  created_at  timestamptz not null default now()
);

-- 2. Row Level Security -------------------------------------------------------
alter table public.profiles enable row level security;

-- A user may read their own profile row.
drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles
  for select
  using (auth.uid() = id);

-- A user may update their own profile row.
drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- A user may insert their own profile row (fallback; the trigger below
-- normally does this automatically at sign-up).
drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles
  for insert
  with check (auth.uid() = id);

-- 3. Auto-create a profile row on new sign-up ---------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
