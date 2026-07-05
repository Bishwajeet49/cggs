"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Anchor } from "lucide-react";

interface CTABannerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #06111E 0%, #0D2154 50%, #06111E 100%)" }}>
      {/* Gold top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, #C5A028 30%, #E0C048 50%, #C5A028 70%, transparent 100%)" }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(197,160,40,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.6,
        }}
      />

      {/* Left glow */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-linear-to-r from-gold/5 to-transparent" />
      {/* Right glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-navy-mid/40 to-transparent" />

      {/* Anchor watermark left */}
      <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 opacity-[0.04] hidden lg:block">
        <Anchor className="h-48 w-48 text-white" />
      </div>
      {/* Anchor watermark right */}
      <div className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 opacity-[0.04] hidden lg:block scale-x-[-1]">
        <Anchor className="h-48 w-48 text-white" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow && (
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-gold/40" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                {eyebrow}
              </p>
              <span className="h-px w-12 bg-gold/40" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight max-w-3xl mx-auto">
            {title}
          </h2>

          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/55">
              {subtitle}
            </p>
          )}

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="group inline-flex items-center gap-2.5 rounded-sm bg-gold px-8 py-4 text-sm font-bold text-navy hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20 hover:shadow-gold/30"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-8 py-4 text-sm font-semibold text-white/80 hover:border-white/40 hover:text-white transition-all duration-200"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/25">
            {["57 Nations", "1,200+ Delegates", "3 Days", "Chennai, India"].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-gold/40" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
