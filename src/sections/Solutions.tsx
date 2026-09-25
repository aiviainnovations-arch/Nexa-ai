import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { capabilities, teams } from '../data/demo';
import { Counter } from '../components/ui/Counter';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Solutions() {
  const [active, setActive] = useState(teams[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const team = teams.find((t) => t.id === active) ?? teams[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + teams.length) % teams.length;
    setActive(teams[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section id="solutions" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          title={['Six capabilities.', 'Built around your team.']}
          body="Every team uses a different mix of the same platform. Pick a team to see which capabilities do the work."
        />

        <Reveal className="mt-12" y={22}>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {capabilities.map((c) => {
              const used = team.uses.includes(c.id);
              return (
                <li
                  key={c.id}
                  className={`rounded-2xl border p-4 transition-all duration-500 ${used ? 'border-aqua/30 bg-aqua/[0.06] opacity-100' : 'border-white/[0.06] bg-white/[0.015] opacity-50'}`}
                >
                  <span className={`grid h-9 w-9 place-items-center rounded-lg transition-colors duration-500 ${used ? 'bg-aqua/15 text-aqua' : 'bg-white/[0.05] text-steel'}`}>
                    <Icon name={c.icon} size={18} />
                  </span>
                  <p className="mt-4 text-sm font-medium text-white">{c.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-steel">{c.text}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className="mt-6 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]" y={22}>
          <div role="tablist" aria-label="Teams" aria-orientation="vertical" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {teams.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => { tabs.current[i] = el; }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="team-panel"
                tabIndex={active === t.id ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`shrink-0 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors lg:py-4 ${
                  active === t.id ? 'border-white/20 bg-white/[0.08] text-white' : 'border-white/[0.06] text-steel hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div id="team-panel" role="tabpanel" aria-labelledby={`tab-${team.id}`} className="glass min-h-[280px] rounded-2xl p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="grid gap-6 md:grid-cols-[1.3fr_1fr] md:gap-10"
              >
                <div>
                  <p className="text-xs text-steel">A question {team.label.toLowerCase()} might ask</p>
                  <p className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl">&ldquo;{team.question}&rdquo;</p>
                  <ol className="mt-6 space-y-3">
                    {team.steps.map((s) => (
                      <li key={s} className="flex items-start gap-3 text-sm text-mist/90">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-aqua/15 text-aqua"><Icon name="check" size={12} /></span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-col justify-end rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="font-display text-5xl font-semibold tracking-tight text-white">
                    <Counter key={team.id} to={team.outcome.value} suffix={team.outcome.suffix} duration={1.1} />
                  </p>
                  <p className="mt-2 text-sm text-steel">{team.outcome.label}</p>
                  <p className="mt-4 text-[11px] text-steel/70">Demo figures for the concept.</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
