import type { ReactNode } from 'react';
import { spotlightHandler } from '../../hooks/useSpotlight';

/** Glass card with a cursor-following highlight. */
export function SpotlightCard({ children, className = '', inner = '' }: { children: ReactNode; className?: string; inner?: string }) {
  return (
    <div className={`spotlight glass ${className}`} onPointerMove={spotlightHandler}>
      <div className={`relative z-10 h-full ${inner}`}>{children}</div>
    </div>
  );
}
