'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';
import { BookOpen, Users, GraduationCap, TrendingUp, Globe, Wifi} from 'lucide-react';

type StatsData = {
  totalCourses: number;
  totalMentors: number;
  pastStudents: number;
  enrolledStudents: number;
  totalCountries?: number;
  satsangBranchesConnected?: number;
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
  }, [isInView, hasAnimated, item.value, item.key, onComplete]);

  return (
    <div
    className={`
      relative flex flex-col items-center justify-center gap-2 px-3 py-10
      lg:border-r lg:border-white/15 lg:last:border-r-0
      ${showShimmer && !hasAnimated ? 'animate-stats-shimmer rounded-xl' : ''}
    `}
  >
    <Icon
      className="h-10 w-10 shrink-0 text-csl-amber" // Reduced from h-12
      strokeWidth={1.5}
      aria-hidden
    />
    <span
      className="font-mono text-3xl font-bold tabular-nums text-white md:text-[44px]" // Reduced from 56px
      aria-live="polite"
    >
      {displayValue}
    </span>
    <span className="text-center text-xs md:text-sm text-white/75 leading-snug">
      {item.label}
    </span>
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
      // label: 'Students Taught (past)',
      label: 'Learners served since 2020',
      value: stats.pastStudents,
      icon: GraduationCap,
    },
    {
      key: 'enrolledStudents',
      label: 'Currently Enrolled',
      value: stats.enrolledStudents,
      icon: TrendingUp,
    },
    {
      key: 'totalCountries',
      label: 'Countries Reached',
      value: stats.totalCountries || 0,
      icon: Globe,
    },
    {
      key: 'satsangBranchesConnected',
      label: 'Satsang Branches Connected',
      value: stats.satsangBranchesConnected || 0,
      icon: Wifi,
    }
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

  const handleComplete = useCallback((key: keyof StatsData) => {
    setCompletedKeys((prev) => new Set(prev).add(key));
  }, []);

  const allAnimated = completedKeys.size >= items.length;
  const showShimmer = isInView && !allAnimated;

  return (
    <section
    id="achievements"
    ref={ref}
    className="relative overflow-hidden bg-[#0D5C63] py-20"
    style={{ clipPath: 'polygon(0 3%, 100% 0, 100% 97%, 0 100%)' }}
  >
    <div className="container px-4 mx-auto"> 
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"> 
        {/* Changed to lg:grid-cols-6 for laptop view */}
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
