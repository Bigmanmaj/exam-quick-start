# Real book library for search results

Replace the made-up sample books with the 30 books from your file, using their real covers, descriptions, subject areas, subtopics and tags to make search results and recommendations feel genuine.

## What changes for the student

**Search**
- Typing any subject, topic or book title (e.g. "behavioural economics", "learning", "climate", "Sapiens") now matches across all 30 books using their subject area, subtopics and tags.
- Suggested example searches on the landing page become real ones drawn from the library.

**Results page**
- Each result shows the real cover image, title, author, year, subject area and page count.
- A one-line description from the book sits under the title, so the student can judge relevance without opening it.
- Tag chips appear on each card; tags that match the search are highlighted.
- Relevance badge still reads "Covers X of your Y topics", now calculated from the book's subtopics.
- Chapters are generated from each book's subtopics (e.g. "Chapter 2 · Cognitive biases") with a page range derived from the real page count and an estimated reading time. Each stays individually clickable and addable to the reading list.
- A small "View on Google Books" link on each card opens the book's real Google Books page in a new tab.

**Preview / reader**
- Opening a chapter shows a first paragraph written from that book's description and subtopic, clearly marked as sample text, with the existing tools and paywall unchanged.

**Dashboard**
- "You might be interested in this" uses each saved book's related titles from your file, so recommendations connect sensibly instead of repeating the same three.
- Bookshelf and reading list show the real covers and reading times.

## Design elements picked up from the file
- Real cover art replaces the coloured placeholder blocks; a warm-grey frame with the existing two-layer shadow keeps the calm look.
- Subject area becomes a quiet indigo label; tags become hairline chips.
- Page count and reading time appear as small metadata, consistent across results, bookshelf and reading list.

## Technical notes
- Convert the CSV into a typed `src/lib/library.ts` (30 entries: id, title, author, year, category, subtopics, pageCount, description, tags, relatedIds, googleBooksPage, cover pointer).
- Download the 30 `cover_image_url` images, upload each with `lovable-assets`, and commit only the `.asset.json` pointers in `src/assets/covers/`; import them into the library module so covers always load.
- `src/lib/mock-data.ts` keeps its current exported shape (`Book`, `Chapter`, `resultsFor`, `matchingBooks`, `matchedChapters`, `chapterTopics`, `chapterParagraphs`, `findChapterByKey`) but is rebuilt on top of the library, so results, preview, reader, reading list and dashboard keep working without rewriting those screens.
  - `Book.cover` becomes an image URL instead of a colour name; `edition` becomes the publication year.
  - Chapters: one per subtopic, numbered from 2, page ranges split evenly across `page_count`, minutes ≈ pages × 1.5.
  - `resultsFor(query)` scores books by matches against category, subtopics, tags and title, returns the top 3–6 with their matched subtopics as topics.
  - `chapterParagraphs` composes sample study text from the book description plus subtopic, labelled as demo content.
- `ResultsPage`, `DashboardPage` and reader card visuals get cover images, description line and tag chips; no structural or flow changes. Related-book recommendations come from `relatedIds`.
- Broken cover images fall back to a warm-grey block with the title, so nothing ever renders empty.
