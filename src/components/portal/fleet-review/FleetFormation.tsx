"use client";

import { motion } from "framer-motion";
import { Ship, Anchor } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetFormation() {
  const { formation } = getDelegateFleetReview();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Three-column formation off the Chennai coast — 48 vessels in review order">
          Fleet Formation
        </FleetSectionLabel>

        {/* Lead ship banner */}
        <div className="mb-5 rounded-xl border border-gold/30 bg-linear-to-r from-navy to-navy-mid p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
              <Anchor className="h-6 w-6 text-gold" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">Lead Ship</p>
              <p className="text-lg font-bold">{formation.lead_ship}</p>
              <p className="text-xs text-white/55">Reviewing Vessel — Presidential Review Platform</p>
            </div>
          </div>
        </div>

        {/* Formation diagram */}
        <div className="relative mb-5 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-b from-blue-50/80 to-teal-50/50 p-6">
          <svg viewBox="0 0 400 200" className="mx-auto w-full max-w-lg" aria-label="Fleet formation diagram">
            {/* Water lines */}
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="8 6" opacity="0.4" />
            ))}
            {/* Lead ship */}
            <rect x="185" y="20" width="30" height="12" rx="2" fill="#0D2154" />
            <text x="200" y="16" textAnchor="middle" fontSize="8" fill="#C9A84C" fontWeight="bold">LEAD</text>
            {/* Indian column */}
            {[50, 70, 90, 110].map((y, i) => (
              <rect key={`in-${i}`} x="175" y={y} width="50" height="10" rx="2" fill="#0D2154" opacity={0.9 - i * 0.15} />
            ))}
            {/* International left column */}
            {[50, 70, 90, 110].map((y, i) => (
              <rect key={`il-${i}`} x="100" y={y} width="40" height="10" rx="2" fill="#1e40af" opacity={0.8 - i * 0.1} />
            ))}
            {/* International right column */}
            {[50, 70, 90, 110].map((y, i) => (
              <rect key={`ir-${i}`} x="260" y={y} width="40" height="10" rx="2" fill="#1e40af" opacity={0.8 - i * 0.1} />
            ))}
            {/* Labels */}
            <text x="120" y="145" textAnchor="middle" fontSize="9" fill="#64748b">International</text>
            <text x="200" y="145" textAnchor="middle" fontSize="9" fill="#0D2154" fontWeight="bold">Indian Fleet</text>
            <text x="280" y="145" textAnchor="middle" fontSize="9" fill="#64748b">International</text>
            {/* Direction arrow */}
            <path d="M 200 175 L 200 195 M 195 190 L 200 195 L 205 190" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            <text x="200" y="185" textAnchor="middle" fontSize="7" fill="#C9A84C">Review Route</text>
          </svg>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[formation.indian_fleet, formation.international_fleet].map((col) => (
            <div key={col.label} className="rounded-xl border border-gray-100 bg-cream/30 p-4">
              <div className="flex items-center gap-2">
                <Ship className="h-4 w-4 text-gold" />
                <p className="text-sm font-bold text-navy">{col.label}</p>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate/65">{col.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {col.ships.map((s) => (
                  <span key={s} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-navy border border-gray-100">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Formation order */}
        <div className="mt-5">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-gold">Formation Order</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {formation.formation_order.map((item) => (
              <div
                key={item.position}
                className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white px-3 py-2"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-gold">
                  {item.position}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-navy">{item.ship_name}</p>
                  <p className="text-[10px] text-slate/50">{item.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FleetPanel>
    </motion.div>
  );
}
