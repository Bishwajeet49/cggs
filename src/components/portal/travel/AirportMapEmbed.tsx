"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink, Navigation } from "lucide-react";
import { TravelPanel } from "./TravelPanel";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Chennai+International+Airport/@12.9941,80.1683,15z/data=!4m6!3m5!1s0x3a525d17f1da8a0b:0xb8f1e77cec1ef3e1!8m2!3d12.9902!4d80.1693!16s%2Fg%2F11bwlx85f5";

const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=80.140%2C12.974%2C80.202%2C13.014&layer=mapnik&marker=12.994%2C80.171";

interface AirportMapEmbedProps {
  labels?: { key: string; value: string }[];
  delay?: number;
}

export default function AirportMapEmbed({ labels = [], delay = 0 }: AirportMapEmbedProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <TravelPanel className="overflow-hidden p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <p className="text-sm font-bold text-navy">Chennai International Airport</p>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-gold/25 bg-gold/10 px-2.5 py-1 text-[11px] font-semibold text-gold-dark transition-colors hover:bg-gold/20"
          >
            Open in Maps
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Real map — click overlay opens Google Maps */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
          aria-label="Open Chennai International Airport in Google Maps"
        >
          <iframe
            src={OSM_EMBED_URL}
            title="Chennai International Airport"
            className="h-48 w-full border-0 sm:h-52"
            style={{ pointerEvents: "none" }}
            loading="lazy"
          />
          {/* Click-to-open hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-200 group-hover:bg-navy/15">
            <span className="scale-90 rounded-xl border border-white/30 bg-navy/80 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
              <Navigation className="mr-1.5 inline h-3.5 w-3.5 text-gold" />
              Open Full Map in Google Maps
            </span>
          </div>
          {/* Persistent badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-navy shadow-md transition-opacity group-hover:opacity-0">
            <Navigation className="h-3 w-3 text-gold" />
            Tap to open
          </div>
        </a>

        {/* Location labels */}
        {labels.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-gray-100 px-5 py-3.5">
            {labels.map((l) => (
              <div key={l.key}>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{l.key}</dt>
                <dd className="mt-0.5 text-xs font-medium leading-snug text-navy">{l.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </TravelPanel>
    </motion.div>
  );
}
