import type { PublicHotel, TravelFAQData, TravelOverview } from "@/types/public-travel";
import travelOverviewRaw from "../../public/mock-data/travel-overview.json";
import hotelsRaw from "../../public/mock-data/hotels.json";
import faqRaw from "../../public/mock-data/faq.json";

export function getTravelOverview(): TravelOverview {
  return travelOverviewRaw as TravelOverview;
}

export function getPublicHotels(): PublicHotel[] {
  return (hotelsRaw as PublicHotel[]).filter((h) => h.public_display !== false);
}

export function getTravelFAQ(): TravelFAQData {
  return faqRaw as TravelFAQData;
}
