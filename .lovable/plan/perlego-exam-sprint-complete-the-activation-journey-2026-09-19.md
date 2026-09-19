# Perlego Exam Sprint: complete the activation journey

## Goal and scope
Extend the existing prototype so a student can reach relevant material and start actively reading within five minutes. Preserve the current Perlego styling and reuse the search, results, preview tools, simulated subscription and study dashboard. Everything remains local and mocked.

**Timing stays flexible:** ask for the exam date, retain “Your revision plan”, and adapt sessions to the available days. Two days is an example, not a fixed assumption.

## The eight-screen journey
1. **Landing:** retain the existing focused entry screen and example prompts. Its primary action carries the input into exam setup rather than going straight to results.
2. **Exam setup:** capture the module/exam subject and exam date on one short screen. Carry existing input forward; require no account or profiling questions.
3. **Topic selection:** show a small suggested topic checklist from the local subject dataset. Let students select, deselect and add a topic. Require at least one selection and retain it when navigating back.
4. **Resource matching/results:** reuse the three-book results layout and brief simulated matching state. Selected topics determine rankings, mapped chapters, coverage and reading estimates. Clearly distinguish uncovered topics rather than inventing a match. Allow students to add/remove books from their revision plan with immediate feedback and no duplicates.
5. **Book preview:** provide a shareable screen for the selected book/chapter, reusing existing reader tools. Show only its first paragraph before subscription, with the remainder unavailable behind a clear gate. Preserve chapter choice, notes, highlights and settings when continuing.
6. **Subscription gate:** retain the single-screen simulated signup/payment experience. UniDays remains the dominant sign-in option; Google/Apple sign-in and card/Google Pay/Apple Pay remain mock options. Successful confirmation unlocks the selected material and proceeds to the revision plan; no real authentication or charges.
7. **Study plan dashboard:** show the books actually added and chapters mapped to the selected topics. Automatically include the resource chosen at the subscription gate if needed. Schedule relevant sessions across the time available until the exam; keep a clear next-session action and accurate progress. Use the existing simpler presentation for a single topic and full topic coverage for multiple topics. Avoid fixed or contradictory time-saving claims; label estimates as estimates.
8. **Reader:** replace the current study-action alert with a focused reading screen containing the selected chapter's original mock content. Reuse text size, theme, bookmark, highlight, notes and chapter navigation. Starting a session marks it in progress; marking a chapter complete updates topic and plan progress. Resume the exact book/chapter and reading position from the dashboard.

## State and interaction rules
- Persist exam setup, selected topics, plan membership, current resource, simulated subscription, reading position, progress and reader settings in localStorage.
- Save bookmarks, notes and highlights per chapter rather than sharing them across unrelated books.
- Do not persist card numbers, expiry or CVC. Clearly label all sign-in and payment interactions as simulated.
- Back navigation and refresh retain meaningful inputs. Direct links recover safely when prerequisites are missing.
- Changes to subject/topics recalculate relevant matches and sessions without leaving stale or unrelated selections.
- Every visible CTA works, including log in as a simulated returning-user action; no alert-only study actions or decorative controls.
- No backend, external matching service, real payment service, catalogue browsing, additional personas or full e-reader features.

## Technical approach
- Keep the existing TanStack React client-side routing and React Context; do not replace the app framework.
- Reuse `/`, `/results`, `/signup` and `/study`; add `/setup`, `/topics`, `/preview` and `/reader` with matching file-based route IDs and unique page metadata.
- Extend the local TypeScript mock dataset with explicit topic-to-chapter mappings and enough fictional chapter text for meaningful reading. Reuse all three subject sets.
- Extend the current state provider, which currently uses in-memory React state, with versioned, validated localStorage hydration after mount and safe fallback for unavailable or invalid storage.
- Extract shared reader content/tools and small new screens only as needed; avoid regenerating or broadly refactoring existing UI.

## Incremental delivery and checks
1. Wire landing → setup → topics; verify forward/back navigation and refresh persistence.
2. Connect topics → three results → preview; verify topic-driven matching and plan additions/removals.
3. Connect simulated subscription → real plan membership → reader; verify the selected resource survives the gate.
4. Verify starting, resuming and completing sessions update persisted progress.
5. Run the complete journey on desktop and mobile, including keyboard navigation, empty input validation, single-topic selection, flexible dates, direct links and reloads. Check for runtime errors and dead CTAs.

**Acceptance:** a timed walkthrough reaches the selected chapter and starts a study session within five minutes, with the correct topics, books and progress preserved. Functional completion comes before extra visual polish; no secondary features are added.
