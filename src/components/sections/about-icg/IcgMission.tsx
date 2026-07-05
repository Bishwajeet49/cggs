"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Building2 } from "lucide-react";
import type { IcgAboutContent } from "@/types/icg";

interface Props {
  about: IcgAboutContent;
}

export default function IcgMission({ about }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="icg-mission-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Flag / visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold/20 bg-cream p-8 shadow-lg">
              <Image
                src={about.image_url}
                alt={about.image_alt}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
            {/* Motto badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-6 left-1/2 w-[90%] -translate-x-1/2 rounded-sm border border-gold/30 bg-navy px-6 py-4 text-center shadow-xl"
            >
              <p className="text-lg font-bold text-gold">{about.motto_sanskrit}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                {about.motto_english}
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:pt-8"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Indian Coast Guard
            </p>
            <h2
              id="icg-mission-heading"
              className="mb-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
            >
              {about.tagline}
            </h2>
            <div className="mb-6 h-0.5 w-16 bg-gold" />
            <p className="mb-4 text-base leading-relaxed text-slate">{about.description}</p>
            <p className="mb-8 text-base leading-relaxed text-slate">{about.mission}</p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Calendar, label: "Established", value: about.established_interim },
                { icon: Calendar, label: "Formal Act", value: about.established_formal },
                { icon: Building2, label: "Headquarters", value: about.headquarters },
                { icon: MapPin, label: "Agency", value: about.parent_agency },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex gap-3 rounded-sm border border-navy/8 bg-cream p-4"
                >
                  <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                      {item.label}
                    </p>
                    <p className="text-xs leading-relaxed text-slate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
