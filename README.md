# Perlego Exam Sprint — a customer onboarding flow prototype

**This is a frontend demo only. It has no actual functionality** — there is no real backend, no accounts, no payments, no AI and no real book content. Everything you see is simulated in the browser.

**The intention is to show a customer onboarding flow**: how an exam-focused student could go from searching a topic to reading the right chapter in minutes, with the product proving its value before asking them to sign up.

## The idea

A student with an exam coming up doesn't browse a library. They need to know one thing: *is this the right material, and how fast can I start?*

Most onboarding flows ask a student to create an account first and prove their value later. This prototype flips that around — the student searches their module or topic, sees genuinely matched chapters with reading times and coverage, and previews a chapter before any sign-up is requested.

## How the journey works

1. **Landing page** — a focused search: enter your module or textbook title.
2. **Matched results** — books ranked against the search, with covers, descriptions, tags, match scores, reading times and chapters.
3. **Chapter preview** — a working reader (text size, theme, bookmarks, highlights, notes) showing the opening paragraphs, with the rest behind a paywall.
4. **One-screen sign-up** — UniDays, Google, Apple and email options beside the chosen chapter, with mock payment (card, Google Pay, Apple Pay).
5. **Study dashboard** — a reading list with expected reading times, recommendations, a bookshelf and account details.
6. **Log-in page** — for returning "users", with the same UniDays, Google and Apple options.

## What works in the demo

- Selections, saved chapters and progress persist across pages and reloads.
- A guest sample revision plan: adding a book without an account still builds a dashboard, with a prompt to sign up to save it.
- Chapters can be added to or removed from the reading list.
- Search topics can be edited after the initial search.
- Missing cover images fall back to a clean titled cover.
- The interface is keyboard-accessible, with visible focus states.

Everything shown is demo data, and sample chapter text is labelled as such.

## What is intentionally not real

- No authentication — sign-up and log-in are simulated
- No payments — card, Google Pay and Apple Pay are mock interfaces
- No AI — search matching is simple local logic
- No real book text — preview paragraphs are written sample content
- No database — all state lives in the browser

## Built with

- React
- TypeScript
- Tailwind CSS
- TanStack Start and TanStack Router
- shadcn/ui

All data is local demo data; no backend is required.

## Run it locally

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
