import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useLite } from '../../hooks/useMediaQuery';
import { Icon } from '../ui/Icon';
import type { IconName } from '../ui/Icon';

/* ---------- layout of the 3D stage (design pixels, scaled to fit) ---------- */
type CardDef = { id: string; label: string; icon: IconName; x: number; y: number; w: number; h: number; z: number; dur: number; delay: number; body: ReactNode };

const bars = (vals: number[]) => (
  <div className="mt-3 flex h-11 items-end gap-1.5">
    {vals.map((v, i) => (
      <span key={i} className="w-full origin-bottom rounded-[3px] bg-gradient-to-t from-azure to-aqua animate-bar" style={{ height: `${v}%`, animationDelay: `${i * 140}ms` }} />
    ))}
  </div>
);

const Row = ({ a, b, live }: { a: string; b: string; live?: boolean }) => (
  <div className="flex items-center justify-between gap-2 text-[11px]">
    <span className="truncate text-mist/90">{a}</span>
    <span className={`flex items-center gap-1 font-mono text-[10px] ${live ? 'text-aqua' : 'text-steel'}`}>
      {live && <span className="h-1.5 w-1.5 rounded-full bg-aqua animate-blink" />}
      {b}
    </span>
  </div>
);

const bodies: Record<string, ReactNode> = {
  data: (
    <div className="mt-3 space-y-2">
      <Row a="orders.csv" b="12.4k rows" />
      <Row a="crm_sync" b="live" live />
      <Row a="tickets" b="8.1k rows" />
    </div>
  ),
  documents: (
    <div className="mt-3 space-y-1.5">
      <div className="h-1.5 w-11/12 rounded-full bg-white/12" />
      <div className="h-1.5 w-8/12 rounded-full bg-white/12" />
      <div className="inline-block rounded-md bg-aqua/15 px-2 py-0.5 font-mono text-[10px] text-aqua ring-1 ring-aqua/30">Renewal: 14 Nov</div>
      <div className="h-1.5 w-10/12 rounded-full bg-white/12" />
    </div>
  ),
  analytics: bars([38, 55, 44, 70, 62, 84, 96]),
  insight: (
    <div className="mt-2.5">
      <p className="text-[13px] font-medium leading-snug text-white">Support response time decreased 28% this month.</p>
      <div className="mt-2.5 flex items-center gap-2 text-[10px] text-steel">
        <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-violet-200">3 sources</span>
        <span className="text-aqua">View insight</span>
      </div>
    </div>
  ),
  automation: (
    <div className="mt-3 flex items-center gap-1.5 text-[10px]">
      <span className="rounded-md bg-white/8 px-1.5 py-1 text-mist/90">New ticket</span>
      <span className="h-px w-3 bg-aqua/70" />
      <span className="rounded-md bg-white/8 px-1.5 py-1 text-mist/90">Classify</span>
      <span className="h-px w-3 bg-aqua/70" />
      <span className="rounded-md bg-aqua/15 px-1.5 py-1 text-aqua">Route</span>
    </div>
  ),
  reports: (
    <div className="mt-2.5 space-y-1.5">
      <div className="h-2 w-7/12 rounded-full bg-white/25" />
      <div className="h-1.5 w-full rounded-full bg-white/10" />
      <div className="h-1.5 w-10/12 rounded-full bg-white/10" />
      <div className="text-[10px] text-aqua">Weekly summary ready</div>
    </div>
  ),
};

const meta: Record<string, { label: string; icon: IconName; dur: number; delay: number }> = {
  data: { label: 'Data', icon: 'database', dur: 6.4, delay: 0 },
  documents: { label: 'Documents', icon: 'file', dur: 7.2, delay: 0.8 },
  analytics: { label: 'Analytics', icon: 'chart', dur: 5.8, delay: 0.4 },
  insight: { label: 'Insights', icon: 'sparkle', dur: 6.8, delay: 1.2 },
  automation: { label: 'Automation', icon: 'bolt', dur: 7.6, delay: 0.2 },
  reports: { label: 'Reports', icon: 'report', dur: 6.1, delay: 1.0 },
};

const pos = (id: string, x: number, y: number, w: number, h: number, z: number): CardDef => ({ id, x, y, w, h, z, ...meta[id], body: bodies[id] });

const FULL = {
  W: 640, H: 560, core: 200, rings: [330, 450],
  cards: [
    pos('data', 6, 36, 170, 118, 60),
    pos('documents', 0, 318, 176, 124, 30),
    pos('analytics', 452, 16, 176, 118, 90),
    pos('insight', 430, 236, 208, 132, 120),
    pos('automation', 128, 432, 184, 118, 70),
    pos('reports', 404, 426, 172, 118, 40),
  ],
};
const LITE = {
  W: 380, H: 430, core: 150, rings: [250],
  cards: [
    pos('data', 0, 10, 150, 104, 50),
    pos('analytics', 232, 18, 148, 104, 90),
    pos('automation', 0, 306, 170, 104, 60),
    pos('insight', 196, 292, 184, 124, 110),
  ],
};

function useStageScale(designW: number, max = 1.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / designW, max) || 1);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designW, max]);
  return { ref, scale };
}

function SceneCard({ c }: { c: CardDef }) {
  return (
    <div className="absolute" style={{ left: c.x, top: c.y, width: c.w, height: c.h, transform: `translateZ(${c.z}px)`, transformStyle: 'preserve-3d' }}>
      <div className="h-full w-full animate-float" style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }}>
        <div className="scene-card h-full w-full rounded-2xl p-3.5">
          <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.14em] text-steel">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white/[0.07] text-aqua">
              <Icon name={c.icon} size={14} />
            </span>
            {c.label}
          </div>
          {c.body}
        </div>
      </div>
    </div>
  );
}

type Props = { mx: MotionValue<number>; my: MotionValue<number> };

export function Scene({ mx, my }: Props) {
  const lite = useLite();
  const reduced = useReducedMotion();
  const cfg = lite ? LITE : FULL;
  const { ref, scale } = useStageScale(cfg.W);

  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 70, damping: 16 });
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 70, damping: 16 });
  const lx = useSpring(useTransform(mx, [-0.5, 0.5], [-140, 140]), { stiffness: 50, damping: 18 });
  const ly = useSpring(useTransform(my, [-0.5, 0.5], [-110, 110]), { stiffness: 50, damping: 18 });

  const cx = cfg.W / 2;
  const cy = cfg.H / 2 - 8;
  const plate = (size: number, z: number, cls: string) => (
    <div
      className={`absolute rounded-[28px] ${cls}`}
      style={{ width: size, height: size, left: cx - size / 2, top: cy - size / 2, transform: `translateZ(${z}px)` }}
    />
  );

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: cfg.H * scale }}
      role="img"
      aria-label="Illustration: the Nexa AI core connected to data, documents, analytics, insights, automation and reports"
    >
      {/* soft floor glow */}
      <div className="pointer-events-none absolute inset-x-[12%] bottom-0 h-24 rounded-full bg-azure/25 blur-3xl" />
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: cfg.W, height: cfg.H, transform: `translateX(-50%) scale(${scale})` }}
      >
        <div style={{ perspective: 1400, width: '100%', height: '100%' }}>
          <div className={`preserve-3d h-full w-full ${reduced ? '' : 'animate-sway'}`}>
            <motion.div className="preserve-3d relative h-full w-full" style={{ rotateX: rotX, rotateY: rotY }}>
              {/* connection lines (behind everything) */}
              <svg className="absolute inset-0 overflow-visible" width={cfg.W} height={cfg.H} style={{ transform: 'translateZ(-50px)' }} aria-hidden="true">
                {cfg.cards.map((c) => {
                  const tx = c.x + c.w / 2;
                  const ty = c.y + c.h / 2;
                  return (
                    <g key={c.id}>
                      <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="rgba(120,160,255,0.28)" strokeWidth="1" strokeDasharray="4 6" className={reduced ? '' : 'animate-dash'} />
                      {!reduced && (
                        <circle r="2.6" fill="#22D3EE">
                          <animateMotion dur={`${3 + (c.x % 5) * 0.3}s`} repeatCount="indefinite" path={`M${cx},${cy} L${tx},${ty}`} />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* cursor-following light */}
              <motion.div
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: cx - 150, top: cy - 150, width: 300, height: 300, x: lx, y: ly, z: -20,
                  background: 'radial-gradient(circle, rgba(140,120,255,0.22), transparent 65%)',
                }}
              />

              {/* orbit rings */}
              {cfg.rings.map((r, i) => (
                <div
                  key={r}
                  className="preserve-3d absolute"
                  style={{ width: r, height: r, left: cx - r / 2, top: cy - r / 2, transform: `rotateX(${72 - i * 6}deg) rotateY(${i ? 8 : -6}deg)` }}
                >
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  <div className={`absolute inset-0 ${i ? 'animate-orbit-rev' : 'animate-orbit'}`}>
                    <span className="absolute left-1/2 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-aqua shadow-[0_0_14px_#22D3EE]" />
                    {i === 0 && <span className="absolute bottom-0 left-1/2 -ml-[3px] -mb-[3px] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_#a78bfa]" />}
                  </div>
                </div>
              ))}

              {/* AI core: three stacked glass plates + glowing centre */}
              <div className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,rgba(110,90,255,0.55),rgba(37,99,235,0.18)_45%,transparent_70%)] blur-xl" style={{ width: cfg.core * 2, height: cfg.core * 2, left: cx - cfg.core, top: cy - cfg.core, transform: 'translateZ(-30px)' }} />
              {!reduced && (
                <>
                  <span className="pointer-events-none absolute rounded-full border border-aqua/40 animate-pulsering" style={{ width: cfg.core, height: cfg.core, left: cx - cfg.core / 2, top: cy - cfg.core / 2, transform: 'translateZ(-10px)' }} />
                  <span className="pointer-events-none absolute rounded-full border border-violet-300/40 animate-pulsering" style={{ width: cfg.core, height: cfg.core, left: cx - cfg.core / 2, top: cy - cfg.core / 2, transform: 'translateZ(-10px)', animationDelay: '1.8s' }} />
                </>
              )}
              {plate(cfg.core, -40, 'border border-white/10 bg-white/[0.03]')}
              {plate(cfg.core * 0.86, -16, 'border border-white/15 bg-[linear-gradient(160deg,rgba(60,80,200,0.25),rgba(20,26,50,0.5))]')}
              <div
                className="absolute grid place-items-center rounded-[26px] border border-white/25 shadow-[0_0_80px_rgba(90,100,255,0.5),inset_0_0_30px_rgba(255,255,255,0.1)]"
                style={{
                  width: cfg.core * 0.7, height: cfg.core * 0.7, left: cx - cfg.core * 0.35, top: cy - cfg.core * 0.35, transform: 'translateZ(24px)',
                  background: 'radial-gradient(circle at 50% 35%, rgba(150,120,255,0.75), rgba(37,99,235,0.45) 55%, rgba(10,14,30,0.95))',
                }}
              >
                <svg viewBox="0 0 64 64" className="h-[58%] w-[58%] drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" aria-hidden="true">
                  <g stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M16 48V16l32 32V16" />
                  </g>
                  <circle cx="16" cy="16" r="4.4" fill="#22D3EE" />
                  <circle cx="48" cy="48" r="4.4" fill="#22D3EE" />
                  <circle cx="48" cy="16" r="3" fill="#fff" />
                  <circle cx="16" cy="48" r="3" fill="#fff" />
                </svg>
              </div>

              {/* floating product cards */}
              {cfg.cards.map((c) => (
                <SceneCard key={c.id} c={c} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
