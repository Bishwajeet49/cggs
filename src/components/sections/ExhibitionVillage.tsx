"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Layers, Globe, Cpu, Music } from "lucide-react";

const zones = [
  { icon: Layers, title: "Defence Exhibition", desc: "Latest coast guard technologies, equipment and systems" },
  { icon: Globe, title: "Cultural Zone", desc: "Heritage and cultural displays from participating nations" },
  { icon: Cpu, title: "Innovation Hub", desc: "Maritime technology startups and digital solutions" },
  { icon: Music, title: "Hospitality Pavilion", desc: "Bilateral networking and entertainment" },
];

export default function ExhibitionVillage() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              All 3 Days · ITC Grand Chola
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Exhibition Village
            </h2>
            <div className="h-0.5 w-16 bg-gold mb-6" />
            <p className="text-base text-slate leading-relaxed mb-8">
              The CGGS 2027 Exhibition Village is a curated showcase running across all
              three days — featuring maritime technology, cultural exchanges, and
              bilateral hospitality from participating nations.
            </p>
            <Link
              href="/village"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-mid transition-colors"
            >
              Explore the Village →
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {zones.map((zone) => {
              const Icon = zone.icon;
              return (
                <div
                  key={zone.title}
                  className="p-5 bg-white rounded-sm border border-gray-100 hover:border-gold/20 hover:shadow-sm transition-all"
                >
                  <div className="h-9 w-9 rounded-sm bg-navy/5 flex items-center justify-center mb-3">
                    <Icon className="h-4 w-4 text-navy" />
                  </div>
                  <h3 className="text-sm font-bold text-navy mb-1">{zone.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">{zone.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
