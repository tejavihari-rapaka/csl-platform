'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VALUES = [
  { icon: '🌍', label: 'Inclusive', color: 'bg-csl-primary/10 text-csl-primary border-csl-primary/20' },
  { icon: '📚', label: 'Expert-Led', color: 'bg-csl-amber/15 text-csl-amber border-csl-amber/20' },
  { icon: '❤️', label: 'Community-Driven', color: 'bg-csl-terracotta/15 text-csl-terracotta border-csl-terracotta/20' },
] as const;

const LANGUAGES = [
  { flag: '🇮🇳', name: 'Tamil', native: 'தமிழ்' },
  { flag: '🇮🇳', name: 'Hindi', native: 'हिन्दी' },
  { flag: '🇬🇧', name: 'English', native: 'English' },
  { flag: '🇫🇷', name: 'French', native: 'Français' },
  { flag: '🇨🇳', name: 'Mandarin', native: '普通话' },
  { flag: '🇪🇸', name: 'Spanish', native: 'Español' },
] as const;

function RevealFromLeft({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealFromRight({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="border-y bg-csl-cream py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — Story */}
          <RevealFromLeft className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-csl-primary">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-csl-ink md:text-[40px]">
              Language is the bridge between communities.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-csl-ink/80">
              <p>
                Center for Spoken Languages started with a simple observation:
                language learners in our communities often lacked access to
                affordable, person-centred instruction. In 2019, a small group of
                volunteers came together to change that — offering free,
                conversation-focused classes in local spaces, one learner at a
                time.
              </p>
              <p>
                Today, CSL runs entirely on volunteer effort. Every mentor gives
                their time because they believe language opens doors. We never
                charge learners. Whether you want to reconnect with your roots,
                prepare for work, or simply explore a new culture, our doors are
                open.
              </p>
              <p>
                We celebrate the richness of multilingual India and the world.
                Tamil, Hindi, English, French, Mandarin, and more — taught with
                care, curiosity, and respect for every voice.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {VALUES.map(({ icon, label, color }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium ${color}`}
                >
                  <span aria-hidden>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </RevealFromLeft>

          {/* Right column — Visual */}
          <RevealFromRight delay={0.2} className="flex flex-col">
            {/* Languages card */}
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_18px_45px_rgba(13,92,99,0.08)] md:p-8">
              <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Languages We Offer
              </h3>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {LANGUAGES.map(({ flag, name, native }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center rounded-xl bg-muted/30 p-4 text-center transition-colors hover:bg-muted/50"
                  >
                    <span className="text-3xl" role="img" aria-hidden>
                      {flag}
                    </span>
                    <span className="mt-1 font-display text-sm font-medium text-csl-ink">
                      {native}
                    </span>
                    <span className="text-xs text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer testimonial */}
            <blockquote className="mt-8 rounded-xl border-l-4 border-csl-primary/40 bg-white/60 py-4 pl-6 pr-4 shadow-sm md:pl-8">
              <p className="text-base italic leading-relaxed text-csl-ink/85">
                &ldquo;Teaching at CSL reminds me why I love languages. When a
                learner says their first full sentence in Tamil or finally reads
                Hindi script, the joy is real. We&apos;re not just teaching —
                we&apos;re building bridges.&rdquo;
              </p>
              <footer className="mt-4 text-sm font-medium text-csl-primary">
                — Volunteer Mentor, CSL
              </footer>
            </blockquote>
          </RevealFromRight>
        </div>
      </div>
    </section>
  );
}
