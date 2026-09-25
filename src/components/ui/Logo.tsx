import { useId } from 'react';

export function Logo({ size = 30, withWord = true }: { size?: number; withWord?: boolean }) {
  const id = 'nx' + useId().replace(/:/g, '');
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset=".5" stopColor="#2563EB" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
        <path d="M9 23V9l14 14V9" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="9" cy="9" r="2" fill="#fff" />
        <circle cx="23" cy="23" r="2" fill="#fff" />
      </svg>
      {withWord && <span className="font-display text-[15px] font-semibold tracking-[0.14em] text-white">NEXA AI</span>}
    </span>
  );
}
