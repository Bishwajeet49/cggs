"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { GalleryCategory, GalleryImage } from "@/types/common";

interface Props {
  images: GalleryImage[];
  categories: GalleryCategory[];
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const current = images[index];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
    },
    [index, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  if (!current) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col bg-navy-dark/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-xs text-white/50">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
          Close
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 sm:px-16">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <motion.div
          key={current.gallery_id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="relative h-full w-full max-h-[70vh] max-w-5xl"
        >
          <Image
            src={current.url}
            alt={current.caption}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>

        <button
          type="button"
          onClick={() => onNavigate((index + 1) % images.length)}
          className="absolute right-2 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <p className="text-sm font-semibold text-white">{current.caption}</p>
        {current.credit && (
          <p className="mt-1 text-xs text-white/40">{current.credit}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function MediaPhotoGallery({ images, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categoryImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => {
          const categoryMap: Record<string, string[]> = {
            official: ["ALB-001"],
            summits: ["ALB-002"],
            "rome-2025": ["ALB-003"],
            operations: ["ALB-004"],
          };
          return categoryMap[activeCategory]?.includes(img.album_id) ?? false;
        });

  return (
    <>
      <section
        className="bg-navy-dark py-20"
        aria-labelledby="media-gallery-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Photo Gallery"
              title="Photos & Media"
              subtitle="Official summit photography from CGGS events — scraped and archived from the CGGS Secretariat and Japan Coast Guard press releases."
              light
            />
          </motion.div>

          {/* Category filter tabs */}
          <div
            className="mb-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Gallery categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-gold text-navy"
                    : "border border-white/20 text-white/60 hover:border-gold/40 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4"
            >
              {categoryImages.map((img, i) => (
                <motion.button
                  key={img.gallery_id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                  onClick={() => setLightboxIndex(categoryImages.indexOf(img))}
                  className={`group relative overflow-hidden rounded-sm bg-navy/50 text-left ${
                    i === 0 && categoryImages.length > 4
                      ? "col-span-2 row-span-2 aspect-[16/10]"
                      : "aspect-[4/3]"
                  }`}
                  aria-label={`View photo: ${img.caption}`}
                >
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes={
                      i === 0
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
                    <ZoomIn className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[11px] text-white/80 line-clamp-2">{img.caption}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {categoryImages.length === 0 && (
            <p className="text-center text-sm text-white/50 py-12">
              No photos in this category.
            </p>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={categoryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}
