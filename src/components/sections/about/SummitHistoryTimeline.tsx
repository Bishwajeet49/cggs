"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  Anchor,
  Video,
  Mic,
} from "lucide-react";
import type { SummitHistoryEvent, SummitEventType } from "@/types/cggs";

const TYPE_CONFIG: Record<
  SummitEventType,
  { label: string; icon: typeof Anchor; color: string }
> = {
  summit: { label: "Global Summit", icon: Anchor, color: "bg-gold text-navy" },
  working_meeting: {
    label: "Working Meeting",
    icon: Video,
    color: "bg-navy-light text-white",
  },
  symposium: { label: "Symposium", icon: Mic, color: "bg-navy-mid text-white" },
};

type FilterKey = "all" | SummitEventType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All Events" },
  { key: "summit", label: "Summits" },
  { key: "working_meeting", label: "Working Meetings" },
  { key: "symposium", label: "Symposium" },
];

interface Props {
  events: SummitHistoryEvent[];
}

function HistoryCard({ event, index }: { event: SummitHistoryEvent; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;
  const typeCfg = TYPE_CONFIG[event.type];
  const TypeIcon = typeCfg.icon;
  const year = event.date_iso.slice(0, 4);
  const hasDetails = Boolean(
    event.themes?.length || event.outcomes?.length || event.theme
  );

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "start 40%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y, opacity }}
      className={`relative grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10 ${
        isEven ? "" : "lg:[direction:rtl] lg:*:[direction:ltr]"
      }`}
    >
      {/* Image */}
      <div className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-navy/30">
        <Image
          src={encodeURI(event.image_url)}
          alt={event.image_alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
        {event.edition && (
          <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-lg font-bold text-navy shadow-lg shadow-gold/20">
            {event.edition}
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${typeCfg.color}`}
          >
            <TypeIcon className="h-3 w-3" />
            {typeCfg.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gold/70">
          {year}
        </p>
        <h3 className="mb-3 text-xl font-bold leading-snug text-white sm:text-2xl">
          {event.title}
        </h3>

        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gold/60" />
            {event.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-gold/60" />
            {event.location}
          </span>
        </div>

        <p className="mb-3 text-xs text-white/40">
          <span className="font-semibold text-white/55">Host:</span> {event.host}
        </p>

        <p className="mb-4 inline-flex items-start gap-1.5 text-xs leading-relaxed text-white/45">
          <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/50" />
          {event.participants}
        </p>

        {event.theme && (
          <p className="mb-4 border-l-2 border-gold/30 pl-3 text-sm italic text-white/60">
            &ldquo;{event.theme}&rdquo;
          </p>
        )}

        <p className="text-sm leading-relaxed text-white/65">{event.summary}</p>

        {hasDetails && (
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-light transition-colors"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4 rounded-sm border border-white/8 bg-white/5 p-4">
                    {event.themes && event.themes.length > 0 && (
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gold/70">
                          Key Themes
                        </p>
                        <ul className="space-y-1.5">
                          {event.themes.map((theme) => (
                            <li
                              key={theme}
                              className="flex gap-2 text-xs text-white/60"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                              {theme}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {event.outcomes && event.outcomes.length > 0 && (
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gold/70">
                          Outcomes
                        </p>
                        <ul className="space-y-1.5">
                          {event.outcomes.map((outcome) => (
                            <li
                              key={outcome}
                              className="flex gap-2 text-xs text-white/60"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function SummitHistoryTimeline({ events }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
    filter === "all" ? events : events.filter((e) => e.type === filter);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const summitCount = events.filter((e) => e.type === "summit").length;
  const maxCountries = 95;

  return (
    <section
      ref={sectionRef}
      id="summit-history"
      className="relative overflow-hidden bg-navy-dark py-24"
      aria-labelledby="history-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,33,84,0.3) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Since 2017
          </p>
          <h2
            id="history-heading"
            className="mb-4 text-3xl font-bold text-white sm:text-4xl"
          >
            History of Coast Guard Global Summits
          </h2>
          <div className="mb-6 h-0.5 w-16 bg-gold" />
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            From 34 countries at the inaugural summit in Tokyo to over{" "}
            {maxCountries} nations at the 4th edition — CGGS has grown into the
            world&apos;s premier coast guard cooperation forum, holding{" "}
            {summitCount} global summits and multiple working-level meetings.
          </p>
        </motion.div>

        {/* Growth stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {[
            { value: "2017", label: "Inaugural Summit" },
            { value: "4", label: "Global Summits" },
            { value: "95+", label: "Countries (2024)" },
            { value: "110+", label: "Agencies (2024)" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-sm border border-white/8 bg-white/5 px-4 py-4 text-center backdrop-blur-sm"
            >
              <p className="text-2xl font-bold text-gold sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter summit history"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                filter === f.key
                  ? "bg-gold text-navy shadow-md shadow-gold/20"
                  : "border border-white/15 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 lg:left-1/2 lg:-ml-px lg:block">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gold"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          <div className="space-y-20 lg:space-y-28">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <HistoryCard key={event.id} event={event} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-sm text-white/40">
              No events match this filter.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
