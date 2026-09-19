import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bookmark, Check, CheckCircle2, ChevronDown, Clock3, Highlighter, Minus, Plus, Quote, Search, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
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

const testimonials = [
  { tag: "Speed to relevance", quote: "I had a Macroeconomics exam in two days and no idea which chapters mattered. I typed in the module name, and within a couple of minutes I was reading the exact topics on my syllabus. I didn't even have an account at that point.", name: "Priya S.", detail: "2nd year Economics" },
  { tag: "Confidence", quote: "My biggest worry was wasting my last 48 hours on the wrong material. Seeing that the results covered most of my revision topics up front settled that straight away. I stopped second-guessing and just started reading.", name: "Daniel O.", detail: "3rd year Psychology" },
  { tag: "No setup friction", quote: "I was not in the mood to fill in forms the night before an exam. I got to a real chapter first, and only signed up when I wanted to save my list of topics. That felt fair.", name: "Aisha K.", detail: "1st year Law" },
  { tag: "Focus under time pressure", quote: "With two days left I couldn't read whole textbooks. Being pointed to the chapters that matched my module let me focus on what was actually likely to come up.", name: "Tom W.", detail: "2nd year Business Management" },
  { tag: "Calm going in", quote: "I walked in feeling prepared rather than panicked. I knew what I had covered and what I hadn't, and that made the last day of revision far less stressful.", name: "Elena M.", detail: "3rd year Biology" },
  { tag: "Fast", quote: "Found my module's key chapters in minutes, not hours.", name: "Jamal R.", detail: "2nd year Computer Science" },
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.classList.add("is-visible");
        observer.unobserve(element);
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={cn("scroll-reveal", className)} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function LandingHeader() {
  const state = useOnboarding();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min((window.scrollY / distance) * 100, 100) : 0);
      setScrolled(window.scrollY > window.innerHeight * 0.55);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={cn("sticky top-0 z-40 bg-paper/90 transition-shadow", scrolled && "shadow-warm backdrop-blur-md")}>
    <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8"><Logo /><Button variant="ghost" onClick={() => navigate({to: state.signedUp ? "/study" : "/signup"})}>{state.signedUp ? "Your revision plan" : "Log in (demo)"}</Button></div>
    <div className="h-0.5 bg-border" aria-hidden="true"><div className="h-full bg-primary transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
  </header>;
}

export function SearchHome() {
  const { query, setQuery, setTopics } = useOnboarding();
  const [value, setValue] = useState(query);
  const navigate = useNavigate();
  const start = (q: string) => { setQuery(q); setTopics(resultsFor(q).books[0]?.topics.map((t) => t.label) ?? []); navigate({ to: "/results" }); };
  const submit = (event?: FormEvent) => { event?.preventDefault(); if (!value.trim()) return; start(value.trim()); };
  return <main className="min-h-screen overflow-x-hidden bg-paper">
    <LandingHeader />
    <section id="hero" className="mx-auto flex min-h-[78vh] max-w-5xl scroll-mt-20 flex-col items-center px-8 pt-[8vh] text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-sm font-semibold text-primary"><Sparkles size={15} /> Perlego Exam Sprint · Demo</div>
      <h1 className="max-w-4xl font-display text-7xl leading-[1.03]">Exam in two days? Find the right chapters in minutes.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Tell us your module. See the material that matches your topics before you sign up.</p>
      <form onSubmit={submit} className="mt-9 flex w-full max-w-3xl items-center gap-2 rounded-lg border border-input bg-background p-2 shadow-warm focus-within:ring-4 focus-within:ring-ring">
        <Search className="ml-3 shrink-0 text-muted-foreground" size={22} />
        <label className="sr-only" htmlFor="study-search">What do you need to revise?</label>
        <input id="study-search" value={value} onChange={(e) => setValue(e.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-3 text-lg outline-none" placeholder="Enter your module or textbook title" />
        <Button type="submit" size="lg">Show my study material <ArrowRight size={18} /></Button>
      </form>
      <div className="mt-7 flex max-w-4xl flex-wrap justify-center gap-2.5">{examples.map((example) => <button key={example} onClick={() => { setValue(example); start(example); }} className="rounded-full border border-border bg-background px-4 py-2.5 text-left text-sm text-secondary-foreground transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring">{example}</button>)}</div>
      <p className="mt-7 flex items-center gap-2 text-sm text-muted-foreground"><Check size={16} className="text-success" /> No sign-up needed to see what's relevant.</p>
      <a href="#student-stories" className="scroll-cue mt-auto mb-5 inline-flex flex-col items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring"><span>See what students say</span><ChevronDown size={20} aria-hidden="true" /></a>
    </section>
    {/* DEMO ONLY - REPLACE WITH REAL STUDENT QUOTES BEFORE LAUNCH */}
    <section id="student-stories" className="scroll-mt-20 border-y border-border bg-background py-20">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal><p className="text-sm font-bold text-primary">Student stories</p><h2 className="mt-3 max-w-3xl font-display text-5xl">Loved by students like you</h2><p className="mt-4 text-lg text-muted-foreground">Real revision situations, from students with exams round the corner.</p></Reveal>
        <div className="mt-10 grid grid-cols-3 gap-5">{testimonials.map((story, index) => <Reveal key={story.name} delay={index * 80} className="h-full"><article className="flex h-full min-h-80 flex-col rounded-lg border border-border bg-card p-6 shadow-warm"><Quote size={24} className="text-primary" aria-hidden="true"/><p className="mt-5 flex-1 leading-7 text-card-foreground">“{story.quote}”</p><div className="mt-7 flex items-end justify-between gap-4 border-t border-border pt-5"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft font-ui text-sm font-extrabold text-primary">{story.name.split(" ").map(part => part[0]).join("")}</span><span><strong className="block font-ui text-sm">{story.name}</strong><span className="text-xs text-muted-foreground">{story.detail}</span></span></div><span className="max-w-28 text-right text-xs font-bold text-primary">{story.tag}</span></div></article></Reveal>)}</div>
        <p className="mt-5 text-xs text-muted-foreground">Placeholder testimonials for demo purposes.</p>
        <div className="mt-10 text-center"><Button asChild variant="outline"><a href="#hero">Start with your module. No account needed <ArrowRight size={17}/></a></Button></div>
      </div>
    </section>
    <Reveal className="bg-paper"><section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-20 px-8 py-24"><p className="text-sm font-bold text-primary">A clear route forward</p><h2 className="mt-3 max-w-3xl font-display text-5xl">From exam panic to studying in three steps</h2><div className="mt-12 grid grid-cols-3 gap-10">{["Enter your module or textbook", "See which chapters cover your topics", "Start reading. Save your plan when you're ready"].map((step,index)=><div key={step} className="border-t border-border pt-5"><span className="font-display text-4xl text-primary">0{index+1}</span><p className="mt-5 max-w-xs font-ui text-lg font-bold">{step}</p></div>)}</div></section></Reveal>
    <Reveal className="border-y border-border bg-background"><section id="relevance-preview" className="mx-auto grid max-w-7xl scroll-mt-20 grid-cols-[0.8fr_1.2fr] items-center gap-20 px-8 py-24"><div><p className="text-sm font-bold text-primary">Proof before commitment</p><h2 className="mt-3 font-display text-5xl">See how well it matches your revision topics</h2><p className="mt-5 leading-7 text-muted-foreground">Check the coverage, relevant chapters and reading time before deciding whether to sign up.</p></div><article className="rounded-lg border border-border bg-card p-7 shadow-warm-lg"><div className="flex items-center justify-between"><span className="rounded-full bg-success-soft px-3 py-1.5 text-sm font-bold text-success">Covers 7 of your 9 topics</span><span className="text-sm text-muted-foreground">42 min reading</span></div><h3 className="mt-6 font-ui text-2xl font-bold">Macroeconomics in Context</h3><p className="mt-1 text-sm text-muted-foreground">Sample matched resource</p><div className="mt-6 divide-y divide-border border-y border-border">{["Chapter 3 · Economic growth", "Chapter 6 · Inflation and unemployment", "Chapter 9 · Fiscal policy"].map(chapter=><div key={chapter} className="flex items-center justify-between py-4"><span className="font-semibold">{chapter}</span><CheckCircle2 size={18} className="text-success"/></div>)}</div><Button className="mt-6">Open chapter <ArrowRight size={17}/></Button></article></section></Reveal>
    <Reveal className="bg-foreground text-background"><section id="final-cta" className="mx-auto max-w-5xl scroll-mt-20 px-8 py-24 text-center"><h2 className="font-display text-6xl">Your exam won't wait. Your revision can start now.</h2><Button asChild size="lg" className="mt-8"><a href="#hero">Find my study material <ArrowRight size={18}/></a></Button><p className="mt-5 text-sm text-background/70">Save your study plan when you're ready. No card needed to look.</p></section></Reveal>
    <footer id="footer" className="border-t border-border bg-paper"><div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8"><Logo/><nav aria-label="Footer" className="flex gap-7 text-sm text-muted-foreground"><a href="#hero" className="hover:text-primary">Help</a><a href="#hero" className="hover:text-primary">Privacy</a><a href="#hero" className="hover:text-primary">Terms</a></nav></div></footer>
  </main>;
}

function Cover({ book, small = false }: { book: Book; small?: boolean }) {
  return <div className={cn("book-cover relative shrink-0 overflow-hidden rounded-sm p-3 text-left shadow-warm", `cover-${book.cover}`, small ? "h-32 w-[86px]" : "h-48 w-32")} aria-hidden="true"><div className="absolute inset-y-0 left-3 w-px bg-foreground/15"/><p className="relative ml-2 font-display text-lg leading-tight text-foreground">{book.title}</p><p className="relative ml-2 mt-3 text-[10px] font-bold uppercase text-foreground/70">{book.author}</p></div>;
}

export function ResultsPage() {
  const { query, setQuery, topics, setTopics, selectBook, toggleBook, plan } = useOnboarding();
  const books = matchingBooks(query, topics);
  const [value, setValue] = useState(query);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), 1500); return () => window.clearTimeout(timer); }, [query]);
  const research = (event: FormEvent) => {
    event.preventDefault();
    const next = value.trim();
    if (!next) return;
    setValue(next);
    setQuery(next);
    setTopics(resultsFor(next).books[0]?.topics.map((t) => t.label) ?? []);
  };
  const choose = (book: Book, chapter?: Book["chapters"][number]) => { selectBook(book, chapter ?? book.chapters[0]); navigate({ to: "/preview" }); };
  return <main className="min-h-screen bg-paper"><Header back="/" /><section className="mx-auto max-w-7xl px-5 pb-20 pt-8 sm:px-8">
    <p className="text-sm font-semibold text-primary">Your study matches</p>
    <form onSubmit={research} className="mt-3 flex w-full max-w-3xl items-center gap-2 rounded-lg border border-input bg-background p-2 shadow-warm focus-within:ring-4 focus-within:ring-ring">
      <Search className="ml-3 shrink-0 text-muted-foreground" size={22} />
      <label className="sr-only" htmlFor="results-search">Your search</label>
      <input id="results-search" value={value} onChange={(e) => setValue(e.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-2 font-display text-2xl leading-tight text-foreground outline-none sm:text-4xl" aria-label="Your search query" />
      <Button type="submit" className="hidden shrink-0 sm:inline-flex">Search again <ArrowRight size={18} /></Button>
      <Button type="submit" size="icon" aria-label="Search again" className="shrink-0 sm:hidden"><ArrowRight size={18} /></Button>
    </form>
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
