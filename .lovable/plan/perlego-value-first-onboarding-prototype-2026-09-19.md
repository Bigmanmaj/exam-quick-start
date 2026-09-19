# Perlego value-first onboarding prototype

## Goal
Build a polished, clickable prototype that takes an exam-focused student from a topic search to relevant study material in roughly five actions, without requesting account details before proving value.

## Experience
1. **Search (`/`)**
   - Minimal Perlego header with a quiet Log in action.
   - Focused headline, large AI topic search, and three clickable example prompts.
   - Submitting any text preserves the query and moves directly to results.

2. **Matched books (`/results`)**
   - Show a 1.5-second “Analysing your topics…” skeleton state.
   - Resolve the three supplied examples to distinct local result sets; other searches use a credible default set.
   - Present three ranked fictional books with cover artwork, match score, chapters/pages, reading time, and per-topic coverage.
   - Include the concise AI recommendation, “Start studying”, and “Preview chapter” actions.

3. **Chapter preview**
   - Open an accessible Perlego-style reader over results and reveal only the selected chapter’s first paragraph.
   - Provide functional local reader tools for text size, theme, bookmark, highlight, notes, and chapter navigation where available.
   - Place a clear paywall over the remainder of the chapter with the selected material summary and a “Continue reading, start studying” action.
   - Keep the selected book, chapter, reader settings, bookmarks, highlights, and notes intact when the student continues.

4. **Fast signup (`/signup`)**
   - One responsive screen: selected-material summary beside the form on desktop, stacked on mobile.
   - Make UniDays the dominant option, followed by Google, Apple, then email.
   - Mock provider selection prefills available details and reduces the form to course confirmation plus payment.
   - Include only full name, email, searchable course choice, and payment. Offer mock Google Pay and Apple Pay alongside mock card number, expiry, and CVC.
   - Show the mock student plan, “cancel anytime”, explicit no-charge wording, inline validation, and a one-second submit state.

5. **Study dashboard (`/study`)**
   - Land directly on the chosen chapter with an exam countdown and prominent continue-reading action.
   - For multi-topic searches, show time saved, topic-to-chapter progress, and a two-day revision plan.
   - For a single-topic fallback search, simplify the view to time saved and continue studying.
   - Make topic status controls interactive so the prototype visibly progresses.

## Visual system
- Adapt the supplied Perlego starter into the existing Tailwind theme rather than copying its standalone CSS unchanged.
- Use warm paper/white surfaces, black and warm-grey text, Perlego indigo for actions, restrained subject accents, 4px spacing rhythm, 8px cards, hairline borders, and warm subtle shadows.
- Use editorial serif display type with Manrope-style UI headings and Inter-style body text, loaded safely through the document head.
- Use fictional 2:3 book-cover artwork as the primary imagery, with no real titles or authors.
- Keep motion quiet: short fades/slides, skeleton shimmer, and reduced-motion support.
- Preserve British English, sentence case, visible keyboard focus, full labels, strong contrast, and touch-friendly controls.

## Local data and state
- Add a typed local data module containing three result sets with three books each, chapter metadata, topic coverage, reading estimates, preview copy, and revision-plan inputs.
- Add a root-level onboarding context so query, chosen book/chapter, reader-tool state, provider and payment choices, signup completion, and progress survive route changes without any backend.
- Protect incomplete flows gracefully: opening results, signup, or study directly falls back to sensible mock state rather than a blank screen.

## Technical details
- Keep the existing TanStack Start/TanStack Router architecture; create one typed route file for every URL above and use router links/navigation throughout.
- Build focused reusable pieces for search, book results, the paywalled reader, reader tools, provider choices, course combobox, mock card/Google Pay/Apple Pay choices, and dashboard tracking.
- Use the project’s design-system controls and icons for interactions; add only lightweight dependencies already compatible with the app where needed.
- Give every content route unique title, description, Open Graph title/description, `og:type`, and Twitter card metadata.
- Verify each stage in the requested order, then run the complete flow on desktop and mobile, including keyboard navigation, validation, transitions, direct-route fallbacks, and browser-console checks.

## Acceptance checks
- No signup prompt appears before results and preview are available.
- UniDays is always the most prominent provider.
- The free reader exposes one paragraph; its tools work locally while the rest of the chapter remains paywalled until mock signup succeeds.
- Signup is one screen, with card, Google Pay, and Apple Pay options inline and no extra profiling fields.
- Every example prompt yields its own realistic top-three set; arbitrary text still works.
- A student can complete search → choose → signup/payment → dashboard in about five actions.
