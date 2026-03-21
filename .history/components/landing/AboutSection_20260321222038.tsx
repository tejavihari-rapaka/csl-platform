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
    <section id="about" className="border-y bg-csl-cream pb-16 pt-10 md:pb-24 md:pt-14">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <RevealFromLeft className="flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-csl-primary">About CSL</h2>
            {/* <h2 className="mt-3 text-3xl font-bold leading-tight text-csl-ink md:text-[40px]">
              Centre for Spoken Languages (CSL)
            </h2> */}
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
              <p>
                The <strong>Centre for Spoken Languages (CSL)</strong> is a unique learning initiative dedicated to nurturing
                linguistic curiosity, cultural appreciation, and global understanding. Founded in <strong>2020 during the pandemic</strong>,
                pandemic, CSL began as a small online effort to introduce children and families to the joy of learning
                languages in an engaging and meaningful way.
              </p>
              <p>
                What started as a modest summer program with just <strong>two languages - French and Kannada - soon evolved into a vibrant multilingual learning community.</strong>
                Today, CSL offers <strong>eight languages</strong> guided
                by passionate volunteer mentors who believe in sharing knowledge as an act of service.
              </p>
              <p>
                At its core, CSL is inspired by the timeless ideals of <strong>"Fatherhood of God and Brotherhood of Man"</strong>
                and the ancient wisdom of <strong>"वसुधैव कुटुम्बकम्" (The World is One Family)</strong>. These principles shape
                the philosophy of the centre: that language is not merely a tool for communication, but a powerful
                bridge that connects cultures, ideas, and people.
              </p>
            </div>
            <div className="mt-8 space-y-5">
              <div>
                <h3 className="text-xl font-semibold text-csl-ink md:text-2xl">Our Mission</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
                  To make language learning <strong>accessible, joyful, and culturally enriching</strong>, while fostering mutual
                  respect and global harmony through interactive sessions, creative activities, and collaborative
                  learning.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-csl-ink md:text-2xl">Our Vision</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
                  A world where learning languages helps individuals <strong>understand one another better</strong>,
                  <strong> appreciate diversity, and build meaningful connections beyond geographical and cultural boundaries.</strong>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-csl-ink md:text-2xl">Our Goals</h3>
                <ul className="mt-2 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
                  <li>Introduce learners of all ages to multiple languages in a welcoming and engaging environment.</li>
                  <li>Promote appreciation of the <strong>cultural, literary, and historical richness</strong> of different languages.</li>
                  <li>Encourage <strong>spoken communication skills and cultural exchange</strong> among learners from different regions.</li>
                  <li>Build a community of learners who value <strong>unity in diversity and global understanding.</strong></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-csl-ink md:text-2xl">Our Journey So Far</h3>
                <p className="mt-2 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
                  From its humble beginnings as a small online experiment, CSL has grown into a thriving initiative
                  with <strong>hundreds of learners participating across batches.</strong> The centre now conducts structured classes,
                  interactive activities, and annual celebrations that showcase multilingual creativity through
                  performances, games, and collaborative projects.
                </p>
                <p className="mt-2 text-[17px] leading-relaxed text-csl-ink/80 md:text-lg">
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
          </RevealFromLeft>
        </div>
      </div>
    </section>
  );
}
