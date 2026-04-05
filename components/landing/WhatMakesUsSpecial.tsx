'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  Globe,
  Heart,
  MessageCircle,
  Sparkles,
  Target,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const CARDS = [
  {
    icon: Target,
    iconWrap: 'bg-teal-50 text-[#0D5C63]',
    title: 'Multi-generational Learning',
    description:
      'Our youngest learner is 4, our oldest is 84. Families learn together — parents alongside children, across generations.',
  },
  {
    icon: Globe,
    iconWrap: 'bg-amber-50 text-[#E8872A]',
    title: 'Truly Global Classroom',
    description:
      'Live online batches connect a learner in Tirupati with someone in London — united by the love of language.',
  },
  {
    icon: BookOpen,
    iconWrap: 'bg-purple-50 text-purple-600',
    title: 'Multi-level Progression',
    description:
      'From beginner to JLPT exam prep — structured paths and specialised tracks for every learner at every stage.',
  },
  {
    icon: Heart,
    iconWrap: 'bg-rose-50 text-rose-500',
    title: '100% Volunteer-driven',
    description:
      'No fees, no commercial interests — just a shared commitment to learning and community service through seva.',
  },
  {
    icon: MessageCircle,
    iconWrap: 'bg-blue-50 text-blue-600',
    title: 'Spoken Fluency Focus',
    description:
      'Emphasis on speaking and listening — practical communication skills for daily life, travel, and connecting with cultures.',
  },
  {
    icon: Sparkles,
    iconWrap: 'bg-green-50 text-green-600',
    title: 'Rooted in Values',
    description:
      'Part of a tradition of education and service where learning is seen as a path to personal growth and community harmony.',
  },
] as const;

export function WhatMakesUsSpecial() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -12% 0px' });

  return (
    <section
      ref={sectionRef}
      id="what-makes-us-special"
      className="w-full bg-csl-cream py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-csl-primary">
          What Makes Us Special
        </p>
        <h2 className="mt-2 text-3xl font-display font-bold tracking-tight text-csl-ink md:text-4xl">
          More than just language classes
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground text-justify md:text-lg">
          CSL is built on the spirit of seva — voluntary service. Every mentor and coordinator
          contributes their time and expertise freely.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Card
                  className={cn(
                    'h-full rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all duration-300',
                    'hover:-translate-y-1 hover:shadow-md'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      card.iconWrap
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
