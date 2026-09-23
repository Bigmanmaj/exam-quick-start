# Clean, human-readable README

Replace the stock Lovable README.md with a short, plain-language document that explains the project to someone who has never seen it — what it is, how the journey works, and how to run it. No jargon about routes, contexts or internals beyond a brief tech section.

## Sections of the new README.md

1. **Title + one-line pitch** — "Perlego Exam Sprint — an onboarding prototype for exam-focused students". Two or three sentences: a clickable, high-fidelity prototype of a reimagined Perlego onboarding experience, built to prove value before asking a student to sign up. Everything is mocked; no real backend, accounts or payments.

2. **The idea** — Students with an exam don't browse a library; they need to know whether the material matches their topics and how fast they can start. This prototype shows relevant chapters first and only asks for sign-up after the student has seen and previewed the material.

3. **How the journey works** — a short numbered walk-through:
   - Landing page with an AI-style topic search
   - Results matched to the search (real covers, descriptions, tags, match scores, reading times, chapters from subtopics)
   - Chapter preview / reader with working tools and a paywall after the opening paragraphs
   - One-screen sign-up with UniDays, Google, Apple and mock payment options
   - Study dashboard with a reading list (with reading times), recommendations, bookshelf and account details
   - Log-in page for returning "users"

4. **What works in the demo** — bullet list: persistent state across pages and reloads, guest sample revision plan, add/remove chapters, topic editing, cover fallbacks, keyboard-accessible controls. Note clearly that all data is demo/fictional and sample text is labelled as such.

5. **Built with** — React, TypeScript, Tailwind CSS, TanStack Start/Router, shadcn/ui. Demo data only; no backend required.

6. **Run it locally** — the existing clone / `npm i` / `npm run dev` instructions, kept as-is.

7. **Demo scope disclaimer** — one line: not production software; no real authentication, payments or AI; created as a product/UX prototype.

## Style

- British English, sentence case, calm and plain — matching the product's own voice.
- Short paragraphs and bullets; no emojis; no internal file paths or architecture detail beyond what a curious reader needs.
- Written to README.md (replacing the current stock file); no code changes of any kind.

## Verification

- Re-read the finished README to check structure and spelling; confirm no claims that overstate what the prototype does (e.g. no "real AI" or "real payments").
