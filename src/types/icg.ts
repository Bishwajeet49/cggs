export interface IcgAboutContent {
  tagline: string;
  motto_sanskrit: string;
  motto_english: string;
  mission: string;
  description: string;
  established_interim: string;
  established_formal: string;
  coast_guard_day: string;
  parent_agency: string;
  headquarters: string;
  director_general: string;
  image_url: string;
  image_alt: string;
}

export interface IcgMissionArea {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface IcgHistoryMilestone {
  id: string;
  sort_order: number;
  year: string;
  title: string;
  description: string;
  image_url?: string;
  image_alt?: string;
  highlight?: boolean;
}

export interface IcgRegion {
  id: string;
  name: string;
  code: string;
  hq: string;
  seaboard: string;
}

export interface IcgFleetStat {
  label: string;
  value: string;
  icon: string;
}

export interface IcgLeadership {
  name: string;
  rank: string;
  title: string;
  message: string;
  image_url: string;
  image_alt: string;
}

export interface IcgGalleryImage {
  id: string;
  url: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface IcgGoldenJubilee {
  title: string;
  years: string;
  description: string;
  milestones: { year: string; event: string; active?: boolean }[];
}

export interface IcgAboutData {
  about: IcgAboutContent;
  missions: IcgMissionArea[];
  history: IcgHistoryMilestone[];
  regions: IcgRegion[];
  fleet_stats: IcgFleetStat[];
  leadership: IcgLeadership;
  gallery: IcgGalleryImage[];
  golden_jubilee: IcgGoldenJubilee;
}
