"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Anchor, Eye } from "lucide-react";
import HeroBackground from "@/components/portal/dashboard/HeroBackground";
import { FleetStatusBadge, pad } from "./shared";
import {
  getFleetReviewBase,
  getDelegateFleetReview,
  getFleetReviewStatus,
  FLEET_STATUS_CONFIG,
  getCountdownToFleetReview,
  formatFleetDate,
} from "@/services/delegateFleetReview";

export default function FleetReviewHero() {
  const base = getFleetReviewBase();
  const delegate = getDelegateFleetReview();
  const status = getFleetReviewStatus();
  const statusCfg = FLEET_STATUS_CONFIG[status];
  const [countdown, setCountdown] = useState(getCountdownToFleetReview);

  useEffect(() => {
    const t = setInterval(() => setCountdown(getCountdownToFleetReview()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-navy text-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent, transparent 32px, rgba(201,168,76,0.05) 32px, rgba(201,168,76,0.05) 33px)",
      }}
    >
      <HeroBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/textures/earth_daymap.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 z-1 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              Event Hub · Fleet Review
            </p>
            <h1 className="mt-1 text-2xl font-light tracking-wide sm:text-3xl">
              International Coast Guard{" "}
              <span className="font-bold text-gold">Fleet Review</span>
            </h1>
            <p className="mt-2 text-sm text-white/55">{base.subtitle} · Golden Jubilee Edition</p>

            <div className="mt-4">
              <FleetStatusBadge dot={statusCfg.dot} label={statusCfg.label} badge={statusCfg.badge} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { icon: Calendar, text: formatFleetDate(base.date) },
                { icon: Clock, text: base.time },
                { icon: MapPin, text: base.location },
                { icon: Eye, text: delegate.viewing_area },
              ].map((m, i) => {
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

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/65">
                <Anchor className="h-3.5 w-3.5 text-gold" />
                {delegate.delegate_category}
              </span>
            </div>
          </div>

          {!countdown.expired && status === "upcoming" && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full shrink-0 rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm lg:max-w-xs"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">
                Countdown to Fleet Review
              </p>
              <div
                className="mt-3 grid grid-cols-4 gap-2"
                role="timer"
                aria-label={`Fleet Review begins in ${countdown.days} days`}
              >
                {[
                  { v: String(countdown.days), l: "Days" },
                  { v: pad(countdown.hours), l: "Hrs" },
                  { v: pad(countdown.minutes), l: "Min" },
                  { v: pad(countdown.seconds), l: "Sec" },
                ].map(({ v, l }) => (
                  <div key={l} className="text-center">
                    <div className="rounded-lg border border-gold/25 bg-navy-mid/80 py-2">
                      <span className="text-lg font-bold tabular-nums text-gold sm:text-xl">{v}</span>
                    </div>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-white/40">{l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
