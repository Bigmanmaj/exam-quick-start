import { useNavigate, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './perlego';
import { useOnboarding } from '@/lib/onboarding-context';
import { resultsFor } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const courseFor = (query: string) => { const id = resultsFor(query).id; return id === 'law' ? 'LLB Law' : id === 'economics' ? 'BA Economics' : 'BSc Psychology'; };

export function LoginPage() {
  const s = useOnboarding();
  const navigate = useNavigate();
  const signIn = (provider: 'unidays' | 'google' | 'apple') => {
    const query = s.query.trim() || resultsFor('').prompt;
    if (!s.query.trim()) { s.setQuery(query); s.setTopics(resultsFor(query).books[0]?.topics.map((t) => t.label) ?? []); }
    s.setProvider(provider);
    s.patch({ name: s.name || 'Alex Morgan', email: s.email || 'alex.morgan@university.ac.uk', course: s.course || courseFor(query) });
    s.setSignedUp(true);
    navigate({ to: '/study' });
  };
  return <main className="min-h-screen bg-paper">
    <header className="mx-auto flex h-18 w-full max-w-7xl items-center px-5 sm:px-8"><Logo /></header>
    <section className="mx-auto max-w-lg px-5 pb-20 pt-8 sm:px-8">
      <p className="text-sm font-semibold text-primary">Welcome back</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Log in to your dashboard.</h1>
      <p className="mt-4 text-muted-foreground">Use the account you signed up with. Sign-in is simulated for this prototype.</p>
      <div className="mt-8 grid gap-3 rounded-lg border border-border bg-background p-5 shadow-warm sm:p-7">
        <Button size="lg" onClick={() => signIn('unidays')} className={cn('h-auto min-h-14 flex-col gap-1 py-3', s.provider === 'unidays' && 'ring-4 ring-ring')}><span className="rounded bg-background/20 px-2 py-0.5 text-[10px]">Student discount applied</span>Continue with UniDays</Button>
        <Button variant="outline" onClick={() => signIn('google')} className={cn(s.provider === 'google' && 'border-primary')}>G&nbsp; Continue with Google</Button>
        <Button variant="outline" onClick={() => signIn('apple')} className={cn(s.provider === 'apple' && 'border-primary')}>●&nbsp; Continue with Apple</Button>
        <p className="mt-2 text-center text-xs text-muted-foreground">Any of these takes you straight to your personalised dashboard.</p>
      </div>
      <p className="mt-7 text-sm text-muted-foreground">No account yet? <Link to="/" className="underline">Search for your study material</Link> — you only sign up once you've seen what's relevant.</p>
      <p className="mt-3 text-sm"><Link to="/study" className="inline-flex items-center gap-1 font-semibold text-primary underline">Go to my dashboard <ArrowRight size={15} /></Link></p>
    </section>
  </main>;
}
