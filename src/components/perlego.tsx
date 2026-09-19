import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCircle2, Clock3, Highlighter, Minus, Plus, Search, Sparkles, X } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { examples, resultsFor, matchingBooks, type Book } from "@/lib/mock-data";
import { useOnboarding } from "@/lib/onboarding-context";

export function Logo() {
  return <Link to="/" className="font-ui text-xl font-extrabold text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">Perlego<span className="text-primary">.</span></Link>;
}

export function Header({ back }: { back?: "/" | "/results" | "/study" | "/topics" }) {
  const state = useOnboarding(); const navigate = useNavigate();
  return <header className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
    <div className="flex items-center gap-5">{back ? <Link to={back} aria-label="Go back" className="grid size-10 place-items-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"><ArrowLeft size={20} /></Link> : null}<Logo /></div>
    <Button variant="ghost" onClick={() => navigate({to: state.signedUp ? "/study" : "/signup"})}>{state.signedUp ? "Your revision plan" : "Log in (demo)"}</Button>
  </header>;
}

export function SearchHome() {
  const { query, setQuery, setTopics } = useOnboarding();
  const [value, setValue] = useState(query);
  const navigate = useNavigate();
  const start = (q: string) => { setQuery(q); setTopics(resultsFor(q).books[0]?.topics.map((t) => t.label) ?? []); navigate({ to: "/results" }); };
  const submit = (event?: FormEvent) => { event?.preventDefault(); if (!value.trim()) return; start(value.trim()); };
  return <main className="min-h-screen bg-paper">
    <Header />
    <section className="mx-auto flex min-h-[calc(100vh-72px)] max-w-5xl flex-col items-center px-5 pt-[11vh] text-center sm:px-8">
      <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary"><Sparkles size={15} /> Perlego Exam Sprint · Demo</div>
      <h1 className="max-w-4xl font-display text-5xl leading-[1.03] sm:text-7xl">Exam coming up? Find exactly what to revise.</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Tell us your module or topics. We’ll find the chapters that matter, so you can start with confidence.</p>
      <form onSubmit={submit} className="mt-10 flex w-full max-w-3xl items-center gap-2 rounded-lg border border-input bg-background p-2 shadow-warm focus-within:ring-4 focus-within:ring-ring">
        <Search className="ml-3 shrink-0 text-muted-foreground" size={22} />
        <label className="sr-only" htmlFor="study-search">What do you need to revise?</label>
        <input id="study-search" value={value} onChange={(e) => setValue(e.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none sm:text-lg" placeholder="Enter your exam topics…" />
        <Button type="submit" size="lg" className="hidden sm:inline-flex">Find my chapters <ArrowRight size={18} /></Button>
        <Button type="submit" size="icon" aria-label="Find my chapters" className="sm:hidden"><ArrowRight size={18} /></Button>
      </form>
      <div className="mt-7 flex max-w-4xl flex-wrap justify-center gap-2.5">{examples.map((example) => <button key={example} onClick={() => { setValue(example); start(example); }} className="rounded-full border border-border bg-background px-4 py-2.5 text-left text-sm text-secondary-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">{example}</button>)}</div>
      <p className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"><Check size={16} className="text-success" /> No account needed to see your matches</p>
    </section>
  </main>;
}

function Cover({ book, small = false }: { book: Book; small?: boolean }) {
  return <div className={cn("book-cover relative shrink-0 overflow-hidden rounded-sm p-3 text-left shadow-warm", `cover-${book.cover}`, small ? "h-32 w-[86px]" : "h-48 w-32")} aria-hidden="true"><div className="absolute inset-y-0 left-3 w-px bg-foreground/15"/><p className="relative ml-2 font-display text-lg leading-tight text-foreground">{book.title}</p><p className="relative ml-2 mt-3 text-[10px] font-bold uppercase text-foreground/70">{book.author}</p></div>;
}

export function ResultsPage() {
  const { query, topics, selectBook, toggleBook, plan } = useOnboarding();
  const books = matchingBooks(query, topics);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 1500); return () => window.clearTimeout(timer); }, [query]);
  const choose = (book: Book, chapter?: Book["chapters"][number]) => { selectBook(book, chapter ?? book.chapters[0]); navigate({ to: "/preview" }); };
  return <main className="min-h-screen bg-paper"><Header back="/" /><section className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
    <p className="text-sm font-semibold text-primary">Your study matches</p><h1 className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">The fastest route through “{query}”</h1>
    {loading ? <LoadingResults /> : <><div className="mt-7 flex items-start gap-3 border-y border-border py-5 text-base"><Sparkles className="mt-0.5 shrink-0 text-primary" size={20}/><p>3 sample books, matched to {topics.length} selected topics. {books[0]?.match ? "Start with #1 for the closest match." : "No matching chapters yet — try adjusting your topics."} <Link to="/topics" search={{edit:true}} className="underline">Edit topics</Link></p></div>
    <div className="mt-7 grid gap-5">{books.map((book, index) => <article key={book.id} className="result-card grid gap-6 rounded-lg border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:shadow-warm-lg sm:grid-cols-[128px_1fr_auto] sm:p-6">
      <button type="button" onClick={() => choose(book)} aria-label={`Open ${book.title} at chapter one`} className="cursor-pointer text-left transition hover:opacity-80"><Cover book={book}/></button><div className="min-w-0 cursor-pointer" onClick={() => choose(book)}><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">{book.match}% match</span>{index === 0 && <span className="rounded-full bg-success-soft px-2.5 py-1 text-xs font-bold text-success">Best place to start</span>}</div><h2 className="mt-3 font-ui text-xl font-bold">{book.title}</h2><p className="mt-1 text-sm text-muted-foreground">{book.author} · {book.edition}</p>
      <div className="mt-5 grid gap-2">{book.chapters.map((chapter) => <button type="button" key={chapter.number} onClick={(e) => { e.stopPropagation(); choose(book, chapter); }} className="flex flex-wrap items-center justify-between gap-2 rounded-sm text-left text-sm transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><span className="underline decoration-transparent underline-offset-4 transition hover:decoration-primary"><strong>Chapter {chapter.number}</strong> · {chapter.title}</span><span className="text-muted-foreground">pp. {chapter.pages}</span></button>)}</div>
      <p className="mt-5 text-xs font-bold uppercase text-muted-foreground">Topics covered</p><div className="mt-2 flex flex-wrap gap-2">{book.topics.map((topic) => <span key={topic.label} className={cn("rounded-full px-2.5 py-1 text-xs font-medium", topic.covered ? "bg-success-soft text-success" : "bg-muted text-muted-foreground")}><span aria-hidden="true">{topic.covered ? "✓" : "×"}</span> {topic.label}</span>)}</div></div>
      <div className="flex min-w-44 flex-col justify-between gap-5 border-t border-border pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0"><p className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 size={17}/> {book.chapters.reduce((n, c) => n + c.minutes, 0)} min reading</p><div className="grid gap-2"><Button disabled={!book.chapters.length} onClick={() => choose(book)}>Preview chapter <ArrowRight size={17}/></Button><Button variant="outline" disabled={!book.chapters.length} onClick={() => toggleBook(book)}>{plan.includes(book.id) ? "Remove from plan" : "Add to revision plan"}</Button></div></div>
    </article>)}</div></>}
  </section></main>;
}

function LoadingResults() { return <div className="mt-8 grid gap-5" aria-live="polite"><p className="flex items-center gap-2 font-semibold"><Sparkles className="animate-pulse text-primary"/> Analysing your topics…</p>{[1,2,3].map(i => <div key={i} className="h-64 animate-pulse rounded-lg border border-border bg-background"><div className="m-6 h-5 w-2/5 rounded bg-muted"/><div className="m-6 h-3 w-3/5 rounded bg-muted"/></div>)}</div> }

export function SignupPage() {
  const state = useOnboarding();
  const { selectedBook: book, selectedChapter: chapter, provider, setProvider, payment, setPayment, setSignedUp, addBook } = state;
  const {name,email,course} = state;
  const setName=(name:string)=>state.patch({name}); const setEmail=(email:string)=>state.patch({email}); const setCourse=(course:string)=>state.patch({course});
  const [card, setCard] = useState(""); const [expiry, setExpiry] = useState(""); const [cvc, setCvc] = useState(""); const [error, setError] = useState(""); const [busy, setBusy] = useState(false); const navigate = useNavigate();
  const chooseProvider = (next: typeof provider) => { setProvider(next); if (next !== "email") { setName("Alex Morgan"); setEmail("alex.morgan@university.ac.uk"); setCourse(resultsFor(state.query).id === "law" ? "LLB Law" : resultsFor(state.query).id === "economics" ? "BA Economics" : "BSc Psychology"); } };
  const submit = (e: FormEvent) => { e.preventDefault(); if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !course.trim() || (payment === "card" && (!/^\d{16}$/.test(card.replace(/\s/g,"")) || !/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(expiry) || !/^\d{3,4}$/.test(cvc)))) { setError("Enter your name, a valid email and course. For card payment, use 16 digits, MM/YY and a 3–4 digit CVC."); return; } setError(""); setBusy(true); window.setTimeout(() => { addBook(book); setSignedUp(true); navigate({ to: "/study" }); }, 1000); };
  return <main className="min-h-screen bg-paper"><Header back="/results"/><div className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 pt-7 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
    <aside className="lg:sticky lg:top-8 lg:self-start"><p className="text-sm font-semibold text-primary">Ready to study in under a minute</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">Your fastest route is ready.</h1><div className="mt-8 flex gap-5 border-y border-border py-6"><Cover book={book} small/><div><p className="font-ui text-lg font-bold">{book.title}</p><p className="mt-1 text-sm text-muted-foreground">Chapter {chapter.number}: {chapter.title}</p><p className="mt-3 flex items-center gap-2 text-sm"><Clock3 size={16}/> {chapter.minutes} min focused reading</p></div></div><ul className="mt-6 grid gap-3 text-sm">{["Full book and chapter access", "Your personalised revision plan", "Notes, highlights and bookmarks"].map(x => <li key={x} className="flex gap-2"><CheckCircle2 size={18} className="text-success"/>{x}</li>)}</ul></aside>
    <section className="rounded-lg border border-border bg-background p-5 shadow-warm sm:p-8"><h2 className="font-ui text-2xl font-bold">Start your student plan</h2><p className="mt-2 text-sm text-muted-foreground">Demo plan: 14 days free, then £12 per month (placeholder). Cancel anytime. Sign-in is simulated.</p>
      <div className="mt-6 grid gap-3"><Button size="lg" onClick={() => chooseProvider("unidays")} className={cn("h-auto min-h-14 flex-col gap-1 py-3", provider === "unidays" && "ring-4 ring-ring")}><span className="rounded bg-background/20 px-2 py-0.5 text-[10px]">Student discount applied</span>Continue with UniDays</Button><div className="grid gap-3 sm:grid-cols-2"><Button variant="outline" onClick={() => chooseProvider("google")} className={cn(provider === "google" && "border-primary ring-4 ring-ring")}>G&nbsp; Continue with Google</Button><Button variant="outline" onClick={() => chooseProvider("apple")} className={cn(provider === "apple" && "border-primary ring-4 ring-ring")}>●&nbsp; Continue with Apple</Button></div></div>
      <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border"/><Button type="button" variant="ghost" size="sm" onClick={()=>setProvider("email")}>or sign up with email</Button><span className="h-px flex-1 bg-border"/></div>
      <form onSubmit={submit} noValidate><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" value={name} onChange={setName} placeholder="Alex Morgan"/>{provider === "email" && <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@university.ac.uk"/>}<label className="sm:col-span-2"><span className="field-label">University course</span><input list="courses" value={course} onChange={(e) => setCourse(e.target.value)} className="field" placeholder="Search courses…"/><datalist id="courses"><option>BSc Psychology</option><option>LLB Law</option><option>BA Economics</option><option>BSc Computer Science</option></datalist></label></div>
      <fieldset className="mt-7"><legend className="font-ui text-lg font-bold">Payment</legend><p className="mt-1 text-xs text-muted-foreground">Mock payment — no real charge will be made.</p><div className="mt-4 grid grid-cols-3 gap-2">{(["card","google","apple"] as const).map(method => <button type="button" key={method} onClick={() => setPayment(method)} className={cn("h-12 rounded-md border text-sm font-semibold", payment === method ? "border-primary bg-primary-soft text-primary" : "border-input")}>{method === "card" ? "Card" : method === "google" ? "G Pay" : "● Pay"}</button>)}</div>{payment === "card" && <div className="mt-4 grid grid-cols-2 gap-4"><div className="col-span-2"><Field label="Card number" value={card} onChange={setCard} placeholder="4242 4242 4242 4242"/></div><Field label="Expiry" value={expiry} onChange={setExpiry} placeholder="MM / YY"/><Field label="CVC" value={cvc} onChange={setCvc} placeholder="123"/></div>} {payment !== "card" && <div className="mt-4 rounded-md bg-muted p-4 text-sm">You’ll confirm this mock payment with {payment === "google" ? "Google Pay" : "Apple Pay"}. No account or charge is created.</div>}</fieldset>
      {error && <p className="mt-4 text-sm font-semibold text-destructive" role="alert">{error}</p>}<Button type="submit" size="lg" className="mt-6 w-full" disabled={busy}>{busy ? "Preparing your study plan…" : "Start studying now"}</Button><p className="mt-4 text-center text-xs text-muted-foreground">By continuing, you agree to this prototype’s mock terms.</p></form>
    </section></div></main>;
}

function Field({ label, value, onChange, placeholder, type="text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) { return <label><span className="field-label">{label}</span><input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}/></label>; }

export { StudyDashboard as StudyPage } from "./study-experience";
