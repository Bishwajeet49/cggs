"use client";

import { motion } from "framer-motion";
import type { IcgMissionArea } from "@/types/icg";

interface Props {
  missions: IcgMissionArea[];
}

export default function IcgRoles({ missions }: Props) {
  return (
    <section
      className="relative overflow-hidden bg-cream py-20 sm:py-24"
      aria-labelledby="icg-roles-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 80%, rgba(13,33,84,0.06) 0%, transparent 50%)",
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
            Duties & Functions
          </p>
          <h2 id="icg-roles-heading" className="mb-4 text-3xl font-bold text-navy sm:text-4xl">
            What the ICG Protects
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-gold" />
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate">
            Mandated under the Coast Guard Act, 1978, the ICG serves as first responder
            across India&apos;s maritime domain — from offshore installations to coastal communities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {missions.map((mission, i) => (
            <motion.article
              key={mission.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              className="group rounded-sm border border-gold/10 bg-white p-6 transition-shadow hover:border-gold/25 hover:shadow-md"
            >
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy/5 text-xl transition-colors group-hover:bg-gold/10">
                {mission.icon}
              </span>
              <h3 className="mb-2 text-sm font-bold text-navy">{mission.title}</h3>
              <p className="text-xs leading-relaxed text-slate">{mission.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
