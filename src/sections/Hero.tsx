import { motion, useMotionValue } from 'framer-motion';
import type { PointerEvent } from 'react';
import { CinematicVideo } from '../components/CinematicVideo';
import { Particles } from '../components/hero/Particles';
import { Scene } from '../components/hero/Scene';
import { Button } from '../components/ui/Button';
import { Magnetic } from '../components/ui/Magnetic';
import { site } from '../config/site';
import { videos } from '../config/videos';
import { useLite } from '../hooks/useMediaQuery';

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: 0, transition: { duration: 0.95, delay: 0.15 + i * 0.13, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};

export function Hero() {
  const lite = useLite();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* atmosphere: video layer, grid, vignette */}
      <div className="absolute inset-0 -z-10">
        <CinematicVideo slot={videos.heroCore} eager className="opacity-60" />
        <div className="grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_60%_at_68%_45%,#000,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
      </div>
      <Particles count={lite ? site.performance.particlesLite : site.performance.particlesDesktop} className="absolute inset-0 -z-10 h-full w-full" />

      <div className="container-x grid min-h-[100svh] items-center gap-6 pb-14 pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-8 lg:pb-20 lg:pt-32">
        <div className="relative z-10 max-w-[40rem]">
          <h1 className="font-display text-[clamp(2.1rem,5vw,4.9rem)] font-semibold uppercase leading-[0.94] tracking-[-0.035em] text-white">
            {['Turn data into', 'Intelligence.'].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-[0.08em]">
                <motion.span custom={i} variants={line} initial="hidden" animate="show" className="block whitespace-nowrap">
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[30rem] text-[15px] leading-relaxed text-steel sm:text-base"
          >
            Nexa AI helps teams analyze information, automate repetitive work and turn complex data into actionable insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button href="#product" size="lg" arrow className="w-full sm:w-auto">Explore product</Button>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <Button href="#how-it-works" variant="ghost" size="lg" className="w-full sm:w-auto">See how it works</Button>
            </Magnetic>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="mt-10 flex items-center gap-2.5 text-xs text-steel/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-aqua animate-blink" aria-hidden="true" />
            Fictional product concept by {site.aiva.name}. All data shown is demo data.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-0 -mx-2 sm:mx-0"
        >
          <Scene mx={mx} my={my} />
        </motion.div>
      </div>
    </section>
  );
}
