"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetRouteMap() {
  const { route_map: map } = getDelegateFleetReview();
  const [zoom, setZoom] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel
          subtitle={map.description}
          action={
            <a
              href={map.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
            >
              Open in Maps <ExternalLink className="h-3 w-3" />
            </a>
          }
        >
          Venue &amp; Fleet Route
        </FleetSectionLabel>

        <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-blue-50 via-teal-50/80 to-sky-100">
          {/* Zoom controls */}
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(1.5, z + 0.15))}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md text-navy hover:bg-gold/10"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.15))}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md text-navy hover:bg-gold/10"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
          </div>

          <div
            className="relative h-56 transition-transform duration-300 sm:h-72"
            style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
          >
            {/* Grid */}
            <svg className="absolute inset-0 h-full w-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="fleet-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#fleet-grid)" />
            </svg>

            {/* Fleet route path */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M 10 80 Q 30 60, 48 40 Q 65 25, 90 20"
                fill="none"
                stroke="#2563eb"
                strokeWidth="0.8"
                strokeDasharray="3 2"
                opacity="0.6"
              />
            </svg>

            {/* Water shimmer */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-blue-200/30 to-transparent" />

            {/* Markers */}
            {map.markers.map((m) => (
              <div
                key={m.id}
                className="absolute -translate-x-1/2 -translate-y-full"
                style={{ left: `${m.x}%`, top: `${m.y}%` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md ${m.color}`}>
                    <MapPin className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className={`mt-1 max-w-[90px] rounded px-1.5 py-0.5 text-center text-[8px] font-bold shadow ${m.color} text-white`}>
                    {m.label}
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-navy shadow">
              <Navigation className="h-3 w-3 text-gold" /> Chennai Port Trust
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3">
          {map.legend.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${item.color}`} />
              <span className="text-[11px] font-medium text-slate/65">{item.label}</span>
            </div>
          ))}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
