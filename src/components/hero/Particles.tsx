import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type P = { x: number; y: number; z: number; vx: number; vy: number; r: number; hue: number; tw: number };

/** Lightweight canvas particle field with depth parallax. Pauses off-screen / in background tabs. */
export function Particles({ count = 56, className = '' }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const parent = canvas.parentElement as HTMLElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let visible = true;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const hues = [210, 190, 260, 0];

    const parts: P[] = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), z: 0.25 + Math.random() * 0.75,
      vx: (Math.random() - 0.5) * 0.00006, vy: -0.00004 - Math.random() * 0.00009,
      r: 0.6 + Math.random() * 1.6, hue: hues[Math.floor(Math.random() * hues.length)], tw: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const color = (p: P, a: number) => (p.hue === 0 ? `rgba(235,240,255,${a})` : `hsla(${p.hue},95%,72%,${a})`);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const pts: [number, number, number][] = [];
      for (const p of parts) {
        if (!reduced) {
          p.x += p.vx * 16 * p.z;
          p.y += p.vy * 16 * p.z;
          if (p.y < -0.02) p.y = 1.02;
          if (p.x < -0.02) p.x = 1.02;
          if (p.x > 1.02) p.x = -0.02;
        }
        const px = p.x * w + (pointer.x - 0.5) * 46 * p.z;
        const py = p.y * h + (pointer.y - 0.5) * 30 * p.z;
        const a = (0.25 + 0.55 * p.z) * (0.65 + 0.35 * Math.sin(t * 0.0014 + p.tw));
        ctx.beginPath();
        ctx.fillStyle = color(p, a);
        ctx.arc(px, py, p.r * p.z * 1.3, 0, Math.PI * 2);
        ctx.fill();
        pts.push([px, py, p.z]);
      }
      // faint connections between near neighbours
      if (count <= 64) {
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i][0] - pts[j][0];
            const dy = pts[i][1] - pts[j][1];
            const d = dx * dx + dy * dy;
            if (d < 9000) {
              ctx.strokeStyle = `rgba(120,160,255,${(1 - d / 9000) * 0.14 * Math.min(pts[i][2], pts[j][2])})`;
              ctx.lineWidth = 0.6;
              ctx.beginPath();
              ctx.moveTo(pts[i][0], pts[i][1]);
              ctx.lineTo(pts[j][0], pts[j][1]);
              ctx.stroke();
            }
          }
        }
      }
    };

    const loop = (t: number) => {
      if (!running) return;
      draw(t);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(parent);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('visibilitychange', onVis);
    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [count, reduced]);

  return <canvas ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true" />;
}
