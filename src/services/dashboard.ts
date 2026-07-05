import type { DashboardData } from "@/types/dashboard";
import dashboardData from "../../public/mock-data/dashboard.json";

export function getDashboardData(): DashboardData {
  return dashboardData as DashboardData;
}

export function getDashboardAnnouncements() {
  return getDashboardData().announcements;
}

export function getDashboardWeather() {
  return getDashboardData().weather;
}

export function getDashboardQuickAccess() {
  return getDashboardData().quick_access;
}

export function getDashboardTodayProgress() {
  return getDashboardData().today_progress;
}

export function getDashboardLiveEvent() {
  return getDashboardData().live_event;
}

export function getDashboardTravelStatus() {
  return getDashboardData().travel_status;
}

export function getDashboardFeaturedEvents() {
  return getDashboardData().featured_events;
}

export function getDashboardPreviewClock(): Date {
  return new Date(getDashboardData().preview_clock);
}
