"use client";

import { CheckCircle2, Circle } from "lucide-react";
import type { SessionWithStatus } from "@/types/delegate-schedule";
import { getStartsInLabel } from "@/services/delegateSchedule";

interface TodayMissionProps {
  sessions: SessionWithStatus[];
  onSelect: (session: SessionWithStatus) => void;
}

export default function TodayMission({ sessions, onSelect }: TodayMissionProps) {
  const keySessions = sessions.filter((s) =>
    ["official", "seminar", "meal", "fleet_review"].includes(s.category)
  ).slice(0, 6);

  return (
    <div className="rounded-2xl border border-blue-100/80 bg-blue-50/40 p-4 sm:p-5">
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-navy">
        Today&apos;s Mission
      </p>
      <div className="space-y-0">
        {keySessions.map((session, i) => {
          const isCompleted = session.status === "completed";
          const isCurrent = session.status === "current";
          const isLast = i === keySessions.length - 1;

          return (
            <div key={session.id}>
              <button
                type="button"
                onClick={() => onSelect(session)}
                className="group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-white/70"
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                ) : isCurrent ? (
                  <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-50" />
                    <span className="relative h-3 w-3 rounded-full bg-gold" />
                  </span>
                ) : (
                  <Circle className="h-5 w-5 shrink-0 text-slate/25" />
                )}
                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${isCompleted ? "text-slate/50 line-through" : isCurrent ? "font-semibold text-navy" : "text-navy/75"}`}>
                    {session.title}
                  </p>
                  {isCurrent && (
                    <p className="text-[10px] font-semibold text-gold">{getStartsInLabel(session)}</p>
                  )}
                  {isCompleted && (
                    <p className="text-[10px] text-emerald-600">Completed</p>
                  )}
                </div>
                <span className="shrink-0 text-[10px] tabular-nums text-slate/40">{session.startTime}</span>
              </button>
              {!isLast && (
                <div aria-hidden="true" className="ml-[18px] h-3 border-l border-dashed border-slate/20" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
