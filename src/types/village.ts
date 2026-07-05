export interface ZoneExhibitor {
  name: string;
  country: string;
  code: string;
  type: string;
}

export interface ZoneScheduleEntry {
  day: number;
  time: string;
  activity: string;
}

export interface VillageZone {
  zone_id: string;
  name: string;
  short_name: string;
  icon: string;
  color: string;
  accent: string;
  location: string;
  description: string;
  highlights: string[];
  schedule: ZoneScheduleEntry[];
  exhibitors: ZoneExhibitor[];
}

export interface VillageStatistics {
  total_area_sqm: number;
  exhibitors: number;
  participating_nations: number;
  zones: number;
  cultural_performances: number;
  expected_footfall: number;
}

export interface PublicAccessHours {
  day1: string;
  day2: string;
  day3: string;
}

export interface VisitorInformation {
  entry: string;
  transport: string;
  parking: string;
  food: string;
  accessibility: string;
  photography: string;
  facilities: string[];
  contact: string;
}

export interface VillageGalleryItem {
  id: string;
  caption: string;
  zone: string;
}

export interface Village {
  title: string;
  subtitle: string;
  tagline: string;
  dates: string;
  timings: string;
  location: string;
  about: string;
  statistics: VillageStatistics;
  zones: VillageZone[];
  public_access_hours: PublicAccessHours;
  delegate_access_hours: string;
  visitor_information: VisitorInformation;
  gallery: VillageGalleryItem[];
}
