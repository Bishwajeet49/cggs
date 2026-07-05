"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Info, AlertTriangle } from "lucide-react";
import type { DashboardAnnouncement } from "@/types/dashboard";

const ICONS = {
  warning: AlertTriangle,
  info: Info,
  success: Info,
} as const;

const STYLES = {
  warning: { icon: "text-amber-400", title: "text-amber-300" },
  info: { icon: "text-sky-300", title: "text-white/80" },
  success: { icon: "text-emerald-400", title: "text-emerald-300" },
} as const;

interface RotatingAnnouncementsProps {
  announcements: DashboardAnnouncement[];
  intervalMs?: number;
}

export default function RotatingAnnouncements({
  announcements,
  intervalMs = 6000,
}: RotatingAnnouncementsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (announcements.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % announcements.length),
      intervalMs
    );
    return () => clearInterval(t);
  }, [announcements.length, intervalMs]);

  const current = announcements[index];
  if (!current) return null;

  const Icon = ICONS[current.type] ?? Info;
  const style = STYLES[current.type] ?? STYLES.info;

  return (
    <div className="mt-5 border-t border-white/10 pt-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="flex items-start gap-2.5"
        >
          <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${style.icon}`} />
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-semibold ${style.title}`}>{current.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-white/45">{current.message}</p>
          </div>
          {announcements.length > 1 && (
            <div className="flex shrink-0 items-center gap-1.5 pt-0.5">
              {announcements.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Announcement ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-4 bg-gold" : "w-1.5 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {announcements.length > 1 && (
        <p className="mt-2 flex items-center gap-1 text-[10px] text-white/25">
          <Clock className="h-3 w-3" />
          Rotating announcements · {index + 1} of {announcements.length}
        </p>
      )}
    </div>
  );
}
