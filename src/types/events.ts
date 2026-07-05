export interface EventSpeaker {
  speaker_id: string;
  name: string;
  designation: string;
  country_org: string;
  image_url: string;
}

export type EventType =
  | "registration"
  | "plenary"
  | "seminar"
  | "panel"
  | "presentation"
  | "bilateral"
  | "networking"
  | "meal"
  | "gala"
  | "fleet_review"
  | "press";

export interface ScheduleEvent {
  event_id: string;
  start_time: string;
  end_time: string;
  type: EventType;
  title: string;
  description?: string;
  location: string;
  speakers: EventSpeaker[];
}

export interface SummitDay {
  day_number: number;
  date: string;
  theme: string;
  events: ScheduleEvent[];
}

export interface SummitSchedule {
  summit: string;
  location: string;
  venue: string;
  time_zone: string;
  dates: { start: string; end: string };
  schedule: SummitDay[];
}
