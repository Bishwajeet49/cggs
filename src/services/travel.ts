import type { ArrivalData, AccommodationData, TransportData } from "@/types/travel";
import arrivalRaw from "../../public/mock-data/arrival.json";
import accommodationRaw from "../../public/mock-data/accommodation.json";
import transportRaw from "../../public/mock-data/transport.json";

export function getArrivalData(): ArrivalData {
  return arrivalRaw as ArrivalData;
}

export function getAccommodationData(): AccommodationData {
  return accommodationRaw as AccommodationData;
}

export function getTransportData(): TransportData {
  return transportRaw as TransportData;
}

export const ARRIVAL_STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  confirmed: {
    label: "Flight Confirmed",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
  },
  arrived: {
    label: "Arrived",
    badge: "bg-blue-500/15 text-blue-700 border-blue-300/50",
    dot: "bg-blue-500",
  },
  delayed: {
    label: "Delayed",
    badge: "bg-red-500/15 text-red-700 border-red-300/50",
    dot: "bg-red-500",
  },
  pending: {
    label: "Pending",
    badge: "bg-amber-500/15 text-amber-700 border-amber-300/50",
    dot: "bg-amber-400",
  },
  completed: {
    label: "Completed",
    badge: "bg-slate-200 text-slate-600 border-slate-300",
    dot: "bg-slate-400",
  },
};

export const PICKUP_STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  assigned: {
    label: "Pickup Assigned",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pickup Pending",
    badge: "bg-amber-500/15 text-amber-700 border-amber-300/50",
    dot: "bg-amber-400",
  },
  driver_en_route: {
    label: "Driver En Route",
    badge: "bg-blue-500/15 text-blue-700 border-blue-300/50",
    dot: "bg-blue-500",
  },
  arrived: {
    label: "Vehicle Arrived",
    badge: "bg-emerald-600/15 text-emerald-800 border-emerald-400/50",
    dot: "bg-emerald-600",
  },
  completed: {
    label: "Completed",
    badge: "bg-slate-200 text-slate-600 border-slate-300",
    dot: "bg-slate-400",
  },
};

export const VEHICLE_STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  assigned: {
    label: "Vehicle Assigned",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending Assignment",
    badge: "bg-amber-500/15 text-amber-700 border-amber-300/50",
    dot: "bg-amber-400",
  },
  en_route: {
    label: "En Route",
    badge: "bg-blue-500/15 text-blue-700 border-blue-300/50",
    dot: "bg-blue-500",
  },
  arrived: {
    label: "Arrived",
    badge: "bg-emerald-600/15 text-emerald-800 border-emerald-400/50",
    dot: "bg-emerald-600",
  },
  completed: {
    label: "Trip Completed",
    badge: "bg-slate-200 text-slate-600 border-slate-300",
    dot: "bg-slate-400",
  },
};

export const TODAY_PICKUP_STATUS: Record<string, { label: string; color: string; pulse: boolean }> = {
  driver_en_route: { label: "Driver En Route", color: "text-blue-700 bg-blue-50", pulse: true },
  vehicle_arrived: { label: "Vehicle Arrived", color: "text-emerald-700 bg-emerald-50", pulse: false },
  completed: { label: "Completed", color: "text-slate-600 bg-slate-100", pulse: false },
  delayed: { label: "Delayed", color: "text-red-700 bg-red-50", pulse: true },
  scheduled: { label: "Scheduled", color: "text-amber-700 bg-amber-50", pulse: false },
};

export const ACCOMMODATION_STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  confirmed: {
    label: "Confirmed",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    badge: "bg-amber-500/15 text-amber-700 border-amber-300/50",
    dot: "bg-amber-400",
  },
  allocated: {
    label: "Allocated",
    badge: "bg-blue-500/15 text-blue-700 border-blue-300/50",
    dot: "bg-blue-500",
  },
};

export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}
