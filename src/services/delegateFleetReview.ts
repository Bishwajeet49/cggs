import type {
  DelegateFleetReview,
  FleetCountryDetail,
  FleetShipDetail,
  FleetWeather,
  FleetReviewStatus,
  ProgrammeItem,
} from "@/types/delegate-fleet-review";
import type { FleetReview } from "@/types/fleet-review";
import delegateData from "../../public/mock-data/delegate-fleet-review.json";
import fleetData from "../../public/mock-data/fleet-review.json";
import shipsData from "../../public/mock-data/ships.json";
import countriesData from "../../public/mock-data/fleet-countries.json";
import weatherData from "../../public/mock-data/weather.json";

export const FLEET_STATUS_CONFIG: Record<
  FleetReviewStatus,
  { label: string; badge: string; dot: string }
> = {
  upcoming: {
    label: "Upcoming",
    badge: "bg-gold/15 text-gold border-gold/30",
    dot: "bg-gold",
  },
  live: {
    label: "Live Now",
    badge: "bg-red-500/15 text-red-700 border-red-300/50",
    dot: "bg-red-500 animate-pulse",
  },
  completed: {
    label: "Completed",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
  },
};

const FLEET_REVIEW_START = new Date("2027-02-17T08:00:00+05:30");

export function getDelegateFleetReview(): DelegateFleetReview {
  return delegateData as DelegateFleetReview;
}

export function getFleetReviewBase(): FleetReview {
  return fleetData as FleetReview;
}

export function getFleetShips(): FleetShipDetail[] {
  return shipsData.ships as FleetShipDetail[];
}

export function getFleetCountries(): FleetCountryDetail[] {
  return countriesData.countries as FleetCountryDetail[];
}

export function getFleetWeather(): FleetWeather {
  return weatherData as FleetWeather;
}

export function getFleetReviewStatus(): FleetReviewStatus {
  return (delegateData as DelegateFleetReview).status;
}

export function getProgrammeWithStatus(): ProgrammeItem[] {
  const items = (delegateData as DelegateFleetReview).programme_today;
  const status = getFleetReviewStatus();

  if (status === "completed") {
    return items.map((item) => ({ ...item, status: "completed" as const }));
  }

  if (status === "upcoming") {
    return items.map((item) => ({ ...item, status: "upcoming" as const }));
  }

  // live — mark first item as current, rest upcoming, none completed for demo
  return items.map((item, i) => ({
    ...item,
    status: i === 2 ? ("current" as const) : i < 2 ? ("completed" as const) : ("upcoming" as const),
  }));
}

export function getCountdownToFleetReview() {
  const diff = FLEET_REVIEW_START.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

export function formatFleetDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const SAFETY_ICONS: Record<string, string> = {
  badge: "BadgeCheck",
  clock: "Clock",
  shield: "Shield",
  camera: "Camera",
  ban: "Ban",
  alert: "AlertTriangle",
};

export const GALLERY_CATEGORIES: Record<string, string> = {
  fleet: "Fleet",
  ceremony: "Ceremony",
  delegations: "Delegations",
  ships: "Ships",
  aircraft: "Aircraft",
};
