export interface SeminarSpeaker {
  speaker_id: string;
  name: string;
  designation: string;
  organization: string;
  country: string;
  country_code: string;
  image_url: string;
  bio: string;
  sessions: string[];
  expertise: string[];
  keynote: boolean;
}

export interface SeminarSession {
  session_id: string;
  session_number: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  chair: string;
  description: string;
  topics: string[];
  speakers: string[];
  outcomes: string;
}

export interface SessionCategory {
  id: string;
  name: string;
  color: string;
  description: string;
  session_count: number;
}

export interface BreakoutRoom {
  name: string;
  capacity: number;
  purpose: string;
}

export interface VenueInformation {
  name: string;
  hotel: string;
  address: string;
  capacity: number;
  facilities: string[];
  breakout_rooms: BreakoutRoom[];
  map_embed: string;
}

export interface SeminarFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Seminar {
  title: string;
  subtitle: string;
  edition: string;
  dates: string;
  venue: string;
  theme: string;
  theme_description: string;
  about: string;
  objectives: SeminarObjective[];
  sessions: SeminarSession[];
  session_categories: SessionCategory[];
  featured_speakers: SeminarSpeaker[];
  topics: string[];
  venue_information: VenueInformation;
  faqs: SeminarFAQ[];
  delegate_count: number;
  countries_represented: number;
  papers_expected: number;
}

export interface SeminarObjective {
  id: string;
  title: string;
  description: string;
  icon: string;
}
