import React from 'react';
import Card from './Card.jsx';
import SkeletonCard from './SkeletonCard.jsx';

export default function CardGrid({
  cards,
  likedMap,
  savedMap,
  onToggleLike,
  onToggleSave,
  onOpenDetails,
  isLoadingInitial
}) {
  const showSkeletons = isLoadingInitial && cards.length === 0;

  return (
    <section
      aria-label="Gallery cards"
      className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 lg:px-8"
    >
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Featured collections
        </h2>
        <p className="text-xs text-slate-500">
          {cards.length} result{cards.length === 1 ? '' : 's'}
        </p>
      </div>

      {showSkeletons ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : cards.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
          No cards match your search. Try another keyword or clear your query.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              isLiked={!!likedMap[card.id]}
              isSaved={!!savedMap[card.id]}
              onToggleLike={onToggleLike}
              onToggleSave={onToggleSave}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}
    </section>
  );
}
