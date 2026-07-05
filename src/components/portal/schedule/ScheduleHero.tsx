"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, Armchair, Shirt } from "lucide-react";
import HeroBackground from "@/components/portal/dashboard/HeroBackground";
import type { NextSessionInfo } from "@/types/delegate-schedule";

interface ScheduleHeroProps {
  delegateName: string;
  categoryLabel: string;
  summitDates: string;
  currentDay: number;
  totalSessions: number;
  completedSessions: number;
  nextSession: NextSessionInfo | null;
}

export default function ScheduleHero({
  delegateName,
  categoryLabel,
  summitDates,
  currentDay,
  totalSessions,
  completedSessions,
  nextSession,
}: ScheduleHeroProps) {
  const progress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

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
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              My Schedule
            </p>
            <h1 className="mt-1 text-2xl font-light tracking-wide sm:text-3xl">
              Personalised <span className="font-bold text-gold">Summit Itinerary</span>
            </h1>
            <p className="mt-2 text-sm text-white/55">
              {delegateName || "Delegate"} · {categoryLabel}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs text-white/75">
                <CalendarDays className="h-3.5 w-3.5 text-gold" />
                {summitDates}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold">
                Day {currentDay} Active
              </span>
            </div>

            {/* Progress */}
            <div className="mt-5 max-w-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/50">{completedSessions} of {totalSessions} sessions completed</span>
                <span className="font-semibold text-gold">{progress}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gold"
                />
              </div>
            </div>
          </div>

          {/* Next session card */}
          {nextSession && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full shrink-0 rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm lg:max-w-sm"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">Next Session</p>
              <p className="mt-2 text-sm font-bold leading-snug text-white">{nextSession.session.title}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-amber-300">
                <Clock className="h-3 w-3 shrink-0" />
                {nextSession.startsInLabel}
              </p>
              <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <MapPin className="h-3 w-3 shrink-0 text-gold/70" />
                  {nextSession.session.hall}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <Armchair className="h-3 w-3 shrink-0 text-gold/70" />
                  {nextSession.session.seatNumber}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-white/60">
                  <Shirt className="h-3 w-3 shrink-0 text-gold/70" />
                  {nextSession.session.dressCode}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
