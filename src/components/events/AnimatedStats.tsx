"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface AnimatedStatsProps {
  stats: Stat[];
  dark?: boolean;
  className?: string;
}

function Counter({
  value,
  suffix = "",
  prefix = "",
  started,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1600;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AnimatedStats({ stats, dark = false, className = "" }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`grid gap-px ${
        stats.length === 3
          ? "grid-cols-3"
          : stats.length === 4
          ? "grid-cols-2 sm:grid-cols-4"
          : stats.length === 5
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : "grid-cols-2 sm:grid-cols-3"
      } ${dark ? "bg-white/10" : "bg-navy/5"} rounded-sm overflow-hidden ${className}`}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className={`flex flex-col items-center justify-center py-8 px-4 text-center ${
            dark ? "bg-navy-dark" : "bg-white"
          }`}
        >
          <p
            className={`text-3xl font-bold sm:text-4xl ${
              dark ? "text-gold" : "text-navy"
            }`}
          >
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              started={inView}
            />
          </p>
          <p
            className={`mt-2 text-xs font-medium uppercase tracking-wider ${
              dark ? "text-white/60" : "text-slate"
            }`}
          >
            {stat.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
