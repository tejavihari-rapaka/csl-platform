'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Mentors', href: '#mentors' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Achievements', href: '#achievements' },
] as const;

const SCROLL_THRESHOLD = 80;

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest >= SCROLL_THRESHOLD);
  });

  const scrollToSection = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('id');
          if (id) setActiveSection(id);
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    const sections = NAV_LINKS.map((l) => l.href.replace('#', '')).filter(Boolean);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [isHome]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-csl-primary focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-csl-amber"
      >
        Skip to main content
      </a>

      <motion.header
        className={cn(
          'fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ease-out',
          scrolled
            ? 'bg-csl-cream/95 border-primary/10 shadow-[0_4px_24px_rgba(13,92,99,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-csl-cream/80'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col focus:outline-none focus:ring-2 focus:ring-csl-primary focus:ring-offset-2 focus:ring-offset-csl-cream rounded-sm"
            aria-label="CSL – Center for Spoken Languages, go to homepage"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-csl-primary md:text-3xl">
              CSL
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight md:text-xs">
              Center for Spoken Languages
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = isHome && activeSection === id;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => {
                    if (isHome) {
                      e.preventDefault();
                      scrollToSection(href);
                    }
                  }}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium transition-colors rounded-md',
                    isActive
                      ? 'text-csl-primary'
                      : 'text-csl-ink/80 hover:text-csl-primary'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Navigate to ${label} section`}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-csl-amber"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#courses"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  scrollToSection('#courses');
                }
              }}
              className={cn(
                'hidden md:inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold',
                'bg-gradient-to-r from-csl-primary to-csl-amber text-white',
                'transition-transform hover:scale-105 active:scale-100',
                'focus:outline-none focus:ring-2 focus:ring-csl-primary focus:ring-offset-2'
              )}
              aria-label="Join free courses"
            >
              Join Free
            </Link>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="flex md:hidden h-10 w-10 items-center justify-center rounded-md text-csl-ink hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(320px,85vw)] flex flex-col gap-6 sm:max-w-sm"
              >
                <SheetHeader className="text-left">
                  <SheetTitle className="font-display text-xl text-csl-primary">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-1"
                  aria-label="Mobile navigation"
                >
                  {NAV_LINKS.map(({ label, href }) => {
                    const id = href.replace('#', '');
                    const isActive = isHome && activeSection === id;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(href);
                        }}
                        className={cn(
                          'rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          isActive
                            ? 'bg-csl-primary/10 text-csl-primary'
                            : 'text-csl-ink hover:bg-muted'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <Link
                    href="/#courses"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#courses');
                    }}
                    className={cn(
                      'block w-full rounded-full py-3 text-center text-sm font-semibold',
                      'bg-gradient-to-r from-csl-primary to-csl-amber text-white',
                      'transition-transform hover:scale-[1.02] active:scale-100'
                    )}
                  >
                    Join Free
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </>
  );
}
