"use client";

import { motion } from "framer-motion";
import { Target, Award } from "lucide-react";
import AnimatedStats from "@/components/events/AnimatedStats";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getFleetReviewBase, getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetOverview() {
  const base = getFleetReviewBase();
  const delegate = getDelegateFleetReview();
  const stats = base.statistics;

  const statItems = [
    { value: stats.participating_nations, label: "Nations" },
    { value: stats.vessels, label: "Ships" },
    { value: stats.aircraft, label: "Aircraft" },
    { value: stats.personnel, label: "Personnel" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Centrepiece event of CGGS 2027 — Bay of Bengal, Chennai">
          Fleet Review Overview
        </FleetSectionLabel>

        <p className="text-sm leading-relaxed text-slate/80">{base.about}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-gold" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">Purpose</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate/75">{delegate.purpose}</p>
          </div>
          <div className="rounded-xl border border-navy/10 bg-navy/3 p-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-gold" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">Importance</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate/75">{delegate.importance}</p>
          </div>
        </div>

        {base.objectives.length > 0 && (
          <div className="mt-5">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-gold">Objectives</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {base.objectives.slice(0, 3).map((obj) => (
                <div key={obj.title} className="rounded-lg border border-gray-100 bg-cream/50 px-3 py-2.5">
                  <p className="text-xs font-semibold text-navy">{obj.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate/60 line-clamp-2">{obj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </FleetPanel>

      <div className="mt-4">
        <AnimatedStats stats={statItems} />
      </div>
    </motion.div>
  );
}
