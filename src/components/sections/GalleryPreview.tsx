"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { GalleryImage } from "@/types/common";
import { ZoomIn } from "lucide-react";

interface Props {
  images: GalleryImage[];
}

export default function GalleryPreview({ images }: Props) {
  return (
    <section className="bg-navy-dark py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Media Gallery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Photos & Media
            </h2>
            <div className="h-0.5 w-16 bg-gold" />
          </div>
          <Link
            href="/media"
            className="shrink-0 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            Open Gallery →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.slice(0, 6).map((img, i) => (
            <motion.div
              key={img.gallery_id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-sm bg-navy/50 ${
                i === 0 ? "sm:col-span-2 row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
            >
              <Image
                src={img.url}
                alt={img.caption}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-dark/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white/80 line-clamp-2">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/media"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/40 text-gold text-sm font-medium rounded-sm hover:bg-gold/10 transition-colors"
          >
            View All Photos & Videos →
          </Link>
        </div>
      </div>
    </section>
  );
}
