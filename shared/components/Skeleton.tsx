export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      className={`block animate-pulse rounded-md bg-zinc-800/80 ${className}`}
      aria-hidden="true"
    />
  );
}

export function FilmSkeleton() {
  return (
    <article
      className="film-project film-project-skeleton lazy-panel"
      aria-hidden="true"
    >
      <div className="film-project-media">
        <Skeleton className="h-72 w-full rounded-none bg-zinc-800/80" />
      </div>
      <div className="film-project-info gap-3">
        <Skeleton className="h-3 w-20 rounded-full" />
        <Skeleton className="h-8 w-3/4 rounded-full" />
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="h-4 w-5/6 rounded-full" />
        <Skeleton className="h-3 w-32 rounded-full" />
      </div>
    </article>
  );
}

export function ServiceSkeleton() {
  return (
    <div
      className="service-row service-row-skeleton lazy-panel"
      aria-hidden="true"
    >
      <Skeleton className="h-3 w-12 rounded-full" />
      <Skeleton className="h-6 w-2/3 rounded-full" />
      <Skeleton className="h-3 w-6 rounded-full" />
    </div>
  );
}

export function CardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`card-skeleton lazy-panel ${className}`} aria-hidden="true">
      <Skeleton className="h-full w-full min-h-[220px] rounded-none" />
    </div>
  );
}
