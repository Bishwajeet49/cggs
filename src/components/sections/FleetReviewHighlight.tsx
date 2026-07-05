"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Anchor, Ship, Globe, Flag } from "lucide-react";

export default function FleetReviewHighlight() {
  return (
    <section className="gradient-navy py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Day 3 · 17 February 2027
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              International Coast Guard Fleet Review
            </h2>
            <div className="h-0.5 w-16 bg-gold mb-6" />
            <p className="text-base text-white/60 leading-relaxed mb-6">
              The centrepiece of CGGS 2027 — a grand maritime display off the Chennai
              coast featuring Coast Guard ships, patrol aircraft, and rescue vessels from
              40+ nations in a historic Fleet Review presided over by the President of India.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Ship, label: "40+ Ships", sub: "From participating nations" },
                { icon: Globe, label: "40+ Nations", sub: "Coast guard fleets" },
                { icon: Anchor, label: "Bay of Bengal", sub: "Chennai coastal waters" },
                { icon: Flag, label: "Presided by", sub: "President of India" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-white/40">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/fleet-review"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy text-sm font-bold rounded-sm hover:bg-gold-light transition-colors"
            >
              Explore Fleet Review →
            </Link>
          </motion.div>

          {/* Image panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gold/20">
              <Image
                src="/banners/banner-2.png"
                alt="International Coast Guard Fleet Review"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-navy/40" />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-0 left-0 bg-gold text-navy px-4 py-3 rounded-sm shadow-lg sm:-bottom-4 sm:-left-4">
              <p className="text-xs font-bold uppercase tracking-wider">ICGFR 2027</p>
              <p className="text-[10px] mt-0.5 font-medium">Chennai · Feb 17</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
