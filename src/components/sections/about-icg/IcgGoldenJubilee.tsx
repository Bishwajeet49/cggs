"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import type { IcgGoldenJubilee } from "@/types/icg";

interface Props {
  jubilee: IcgGoldenJubilee;
}

export default function IcgGoldenJubilee({ jubilee }: Props) {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{ background: "linear-gradient(135deg, #0D2154 0%, #06111E 100%)" }}
      aria-labelledby="icg-jubilee-heading"
    >
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gold">
              Golden Jubilee 2027
            </span>
          </div>

          <div className="relative mx-auto mb-6 inline-flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(197,160,40,0.3) 0%, transparent 70%)",
                transform: "scale(1.8)",
              }}
            />
            <div className="relative rounded-full border-2 border-gold/60 bg-gold/5 p-8">
              <p className="text-5xl font-bold text-gradient-gold sm:text-6xl">50</p>
            </div>
          </div>

          <h2
            id="icg-jubilee-heading"
            className="mb-3 text-2xl font-bold text-white sm:text-3xl"
          >
            {jubilee.title}
          </h2>
          <p className="mb-2 text-sm font-semibold tracking-widest text-gold/70">
            {jubilee.years}
          </p>
          <div className="mx-auto mb-6 h-0.5 w-16 bg-gold" />
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/55">
            {jubilee.description}
          </p>
        </motion.div>

        {/* Mini timeline */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-0">
          {jubilee.milestones.map((m, i, arr) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center"
            >
              <div className="flex flex-col items-center px-2 sm:px-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-[9px] font-bold ${
                    m.active
                      ? "border-gold bg-gold/20 text-gold shadow-[0_0_12px_4px_rgba(197,160,40,0.25)]"
                      : "border-gold/30 bg-white/5 text-gold/60"
                  }`}
                >
                  {m.year}
                </div>
                <p
                  className={`mt-1.5 max-w-[80px] text-[9px] leading-tight ${
                    m.active ? "text-gold" : "text-white/40"
                  }`}
                >
                  {m.event}
                </p>
              </div>
              {i < arr.length - 1 && (
                <div className="hidden h-px w-6 bg-gold/20 sm:block" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/about-cggs"
            className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            About CGGS 2027
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
          >
            View Summit Schedule
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
