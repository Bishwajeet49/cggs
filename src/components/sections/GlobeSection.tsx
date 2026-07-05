"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Globe2, Anchor, Ship } from "lucide-react";
import type { Country } from "@/types/common";

/* Lazy-load the heavy R3F canvas — avoids SSR issues and reduces initial bundle */
const GlobeCanvas = dynamic(() => import("./GlobeCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  ),
});

const FEATURED = [
  { flag: "🇮🇳", name: "India", role: "Host" },
  { flag: "🇯🇵", name: "Japan", role: "Secretariat" },
  { flag: "🇺🇸", name: "USA", role: "Participant" },
  { flag: "🇬🇧", name: "UK", role: "Participant" },
  { flag: "🇦🇺", name: "Australia", role: "Participant" },
  { flag: "🇸🇬", name: "Singapore", role: "Participant" },
  { flag: "🇫🇷", name: "France", role: "Participant" },
  { flag: "🇰🇷", name: "S. Korea", role: "Participant" },
];

interface Props {
  countries: Country[];
  total: number;
}

export default function GlobeSection({ countries, total }: Props) {
  return (
    <section
      className="relative bg-navy-dark overflow-hidden py-20 lg:py-0 lg:min-h-[90vh] flex flex-col justify-center"
      aria-label="Global Maritime Cooperation"
    >
      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(13,33,84,0.6) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── Left — text block ── */}
          <div className="order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4"
            >
              Worldwide Maritime Cooperation
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
            >
              A World United
              <br />
              <span className="text-gold">at Sea</span>
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-0.5 w-16 bg-gold mb-6 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base text-white/60 leading-relaxed mb-8 max-w-md"
            >
              The 5th Coast Guard Global Summit unites maritime leaders from{" "}
              <span className="text-white font-semibold">{total}+ nations</span> to forge
              partnerships, share best practices, and chart the course of global maritime
              safety and security.
            </motion.p>

            {/* Quick stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-6 mb-10"
            >
              {[
                { icon: Globe2, value: `${total}+`, label: "Nations" },
                { icon: Ship, value: "40+", label: "Ships" },
                { icon: Anchor, value: "1000+", label: "Delegates" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white leading-none">{value}</p>
                    <p className="text-xs text-white/40 mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Featured nations mini-grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-4 gap-2"
            >
              {FEATURED.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.06 }}
                  className="flex flex-col items-center py-2 px-1 bg-white/5 border border-white/8 rounded-sm hover:border-gold/30 hover:bg-white/8 transition-colors"
                >
                  <span className="text-xl leading-none mb-1">{c.flag}</span>
                  <p className="text-[10px] text-white/60 font-medium">{c.name}</p>
                  {c.role !== "Participant" && (
                    <span className="text-[9px] text-gold/80 font-semibold">{c.role}</span>
                  )}
                </motion.div>
              ))}
              {/* +more */}
              <div className="flex flex-col items-center justify-center py-2 px-1 bg-white/5 border border-white/8 rounded-sm">
                <p className="text-base font-bold text-gold">+{total - FEATURED.length}</p>
                <p className="text-[10px] text-white/40">more</p>
              </div>
            </motion.div>
          </div>

          {/* ── Right — 3-D globe ── */}
          <motion.div
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(197,160,40,0.06) 40%, transparent 70%)",
              }}
            />

            <Suspense
              fallback={
                <div className="w-full aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
                </div>
              }
            >
              <div
                className="w-full mx-auto"
                style={{ height: "min(95vw, 660px)" }}
              >
                <GlobeCanvas />
              </div>
            </Suspense>

            {/* Badge rendered in 3-D space by GlobeCanvas Html component */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
