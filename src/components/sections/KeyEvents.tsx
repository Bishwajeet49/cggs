"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Anchor, Mic2, Store, UtensilsCrossed, ArrowRight } from "lucide-react";

const events = [
  {
    icon: Anchor,
    title: "International Fleet Review",
    subtitle: "Day 3 · Chennai Coast",
    description:
      "A grand maritime display featuring Coast Guard ships from 40+ nations off the Marina Coastal Waters of Chennai.",
    href: "/fleet-review",
    accent: "border-t-gold",
  },
  {
    icon: Mic2,
    title: "World Coast Guard Seminar",
    subtitle: "Days 1–2 · Rajendra Chola Hall",
    description:
      "Three strategic sessions on multilateral threats, environmental protection, and maritime domain awareness.",
    href: "/seminar",
    accent: "border-t-gold",
  },
  {
    icon: Store,
    title: "Exhibition Village",
    subtitle: "All 3 Days · ITC Grand Chola",
    description:
      "A curated showcase of maritime technology, coast guard equipment, cultural exhibits, and bilateral displays.",
    href: "/village",
    accent: "border-t-gold",
  },
  {
    icon: UtensilsCrossed,
    title: "Official Dinners & Events",
    subtitle: "All Evenings · Chola Lawns",
    description:
      "Presidential Welcome Dinner, Golden Jubilee Gala, and networking receptions with cultural performances.",
    href: "/about-cggs",
    accent: "border-t-gold",
  },
];

export default function KeyEvents() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Key Events
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Highlights of CGGS 2027
          </h2>
          <div className="h-0.5 w-16 bg-gold" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev, i) => {
            const Icon = ev.icon;
            return (
              <motion.div
                key={ev.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={ev.href}
                  className="group flex flex-col h-full bg-white rounded-sm border border-gray-100 border-t-4 border-t-gold hover:shadow-lg hover:shadow-navy/10 transition-all p-6"
                >
                  <div className="h-10 w-10 rounded-sm bg-navy/5 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                    <Icon className="h-5 w-5 text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="text-base font-bold text-navy mb-1 group-hover:text-navy-mid transition-colors">
                    {ev.title}
                  </h3>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gold/80 mb-3">
                    {ev.subtitle}
                  </p>
                  <p className="text-sm text-slate leading-relaxed flex-1">
                    {ev.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
