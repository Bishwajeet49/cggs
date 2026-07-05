"use client";

import { motion } from "framer-motion";
import HeroBackground from "@/components/portal/dashboard/HeroBackground";
import type { LucideIcon } from "lucide-react";

interface TravelHeroProps {
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle?: string;
  statusBadge?: React.ReactNode;
  meta?: { icon: LucideIcon; text: string }[];
  rightCard?: React.ReactNode;
}

export default function TravelHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  statusBadge,
  meta = [],
  rightCard,
}: TravelHeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-navy text-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.065) 40px, rgba(201,168,76,0.065) 41px)",
      }}
    >
      <HeroBackground />
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 z-1 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-2xl font-light tracking-wide sm:text-3xl">
              {title} <span className="font-bold text-gold">{titleAccent}</span>
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-white/55">{subtitle}</p>
            )}
            {statusBadge && (
              <div className="mt-4">{statusBadge}</div>
            )}
            {meta.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs text-white/75"
                    >
                      <Icon className="h-3.5 w-3.5 text-gold" />
                      {m.text}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {rightCard && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full shrink-0 lg:max-w-xs"
            >
              {rightCard}
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
