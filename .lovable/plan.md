# Clean, human-readable README

Replace the stock Lovable README.md with a short, plain-language document that explains the project to someone who has never seen it. It must make two things unmistakable up front: this is a **frontend demo only with no actual functionality**, and its purpose is to **demonstrate a customer onboarding flow**. No jargon beyond a brief tech section.

## Sections of the new README.md

1. **Title + framing** — "Perlego Exam Sprint — a customer onboarding flow prototype". The opening lines state clearly and immediately:
   - This is a **frontend demo only**. It has **no actual functionality** — no real backend, accounts, payments, AI or book content.
   - The intention is to **show a customer onboarding flow**: how a student could go from searching a topic to reading the right chapter, with value proven before sign-up.

2. **The idea** — Students with an exam don't browse a library; they need to know whether the material matches their topics and how fast they can start. The prototype flips the usual funnel: show matched chapters first, ask for sign-up only after the student has seen and previewed the material.

3. **How the journey works** — a short numbered walk-through of what the demo simulates:
   - Landing page with an AI-style topic search
   - Results matched to the search (covers, descriptions, tags, match scores, reading times, chapters)
   - Chapter preview / reader with working reader tools and a paywall after the opening paragraphs
   - One-screen sign-up with UniDays, Google, Apple and mock payment options
   - Study dashboard with a reading list (with reading times), recommendations, bookshelf and account details
   - Log-in page for returning "users"

4. **What works in the demo** — bullets: selections and progress persist across pages and reloads, guest sample revision plan, add/remove chapters, topic editing, cover fallbacks, keyboard-accessible controls. Note that everything shown is demo/fictional and sample text is labelled as such.

5. **What is intentionally not real** — a short explicit list: no authentication, no payments, no AI, no real book text, no database. Everything is simulated in the browser.

6. **Built with** — React, TypeScript, Tailwind CSS, TanStack Start/Router, shadcn/ui. All data is local demo data; no backend required.

7. **Run it locally** — the existing clone / `npm i` / `npm run dev` instructions, kept as-is.

## Style

- British English, sentence case, calm and plain — matching the product's own voice.
- Short paragraphs and bullets; no emojis; no internal file paths or architecture detail beyond what a curious reader needs.
- Written to README.md (replacing the current stock file); no code changes of any kind.

## Verification

- Re-read the finished README to check structure and spelling; confirm it states "frontend demo only, no actual functionality" prominently and never overstates what the prototype does (no "real AI" or "real payments").
