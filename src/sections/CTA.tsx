import { CinematicVideo } from '../components/CinematicVideo';
import { Button } from '../components/ui/Button';
import { Magnetic } from '../components/ui/Magnetic';
import { Reveal } from '../components/ui/Reveal';
import { site } from '../config/site';
import { videos } from '../config/videos';
import { aivaServices } from '../data/demo';

export function CTA() {
  return (
    <section id="about" className="relative isolate overflow-hidden py-28 md:py-40">
      <div className="absolute inset-0 -z-10">
        <CinematicVideo slot={videos.dataflow} className="opacity-50" />
        <div className="absolute inset-0 bg-ink/50" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_50%,transparent,#05070D_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink to-transparent" />
      </div>

      <div className="container-x text-center">
        <Reveal>
          <h2 className="mx-auto font-display text-[clamp(2rem,6vw,5rem)] font-semibold uppercase leading-[0.96] tracking-[-0.035em] text-white">
            <span className="block">Ready to build</span>
            <span className="block">what&rsquo;s next?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-steel sm:text-base">
            From AI-powered products to custom business platforms, {site.aiva.name} creates digital experiences designed around real business needs.
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic className="w-full sm:w-auto"><Button href={site.aiva.contactUrl} size="lg" arrow className="w-full sm:w-auto">Build with {site.aiva.name}</Button></Magnetic>
          <Magnetic className="w-full sm:w-auto"><Button href={site.aiva.workUrl} variant="ghost" size="lg" className="w-full sm:w-auto">View our work</Button></Magnetic>
        </Reveal>
        <Reveal delay={0.26}>
          <ul className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
            {aivaServices.map((s) => (
              <li key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[13px] text-mist/90">{s}</li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-steel/80">What this concept demonstrates.</p>
        </Reveal>
      </div>
    </section>
  );
}
