"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview, GALLERY_CATEGORIES } from "@/services/delegateFleetReview";

export default function FleetGallery() {
  const images = getDelegateFleetReview().gallery_images;
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(images.map((i) => i.category)))];
  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter);
  const current = filtered[active] ?? filtered[0];

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + filtered.length) % filtered.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Fleet Review imagery — ships, ceremony, delegations and aircraft">
          Gallery
        </FleetSectionLabel>

        <div className="mb-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setFilter(cat); setActive(0); }}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all ${
                filter === cat
                  ? "bg-navy text-white"
                  : "border border-gray-200 bg-white text-navy/70 hover:border-gold/30"
              }`}
            >
              {cat === "all" ? "All" : GALLERY_CATEGORIES[cat] ?? cat}
            </button>
          ))}
        </div>

        {current && (
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-video sm:aspect-21/9"
              >
                <Image
                  src={current.url}
                  alt={current.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
                  {current.caption}
                </p>
              </motion.div>
            </AnimatePresence>

            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-2 text-white hover:bg-navy"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-2 text-white hover:bg-navy"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="absolute top-3 right-3 rounded-full bg-navy/70 px-2.5 py-1 text-[10px] font-semibold text-white">
              {active + 1} / {filtered.length}
            </div>
          </div>
        )}

        {/* Thumbnails */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === active ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.url} alt={img.caption} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
