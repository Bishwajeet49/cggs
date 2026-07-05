"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { SummitDay } from "@/types/events";

const EVENT_TYPE_LABELS: Record<string, string> = {
  registration: "Registration",
  plenary: "Plenary Session",
  seminar: "Seminar",
  panel: "Panel Discussion",
  presentation: "Presentation",
  bilateral: "Bilateral Meetings",
  networking: "Networking",
  meal: "Meal / Reception",
  gala: "Gala Dinner",
  fleet_review: "Fleet Review",
  press: "Press Conference",
};

const EVENT_TYPE_COLORS: Record<string, string> = {
  plenary: "bg-navy text-white",
  seminar: "bg-navy-mid text-white",
  fleet_review: "bg-gold text-navy",
  gala: "bg-navy-dark text-white",
  panel: "bg-navy-light text-white",
  bilateral: "bg-navy-muted text-white",
  registration: "bg-gray-200 text-slate",
  networking: "bg-gray-200 text-slate",
  meal: "bg-gray-100 text-slate",
  press: "bg-gray-200 text-slate",
  presentation: "bg-navy-mid text-white",
};

interface Props {
  days: SummitDay[];
}

export default function ThreeDayOverview({ days }: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-navy py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            3-Day Programme
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Summit Schedule Overview
          </h2>
          <div className="h-0.5 w-16 bg-gold" />
        </motion.div>

        {/* Day Tabs */}
        <div className="flex gap-2 mb-8 border-b border-white/10 pb-0">
          {days.map((day, i) => (
            <button
              key={day.day_number}
              onClick={() => setActive(i)}
              className={`px-5 py-3 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                active === i
                  ? "border-gold text-gold"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
            >
              Day {day.day_number}
              <span className="hidden sm:inline text-xs font-normal ml-2 opacity-60">
                {new Date(day.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {days[active] && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-gold/80 text-sm font-semibold uppercase tracking-wider mb-6">
                Theme: {days[active].theme}
              </p>

              <div className="space-y-3">
                {days[active].events
                  .filter((e) => !["networking"].includes(e.type))
                  .map((event) => (
                    <div
                      key={event.event_id}
                      className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-sm hover:bg-white/8 transition-colors"
                    >
                      <div className="shrink-0 w-16 text-center">
                        <p className="text-xs font-bold text-gold">{event.start_time}</p>
                        <p className="text-[10px] text-white/30 mt-0.5">
                          {event.end_time}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              EVENT_TYPE_COLORS[event.type] ?? "bg-navy text-white"
                            }`}
                          >
                            {EVENT_TYPE_LABELS[event.type] ?? event.type}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white leading-snug">
                          {event.title}
                        </p>
                        <p className="text-xs text-white/40 mt-1">{event.location}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 text-center">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold text-sm font-medium rounded-sm hover:bg-gold/10 transition-colors"
          >
            View Full Schedule →
          </Link>
        </div>
      </div>
    </section>
  );
}
