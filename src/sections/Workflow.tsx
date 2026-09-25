import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { sources, workflowSteps } from '../data/demo';
import { CinematicVideo } from '../components/CinematicVideo';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { videos } from '../config/videos';

function StepVisual({ id }: { id: string }) {
  if (id === 'connect') {
    return (
      <ul className="grid grid-cols-2 gap-2.5">
        {sources.map((s, i) => (
          <motion.li key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-[13px] text-mist/95">
            <Icon name="plug" size={15} className="text-aqua" /> {s}
            <Icon name="check" size={13} className="ml-auto text-aqua" />
          </motion.li>
        ))}
      </ul>
    );
  }
  if (id === 'analyze') {
    const rows = [['Reading documents', 48210], ['Matching records', 12480], ['Finding patterns', 386]] as const;
    return (
      <div className="space-y-4">
        {rows.map(([l, n], i) => (
          <div key={l}>
            <div className="mb-1.5 flex justify-between text-[12.5px]"><span className="text-mist/90">{l}</span><span className="font-mono text-aqua">{n.toLocaleString('en-US')}</span></div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><motion.div className="h-full rounded-full bg-gradient-to-r from-azure to-aqua" initial={{ width: '0%' }} animate={{ width: `${88 - i * 16}%` }} transition={{ duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} /></div>
          </div>
        ))}
      </div>
    );
  }
  if (id === 'understand') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-violet-200"><Icon name="sparkle" size={12} /> Insight</p>
        <p className="mt-2 font-display text-lg font-semibold leading-snug text-white">Billing questions are up 34%, mostly about invoice dates.</p>
        <p className="mt-2 text-xs text-steel">Evidence: 412 tickets, 3 help articles, 1 pricing page change.</p>
      </motion.div>
    );
  }
  return (
    <ul className="space-y-2.5">
      {['Route billing tickets to the Tier 2 queue', 'Send the weekly report every Monday', 'Alert #support-ops when volume doubles'].map((t, i) => (
        <motion.li key={t} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[13px] text-mist/95">
          <Icon name="bolt" size={15} className="text-aqua" /> {t}
          <span className="ml-auto rounded-full bg-aqua/10 px-2 py-0.5 text-[10px] text-aqua">Active</span>
        </motion.li>
      ))}
    </ul>
  );
}

export function Workflow() {
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const resume = useRef<number>();

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % workflowSteps.length), 3400);
    return () => window.clearInterval(id);
  }, [inView, paused, reduced]);
  useEffect(() => () => window.clearTimeout(resume.current), []);

  const choose = (i: number) => {
    setActive(i);
    setPaused(true);
    window.clearTimeout(resume.current);
    resume.current = window.setTimeout(() => setPaused(false), 10000);
  };

  const step = workflowSteps[active];
  const last = workflowSteps.length - 1;

  return (
    <section id="how-it-works" className="relative isolate overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10">
        <CinematicVideo slot={videos.workflow} className="opacity-45" />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x" ref={wrap}>
        <SectionHeading title={['From information', 'to action.']} body="Nexa does more than write text. It helps teams understand what is happening and put the answer to work." />

        <Reveal className="mt-14" y={22}>
          <div className="relative">
            {/* desktop track */}
            <div className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-white/10 md:block" aria-hidden="true">
              <motion.div className="h-full origin-left bg-gradient-to-r from-azure via-iris to-aqua" animate={{ scaleX: active / last }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} />
              {!reduced && inView && [0, 1.1, 2.2].map((d) => (
                <span key={d} className="absolute top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_10px_#22D3EE] animate-flow" style={{ animationDelay: `${d}s` }} />
              ))}
            </div>

            <ol className="relative grid gap-7 md:grid-cols-4 md:gap-6">
              {workflowSteps.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.id} className="relative">
                    {i < last && <span className={`absolute left-[21px] top-12 -bottom-7 w-px md:hidden ${done ? 'bg-gradient-to-b from-azure to-iris' : 'bg-white/10'}`} aria-hidden="true" />}
                    <button type="button" onClick={() => choose(i)} aria-current={on ? 'step' : undefined} className="group flex w-full gap-4 rounded-2xl text-left md:flex-col md:items-center md:text-center">
                      <span className={`relative z-10 grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full border font-mono text-[12px] transition-all duration-500 ${on ? 'scale-110 border-aqua bg-aqua/15 text-aqua shadow-[0_0_30px_rgba(34,211,238,0.45)]' : done ? 'border-iris/60 bg-iris/15 text-violet-200' : 'border-white/15 bg-navy text-steel group-hover:border-white/30'}`}>
                        {s.n}
                      </span>
                      <span>
                        <span className={`block font-display text-lg font-semibold uppercase tracking-tight transition-colors ${on ? 'text-white' : 'text-white/70'}`}>{s.title}</span>
                        <span className="mt-1 block text-[13px] text-steel">{s.short}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="glass-solid mt-10 grid gap-8 rounded-[22px] p-6 sm:p-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <AnimatePresence mode="wait">
              <motion.div key={step.id + 'a'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <p className="font-mono text-xs text-aqua">Step {step.n} of 04</p>
                <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-steel">{step.text}</p>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.div key={step.id + 'b'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <StepVisual id={step.id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
