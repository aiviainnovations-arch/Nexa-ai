import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { VideoSlot } from '../config/videos';
import { useLite } from '../hooks/useMediaQuery';

type Props = { slot: VideoSlot; className?: string; eager?: boolean };

/**
 * Premium video layer with graceful fallback:
 *  1. The poster image (with a slow camera drift) is always shown first.
 *  2. If the slot is enabled (see config/videos.ts), the <video> is only mounted when the section
 *     is near the viewport, fades in over the poster once it can play, and pauses when off-screen.
 *  3. Skipped entirely for reduced motion, data-saver mode and (by default) phones.
 * Fills its positioned parent. Purely decorative, so it is hidden from assistive tech.
 */
export function CinematicVideo({ slot, className = '', eager = false }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const near = useInView(wrap, { once: true, margin: '300px' });
  const visible = useInView(wrap, { margin: '80px' });
  const lite = useLite();
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  const saveData = typeof navigator !== 'undefined' && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  const allowed = slot.enabled && !reduced && !saveData && (!lite || slot.playOnMobile);
  const mount = allowed && near;

  useEffect(() => {
    const v = video.current;
    if (!v || !mount) return;
    v.muted = true;
    v.defaultMuted = true;
    if (visible) {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => undefined);
    } else {
      v.pause();
    }
  }, [mount, visible]);

  return (
    <div ref={wrap} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <img
        src={slot.poster}
        alt=""
        decoding="async"
        loading={eager ? 'eager' : 'lazy'}
        {...(eager ? { fetchPriority: 'high' as const } : {})}
        className={`h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100 animate-kenburns'}`}
      />
      {mount && (
        <video
          ref={video}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={slot.poster}
          onLoadedData={() => setReady(true)}
        >
          {slot.formats.includes('webm') && <source src={slot.src('webm')} type="video/webm" />}
          {slot.formats.includes('mp4') && <source src={slot.src('mp4')} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
