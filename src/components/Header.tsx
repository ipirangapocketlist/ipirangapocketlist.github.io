import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Início', num: '01', section: 'inicio' as const },
  { href: '/#historia', label: 'História', num: '02', section: 'historia' as const },
  { href: '/#lugares', label: 'Lugares', num: '03', section: 'lugares' as const },
  { href: '/#vizinhos', label: 'Vizinhos', num: '04', section: 'vizinhos' as const },
];

type SectionId = (typeof NAV_ITEMS)[number]['section'];

function getInitialSection(): SectionId {
  if (typeof window === 'undefined') return 'inicio';
  if (window.location.pathname.startsWith('/lugares/')) return 'lugares';
  return 'inicio';
}

export default function Header() {
  const [active, setActive] = useState<SectionId>(getInitialSection);
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (window.location.pathname.startsWith('/lugares/')) {
      setActive('lugares');
      return;
    }

    if (window.location.pathname !== '/') return;

    const sectionIds = ['historia', 'lugares', 'vizinhos'] as const;
    const visible = new Map<string, number>();

    const pickActive = () => {
      if (window.scrollY < 80) {
        setActive('inicio');
        return;
      }

      let best: SectionId = 'inicio';
      let bestRatio = 0;
      for (const id of sectionIds) {
        const ratio = visible.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (bestRatio > 0) setActive(best);
    };

    const observers = sectionIds.flatMap((id) => {
      const el = document.getElementById(id);
      if (!el) return [];

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
          pickActive();
        },
        { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.7] },
      );

      observer.observe(el);
      return [observer];
    });

    const onScroll = () => pickActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    pickActive();

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-swiss-black bg-swiss-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <a
          href="/"
          className="group flex shrink-0 items-baseline gap-1.5 sm:gap-2"
        >
          <span className="text-lg font-bold tracking-tight transition-colors group-hover:text-swiss-gray-600 sm:text-xl">
            IPIRANGA
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.15em] text-swiss-red sm:hidden">
            POCKET
          </span>
          <span className="hidden items-baseline gap-1 sm:inline-flex">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-swiss-red transition-transform duration-300 group-hover:-translate-y-px">
              POCKET
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-swiss-gray-600">
              LIST
            </span>
          </span>
        </a>

        <nav aria-label="Principal">
          <ul className="flex gap-0.5 overflow-x-auto pb-0.5 scrollbar-hide sm:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.section;
              const isHovered = hovered === item.section;

              return (
                <li key={item.href} className="shrink-0">
                  <a
                    href={item.href}
                    onMouseEnter={() => setHovered(item.section)}
                    onMouseLeave={() => setHovered(null)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link relative flex items-center gap-1.5 overflow-hidden px-2.5 py-2 sm:gap-2 sm:px-3 ${
                      isActive ? 'nav-link-active' : ''
                    }`}
                  >
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : 'nav-highlight'}
                        className="absolute inset-0 border border-swiss-black bg-swiss-black"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}

                    <span
                      className={`relative z-10 font-mono text-[10px] font-bold tabular-nums transition-colors duration-200 sm:text-[11px] ${
                        isActive || isHovered ? 'text-swiss-red' : 'text-swiss-gray-400'
                      }`}
                    >
                      {item.num}
                    </span>

                    <span
                      className={`relative z-10 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 sm:text-xs ${
                        isActive || isHovered ? 'text-swiss-white' : 'text-swiss-gray-600'
                      }`}
                    >
                      {item.label}
                    </span>

                    {isActive && !isHovered && (
                      <motion.span
                        layoutId={reduceMotion ? undefined : 'nav-underline'}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-swiss-red"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
