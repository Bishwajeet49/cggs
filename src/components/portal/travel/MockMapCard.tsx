"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { TravelPanel } from "./TravelPanel";

interface Marker {
  label: string;
  x: number;
  y: number;
  color: string;
}

interface MockMapCardProps {
  title: string;
  markers: Marker[];
  labels?: { key: string; value: string }[];
  mapsUrl?: string;
  delay?: number;
}

export default function MockMapCard({ title, markers, labels = [], mapsUrl, delay = 0 }: MockMapCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <TravelPanel>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            <p className="text-sm font-bold text-navy">{title}</p>
          </div>
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gold hover:underline"
            >
              Open in Maps <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Mock map */}
        <div className="relative h-44 overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-blue-50 via-teal-50 to-blue-100">
          {/* Grid lines */}
          <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${title}`} width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#94a3b8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
          </svg>
          {/* Road lines */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
            <line x1="0" y1="25%" x2="100%" y2="75%" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="8 6" strokeLinecap="round" />
          </svg>
          {/* Markers */}
          {markers.map((m) => (
            <div
              key={m.label}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              <div className="flex flex-col items-center">
                <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md ${m.color}`}>
                  <MapPin className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                </div>
                <div className={`mt-1 max-w-[100px] rounded px-1.5 py-0.5 text-center text-[9px] font-bold shadow ${m.color} text-white`}>
                  {m.label}
                </div>
              </div>
            </div>
          ))}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[10px] font-semibold text-navy shadow">
            <Navigation className="h-3 w-3 text-gold" /> Map
          </div>
        </div>

        {labels.length > 0 && (
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {labels.map((l) => (
              <div key={l.key}>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{l.key}</dt>
                <dd className="mt-0.5 text-xs font-medium text-navy">{l.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </TravelPanel>
    </motion.div>
  );
}
