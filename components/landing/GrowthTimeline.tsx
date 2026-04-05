'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type TimelineEntry = {
  year: number;
  learners: number;
  lines: string[];
  progress: number;
  isCurrentYear: boolean;
};

const TIMELINE: TimelineEntry[] = [
  {
    year: 2020,
    learners: 64,
    lines: [
      'CSL begins online with French, Hindi, Kannada.',
      'First proof of concept for volunteer-led language teaching.',
    ],
    progress: 8,
    isCurrentYear: false,
  },
  {
    year: 2022,
    learners: 54,
    lines: [
      'Formal re-registration drive. German and Sanskrit added.',
      'Base from Delhi branches.',
    ],
    progress: 11,
    isCurrentYear: false,
  },
  {
    year: 2023,
    learners: 375,
    lines: [
      'A 7x leap. English, Japanese, Telugu added.',
      'Registrations from Dayalbagh, Jammu, Secunderabad, Singapore and beyond.',
      'CSL goes truly pan-India.',
    ],
    progress: 76,
    isCurrentYear: false,
  },
  {
    year: 2024,
    learners: 403,
    lines: [
      'Multi-level batches across all languages.',
      'Over half the learners opt for two languages simultaneously. 17 course batches per week.',
    ],
    progress: 81,
    isCurrentYear: false,
  },
  {
    year: 2025,
    learners: 495,
    lines: [
      'Largest cohort yet. German adds Advanced batch.',
      'Japanese introduces JLPT exam prep.',
      'Learners from London, Dubai, Hamburg, Melbourne, Colombo and more.',
    ],
    progress: 100,
    isCurrentYear: true,
  },
];

export function GrowthTimeline() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -10% 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="w-full bg-white py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 text-left sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-csl-primary">
            Our Growth
          </p>
          <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-csl-ink md:text-4xl">
            From a pilot to a movement
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            What started in 2020 with four courses has grown into an eight-language programme with
            nearly 500 learners joining every year.
          </p>
        </motion.div>

        {/* Timeline: first column width matches line position (center of track = line) */}
        <div className="relative mt-12 md:mt-16">
          <div
            className="pointer-events-none absolute bottom-0 left-[calc(2.75rem/2)] top-0 z-0 w-px -translate-x-1/2 bg-gradient-to-b from-[#0D5C63] via-[#0D5C63]/85 to-[#E8872A] sm:left-[calc(3.25rem/2)]"
            aria-hidden
          />

          <ul className="relative z-[1] space-y-0">
            {TIMELINE.map((entry, index) => (
              <li
                key={entry.year}
                className={cn(
                  'grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-4',
                  'border-b border-border/40 pb-8 last:border-b-0 last:pb-0',
                  index > 0 && 'mt-8 sm:mt-10'
                )}
              >
                <div className="relative flex justify-center pt-1 sm:pt-0.5">
                  <span
                    className={cn(
                      'relative z-[2] flex shrink-0 items-center justify-center rounded-full shadow-[0_1px_3px_rgba(27,42,61,0.08)] ring-4 ring-white',
                      'h-3.5 w-3.5 sm:h-4 sm:w-4',
                      entry.isCurrentYear
                        ? 'border-[2px] border-csl-primary bg-csl-primary'
                        : 'border-[2px] border-csl-primary bg-csl-cream'
                    )}
                    aria-hidden
                  />
                </div>

                <motion.div
                  className="min-w-0 pb-0.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-display text-2xl font-semibold tabular-nums text-csl-ink sm:text-[1.75rem]">
                      {entry.year}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-csl-amber/25 bg-csl-amber/15 px-3 py-1 text-xs font-medium text-csl-ink sm:text-sm">
                      {entry.learners} learners
                    </span>
                  </div>

                  <div className="mt-3 max-w-xl space-y-2 text-left text-base leading-relaxed text-muted-foreground">
                    {entry.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <p className="mt-3 text-sm font-medium text-csl-ink/85">
                    Progress: {entry.progress}%
                  </p>

                  <div className="mt-2 h-1.5 w-full max-w-xl overflow-hidden rounded-full bg-neutral-200/90">
                    <motion.div
                      className="h-full rounded-full bg-csl-primary"
                      initial={{ width: 0 }}
                      animate={
                        inView
                          ? { width: `${entry.progress}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 1,
                        delay: 0.25 + index * 0.15,
                        ease: 'easeOut',
                      }}
                    />
                  </div>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
