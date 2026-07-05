import HeroCarousel from "@/components/sections/HeroCarousel";
import Countdown from "@/components/sections/Countdown";
import GoldenJubilee from "@/components/sections/GoldenJubilee";
import WelcomeSection from "@/components/sections/WelcomeSection";
import SummitStatistics from "@/components/sections/SummitStatistics";
import KeyEvents from "@/components/sections/KeyEvents";
import ScrollTimeline from "@/components/sections/ScrollTimeline";
import FeaturedSpeakers from "@/components/sections/FeaturedSpeakers";
import GlobeSection from "@/components/sections/GlobeSection";
import CinematicFleet from "@/components/sections/CinematicFleet";
import SeminarHighlight from "@/components/sections/SeminarHighlight";
import ExhibitionVillage from "@/components/sections/ExhibitionVillage";
import LatestNews from "@/components/sections/LatestNews";
import GalleryPreview from "@/components/sections/GalleryPreview";
import VenueSection from "@/components/sections/VenueSection";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import Partners from "@/components/sections/Partners";
import ContactPreview from "@/components/sections/ContactPreview";
import WaveDivider from "@/components/ui/WaveDivider";

import { getDays } from "@/services/events";
import { getFeaturedSpeakers } from "@/services/speakers";
import { getCountries, getTotalParticipating } from "@/services/countries";
import { getLatestNews } from "@/services/news";
import { getPreviewImages } from "@/services/gallery";

export default function HomePage() {
  const days = getDays();
  const speakers = getFeaturedSpeakers(8);
  const countries = getCountries();
  const total = getTotalParticipating();
  const news = getLatestNews(3);
  const galleryImages = getPreviewImages(6);

  return (
    <>
      {/* ─── 1. ARRIVAL ─────────────────────────────────────── */}
      {/* Hero banners — official, full-bleed, with particles */}
      <HeroCarousel />

      {/* ─── 2. URGENCY — time is running ──────────────────── */}
      <Countdown />

      {/* Wave: dark navy → dark navy (subtle separation) */}
      <WaveDivider fill="#06111E" className="-mt-1 bg-navy-dark" />

      {/* ─── 3. GOLDEN MOMENT ──────────────────────────────── */}
      {/* 50 years of ICG — golden jubilee celebration */}
      <GoldenJubilee />

      {/* ─── 4. GLOBAL MARITIME COOPERATION (WOW #1) ────────── */}
      {/* Rotating 3-D globe — right after jubilee, sets global stage */}
      <GlobeSection countries={countries} total={total} />

      {/* ─── 5. THE SUMMIT STORY ────────────────────────────── */}
      {/* Welcome / about — light background */}
      <WelcomeSection />

      {/* ─── 6. THE SCALE ───────────────────────────────────── */}
      {/* Premium animated statistics section */}
      <SummitStatistics />

      {/* ─── 7. WHAT AWAITS ─────────────────────────────────── */}
      {/* Key events: Fleet Review, Seminar, Exhibition */}
      <KeyEvents />

      {/* Wave: separates key events from timeline */}
      <WaveDivider fill="#06111E" className="-mt-1" />

      {/* ─── 8. THREE-DAY JOURNEY ───────────────────────────── */}
      {/* Scroll-driven premium timeline */}
      <ScrollTimeline days={days} />

      {/* ─── 9. THE VOICES ──────────────────────────────────── */}
      <FeaturedSpeakers speakers={speakers} />

      {/* Wave: speakers → cinematic fleet */}
      <WaveDivider fill="#06111E" className="-mt-1" />

      {/* ─── 10. FLEET REVIEW (WOW #2) ──────────────────────── */}
      {/* Cinematic full-bleed parallax section */}
      <CinematicFleet />

      {/* Wave: cinematic dark → section below */}
      <WaveDivider fill="#0D2154" className="-mt-1 bg-[#020d1f]" />

      {/* ─── 11. SEMINAR ────────────────────────────────────── */}
      <SeminarHighlight />

      {/* ─── 12. EXHIBITION VILLAGE ─────────────────────────── */}
      <ExhibitionVillage />

      {/* ─── 13. LATEST NEWS ────────────────────────────────── */}
      <LatestNews news={news} />

      {/* ─── 14. GALLERY PREVIEW ────────────────────────────── */}
      <GalleryPreview images={galleryImages} />

      {/* ─── 15. VENUE — CHENNAI ────────────────────────────── */}
      <VenueSection />

      {/* ─── 16. JOIN THE SUMMIT ────────────────────────────── */}
      {/* Registration CTA — high-contrast gold/navy */}
      <RegistrationCTA />

      {/* ─── 17. PARTNERS & SPONSORS ────────────────────────── */}
      <Partners />

      {/* ─── 18. CONTACT PREVIEW ────────────────────────────── */}
      <ContactPreview />
    </>
  );
}
