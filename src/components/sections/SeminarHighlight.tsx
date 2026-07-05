"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Users, ShieldCheck, Waves } from "lucide-react";

const themes = [
  {
    icon: ShieldCheck,
    title: "Emerging Multilateral Threats",
    sub: "Session I · Day 1",
  },
  {
    icon: Waves,
    title: "Guarding the Blue Environment",
    sub: "Session II · Day 2",
  },
  {
    icon: MessageSquare,
    title: "Digitalization of Maritime Domain Awareness",
    sub: "Panel Discussion · Day 1",
  },
  {
    icon: Users,
    title: "Bilateral & Multilateral Assemblies",
    sub: "Side Meetings · Day 2",
  },
];

export default function SeminarHighlight() {
  return (
    <section className="overflow-x-clip bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-navy/10">
              <Image
                src="/banners/banner-1.png"
                alt="World Coast Guard Seminar 2027"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-navy text-white px-4 py-3 rounded-sm shadow-lg sm:-bottom-4 sm:-right-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gold">
                WCGS 2027
              </p>
              <p className="text-[10px] mt-0.5 text-white/60">Days 1 & 2</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Days 1 & 2 · Rajendra Chola Hall
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 leading-tight">
              World Coast Guard Seminar
            </h2>
            <div className="h-0.5 w-16 bg-gold mb-6" />
            <p className="text-base text-slate leading-relaxed mb-8">
              The World Coast Guard Seminar brings together leading maritime experts and
              coast guard chiefs for strategic roundtables, technical presentations, and
              high-level policy discussions across three thematic sessions.
            </p>

            <div className="space-y-4 mb-8">
              {themes.map((theme) => {
                const Icon = theme.icon;
                return (
                  <div key={theme.title} className="flex items-center gap-4">
                    <div className="h-9 w-9 rounded-sm bg-navy/5 border border-navy/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-navy" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{theme.title}</p>
                      <p className="text-[11px] text-gold">{theme.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/seminar"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-mid transition-colors"
            >
              View Seminar Programme →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
