export type SummitEventType = "summit" | "working_meeting" | "symposium";

export interface CggsPillar {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface CggsAboutContent {
  tagline: string;
  mission: string;
  description: string;
  objectives: string[];
  secretariat: string;
  co_founders: string[];
  pillars: CggsPillar[];
}

export interface SummitHistoryEvent {
  id: string;
  sort_order: number;
  type: SummitEventType;
  title: string;
  edition?: number;
  host: string;
  date: string;
  date_iso: string;
  location: string;
  participants: string;
  theme?: string;
  summary: string;
  themes?: string[];
  outcomes?: string[];
  image_url: string;
  image_alt: string;
}

export interface CggsIndia2027 {
  title: string;
  subtitle: string;
  location: string;
  dates: string;
  significance: string;
  why_chennai: string;
  highlights: { title: string; description: string }[];
}

export interface CggsAboutData {
  about: CggsAboutContent;
  history: SummitHistoryEvent[];
  india_2027: CggsIndia2027;
}
