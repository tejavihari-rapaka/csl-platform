'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function FeaturedTestimonial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -12% 0px' });

  return (
    <section
      ref={sectionRef}
      aria-label="Featured testimonial"
      className="w-full bg-[#F4EDE0] py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
          <div className="relative md:col-span-5">
            <span
              className="pointer-events-none absolute -left-1 -top-4 font-display text-[120px] leading-none text-[#E8872A] opacity-30 sm:text-[140px] md:text-[160px]"
              aria-hidden
            >
              &ldquo;
            </span>
            <motion.blockquote
              initial={{ opacity: 0, x: -28 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-[1] max-w-lg font-display text-[20px] font-normal italic leading-relaxed text-[#1A1A1A]"
            >
              Learning at CSL has been a deeply enriching journey. Our mentor teaches with exceptional
              clarity and dedication — her classes are interactive and meticulously structured. I
              consider myself fortunate to be part of this wonderful community.
            </motion.blockquote>
          </div>

          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#0D5C63] font-display text-2xl font-semibold text-white"
                aria-hidden
              >
                LP
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-snug text-[#1A1A1A]">Dr. L. Padmavathy</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Retired Professor of Dermatology
                  <br />
                  Annamalai University · Secunderabad
                </p>
                <span className="mt-3 inline-flex rounded-full bg-[#E8872A]/15 px-4 py-1.5 text-sm font-medium text-[#E8872A]">
                  Sanskrit Advanced
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
