"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const MILESTONES = [
  { year: "1977", event: "Indian Coast Guard Established", active: false },
  { year: "2017", event: "1st CGGS Tokyo",                active: false },
  { year: "2025", event: "4th CGGS Rome, Italy",          active: false },
  { year: "2027", event: "5th CGGS Chennai — Golden Jubilee", active: true },
];

/* Small ambient sparkles for the section */
const SPARKS = [
  { id: 0,  x: 10, y: 20, s: 3,   d: 4.5, dl: 0.0,  color: "gold"  },
  { id: 1,  x: 85, y: 15, s: 2.5, d: 5.2, dl: 1.1,  color: "white" },
  { id: 2,  x: 22, y: 75, s: 3.5, d: 3.8, dl: 0.5,  color: "gold"  },
  { id: 3,  x: 90, y: 65, s: 2,   d: 6.0, dl: 2.0,  color: "white" },
  { id: 4,  x: 5,  y: 50, s: 3,   d: 4.2, dl: 0.8,  color: "gold"  },
  { id: 5,  x: 75, y: 85, s: 2.5, d: 5.5, dl: 1.6,  color: "white" },
  { id: 6,  x: 50, y: 10, s: 3,   d: 4.8, dl: 0.3,  color: "gold"  },
  { id: 7,  x: 38, y: 88, s: 2,   d: 3.5, dl: 2.4,  color: "white" },
  { id: 8,  x: 65, y: 30, s: 3.5, d: 5.0, dl: 0.7,  color: "gold"  },
  { id: 9,  x: 15, y: 40, s: 2.5, d: 4.3, dl: 1.9,  color: "white" },
];

const SPARK_STYLES: Record<string, React.CSSProperties> = {
  white: { backgroundColor: "#ffffff", boxShadow: "0 0 6px 2px rgba(255,255,255,0.5)"  },
  gold:  { backgroundColor: "#c5a028", boxShadow: "0 0 8px 3px rgba(197,160,40,0.55)" },
};

export default function GoldenJubilee() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse]   = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion  = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMouse({
        x: (e.clientX - rect.left) / rect.width  - 0.5,
        y: (e.clientY - rect.top)  / rect.height - 0.5,
      });
    },
    [prefersReducedMotion]
  );

  /* Parallax helpers — multiply by depth factor */
  const px = (depth: number) => `${mouse.x * depth * -1}px`;
  const py = (depth: number) => `${mouse.y * depth * -1}px`;
  const parallaxStyle = (depth: number): React.CSSProperties =>
    prefersReducedMotion || !hovered
      ? {}
      : { transform: `translate(${px(depth)}, ${py(depth)})`, transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)" };

  /* 3-D tilt on the badge */
  const tiltStyle: React.CSSProperties =
    prefersReducedMotion || !hovered
      ? {}
      : {
          transform: `perspective(600px) rotateY(${mouse.x * 14}deg) rotateX(${-mouse.y * 14}deg) scale(1.04)`,
          transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "#06111E" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }}
    >
      {/* ── Ambient sparkles ──────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {SPARKS.map((sp) => (
            <motion.div
              key={sp.id}
              className="absolute rounded-full"
              style={{
                left: `${sp.x}%`,
                top:  `${sp.y}%`,
                width:  sp.s,
                height: sp.s,
                ...SPARK_STYLES[sp.color],
              }}
              animate={{
                y:       [0, -(20 + sp.s * 4), 0],
                x:       [0, sp.id % 2 === 0 ? 8 : -8, 0],
                opacity: [0.3, 0.85, 0.3],
                scale:   [1, 1.4, 1],
              }}
              transition={{ duration: sp.d, delay: sp.dl, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Deep-layer rings (slowest parallax) ───────────────────── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 900, height: 900,
          border: "1px solid rgba(197,160,40,0.06)",
          ...parallaxStyle(18),
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 700, height: 700,
          border: "1px solid rgba(197,160,40,0.10)",
          ...parallaxStyle(22),
        }}
      />

      {/* ── Spinning ring (mid layer) ──────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 540, height: 540,
            border: "1px dashed rgba(197,160,40,0.18)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* ── Pulsing glow orb (deep centre) ────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(197,160,40,0.10) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── Corner accent orbs ────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(197,160,40,0.18) 0%, transparent 70%)",
          ...parallaxStyle(30),
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(30,64,144,0.28) 0%, transparent 70%)",
          ...parallaxStyle(25),
        }}
      />

      {/* ── Main content ──────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6" style={parallaxStyle(8)}>

        {/* Golden badge with 3-D tilt */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative inline-flex items-center justify-center" style={tiltStyle}>
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: "radial-gradient(circle, rgba(197,160,40,0.35) 0%, transparent 70%)", transform: "scale(1.5)" }}
            />
            {/* Outer decorative ring */}
            <div className="absolute border border-gold/20 rounded-full" style={{ inset: "-18px" }} />
            {/* Badge */}
            <div className="relative border-2 border-gold/70 rounded-full p-7 bg-gold/5 backdrop-blur-sm"
              style={{ boxShadow: "0 0 32px 8px rgba(197,160,40,0.18), inset 0 0 20px rgba(197,160,40,0.08)" }}>
              <p className="text-5xl sm:text-6xl font-bold text-gradient-gold leading-none select-none">
                50
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-gold/80">
            Golden Jubilee
          </p>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            50 Years of the Indian Coast Guard
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-4">
            1977 — 2027
          </p>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="text-base text-white/55 max-w-2xl mx-auto mb-12">
            The Indian Coast Guard was established on February 1, 1977. As it marks five
            decades of protecting India&apos;s maritime frontiers, the 5th CGGS celebrates
            this historic milestone on the world stage.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="flex flex-col sm:flex-row items-center justify-center max-w-3xl mx-auto mb-12">
          {MILESTONES.map((m, i, arr) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              className="flex sm:flex-row flex-col items-center"
            >
              <div className="flex flex-col items-center group">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className={`h-11 w-11 rounded-full border-2 flex items-center justify-center cursor-default transition-colors ${
                    m.active
                      ? "border-gold bg-gold/20 shadow-[0_0_16px_4px_rgba(197,160,40,0.30)]"
                      : "border-gold/35 bg-white/5 hover:border-gold/70 hover:bg-gold/10"
                  }`}
                >
                  <span className={`text-[9px] font-bold ${m.active ? "text-gold" : "text-gold/60"}`}>
                    {m.year}
                  </span>
                </motion.div>
                <p className={`mt-2 text-[10px] text-center max-w-[90px] leading-relaxed ${
                  m.active ? "text-gold" : "text-white/45"
                }`}>
                  {m.event}
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="h-6 w-px sm:w-14 sm:h-px bg-linear-to-r from-gold/10 via-gold/30 to-gold/10 my-1 sm:my-0 sm:mx-2 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center"
        >
          <Link
            href="/about-icg"
            className="inline-flex items-center gap-2 px-7 py-3 border border-gold/40 text-gold text-sm font-medium rounded-sm hover:bg-gold/10 hover:border-gold/70 transition-colors"
            style={{ boxShadow: "0 0 18px rgba(197,160,40,0.08)" }}
          >
            About Indian Coast Guard →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
