import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useMediaQuery';

/** Large soft light that trails the cursor across the whole page. */
export function CursorGlow() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 80, damping: 20, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (!fine || reduced) return;
    const on = (e: globalThis.PointerEvent) => {
      x.set(e.clientX - 260);
      y.set(e.clientY - 260);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, [fine, reduced, x, y]);

  if (!fine || reduced) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-[1] h-[520px] w-[520px] rounded-full opacity-60"
      style={{
        x: sx,
        y: sy,
        background: 'radial-gradient(circle, rgba(70,90,255,0.16) 0%, rgba(124,58,237,0.07) 40%, transparent 70%)',
      }}
    />
  );
}
