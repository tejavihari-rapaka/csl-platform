"use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  type MotionProps,
} from 'framer-motion';
import clsx from 'clsx';

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement> &
  MotionProps;

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  className,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

type StaggerChildrenProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const staggerContainer = {
  hidden: { opacity: 0 },
  show: (delay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: delay,
    },
  }),
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  delay = 0,
  className,
  ...rest
}) => {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      {...rest}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={staggerItem}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

type CountUpProps = {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  format?: (value: number) => string;
};

export const CountUp: React.FC<CountUpProps> = ({
  to,
  duration = 1.2,
  className,
  prefix = '',
  suffix = '',
  format,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      ease: [0.21, 1, 0.23, 1],
      onUpdate(latest) {
        setValue(latest);
      },
    });

    return () => {
      controls.stop();
    };
  }, [to, duration]);

  const display =
    format?.(value) ?? Math.round(value).toLocaleString('en-IN');

  return (
    <span className={clsx('font-mono tabular-nums', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  offset?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  once = true,
  offset = '0px 0px -10% 0px',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {
    once,
    margin: offset,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

