import { useState } from 'react';
import type { PointerEvent } from 'react';
import { motion } from 'framer-motion';
import { analytics, analyticsRecs } from '../data/demo';
import type { RangeKey } from '../data/demo';
import { smoothPath } from '../lib/chart';
import type { Pt } from '../lib/chart';
import { useLite } from '../hooks/useMediaQuery';
import { Counter } from '../components/ui/Counter';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Tilt } from '../components/ui/Tilt';

const W = 640;
const H = 250;
const P = { l: 44, r: 12, t: 14, b: 26 };

function LineChart({ labels, current, previous }: { labels: string[]; current: number[]; previous: number[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const all = [...current, ...previous];
  const min = Math.min(...all) * 0.92;
  const max = Math.max(...all) * 1.05;
  const n = current.length;
  const x = (i: number) => P.l + (i * (W - P.l - P.r)) / (n - 1);
  const y = (v: number) => P.t + (1 - (v - min) / (max - min)) * (H - P.t - P.b);
  const cur = current.map((v, i) => [x(i), y(v)] as Pt);
  const prev = previous.map((v, i) => [x(i), y(v)] as Pt);
  const curPath = smoothPath(cur);
  const area = `${curPath} L${x(n - 1)},${H - P.b} L${x(0)},${H - P.b} Z`;
  const ticks = [0, 1, 2, 3].map((k) => min + ((max - min) * k) / 3);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const idx = Math.round(((px - P.l) / (W - P.l - P.r)) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, idx)));
  };

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full touch-pan-y" onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label="Line chart: automated resolutions this period compared with the previous period">
        <defs>
          <linearGradient id="an-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7C3AED" stopOpacity="0.35" /><stop offset="1" stopColor="#7C3AED" stopOpacity="0" /></linearGradient>
          <linearGradient id="an-line" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#22D3EE" /><stop offset="0.55" stopColor="#3B82F6" /><stop offset="1" stopColor="#8B5CF6" /></linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.06)" />
            <text x={P.l - 8} y={y(t) + 3.5} textAnchor="end" fontSize="10" fill="#8A94A8">{Math.round(t).toLocaleString('en-US')}</text>
          </g>
        ))}
        {labels.map((l, i) => (n <= 8 || i % 2 === 0) && (
          <text key={l} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#8A94A8">{l}</text>
        ))}
        <path d={smoothPath(prev)} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeDasharray="4 5" />
        <motion.path d={area} fill="url(#an-area)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }} />
        <motion.path d={curPath} fill="none" stroke="url(#an-line)" strokeWidth="2.6" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeOut' }} />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="rgba(255,255,255,0.2)" />
            <circle cx={x(hover)} cy={y(current[hover])} r="4.5" fill="#05070D" stroke="#22D3EE" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="pointer-events-none absolute top-1 -translate-x-1/2 rounded-lg border border-white/10 bg-ink/90 px-2.5 py-1.5 text-[11px] shadow-xl" style={{ left: `${(x(hover) / W) * 100}%` }}>
          <p className="text-steel">{labels[hover]}</p>
          <p className="font-mono text-white">{current[hover].toLocaleString('en-US')} <span className="text-steel">vs {previous[hover].toLocaleString('en-US')}</span></p>
        </div>
      )}
    </div>
  );
}

function BarChart({ bars }: { bars: { label: string; value: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div className="flex h-44 items-end gap-3" role="img" aria-label="Bar chart: tickets by root cause">
      {bars.map((b, i) => (
        <div key={b.label} className="flex h-full flex-1 flex-col justify-end" onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)}>
          <p className={`mb-1.5 text-center font-mono text-[11px] transition-opacity ${hover === i ? 'text-white opacity-100' : 'opacity-0'}`}>{b.value}</p>
          <motion.div
            className={`w-full origin-bottom rounded-t-md transition-colors ${hover === i ? 'bg-gradient-to-t from-azure to-aqua' : 'bg-gradient-to-t from-azure/60 to-iris/70'}`}
            style={{ height: `${(b.value / max) * 100}%` }}
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
          <p className="mt-2 text-center text-[11px] text-steel">{b.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Analytics() {
  const [range, setRange] = useState<RangeKey>('30D');
  const lite = useLite();
  const d = analytics[range];

  return (
    <section id="analytics" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading title={["See what's changing.", 'Know what to do next.']} body="Trends, comparisons and recommendations sit side by side, so the next step is never a separate question." />
          <div role="group" aria-label="Time range" className="flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
            {(Object.keys(analytics) as RangeKey[]).map((r) => (
              <button key={r} type="button" onClick={() => setRange(r)} aria-pressed={range === r} className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${range === r ? 'bg-white text-ink' : 'text-steel hover:text-white'}`}>{r}</button>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 [perspective:1800px]" y={26}>
          <Tilt baseX={lite ? 0 : 7} baseY={lite ? 0 : -6} max={3}>
            <div className="glass-solid rounded-[22px] p-4 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {d.kpis.map((k) => (
                  <div key={k.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <p className="text-xs text-steel">{k.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-2">
                      <p className="font-display text-3xl font-semibold tracking-tight text-white"><Counter key={range + k.id} to={k.value} decimals={k.decimals} suffix={k.suffix} duration={1.1} /></p>
                      <span className={`mb-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${k.good ? 'bg-aqua/10 text-aqua' : 'bg-amber-400/15 text-amber-200'}`}>
                        <Icon name={k.delta >= 0 ? 'trend-up' : 'trend-down'} size={11} />{Math.abs(k.delta)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-3 lg:grid-cols-[1.7fr_1fr]">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-white">Automated resolutions</p>
                    <p className="flex items-center gap-3 text-[11px] text-steel">
                      <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-gradient-to-r from-aqua to-iris" />This period</span>
                      <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded border-t border-dashed border-white/40" />Previous</span>
                    </p>
                  </div>
                  <LineChart key={range} labels={d.labels} current={d.current} previous={d.previous} />
                </div>
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="mb-4 text-[13px] font-medium text-white">Tickets by root cause</p>
                  <BarChart key={range} bars={d.bars} />
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="flex items-center gap-2 text-[13px] font-medium text-white"><Icon name="sparkle" size={14} className="text-violet-300" /> AI recommendations</p>
                <ul className="mt-3 grid gap-3 md:grid-cols-3">
                  {analyticsRecs.map((r) => (
                    <li key={r.title} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
                      <span className="rounded-full bg-violet-400/15 px-2 py-0.5 text-[10.5px] text-violet-200">{r.tag}</span>
                      <p className="mt-2.5 text-[13px] font-medium leading-snug text-white">{r.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-steel">{r.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-[11px] text-steel/70">Demo data for the AIVA portfolio concept.</p>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
