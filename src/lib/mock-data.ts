import { library, libraryById, type LibraryBook } from './library';

export type TopicCoverage = { label: string; covered: boolean };
export type Chapter = { number: number; title: string; pages: string; minutes: number; preview: string };
export type Book = {
  id: string;
  title: string;
  author: string;
  edition: string;
  match: number;
  cover: string;
  thumbnail: string;
  category: string;
  description: string;
  tags: string[];
  relatedIds: string[];
  pageCount: number;
  googleBooksPage: string;
  chapters: Chapter[];
  topics: TopicCoverage[];
};
export type ResultSet = { id: string; prompt: string; shortLabel: string; books: Book[] };

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Chapters are generated from each title's subtopics: even page ranges across the
// real page count, reading time at roughly 1.5 minutes per page. Demo data only.
const hash = (value: string) => {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) % 100000;
  return h;
};

function chaptersFor(entry: LibraryBook): Chapter[] {
  const count = Math.max(1, entry.subtopics.length);
  // Front matter, then the body of the book split across its subtopics.
  const body = Math.max(count * 12, entry.pageCount - 30);
  const stride = Math.floor(body / count);
  let cursor = 19 + (hash(entry.id) % 8);
  return entry.subtopics.map((subtopic, index) => {
    // Chapters are deliberately uneven: +/- 30% around the average length.
    const wobble = ((hash(`${entry.id}:${subtopic}`) % 61) - 30) / 100;
    const span = Math.min(46, Math.max(9, Math.round(stride * (1 + wobble))));
    const start = cursor;
    const end = start + span - 1;
    cursor = end + 1;
    return {
      number: index + 2,
      title: subtopic,
      pages: `${start}–${end}`,
      // ~1.6 minutes per page, rounded to the nearest 5 for a readable estimate.
      minutes: Math.max(10, Math.round((span * 1.6) / 5) * 5),
      preview: `${entry.description} This chapter focuses on ${subtopic.toLowerCase()}.`,
    };
  });
}

function toBook(entry: LibraryBook): Book {
  return {
    id: entry.id,
    title: entry.title,
    author: entry.author,
    edition: `${entry.year}`,
    match: 0,
    cover: entry.cover,
    thumbnail: entry.thumbnail,
    category: entry.category,
    description: entry.description,
    tags: entry.tags,
    relatedIds: entry.relatedIds,
    pageCount: entry.pageCount,
    googleBooksPage: entry.googleBooksPage,
    chapters: chaptersFor(entry),
    topics: entry.subtopics.map((label) => ({ label, covered: true })),
  };
}

export const books: Book[] = library.map(toBook);
export const bookById = new Map(books.map((b) => [b.id, b]));

const categories = [...new Set(library.map((entry) => entry.category))];

export const resultSets: ResultSet[] = categories.map((category) => {
  const set = books.filter((b) => b.category === category);
  return { id: slug(category), prompt: `${category} revision`, shortLabel: category, books: set };
});

export const examples = [
  'Thinking, Fast and Slow',
  'Behavioural economics and decision-making',
  'Climate change and sustainability',
  'Artificial intelligence and society',
];

const words = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);

function score(book: Book, terms: string[]) {
  if (!terms.length) return 0;
  const title = book.title.toLowerCase();
  const haystack = [book.category, ...book.topics.map((t) => t.label), ...book.tags, book.author].join(' ').toLowerCase();
  let total = 0;
  for (const term of terms) {
    if (title.includes(term)) total += 6;
    if (book.category.toLowerCase().includes(term)) total += 4;
    if (book.topics.some((t) => t.label.toLowerCase().includes(term))) total += 3;
    if (book.tags.some((tag) => tag.toLowerCase().includes(term))) total += 2;
    else if (haystack.includes(term)) total += 1;
  }
  return total;
}

/** Ranks the real library against a free-text query and returns the closest titles. */
export function resultsFor(query: string): ResultSet {
  const terms = words(query);
  const ranked = books
    .map((book) => ({ book, value: score(book, terms) }))
    .sort((a, b) => b.value - a.value);
  const hits = ranked.filter((entry) => entry.value > 0).slice(0, 4);
  const chosen = (hits.length >= 2 ? hits : ranked.slice(0, 3)).map((entry) => entry.book);
  const lead = chosen[0]!;
  const topics: string[] = [];
  for (const book of chosen) for (const topic of book.topics) if (!topics.includes(topic.label) && topics.length < 7) topics.push(topic.label);
  return {
    id: slug(lead.category),
    prompt: query.trim() || lead.title,
    shortLabel: lead.category,
    books: chosen.map((book) => ({ ...book, topics: topics.map((label) => ({ label, covered: book.topics.some((t) => t.label === label) })) })),
  };
}

export function chapterTopics(book: Book, chapter: Chapter) {
  return [chapter.title];
}

export function findChapterByKey(key: string) {
  const [bookId, number] = key.split(':');
  const book = bookById.get(bookId ?? '');
  const chapter = book?.chapters.find((c) => c.number === Number(number));
  return book && chapter ? { book, chapter } : null;
}

export function matchedChapters(book: Book, topics: string[]) {
  const matched = book.chapters.filter((c) => topics.includes(c.title));
  return matched.length ? matched : book.chapters;
}

export function matchingBooks(query: string, topics: string[]) {
  const active = topics.length ? topics : resultsFor(query).books[0]?.topics.map((t) => t.label) ?? [];
  const terms = words(query);
  const scored = resultsFor(query)
    .books.map((book) => {
      const own = book.topics.filter((t) => t.covered).map((t) => t.label);
      const covered = own.filter((label) => active.includes(label));
      // Scored against the book's own topics, not the pooled topic list, so a
      // short focused book is not punished for the breadth of the search.
      const depth = covered.length / Math.max(1, Math.min(own.length || active.length, active.length));
      const breadth = covered.length / Math.max(1, active.length);
      const text = Math.min(1, score(book, terms) / 18);
      const blend = depth * 0.5 + breadth * 0.25 + text * 0.25;
      // Nudged by a stable per-book offset so matches read as distinct scores.
      const jitter = (hash(`${book.id}:${active.length}`) % 9) - 4;
      const match = covered.length === 0 && text === 0 ? 0 : Math.min(98, Math.max(52, Math.round(blend * 100) + jitter));
      return {
        ...book,
        chapters: matchedChapters(book, active),
        topics: active.map((label) => ({ label, covered: covered.includes(label) })),
        match,
      };
    })
    .sort((a, b) => b.match - a.match);
  // Only surface confident matches; keep at least three results.
  const confident = scored.filter((book) => book.match >= 60);
  return confident.length >= 3 ? confident : scored.filter((book) => book.match > 0).slice(0, 3);
}

/** Sample study text. Composed from the published description — not the real book text. */
export function chapterParagraphs(book: Book, chapter: Chapter) {
  const entry = libraryById.get(book.id);
  const topic = chapter.title.toLowerCase();
  return [
    `${book.description} This chapter of ${book.title} concentrates on ${topic}, setting out the core ideas you are most likely to be examined on.`,
    `Use this chapter to build a definition of ${topic} in your own words, then attach one concrete example from ${book.author}'s argument to it. Examiners reward a clear mechanism and a worked example far more than a list of terms. (Sample study text for this prototype — the full chapter text sits behind Perlego's subscription.${entry ? ` Published ${entry.year}, ${entry.pageCount} pages.` : ''})`,
  ];
}
