import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/mock-data';

/** Real cover artwork served from Google Books, with a warm-grey fallback. */
export function BookCover({ book, small = false, className = '' }: { book: Book; small?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  const size = small ? 'h-32 w-[86px]' : 'h-48 w-32';
  if (failed || !book.cover) {
    return <div className={cn('relative shrink-0 overflow-hidden rounded-sm border border-border bg-muted p-3 text-left shadow-warm', size, className)}>
      <p className="font-display text-sm leading-tight text-foreground">{book.title}</p>
      <p className="mt-2 text-[10px] font-bold uppercase text-muted-foreground">{book.author}</p>
    </div>;
  }
  return <img
    src={book.cover}
    alt={`Cover of ${book.title}`}
    loading="lazy"
    onError={() => setFailed(true)}
    className={cn('shrink-0 rounded-sm border border-border bg-muted object-cover shadow-warm', size, className)}
  />;
}
