"use client";

import FleetReviewHero from "@/components/portal/fleet-review/FleetReviewHero";
import FleetOverview from "@/components/portal/fleet-review/FleetOverview";
import FleetProgramme from "@/components/portal/fleet-review/FleetProgramme";
import ViewingPass from "@/components/portal/fleet-review/ViewingPass";
import FleetFormation from "@/components/portal/fleet-review/FleetFormation";
import ParticipatingNations from "@/components/portal/fleet-review/ParticipatingNations";
import ParticipatingShips from "@/components/portal/fleet-review/ParticipatingShips";
import FleetRouteMap from "@/components/portal/fleet-review/FleetRouteMap";
import FleetTransport from "@/components/portal/fleet-review/FleetTransport";
import WeatherSeaConditions from "@/components/portal/fleet-review/WeatherSeaConditions";
import SafetyGuidelines from "@/components/portal/fleet-review/SafetyGuidelines";
import FleetDownloads from "@/components/portal/fleet-review/FleetDownloads";
import FleetGallery from "@/components/portal/fleet-review/FleetGallery";
import FleetFAQs from "@/components/portal/fleet-review/FleetFAQs";
import FleetEmergency from "@/components/portal/fleet-review/FleetEmergency";

export default function FleetReviewPage() {
  return (
    <div className="relative space-y-5 sm:space-y-6">
      {/* Maritime watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none fixed bottom-0 right-0 h-[480px] w-[480px] select-none opacity-[0.028]"
        fill="none"
        stroke="#0D2154"
        strokeWidth="0.7"
      >
        <path d="M 20 100 Q 50 80, 80 100 T 140 100 T 180 100" />
        <path d="M 20 120 Q 50 100, 80 120 T 140 120 T 180 120" />
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="70" />
      </svg>

      <FleetReviewHero />
      <FleetOverview />
      <FleetProgramme />
      <ViewingPass />
      <FleetFormation />
      <ParticipatingNations />
      <ParticipatingShips />
      <FleetRouteMap />
      <FleetTransport />
      <WeatherSeaConditions />
      <SafetyGuidelines />
      <FleetDownloads />
      <FleetGallery />
      <FleetFAQs />
      <FleetEmergency />
    </div>
  );
}
