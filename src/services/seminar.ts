import type { Seminar, SeminarSpeaker, SeminarSession } from "@/types/seminar";
import seminarData from "../../public/mock-data/seminar.json";

export function getSeminar(): Seminar {
  return seminarData as Seminar;
}

export function getSeminarSpeakers(): SeminarSpeaker[] {
  return seminarData.featured_speakers as SeminarSpeaker[];
}

export function getKeynoteSpeakers(): SeminarSpeaker[] {
  return seminarData.featured_speakers.filter((s) => s.keynote) as SeminarSpeaker[];
}

export function getSeminarSessions(): SeminarSession[] {
  return seminarData.sessions as SeminarSession[];
}

export function getSeminarStatistics() {
  return {
    sessions: seminarData.sessions.length,
    speakers: seminarData.featured_speakers.length,
    countries: seminarData.countries_represented,
    delegates: seminarData.delegate_count,
    papers: seminarData.papers_expected,
    categories: seminarData.session_categories.length,
  };
}
