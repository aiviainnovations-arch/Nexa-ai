import { useState } from 'react';
import { trust } from '../data/demo';
import { Icon } from '../components/ui/Icon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';

export function Security() {
  const [active, setActive] = useState<string>(trust[0].id);
  const [hovered, setHovered] = useState(false);
  // Plates stack top-to-bottom in the same order as the list.
  const gap = hovered ? 58 : 40;

  return (
    <section id="security" className="relative py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-10">
        <div>
          <SectionHeading title={['Built for', 'modern teams.']} body="The foundations a team expects from software it relies on every day." />
          <Reveal delay={0.1} className="mt-9">
            <ul className="space-y-1.5">
              {trust.map((t) => {
                const on = t.id === active;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(t.id)}
                      onFocus={() => setActive(t.id)}
                      onClick={() => setActive(t.id)}
                      aria-pressed={on}
                      className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 ${on ? 'border-white/15 bg-white/[0.06]' : 'border-transparent hover:bg-white/[0.03]'}`}
                    >
                      <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors ${on ? 'bg-aqua/15 text-aqua' : 'bg-white/[0.05] text-steel'}`}><Icon name={t.icon} size={18} /></span>
                      <span>
                        <span className="block text-[15px] font-medium text-white">{t.title}</span>
                        <span className={`mt-1 block text-[13px] leading-relaxed transition-colors ${on ? 'text-steel' : 'text-steel/70'}`}>{t.text}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 max-w-md text-[11.5px] leading-relaxed text-steel/70">
              These are design concepts for a fictional product. Nexa AI makes no security or compliance claims and shows no certifications.
            </p>
          </Reveal>
        </div>

        {/* isometric architecture stack */}
        <div
          className="relative mx-auto flex h-[420px] w-full max-w-[520px] items-center justify-center sm:h-[500px]"
          style={{ perspective: 1400 }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          role="img"
          aria-label="Diagram: five stacked architecture layers, from role-based access at the top to secure design at the base"
        >
          <div className="pointer-events-none absolute inset-10 rounded-full bg-azure/15 blur-3xl" aria-hidden="true" />
          <div className="preserve-3d relative h-[230px] w-[230px] sm:h-[270px] sm:w-[270px]" style={{ transform: 'rotateX(58deg) rotateZ(-38deg)' }}>
            {trust.map((t, i) => {
              const on = t.id === active;
              const z = (trust.length - 1 - i) * gap + (on ? 16 : 0);
              return (
                <div
                  key={t.id}
                  className={`absolute inset-0 rounded-[22px] border transition-[transform,border-color,box-shadow,background-color] duration-700 ${on ? 'border-aqua/70 bg-[linear-gradient(150deg,rgba(34,211,238,0.22),rgba(37,99,235,0.22))] shadow-[0_0_50px_rgba(34,211,238,0.35)]' : 'border-white/15 bg-[linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]'}`}
                  style={{ transform: `translateZ(${z}px)`, transitionTimingFunction: 'cubic-bezier(.16,1,.3,1)' }}
                >
                  <div className="absolute inset-3 rounded-[14px] border border-dashed border-white/10" />
                  <span className={`absolute bottom-3.5 left-4 text-[10.5px] font-medium uppercase tracking-[0.14em] ${on ? 'text-white' : 'text-steel'}`}>{t.title}</span>
                  <span className={`absolute right-4 top-4 h-2 w-2 rounded-full ${on ? 'bg-aqua shadow-[0_0_10px_#22D3EE]' : 'bg-white/25'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
