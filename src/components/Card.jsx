import React, { useState } from 'react';

export default function Card({
  card,
  isLiked,
  isSaved,
  onToggleLike,
  onToggleSave,
  onOpenDetails
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm transition hover:-translate-y-1 hover:shadow-card focus-within:-translate-y-1 focus-within:shadow-card">
      <button
        type="button"
        onClick={() => onOpenDetails(card)}
        className="relative block text-left outline-none"
      >
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-800" aria-hidden="true" />
        )}
        <img
          src={card.imageUrl}
          alt={card.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-40 w-full object-cover transition duration-300 sm:h-48 ${
            imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />
      </button>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex-1 space-y-1.5">
          <h3 className="line-clamp-1 text-sm font-semibold text-slate-50 sm:text-base">
            {card.title}
          </h3>
          <p className="line-clamp-2 text-xs text-slate-300 sm:text-sm">{card.subtitle}</p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-[11px] text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onOpenDetails(card)}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-primary-500 hover:text-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View details
          </button>

          <div className="flex items-center gap-1.5">
            <IconToggleButton
              label={isLiked ? 'Unlike' : 'Like'}
              pressed={isLiked}
              onClick={() => onToggleLike(card.id)}
              activeColor="text-rose-400"
            >
              <HeartIcon filled={isLiked} />
            </IconToggleButton>

            <IconToggleButton
              label="Share"
              pressed={false}
              onClick={() => {
                if (navigator.share) {
                  navigator
                    .share({
                      title: card.title,
                      text: card.subtitle,
                      url: window.location.href
                    })
                    .catch(() => {});
                }
              }}
            >
              <ShareIcon />
            </IconToggleButton>

            <IconToggleButton
              label={isSaved ? 'Unsave' : 'Save'}
              pressed={isSaved}
              onClick={() => onToggleSave(card.id)}
              activeColor="text-emerald-400"
            >
              <BookmarkIcon filled={isSaved} />
            </IconToggleButton>
          </div>
        </div>
      </div>
    </article>
  );
}

function IconToggleButton({ children, label, pressed, onClick, activeColor }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-300 shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 hover:border-primary-500 hover:bg-slate-900 hover:text-primary-200 active:scale-90 ${
        pressed ? activeColor : ''
      }`}
    >
      <span className="transition-transform duration-150">{children}</span>
    </button>
  );
}

function HeartIcon({ filled }) {
  if (filled) {
    return (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
    );
  }
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M8.5 12l7-4m-7 4l7 4M19 5a2 2 0 11-4 0 2 2 0 014 0zM19 19a2 2 0 11-4 0 2 2 0 014 0zM9 12a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}

function BookmarkIcon({ filled }) {
  if (filled) {
    return (
      <svg
        className="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
      </svg>
    );
  }
  return (
    <svg
      className="h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14l-7-4-7 4V5z"
      />
    </svg>
  );
}
