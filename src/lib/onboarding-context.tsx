import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { z } from 'zod';
import { resultSets, resultsFor, type Book, type Chapter } from './mock-data';

const schema = z.object({
  query: z.string(), examDate: z.string(), topics: z.array(z.string()), plan: z.array(z.string()), reading: z.array(z.string()).default([]), bookId: z.string(), chapterNumber: z.number(),
  provider: z.enum(['email','unidays','google','apple']), payment: z.enum(['card','google','apple']), signedUp: z.boolean(),
  fontSize: z.number().min(15).max(24), theme: z.enum(['paper','sepia','ink']),
  chapters: z.record(z.string(), z.object({ bookmarked: z.boolean(), highlighted: z.boolean(), note: z.string(), position: z.number().min(0), status: z.enum(['Not started','In progress','Done']) })),
  name: z.string(), email: z.string(), course: z.string(),
});
type State = z.infer<typeof schema>;
const first = resultSets[0]?.books[0];
if (!first?.chapters[0]) throw new Error('Missing mock data');
const initial: State = { query: '', examDate: '', topics: [], plan: [], reading: [], bookId: first.id, chapterNumber: first.chapters[0].number, provider:'email', payment:'card', signedUp:false, fontSize:18, theme:'paper', chapters:{}, name:'', email:'', course:'' };
const emptyChapter = { bookmarked:false, highlighted:false, note:'', position:0, status:'Not started' as const };
function useStateModel() {
  const [state,setState] = useState<State>(initial);
  const [hydrated,setHydrated] = useState(false);
  useEffect(() => { try { const raw = localStorage.getItem('perlego-sprint-v1'); if(raw) { const parsed = schema.safeParse(JSON.parse(raw)); if(parsed.success) setState(parsed.data); } } catch {} setHydrated(true); },[]);
  useEffect(() => { if(hydrated) { try { localStorage.setItem('perlego-sprint-v1',JSON.stringify(state)); } catch {} } },[state,hydrated]);
  const patch = (value: Partial<State>) => setState(s=>({...s,...value}));
  const selectedBook = resultSets.flatMap(s=>s.books).find(b=>b.id===state.bookId) ?? first as Book;
  const selectedChapter = selectedBook.chapters.find(c=>c.number===state.chapterNumber) ?? selectedBook.chapters[0] as Chapter;
  const key = `${selectedBook.id}:${selectedChapter.number}`;
  const chapterState = state.chapters[key] ?? emptyChapter;
  const patchChapter = (value: Partial<typeof chapterState>) => setState(s=>({...s,chapters:{...s.chapters,[key]:{...(s.chapters[key]??emptyChapter),...value}}}));
  const selectBook = (book:Book, chapter=book.chapters[0]) => { if(chapter) patch({bookId:book.id,chapterNumber:chapter.number}); };
  const addBook = (book:Book) => setState(s=>({...s,plan:s.plan.includes(book.id)?s.plan:[...s.plan,book.id]}));
  const setQuery = (query:string) => setState(s=> query===s.query?s:{...s,query,topics:[],plan:[],bookId:resultsFor(query).books[0]?.id??s.bookId});
  const setTopics = (topics:string[]) => patch({topics,plan:[]});
  const readingKey = (book:Book, chapter:Chapter) => `${book.id}:${chapter.number}`;
  return { ...state, hydrated, patch, setQuery, setTopics, selectedBook, selectedChapter, selectBook, addBook, readingKey,
    isReading:(book:Book,chapter:Chapter)=>state.reading.includes(readingKey(book,chapter)),
    addReading:(book:Book,chapter:Chapter)=>setState(s=>{const k=readingKey(book,chapter);return s.reading.includes(k)?s:{...s,reading:[...s.reading,k]};}),
    toggleReading:(book:Book,chapter:Chapter)=>setState(s=>{const k=readingKey(book,chapter);return {...s,reading:s.reading.includes(k)?s.reading.filter(x=>x!==k):[...s.reading,k]};}),
    removeReading:(key:string)=>setState(s=>({...s,reading:s.reading.filter(x=>x!==key)})),
    toggleBook:(book:Book)=>setState(s=>({...s,plan:s.plan.includes(book.id)?s.plan.filter(id=>id!==book.id):[...s.plan,book.id]})),
    setProvider:(provider:State['provider'])=>patch({provider}), setPayment:(payment:State['payment'])=>patch({payment}), setSignedUp:(signedUp:boolean)=>patch({signedUp}),
    setFontSize:(fontSize:number)=>patch({fontSize}),setTheme:(theme:State['theme'])=>patch({theme}),
    ...chapterState, setBookmarked:(bookmarked:boolean)=>patchChapter({bookmarked}),setHighlighted:(highlighted:boolean)=>patchChapter({highlighted}),setNote:(note:string)=>patchChapter({note}),
    setPosition:(position:number)=>patchChapter({position}), startSession:()=>patchChapter({status:chapterState.status==='Done'?'Done':'In progress'}), completeChapter:()=>patchChapter({status:'Done'}),
  };
}
const Context = createContext<ReturnType<typeof useStateModel>|null>(null);
export function OnboardingProvider({children}:{children:ReactNode}) { const value=useStateModel(); return <Context.Provider value={value}>{children}</Context.Provider>; }
export function useOnboarding(){const value=useContext(Context);if(!value)throw new Error('Missing onboarding provider');return value;}
