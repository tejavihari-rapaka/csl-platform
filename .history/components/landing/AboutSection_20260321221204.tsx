'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VALUES = [
  { icon: '🌍', label: 'Inclusive', color: 'bg-csl-primary/10 text-csl-primary border-csl-primary/20' },
  { icon: '📚', label: 'Expert-Led', color: 'bg-csl-amber/15 text-csl-amber border-csl-amber/20' },
  { icon: '❤️', label: 'Community-Driven', color: 'bg-csl-terracotta/15 text-csl-terracotta border-csl-terracotta/20' },
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

export function AboutSection() {
  return (
    <section id="about" className="border-y bg-csl-cream py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <RevealFromLeft className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-csl-primary">About CSL</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-csl-ink md:text-[40px]">
              Centre for Spoken Languages (CSL)
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-csl-ink/80">
              <p>
                The Centre for Spoken Languages (CSL) is a unique learning initiative dedicated to nurturing
                linguistic curiosity, cultural appreciation, and global understanding. Founded in 2020 during the
                pandemic, CSL began as a small online effort to introduce children and families to the joy of learning
                languages in an engaging and meaningful way.
              </p>
              <p>
                What started as a modest summer program with just two languages, French and Kannada, soon
                evolved into a vibrant multilingual learning community. Today, CSL offers eight languages guided
                by passionate volunteer mentors who believe in sharing knowledge as an act of service.
              </p>
              <p>
                At its core, CSL is inspired by the timeless ideals of "Fatherhood of God and Brotherhood of Man"
                and "Vasudhaiva Kutumbakam" (The World is One Family). These principles shape the philosophy
                of the centre: language is not merely a tool for communication, but a bridge that connects cultures,
                ideas, and people.
                At its core, CSL is inspired by the timeless ideals of “Fatherhood of God and Brotherhood of Man”
                and the ancient wisdom of “वसुधैव कुटुम्बकम”् (The World is One Family). These principles shape
                the philosophy of the centre: that language is not merely a tool for communication, but a powerful
                bridge that connects cultures, ideas, and people.
              </p>
            </div>
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-csl-ink">Our Mission</h3>
                <p className="mt-2 text-base leading-relaxed text-csl-ink/80">
                  To make language learning accessible, joyful, and culturally enriching, while fostering mutual
                  respect and global harmony through interactive sessions, creative activities, and collaborative
                  learning.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-csl-ink">Our Vision</h3>
                <p className="mt-2 text-base leading-relaxed text-csl-ink/80">
                  A world where learning languages helps individuals understand one another better, appreciate
                  diversity, and build meaningful connections beyond geographical and cultural boundaries.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-csl-ink">Our Goals</h3>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-base leading-relaxed text-csl-ink/80">
                  <li>Introduce learners of all ages to multiple languages in a welcoming and engaging environment.</li>
                  <li>Promote appreciation of the cultural, literary, and historical richness of different languages.</li>
                  <li>Encourage spoken communication skills and cultural exchange among learners from different regions.</li>
                  <li>Build a community of learners who value unity in diversity and global understanding.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-csl-ink">Our Journey So Far</h3>
                <p className="mt-2 text-base leading-relaxed text-csl-ink/80">
                  From its humble beginnings as a small online experiment, CSL has grown into a thriving initiative
                  with hundreds of learners participating across batches. The centre now conducts structured classes,
                  interactive activities, and annual celebrations that showcase multilingual creativity through
                  performances, games, and collaborative projects.
                </p>
                <p className="mt-2 text-base leading-relaxed text-csl-ink/80">
                  More than a language program, CSL is a community-driven learning movement sustained by dedicated
                  mentors and enthusiastic students who celebrate languages as shared human heritage. Through CSL,
                  languages become pathways to connection, understanding, and unity.
                </p>
              </div>
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
            <blockquote className="mt-8 rounded-xl border-l-4 border-csl-primary/40 bg-white/60 py-4 pl-6 pr-4 shadow-sm md:pl-8">
              <p className="text-base italic leading-relaxed text-csl-ink/85">
                &ldquo;Vasudhaiva Kutumbakam - The World is One Family.&rdquo;
              </p>
              <footer className="mt-4 text-sm font-medium text-csl-primary">— CSL Core Principle</footer>
            </blockquote>
          </RevealFromLeft>
        </div>
      </div>
    </section>
  );
}
