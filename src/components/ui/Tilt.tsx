import { useEffect } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useFinePointer } from '../../hooks/useMediaQuery';

type Props = { children: ReactNode; className?: string; max?: number; baseX?: number; baseY?: number };

/** 3D card tilt that follows the pointer. Rests at (baseX, baseY) degrees. */
export function Tilt({ children, className = '', max = 5, baseX = 0, baseY = 0 }: Props) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const on = fine && !reduced;
  const rx = useMotionValue(baseX);
  const ry = useMotionValue(baseY);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  useEffect(() => {
    rx.set(baseX);
    ry.set(baseY);
  }, [baseX, baseY, rx, ry]);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(baseY + px * max * 2);
    rx.set(baseX - py * max * 2);
  };
  const leave = () => {
    rx.set(baseX);
    ry.set(baseY);
  };

  return (
    <motion.div
      className={className}
      style={{
        rotateX: on ? srx : baseX,
        rotateY: on ? sry : baseY,
        transformPerspective: 1800,
        transformStyle: 'preserve-3d',
      }}
      onPointerMove={on ? move : undefined}
      onPointerLeave={on ? leave : undefined}
    >
      {children}
    </motion.div>
  );
}
