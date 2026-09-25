import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { features } from '../data/demo';
import { CinematicVideo } from '../components/CinematicVideo';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Sparkline } from '../components/ui/Sparkline';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { videos } from '../config/videos';

const inViewOnce = { once: true, margin: '-40px' } as const;

/* ------------------------------ visuals ------------------------------ */

function VisualAnalysis() {
  const rows = [
    { l: 'Billing issues', w: 82 },
    { l: 'Onboarding friction', w: 58 },
    { l: 'Feature requests', w: 36 },
  ];
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <div className="hidden flex-1 space-y-2 sm:block" aria-hidden="true">
        {[92, 78, 86, 64, 90, 70, 82, 58].map((w, i) => (
          <div key={i} className="h-1.5 animate-shimmer rounded-full bg-white/15" style={{ width: `${w}%`, animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
      <Icon name="arrow-right" size={18} className="hidden shrink-0 text-aqua sm:block" />
      <div className="w-full rounded-xl border border-white/10 bg-navy/70 p-4 sm:w-[54%]">
        <p className="text-[11px] text-steel">3 findings from 8,412 messages</p>
        <div className="mt-3 space-y-3">
          {rows.map((r, i) => (
            <div key={r.l}>
              <div className="mb-1 flex justify-between text-[12px]"><span className="text-mist/90">{r.l}</span><span className="font-mono text-aqua">{r.w}%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-azure to-aqua" initial={{ width: 0 }} whileInView={{ width: `${r.w}%` }} viewport={inViewOnce} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualAutomation() {
  const nodes = [
    { icon: 'inbox', label: 'New invoice arrives' },
    { icon: 'file', label: 'Extract fields' },
    { icon: 'send', label: 'Send for approval' },
  ] as const;
  return (
    <div className="mx-auto flex max-w-[260px] flex-col items-stretch">
      {nodes.map((n, i) => (
        <div key={n.label} className="flex flex-col items-center">
          <div className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[12.5px] ${i === 1 ? 'border-aqua/40 bg-aqua/[0.08] text-white' : 'border-white/10 bg-white/[0.04] text-mist/90'}`}>
            <Icon name={n.icon} size={15} className={i === 1 ? 'text-aqua' : 'text-steel'} />
            {n.label}
            {i === 1 && <span className="ml-auto flex items-center gap-1 text-[10px] text-aqua"><span className="h-1.5 w-1.5 rounded-full bg-aqua animate-blink" />Running</span>}
          </div>
          {i < nodes.length - 1 && (
            <svg width="2" height="22" aria-hidden="true"><line x1="1" y1="0" x2="1" y2="22" stroke="#22D3EE" strokeOpacity=".6" strokeWidth="1.6" strokeDasharray="4 6" className="animate-dash" /></svg>
          )}
        </div>
      ))}
    </div>
  );
}

function VisualDocument() {
  const fields = [['Payment terms', 'Net 30'], ['Amount', '$12,400'], ['Renewal', '14 Nov 2026']];
  return (
    <div className="grid items-center gap-4 sm:grid-cols-[1fr_1fr]">
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3.5" aria-hidden="true">
        <div className="mb-2 h-2 w-1/2 rounded-full bg-white/25" />
        <div className="space-y-1.5 text-[10.5px] leading-relaxed text-steel">
          <p>The Customer shall pay all invoices within <mark className="rounded bg-aqua/20 px-1 text-aqua">Net 30</mark> days of receipt.</p>
          <p>Total contract value of <mark className="rounded bg-aqua/20 px-1 text-aqua">$12,400</mark>, renewing on <mark className="rounded bg-aqua/20 px-1 text-aqua">14 Nov 2026</mark>.</p>
        </div>
      </div>
      <ul className="space-y-2">
        {fields.map(([k, v], i) => (
          <motion.li key={k} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={inViewOnce} transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }} className="flex items-center justify-between rounded-lg border border-white/[0.08] bg-navy/70 px-3 py-2 text-[12px]">
            <span className="text-steel">{k}</span><span className="font-mono text-white">{v}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function VisualRealtime() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [series, setSeries] = useState<number[]>(() => [52, 55, 53, 58, 57, 61, 59, 63, 62, 66, 64, 68, 65, 70, 67, 72, 69, 73]);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setSeries((s) => {
        const last = s[s.length - 1];
        const next = Math.max(30, Math.min(96, last + (Math.random() - 0.42) * 14));
        return [...s.slice(1), next];
      });
    }, 1300);
    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const last = series[series.length - 1];
  const alert = last > 84;
  return (
    <div ref={ref}>
      <div className="flex items-end justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-[11px] text-steel"><span className="h-1.5 w-1.5 rounded-full bg-aqua animate-blink" />Live: events per minute</p>
          <p className="mt-1 font-display text-3xl font-semibold text-white">{Math.round(last * 18).toLocaleString('en-US')}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${alert ? 'bg-amber-400/15 text-amber-200' : 'bg-aqua/10 text-aqua'}`}>{alert ? 'Above normal range' : 'Within normal range'}</span>
      </div>
      <Sparkline values={series} draw={false} stroke={alert ? '#fcd34d' : '#22D3EE'} className="mt-4 h-24 w-full" height={96} />
    </div>
  );
}

function VisualReport() {
  return (
    <div className="mx-auto max-w-sm rounded-xl border border-white/10 bg-navy/70 p-4">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-2/5 rounded-full bg-white/30" />
        <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10px] text-steel">Weekly</span>
      </div>
      <div className="mt-4 flex h-14 items-end gap-1.5" aria-hidden="true">
        {[40, 62, 48, 74, 58, 86, 70].map((h, i) => (
          <motion.span key={i} className="w-full origin-bottom rounded-[3px] bg-gradient-to-t from-azure/70 to-iris/80" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={inViewOnce} transition={{ delay: 0.1 + i * 0.07, duration: 0.7 }} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-4 space-y-2" aria-hidden="true">
        {[100, 92, 68].map((w, i) => (
          <motion.div key={i} className="h-1.5 rounded-full bg-white/12" initial={{ width: 0 }} whileInView={{ width: `${w}%` }} viewport={inViewOnce} transition={{ delay: 0.6 + i * 0.15, duration: 0.7 }} />
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-aqua"><Icon name="check" size={12} /> Every line cites its source</p>
    </div>
  );
}

function VisualTeam() {
  const people = [['MK', 'from-azure to-aqua'], ['DV', 'from-iris to-azure'], ['SR', 'from-aqua to-iris']];
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {people.map(([n, g]) => <span key={n} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-navy bg-gradient-to-br ${g} text-[10px] font-semibold text-white`}>{n}</span>)}
        </div>
        <span className="text-xs text-steel">3 people in this workspace</span>
      </div>
      <div className="relative mt-4 h-[150px] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025]" aria-hidden="true">
        <div className="absolute left-4 top-4 h-14 w-[38%] rounded-lg border border-white/10 bg-white/[0.05] p-2.5"><div className="h-1.5 w-2/3 rounded-full bg-white/25" /><div className="mt-2 h-1.5 w-full rounded-full bg-white/10" /></div>
        <div className="absolute right-4 top-8 h-16 w-[40%] rounded-lg border border-aqua/25 bg-aqua/[0.06] p-2.5"><div className="text-[10px] text-aqua">Comment</div><div className="mt-1.5 h-1.5 w-full rounded-full bg-white/15" /></div>
        <div className="absolute bottom-4 left-[20%] h-10 w-[55%] rounded-lg border border-white/10 bg-white/[0.04]" />
        <div className="absolute inset-0 animate-cursora"><span className="absolute left-0 top-0 flex items-start gap-1"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M2 1l11 6-5 1.5L6 14z" fill="#22D3EE" /></svg><span className="rounded bg-aqua px-1.5 py-0.5 text-[9px] font-medium text-ink">Maya</span></span></div>
        <div className="absolute inset-0 animate-cursorb"><span className="absolute left-0 top-0 flex items-start gap-1"><svg width="14" height="14" viewBox="0 0 16 16"><path d="M2 1l11 6-5 1.5L6 14z" fill="#a78bfa" /></svg><span className="rounded bg-violet-300 px-1.5 py-0.5 text-[9px] font-medium text-ink">Dev</span></span></div>
      </div>
    </div>
  );
}

const visuals: Record<string, ComponentType> = {
  analysis: VisualAnalysis,
  automation: VisualAutomation,
  documents: VisualDocument,
  realtime: VisualRealtime,
  reporting: VisualReport,
  team: VisualTeam,
};

const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-6', 'lg:col-span-6'];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          title={['Six capabilities.', 'One workspace.']}
          body="Each part of Nexa does one job well, and they all work from the same connected data."
        />

        {/* cinematic interface close-up (video slot 3) */}
        <Reveal className="mt-12" y={22}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-white/10 sm:aspect-[21/9]">
            <CinematicVideo slot={videos.interface} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
            <p className="absolute bottom-4 left-5 max-w-xs text-sm text-white/85 sm:bottom-6 sm:left-7">
              Charts, automations and insights working together in one interface.
            </p>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          {features.map((f, i) => {
            const Visual = visuals[f.id];
            return (
              <SpotlightCard key={f.id} className={`rounded-[20px] ${spans[i]}`} inner="flex flex-col p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold tracking-tight text-white">{f.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-steel">{f.text}</p>
                <div className="mt-7 flex flex-1 flex-col justify-end"><Visual /></div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
