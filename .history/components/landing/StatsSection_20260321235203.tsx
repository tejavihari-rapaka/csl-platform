'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { BookOpen, Users, GraduationCap, TrendingUp } from 'lucide-react';

type StatsData = {
  totalCourses: number;
  totalMentors: number;
  pastStudents: number;
  enrolledStudents: number;
};

type StatItem = {
  key: keyof StatsData;
  label: string;
  value: number;
  icon: React.ElementType;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION_MS = 2000;

function StatCell({
  item,
  isInView,
  hasAnimated,
  onComplete,
  showShimmer,
}: {
  item: StatItem;
  isInView: boolean;
  hasAnimated: boolean;
  onComplete: (key: keyof StatsData) => void;
  showShimmer: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = item.icon;

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const controls = animate(0, item.value, {
      duration: DURATION_MS / 1000,
      ease: EASE_OUT_EXPO,
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
      onComplete: () => {
        onComplete(item.key);
      },
    });

    return () => controls.stop();
  }, [isInView, hasAnimated, item.value, onComplete]);

  return (
    <div
      className={`
        relative flex flex-col items-center justify-center gap-3 px-6 py-10
        md:border-r md:border-white/15 md:last:border-r-0
        ${showShimmer && !hasAnimated ? 'animate-stats-shimmer rounded-xl' : ''}
      `}
    >
      <Icon
        className="h-12 w-12 shrink-0 text-csl-amber"
        strokeWidth={1.5}
        aria-hidden
      />
      <span
        className="font-mono text-4xl font-bold tabular-nums text-white md:text-[56px]"
        aria-live="polite"
      >
        {displayValue}+
      </span>
      <span className="text-center text-base text-white/75">{item.label}</span>
    </div>
  );
}

export function StatsSection({ stats }: { stats: StatsData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [completedKeys, setCompletedKeys] = useState<Set<keyof StatsData>>(new Set());

  const items: StatItem[] = [
    {
      key: 'totalCourses',
      label: 'Total Courses Offered',
      value: stats.totalCourses,
      icon: BookOpen,
    },
    {
      key: 'totalMentors',
      label: 'Volunteer Mentors',
      value: stats.totalMentors,
      icon: Users,
    },
    {
      key: 'pastStudents',
      label: 'Students Taught (past)',
      value: stats.pastStudents,
      icon: GraduationCap,
    },
    {
      key: 'enrolledStudents',
      label: 'Currently Enrolled',
      value: stats.enrolledStudents,
      icon: TrendingUp,
    },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsInView(true);
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleComplete = (key: keyof StatsData) => {
    setCompletedKeys((prev) => new Set(prev).add(key));
  };

  const allAnimated = completedKeys.size >= items.length;
  const showShimmer = isInView && !allAnimated;

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative overflow-hidden bg-[#0D5C63] py-20 md:py-24"
      style={{
        clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)',
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {items.map((item) => (
            <StatCell
              key={item.key}
              item={item}
              isInView={isInView}
              hasAnimated={completedKeys.has(item.key)}
              onComplete={handleComplete}
              showShimmer={showShimmer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
