"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin, Clock, Mic2, Bell, Navigation, ChevronRight,
  CheckCircle2,
} from "lucide-react";
import type { SessionWithStatus } from "@/types/delegate-schedule";
import {
  CATEGORY_LABELS,
  STATUS_STYLES,
  getStartsInLabel,
} from "@/services/delegateSchedule";

interface SessionTimelineProps {
  sessions: SessionWithStatus[];
  onSelect: (session: SessionWithStatus) => void;
}

export default function SessionTimeline({ sessions, onSelect }: SessionTimelineProps) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 py-12 text-center">
        <p className="text-sm text-slate/60">No sessions match your filters.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute left-[27px] top-4 bottom-4 w-px bg-gray-200" />
      <ol className="space-y-4">
        {sessions.map((session, i) => {
          const style = STATUS_STYLES[session.status];
          const isCurrent = session.status === "current";
          const isCompleted = session.status === "completed";

          return (
            <motion.li
              key={session.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex gap-4"
            >
              {/* Time column */}
              <div className="relative z-10 flex w-14 shrink-0 flex-col items-center gap-1 pt-2">
                {isCompleted ? (
                  <CheckCircle2 className="h-7 w-7 text-emerald-500" />
                ) : (
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 ${
                      isCurrent ? "border-gold bg-gold/15" : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                  </div>
                )}
                <p className="text-[10px] font-bold tabular-nums text-navy/60">{session.startTime}</p>
              </div>

              {/* Card */}
              <button
                type="button"
                onClick={() => onSelect(session)}
                className={`group min-w-0 flex-1 rounded-2xl border border-gray-100 border-l-4 ${style.border} ${style.bg} p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <span className="rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-navy">
                    {CATEGORY_LABELS[session.category]}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold ${isCurrent ? "text-gold" : "text-slate/50"}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {style.label}
                  </span>
                </div>

                <h3 className={`mt-2 text-sm font-bold leading-snug sm:text-base ${isCompleted ? "text-slate/55 line-through" : "text-navy"}`}>
                  {session.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate/65">
                  {session.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1 text-xs text-slate/60">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {session.hall}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate/60">
                    <Clock className="h-3 w-3 shrink-0" />
                    {session.durationMinutes} min
                  </span>
                </div>

                {session.speakers.length > 0 && (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {session.speakers.slice(0, 3).map((sp) => (
                        <div
                          key={sp.name}
                          className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white bg-gray-100"
                        >
                          {sp.image ? (
                            <Image src={sp.image} alt={sp.name} fill className="object-cover" sizes="28px" />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-[9px] font-bold text-navy/40">
                              {sp.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-slate/55">
                      <Mic2 className="h-3 w-3 shrink-0" />
                      {session.speakers.map((s) => s.name.split(" ").slice(-1)[0]).join(", ")}
                    </span>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between border-t border-gray-100/80 pt-3">
                  <span className={`text-[11px] font-semibold ${session.status === "upcoming" ? "text-teal-600" : "text-slate/45"}`}>
                    {getStartsInLabel(session)}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-gold">
                      Details <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>

                {/* Quick action row visible on mobile */}
                <div className="mt-2 flex gap-2 sm:hidden">
                  <span className="flex items-center gap-1 rounded-md bg-navy/5 px-2 py-1 text-[10px] text-navy">
                    <Navigation className="h-3 w-3" /> Navigate
                  </span>
                  <span className="flex items-center gap-1 rounded-md bg-gold/10 px-2 py-1 text-[10px] text-gold-dark">
                    <Bell className="h-3 w-3" /> Remind
                  </span>
                </div>
              </button>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
