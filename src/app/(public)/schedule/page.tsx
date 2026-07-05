"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Clock,
  MapPin,
  ChevronDown,
  Calendar,
  Anchor,
  ArrowRight,
  Star,
} from "lucide-react";
import EventHero from "@/components/events/EventHero";
import EventCrossNav from "@/components/events/EventCrossNav";
import CTABanner from "@/components/events/CTABanner";
import { getDays, getSchedule } from "@/services/events";
import type { ScheduleEvent, SummitDay, EventSpeaker } from "@/types/events";

// ─── Type System ─────────────────────────────────────────────────────────────

interface TypeConfig {
  label: string;
  color: string;
  featured: boolean;
}

const TYPE_CONFIG: Record<string, TypeConfig> = {
  plenary: { label: "Plenary", color: "#0D2154", featured: true },
  seminar: { label: "Seminar", color: "#0E7490", featured: false },
  panel: { label: "Panel Discussion", color: "#6D28D9", featured: false },
  presentation: { label: "Presentation", color: "#0F766E", featured: false },
  bilateral: { label: "Bilateral", color: "#92400E", featured: false },
  networking: { label: "Networking", color: "#065F46", featured: false },
  meal: { label: "Dining", color: "#64748B", featured: false },
  gala: { label: "Gala Dinner", color: "#9A7A10", featured: true },
  fleet_review: { label: "Fleet Review", color: "#0D2154", featured: true },
  press: { label: "Press", color: "#9F1239", featured: false },
  registration: { label: "Registration", color: "#94A3B8", featured: false },
};

function isFeatured(type: string) {
  return TYPE_CONFIG[type]?.featured ?? false;
}

// ─── Badge ────────────────────────────────────────────────────────────────────

function TypeBadge({ type, dark = false }: { type: string; dark?: boolean }) {
  const cfg = TYPE_CONFIG[type] ?? { label: type, color: "#64748B", featured: false };
  if (dark) {
    return (
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
        style={{ background: "rgba(197,160,40,0.15)", color: "#C5A028", border: "1px solid rgba(197,160,40,0.3)" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
        {cfg.label}
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
      style={{
        background: `${cfg.color}14`,
        color: cfg.color,
        border: `1px solid ${cfg.color}28`,
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ─── Speaker Stack ────────────────────────────────────────────────────────────

function SpeakerStack({
  speakers,
  dark = false,
  size = "md",
}: {
  speakers: EventSpeaker[];
  dark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  if (!speakers || speakers.length === 0) return null;

  const shown = speakers.slice(0, 3);
  const extra = speakers.length - shown.length;
  const dim = size === "lg" ? "h-14 w-14" : size === "md" ? "h-11 w-11" : "h-8 w-8";
  const borderColor = dark ? "#06111E" : "white";

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-3">
        {shown.map((sp, i) => (
          <div
            key={sp.speaker_id}
            className={`${dim} rounded-full overflow-hidden border-2 shrink-0 bg-navy/10`}
            style={{ zIndex: shown.length - i, borderColor }}
            title={sp.name}
          >
            <img
              src={sp.image_url}
              alt={sp.name}
              className="h-full w-full object-cover object-top"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = "none";
                el.parentElement!.style.background = dark ? "rgba(255,255,255,0.1)" : "#0D215420";
              }}
            />
          </div>
        ))}
        {extra > 0 && (
          <div
            className={`${dim} rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0`}
            style={{
              zIndex: 0,
              background: dark ? "rgba(255,255,255,0.08)" : "rgba(13,33,84,0.06)",
              color: dark ? "rgba(255,255,255,0.5)" : "#0D2154",
              borderColor,
            }}
          >
            +{extra}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-semibold truncate leading-tight ${dark ? "text-white" : "text-navy"}`}>
          {speakers[0].name}
        </p>
        <p className={`text-xs truncate mt-0.5 ${dark ? "text-white/45" : "text-slate"}`}>
          {speakers[0].designation}
        </p>
      </div>
    </div>
  );
}

// ─── Subtle compass SVG watermark ─────────────────────────────────────────────

function CompassWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="0.75" />
      <circle cx="60" cy="60" r="15" stroke="currentColor" strokeWidth="0.75" />
      <line x1="60" y1="5" x2="60" y2="115" stroke="currentColor" strokeWidth="0.5" />
      <line x1="5" y1="60" x2="115" y2="60" stroke="currentColor" strokeWidth="0.5" />
      <polygon points="60,5 56,25 64,25" fill="currentColor" opacity="0.5" />
      <polygon points="60,115 56,95 64,95" fill="currentColor" opacity="0.3" />
      <text x="60" y="15" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="serif">N</text>
      <text x="110" y="63" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="serif">E</text>
      <text x="60" y="110" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="serif">S</text>
      <text x="12" y="63" textAnchor="middle" fontSize="8" fill="currentColor" fontFamily="serif">W</text>
    </svg>
  );
}

// ─── Featured Event Card ──────────────────────────────────────────────────────

function FeaturedEventCard({ event, onClick }: { event: ScheduleEvent; onClick: () => void }) {
  const isGala = event.type === "gala";

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="w-full text-left group col-span-full rounded-sm overflow-hidden relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{
        background: isGala
          ? "linear-gradient(135deg, #1a0e00 0%, #2d1a00 50%, #1a0e00 100%)"
          : "linear-gradient(135deg, #06111E 0%, #0D2154 55%, #112870 100%)",
      }}
    >
      {/* Gold top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C5A028, transparent)" }}
      />

      {/* Compass watermark */}
      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 w-48 h-48 text-white opacity-[0.04] hidden lg:block">
        <CompassWatermark className="w-full h-full" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          {/* Left: Content */}
          <div className="flex-1 min-w-0">
            {/* Badge + Time row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <TypeBadge type={event.type} dark />
              <div className="flex items-center gap-1.5 text-sm text-white/40">
                <Clock className="h-3.5 w-3.5 text-gold/50" />
                {event.start_time} – {event.end_time} IST
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-gold transition-colors duration-200 sm:text-2xl max-w-2xl">
              {event.title}
            </h3>

            {/* Description */}
            {event.description && (
              <p className="text-sm text-white/55 leading-relaxed line-clamp-2 mb-5 max-w-xl">
                {event.description}
              </p>
            )}

            {/* Venue */}
            <div className="flex items-center gap-2 text-xs text-white/35 mb-6">
              <MapPin className="h-3.5 w-3.5 text-gold/50 shrink-0" />
              {event.location}
            </div>

            {/* CTA */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-gold/80 group-hover:text-gold transition-colors">
              View Session Details
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Right: Speaker showcase */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="shrink-0 lg:min-w-[220px]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 mb-4">
                {event.speakers.length > 1 ? "Speakers" : "Speaker"}
              </p>
              <div className="flex flex-col gap-3">
                {event.speakers.slice(0, 3).map((sp) => (
                  <div key={sp.speaker_id} className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/15 shrink-0 bg-white/5">
                      <img
                        src={sp.image_url}
                        alt={sp.name}
                        className="h-full w-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white leading-tight">{sp.name}</p>
                      <p className="text-xs text-white/40 mt-0.5 leading-snug line-clamp-1">{sp.designation}</p>
                      {sp.country_org && (
                        <p className="text-[10px] text-gold/60 mt-0.5">{sp.country_org}</p>
                      )}
                    </div>
                  </div>
                ))}
                {event.speakers.length > 3 && (
                  <p className="text-xs text-white/30 pl-3">
                    + {event.speakers.length - 3} more speaker{event.speakers.length - 3 > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Regular Event Card ────────────────────────────────────────────────────────

function EventCard({ event, onClick }: { event: ScheduleEvent; onClick: () => void }) {
  const cfg = TYPE_CONFIG[event.type] ?? { label: event.type, color: "#64748B", featured: false };

  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="w-full text-left group rounded-sm bg-white overflow-hidden border border-l-4 border-navy/8 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{
        borderLeftColor: cfg.color,
        boxShadow: "0 1px 3px rgba(13,33,84,0.06), 0 1px 2px rgba(13,33,84,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 16px 40px -8px rgba(13,33,84,0.14), 0 0 0 1px ${cfg.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(13,33,84,0.06), 0 1px 2px rgba(13,33,84,0.04)";
      }}
    >
      {/* Card body */}
      <div className="p-5 pb-4">
        {/* Badge row */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <TypeBadge type={event.type} />
          <span className="text-xs font-mono text-slate/60 whitespace-nowrap pt-0.5">
            {event.start_time}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-navy leading-snug mb-2.5 group-hover:text-gold transition-colors duration-150 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-xs text-slate/80 leading-relaxed line-clamp-2 mb-3">
            {event.description}
          </p>
        )}

        {/* Venue */}
        <div className="flex items-center gap-1.5 text-xs text-slate/60">
          <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: `${cfg.color}80` }} />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-navy/6 bg-cream/40 px-5 py-3">
        {event.speakers && event.speakers.length > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <SpeakerStack speakers={event.speakers} size="sm" />
            <span className="shrink-0 flex items-center gap-1 text-xs font-semibold text-navy/30 group-hover:text-gold transition-colors">
              Details
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        ) : (
          <div className="flex justify-end">
            <span className="flex items-center gap-1 text-xs font-semibold text-navy/30 group-hover:text-gold transition-colors">
              View Details
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        )}
      </div>
    </motion.button>
  );
}

// ─── Event Detail Modal ────────────────────────────────────────────────────────

function EventModal({ event, onClose }: { event: ScheduleEvent; onClose: () => void }) {
  const cfg = TYPE_CONFIG[event.type] ?? { label: event.type, color: "#0D2154", featured: false };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-navy-dark/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-lg rounded-t-sm sm:rounded-sm bg-white shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        {/* Colored top bar */}
        <div className="h-1 w-full" style={{ background: cfg.color }} />

        {/* Header */}
        <div className="gradient-navy px-6 py-6 relative">
          <div
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-28 h-28 text-white opacity-[0.05] hidden sm:block"
          >
            <CompassWatermark className="w-full h-full" />
          </div>

          <div className="flex items-start justify-between gap-3 relative">
            <div className="flex-1 min-w-0">
              <TypeBadge type={event.type} dark />
              <h2 className="mt-3 text-lg font-bold text-white leading-snug pr-8">
                {event.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 mt-1 p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Key details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-sm bg-cream border border-navy/8 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: cfg.color }}>
                Time
              </p>
              <p className="text-sm font-bold text-navy">
                {event.start_time} – {event.end_time}
              </p>
              <p className="text-[10px] text-slate mt-0.5">IST</p>
            </div>
            <div className="rounded-sm bg-cream border border-navy/8 p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: cfg.color }}>
                Venue
              </p>
              <p className="text-sm font-bold text-navy line-clamp-2 leading-snug">
                {event.location}
              </p>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: cfg.color }}>
                Overview
              </p>
              <p className="text-sm text-slate leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Speakers */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: cfg.color }}>
                {event.speakers.length === 1 ? "Speaker" : "Speakers"}
              </p>
              <div className="space-y-3">
                {event.speakers.map((sp) => (
                  <div
                    key={sp.speaker_id}
                    className="flex items-center gap-4 rounded-sm border border-navy/8 bg-cream/60 p-3"
                  >
                    <div className="h-12 w-12 rounded-full bg-navy/8 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      <img
                        src={sp.image_url}
                        alt={sp.name}
                        className="h-full w-full object-cover object-top"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-navy leading-tight">{sp.name}</p>
                      <p className="text-xs text-slate mt-0.5 leading-snug line-clamp-1">
                        {sp.designation}
                      </p>
                      <p className="text-xs font-medium mt-0.5" style={{ color: cfg.color }}>
                        {sp.country_org}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-navy/8 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-sm py-2.5 text-sm font-semibold text-white transition-colors"
            style={{ background: cfg.color }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Day Tab ──────────────────────────────────────────────────────────────────

function DayTab({ day, active, onClick }: { day: SummitDay; active: boolean; onClick: () => void }) {
  const d = new Date(day.date);
  const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = d.getDate();
  const month = d.toLocaleDateString("en-US", { month: "long" });

  return (
    <button
      onClick={onClick}
      className={`group flex-1 min-w-[100px] flex flex-col items-center gap-1 px-5 py-4 border-b-2 transition-all ${
        active
          ? "border-gold bg-gold/4 text-navy"
          : "border-transparent text-slate hover:text-navy hover:bg-navy/3"
      }`}
    >
      <span
        className={`text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
          active ? "text-gold" : "text-slate/60 group-hover:text-gold/70"
        }`}
      >
        Day {day.day_number}
      </span>
      <span className={`text-lg font-black transition-colors ${active ? "text-navy" : "text-slate/70"}`}>
        {dayNum}
      </span>
      <span className={`text-[11px] transition-colors ${active ? "text-navy/60" : "text-slate/50"}`}>
        {dayName}, {month.slice(0, 3)}
      </span>
      <span
        className={`text-[10px] leading-tight text-center mt-1 max-w-[110px] hidden sm:block transition-colors ${
          active ? "text-gold/80" : "text-slate/40 group-hover:text-slate/60"
        }`}
      >
        {day.theme.split(":")[0]}
      </span>
    </button>
  );
}

// ─── Premium Day Overview Card ─────────────────────────────────────────────────

function DayOverviewCard({
  day,
  index,
  onClick,
}: {
  day: SummitDay;
  index: number;
  onClick: () => void;
}) {
  const d = new Date(day.date);
  const dateStr = d.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });
  const keyEvents = day.events.filter((e) => isFeatured(e.type)).slice(0, 2);
  const allKeyEvents = keyEvents.length > 0 ? keyEvents : day.events.slice(0, 2);

  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.4 }}
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="group text-left rounded-sm border border-white/10 bg-white/5 overflow-hidden hover:border-gold/35 hover:bg-white/7 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold relative"
    >
      {/* Large number watermark */}
      <div className="absolute right-3 top-2 text-8xl font-black text-white select-none pointer-events-none"
           style={{ opacity: 0.04, lineHeight: 1 }}>
        {String(day.day_number).padStart(2, "0")}
      </div>

      <div className="relative p-6">
        {/* Top */}
        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold/70">
            Day {day.day_number}
          </span>
          <p className="text-base font-bold text-white mt-1.5 leading-snug">{dateStr}</p>
          <div className="mt-3 h-px" style={{ background: "linear-gradient(90deg, rgba(197,160,40,0.5), transparent)" }} />
        </div>

        {/* Theme */}
        <p className="text-xs font-semibold text-gold/80 mb-4 leading-relaxed">{day.theme}</p>

        {/* Highlight events */}
        <div className="space-y-2.5 mb-5">
          {allKeyEvents.map((e) => (
            <div key={e.event_id} className="flex items-start gap-2.5">
              <span className="text-[10px] font-mono text-white/25 shrink-0 pt-0.5 min-w-[38px]">
                {e.start_time}
              </span>
              <div className="flex items-start gap-1.5 min-w-0">
                <Star className="h-2.5 w-2.5 text-gold/40 shrink-0 mt-0.5" />
                <span className="text-xs text-white/60 leading-snug line-clamp-1">{e.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-white/25 uppercase tracking-wide">
            {day.events.length} sessions
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-gold/60 group-hover:text-gold transition-colors">
            View Day {day.day_number}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SchedulePage() {
  const schedule = getSchedule();
  const days = getDays();

  const [activeDay, setActiveDay] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const currentDay = days.find((d) => d.day_number === activeDay)!;

  const filteredEvents = useMemo(() => {
    if (!currentDay) return [];
    let events = currentDay.events;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          (e.description?.toLowerCase().includes(q) ?? false) ||
          e.location.toLowerCase().includes(q) ||
          e.speakers.some((s) => s.name.toLowerCase().includes(q))
      );
    }
    if (selectedTypes.length > 0) {
      events = events.filter((e) => selectedTypes.includes(e.type));
    }
    return events;
  }, [currentDay, searchQuery, selectedTypes]);

  function toggleType(type: string) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  const allTypes = Object.entries(TYPE_CONFIG).map(([key, val]) => ({ key, ...val }));

  return (
    <>
      <EventHero
        badge="CGGS 2027"
        title="Event Schedule"
        subtitle={`${schedule.summit} — three days of plenary sessions, seminars, fleet review, and gala evenings at ${schedule.venue}.`}
        breadcrumbs={[{ label: "Events" }, { label: "Schedule" }]}
        backgroundClass="gradient-navy"
      >
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Calendar, text: "15–17 February 2027" },
            { icon: MapPin, text: schedule.venue },
            { icon: Clock, text: schedule.time_zone },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              <Icon className="h-3.5 w-3.5 text-gold" />
              {text}
            </div>
          ))}
        </div>
      </EventHero>

      {/* Day Tabs */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-navy/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <DayTab
                key={day.day_number}
                day={day}
                active={activeDay === day.day_number}
                onClick={() => {
                  setActiveDay(day.day_number);
                  setSearchQuery("");
                  setSelectedTypes([]);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Theme strip */}
      <div className="bg-cream border-b border-navy/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center gap-3">
          <Anchor className="h-4 w-4 text-gold shrink-0" />
          <p className="text-sm text-navy">
            <span className="font-bold text-gold">Day {activeDay} — </span>
            <span className="font-medium">{currentDay?.theme}</span>
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border-b border-navy/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions, speakers, venues…"
              className="w-full rounded-sm border border-navy/12 py-2.5 pl-9 pr-9 text-sm text-navy placeholder-slate/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold bg-cream/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/50 hover:text-navy"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters((p) => !p)}
            className={`flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors shrink-0 ${
              selectedTypes.length > 0
                ? "border-gold bg-gold/8 text-gold"
                : "border-navy/12 text-slate hover:border-navy/25 hover:text-navy"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filter
            {selectedTypes.length > 0 && (
              <span className="rounded-full bg-gold text-navy text-[10px] font-bold px-1.5 py-0.5">
                {selectedTypes.length}
              </span>
            )}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-navy/6"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-wrap gap-2">
                {allTypes.map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => toggleType(key)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide transition-all"
                    style={
                      selectedTypes.includes(key)
                        ? { background: `${color}14`, color, border: `1.5px solid ${color}` }
                        : { background: "transparent", color: "#64748B", border: "1.5px solid rgba(13,33,84,0.12)" }
                    }
                  >
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />
                    {label}
                  </button>
                ))}
                {selectedTypes.length > 0 && (
                  <button
                    onClick={() => setSelectedTypes([])}
                    className="text-xs text-slate/60 underline underline-offset-2 hover:text-navy transition-colors ml-1"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Events Grid */}
      <section className="bg-[#F4F5F8] min-h-[50vh] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <Calendar className="h-12 w-12 text-navy/15 mb-4" />
              <p className="text-navy font-bold text-lg">No sessions found</p>
              <p className="text-slate text-sm mt-1">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedTypes([]); }}
                className="mt-5 rounded-sm bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-mid transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate/60 uppercase tracking-wider">
                  {filteredEvents.length} session{filteredEvents.length !== 1 ? "s" : ""} · Day {activeDay}
                </p>
                <p className="text-xs text-slate/50">Click any session for details</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, i) =>
                    isFeatured(event.type) ? (
                      <motion.div
                        key={event.event_id}
                        className="col-span-full"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <FeaturedEventCard event={event} onClick={() => setSelectedEvent(event)} />
                      </motion.div>
                    ) : (
                      <EventCard
                        key={event.event_id}
                        event={event}
                        onClick={() => setSelectedEvent(event)}
                      />
                    )
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Three Day Overview */}
      <section className="gradient-navy py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              Summit Overview
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Three Days, One Vision</h2>
            <p className="mt-3 text-sm text-white/50 max-w-lg mx-auto">
              Each day of the summit builds toward a landmark moment for global maritime cooperation.
            </p>
            <div className="mx-auto mt-5 h-px w-16 bg-gold/40" />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3">
            {days.map((day, i) => (
              <DayOverviewCard
                key={day.day_number}
                day={day}
                index={i}
                onClick={() => {
                  setActiveDay(day.day_number);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <EventCrossNav currentHref="/schedule" title="Explore Other CGGS 2027 Events" />

      <CTABanner
        eyebrow="Delegate Registration"
        title="Secure Your Place at CGGS 2027"
        subtitle="Join 1,200+ delegates from 57 nations for three days of landmark maritime diplomacy, fleet review, and cultural celebration in Chennai."
        primaryLabel="Register as Delegate"
        primaryHref="/register"
        secondaryLabel="Learn About the Summit"
        secondaryHref="/about-cggs"
      />

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
