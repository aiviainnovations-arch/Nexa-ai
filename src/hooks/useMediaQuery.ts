import { useEffect, useState } from 'react';
import { site } from '../config/site';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false,
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True on small screens: use this to simplify 3D, particles and video. */
export function useLite(): boolean {
  const small = useMediaQuery(`(max-width: ${site.performance.liteBelow - 1}px)`);
  return site.performance.liteEnabled && small;
}

export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
