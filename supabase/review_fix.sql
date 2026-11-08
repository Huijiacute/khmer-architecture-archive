-- Khmer Architecture Archive — Sprint 3 review fix: owners cannot set status
-- Run ONCE in the Supabase SQL Editor, AFTER entries.sql and review.sql.
--
-- FINDING: the owner insert/update policies from entries.sql only checked
-- `auth.uid() = owner`. They said nothing about `status`, so a contributor
-- could insert or update their own row with status = 'published' from the
-- browser console and skip the review gate.
--
-- FIX: an owner may only write rows whose status is 'pending'.
--   * insert: new rows must be pending.
--   * update: the row AFTER the edit must be pending (so editing a published
--     or returned entry always sends it back to the queue).
-- review_entry() is security definer and runs as the table owner, so it is
-- not blocked by these policies; it remains the ONLY way to publish/return.
--
-- Safe to re-run.

drop policy if exists "owners add their own entries"  on entries;
drop policy if exists "owners edit their own entries" on entries;

create policy "owners add their own entries"
  on entries for insert
  with check (auth.uid() = owner and status = 'pending');

create policy "owners edit their own entries"
  on entries for update
  using (auth.uid() = owner)
  with check (auth.uid() = owner and status = 'pending');

-- Verify: both policies should now mention status = 'pending'.
select policyname, cmd, with_check
from pg_policies
where tablename = 'entries'
order by policyname;
