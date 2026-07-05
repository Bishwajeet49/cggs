"use client";

import { motion } from "framer-motion";
import type { CggsPillar } from "@/types/cggs";

interface Props {
  pillars: CggsPillar[];
}

export default function AboutPillars({ pillars }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-cream py-20 sm:py-24"
      aria-labelledby="about-pillars-heading"
    >
      {/* Subtle decorative gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, rgba(197,160,40,0.08) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Core Agenda
          </p>
          <h2
            id="about-pillars-heading"
            className="mb-4 text-3xl font-bold text-navy sm:text-4xl"
          >
            Pillars of Global Maritime Cooperation
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {pillars.map((pillar, i) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-sm border border-gold/10 bg-white p-6 shadow-sm transition-shadow hover:border-gold/30 hover:shadow-md sm:p-8"
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/5 text-2xl transition-colors group-hover:bg-gold/10">
                  {pillar.icon}
                </span>
                <div>
                  <h3 className="text-base font-bold text-navy sm:text-lg">{pillar.title}</h3>
                  <div className="mt-2 h-px w-8 bg-gold/40 transition-all group-hover:w-12" />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
