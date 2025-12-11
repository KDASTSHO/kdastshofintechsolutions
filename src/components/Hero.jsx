import React from 'react';

export default function Hero({ onCtaClick }) {
  return (
    <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4 sm:space-y-5">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Curated visual collections
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            Discover stunning visuals tailored to your next project.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Browse a curated gallery of high-quality images with smart filters, quick previews, and
            saved favorites that sync to your device.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-slate-50 shadow-md shadow-primary-500/40 transition hover:bg-primary-500 hover:shadow-lg hover:shadow-primary-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-95"
            >
              Start exploring
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-500/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10.293 3.293a1 1 0 011.414 0L17 8.586a1 1 0 010 1.414l-5.293 5.293a1 1 0 01-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" />
                </svg>
              </span>
            </button>
            <p className="text-xs text-slate-400 sm:text-sm">
              No sign-up required. Your likes & saves stay on this device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
