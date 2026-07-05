"use client";

import { motion } from "framer-motion";
import { Globe, Shield, Users } from "lucide-react";
import type { CggsAboutContent } from "@/types/cggs";

interface Props {
  about: CggsAboutContent;
}

export default function AboutMission({ about }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="about-mission-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              About the Summit
            </p>
            <h2
              id="about-mission-heading"
              className="mb-4 text-3xl font-bold leading-tight text-navy sm:text-4xl"
            >
              A Global Forum for Coast Guard Cooperation
            </h2>
            <div className="mb-6 h-0.5 w-16 bg-gold" />
            <p className="mb-4 text-base leading-relaxed text-slate italic border-l-2 border-gold/40 pl-4">
              &ldquo;{about.tagline}&rdquo;
            </p>
            <p className="mb-4 text-base leading-relaxed text-slate">{about.mission}</p>
            <p className="text-base leading-relaxed text-slate">{about.description}</p>
          </motion.div>

          {/* Right — objectives + org */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="space-y-6"
          >
            <div className="rounded-sm border border-gold/15 bg-cream p-6 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5">
                  <Globe className="h-5 w-5 text-navy" />
                </div>
                <h3 className="text-lg font-bold text-navy">Core Objectives</h3>
              </div>
              <ul className="space-y-3">
                {about.objectives.map((obj, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex gap-3 text-sm leading-relaxed text-slate"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {obj}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-sm border border-navy/10 bg-white p-5">
                <Shield className="mb-3 h-5 w-5 text-gold" />
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-navy/60">
                  Secretariat
                </p>
                <p className="text-sm leading-relaxed text-slate">{about.secretariat}</p>
              </div>
              <div className="rounded-sm border border-navy/10 bg-white p-5">
                <Users className="mb-3 h-5 w-5 text-gold" />
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-navy/60">
                  Co-Founders
                </p>
                <ul className="space-y-1">
                  {about.co_founders.map((founder) => (
                    <li key={founder} className="text-sm text-slate">
                      {founder}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
