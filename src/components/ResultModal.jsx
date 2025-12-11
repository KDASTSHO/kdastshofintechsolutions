import React, { useEffect } from 'react';

export default function ResultModal({ open, winner, onClose }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !winner) return null;

  const accent = winner.color || '#22c55e';

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="result-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900/95 p-5 text-sm text-slate-100 shadow-2xl shadow-black/70"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 flex-shrink-0 rounded-full"
            style={{ background: accent }}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Result
            </p>
            <h2
              id="result-title"
              className="text-lg font-bold leading-tight text-slate-50"
            >
              {winner.name}
            </h2>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Segment ID:{' '}
          <span className="font-mono text-slate-200">{winner.id}</span>
        </p>

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Close
          </button>
        </div>
      </div>
     
    </div>
  
  );
}