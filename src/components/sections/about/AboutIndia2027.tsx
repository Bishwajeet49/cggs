"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Sparkles, ArrowRight } from "lucide-react";
import type { CggsIndia2027 } from "@/types/cggs";

interface Props {
  india2027: CggsIndia2027;
}

export default function AboutIndia2027({ india2027 }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      aria-labelledby="india-2027-heading"
    >
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(13,33,84,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
                Next Chapter
              </span>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              CGGS 2027
            </p>
            <h2
              id="india-2027-heading"
              className="mb-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
            >
              {india2027.title}
            </h2>
            <div className="mb-6 h-0.5 w-16 bg-gold" />

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-slate">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" />
                {india2027.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gold" />
                {india2027.dates}
              </span>
            </div>

            <p className="mb-4 text-base leading-relaxed text-slate">
              {india2027.significance}
            </p>
            <p className="mb-8 text-base leading-relaxed text-slate">
              {india2027.why_chennai}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-navy-mid"
              >
                View 2027 Schedule
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about-icg"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-navy px-6 py-3 text-sm font-medium text-navy transition-colors hover:bg-cream"
              >
                About Indian Coast Guard
              </Link>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="space-y-4">
            {india2027.highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-sm border border-gold/15 bg-cream p-6 transition-all hover:border-gold/35 hover:shadow-md"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-sm font-bold text-gold">
                    {i + 1}
                  </span>
                  <h3 className="text-base font-bold text-navy">{item.title}</h3>
                </div>
                <p className="pl-11 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </motion.div>
            ))}

            {/* Golden Jubilee badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative overflow-hidden rounded-sm p-6 text-center"
              style={{ background: "linear-gradient(135deg, #0D2154 0%, #06111E 100%)" }}
            >
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(197,160,40,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>
              <div className="relative">
                <p className="text-4xl font-bold text-gold">50</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Years of the Indian Coast Guard
                </p>
                <p className="mt-2 text-sm text-white/50">Est. 1 February 1977</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
