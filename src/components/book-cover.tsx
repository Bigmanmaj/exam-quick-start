import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/mock-data';
import placeholderCover from '@/assets/placeholder-cover.png';

/**
 * Real cover artwork served from Google Books. When the cover can't load
 * (or is missing), we fall back to a placeholder image with the title and
 * author overlaid in the empty lower band of the artwork.
 */
export function BookCover({ book, small = false, className = '' }: { book: Book; small?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false);
  const size = small ? 'h-32 w-[86px]' : 'h-48 w-32';

  if (failed || !book.cover) {
    return (
      <div className={cn('relative shrink-0 overflow-hidden rounded-sm border border-border shadow-warm', size, className)}>
        <img
          src={placeholderCover}
          alt={`Cover not available for ${book.title}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 px-2 pb-2 text-left">
          <p className="font-display text-[10px] leading-tight text-foreground">{book.title}</p>
          {!small && <p className="mt-0.5 text-[8px] font-bold uppercase tracking-wide text-muted-foreground">{book.author}</p>}
        </div>
      </div>
    );
  }

  return <img
    src={book.cover}
    alt={`Cover of ${book.title}`}
    loading="lazy"
    onError={() => setFailed(true)}
    className={cn('shrink-0 rounded-sm border border-border bg-muted object-cover shadow-warm', size, className)}
  />;
}
