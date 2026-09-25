import type { PointerEvent } from 'react';

/** Sets --mx / --my on the element so CSS can draw a cursor-following highlight. */
export function spotlightHandler(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
