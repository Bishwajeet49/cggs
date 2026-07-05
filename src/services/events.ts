import type { SummitSchedule, SummitDay, ScheduleEvent } from "@/types/events";
import eventsData from "../../public/mock-data/events.json";

export function getSchedule(): SummitSchedule {
  return eventsData as SummitSchedule;
}

export function getDays(): SummitDay[] {
  return eventsData.schedule as SummitDay[];
}

export function getDayByNumber(dayNumber: number): SummitDay | undefined {
  return eventsData.schedule.find((d) => d.day_number === dayNumber) as
    | SummitDay
    | undefined;
}

export function getEventById(eventId: string): ScheduleEvent | undefined {
  for (const day of eventsData.schedule) {
    const event = day.events.find((e) => e.event_id === eventId);
    if (event) return event as ScheduleEvent;
  }
  return undefined;
}

export function getFeaturedSpeakers() {
  const seen = new Set<string>();
  const speakers = [];
  for (const day of eventsData.schedule) {
    for (const event of day.events) {
      for (const speaker of event.speakers) {
        if (!seen.has(speaker.speaker_id)) {
          seen.add(speaker.speaker_id);
          speakers.push(speaker);
        }
      }
    }
  }
  return speakers;
}
