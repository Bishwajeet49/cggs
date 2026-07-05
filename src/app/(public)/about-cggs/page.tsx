import EventHero from "@/components/events/EventHero";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutPillars from "@/components/sections/about/AboutPillars";
import SummitHistoryTimeline from "@/components/sections/about/SummitHistoryTimeline";
import AboutIndia2027 from "@/components/sections/about/AboutIndia2027";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import WaveDivider from "@/components/ui/WaveDivider";
import {
  getCggsAbout,
  getSummitHistory,
  getCggsIndia2027,
} from "@/services/cggs";

export const metadata = {
  title: "About CGGS | Coast Guard Global Summit 2027",
  description:
    "Learn about the Coast Guard Global Summit — its mission, history from 2017 to 2024, and India's hosting of the 5th edition in Chennai 2027.",
};

export default function AboutCggsPage() {
  const about = getCggsAbout();
  const history = getSummitHistory();
  const india2027 = getCggsIndia2027();

  return (
    <>
      <EventHero
        badge="Coast Guard Global Summit"
        title="About CGGS"
        subtitle="The premier international forum for coast guard cooperation — fostering dialogue, sharing best practices, and building a safer, cleaner, and more secure maritime world since 2017."
        breadcrumbs={[{ label: "About CGGS" }]}
        backgroundImage="/banners/about_cggs_banner.png"
        backgroundImageAlt="Coast Guard Global Summit — international coast guard officers and vessels representing global maritime cooperation"
        ctaLabel="Explore Summit History"
        ctaHref="#summit-history"
        secondaryCtaLabel="View 2027 Schedule"
        secondaryCtaHref="/schedule"
      />

      <AboutMission about={about} />

      <AboutPillars pillars={about.pillars} />

      <WaveDivider fill="#06111E" className="-mt-1" />

      <SummitHistoryTimeline events={history} />

      <WaveDivider fill="#ffffff" className="-mt-1 bg-navy-dark" />

      <AboutIndia2027 india2027={india2027} />

      <RegistrationCTA />
    </>
  );
}
