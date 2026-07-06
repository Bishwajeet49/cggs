import type { RegistrationFormData, RegisteredDelegate } from "@/types/registration";
import { EMPTY_REGISTRATION } from "@/types/registration";
import type { MockUser } from "@/types/auth";
import demoPrefillData from "../../public/mock-data/demo-registration-prefill.json";
import hotelsData from "../../public/mock-data/hotels.json";
import orgTypesData from "../../public/mock-data/organization-types.json";
import delegateCategoriesData from "../../public/mock-data/delegate-categories.json";
import registrationEventsData from "../../public/mock-data/registration-events.json";

export function getHotels() {
  return hotelsData;
}

export function getOrganizationTypes() {
  return orgTypesData;
}

export function getDelegateCategories() {
  return delegateCategoriesData;
}

export function getRegistrationEvents() {
  return registrationEventsData;
}

/** Phase 1 demo defaults — prefilled but fully editable in the registration wizard. */
export function createInitialRegistrationData(): RegistrationFormData {
  const prefill = demoPrefillData as Pick<RegistrationFormData, "personal" | "organization">;
  return {
    ...EMPTY_REGISTRATION,
    personal: { ...EMPTY_REGISTRATION.personal, ...prefill.personal },
    organization: { ...EMPTY_REGISTRATION.organization, ...prefill.organization },
  };
}

function generateSequentialId(): string {
  const stored = typeof window !== "undefined" ? localStorage.getItem("cggs_reg_counter") : null;
  const counter = stored ? parseInt(stored, 10) + 1 : Math.floor(100000 + Math.random() * 27);
  if (typeof window !== "undefined") {
    localStorage.setItem("cggs_reg_counter", counter.toString());
  }
  return counter.toString().padStart(6, "0");
}

function getCountryCode(countryName: string): string {
  const map: Record<string, string> = {
    India: "IND", Japan: "JPN", "United States": "USA", "United Kingdom": "GBR",
    Australia: "AUS", Singapore: "SGP", France: "FRA", Germany: "DEU",
    Italy: "ITA", "South Korea": "KOR", China: "CHN", Brazil: "BRA",
    Russia: "RUS", Spain: "ESP", Netherlands: "NLD", Malaysia: "MYS",
    Thailand: "THA", Indonesia: "IDN", "Sri Lanka": "LKA", Maldives: "MDV",
    "South Africa": "ZAF", Nigeria: "NGA", UAE: "UAE", "Saudi Arabia": "SAU",
    Canada: "CAN", Bangladesh: "BGD", Vietnam: "VNM", Philippines: "PHL",
    Kenya: "KEN", "New Zealand": "NZL", Norway: "NOR", Sweden: "SWE",
    Denmark: "DNK", Finland: "FIN", Portugal: "PRT", Greece: "GRC",
    Turkey: "TUR", Pakistan: "PAK", Myanmar: "MMR", Cambodia: "KHM",
    Egypt: "EGY", Morocco: "MAR",
  };
  const name = countryName?.trim() ?? "";
  return (map[name] ?? name.slice(0, 3).toUpperCase().replace(/\s/g, "")) || "INT";
}

export function generateRegistrationNumber(country: string): string {
  const countryCode = getCountryCode(country);
  const seq = generateSequentialId();
  return `CGGS2027-${countryCode}-${seq}`;
}

export function generateDelegateId(regNumber: string): string {
  const parts = regNumber.split("-");
  return `DLG-${parts[1]}-${parts[2]}`;
}

export function submitRegistration(data: RegistrationFormData): RegisteredDelegate {
  const country = data.personal.nationality || data.organization.country;
  const registrationNumber = generateRegistrationNumber(country);
  const delegateId = generateDelegateId(registrationNumber);

  const delegate: RegisteredDelegate = {
    registrationNumber,
    delegateId,
    registeredAt: new Date().toISOString(),
    status: "pending_verification",
    formData: data,
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("cggs_registration", JSON.stringify(delegate));
  }

  return delegate;
}

export function getStoredRegistration(): RegisteredDelegate | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("cggs_registration");
  return stored ? JSON.parse(stored) : null;
}

export function clearRegistration(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cggs_registration");
  }
}

/** Map a completed registration to the portal auth user (includes profile photo). */
export function registeredDelegateToMockUser(delegate: RegisteredDelegate): MockUser {
  const { personal, organization } = delegate.formData;
  return {
    delegateId: delegate.delegateId,
    firstName: personal.firstName,
    lastName: personal.lastName,
    title: organization.rankDesignation || undefined,
    category: delegate.formData.category ?? "official_delegate",
    country: personal.nationality || organization.country,
    organization: organization.organizationName,
    registrationNumber: delegate.registrationNumber,
    profilePhotoUrl: personal.profilePhotoUrl || undefined,
    email: personal.email || undefined,
  };
}

/** Backfill profile photo from stored registration when auth session is missing it. */
export function enrichAuthUserFromRegistration(user: MockUser): MockUser {
  if (user.profilePhotoUrl) return user;

  const reg = getStoredRegistration();
  if (!reg || reg.delegateId !== user.delegateId) return user;

  const { personal, organization } = reg.formData;
  return {
    ...user,
    profilePhotoUrl: personal.profilePhotoUrl || undefined,
    title: user.title || organization.rankDesignation || undefined,
    email: user.email || personal.email || undefined,
  };
}
