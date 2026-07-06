import type {
  GalleryAlbum,
  GalleryCategory,
  GalleryImage,
  GalleryVideo,
  MediaPageInfo,
} from "@/types/common";
import galleryData from "../../public/mock-data/gallery.json";

export function getMediaPageInfo(): MediaPageInfo {
  return galleryData.page as MediaPageInfo;
}

export function getGalleryCategories(): GalleryCategory[] {
  return galleryData.categories as GalleryCategory[];
}

export function getAlbums(): GalleryAlbum[] {
  return galleryData.albums as GalleryAlbum[];
}

export function getVideos(): GalleryVideo[] {
  return galleryData.videos as GalleryVideo[];
}

export function getFeaturedVideos(): GalleryVideo[] {
  return (galleryData.videos as GalleryVideo[]).filter((v) => v.featured);
}

export function getAllGalleryImages(): GalleryImage[] {
  const images: GalleryImage[] = [];
  for (const album of galleryData.albums as GalleryAlbum[]) {
    for (const image of album.images) {
      images.push(image);
    }
  }
  return images;
}

export function getImagesByCategory(category: string): GalleryImage[] {
  if (category === "all") return getAllGalleryImages();
  const albums = (galleryData.albums as GalleryAlbum[]).filter(
    (a) => a.category === category
  );
  return albums.flatMap((a) => a.images);
}

const HOME_PREVIEW_EXCLUDED_CATEGORIES = new Set(["people"]);
const HOME_PREVIEW_EXCLUDED_PATHS = ["/individuals/"];

function isHomePreviewImage(album: GalleryAlbum, image: GalleryImage): boolean {
  if (HOME_PREVIEW_EXCLUDED_CATEGORIES.has(album.category)) return false;
  return !HOME_PREVIEW_EXCLUDED_PATHS.some((segment) => image.url.includes(segment));
}

export function getPreviewImages(limit = 6): GalleryImage[] {
  const images: GalleryImage[] = [];
  for (const album of galleryData.albums as GalleryAlbum[]) {
    for (const image of album.images as GalleryImage[]) {
      if (isHomePreviewImage(album, image)) images.push(image);
    }
  }
  return images.slice(0, limit);
}
