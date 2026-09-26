# Lab 6 — Finish Guide (Sprint 2: entries move to Supabase)

This guide walks you through everything that has to happen **outside the code**
to finish Lab 6. The code work is already done and the build passes; what's left
is running SQL in Supabase, wiring your data in, testing like an attacker, and
shipping.

Do the parts in order. Check the box as you go.

---

## What's already done in the repo (for reference)

- [x] `supabase/entries.sql` — `CREATE TABLE entries` (bilingual columns + the 4 RLS policies, verbatim). **Not run yet — you run it in Part 1.**
- [x] `supabase/entries_seed.sql` — 7 `INSERT`s, Khmer + image paths preserved, `owner = 'PASTE-YOUR-UUID-HERE'`.
- [x] `components/ArchiveSection.js` — reads entries live from Supabase (newest first) with loading / empty / error states. Layout and search unchanged.
- [x] `npm run build` passes (exit 0, all 11 routes).

---

## Part 0 — Wake Supabase (30 sec)

1. Open the [Supabase dashboard](https://supabase.com/dashboard).
2. If your project shows **Paused**, click **Restore** and wait until it's active.

> A sleeping project is the #1 cause of "works on localhost, dead on the live site."

- [ ] Project is active.

---

## Part 1 — Run the schema (the table + the locks)

1. Dashboard → your project → **SQL Editor** → **New query**.
2. Open `supabase/entries.sql` in the repo, copy the **whole file**, paste it in.
3. Click **Run**. You want a green success message.
4. Go to **Table Editor** and confirm an **empty `entries` table** with all its columns.

> This one script creates the table **and** turns on Row Level Security with the
> four policies. The locks go in *before* any data exists — that's the point.

- [ ] `entries.sql` ran green.
- [ ] Empty `entries` table visible in Table Editor.

---

## Part 2 — Copy your UUID, then seed your entries

### 2a. Get your user id
1. Dashboard → **Authentication** → **Users**.
2. Click your own user, copy the **UUID** (the whole string, no spaces).

> No user yet? Sign up once through your app's `/signup` page, then come back.

- [ ] UUID copied.

### 2b. Paste your UUID into the seed
1. Open `supabase/entries_seed.sql`.
2. **Find & Replace all** `PASTE-YOUR-UUID-HERE` → your UUID.
3. There are **7 occurrences** — replace every one.

- [ ] All 7 placeholders replaced.

### 2c. Run the seed
1. SQL Editor → **New query** → paste the edited seed → **Run**.
2. Table Editor → open `entries` → confirm **7 rows**.
3. Spot-check quality:
   - A Khmer field like `title_km` shows `វិទ្យាស្ថានភាសាបរទេស (IFL)` — real Khmer, **not** boxes or `?`.
   - An image path shows exactly `/IFL_1.JPG`.

- [ ] 7 rows present.
- [ ] Khmer renders correctly in the table.

**If an insert fails, read the error:**
- **Foreign-key error on `owner`** → the UUID is wrong or has a stray space. Re-copy the whole thing.
- **not-null error** → a required field is missing. (title_en / era_en / location_en are filled for all 7, so this shouldn't fire.)

---

## Part 3 — See the cutover live (localhost)

1. In the repo run:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000 and check with your own eyes:
   - Home archive section shows your **7 entries**.
   - `/archive` shows them too.
   - Search works: try `IFL`, `Molyvann`, and a Khmer term like `វិមានឯករាជ្យ`.
   - Khmer renders correctly.
   - A brief **"Loading the archive…"** state appears on first load.

- [ ] Entries show on `/`.
- [ ] Entries show on `/archive`.
- [ ] Search works (English + Khmer).

### Retiring the data file (do this last, as its own commit)
`data/entries.js` is **still used** by `lib/landmarks.js` and the home hero
counter (`landmarks.length`). So you have two honest options:

- **Option A (simplest):** commit the cutover now, leave `data/entries.js` in place.
- **Option B (full retire):** first repoint the hero counter so it no longer needs
  the file, then delete `data/entries.js` and its import.

When you do fully retire it, make it a **standalone commit** so it's trivial to revert:
```
sprint 2: retire the data file, entries live in supabase
```

- [ ] Cutover committed.

---

## Part 4 — Verify like an attacker (logged OUT)

### 4a. Public read still works
Log out. Browse and search your archive. It works because the policy
`select using (true)` allows anyone to read. Feature 1 is no worse than before.

- [ ] Logged out, browse + search still work.

### 4b. Try to write from the outside
Open the browser **console** on your site and run this, filling in your real
values (they're public by design — that's why this test matters):

```js
fetch('https://uwswzuvkhddjvlcuxtle.supabase.co/rest/v1/entries', {
  method: 'POST',
  headers: {
    apikey: 'YOUR-PUBLISHABLE-KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ title_en: 'should fail' })
}).then(r => r.json()).then(console.log);
```

**Expected:** a **row-level security refusal**, not a new row. A valid public key
was still refused — because the key was never the lock. The policy is.

Then check Table Editor: still **7 rows**, no `"should fail"`.

- [ ] Write attempt was refused by RLS.
- [ ] No junk row was created.

### 4c. Grep for secrets
In the repo root:
```bash
git grep "sb_publishable"
```
Expect **zero hits in committed files** — the key lives only in gitignored
`.env.local`. Your UUID appearing in the seed SQL is fine; a UUID is not a secret.

- [ ] Publishable key: zero hits in committed files.

### 4d. Phone test
On mobile data (not your wifi): browse, search, log in, log out. The database
should be invisible — that's the whole idea.

- [ ] Works on phone / mobile data.

---

## Part 5 — Ship and write

1. Push a branch and open a PR (do **not** push straight to `main`). Watch the
   **Vercel** deploy.
   - Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
     exist in Vercel → Project → Settings → Environment Variables.
   - Zero entries on the live site? Re-check the **"anyone can read entries"**
     policy (Part 1) and make sure Supabase isn't paused.
2. On the **live URL** (not localhost): entries load, search works.
3. Submit the live URL to the Lab 6 assignment with 2–3 sentences.

- [ ] Deployed to Vercel.
- [ ] Live URL verified (entries + search).
- [ ] Submitted.

### Writeup material (adapt in your own words)

**What moved:** The 7 archive entries moved out of `data/entries.js` and into a
Supabase `entries` table protected by Row Level Security. The home page and
archive now read them live over the network instead of importing a file.

**One assumption the AI made that I had to fix:** A naive schema collapses each
entry to a single `title` / `description` and quietly drops the Khmer columns and
the English/Khmer split my Sprint 1 data uses — English-flavored defaults for a
Khmer-first archive. The fix was making every human-readable field bilingual
(`title_en` / `title_km`, …) and storing the "places" lists as Postgres `text[]`
instead of comma-joining them, so no Khmer is flattened.

**Discussion post — "ask why, not just what":** The AI assumed a single-language
schema because most training examples are English-only, so "an entry has a title
and a description" is its default mental model. It doesn't know the archive is
bilingual unless the schema forces it. I caught it by reading the generated
columns against `data/entries.js` field-by-field and adding the `_km` columns and
`text[]` arrays before running anything.

---

## Two things to note

1. **Seed ordering:** all 7 rows insert in one statement, so their `created_at`
   timestamps are near-identical and "newest first" among the seed rows is
   arbitrary. Harmless for a seed; any *new* entry you add later correctly sorts
   to the top. (Ask if you want the seed split into 7 statements for deterministic order.)
2. **Unapproved dependency:** `package.json` lists `@supabase/server`, which is
   **not** one of the two Sprint 2-approved packages and isn't imported by the
   cutover. Left untouched per AGENTS.md rule 2 — you should review/remove it.

---

## If you finish early
Add a 6th... er, 8th entry with one more `INSERT` in the SQL Editor (owner = your
UUID), then refresh your live site. It's there — no deploy happened. That's the
database doing its job.
