"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Ship, Mic2, Tent, ArrowRight } from "lucide-react";

interface EventLink {
  label: string;
  description: string;
  stat: string;
  statLabel: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  accentColor: string;
}

const EVENT_LINKS: EventLink[] = [
  {
    label: "Event Schedule",
    description: "Full 3-day summit programme with plenary sessions, bilaterals, gala dinners, and fleet review.",
    stat: "17",
    statLabel: "Sessions",
    href: "/schedule",
    icon: <Calendar className="h-6 w-6" />,
    gradient: "from-[#06111E] to-[#0D2154]",
    accentColor: "#C5A028",
  },
  {
    label: "International Fleet Review",
    description: "48 vessels from 57 nations assemble off the Chennai coast for the largest ICGFR in history.",
    stat: "48",
    statLabel: "Vessels",
    href: "/fleet-review",
    icon: <Ship className="h-6 w-6" />,
    gradient: "from-[#0D2154] to-[#112870]",
    accentColor: "#C5A028",
  },
  {
    label: "World Coast Guard Seminar",
    description: "Strategic roundtables, policy frameworks, and bilateral MoU signings shaping maritime governance.",
    stat: "57",
    statLabel: "Nations",
    href: "/seminar",
    icon: <Mic2 className="h-6 w-6" />,
    gradient: "from-[#112870] to-[#1E4090]",
    accentColor: "#C5A028",
  },
  {
    label: "Exhibition Village",
    description: "84 exhibitors across 5 themed zones — culture, technology, innovation, hospitality, and partners.",
    stat: "84",
    statLabel: "Exhibitors",
    href: "/village",
    icon: <Tent className="h-6 w-6" />,
    gradient: "from-[#06111E] to-[#0D2154]",
    accentColor: "#C5A028",
  },
];

interface EventCrossNavProps {
  currentHref: string;
  title?: string;
}

export default function EventCrossNav({
  currentHref,
  title = "Explore More Events",
}: EventCrossNavProps) {
  const links = EVENT_LINKS.filter((l) => l.href !== currentHref);

  return (
    <section className="bg-white py-16 border-t border-navy/6" aria-labelledby="cross-nav-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            CGGS 2027 Events
          </p>
          <h2 id="cross-nav-title" className="text-2xl font-bold text-navy sm:text-3xl">
            {title}
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block rounded-sm overflow-hidden border border-navy/10 bg-white shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {/* Card header — dark gradient */}
                <div
                  className={`relative bg-linear-to-br ${link.gradient} px-5 pt-5 pb-12 overflow-hidden`}
                >
                  {/* Grid pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-4 h-11 w-11 rounded-sm flex items-center justify-center text-gold shadow-sm"
                    style={{ background: "rgba(197,160,40,0.15)", border: "1px solid rgba(197,160,40,0.3)" }}
                  >
                    {link.icon}
                  </div>

                  {/* Label */}
                  <p className="text-base font-bold text-white leading-snug group-hover:text-gold transition-colors pr-8 relative z-10">
                    {link.label}
                  </p>

                  {/* Arrow */}
                  <div className="absolute top-5 right-5 text-white/20 group-hover:text-gold/60 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>

                  {/* Stat watermark */}
                  <div
                    className="absolute -bottom-2 -right-2 text-7xl font-black text-white pointer-events-none select-none"
                    style={{ opacity: 0.05, lineHeight: 1 }}
                  >
                    {link.stat}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 py-4 -mt-5 relative">
                  <div className="rounded-sm bg-cream border border-navy/8 px-4 py-3 mb-3 flex items-center justify-between">
                    <span className="text-2xl font-black text-navy">{link.stat}</span>
                    <span className="text-xs font-medium text-slate uppercase tracking-wider">
                      {link.statLabel}
                    </span>
                  </div>

                  <p className="text-xs text-slate leading-relaxed line-clamp-2 mb-3">
                    {link.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs font-semibold text-navy/40 group-hover:text-gold transition-colors">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
