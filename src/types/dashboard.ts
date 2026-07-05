export interface DashboardAnnouncement {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  message: string;
}

export interface DashboardWeather {
  city: string;
  temp_c: number;
  feels_like_c: number;
  condition: string;
  humidity_pct: number;
  wind_kmh: number;
  sunrise: string;
  sunset: string;
  sea_condition: string;
  venue: string;
}

export interface DashboardQuickAccess {
  id: string;
  label: string;
  href: string;
  primary: string;
  secondary: string;
  action: string | null;
  disabled?: boolean;
}

export interface DashboardProgressItem {
  id: string;
  label: string;
  time: string;
  status: "completed" | "current" | "upcoming";
}

export interface DashboardLiveEvent {
  enabled: boolean;
  title: string;
  subtitle: string;
  location: string;
  watch_href: string;
}

export interface DashboardTravelStatus {
  id: string;
  label: string;
  status: string;
  confirmed: boolean;
  href: string;
  action: string;
}

export interface DashboardFeaturedEvent {
  id: string;
  featured: boolean;
  live: boolean;
  date_label: string;
  day_label: string;
  time: string;
  title: string;
  subtitle: string;
  speaker: string | null;
  location: string;
  type: string;
  href: string;
}

export interface DashboardData {
  preview_clock: string;
  announcements: DashboardAnnouncement[];
  weather: DashboardWeather;
  quick_access: DashboardQuickAccess[];
  today_progress: DashboardProgressItem[];
  live_event: DashboardLiveEvent;
  travel_status: DashboardTravelStatus[];
  featured_events: DashboardFeaturedEvent[];
}
