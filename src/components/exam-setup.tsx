import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from './perlego';
import { useOnboarding } from '@/lib/onboarding-context';
import { resultsFor } from '@/lib/mock-data';

export function JourneyFrame({children}:{children:ReactNode}) {return <main className="min-h-screen bg-paper"><Header back="/"/><section className="mx-auto max-w-2xl px-5 pb-20 pt-10 sm:pt-16">{children}</section></main>}
export function TopicsPage({edit}:{edit?:boolean|undefined}){
 const s=useOnboarding();const navigate=useNavigate();const [custom,setCustom]=useState('');
 const suggestions=resultsFor(s.query).books[0]?.topics.map(t=>t.label)??[];
 const all=Array.from(new Set([...suggestions,...s.topics]));
 const allTicked=all.length>0&&all.every(t=>s.topics.includes(t));
 // All suggested topics are ticked by default; anything already saved stays ticked too.
 useEffect(()=>{const missing=suggestions.filter(t=>!s.topics.includes(t));if(missing.length)s.setTopics([...s.topics,...missing]);},[]);
 const tickAll=()=>s.setTopics(all);
 const untickAll=()=>s.setTopics([]);
 return <JourneyFrame>{edit&&<><p className="text-sm font-semibold text-primary">Your revision topics</p><h1 className="mt-3 font-display text-4xl sm:text-5xl">Focus on what matters.</h1><p className="mt-4 text-muted-foreground">{s.query || 'Choose the topics on your exam.'}</p></>}{all.length>0&&<div className="mt-6 flex justify-end"><button type="button" onClick={allTicked?untickAll:tickAll} className="text-sm font-semibold text-primary underline-offset-4 hover:underline" aria-label={allTicked?'Untick all topics':'Tick all topics'}>{allTicked?'Untick all':'Tick all'}</button></div>}<div className="mt-2 divide-y divide-border border-y border-border">{all.map(t=><label key={t} className="flex cursor-pointer items-center gap-4 py-5 font-semibold"><input type="checkbox" className="size-5 accent-primary" checked={s.topics.includes(t)} onChange={()=>s.setTopics(s.topics.includes(t)?s.topics.filter(x=>x!==t):[...s.topics,t])}/>{t}</label>)}</div><form className="mt-6 flex gap-2" onSubmit={e=>{e.preventDefault();if(custom.trim()){s.setTopics(Array.from(new Set([...s.topics,custom.trim()])));setCustom('');}}}><input className="field min-w-0" aria-label="Add another topic" placeholder="Another topic…" value={custom} onChange={e=>setCustom(e.target.value)}/><Button variant="outline" aria-label="Add topic" type="submit"><Plus size={20}/></Button></form><div className="mt-8 flex flex-wrap justify-between gap-3"><Button variant="ghost" onClick={()=>navigate({to:'/'})}>Back to search</Button><Button disabled={!s.topics.length} onClick={()=>navigate({to:'/results'})}>Find my chapters ({s.topics.length}) <ArrowRight size={18}/></Button></div></JourneyFrame>
}
