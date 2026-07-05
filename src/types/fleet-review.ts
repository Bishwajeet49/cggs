export interface Ship {
  ship_id: string;
  name: string;
  type: string;
  class: string;
  country: string;
  country_code: string;
  displacement_tonnes: number;
  length_m: number;
  crew: number;
  commissioned: number;
  role: string;
  capabilities: string[];
  highlight: boolean;
  description: string;
  image_url: string;
}

export interface ParticipatingNation {
  country: string;
  code: string;
  vessels: number;
  delegation_leader: string;
}

export interface FleetHistoryEntry {
  year: number;
  host: string;
  location: string;
  ships: number;
  nations: number;
  notes: string;
}

export interface FleetObjective {
  title: string;
  description: string;
}

export interface FleetStatistics {
  participating_nations: number;
  vessels: number;
  aircraft: number;
  personnel: number;
  observers: number;
  duration_hours: number;
}

export interface ProgrammeEntry {
  time: string;
  activity: string;
}

export interface GalleryItem {
  id: string;
  caption: string;
  category: string;
}

export interface ImportantInformation {
  dress_code: string;
  viewing_areas: string[];
  transport: string;
  photography: string;
  safety: string;
  contact: string;
}

export interface FleetReview {
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  reviewing_authority: string;
  host_authority: string;
  about: string;
  significance: string;
  history: FleetHistoryEntry[];
  objectives: FleetObjective[];
  statistics: FleetStatistics;
  programme: ProgrammeEntry[];
  ships: Ship[];
  participating_nations: ParticipatingNation[];
  important_information: ImportantInformation;
  gallery: GalleryItem[];
}
