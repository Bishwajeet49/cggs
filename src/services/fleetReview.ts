import type { FleetReview, Ship, ParticipatingNation } from "@/types/fleet-review";
import fleetData from "../../public/mock-data/fleet-review.json";

export function getFleetReview(): FleetReview {
  return fleetData as FleetReview;
}

export function getShips(): Ship[] {
  return fleetData.ships as Ship[];
}

export function getFeaturedShip(): Ship | undefined {
  return fleetData.ships.find((s) => s.highlight) as Ship | undefined;
}

export function getParticipatingNations(): ParticipatingNation[] {
  return fleetData.participating_nations as ParticipatingNation[];
}

export function getFleetStatistics() {
  return fleetData.statistics;
}
