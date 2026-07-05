"use client";

import { motion } from "framer-motion";
import type { ScheduleDay } from "@/types/delegate-schedule";
import { getDayCompletion } from "@/services/delegateSchedule";

interface ScheduleDayTabsProps {
  days: ScheduleDay[];
  activeDay: number;
  onChange: (day: number) => void;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function ScheduleDayTabs({ days, activeDay, onChange }: ScheduleDayTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {days.map((d) => {
        const active = d.day === activeDay;
        const { completed, total } = getDayCompletion(d.day);
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        return (
          <button
            key={d.day}
            type="button"
            onClick={() => onChange(d.day)}
            className={`relative min-w-[140px] shrink-0 rounded-xl border px-4 py-3 text-left transition-all duration-200 sm:min-w-[180px] ${
              active
                ? "border-gold/40 bg-navy text-white shadow-md"
                : "border-gray-100 bg-white text-navy hover:border-gold/25 hover:shadow-sm"
            }`}
          >
            {active && (
              <motion.span
                layoutId="day-tab-indicator"
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-gold"
              />
            )}
            <p className={`text-xs font-bold uppercase tracking-wider ${active ? "text-gold" : "text-gold-dark"}`}>
              Day {d.day}
            </p>
            <p className={`mt-0.5 text-[11px] ${active ? "text-white/60" : "text-slate/60"}`}>
              {formatDate(d.date)}
            </p>
            <p className={`mt-1 truncate text-[10px] leading-tight ${active ? "text-white/45" : "text-slate/50"}`}>
              {d.theme}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className={`text-[10px] ${active ? "text-white/50" : "text-slate/45"}`}>
                {total} sessions
              </span>
              <span className={`text-[10px] font-semibold ${active ? "text-gold" : "text-navy/60"}`}>
                {pct}% done
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
