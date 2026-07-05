import type { SessionWithStatus } from "@/types/delegate-schedule";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toIcsDate(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [hh, mm] = time.split(":");
  return `${y}${m}${d}T${hh}${mm}00`;
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export function generateIcsContent(sessions: SessionWithStatus[], calendarName = "CGGS 2027 Schedule"): string {
  const now = new Date();
  const dtStamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;

  const events = sessions.map((s) => {
    const uid = `${s.id}@cggs2027.in`;
    const location = escapeIcs(`${s.hall}, ${s.venue}`);
    const description = escapeIcs(
      [s.description, s.seatNumber ? `Seat: ${s.seatNumber}` : "", s.dressCode ? `Dress: ${s.dressCode}` : ""]
        .filter(Boolean)
        .join("\\n\\n")
    );
    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${dtStamp}`,
      `DTSTART;TZID=Asia/Kolkata:${toIcsDate(s.date, s.startTime)}`,
      `DTEND;TZID=Asia/Kolkata:${toIcsDate(s.date, s.endTime)}`,
      `SUMMARY:${escapeIcs(s.title)}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CGGS 2027//Delegate Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcs(calendarName)}`,
    "X-WR-TIMEZONE:Asia/Kolkata",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcsFile(sessions: SessionWithStatus[], filename = "cggs-2027-schedule.ics") {
  const content = generateIcsContent(sessions);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(session: SessionWithStatus): string {
  const start = `${session.date.replace(/-/g, "")}T${session.startTime.replace(":", "")}00`;
  const end = `${session.date.replace(/-/g, "")}T${session.endTime.replace(":", "")}00`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: session.title,
    dates: `${start}/${end}`,
    details: session.description,
    location: `${session.hall}, ${session.venue}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function getOutlookCalendarUrl(session: SessionWithStatus): string {
  const params = new URLSearchParams({
    subject: session.title,
    startdt: `${session.date}T${session.startTime}:00+05:30`,
    enddt: `${session.date}T${session.endTime}:00+05:30`,
    body: session.description,
    location: `${session.hall}, ${session.venue}`,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

export function getAppleCalendarUrl(session: SessionWithStatus): string {
  downloadIcsFile([session], `${session.id}.ics`);
  return "#";
}

export function downloadAllCalendar(sessions: SessionWithStatus[]) {
  downloadIcsFile(sessions);
}
