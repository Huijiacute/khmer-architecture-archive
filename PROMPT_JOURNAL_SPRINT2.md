# Prompt Journal — Sprint 2

Project: Khmer Architecture Archive (Next.js 15 App Router + Supabase)

> The four "Prompt that mattered most" blocks below are my real prompts,
> pasted exactly as I sent them. The "Technique" line in each entry is left
> for me to fill from the Chapter 3 checklist — write the one I actually used.
> The "What came back" and "What I changed or rejected" notes are grounded in
> what is actually in my repo this sprint.

---

## Entry 1 — Week 5, Auth setup (Supabase client wiring)

**Prompt that mattered most (exact):**
> Install @supabase/supabase-js and @supabase/ssr (both are approved in AGENTS.md). Create the Supabase client setup for a Next.js 15 App Router project using environment variables NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, with the @supabase/ssr pattern for server and client. Do not touch any existing page. Do not write any key into any file.

**Technique:** _[FILL IN — the technique from the Chapter 3 checklist I used here, e.g. stating the stack + constraints up front, with explicit "do not" boundaries.]_

**What came back:** Two client factories — `lib/supabase/client.js` using `createBrowserClient` and `lib/supabase/server.js` using `createServerClient` with `cookies()` `getAll`/`setAll` handlers — both reading the URL and publishable key from `process.env`, plus `middleware.js` to refresh the session.

**What I changed or rejected:** _[FILL IN what you actually adjusted. Verified fact you can build on: both clients read keys only from env vars and no key is written into any committed file, which is what the prompt demanded — confirm this held, or note what you had to correct.]_

---

## Entry 2 — Week 5/6, Login + signup pages (email/password auth)

**Prompt that mattered most (exact):**
> Add a sign-up page at /signup and a login page at /login using Supabase email/password auth. Match the existing visual style in app/page.js (dark background, inline style objects, same colors). Plain error handling: on a failed login show only "Invalid email or password", nothing more specific. After successful login, redirect to the home page.

**Technique:** _[FILL IN — the checklist technique, e.g. specifying UI constraints + an explicit error-handling rule.]_

**What came back:** `/login` and `/signup` pages in the archive's inline-style palette, using `signInWithPassword`, with a `?next=` redirect that only honors same-site relative paths (guards against open-redirect), wrapped in a `Suspense` boundary for `useSearchParams`.

**What I changed or rejected:** The AI's first login handler did `setError(signInError.message || "Invalid email or password")` — it surfaced Supabase's raw message first, the opposite of the "nothing more specific" rule I asked for, which leaks whether an account exists. I changed it to always show the generic "Invalid email or password" and log the real error with `console.error` instead. _[FILL IN: confirm in your own words / name the checklist technique above.]_

---

## Entry 3 — Week 7 placeholder (see note)

**Prompt that mattered most (exact):**
> Understand the prompt below and do not do anything yet: You are given a task to integrate an existing React component in the codebase. The codebase uses Next.js 15 App Router and plain React. Look at CircularCounter.js and show how it will fit into the entry cards without breaking existing layout

**Technique:** _[FILL IN — e.g. "read-before-write / plan-first": telling the AI to analyze and not act yet.]_

**What came back:** _[FILL IN in one sentence what the AI returned.]_

**What I changed or rejected:** _[FILL IN.]_

> ⚠️ HONESTY NOTE (delete before submitting): This prompt references
> `CircularCounter.js`, which is not in this repo, and it is a generic
> component-integration task rather than a Sprint 2 auth / database / locks
> session. The rubric says the strongest entries are the security ones. If you
> have your real Week 7 RLS prompt (the one where you wrote the four policies
> on `entries`), swap it in here — it is far stronger material and matches the
> code a grader will open (`supabase/entries.sql`).

---

## Entry 4 — Week 6, The database table (`entries` schema) — SECURITY

**Prompt that mattered most (exact):**
> Write a Postgres CREATE TABLE statement for a table called entries with the photo provided. Include: id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), and owner uuid not null references auth.users (id). Output SQL only. Do not modify any file in the project.

**Technique:** _[FILL IN — e.g. constrain the output format ("SQL only") + give the exact required columns.]_

**What came back:** A `CREATE TABLE entries` with the three required system columns exactly as specified (`id uuid` default `gen_random_uuid()`, `created_at timestamptz` default `now()`, `owner uuid not null references auth.users(id)`), plus bilingual content columns (`title_en/_km`, `era_en/_km`, `location_en/_km`, etc.) and `image_url`.

**What I changed or rejected:** The `owner … references auth.users(id)` column is what every ownership lock later depends on, so I kept it `not null` and made sure the row's owner is set from the authenticated session at insert time (in `app/contribute/page.js`), never from form input — otherwise a contributor could claim another user's id. _[FILL IN / confirm in your own words — this ties directly to reflection Q2.]_

---

### Checklist before I submit this journal
- [ ] Every "Technique" line filled from the Chapter 3 checklist (4 total).
- [ ] Entry 3 either replaced with my real Week 7 RLS prompt, or its blanks filled honestly — and the ⚠️ honesty note deleted.
- [ ] Entry 2's login-error note reflects what I actually did about the leaked message.
- [ ] At least three entries read like separate work sessions (they do — keep it that way).
- [ ] Submit as text or a doc link before the deadline (late window to Sun Oct 26 = max half credit, then locked).
