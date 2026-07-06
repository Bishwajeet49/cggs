"use client";

import { motion } from "framer-motion";
import { Camera, Film, Globe, Newspaper } from "lucide-react";
import type { MediaPageInfo } from "@/types/common";

interface Props {
  info: MediaPageInfo;
}

const STAT_ICONS = {
  photos: Camera,
  videos: Film,
  summits_covered: Globe,
  press_releases: Newspaper,
} as const;

const STAT_LABELS: Record<keyof MediaPageInfo["stats"], string> = {
  photos: "Photos",
  videos: "Videos",
  summits_covered: "Summits Covered",
  press_releases: "Press Releases",
};

export default function MediaStatsBar({ info }: Props) {
  const entries = Object.entries(info.stats) as [keyof MediaPageInfo["stats"], number][];

  return (
    <section className="relative -mt-8 z-10 pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {entries.map(([key, value], i) => {
            const Icon = STAT_ICONS[key];
            return (
              <div
                key={key}
                className="rounded-sm border border-navy/10 bg-white px-4 py-5 text-center shadow-md"
              >
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="text-2xl font-bold text-navy"
                >
                  {value}+
                </motion.p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate">
                  {STAT_LABELS[key]}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
