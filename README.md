# Khmer Architecture Archive

A living, bilingual (English and Khmer) archive of Cambodian architecture, with a focus on the work of Vann Molyvann. Visitors browse and search published entries. Signed-in contributors submit entries and track them, and a reviewer decides what goes public.

Built in ICT 340 at AUPP. **Curated by:** Lim Houykea. **Source:** Phnom Penh City. (These come from `collection.config.js`.)

## What it does

| Area | Route | Who | What happens |
| --- | --- | --- | --- |
| Browse and search | `/` | Anyone | Hero, mission, and the archive of **published** entries with live title search. The search box in the top navigation sends its query here. |
| Entry detail | `/archive/[id]` | Anyone | Full entry in the visitor's language. Owners see Edit and Delete, and reviewers see Delete. |
| Sign up and log in | `/signup`, `/login` | Anyone | Email and password accounts through Supabase Auth. |
| Contribute | `/contribute` | Signed in | Bilingual form with a photo. A success screen confirms the entry is **pending review**. |
| My Entries | `/my-entries` | Signed in | The user's own entries with a status badge: Pending review, Published, or Returned. Links to view and edit. |
| Edit and delete | `/archive/[id]/edit` | Owner only | Edit an entry (it returns to Pending) or delete it after a confirmation pop-up. |
| Review queue | `/review` | Reviewers only | Pending entries, oldest first. Publish, Return, or Delete each one, with confirmation pop-ups. |

The Sprint 1 pages `/archive/ifl`, `/archive/iispp` and `/archive/french` still exist for the original three entries.

## How an entry moves

```
Contributor submits  ->  pending  --Publish-->  published (public)
                            |
                            +--Return--> returned --contributor edits and saves--> pending
```

- New entries are always `pending`. The form never sends a status; the database default sets it.
- Editing any entry, including a published one, puts it back to `pending` and takes it off the public shelf.
- **Return** keeps the entry private and asks the contributor to fix it. It is not a deletion.

## Security model

The gate lives in the database, not in the buttons. Hiding a button is only a courtesy.

- **Row-level security** is on the `entries` table.
  - Visitors can read only `published` rows. Owners can also read their own rows, and reviewers can read everything.
  - Owners can insert and update only rows whose status is `pending`, so nobody can publish their own entry.
  - Owners and reviewers can delete. Nobody else can.
- **`review_entry(entry_id, decision)`** is the only way to publish or return an entry. It checks `is_reviewer()` and returns `true` only when exactly one pending row changed. The queue removes a card only when it gets `true`.
- **`reviewers`** is a table of user ids. Nobody can add themselves to it from the browser.
- No keys are stored in the repo. Only the project URL and the publishable key are used in the browser, and both come from environment variables.

## Tech and conventions

- Next.js 15 (App Router), React 19, JavaScript only (no TypeScript).
- Plain React with inline style objects and `app/globals.css`. No CSS framework, component library or state library.
- Dependencies: `next`, `react`, `react-dom`, `@supabase/supabase-js`, `@supabase/ssr`. No others.
- Bilingual by design: `lib/translations.js` holds the interface text. Entry content has separate English and Khmer columns. Khmer text is never stripped or transliterated.
- `collection.config.js` is the single source of the archive's name, description, curator and source.
- Fonts: Cormorant Garamond and Inter, with Kantumruy Pro for Khmer.

## Setup

1. Install and create an environment file.

   ```bash
   npm install
   ```

   Create `.env.local` (never commit it) with:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your project url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your publishable key
   ```

2. In the Supabase SQL Editor, run the files in `supabase/` in this order:

   1. `schema.sql` (profiles and the sign-up trigger)
   2. `entries.sql` (the `entries` table and its first policies)
   3. `review.sql` (status column, `reviewers` table, `is_reviewer()`, `review_entry()`, read policy)
   4. `review_fix.sql` (owners can only write `pending` rows)
   5. `reviewer_delete.sql` (owners and reviewers can delete)

   `entries_seed.sql` adds the sample entries (run it once only; running it twice creates duplicates). `cleanup_entries.sql` is a one-time script that removes duplicates and the RUFA and Chaktomuk entries.

3. Create a public Storage bucket named `photos` for entry images.
4. Make yourself a reviewer: copy your user id from Authentication, then run
   `insert into public.reviewers (id) values ('YOUR-USER-UUID');`
5. Start the app.

   ```bash
   npm run dev
   # open http://localhost:3000
   ```

## Project layout

```
app/            pages: /, /login, /signup, /contribute, /my-entries, /review, /archive/...
components/     NavBar, NavSearch, UserMenu, EntryForm, EntryCard, ArchiveSection,
                ReviewQueue, ConfirmDialog, SubmitSuccess, Footer, language switcher
lib/            translations.js and the Supabase clients (browser and server)
supabase/       SQL for the schema, policies and functions (the gate lives here)
middleware.js   refreshes the Supabase session cookie
```

## AI assistance

AI coding assistants (Cline and Kiro) helped write parts of this project. Every change was reviewed before it was accepted. Commits from Sprint 3 on are marked `(AI-assisted)`. Some earlier Sprint 2 and Sprint 3 commits were not tagged at the time. The prompt journals for Sprints 2 and 3 describe the AI-assisted work in detail.
