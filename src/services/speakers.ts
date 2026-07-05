import type { Speaker } from "@/types/common";
import speakersData from "../../public/mock-data/speakers.json";

export function getSpeakers(): Speaker[] {
  return speakersData.speakers as Speaker[];
}

export function getSpeakerById(id: string): Speaker | undefined {
  return speakersData.speakers.find((s) => s.speaker_id === id) as
    | Speaker
    | undefined;
}

export function getFeaturedSpeakers(limit = 6): Speaker[] {
  return speakersData.speakers.slice(0, limit) as Speaker[];
}
