import type { Village, VillageZone } from "@/types/village";
import villageData from "../../public/mock-data/village.json";

export function getVillage(): Village {
  return villageData as Village;
}

export function getVillageZones(): VillageZone[] {
  return villageData.zones as VillageZone[];
}

export function getVillageStatistics() {
  return villageData.statistics;
}

export function getZoneById(zoneId: string): VillageZone | undefined {
  return villageData.zones.find((z) => z.zone_id === zoneId) as VillageZone | undefined;
}
