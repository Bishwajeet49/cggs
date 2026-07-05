"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const slides = [
  {
    src: "/banners/banner-1.png",
    alt: "5th Coast Guard Global Summit 2027 — Official Banner",
  },
  {
    src: "/banners/banner-2.png",
    alt: "CGGS 2027 — International Maritime Summit, Chennai India",
  },
];

/* Stable particle data — generated once so SSR hydration matches.
   color: "white" | "gold" | "blue" — for multi-tint visual variety */
const PARTICLES = [
  { id: 0,  x: 8,  y: 15, s: 4,  d: 5.2, dl: 0,   color: "gold"  },
  { id: 1,  x: 18, y: 72, s: 3,  d: 4.1, dl: 1.2,  color: "white" },
  { id: 2,  x: 32, y: 38, s: 5,  d: 6.0, dl: 0.4,  color: "white" },
  { id: 3,  x: 45, y: 88, s: 2.5,d: 3.8, dl: 2.1,  color: "gold"  },
  { id: 4,  x: 55, y: 22, s: 5,  d: 5.5, dl: 0.7,  color: "blue"  },
  { id: 5,  x: 67, y: 58, s: 3.5,d: 4.8, dl: 1.5,  color: "white" },
  { id: 6,  x: 78, y: 12, s: 6,  d: 6.2, dl: 0.2,  color: "gold"  },
  { id: 7,  x: 85, y: 75, s: 3,  d: 3.5, dl: 2.8,  color: "white" },
  { id: 8,  x: 92, y: 44, s: 5,  d: 5.0, dl: 0.9,  color: "blue"  },
  { id: 9,  x: 25, y: 55, s: 3.5,d: 4.5, dl: 1.8,  color: "gold"  },
  { id: 10, x: 60, y: 80, s: 5,  d: 5.8, dl: 0.3,  color: "white" },
  { id: 11, x: 40, y: 20, s: 2.5,d: 4.2, dl: 2.5,  color: "gold"  },
  { id: 12, x: 72, y: 35, s: 6,  d: 3.9, dl: 1.1,  color: "white" },
  { id: 13, x: 15, y: 90, s: 3.5,d: 5.3, dl: 0.6,  color: "blue"  },
  { id: 14, x: 88, y: 28, s: 5,  d: 4.7, dl: 2.0,  color: "gold"  },
  { id: 15, x: 50, y: 65, s: 3,  d: 6.1, dl: 0.8,  color: "white" },
  { id: 16, x: 35, y: 48, s: 6,  d: 4.4, dl: 1.7,  color: "gold"  },
  { id: 17, x: 5,  y: 60, s: 3.5,d: 5.6, dl: 0.1,  color: "white" },
  { id: 18, x: 95, y: 82, s: 5,  d: 3.7, dl: 2.3,  color: "blue"  },
  { id: 19, x: 62, y: 10, s: 2.5,d: 4.9, dl: 1.4,  color: "gold"  },
  { id: 20, x: 28, y: 30, s: 5,  d: 5.1, dl: 0.5,  color: "white" },
  { id: 21, x: 80, y: 95, s: 3.5,d: 4.3, dl: 2.9,  color: "gold"  },
  { id: 22, x: 48, y: 5,  s: 5,  d: 6.3, dl: 1.0,  color: "white" },
  { id: 23, x: 20, y: 85, s: 3,  d: 3.6, dl: 1.9,  color: "blue"  },
  { id: 24, x: 70, y: 50, s: 4,  d: 5.4, dl: 0.0,  color: "gold"  },
];

const PARTICLE_STYLES: Record<string, React.CSSProperties> = {
  white: { backgroundColor: "#ffffff", boxShadow: "0 0 8px 3px rgba(255,255,255,0.55)" },
  gold:  { backgroundColor: "#c5a028", boxShadow: "0 0 10px 4px rgba(197,160,40,0.60)" },
  blue:  { backgroundColor: "#7eaaff", boxShadow: "0 0 8px 3px rgba(126,170,255,0.55)" },
};

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + slides.length) % slides.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    },
    [prefersReducedMotion]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      aria-label="Hero banner carousel"
    >
      {/* ── Banner images with parallax layer ─────────────────────── */}
      <div
        className="relative"
        style={
          prefersReducedMotion
            ? {}
            : {
                transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -6}px) scale(1.03)`,
                transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
              }
        }
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.alt} className="w-full h-auto block" />
          </div>
        ))}
      </div>

      {/* ── Floating particles ────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.s,
                height: p.s,
                ...PARTICLE_STYLES[p.color],
              }}
              animate={{
                y: [0, -(30 + p.s * 3), 0],
                x: [0, p.id % 2 === 0 ? 12 : -12, 0],
                opacity: [0.35, 0.9, 0.35],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: p.d, delay: p.dl, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
      )}

      {/* ── Ambient glow orbs ─────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(197,160,40,0.12) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(30,64,144,0.25) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* ── Bottom gradient for readability ──────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(0deg, rgba(6,17,30,0.85) 0%, transparent 100%)" }}
      />

      {/* ── CTA Buttons ──────────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-14 flex justify-center px-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-gold text-navy text-sm font-bold rounded-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20 min-w-[180px]"
          >
            Register as Delegate
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center px-8 py-3 bg-black/25 text-white border border-white/40 text-sm font-medium rounded-sm hover:border-white hover:bg-black/40 transition-colors backdrop-blur-sm min-w-[180px]"
          >
            Explore Schedule
          </Link>
        </div>
      </div>

      {/* ── Scroll hint ──────────────────────────────────────────── */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none"
          animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown className="h-4 w-4 text-white/60" />
        </motion.div>
      )}

      {/* ── Dot indicators ──────────────────────────────────────── */}
      <div className="absolute bottom-3 right-6 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* ── Prev / Next controls ─────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/25 border border-white/20 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-black/25 border border-white/20 text-white hover:bg-black/50 transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}
