import EventHero from "@/components/events/EventHero";
import MediaStatsBar from "@/components/sections/media/MediaStatsBar";
import MediaVideoSection from "@/components/sections/media/MediaVideoSection";
import MediaPhotoGallery from "@/components/sections/media/MediaPhotoGallery";
import MediaNewsSection from "@/components/sections/media/MediaNewsSection";
import MediaSourcesSection from "@/components/sections/media/MediaSourcesSection";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import WaveDivider from "@/components/ui/WaveDivider";
import {
  getMediaPageInfo,
  getGalleryCategories,
  getAllGalleryImages,
  getVideos,
} from "@/services/gallery";
import { getNews } from "@/services/news";

export const metadata = {
  title: "Media & Gallery | Coast Guard Global Summit 2027",
  description:
    "Official photos, videos, and press releases from the Coast Guard Global Summit — past editions and CGGS 2027 coverage from Chennai.",
};

export default function MediaPage() {
  const pageInfo = getMediaPageInfo();
  const categories = getGalleryCategories();
  const images = getAllGalleryImages();
  const videos = getVideos();
  const news = getNews();

  return (
    <>
      <EventHero
        badge="Media Centre"
        title="Media & Gallery"
        subtitle="Official photos, summit videos, and press coverage from the Coast Guard Global Summit — from Tokyo 2017 to Rome 2025, and the journey to Chennai 2027."
        breadcrumbs={[{ label: "Media & Gallery" }]}
        backgroundImage="/media/cggs-official/cggs-home-hero.jpg"
        backgroundImageAlt="Coast Guard Global Summit — international delegates at official summit venue"
        ctaLabel="Browse Photos"
        ctaHref="#photo-gallery"
        secondaryCtaLabel="Watch Videos"
        secondaryCtaHref="#videos"
      />

      <MediaStatsBar info={pageInfo} />

      <div id="videos">
        <MediaVideoSection videos={videos} />
      </div>

      <WaveDivider fill="#06111E" className="-mt-1" />

      <div id="photo-gallery">
        <MediaPhotoGallery images={images} categories={categories} />
      </div>

      <WaveDivider fill="#ffffff" className="-mt-1 bg-navy-dark" />

      <div id="press">
        <MediaNewsSection news={news} />
      </div>

      <MediaSourcesSection info={pageInfo} />

      <RegistrationCTA />
    </>
  );
}
