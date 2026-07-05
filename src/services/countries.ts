import type { Country } from "@/types/common";
import countriesData from "../../public/mock-data/countries.json";

export function getCountries(): Country[] {
  return countriesData.countries as Country[];
}

export function getTotalParticipating(): number {
  return countriesData.total_participating;
}

export function getCountryByName(name: string) {
  return getCountries().find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}
