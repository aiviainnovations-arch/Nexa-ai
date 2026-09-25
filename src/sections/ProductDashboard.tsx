import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { overview } from '../data/demo';
import { Button } from '../components/ui/Button';
import { Counter } from '../components/ui/Counter';
import { Icon } from '../components/ui/Icon';
import type { IconName } from '../components/ui/Icon';
import { Logo } from '../components/ui/Logo';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Sparkline } from '../components/ui/Sparkline';
import { Tilt } from '../components/ui/Tilt';

const panel = 'rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4';
const kindIcon: Record<string, IconName> = { report: 'report', alert: 'alert', auto: 'bolt', doc: 'file' };
const stateStyle = {
  running: { dot: 'bg-aqua animate-blink', label: 'Running' },
  scheduled: { dot: 'bg-azure', label: 'Scheduled' },
  paused: { dot: 'bg-steel/60', label: 'Paused' },
};

function MetricCard({ m }: { m: (typeof overview.metrics)[number] }) {
  return (
    <div className={`${panel} flex flex-col justify-between`}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-steel">{m.label}</p>
        <span className="flex items-center gap-1 rounded-full bg-aqua/10 px-2 py-0.5 text-[10.5px] font-medium text-aqua">
          <Icon name="trend-up" size={11} />
          {m.delta}%
        </span>
      </div>
      <p className="mt-2 font-display text-[1.7rem] font-semibold leading-none tracking-tight text-white sm:text-3xl">
        <Counter to={m.value} suffix={m.suffix} />
      </p>
      <Sparkline values={m.trend} className="mt-3 h-9 w-full" />
    </div>
  );
}

export function ProductDashboard() {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState<Record<string, boolean>>({});

  return (
    <section id="product" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          title={['Every signal.', 'One clear view.']}
          body="Nexa AI reads across your data, documents and tools, then shows what changed, why it changed and what to do next."
        />

        <Reveal className="mt-14 md:mt-16" y={28}>
          <Tilt max={3} className="mx-auto">
            <div className="glass-solid overflow-hidden rounded-[22px]">
              {/* window chrome */}
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <Logo size={20} withWord={false} />
                  <p className="text-[13px] font-medium text-white">AI Overview</p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-steel">
                  <span className="hidden rounded-full border border-white/10 px-2.5 py-1 sm:inline">{overview.range}</span>
                  <span className="rounded-full border border-white/10 px-2.5 py-1">Demo data</span>
                </div>
              </div>

              <div className="space-y-3 p-3 sm:p-5">
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {overview.metrics.map((m) => (
                    <MetricCard key={m.id} m={m} />
                  ))}
                </div>

                <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
                  {/* AI insight */}
                  <div className={`${panel} relative overflow-hidden`}>
                    <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-iris/20 blur-3xl" aria-hidden="true" />
                    <div className="relative">
                      <p className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-azure/25 to-iris/25 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-violet-100">
                        <Icon name="sparkle" size={12} /> AI insight
                      </p>
                      <p className="mt-3 max-w-lg font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">
                        {overview.insight.text}
                      </p>
                      <div className="mt-4 flex items-end gap-4">
                        <div className="min-w-0 flex-1">
                          <Sparkline values={overview.insight.series} stroke="#8b7cff" className="h-20 w-full" height={80} />
                          <div className="mt-1 flex justify-between text-[10px] text-steel"><span>14 days ago</span><span>Today</span></div>
                        </div>
                        <Button variant="ghost" size="sm" arrow onClick={() => setOpen((o) => !o)} aria-label={open ? 'Hide insight details' : 'View insight details'}>
                          {open ? 'Hide insight' : 'View insight'}
                        </Button>
                      </div>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-3 border-t border-white/[0.07] pt-4">
                              <p className="text-xs text-steel">What drove the change</p>
                              {overview.insight.factors.map((f, i) => (
                                <div key={f.label}>
                                  <div className="mb-1.5 flex justify-between text-[12.5px]"><span className="text-mist/90">{f.label}</span><span className="font-mono text-aqua">{f.share}%</span></div>
                                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                                    <motion.div className="h-full rounded-full bg-gradient-to-r from-azure to-aqua" initial={{ width: 0 }} animate={{ width: `${f.share * 2}%` }} transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className={panel}>
                    <p className="text-[13px] font-medium text-white">Recommended next</p>
                    <ul className="mt-3 space-y-2.5">
                      {overview.recommendations.map((r) => (
                        <li key={r.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                          <p className="text-[13px] leading-snug text-mist/95">{r.text}</p>
                          <div className="mt-2.5 flex items-center justify-between">
                            <span className="text-[11px] text-steel">{r.impact}</span>
                            <button
                              type="button"
                              onClick={() => setApplied((a) => ({ ...a, [r.id]: !a[r.id] }))}
                              aria-pressed={!!applied[r.id]}
                              className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${applied[r.id] ? 'bg-aqua/15 text-aqua' : 'bg-white/[0.07] text-white hover:bg-white/[0.12]'}`}
                            >
                              {applied[r.id] && <Icon name="check" size={12} />}
                              {applied[r.id] ? 'Queued' : 'Apply'}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-3">
                  {/* Activity */}
                  <div className={panel}>
                    <p className="text-[13px] font-medium text-white">Activity</p>
                    <ol className="relative mt-4 space-y-4 before:absolute before:bottom-1 before:left-[13px] before:top-1 before:w-px before:bg-white/10">
                      {overview.activity.map((a) => (
                        <li key={a.text} className="relative flex gap-3">
                          <span className={`z-10 grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full border border-white/10 bg-navy ${a.kind === 'alert' ? 'text-amber-300' : 'text-aqua'}`}>
                            <Icon name={kindIcon[a.kind]} size={13} />
                          </span>
                          <div className="min-w-0">
                            <p className="text-[12.5px] leading-snug text-mist/95">{a.text}</p>
                            <p className="mt-0.5 font-mono text-[10.5px] text-steel">{a.time}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Documents */}
                  <div className={panel}>
                    <p className="text-[13px] font-medium text-white">Document analysis</p>
                    <ul className="mt-4 space-y-3">
                      {overview.documents.map((d) => (
                        <li key={d.name} className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-steel"><Icon name="file" size={16} /></span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12.5px] text-mist/95">{d.name}</p>
                            <p className="text-[11px] text-steel">{d.fields} fields extracted</p>
                          </div>
                          {d.flag && <span className="shrink-0 rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] text-amber-200">{d.flag}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Workflows */}
                  <div className={panel}>
                    <p className="text-[13px] font-medium text-white">Workflow status</p>
                    <ul className="mt-4 space-y-3">
                      {overview.workflows.map((w) => (
                        <li key={w.name} className="flex items-center gap-3">
                          <span className={`h-2 w-2 shrink-0 rounded-full ${stateStyle[w.state].dot}`} aria-hidden="true" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12.5px] text-mist/95">{w.name}</p>
                            <p className="text-[11px] text-steel">{w.meta}</p>
                          </div>
                          <span className="shrink-0 text-[10.5px] text-steel">{stateStyle[w.state].label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
