'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Users, BookOpen, Gift } from 'lucide-react';

const ROTATOR_ITEMS = [
  { en: 'Tamil', native: 'தமிழ்' },
  { en: 'Hindi', native: 'हिन्दी' },
  { en: 'French', native: 'Français' },
  { en: 'Mandarin', native: '普通话' },
] as const;

const STATS = [
  { value: '500+', label: 'Students Taught', icon: Users },
  { value: '20+', label: 'Courses', icon: BookOpen },
  { value: '100%', label: 'Free', icon: Gift },
];

export function Hero() {
  const [rotatorIndex, setRotatorIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0]
  );

  // Text rotator: start at 1.5s, cycle every 2.5s, alternate English/native
  useEffect(() => {
    const startDelay = 1500;
    const cycleInterval = 2500;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const startTimer = setTimeout(() => {
      intervalId = setInterval(() => {
        setRotatorIndex((i) => (i + 1) % (ROTATOR_ITEMS.length * 2));
      }, cycleInterval);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const rotatorContent = (() => {
    const item = ROTATOR_ITEMS[Math.floor(rotatorIndex / 2) % ROTATOR_ITEMS.length];
    return rotatorIndex % 2 === 0 ? item.en : item.native;
  })();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#FAFAF7] px-4 pb-24 pt-20 md:pb-16 md:pt-24"
    >
      {/* Animated mesh gradient blobs — hidden on very small screens */}
      <div
        className="pointer-events-none absolute inset-0 hidden min-[380px]:block"
        aria-hidden
      >
        <div
          className="absolute -right-[20%] -top-[15%] h-[70vh] w-[70vw] max-w-[600px] rounded-[45%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, #0D5C63 0%, #E8872A 50%, transparent 70%)',
          }}
        />
        <div
          className="animate-hero-blob absolute -right-[15%] -top-[10%] h-[60vh] w-[60vw] max-w-[500px] rounded-[45%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(13,92,99,0.5) 0%, rgba(232,135,42,0.4) 45%, transparent 65%)',
          }}
        />
        <div
          className="animate-hero-blob-sm absolute -bottom-[10%] -left-[10%] h-[40vh] w-[45vw] max-w-[320px] rounded-[45%] opacity-35"
          style={{
            background: 'radial-gradient(ellipse at 30% 70%, rgba(232,135,42,0.45) 0%, rgba(13,92,99,0.35) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating decorative circles */}
      <div
        className="pointer-events-none absolute inset-0 hidden min-[380px]:block"
        aria-hidden
      >
        <div className="animate-hero-float-slow absolute left-[12%] top-[25%] h-20 w-20 rounded-full bg-csl-primary/10 md:left-[15%] md:top-[20%] md:h-28 md:w-28" />
        <div className="animate-hero-float-medium absolute right-[18%] top-[60%] h-16 w-16 rounded-full bg-csl-amber/15 sm:h-20 sm:w-20" />
        <div className="animate-hero-float-fast absolute bottom-[30%] left-[8%] h-12 w-12 rounded-full bg-csl-terracotta/10 sm:h-16 sm:w-16" />
        <div className="animate-hero-float-slow absolute right-[8%] bottom-[25%] h-14 w-14 rounded-full bg-csl-primary/8 sm:h-18 sm:w-18" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge — 0.2s delay */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center rounded-full border-2 border-csl-primary px-4 py-1.5 text-sm font-medium text-csl-primary">
          A Global Multilingual Learning Community
          </span>
        </motion.div>

        {/* Headline — 0.4s delay */}
        <motion.h1
          className="mt-6 text-[40px] font-bold leading-[1.15] tracking-tight text-csl-ink md:text-[64px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Discover the Power of{' '}
          <span className="relative inline-block min-h-[1.15em] min-w-[140px] text-left md:min-w-[220px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatorIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 bg-gradient-to-r from-csl-primary to-csl-amber bg-clip-text text-transparent"
              >
                {rotatorContent}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subheadline — 0.6s delay */}
        <motion.p
          className="mt-6 font-sans text-lg text-csl-ink/80 md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Nurturing empathy and global understanding through the joy of languages. Inspired by the 'Fatherhood of God and Brotherhood of Man,' CSL connects learners worldwide to build meaningful connections beyond boundaries.
        </motion.p>

        {/* CTAs — 0.8s delay */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/#courses"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-csl-primary to-csl-amber px-8 py-4 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-csl-primary focus:ring-offset-2 focus:ring-offset-[#FAFAF7]"
          >
            Explore Courses →
          </Link>
          <Link
            href="/#mentors"
            className="inline-flex items-center justify-center rounded-full border-2 border-csl-terracotta px-6 py-3.5 text-base font-semibold text-csl-terracotta transition-colors hover:bg-csl-terracotta/10 focus:outline-none focus:ring-2 focus:ring-csl-terracotta focus:ring-offset-2 focus:ring-offset-[#FAFAF7]"
          >
            Meet Our Mentors
          </Link>
        </motion.div>

        {/* Stats bar — 1.0s delay */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-csl-ink/70"
            >
              <Icon className="h-5 w-5 shrink-0 text-csl-primary" aria-hidden />
              <span className="font-mono text-base font-semibold tabular-nums text-csl-primary md:text-lg">
                {value}
              </span>
              <span className="text-sm font-medium md:text-base">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        style={{ opacity: scrollIndicatorOpacity }}
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="h-8 w-8 text-csl-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
