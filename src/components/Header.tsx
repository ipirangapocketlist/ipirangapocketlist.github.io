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

function NavLink({
  item,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onNavigate,
  reduceMotion,
  variant = 'desktop',
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onNavigate?: () => void;
  reduceMotion: boolean | null;
  variant?: 'desktop' | 'mobile';
}) {
  const highlighted = isActive || isHovered;

  if (variant === 'mobile') {
    return (
      <a
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center gap-4 border border-swiss-black px-4 py-4 transition-colors ${
          isActive ? 'bg-swiss-black text-swiss-white' : 'bg-swiss-white text-swiss-black'
        }`}
      >
        <span className={`font-mono text-sm font-bold tabular-nums ${isActive ? 'text-swiss-red' : 'text-swiss-gray-400'}`}>
          {item.num}
        </span>
        <span className="text-sm font-semibold uppercase tracking-widest">{item.label}</span>
      </a>
    );
  }

  return (
    <a
      href={item.href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-current={isActive ? 'page' : undefined}
      className={`nav-link relative flex items-center gap-1.5 overflow-hidden px-2.5 py-2 sm:gap-2 sm:px-3 ${
        isActive ? 'nav-link-active' : ''
      }`}
    >
      {highlighted && (
        <motion.span
          layoutId={reduceMotion ? undefined : 'nav-highlight'}
          className="absolute inset-0 border border-swiss-black bg-swiss-black"
          initial={false}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        />
      )}

      <span
        className={`relative z-10 font-mono text-[10px] font-bold tabular-nums transition-colors duration-200 sm:text-[11px] ${
          highlighted ? 'text-swiss-red' : 'text-swiss-gray-400'
        }`}
      >
        {item.num}
      </span>

      <span
        className={`relative z-10 text-[10px] font-semibold uppercase tracking-widest transition-colors duration-200 sm:text-xs ${
          highlighted ? 'text-swiss-white' : 'text-swiss-gray-600'
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
  );
}

export default function Header() {
  const [active, setActive] = useState<SectionId>(getInitialSection);
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-swiss-black bg-swiss-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 md:px-8">
        <a href="/" className="group flex min-w-0 shrink items-baseline gap-1.5 sm:gap-2" onClick={closeMenu}>
          <span className="truncate text-base font-bold tracking-tight transition-colors group-hover:text-swiss-gray-600 sm:text-lg md:text-xl">
            IPIRANGA
          </span>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.12em] text-swiss-red sm:text-sm md:hidden">
            POCKET
          </span>
          <span className="hidden shrink-0 items-baseline gap-1 md:inline-flex">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-swiss-red transition-transform duration-300 group-hover:-translate-y-px">
              POCKET
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-swiss-gray-600">LIST</span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex gap-0.5 lg:gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="shrink-0">
                <NavLink
                  item={item}
                  isActive={active === item.section}
                  isHovered={hovered === item.section}
                  onHover={() => setHovered(item.section)}
                  onLeave={() => setHovered(null)}
                  reduceMotion={reduceMotion}
                />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="carousel-btn md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Menu mobile" className="border-t border-swiss-black bg-swiss-white md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink
                  item={item}
                  isActive={active === item.section}
                  isHovered={false}
                  onHover={() => {}}
                  onLeave={() => {}}
                  onNavigate={closeMenu}
                  reduceMotion={reduceMotion}
                  variant="mobile"
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
