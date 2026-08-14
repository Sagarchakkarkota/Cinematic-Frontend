export function Skeleton({ className = '' }: { className?: string }) {
  return <span className={`ui-skeleton ${className}`} aria-hidden="true" />
}

export function FilmSkeleton() {
  return <article className="film-project film-project-skeleton" aria-hidden="true">
    <div className="film-project-media"><Skeleton className="skeleton-fill" /></div>
    <div className="film-project-info">
      <Skeleton className="skeleton-line skeleton-line-small" />
      <Skeleton className="skeleton-line skeleton-line-title" />
      <Skeleton className="skeleton-line skeleton-line-copy" />
      <Skeleton className="skeleton-line skeleton-line-small" />
    </div>
  </article>
}

export function ServiceSkeleton() {
  return <div className="service-row service-row-skeleton" aria-hidden="true">
    <Skeleton className="skeleton-line skeleton-line-small" />
    <Skeleton className="skeleton-line skeleton-line-service" />
    <Skeleton className="skeleton-line skeleton-line-small" />
  </div>
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return <div className={`card-skeleton ${className}`} aria-hidden="true">
    <Skeleton className="skeleton-fill" />
  </div>
}
