import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/mock-data';

/** Ids whose remote artwork is known to be missing — these render the standard cover. */
const unavailableCoverIds = new Set<string>([]);

function StandardCover({ book, className }: { book: Book; className: string }) {
  return <div className={cn('relative flex shrink-0 flex-col overflow-hidden rounded-sm border border-border bg-muted p-3 text-left shadow-warm', className)}>
    <span className="text-[9px] font-bold uppercase text-primary">Perlego</span>
    <div className="my-auto h-px w-8 bg-primary" aria-hidden="true" />
    <p className="font-display text-sm leading-tight text-foreground">{book.title}</p>
    <p className="mt-2 text-[10px] font-bold uppercase text-muted-foreground">{book.author}</p>
  </div>;
}

/** Real cover artwork served from Google Books, with a standard title cover fallback. */
export function BookCover({ book, small = false, className = '' }: { book: Book; small?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  const size = small ? 'h-32 w-[86px]' : 'h-48 w-32';
  if (failed || !book.cover || unavailableCoverIds.has(book.id)) {
    return <StandardCover book={book} className={cn(size, className)} />;
  }
  return <img
    src={book.cover}
    alt={`Cover of ${book.title}`}
    loading="lazy"
    onError={() => setFailed(true)}
    className={cn('shrink-0 rounded-sm border border-border bg-muted object-cover shadow-warm', size, className)}
  />;
}
