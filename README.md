# Study Swift

<prompt>

<role>

You are a senior product designer and front-end engineer building a clickable, high-fidelity prototype of a reimagined Perlego customer onboarding experience. Build it as a React + TypeScript + Tailwind + shadcn/ui app with all data mocked locally. No real backend, auth, or payments.

</role>

<context>

Perlego is an ebook subscription platform for students. The current onboarding forces users through around 10 pages of setup before they see any value. This prototype flips the order: prove value first, then ask for the minimum needed to sign up.

</context>

<persona>

  <name>Exam in 2 Days</name>

  <situation>

    A student has an exam in two days. They know their module and the topics they need to revise, but they don't know which Perlego content will help most.

  </situation>

  <cares_about>

    They don't want to explore the library. They want quick confidence that they're studying the right material.

    They won't set up an account until they can see Perlego has something relevant to their exam.

  </cares_about>

  <activation_metric>

    The student reaches useful study material and starts studying within 5 minutes.

  </activation_metric>

</persona>

<design_principles>

  <principle>Value before signup: the user sees relevant results before being asked for any information.</principle>

  <principle>Ask only for what's essential: name, university course, and payment.</principle>

  <principle>Speed and confidence: every screen answers "Is this the right material, and how fast can I start?"</principle>

  <principle>Calm, focused, exam-season friendly. Clean typography, generous whitespace, mobile-first, and fully responsive.</principle>

</design_principles>

<brand_reference>

  Match Perlego's visual identity (colors, typography, tone) as closely as possible from any attached screenshots. If none are attached, use a warm, modern, editorial look with a confident primary accent color, rounded cards, and subtle shadows.

</brand_reference>

<user_flow>

  <step number="1" name="Landing with AI search">

    A minimal hero with the headline "Exam in 2 days? Find exactly what to revise." and a large mock AI search bar as the primary focus.

    Include 3 clickable example prompts as chips, for example:

    - "Cognitive dissonance and attitude change for my Psychology exam"

    - "Contract law: offer, acceptance and consideration"

    - "Supply and demand, elasticity, and market failure"

    No account, no popups, and no navigation clutter. Keep a small "Log in" link in the header.

  </step>

  <step number="2" name="AI results (top 3)">

    After submitting a prompt, show a short "Analysing your topics…" state (about 1.5 seconds, with skeleton loaders), then the top 3 results as cards.

    Each result card contains:

    - Book title, author, edition, and cover placeholder

    - A "Relevance" badge (e.g. "96% match")

    - The specific relevant chapters, with chapter number, title, and page range

    - A "Topics covered" section with tick-marked chips showing which of the user's requested topics this result covers (e.g. ✓ Cognitive dissonance, ✓ Attitude change, ✗ Persuasion)

    - Estimated reading time for just the relevant chapters

    - A primary "Start studying" button and a secondary "Preview chapter" link

    Above the cards, show a one-line AI summary, e.g. "I found 3 books covering all 4 of your topics. Start with #1."

  </step>

  <step number="3" name="Chapter preview (no account)">

    Clicking "Preview chapter" opens a side drawer or modal with the first page or two of the chapter as mock text, with a soft fade-out and a "Continue reading, start studying" call to action.

    This proves relevance before any signup.

  </step>

  <step number="4" name="Streamlined signup">

    Triggered by "Start studying". This is a single screen or modal, never a multi-page wizard. See the signup_screen spec below.

  </step>

  <step number="5" name="Mock payment">

    Inline on the same signup screen or as a second and final step. See the signup_screen spec below.

  </step>

  <step number="6" name="Study dashboard">

    Land the user directly in their study material with the dashboard visible. See the dashboard spec below.

  </step>

</user_flow>

<signup_screen>

  <layout>

    Split layout on desktop: the left side shows a summary of what they're unlocking (their selected book and chapters, with a "Ready to study in under a minute" reassurance). The right side holds the form. On mobile, stack them.

  </layout>

  <auth_options_order>

    <option priority="1" prominence="most prominent">

      "Continue with UniDays": a full-width, large, visually dominant primary button using the UniDays brand feel, with a small "Student discount applied" badge.

    </option>

    <option priority="2">"Continue with Google": secondary outline button.</option>

    <option priority="3">"Continue with Apple": secondary outline button.</option>

    <option priority="4">A divider ("or sign up with email"), then the short form below.</option>

  </auth_options_order>

  <form_fields>

    <field>Full name</field>

    <field>Email (auto-filled and hidden if the user came via UniDays, Google, or Apple)</field>

    <field>University course (a searchable dropdown with mock options, e.g. BSc Psychology, LLB Law, BA Economics, BSc Computer Science)</field>

    <field>Mock card details: card number, expiry, CVC, in a clearly styled payment block with a "Mock payment, no real charge" note</field>

    <rule>Do NOT add any other fields: no interests, goals, study habits, referral source, or marketing preferences.</rule>

    <rule>When the user signs up via UniDays, Google, or Apple, prefill name and course where possible so they only need to confirm the card.</rule>

  </form_fields>

  <payment_block>

    Show a mock student plan summary (placeholder price and a "cancel anytime" note). The submit button reads "Start studying now". Add inline validation and a brief loading state (about 1 second), then success.

  </payment_block>

</signup_screen>

<dashboard>

  <purpose>Show the user that Perlego already saved them time and give them a clear path through their material.</purpose>

  <components>

    <component name="Time saved hero card">

      A large stat such as "You saved ~6h 40m". Below it, a small comparison: "Browsing manually: ~7h 30m → With Perlego: ~50m to find, ~4h of targeted reading". This is a mock calculation based on pages avoided versus reading speed.

    </component>

    <component name="Topic coverage tracker">

      Show all the topics from the user's original prompt as a checklist or progress ring. Each topic shows the mapped chapter(s), a status (Not started / In progress / Done), and a "Continue" button.

    </component>

    <component name="Revision plan">

      A simple "Your 2-day plan" timeline (Day 1 and Day 2) that splits the chapters across study sessions, with estimated time per session.

    </component>

    <component name="Continue studying">

      A prominent card that resumes the exact chapter, e.g. "Chapter 7: Attitudes and Persuasion, p. 142".

    </component>

    <component name="Exam countdown">

      A small "Exam in 2 days" badge.

    </component>

  </components>

  <condition>

    If the user's search covered multiple topics, show the full dashboard. If it covered a single topic, show a simplified version (the Time saved card and Continue studying only).

  </condition>

</dashboard>

<mock_data>

  Use fictional book titles and authors to avoid real IP. Create at least 3 result sets (one per example prompt), each with 3 books, realistic chapter names and page ranges, topic-coverage flags, and reading-time estimates. Any free-text search should fall back to a sensible default result set. Store the data in a local TypeScript file.

</mock_data>

<technical_requirements>

  <requirement>React + TypeScript + Tailwind + shadcn/ui, with React Router for navigation.</requirement>

  <requirement>All state is local (React state or context). Persist the search query, chosen book, and signup state across screens.</requirement>

  <requirement>Smooth transitions between steps (Framer Motion or Tailwind transitions).</requirement>

  <requirement>Accessible: keyboard navigable, proper labels, and sufficient contrast.</requirement>

  <requirement>Add a subtle onboarding step indicator only where useful; never show a "step 1 of 10" progress bar.</requirement>

</technical_requirements>

<constraints>

  <constraint>No multi-page signup wizard.</constraint>

  <constraint>No account creation before the user has seen the AI search results.</constraint>

  <constraint>No real API calls, payments, or authentication. Everything is mocked and labelled as such where relevant.</constraint>

  <constraint>UniDays login must always be the most visually prominent sign-in option.</constraint>

</constraints>

<success_criteria>

  A new user can go from landing to studying a relevant chapter in under 5 minutes, in about 5 clicks: search → pick a result → Start studying → sign up and pay (mock) → study dashboard.

</success_criteria>

<build_order>

  Build in this order, confirming each works before moving on: (1) landing and AI search bar, (2) results cards with topic coverage, (3) chapter preview drawer, (4) signup and mock payment screen, (5) study dashboard with time-saved stats.

</build_order>

</prompt>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://exam-quick-start.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/17cbd9f7-63a7-4529-85b8-a538e1d2c8b2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
