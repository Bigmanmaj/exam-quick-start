import { useNavigate } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from './perlego';
import { useOnboarding } from '@/lib/onboarding-context';
import { resultsFor } from '@/lib/mock-data';

export function JourneyFrame({children}:{children:ReactNode}) {return <main className="min-h-screen bg-paper"><Header back="/"/><section className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:pt-16">{children}</section></main>}
export function SetupPage(){
 const s=useOnboarding();const navigate=useNavigate();const [error,setError]=useState('');
 const today=new Date().toLocaleDateString('en-CA');
 return <JourneyFrame><p className="text-sm font-semibold text-primary">Your exam</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">What are you preparing for?</h1><form className="mt-9 grid gap-6" onSubmit={e=>{e.preventDefault();if(!s.query.trim()||!s.examDate||new Date(s.examDate+'T23:59:59')<new Date()){setError('Enter your module and an exam date today or later.');return;}navigate({to:'/topics'});}}><label><span className="field-label">Module or exam subject</span><input className="field" value={s.query} onChange={e=>s.setQuery(e.target.value)} placeholder="e.g. Social psychology"/></label><label><span className="field-label">Exam date</span><input type="date" min={today} className="field" value={s.examDate} onChange={e=>s.patch({examDate:e.target.value})}/></label>{error&&<p role="alert" className="text-destructive">{error}</p>}<Button size="lg">Choose my topics <ArrowRight size={18}/></Button></form></JourneyFrame>
}
export function TopicsPage(){
 const s=useOnboarding();const navigate=useNavigate();const [custom,setCustom]=useState('');
 const suggestions=resultsFor(s.query).books[0]?.topics.map(t=>t.label)??[];
 const all=Array.from(new Set([...suggestions,...s.topics]));
 return <JourneyFrame><p className="text-sm font-semibold text-primary">Your revision topics</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">Focus on what matters.</h1><p className="mt-4 text-muted-foreground">{s.query || 'Choose the topics on your exam.'}</p><div className="mt-8 divide-y divide-border border-y border-border">{all.map(t=><label key={t} className="flex cursor-pointer items-center gap-4 py-5 font-semibold"><input type="checkbox" className="size-5 accent-primary" checked={s.topics.includes(t)} onChange={()=>s.setTopics(s.topics.includes(t)?s.topics.filter(x=>x!==t):[...s.topics,t])}/>{t}</label>)}</div><form className="mt-6 flex gap-2" onSubmit={e=>{e.preventDefault();if(custom.trim()){s.setTopics(Array.from(new Set([...s.topics,custom.trim()])));setCustom('');}}}><input className="field min-w-0" aria-label="Add another topic" placeholder="Another topic…" value={custom} onChange={e=>setCustom(e.target.value)}/><Button variant="outline" aria-label="Add topic" type="submit"><Plus size={20}/></Button></form><div className="mt-8 flex flex-wrap justify-between gap-3"><Button variant="ghost" onClick={()=>navigate({to:'/setup'})}>Back to exam</Button><Button disabled={!s.topics.length} onClick={()=>navigate({to:'/results'})}>Find my chapters ({s.topics.length}) <ArrowRight size={18}/></Button></div></JourneyFrame>
}
