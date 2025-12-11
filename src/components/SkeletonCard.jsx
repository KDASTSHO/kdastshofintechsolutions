import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm">
      <div className="relative h-40 w-full animate-pulse bg-slate-800 sm:h-48" />
      <div className="space-y-2 p-3.5 sm:p-4">
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
        <div className="flex gap-1.5 pt-1">
          <div className="h-5 w-12 animate-pulse rounded-full bg-slate-800" />
          <div className="h-5 w-10 animate-pulse rounded-full bg-slate-800" />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="h-7 w-16 animate-pulse rounded-full bg-slate-800" />
          <div className="flex gap-1.5">
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-800" />
            <div className="h-8 w-8 animate-pulse rounded-full bg-slate-800" />
            <div className="h-8 w-16 animate-pulse rounded-full bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
