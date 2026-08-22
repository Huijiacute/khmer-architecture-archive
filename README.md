# Khmer Architecture Archive

A living digital archive of Cambodian architectural heritage, built in ICT 340 at AUPP. Documenting structures from ancient Angkorian temples to Vann Molyvann's New Khmer modernism.

**Curated by:** Lim Houykea · **Source:** Phnom Penh City

---

## Core Features

- **Landing Page (`/`)** — Hero split-view with Angkor Wat imagery, editorial offset title, about strip with image grid, two-pillar mission statement, and featured landmark showcase grid
- **Archive (`/archive`)** — Full landmark catalog with client-side era filter (All / Pre-Angkorian / Angkorian / Post-Angkorian / New Khmer / Contemporary); alternating image-and-text card layout; 8 real Khmer buildings with Khmer script names
- **Eras & Timeline (`/timeline`)** — Five chronological eras rendered as editorial rows with large number, era name in English + Khmer (e.g. សម័យអង្គរ), date range, description, thumbnail image, and linked landmark pills
- **Map (`/map`)** — Split layout: province list on the left with landmark counts; live OpenStreetMap iframe centered on Cambodia on the right — no API key required
- **About / Contribute (`/about`)** — Curator and source credits pulled from `collection.config.js`; preservation goals list; numbered four-step contribution guide; visual submission form

## Architecture & Design

- **Stack:** Next.js 15 App Router, React 19, JavaScript only
- **Styling:** Inline style objects + `app/globals.css` (no CSS framework)
- **Fonts:** Cormorant Garamond (editorial serif headings) + Inter (body) via Google Fonts
- **Color palette:** Parchment white `#FAFAF8`, near-black `#1A1A1A`, sandstone gold `#C9A96E`
- **Data source:** `lib/landmarks.js` — single array of 8 landmark objects shared by Archive and Timeline
- **Config source:** `collection.config.js` — archive name, description, curator, source read by NavBar, Footer, and About page

## Components

- `components/NavBar.js` — Sticky top nav, active-link gold underline via `usePathname()`, scroll-triggered border
- `components/Footer.js` — Dark three-column footer; all values read from `collection.config.js`

## Running Locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Rules

- JavaScript only — no TypeScript
- No new npm packages beyond the three in `package.json`
- Khmer text is preserved exactly — never transliterated or removed
- Every value in NavBar, Footer, and About reads from `collection.config.js`
