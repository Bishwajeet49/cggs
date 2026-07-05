import type { IcgAboutContent, IcgAboutData, IcgGoldenJubilee, IcgHistoryMilestone, IcgLeadership, IcgMissionArea, IcgRegion, IcgFleetStat, IcgGalleryImage } from "@/types/icg";
import icgData from "../../public/mock-data/icg-about.json";

export function getIcgAbout(): IcgAboutContent {
  return (icgData as IcgAboutData).about;
}

export function getIcgMissions(): IcgMissionArea[] {
  return (icgData as IcgAboutData).missions;
}

export function getIcgHistory(): IcgHistoryMilestone[] {
  return [...(icgData as IcgAboutData).history].sort((a, b) => a.sort_order - b.sort_order);
}

export function getIcgRegions(): IcgRegion[] {
  return (icgData as IcgAboutData).regions;
}

export function getIcgFleetStats(): IcgFleetStat[] {
  return (icgData as IcgAboutData).fleet_stats;
}

export function getIcgLeadership(): IcgLeadership {
  return (icgData as IcgAboutData).leadership;
}

export function getIcgGallery(): IcgGalleryImage[] {
  return (icgData as IcgAboutData).gallery;
}

export function getIcgGoldenJubilee(): IcgGoldenJubilee {
  return (icgData as IcgAboutData).golden_jubilee;
}

export function getIcgAboutData(): IcgAboutData {
  return icgData as IcgAboutData;
}
