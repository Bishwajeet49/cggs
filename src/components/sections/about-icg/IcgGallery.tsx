"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { IcgGalleryImage } from "@/types/icg";

interface Props {
  images: IcgGalleryImage[];
}

/* Balanced masonry — desktop: 3×3 grid; mobile: 2×4 grid */
const MASONRY_SPANS = [
  "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1",
  "col-span-1 row-span-1 lg:col-span-1 lg:row-span-1",
  "col-span-2 row-span-1 lg:col-span-3 lg:row-span-1",
] as const;

function GalleryTile({
  img,
  index,
  active,
  onSelect,
}: {
  img: IcgGalleryImage;
  index: number;
  active: boolean;
  onSelect: () => void;
}) {
  const span = MASONRY_SPANS[index] ?? "col-span-1 row-span-1";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      onClick={onSelect}
      aria-label={img.caption}
      aria-current={active ? "true" : undefined}
      className={`group relative min-h-[140px] overflow-hidden rounded-sm border text-left transition-all sm:min-h-[160px] ${span} ${
        active
          ? "border-gold ring-2 ring-gold/30 z-10"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <Image
        src={img.url}
        alt={img.alt}
        fill
        sizes={
          index === 0
            ? "(max-width: 1024px) 100vw, 50vw"
            : index === 3
              ? "(max-width: 1024px) 100vw, 80vw"
              : "(max-width: 1024px) 50vw, 25vw"
        }
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover / active overlay */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          active
            ? "bg-navy-dark/25"
            : "bg-navy-dark/40 group-hover:bg-navy-dark/20"
        }`}
      />

      {/* Gradient for caption on hover / active */}
      <div
        className={`absolute inset-0 bg-linear-to-t from-navy-dark/80 via-transparent to-transparent transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />

      <div
        className={`absolute bottom-0 left-0 right-0 p-3 transition-transform duration-300 ${
          active ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
        }`}
      >
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-white">
          {img.caption}
        </p>
      </div>

      {/* Active indicator */}
      {active && (
        <span className="absolute left-3 top-3 h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_2px_rgba(197,160,40,0.5)]" />
      )}
    </motion.button>
  );
}

export default function IcgGallery({ images }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "#06111E" }}
      aria-labelledby="icg-gallery-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(197,160,40,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            In Action
          </p>
          <h2 id="icg-gallery-heading" className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Guardians of the Sea
          </h2>
          <div className="h-0.5 w-16 bg-gold" />
        </motion.div>

        {/* Balanced masonry grid — 3 cols × 3 rows, equal row heights */}
        <div
          className="grid grid-cols-2 grid-rows-[repeat(4,minmax(0,1fr))] gap-3 sm:gap-4 lg:grid-cols-3 lg:grid-rows-3 lg:min-h-[480px] xl:min-h-[520px]"
          role="list"
        >
          {images.map((img, i) => (
            <GalleryTile
              key={img.id}
              img={img}
              index={i}
              active={active === i}
              onSelect={() => setActive(i)}
            />
          ))}
        </div>

        {/* Caption bar — full width below grid */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 rounded-sm border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm sm:mt-5"
        >
          <p className="text-sm font-semibold text-white">{current.caption}</p>
          <p className="mt-1 text-[10px] text-white/40">{current.credit}</p>
        </motion.div>
      </div>
    </section>
  );
}
