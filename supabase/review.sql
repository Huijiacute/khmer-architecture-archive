-- Khmer Architecture Archive — Sprint 3: the review gate
-- Run this ONCE in the Supabase SQL Editor, AFTER entries.sql:
--   Dashboard → your project → SQL Editor → New query → paste → Run
--
-- WHY THIS FILE EXISTS
--   The /review page and its buttons call two database functions,
--   is_reviewer() and review_entry(). The app cannot work without them,
--   and — more importantly — these functions ARE the security gate. The
--   page check in app/review/page.js is only politeness; this file is the
--   lock. It must live in the repo so the gate can be read and reviewed,
--   not hidden in the dashboard.
--
--   It also adds the `status` column the whole Sprint 3 flow depends on,
--   and tightens the public read policy so pending/returned entries are
--   private to their owner (and to reviewers) until they are published.
--
-- Safe to re-run: uses IF NOT EXISTS / CREATE OR REPLACE / DROP ... IF EXISTS.

-- ────────────────────────────────────────────────────────────────────
-- 1. status column: pending → (published | returned)
-- ────────────────────────────────────────────────────────────────────
-- Every new entry starts life as 'pending'. A reviewer moves it to
-- 'published' (visible to the public) or 'returned' (sent back to the
-- owner to fix). The CHECK makes any other value impossible, so a bad
-- `decision` can never be written even by a direct console update.

alter table entries
  add column if not exists status text not null default 'pending';

alter table entries
  drop constraint if exists entries_status_check;
alter table entries
  add constraint entries_status_check
  check (status in ('pending', 'published', 'returned'));

-- ────────────────────────────────────────────────────────────────────
-- 2. reviewers table: who is allowed to review
-- ────────────────────────────────────────────────────────────────────
-- "Reviewer" is data you control, not a hard-coded id and not an env
-- secret (AGENTS.md rule 3). To make someone a reviewer, add their user
-- id here from the dashboard:
--   Authentication → Users → copy UUID → insert a row below.
--
--   insert into public.reviewers (id) values ('PASTE-USER-UUID-HERE');

create table if not exists public.reviewers (
  id          uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.reviewers enable row level security;

-- A logged-in user may check whether their OWN id is in the table.
-- Nobody can read anyone else's reviewer status, and nobody can grant
-- themselves reviewer rights from the client — there is no insert policy,
-- so rows can only be added from the dashboard / service role.
drop policy if exists "Users can see their own reviewer row" on public.reviewers;
create policy "Users can see their own reviewer row"
  on public.reviewers
  for select
  using (auth.uid() = id);

-- ────────────────────────────────────────────────────────────────────
-- 3. is_reviewer(): is the current user a reviewer?
-- ────────────────────────────────────────────────────────────────────
-- Returns true/false, never null, never an error for a normal caller.
-- security definer lets it read the reviewers table regardless of RLS,
-- so it works even before the "see your own row" policy would apply.

create or replace function public.is_reviewer()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.reviewers r
    where r.id = auth.uid()
  );
$$;

-- ────────────────────────────────────────────────────────────────────
-- 4. Read policy: pending/returned entries are private
-- ────────────────────────────────────────────────────────────────────
-- entries.sql shipped "anyone can read entries ... using (true)", which
-- would leak pending work to the public. Replace it: the public sees only
-- published entries; an owner always sees their own (any status); a
-- reviewer sees everything (so the queue can load).

drop policy if exists "anyone can read entries" on entries;
drop policy if exists "read published, own, or as reviewer" on entries;
create policy "read published, own, or as reviewer"
  on entries
  for select
  using (
    status = 'published'
    or auth.uid() = owner
    or public.is_reviewer()
  );

-- ────────────────────────────────────────────────────────────────────
-- 5. review_entry(): THE GATE the buttons call
-- ────────────────────────────────────────────────────────────────────
-- Contract (this is what app/components/ReviewQueue.js relies on):
--   * returns TRUE  → exactly one pending entry was moved to the decision.
--   * returns FALSE → refused. No error is raised. This happens when the
--                     caller is not a reviewer, the decision is not one of
--                     the two allowed values, or the row is not a pending
--                     entry (wrong id, already decided, etc.).
--
-- Because refusal returns false (not an error), the client MUST check
-- `data === true` before removing a card. Checking only for `error` would
-- wrongly treat a refusal as success — the trap the review checklist warns
-- about.

create or replace function public.review_entry(entry_id uuid, decision text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  rows_changed integer;
begin
  -- Only reviewers may proceed. A non-reviewer gets a quiet false.
  if not public.is_reviewer() then
    return false;
  end if;

  -- A reviewer may only publish or return. Anything else is a quiet false.
  if decision not in ('published', 'returned') then
    return false;
  end if;

  -- Move the entry only if it is currently pending. This both does the
  -- work and tells us whether anything actually changed.
  update entries
     set status = decision
   where id = entry_id
     and status = 'pending';

  get diagnostics rows_changed = row_count;

  return rows_changed = 1;
end;
$$;
