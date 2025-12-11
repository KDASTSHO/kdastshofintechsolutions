import React, { useEffect } from 'react';

export default function Modal({ isOpen, onClose, card }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKey(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen || !card) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/95 p-4 shadow-2xl shadow-black/60 outline-none transition-transform duration-200 ease-out animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition hover:bg-slate-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="Close details"
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <img
              src={card.imageUrl}
              alt={card.title}
              loading="lazy"
              className="h-56 w-full object-cover sm:h-64"
            />
          </div>
          <div className="space-y-1.5">
            <h2 id="modal-title" className="text-lg font-semibold text-slate-50 sm:text-xl">
              {card.title}
            </h2>
            <p className="text-sm text-slate-300">{card.subtitle}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="pt-2 text-xs text-slate-400">
            This is a mock detail view for demonstration only. In a real app, you might include
            creator info, license, download actions, and related items.
          </p>
        </div>
      </div>
    </div>
  );
}
