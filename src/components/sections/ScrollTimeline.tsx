"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import type { SummitDay } from "@/types/events";

const TYPE_COLORS: Record<string, string> = {
  fleet_review: "bg-gold text-navy",
  plenary: "bg-navy-light text-white",
  seminar: "bg-navy-mid text-white",
  gala: "bg-[#1a0a40] text-white",
  panel: "bg-navy-muted text-white",
  bilateral: "bg-navy-muted/80 text-white",
  registration: "bg-white/10 text-white/70",
  presentation: "bg-navy-mid text-white",
  default: "bg-white/8 text-white/70",
};

const TYPE_LABELS: Record<string, string> = {
  registration: "Registration",
  plenary: "Plenary",
  seminar: "Seminar",
  panel: "Panel",
  presentation: "Presentation",
  bilateral: "Bilateral",
  networking: "Networking",
  meal: "Reception",
  gala: "Gala",
  fleet_review: "Fleet Review",
  press: "Press",
};

const DAY_THEMES: string[] = [
  "Arrival & Opening Ceremony",
  "Maritime Strategy & Cooperation",
  "Fleet Review & Closing",
];

const DAY_ICONS = ["⚓", "🌐", "⛵"];

interface Props {
  days: SummitDay[];
}

/* A single day card in the timeline */
function DayCard({ day, index }: { day: SummitDay; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "start 35%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const date = new Date(day.date);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  /* Show top events, skip pure networking/meal filler */
  const keyEvents = day.events
    .filter((e) => !["networking", "meal"].includes(e.type))
    .slice(0, 5);

  return (
    <motion.div ref={cardRef} style={{ y, opacity }} className="relative">
      {/* ── Day header ── */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative z-10 flex items-center justify-center h-14 w-14 rounded-full bg-gold text-navy font-bold text-xl shadow-lg shadow-gold/20 shrink-0">
          {DAY_ICONS[index]}
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/70 mb-0.5">
            Day {day.day_number} · {formattedDate}
          </p>
          <h3 className="text-xl font-bold text-white leading-tight">
            {DAY_THEMES[index] ?? day.theme}
          </h3>
          <p className="text-xs text-white/40 mt-0.5 italic">{day.theme}</p>
        </div>
      </div>

      {/* ── Event list ── */}
      <div className="space-y-2 pl-18">
        {keyEvents.map((event, i) => (
          <motion.div
            key={event.event_id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`flex gap-3 p-3 rounded-sm border border-white/8 backdrop-blur-sm ${
              event.type === "fleet_review"
                ? "bg-gold/10 border-gold/20"
                : "bg-white/5 hover:bg-white/8"
            } transition-colors`}
          >
            <div className="shrink-0 text-center w-14">
              <p className="text-[11px] font-bold text-gold tabular-nums">{event.start_time}</p>
              <p className="text-[9px] text-white/25 mt-0.5">{event.end_time}</p>
            </div>
            <div className="flex-1 min-w-0">
              <span
                className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mb-1 ${
                  TYPE_COLORS[event.type] ?? TYPE_COLORS.default
                }`}
              >
                {TYPE_LABELS[event.type] ?? event.type}
              </span>
              <p className="text-xs font-semibold text-white leading-snug">{event.title}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{event.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ScrollTimeline({ days }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  /* Animated progress line height */
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-dark py-24 overflow-hidden"
      aria-label="Three-day summit programme"
    >
      {/* Subtle top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(13,33,84,0.3) 0%, transparent 100%)" }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            3-Day Programme
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Your Journey Through the Summit
          </h2>
          <div className="h-0.5 w-16 bg-gold" />
        </motion.div>

        {/* ── Timeline layout ── */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gold origin-top"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          {/* Day cards */}
          <div className="space-y-16">
            {days.map((day, i) => (
              <DayCard key={day.day_number} day={day} index={i} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold text-sm font-medium rounded-sm hover:bg-gold/10 transition-colors"
          >
            View Full Schedule →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
