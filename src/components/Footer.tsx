import { Logo } from './ui/Logo';
import { site } from '../config/site';

const cols = [
  { title: 'Concept', links: [['Product', '#product'], ['Solutions', '#solutions'], ['Workspace demo', '#workspace'], ['Analytics', '#analytics']] },
  { title: 'Explore', links: [['Features', '#features'], ['How it works', '#how-it-works'], ['Security concepts', '#security']] },
  { title: site.aiva.name, links: [['About AIVA', '#about'], ['View our work', site.aiva.workUrl], ['Contact', site.aiva.contactUrl]] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-16">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-steel">{site.concept}</p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">{site.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.title} aria-label={c.title}>
                <p className="text-sm font-medium text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map(([label, href]) => (
                    <li key={label}><a href={href} className="text-sm text-steel transition-colors hover:text-white">{label}</a></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/[0.07] py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.08em] text-white">{site.aiva.name}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-steel">{site.aiva.descriptor}</p>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-steel/70 md:text-right">
            Nexa AI is a fictional product created by {site.aiva.name} for portfolio purposes. All names, figures and data shown are demo content. &copy; {new Date().getFullYear()} {site.aiva.name}.
          </p>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(4rem,20vw,17rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]">
        NEXA AI
      </p>
    </footer>
  );
}
