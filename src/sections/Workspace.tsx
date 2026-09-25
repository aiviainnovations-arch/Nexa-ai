import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { scenarios } from '../data/demo';
import type { Scenario } from '../data/demo';
import { Icon } from '../components/ui/Icon';
import type { IconName } from '../components/ui/Icon';
import { Logo } from '../components/ui/Logo';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Sparkline } from '../components/ui/Sparkline';

type Phase = 'idle' | 'thinking' | 'answering' | 'done';

const navItems: { label: string; icon: IconName }[] = [
  { label: 'Workspace', icon: 'home' },
  { label: 'Reports', icon: 'report' },
  { label: 'Automations', icon: 'bolt' },
  { label: 'Documents', icon: 'folder' },
  { label: 'Data sources', icon: 'database' },
];

/** Reveals text word by word, like a streamed answer. */
function StreamText({ text, instant }: { text: string; instant: boolean }) {
  const words = text.split(' ');
  const [n, setN] = useState(instant ? words.length : 0);
  useEffect(() => {
    if (instant) {
      setN(words.length);
      return;
    }
    setN(0);
    const id = window.setInterval(() => setN((c) => (c >= words.length ? c : c + 1)), 28);
    return () => window.clearInterval(id);
  }, [text, instant, words.length]);
  return <>{words.slice(0, n).join(' ')}</>;
}

function pickScenario(text: string): Scenario {
  const t = text.toLowerCase();
  if (/(anomal|unusual|spike|outlier|odd|strange)/.test(t)) return scenarios[1];
  if (/(report|draft|summar|operations|write)/.test(t)) return scenarios[2];
  return scenarios[0];
}

export function Workspace() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>('idle');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [prompt, setPrompt] = useState('');
  const [stepDone, setStepDone] = useState(0);
  const [shown, setShown] = useState(0);
  const [input, setInput] = useState('');
  const timers = useRef<number[]>([]);
  const scroller = useRef<HTMLDivElement>(null);

  const busy = phase === 'thinking' || phase === 'answering';
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, reduced ? Math.min(ms, 60) : ms));
  };
  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clearTimers, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? 'auto' : 'smooth' });
  }, [stepDone, shown, phase, reduced]);

  const run = (s: Scenario, text?: string) => {
    if (busy) return;
    clearTimers();
    setScenario(s);
    setPrompt(text ?? s.prompt);
    setPhase('thinking');
    setStepDone(0);
    setShown(0);
    let t = 0;
    s.steps.forEach((_, i) => {
      t += 720;
      later(() => setStepDone(i + 1), t);
    });
    t += 450;
    later(() => { setPhase('answering'); setShown(1); }, t);
    t += s.summary.split(' ').length * 28 + 500;
    later(() => setShown(2), t);
    t += 650;
    later(() => setShown(3), t);
    t += 650;
    later(() => setShown(4), t);
    t += 600;
    later(() => setPhase('done'), t);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    run(pickScenario(text), text);
  };

  const side = scenario?.side;

  return (
    <section id="workspace" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 mx-auto h-[420px] max-w-4xl -translate-y-1/2 rounded-full bg-iris/[0.09] blur-[110px]" aria-hidden="true" />
      <div className="container-x">
        <SectionHeading
          title={['Ask a question.', 'Get an answer you can act on.']}
          body="This workspace is a working demo. Choose a prompt or type your own, and watch Nexa read the data, explain what it found and suggest what to do."
        />

        <Reveal className="mt-12" y={26}>
          <div className="glass-solid overflow-hidden rounded-[22px]">
            <div className="grid lg:grid-cols-[210px_minmax(0,1fr)_300px]">
              {/* left nav */}
              <aside className="hidden flex-col justify-between border-r border-white/[0.07] p-4 lg:flex" aria-label="Workspace navigation (demo)">
                <div>
                  <div className="mb-5 flex items-center gap-2 px-2"><Logo size={22} /></div>
                  <ul className="space-y-1">
                    {navItems.map((n, i) => (
                      <li key={n.label}>
                        <span
                          aria-current={i === 0 ? 'page' : undefined}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ${i === 0 ? 'bg-white/[0.08] text-white' : 'text-steel'}`}
                        >
                          <Icon name={n.icon} size={16} /> {n.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-azure to-iris text-[11px] font-semibold text-white">OT</span>
                  <div className="min-w-0"><p className="truncate text-xs font-medium text-white">Ops team</p><p className="text-[10.5px] text-steel">Demo workspace</p></div>
                </div>
              </aside>

              {/* centre: conversation */}
              <div className="flex h-[560px] min-w-0 flex-col lg:border-r lg:border-white/[0.07]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                  <p className="text-[13px] font-medium text-white">Customer data, September</p>
                  <span className="flex items-center gap-1.5 text-[11px] text-steel"><span className="h-1.5 w-1.5 rounded-full bg-aqua animate-blink" /> Connected</span>
                </div>

                <div ref={scroller} className="thin-scroll min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
                  {phase === 'idle' && (
                    <div className="mx-auto flex h-full max-w-md flex-col items-center justify-center text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-azure/30 to-iris/30 text-violet-100"><Icon name="sparkle" size={22} /></span>
                      <p className="mt-4 font-display text-xl font-semibold text-white">What should we look into?</p>
                      <p className="mt-1.5 text-sm text-steel">Pick a prompt below to start the demo.</p>
                    </div>
                  )}

                  {scenario && (
                    <>
                      <div className="flex justify-end">
                        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-azure to-iris px-4 py-2.5 text-[13.5px] text-white">{prompt}</p>
                      </div>

                      <div className="flex gap-3">
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.07] text-aqua"><Icon name="sparkle" size={14} /></span>
                        <div className="min-w-0 flex-1 space-y-3">
                          <ul className="space-y-1.5">
                            {scenario.steps.map((s, i) => (
                              <li key={s} className={`flex items-center gap-2 text-[12.5px] transition-colors ${i < stepDone ? 'text-steel' : i === stepDone && phase === 'thinking' ? 'text-white' : 'text-steel/40'}`}>
                                {i < stepDone ? (
                                  <Icon name="check" size={13} className="text-aqua" />
                                ) : i === stepDone && phase === 'thinking' ? (
                                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-aqua/30 border-t-aqua" aria-hidden="true" />
                                ) : (
                                  <span className="h-3 w-3 rounded-full border border-white/15" aria-hidden="true" />
                                )}
                                {s}
                              </li>
                            ))}
                          </ul>

                          {shown >= 1 && (
                            <div>
                              <p className="text-xs font-medium text-steel">Summary</p>
                              <p className="mt-1.5 text-[14px] leading-relaxed text-mist">
                                <StreamText key={scenario.id + prompt} text={scenario.summary} instant={!!reduced} />
                              </p>
                            </div>
                          )}

                          {shown >= 2 && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                              <p className="text-xs font-medium text-steel">Key trends</p>
                              <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                                {scenario.trends.map((t) => (
                                  <li key={t.label} className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3">
                                    <p className="text-[11px] text-steel">{t.label}</p>
                                    <p className={`mt-1 flex items-center gap-1 font-display text-lg font-semibold ${t.good ? 'text-aqua' : 'text-amber-300'}`}>
                                      <Icon name={t.up ? 'trend-up' : 'trend-down'} size={14} /> {t.value}
                                    </p>
                                    <p className="mt-1 text-[11px] leading-snug text-steel">{t.note}</p>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}

                          {shown >= 3 && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                              <p className="text-xs font-medium text-steel">Anomalies</p>
                              <ul className="mt-2 space-y-2">
                                {scenario.anomalies.map((a) => (
                                  <li key={a.title} className="flex gap-3 rounded-xl border border-amber-300/20 bg-amber-300/[0.06] p-3">
                                    <Icon name="alert" size={16} className="mt-0.5 shrink-0 text-amber-300" />
                                    <div><p className="text-[13px] font-medium text-amber-100">{a.title}</p><p className="mt-0.5 text-[12px] text-steel">{a.detail}</p></div>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}

                          {shown >= 4 && (
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                              <p className="text-xs font-medium text-steel">Recommendations</p>
                              <ul className="mt-2 space-y-1.5">
                                {scenario.recs.map((r) => (
                                  <li key={r} className="flex items-start gap-2.5 text-[13px] text-mist/95">
                                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded bg-aqua/15 text-aqua"><Icon name="check" size={11} /></span>
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <p role="status" className="sr-only">{phase === 'thinking' ? 'Nexa is analyzing your data.' : phase === 'done' ? 'Analysis complete. Summary, trends, anomalies and recommendations are shown above.' : ''}</p>

                {/* composer */}
                <div className="border-t border-white/[0.07] p-3 sm:p-4">
                  <div className="no-scrollbar -mx-1 mb-3 flex gap-2 overflow-x-auto px-1">
                    {scenarios.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => run(s)}
                        disabled={busy}
                        className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs text-mist/90 transition-colors hover:border-aqua/40 hover:bg-aqua/[0.07] disabled:opacity-40"
                      >
                        {s.chip}
                      </button>
                    ))}
                  </div>
                  <form onSubmit={submit} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-1.5 focus-within:border-aqua/50">
                    <label htmlFor="ask-nexa" className="sr-only">Ask Nexa a question about your data</label>
                    <input
                      id="ask-nexa"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about your data, or try “find anomalies”"
                      className="min-w-0 flex-1 bg-transparent py-2 text-[13.5px] text-white placeholder:text-steel/70 focus:outline-none"
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      disabled={busy || !input.trim()}
                      aria-label="Send question"
                      className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-azure to-iris text-white transition-opacity disabled:opacity-40"
                    >
                      <Icon name="send" size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* right: live insights */}
              <aside className="border-t border-white/[0.07] p-4 sm:p-5 lg:border-t-0" aria-label="Generated insights">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-white">{side?.title ?? 'Live insights'}</p>
                  {side && <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10.5px] text-steel">{side.tag}</span>}
                </div>

                {side && shown >= 1 ? (
                  <motion.div key={scenario?.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-4 space-y-3">
                    {side.kpis.map((k) => (
                      <div key={k.l} className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
                        <span className="text-xs text-steel">{k.l}</span>
                        <span className="font-display text-lg font-semibold text-white">{k.v}</span>
                      </div>
                    ))}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                      <p className="text-xs text-steel">Trend</p>
                      <Sparkline key={scenario?.id} values={side.series} stroke="#22D3EE" className="mt-2 h-16 w-full" height={64} />
                    </div>
                    <p className="text-[11px] leading-relaxed text-steel/70">Every figure links back to its source data in the full product. Demo data only.</p>
                  </motion.div>
                ) : (
                  <div className="mt-4 space-y-3" aria-hidden="true">
                    {[0, 1, 2].map((i) => <div key={i} className="h-[52px] rounded-xl bg-white/[0.035] animate-shimmer" style={{ animationDelay: `${i * 0.25}s` }} />)}
                    <div className="h-24 rounded-xl bg-white/[0.035] animate-shimmer" />
                    <p className="pt-1 text-xs text-steel/70">Insights appear here once you ask a question.</p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
