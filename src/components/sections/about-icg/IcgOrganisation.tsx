"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import type { IcgRegion, IcgFleetStat, IcgLeadership } from "@/types/icg";

interface Props {
  regions: IcgRegion[];
  fleetStats: IcgFleetStat[];
  leadership: IcgLeadership;
}

function AnimatedStat({ stat, index }: { stat: IcgFleetStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numericPart = parseInt(stat.value.replace(/\D/g, ""), 10);
  const suffix = stat.value.replace(/[\d]/g, "");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || isNaN(numericPart)) return;
    const duration = 1800;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericPart));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, numericPart]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-sm border border-navy/8 bg-white p-5 text-center"
    >
      <p className="mb-2 text-2xl">{stat.icon}</p>
      <p className="text-2xl font-bold text-navy sm:text-3xl">
        {isNaN(numericPart) ? stat.value : `${count}${suffix}`}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-slate">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function IcgOrganisation({ regions, fleetStats, leadership }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="icg-org-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Leadership */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/20 lg:col-span-2">
            <Image
              src={leadership.image_url}
              alt={leadership.image_alt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-sm font-bold text-white">{leadership.name}</p>
              <p className="text-xs text-gold">{leadership.title}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Leadership
            </p>
            <h2 id="icg-org-heading" className="mb-4 text-2xl font-bold text-navy sm:text-3xl">
              Message from the Director General
            </h2>
            <div className="mb-6 h-0.5 w-16 bg-gold" />
            <blockquote className="border-l-2 border-gold/40 pl-5 text-base italic leading-relaxed text-slate">
              &ldquo;{leadership.message}&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-navy">— {leadership.name}</p>
          </div>
        </motion.div>

        {/* Fleet stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Force Strength
            </p>
            <h3 className="text-2xl font-bold text-navy">Fleet & Infrastructure</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {fleetStats.map((stat, i) => (
              <AnimatedStat key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Regions */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Organisation
            </p>
            <h3 className="text-2xl font-bold text-navy">Regional Commands</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate">
              Five regional headquarters spanning India&apos;s coastline — from Gandhinagar
              to Port Blair — under Western and Eastern Seaboards.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, i) => (
              <motion.div
                key={region.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -2 }}
                className="rounded-sm border border-gold/10 bg-cream p-5 transition-shadow hover:border-gold/25 hover:shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold text-white">
                    {region.code}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-navy/40">
                    {region.seaboard}
                  </span>
                </div>
                <h4 className="mb-1 text-sm font-bold text-navy">{region.name}</h4>
                <p className="inline-flex items-center gap-1.5 text-xs text-slate">
                  <MapPin className="h-3 w-3 text-gold" />
                  {region.hq}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
