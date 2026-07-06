"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Anchor, Building2, Globe } from "lucide-react";

const TARGET = new Date("2027-02-18T09:00:00+05:30");

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

function Colon() {
  return (
    <span
      className="shrink-0 self-center pb-5 text-lg font-light text-gold/60 sm:pb-7 sm:text-3xl"
      aria-hidden="true"
    >
      :
    </span>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center">
      <div className="relative w-full">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex h-12 w-full items-center justify-center rounded-sm border border-gold/30 bg-white/10 px-0.5 backdrop-blur-sm sm:h-16 md:h-20"
        >
          <span className="text-xl font-bold tabular-nums leading-none text-white sm:text-3xl md:text-4xl">
            {value}
          </span>
        </motion.div>
      </div>
      <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-gold/70 sm:mt-2 sm:text-[10px] sm:tracking-[0.2em]">
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
    <section className="gradient-navy overflow-x-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3">
            Event Dates
          </p>
          <h2 className="mb-8 text-base font-bold leading-snug text-white sm:mb-10 sm:text-2xl">
            18th – 27th Feb 2027 · Chennai, India
          </h2>

          <div
            className="mx-auto flex w-full max-w-md items-end justify-center gap-1 sm:max-w-none sm:gap-4 md:gap-6"
            role="timer"
            aria-label={`Summit begins in ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, and ${time.seconds} seconds`}
          >
            <Unit value={String(time.days)} label="Days" />
            <Colon />
            <Unit value={pad(time.hours)} label="Hours" />
            <Colon />
            <Unit value={pad(time.minutes)} label="Minutes" />
            <Colon />
            <Unit value={pad(time.seconds)} label="Seconds" />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-white/50 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            {[
              { icon: Building2, text: "ITC Grand Chola, Chennai" },
              { icon: Anchor, text: "Marina Coastal Waters" },
              { icon: Globe, text: "115+ Nations" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 py-2 bg-gold text-navy text-xs font-bold rounded-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
