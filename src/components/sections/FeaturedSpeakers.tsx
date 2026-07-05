"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Speaker } from "@/types/common";

interface Props {
  speakers: Speaker[];
}

export default function FeaturedSpeakers({ speakers }: Props) {
  return (
    <section className="bg-white py-20">
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
              Distinguished Guests
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Featured Speakers & Dignitaries
            </h2>
            <div className="h-0.5 w-16 bg-gold" />
          </div>
          <Link
            href="/seminar"
            className="shrink-0 text-sm font-medium text-navy hover:text-gold transition-colors"
          >
            View All Speakers →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {speakers.slice(0, 8).map((speaker, i) => (
            <motion.div
              key={speaker.speaker_id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="relative mb-3 overflow-hidden rounded-sm aspect-[3/4] bg-navy/5">
                <Image
                  src={speaker.image_url}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] text-white/80 leading-relaxed line-clamp-2">
                    {speaker.bio}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-navy leading-snug">{speaker.name}</p>
                <p className="text-[11px] text-gold mt-0.5 leading-snug">
                  {speaker.designation}
                </p>
                <p className="text-[11px] text-slate mt-0.5">{speaker.country}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
