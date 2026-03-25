'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Stat {
  label: string;
  value: string;
}

interface StatsCounterProps {
  stats: Stat[];
}

function Counter({ value }: { value: string }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [displayValue, setDisplayValue] = React.useState('0');

  React.useEffect(() => {
    if (!inView) return;

    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/[0-9]/g, '');

    let current = 0;
    const increment = Math.ceil(numericValue / 50);
    const interval = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(current + suffix);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [inView, value]);

  return <span ref={ref}>{displayValue}</span>;
}

export function StatsCounter({ stats }: StatsCounterProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-6 rounded-lg bg-secondary/10 border border-secondary/20 backdrop-blur-sm"
          variants={itemVariants}
        >
          <motion.div className="text-3xl md:text-4xl font-bold text-accent mb-2">
            <Counter value={stat.value} />
          </motion.div>
          <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
