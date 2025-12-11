import React from 'react';

export default function Pointer({
  ariaLabel = 'Spin wheel pointer',
  decorative = false
}) {
  return (
    <div
      className="pointer-events-none absolute -top-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      aria-hidden={decorative ? 'true' : 'false'}
      aria-label={decorative ? undefined : ariaLabel}
      role={decorative ? undefined : 'img'}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-300 shadow-md shadow-amber-500/70">
        <div className="h-3.5 w-3.5 rounded-full bg-white" />
      </div>
      <div className="h-7 w-0.5 bg-amber-300 shadow-sm shadow-amber-500/70" />
      <div
        className="h-4 w-4 origin-top rounded-b-full bg-amber-400 shadow-md shadow-amber-500/70"
        style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
      />
      <div className="mt-1 h-1 w-8 animate-pulse rounded-full bg-amber-400/70" />
    </div>
  );
}
