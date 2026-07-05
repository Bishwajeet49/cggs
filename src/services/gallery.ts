import type { GalleryAlbum, GalleryImage } from "@/types/common";
import galleryData from "../../public/mock-data/gallery.json";

export function getAlbums(): GalleryAlbum[] {
  return galleryData.albums as GalleryAlbum[];
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
