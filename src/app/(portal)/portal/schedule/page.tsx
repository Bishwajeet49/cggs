"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnimatedStats from "@/components/events/AnimatedStats";
import ScheduleEmptyState from "@/components/portal/schedule/ScheduleEmptyState";
import ScheduleHero from "@/components/portal/schedule/ScheduleHero";
import ScheduleDayTabs from "@/components/portal/schedule/ScheduleDayTabs";
import SessionTimeline from "@/components/portal/schedule/SessionTimeline";
import SessionDetailDrawer from "@/components/portal/schedule/SessionDetailDrawer";
import ScheduleAlerts from "@/components/portal/schedule/ScheduleAlerts";
import TodayMission from "@/components/portal/schedule/TodayMission";
import VenueWidget from "@/components/portal/schedule/VenueWidget";
import ScheduleQuickActions from "@/components/portal/schedule/ScheduleQuickActions";
import {
  isScheduleApproved,
  getScheduleDays,
  getScheduleAlerts,
  getScheduleCurrentVenue,
  getScheduleStats,
  getNextSession,
  getCurrentDay,
  getSessionsForDay,
  filterSessions,
  CATEGORY_FILTERS,
} from "@/services/delegateSchedule";
import { downloadAllCalendar } from "@/lib/calendarExport";
import type { SessionCategory, SessionWithStatus } from "@/types/delegate-schedule";

const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

export default function SchedulePage() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const [activeDay, setActiveDay] = useState(getCurrentDay());
  const [category, setCategory] = useState<SessionCategory | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedSession, setSelectedSession] = useState<SessionWithStatus | null>(null);

  const approved = isScheduleApproved();
  const days = getScheduleDays();
  const alerts = getScheduleAlerts();
  const venue = getScheduleCurrentVenue();
  const stats = getScheduleStats();
  const nextSession = getNextSession();
  const currentDay = getCurrentDay();

  useEffect(() => {
    if (authUser) setUser(authUser);
    else {
      const stored = localStorage.getItem("cggs_auth_user");
      if (stored) { try { setUser(JSON.parse(stored)); } catch {} }
    }
  }, [authUser]);

  useEffect(() => {
    setActiveDay(currentDay);
  }, [currentDay]);

  const daySessions = useMemo(
    () => filterSessions(getSessionsForDay(activeDay), category, search),
    [activeDay, category, search]
  );

  const todaySessions = useMemo(
    () => getSessionsForDay(currentDay),
    [currentDay]
  );

  const delegateName = user ? `${user.firstName} ${user.lastName}`.trim() : "Delegate";
  const categoryLabel = user?.category
    ? CATEGORY_LABELS[user.category] ?? "Official Delegate"
    : "Official Delegate";

  const statItems = [
    { value: stats.total, label: "Total Sessions" },
    { value: stats.upcoming, label: "Upcoming" },
    { value: stats.completed, label: "Completed" },
    { value: stats.remaining, label: "Remaining" },
    { value: stats.seminar, label: "Seminar Sessions" },
    { value: stats.fleetReviewDay, label: "Fleet Review Day", suffix: "" },
  ];

  if (!approved) {
    return <ScheduleEmptyState />;
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <ScheduleHero
        delegateName={delegateName}
        categoryLabel={categoryLabel}
        summitDates="15–17 February 2027"
        currentDay={currentDay}
        totalSessions={stats.total}
        completedSessions={stats.completed}
        nextSession={nextSession}
      />

      {/* Stats */}
      <AnimatedStats stats={statItems} />

      {/* Alerts */}
      <ScheduleAlerts alerts={alerts} />

      {/* Day tabs */}
      <ScheduleDayTabs days={days} activeDay={activeDay} onChange={setActiveDay} />

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setCategory(f.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                category === f.id
                  ? "bg-navy text-white shadow-sm"
                  : "border border-gray-200 bg-white text-navy/70 hover:border-gold/30"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate/40" />
          <input
            type="search"
            placeholder="Search sessions…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-4 text-sm text-navy placeholder:text-slate/40 focus:border-gold/40 focus:outline-none focus:ring-2 focus:ring-gold/20 sm:w-64"
          />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:items-start">
        {/* Timeline */}
        <div className="xl:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-navy">
                  Day {activeDay} Timeline
                </h2>
                <span className="text-[11px] text-slate/50">
                  {daySessions.length} session{daySessions.length !== 1 ? "s" : ""}
                </span>
              </div>
              <SessionTimeline sessions={daySessions} onSelect={setSelectedSession} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 xl:col-span-1">
          {activeDay === currentDay && (
            <TodayMission sessions={todaySessions} onSelect={setSelectedSession} />
          )}
          <VenueWidget venue={venue} />
          <ScheduleQuickActions
            onExportCalendar={() => downloadAllCalendar(getSessionsForDay(activeDay))}
            onPrint={() => window.print()}
          />
        </div>
      </div>

      <SessionDetailDrawer
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
      />
    </div>
  );
}
