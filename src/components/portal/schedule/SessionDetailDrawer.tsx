"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Clock, Armchair, Shirt, Download, CalendarPlus,
  Share2, FileText, Bell, Navigation,
} from "lucide-react";
import type { SessionWithStatus } from "@/types/delegate-schedule";
import {
  CATEGORY_LABELS,
  STATUS_STYLES,
  getStartsInLabel,
} from "@/services/delegateSchedule";
import {
  getGoogleCalendarUrl,
  getOutlookCalendarUrl,
  downloadIcsFile,
} from "@/lib/calendarExport";

interface SessionDetailDrawerProps {
  session: SessionWithStatus | null;
  onClose: () => void;
}

export default function SessionDetailDrawer({ session, onClose }: SessionDetailDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (session) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [session]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const statusStyle = session ? STATUS_STYLES[session.status] : null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {session && statusStyle && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 h-dvh w-screen bg-navy-dark/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-100 flex h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={session.title}
          >
            {/* Header */}
            <div className={`shrink-0 border-b border-gray-100 border-l-4 ${statusStyle.border} p-5`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="rounded-full bg-navy/8 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-navy">
                    {CATEGORY_LABELS[session.category]}
                  </span>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-navy">{session.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-slate/60">
                    <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
                    {statusStyle.label} · {getStartsInLabel(session)}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 rounded-lg p-1.5 text-slate/50 hover:bg-gray-100 hover:text-navy"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <p className="text-sm leading-relaxed text-slate/80">{session.description}</p>

              {session.agenda && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy">Agenda</p>
                  <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 text-xs leading-relaxed text-slate/75 font-sans">
                    {session.agenda}
                  </pre>
                </div>
              )}

              {/* Meta grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Clock, label: "Time", value: `${session.startTime} – ${session.endTime}` },
                  { icon: MapPin, label: "Venue", value: session.hall },
                  { icon: Armchair, label: "Seat", value: session.seatNumber },
                  { icon: Shirt, label: "Dress Code", value: session.dressCode },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-lg border border-gray-100 p-3">
                      <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                        <Icon className="h-3 w-3" />{item.label}
                      </p>
                      <p className="mt-1 text-xs font-medium text-navy">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-slate/55">
                {session.venue} · {session.floor} · {session.walkingTimeMinutes} min walk
              </p>

              {/* Speakers */}
              {session.speakers.length > 0 && (
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Speakers</p>
                  <div className="space-y-3">
                    {session.speakers.map((sp) => (
                      <div key={sp.name} className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                          {sp.image ? (
                            <Image src={sp.image} alt={sp.name} fill className="object-cover" sizes="40px" />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-navy/40">
                              {sp.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">{sp.name}</p>
                          <p className="text-xs text-slate/60">{sp.designation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {session.documents.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy">Documents</p>
                  <div className="space-y-2">
                    {session.documents.map((doc) => (
                      <a
                        key={doc.name}
                        href={doc.url}
                        className="flex items-center gap-2 rounded-lg border border-gray-100 px-3 py-2 text-xs font-medium text-navy transition-colors hover:border-gold/30 hover:bg-gold/5"
                      >
                        <FileText className="h-3.5 w-3.5 text-gold" />
                        {doc.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {session.notes && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-semibold text-amber-800">Note</p>
                  <p className="mt-0.5 text-xs text-amber-700">{session.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="shrink-0 border-t border-gray-100 p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={getGoogleCalendarUrl(session)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[11px] font-semibold text-navy hover:bg-gray-50"
                >
                  <CalendarPlus className="h-3.5 w-3.5" /> Google
                </a>
                <a
                  href={getOutlookCalendarUrl(session)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[11px] font-semibold text-navy hover:bg-gray-50"
                >
                  <CalendarPlus className="h-3.5 w-3.5" /> Outlook
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => downloadIcsFile([session])}
                  className="flex items-center justify-center gap-1 rounded-lg bg-navy py-2 text-[11px] font-semibold text-white hover:bg-navy-mid"
                >
                  <Download className="h-3.5 w-3.5" /> ICS
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-[11px] font-semibold text-navy hover:bg-gray-50"
                >
                  <Share2 className="h-3.5 w-3.5" /> Print
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 rounded-lg border border-gold/30 bg-gold/10 py-2 text-[11px] font-semibold text-gold-dark hover:bg-gold/15"
                >
                  <Bell className="h-3.5 w-3.5" /> Remind
                </button>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-xs font-semibold text-navy hover:bg-gray-50"
              >
                <Navigation className="h-4 w-4 text-gold" />
                Navigate to Venue
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
