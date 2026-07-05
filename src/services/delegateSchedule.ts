import type {
  DelegateScheduleData,
  DelegateSession,
  ScheduleDay,
  ScheduleStats,
  SessionCategory,
  SessionStatus,
  SessionWithStatus,
  NextSessionInfo,
} from "@/types/delegate-schedule";
import scheduleData from "../../public/mock-data/delegate-schedule.json";

export function getDelegateSchedule(): DelegateScheduleData {
  return scheduleData as DelegateScheduleData;
}

export function isScheduleApproved(): boolean {
  return getDelegateSchedule().registration_approved;
}

export function getScheduleDays(): ScheduleDay[] {
  return getDelegateSchedule().days;
}

export function getScheduleAlerts() {
  return getDelegateSchedule().alerts;
}

export function getScheduleCurrentVenue() {
  return getDelegateSchedule().current_venue;
}

export function getPreviewClock(): Date {
  return new Date(getDelegateSchedule().preview_clock);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseSessionDateTime(date: string, time: string): Date {
  const [h, m] = time.split(":").map(Number);
  return new Date(`${date}T${pad(h)}:${pad(m)}:00+05:30`);
}

export function getDurationMinutes(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

export function resolveSessionStatus(
  session: DelegateSession,
  now: Date = getPreviewClock()
): SessionStatus {
  if (session.statusOverride === "cancelled") return "cancelled";
  if (session.statusOverride === "changed") return "changed";

  const start = parseSessionDateTime(session.date, session.startTime);
  const end = parseSessionDateTime(session.date, session.endTime);

  if (now >= end) return "completed";
  if (now >= start && now < end) return "current";
  return "upcoming";
}

export function enrichSession(session: DelegateSession, now?: Date): SessionWithStatus {
  return {
    ...session,
    status: resolveSessionStatus(session, now),
    durationMinutes: getDurationMinutes(session.startTime, session.endTime),
  };
}

export function getAllSessions(now?: Date): SessionWithStatus[] {
  return getScheduleDays().flatMap((d) =>
    d.sessions.map((s) => enrichSession(s, now))
  );
}

export function getSessionsForDay(day: number, now?: Date): SessionWithStatus[] {
  const dayData = getScheduleDays().find((d) => d.day === day);
  if (!dayData) return [];
  return dayData.sessions.map((s) => enrichSession(s, now));
}

export function getStartsInLabel(session: SessionWithStatus, now: Date = getPreviewClock()): string {
  const start = parseSessionDateTime(session.date, session.startTime);
  const diffMs = start.getTime() - now.getTime();
  if (diffMs <= 0) {
    if (session.status === "current") return "In progress";
    if (session.status === "completed") return "Completed";
    return "Started";
  }
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `Starts in ${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  if (hrs >= 24) {
    const days = Math.floor(hrs / 24);
    return `Starts in ${days} day${days > 1 ? "s" : ""}`;
  }
  return rem > 0 ? `Starts in ${hrs}h ${rem}m` : `Starts in ${hrs}h`;
}

export function getNextSession(now: Date = getPreviewClock()): NextSessionInfo | null {
  const upcoming = getAllSessions(now)
    .filter((s) => s.status === "upcoming" || s.status === "current")
    .sort((a, b) => {
      const ta = parseSessionDateTime(a.date, a.startTime).getTime();
      const tb = parseSessionDateTime(b.date, b.startTime).getTime();
      return ta - tb;
    });

  const session = upcoming[0];
  if (!session) return null;

  return {
    session,
    startsInLabel: getStartsInLabel(session, now),
  };
}

export function getScheduleStats(now?: Date): ScheduleStats {
  const all = getAllSessions(now);
  const completed = all.filter((s) => s.status === "completed").length;
  const upcoming = all.filter((s) => s.status === "upcoming" || s.status === "current").length;
  const seminar = all.filter((s) => s.category === "seminar").length;
  const fleetDay = getScheduleDays().find((d) =>
    d.sessions.some((s) => s.category === "fleet_review")
  );

  return {
    total: all.length,
    upcoming,
    completed,
    remaining: all.length - completed,
    seminar,
    fleetReviewDay: fleetDay?.day ?? 3,
  };
}

export function getCurrentDay(now: Date = getPreviewClock()): number {
  const days = getScheduleDays();
  for (const d of days) {
    const dayStart = new Date(`${d.date}T00:00:00+05:30`);
    const nextDay = days.find((x) => x.day === d.day + 1);
    const dayEnd = nextDay
      ? new Date(`${nextDay.date}T00:00:00+05:30`)
      : new Date(`${d.date}T23:59:59+05:30`);
    if (now >= dayStart && now < dayEnd) return d.day;
  }
  if (now < new Date(`${days[0].date}T00:00:00+05:30`)) return 1;
  return days[days.length - 1].day;
}

export function getDayCompletion(day: number, now?: Date): { completed: number; total: number } {
  const sessions = getSessionsForDay(day, now);
  return {
    completed: sessions.filter((s) => s.status === "completed").length,
    total: sessions.length,
  };
}

export function filterSessions(
  sessions: SessionWithStatus[],
  category: SessionCategory | "all",
  search: string
): SessionWithStatus[] {
  let result = sessions;
  if (category !== "all") {
    result = result.filter((s) => s.category === category);
  }
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.hall.toLowerCase().includes(q) ||
        s.speakers.some((sp) => sp.name.toLowerCase().includes(q))
    );
  }
  return result;
}

export function getSessionById(id: string, now?: Date): SessionWithStatus | undefined {
  return getAllSessions(now).find((s) => s.id === id);
}

export const CATEGORY_LABELS: Record<SessionCategory, string> = {
  official: "Official Event",
  seminar: "Seminar",
  fleet_review: "Fleet Review",
  exhibition: "Exhibition",
  networking: "Networking",
  meal: "Meal",
};

export const CATEGORY_FILTERS: { id: SessionCategory | "all"; label: string }[] = [
  { id: "all", label: "All Sessions" },
  { id: "official", label: "Official Events" },
  { id: "seminar", label: "Seminar" },
  { id: "fleet_review", label: "Fleet Review" },
  { id: "exhibition", label: "Exhibition" },
  { id: "networking", label: "Networking" },
  { id: "meal", label: "Meals" },
];

export const STATUS_STYLES: Record<
  SessionStatus,
  { dot: string; border: string; bg: string; label: string }
> = {
  completed: {
    dot: "bg-emerald-500",
    border: "border-l-emerald-500",
    bg: "bg-emerald-50/50",
    label: "Completed",
  },
  current: {
    dot: "bg-gold",
    border: "border-l-gold",
    bg: "bg-gold/5",
    label: "Current",
  },
  upcoming: {
    dot: "bg-blue-400",
    border: "border-l-blue-400",
    bg: "bg-white",
    label: "Upcoming",
  },
  cancelled: {
    dot: "bg-red-400",
    border: "border-l-red-400",
    bg: "bg-red-50/50",
    label: "Cancelled",
  },
  changed: {
    dot: "bg-amber-400",
    border: "border-l-amber-400",
    bg: "bg-amber-50/40",
    label: "Changed",
  },
};
