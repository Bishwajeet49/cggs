"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { GalleryVideo } from "@/types/common";

interface Props {
  videos: GalleryVideo[];
}

function VideoModal({
  video,
  onClose,
}: {
  video: GalleryVideo;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-dark/90 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          aria-label="Close video"
        >
          <X className="h-5 w-5" />
          Close
        </button>
        <div className="relative aspect-video overflow-hidden rounded-sm bg-black shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="mt-4 rounded-sm border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm">
          <h3 className="text-base font-bold text-white">{video.title}</h3>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">{video.description}</p>
          <a
            href={video.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-gold-light transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {video.source}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MediaVideoSection({ videos }: Props) {
  const [activeVideo, setActiveVideo] = useState<GalleryVideo | null>(null);

  return (
    <>
      <section className="bg-white py-20" aria-labelledby="media-videos-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionHeader
              eyebrow="Video Coverage"
              title="Summit Videos"
              subtitle="Official coverage, summit addresses, and news reports from CGGS events worldwide."
            />
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, i) => (
              <motion.button
                key={video.video_id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setActiveVideo(video)}
                className="group text-left overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm hover:border-gold/30 hover:shadow-md transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-navy/5">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-navy shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
                    </span>
                  </div>
                  {video.featured && (
                    <span className="absolute top-3 left-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-1.5">
                    {new Date(video.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-sm font-bold text-navy leading-snug line-clamp-2 group-hover:text-navy-mid transition-colors">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate line-clamp-2">{video.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
