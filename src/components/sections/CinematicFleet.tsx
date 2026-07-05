"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Anchor, Flag, Ship, Wind } from "lucide-react";

const FLEET_STATS = [
  { icon: Ship, value: "40+", label: "Ships" },
  { icon: Flag, value: "40+", label: "Nations" },
  { icon: Anchor, value: "Bay of Bengal", label: "Venue" },
  { icon: Wind, value: "Feb 17", label: "Day 3 · 2027" },
];

export default function CinematicFleet() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: background image moves slower than scroll */
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["-12%", "12%"]);

  /* Text rises in as section scrolls into view */
  const textY = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? ["0px", "0px"] : ["40px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#020d1f]"
      aria-label="International Coast Guard Fleet Review 2027"
    >
      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/banners/banner-2.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ transform: "scale(1.18)" }}
        />
      </motion.div>

      {/* ── Multi-stop overlay: dark on top + bottom ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,13,31,0.92) 0%, rgba(2,13,31,0.55) 40%, rgba(2,13,31,0.55) 60%, rgba(2,13,31,0.92) 100%)",
        }}
      />

      {/* ── Scan-line texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative py-28 sm:py-36 lg:py-44"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-bold uppercase text-gold mb-6"
          >
            Day 3 · 17 February 2027
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-none mb-4 tracking-tight"
          >
            ICGFR 2027
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-2xl text-white/70 font-light mb-3"
          >
            International Coast Guard Fleet Review
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-px w-24 bg-gold/60 mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base text-white/55 leading-relaxed max-w-lg mb-12"
          >
            The centrepiece of CGGS 2027 — a grand maritime display off the
            Chennai coast featuring Coast Guard ships, patrol aircraft, and
            rescue vessels from 40+ nations, presided over by the President
            of India.
          </motion.p>

          {/* ── Stat strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            {FLEET_STATS.map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.08 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/8 border border-white/12 backdrop-blur-sm rounded-sm"
              >
                <Icon className="h-4 w-4 text-gold shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white leading-none">{value}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link
              href="/fleet-review"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-navy text-sm font-bold rounded-sm hover:bg-gold-light transition-colors shadow-xl shadow-gold/20"
            >
              Explore Fleet Review →
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Animated wake lines (decorative) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-px bg-gold/20"
            style={{ bottom: `${i * 8}px` }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.1, 0.4, 0.1] }}
            transition={{
              duration: 4,
              delay: i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
