import EventHero from "@/components/events/EventHero";
import IcgMission from "@/components/sections/about-icg/IcgMission";
import IcgRoles from "@/components/sections/about-icg/IcgRoles";
import IcgHistoryTimeline from "@/components/sections/about-icg/IcgHistoryTimeline";
import IcgOrganisation from "@/components/sections/about-icg/IcgOrganisation";
import IcgGallery from "@/components/sections/about-icg/IcgGallery";
import IcgGoldenJubilee from "@/components/sections/about-icg/IcgGoldenJubilee";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import WaveDivider from "@/components/ui/WaveDivider";
import {
  getIcgAbout,
  getIcgMissions,
  getIcgHistory,
  getIcgRegions,
  getIcgFleetStats,
  getIcgLeadership,
  getIcgGallery,
  getIcgGoldenJubilee,
} from "@/services/icg";

export const metadata = {
  title: "About Indian Coast Guard | CGGS 2027",
  description:
    "Discover the Indian Coast Guard — 50 years of maritime service since 1977. Mission, history, organisation, fleet strength, and Golden Jubilee celebrations at CGGS 2027 Chennai.",
};

export default function AboutIcgPage() {
  const about = getIcgAbout();
  const missions = getIcgMissions();
  const history = getIcgHistory();
  const regions = getIcgRegions();
  const fleetStats = getIcgFleetStats();
  const leadership = getIcgLeadership();
  const gallery = getIcgGallery();
  const jubilee = getIcgGoldenJubilee();

  return (
    <>
      <EventHero
        badge="Indian Coast Guard"
        title="About the Indian Coast Guard"
        subtitle="Vayam Rakshamah — We Protect. India's dedicated maritime armed force safeguarding ocean wealth, assisting mariners in distress, and enforcing maritime law across 7,500 kilometres of coastline."
        breadcrumbs={[{ label: "About Indian Coast Guard" }]}
        backgroundImage="/banners/about_icg_banner.png"
        backgroundImageAlt="Indian Coast Guard — patrol vessel, helicopter, and officers representing maritime protection and international cooperation"
        ctaLabel="Explore Our History"
        ctaHref="#icg-history"
        secondaryCtaLabel="About CGGS 2027"
        secondaryCtaHref="/about-cggs"
      />

      <IcgMission about={about} />

      <IcgRoles missions={missions} />

      <WaveDivider fill="#06111E" className="-mt-1" />

      <IcgHistoryTimeline history={history} />

      <WaveDivider fill="#ffffff" className="-mt-1 bg-navy-dark" />

      <IcgOrganisation
        regions={regions}
        fleetStats={fleetStats}
        leadership={leadership}
      />

      <IcgGallery images={gallery} />

      <WaveDivider fill="#0D2154" className="-mt-1 bg-[#06111E]" />

      <IcgGoldenJubilee jubilee={jubilee} />

      <RegistrationCTA />
    </>
  );
}
