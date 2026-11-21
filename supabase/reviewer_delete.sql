-- Khmer Architecture Archive — reviewers may delete any entry
-- Run ONCE in the Supabase SQL Editor, AFTER entries.sql and review.sql.
--
-- BEFORE: only the owner could delete a row (auth.uid() = owner).
-- NOW:    the owner can still delete their own entries, and a reviewer
--         (public.is_reviewer(), the same check that guards review_entry)
--         can delete any entry. Everyone else is still refused.
--
-- Reviewers still cannot EDIT other people's entries: the update policy is
-- unchanged. The reviewer's tools remain Publish, Return, and now Delete.
--
-- Safe to re-run.

drop policy if exists "owners delete their own entries" on entries;
drop policy if exists "owners or reviewers delete entries" on entries;

create policy "owners or reviewers delete entries"
  on entries for delete
  using (auth.uid() = owner or public.is_reviewer());

-- Verify: should list one delete policy using owner OR is_reviewer().
select policyname, cmd, qual
from pg_policies
where tablename = 'entries' and cmd = 'DELETE';
