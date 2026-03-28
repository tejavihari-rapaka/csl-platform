'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const COUNTRIES = [
  { flag: '🇮🇳', name: 'India', code: 'IN' },
  { flag: '🇬🇧', name: 'United Kingdom', code: 'UK' },
  { flag: '🇦🇪', name: 'UAE', code: 'AE' },
  { flag: '🇩🇪', name: 'Germany', code: 'DE' },
  { flag: '🇸🇬', name: 'Singapore', code: 'SG' },
  { flag: '🇴🇲', name: 'Oman', code: 'OM' },
  { flag: '🇦🇺', name: 'Australia', code: 'AU' },
  { flag: '🇱🇰', name: 'Sri Lanka', code: 'LK' },
  { flag: '🇺🇸', name: 'USA', code: 'US' },
] as const;

type StatKind = 'countries' | 'branches' | 'learners';

const STATS: { kind: StatKind; target: number; caption: string }[] = [
  { kind: 'countries', target: 9, caption: 'Countries' },
  { kind: 'branches', target: 200, caption: 'Branches' },
  { kind: 'learners', target: 1000, caption: 'Learners' },
];

function AnimatedStat({ kind, target, caption, inView, delay }: any) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.5,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setN(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, target, delay]);

  const label = kind === 'countries' ? `${n}` : `${n.toLocaleString('en-IN')}+`;

  return (
    <div className="min-w-[120px]">
      <p className="font-display text-4xl font-bold tracking-tight text-[#E8872A] md:text-5xl">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium uppercase tracking-wider text-white/60">{caption}</p>
    </div>
  );
}

export function GlobalReach() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={sectionRef}
      id="global-reach"
      className="w-full bg-[#0D5C63] py-20 text-white md:py-24"
      style={{ clipPath: 'polygon(0 0, 100% 2%, 100% 100%, 0 98%)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8872A]">
              Global Reach
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              One classroom, no boundaries
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Our online batches bring together learners from over 200 branches across 
              9 countries—bridging communities from Dayalbagh to Dubai.
            </p>
          </div>
          
          <div className="flex gap-8 border-l border-white/10 pl-8 md:gap-12">
            {STATS.map((stat, i) => (
              <AnimatedStat key={stat.kind} {...stat} inView={inView} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* Country Cards Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
          {COUNTRIES.map((c, index) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition-all hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl"
            >
              {/* Top Row: Code & Flag */}
              <div className="flex w-full items-center justify-between">
                <span className="text-[10px] font-bold text-white/40 group-hover:text-[#E8872A]">
                  {c.code}
                </span>
                <span className="text-xl" role="img" aria-label={c.name}>
                  {c.flag}
                </span>
              </div>

              {/* Bottom Row: Name Box */}
              <div className="mt-4 w-full rounded-lg bg-black/20 py-2 group-hover:bg-[#E8872A]/20">
                <p className="text-xs font-semibold tracking-wide text-white group-hover:text-[#E8872A]">
                  {c.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}