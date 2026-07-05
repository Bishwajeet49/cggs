export type SessionCategory =
  | "official"
  | "seminar"
  | "fleet_review"
  | "exhibition"
  | "networking"
  | "meal";

export type SessionStatus =
  | "completed"
  | "current"
  | "upcoming"
  | "cancelled"
  | "changed";

export type ScheduleAlertType =
  | "schedule_change"
  | "venue_change"
  | "time_update"
  | "cancelled"
  | "new_session";

export interface ScheduleSpeaker {
  name: string;
  designation: string;
  image: string;
}

export interface ScheduleDocument {
  name: string;
  url: string;
}

export interface DelegateSession {
  id: string;
  title: string;
  description: string;
  agenda: string | null;
  category: SessionCategory;
  day: number;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  hall: string;
  floor: string;
  seatNumber: string;
  dressCode: string;
  walkingTimeMinutes: number;
  speakers: ScheduleSpeaker[];
  documents: ScheduleDocument[];
  notes: string | null;
  statusOverride: SessionStatus | null;
}

export interface ScheduleDay {
  day: number;
  date: string;
  theme: string;
  sessions: DelegateSession[];
}

export interface ScheduleAlert {
  id: string;
  type: ScheduleAlertType;
  title: string;
  message: string;
  session_id: string;
  timestamp: string;
}

export interface CurrentVenue {
  name: string;
  hall: string;
  floor: string;
  walking_time_minutes: number;
  directions_url: string;
}

export interface DelegateScheduleData {
  registration_approved: boolean;
  preview_clock: string;
  summit_dates: { start: string; end: string; label: string };
  current_venue: CurrentVenue;
  alerts: ScheduleAlert[];
  days: ScheduleDay[];
}

export interface SessionWithStatus extends DelegateSession {
  status: SessionStatus;
  durationMinutes: number;
}

export interface ScheduleStats {
  total: number;
  upcoming: number;
  completed: number;
  remaining: number;
  seminar: number;
  fleetReviewDay: number;
}

export interface NextSessionInfo {
  session: SessionWithStatus;
  startsInLabel: string;
}
