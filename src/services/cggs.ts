import type { CggsAboutContent, CggsAboutData, CggsIndia2027, SummitHistoryEvent } from "@/types/cggs";
import cggsData from "../../public/mock-data/cggs-about.json";

export function getCggsAbout(): CggsAboutContent {
  return (cggsData as CggsAboutData).about;
}

export function getSummitHistory(): SummitHistoryEvent[] {
  return [...(cggsData as CggsAboutData).history].sort((a, b) => a.sort_order - b.sort_order);
}

export function getSummitHistoryByType(type: SummitHistoryEvent["type"]): SummitHistoryEvent[] {
  return getSummitHistory().filter((event) => event.type === type);
}

export function getCggsIndia2027(): CggsIndia2027 {
  return (cggsData as CggsAboutData).india_2027;
}

export function getCggsAboutData(): CggsAboutData {
  return cggsData as CggsAboutData;
}
