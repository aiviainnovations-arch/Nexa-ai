import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { site } from '../config/site';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';
import { Logo } from './ui/Logo';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[70] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-white/[0.07] bg-ink/70 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/55'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#top" aria-label="Nexa AI, back to top" className="rounded-lg">
              <Logo />
            </a>
            <span className="hidden h-4 w-px bg-white/15 xl:block" aria-hidden="true" />
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-steel xl:block">{site.concept}</span>
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="rounded-full px-4 py-2 text-[13px] text-steel transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button href="#workspace" size="sm" className="hidden sm:inline-flex">Try Nexa</Button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="container-x flex flex-col gap-1 pb-6 pt-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-3 py-3.5 font-display text-2xl font-semibold uppercase tracking-tight text-white/90 hover:bg-white/[0.05]"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-3">
                  <Button href="#workspace" size="lg" className="w-full" onClick={() => setOpen(false)}>Try Nexa</Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
