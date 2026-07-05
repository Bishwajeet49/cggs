"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TARGET = new Date("2027-02-15T09:00:00+05:30");

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getRemaining() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="min-w-[72px] sm:min-w-[88px] h-16 sm:h-20 flex items-center justify-center bg-white/10 border border-gold/30 rounded-sm backdrop-blur-sm"
        >
          <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
            {value}
          </span>
        </motion.div>
      </div>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const t = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="gradient-navy py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3">
            The Summit Begins In
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-10">
            15–17 February 2027 · Chennai, India
          </h2>

          <div className="flex items-end justify-center gap-4 sm:gap-6">
            <Unit value={pad(time.days)} label="Days" />
            <span className="text-3xl font-light text-gold/60 mb-7 pb-1">:</span>
            <Unit value={pad(time.hours)} label="Hours" />
            <span className="text-3xl font-light text-gold/60 mb-7 pb-1">:</span>
            <Unit value={pad(time.minutes)} label="Minutes" />
            <span className="text-3xl font-light text-gold/60 mb-7 pb-1">:</span>
            <Unit value={pad(time.seconds)} label="Seconds" />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50">
            <span>🏛 ITC Grand Chola, Chennai</span>
            <span>⚓ Marina Coastal Waters</span>
            <span>🌐 115+ Nations</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
