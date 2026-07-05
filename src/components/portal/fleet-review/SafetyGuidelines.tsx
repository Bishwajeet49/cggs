"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck, Clock, Shield, Camera, Ban, AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

const ICON_MAP: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  clock: Clock,
  shield: Shield,
  camera: Camera,
  ban: Ban,
  alert: AlertTriangle,
};

export default function SafetyGuidelines() {
  const guidelines = getDelegateFleetReview().safety_guidelines;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Essential instructions for all Fleet Review delegates">
          Safety Guidelines
        </FleetSectionLabel>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guidelines.map((g, i) => {
            const Icon = ICON_MAP[g.icon] ?? Shield;
            return (
              <motion.div
                key={g.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-gray-100 bg-white p-4 transition-all hover:border-gold/25 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <p className="mt-3 text-sm font-bold text-navy">{g.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate/65">{g.description}</p>
              </motion.div>
            );
          })}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
