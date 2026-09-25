import { useId } from 'react';
import { motion } from 'framer-motion';
import { scalePoints, smoothPath } from '../../lib/chart';

type Props = {
  values: number[];
  stroke?: string;
  fill?: boolean;
  /** Animate the line drawing in the first time it is seen */
  draw?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

export function Sparkline({ values, stroke = '#22D3EE', fill = true, draw = true, className = '', width = 160, height = 44 }: Props) {
  const id = 'sp' + useId().replace(/:/g, '');
  const pts = scalePoints(values, width, height, 3);
  const line = smoothPath(pts);
  const area = `${line} L${width},${height} L0,${height} Z`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity="0.32" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${id})`} />}
      {draw ? (
        <motion.path
          d={line} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
      ) : (
        <path d={line} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}
