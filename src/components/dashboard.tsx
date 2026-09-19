import { useNavigate, Link } from '@tanstack/react-router';
import { ArrowRight, BookOpen, Check, Clock3, ListChecks, LogOut, Plus, Search, Sparkles, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from './perlego';
import { useOnboarding } from '@/lib/onboarding-context';
import { chapterTopics, findChapterByKey, matchedChapters, matchingBooks, resultSets, resultsFor, type Book } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const providerLabel = { email: 'Email', unidays: 'UniDays', google: 'Google', apple: 'Apple' } as const;
const paymentLabel = { card: 'Card (mock)', google: 'Google Pay (mock)', apple: 'Apple Pay (mock)' } as const;

function Spine({ book, className = '' }: { book: Book; className?: string }) {
  return <div className={cn('book-cover relative shrink-0 overflow-hidden rounded-sm p-3 text-left shadow-warm', `cover-${book.cover}`, 'h-32 w-[86px]', className)} aria-hidden="true">
    <div className="absolute inset-y-0 left-3 w-px bg-foreground/15" />
    <p className="relative ml-2 font-display text-sm leading-tight text-foreground">{book.title}</p>
  </div>;
}

export function DashboardPage() {
  const s = useOnboarding();
  const navigate = useNavigate();
  const [value, setValue] = useState(s.query);
  const firstName = (s.name.trim() || 'there').split(' ')[0];
  const recommendations = matchingBooks(s.query, s.topics);
  const shelf = resultSets.flatMap((set) => set.books).filter((b) => s.plan.includes(b.id));
  const sessions = shelf.flatMap((book) => matchedChapters(book, s.topics).map((chapter) => ({ book, chapter, key: `${book.id}:${chapter.number}` })));
  const minutes = sessions.reduce((n, x) => n + x.chapter.minutes, 0);
  const done = sessions.filter((x) => s.chapters[x.key]?.status === 'Done').length;
  const readingList = s.reading.flatMap((key) => { const found = findChapterByKey(key); return found ? [{ key, ...found }] : []; });
  const readingMinutes = readingList.reduce((n, x) => n + x.chapter.minutes, 0);
  const open = (book: Book, chapter?: Book['chapters'][number]) => { s.selectBook(book, chapter ?? matchedChapters(book, s.topics)[0] ?? book.chapters[0]); navigate({ to: '/reader' }); };
  const research = (event: FormEvent) => { event.preventDefault(); const next = value.trim(); if (!next) return; s.setQuery(next); s.setTopics(resultsFor(next).books[0]?.topics.map((t) => t.label) ?? []); navigate({ to: '/results' }); };
  const signOut = () => { s.setSignedUp(false); navigate({ to: '/' }); };

  return <main className="min-h-screen bg-paper">
    <header className="border-b border-border bg-background"><div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-5 px-5 sm:px-8"><Logo />
      <form onSubmit={research} className="hidden max-w-xl flex-1 items-center gap-2 rounded-lg border border-input bg-paper p-1.5 focus-within:ring-4 focus-within:ring-ring md:flex">
        <Search className="ml-2 shrink-0 text-muted-foreground" size={18} />
        <label className="sr-only" htmlFor="dashboard-search">Search your study material</label>
        <input id="dashboard-search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search a module, topic or textbook" className="min-w-0 flex-1 bg-transparent px-1 py-1.5 outline-none" />
        <Button type="submit" size="sm">Search</Button>
      </form>
      <div className="flex items-center gap-2"><span className="grid size-10 place-items-center rounded-full bg-primary font-ui text-sm font-extrabold text-primary-foreground" aria-hidden="true">{(s.name.trim() || 'Student').split(' ').map((p) => p[0]).slice(0, 2).join('')}</span><Button variant="ghost" onClick={signOut}>Log out <LogOut size={16} /></Button></div>
    </div></header>

    <section className="mx-auto max-w-7xl px-5 pb-20 pt-9 sm:px-8">
      <p className="text-sm font-semibold text-primary">Welcome to Perlego</p>
      <h1 className="mt-2 font-display text-4xl sm:text-5xl">Good to see you, {firstName}.</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Your student plan is active. Here's everything matched to “{s.query || 'your last search'}”.</p>

      <section className="mt-8 rounded-lg border border-border bg-background p-6 shadow-warm-lg sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="flex items-center gap-2 text-sm font-semibold text-primary"><ListChecks size={16} /> Your reading list</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">{readingList.length ? `${readingList.length} ${readingList.length === 1 ? 'chapter' : 'chapters'} lined up` : 'No chapters saved yet'}</h2>
            <p className="mt-2 text-muted-foreground">{readingList.length ? `About ${readingMinutes} min of focused reading in total.` : 'Add chapters from your search results or the recommendations below.'}</p></div>
          {readingList.length ? <Button onClick={() => { const next = readingList.find((x) => s.chapters[x.key]?.status !== 'Done') ?? readingList[0]; if (next) open(next.book, next.chapter); }}>Continue reading <ArrowRight size={17} /></Button> : <Button onClick={() => navigate({ to: '/results' })}>Find chapters <Search size={17} /></Button>}
        </div>
        {readingList.length ? <ul className="mt-6 divide-y divide-border border-t border-border">{readingList.map(({ key, book, chapter }) => <li key={key} className="flex flex-wrap items-center gap-4 py-4">
          <div className="min-w-0 flex-1"><p className="font-ui text-lg font-bold"><strong className="font-bold">Chapter {chapter.number}</strong> · {chapter.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{book.title} · {book.author}</p></div>
          <span className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 size={16} /> {chapter.minutes} min read</span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">{s.chapters[key]?.status ?? 'Not started'}</span>
          <div className="flex gap-2"><Button size="sm" onClick={() => open(book, chapter)}>Read</Button>
            <Button size="sm" variant="ghost" aria-label={`Remove chapter ${chapter.number} of ${book.title} from your reading list`} onClick={() => s.removeReading(key)}>Remove <X size={15} /></Button></div>
        </li>)}</ul> : null}
      </section>

      <div className="mt-8 grid gap-4 border-y border-border py-7 sm:grid-cols-3">
        <div><p className="text-sm text-muted-foreground">Bookshelf</p><p className="mt-2 font-display text-3xl">{shelf.length} {shelf.length === 1 ? 'book' : 'books'}</p></div>
        <div><p className="text-sm text-muted-foreground">Relevant reading</p><p className="mt-2 font-display text-3xl">{minutes} min</p></div>
        <div><p className="text-sm text-muted-foreground">Chapters complete</p><p className="mt-2 font-display text-3xl">{done} of {sessions.length}</p><progress className="mt-3 h-2 w-full accent-primary" value={done} max={sessions.length || 1} /></div>
      </div>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="flex items-center gap-2 text-sm font-semibold text-primary"><Sparkles size={16} /> Based on your search</p><h2 className="mt-2 font-ui text-2xl font-bold">You might be interested in this</h2></div><Button variant="ghost" onClick={() => navigate({ to: '/results' })}>See all matches <ArrowRight size={17} /></Button></div>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">{recommendations.map((book) => <article key={book.id} className="flex flex-col rounded-lg border border-border bg-background p-5 shadow-warm transition hover:-translate-y-0.5 hover:shadow-warm-lg">
          <div className="flex gap-4"><Spine book={book} /><div className="min-w-0"><span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">{book.match}% match</span><h3 className="mt-3 font-ui text-lg font-bold">{book.title}</h3><p className="mt-1 text-sm text-muted-foreground">{book.author}</p></div></div>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Clock3 size={16} /> {book.chapters.reduce((n, c) => n + c.minutes, 0)} min of relevant chapters</p>
          <div className="mt-4 grid gap-2">{book.chapters.map((chapter) => <button type="button" key={chapter.number} onClick={() => open(book, chapter)} className="text-left text-sm transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><strong>Chapter {chapter.number}</strong> · {chapter.title}</button>)}</div>
          <div className="mt-5 grid gap-2"><Button disabled={!book.chapters.length} onClick={() => open(book)}>Start reading <ArrowRight size={17} /></Button><Button variant="outline" onClick={() => s.toggleBook(book)}>{s.plan.includes(book.id) ? 'Remove from bookshelf' : 'Add to bookshelf'}</Button></div>
        </article>)}</div>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-ui text-2xl font-bold">Your bookshelf</h2><Button variant="ghost" onClick={() => navigate({ to: '/results' })}>Add a book <BookOpen size={17} /></Button></div>
        {shelf.length ? <div className="mt-5 grid gap-3">{shelf.map((book) => <article key={book.id} className="flex flex-wrap items-center gap-5 rounded-lg border border-border bg-background p-5">
          <Spine book={book} /><div className="min-w-0 flex-1"><h3 className="font-ui text-lg font-bold">{book.title}</h3><p className="mt-1 text-sm text-muted-foreground">{book.author} · {matchedChapters(book, s.topics).length} relevant chapters</p>
            <div className="mt-3 flex flex-wrap gap-2">{matchedChapters(book, s.topics).map((chapter) => <span key={chapter.number} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">Ch. {chapter.number} · {s.chapters[`${book.id}:${chapter.number}`]?.status ?? 'Not started'}</span>)}</div></div>
          <div className="grid gap-2"><Button onClick={() => open(book)}>Continue reading</Button><Button variant="ghost" onClick={() => s.toggleBook(book)}>Remove</Button></div>
        </article>)}</div> : <p className="mt-5 rounded-lg border border-border bg-background p-6 text-muted-foreground">Your bookshelf is empty. Add a recommendation above to keep it here.</p>}
      </section>

      {s.topics.length > 1 && <section className="mt-12"><h2 className="font-ui text-2xl font-bold">Topic coverage</h2><div className="mt-4 divide-y divide-border border-y border-border">{s.topics.map((topic) => { const linked = sessions.filter((x) => chapterTopics(x.book, x.chapter).includes(topic)); const status = linked.length && linked.every((x) => s.chapters[x.key]?.status === 'Done') ? 'Done' : linked.some((x) => s.chapters[x.key]?.status) ? 'In progress' : 'Not started'; return <div key={topic} className="flex flex-wrap items-center justify-between gap-3 py-4"><div><p className="font-semibold">{topic}</p><p className="mt-1 text-sm text-muted-foreground">{linked.length ? linked.map((x) => `${x.book.title}, Ch. ${x.chapter.number}`).join(' · ') : 'No matching chapter on your shelf'}</p></div><span className="text-sm text-muted-foreground">{linked.length ? status : 'Not covered'}</span></div>; })}</div></section>}

      <section className="mt-12 grid gap-5 lg:grid-cols-2">
        <article className="rounded-lg border border-border bg-background p-6"><h2 className="font-ui text-2xl font-bold">Account details</h2><dl className="mt-5 grid gap-4 text-sm">{[['Name', s.name || 'Not provided'], ['Email', s.email || 'Not provided'], ['University course', s.course || 'Not provided'], ['Signed in with', providerLabel[s.provider]], ['Payment method', paymentLabel[s.payment]]].map(([label, detail]) => <div key={label} className="flex flex-wrap justify-between gap-2 border-b border-border pb-3"><dt className="text-muted-foreground">{label}</dt><dd className="font-semibold">{detail}</dd></div>)}</dl></article>
        <article className="rounded-lg border border-border bg-background p-6"><h2 className="font-ui text-2xl font-bold">Your plan</h2><p className="mt-3 text-sm text-muted-foreground">Demo student plan — 14 days free, then £12 per month (placeholder). No real charge was made.</p><ul className="mt-5 grid gap-3 text-sm">{['Full chapter access', 'Notes, highlights and bookmarks', 'Recommendations matched to your topics'].map((x) => <li key={x} className="border-b border-border pb-3">{x}</li>)}</ul><p className="mt-5 text-sm text-muted-foreground">Need something else? <Link to="/results" className="underline">Run a new search</Link>.</p></article>
      </section>
    </section>
  </main>;
}
