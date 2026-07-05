import type { GalleryAlbum, GalleryImage } from "@/types/common";
import galleryData from "../../public/mock-data/gallery.json";

export function getAlbums(): GalleryAlbum[] {
  return galleryData.albums as GalleryAlbum[];
}

export function getPreviewImages(limit = 6): GalleryImage[] {
  const images: GalleryImage[] = [];
  for (const album of galleryData.albums) {
    images.push(...(album.images as GalleryImage[]));
  }
  return images.slice(0, limit);
}
