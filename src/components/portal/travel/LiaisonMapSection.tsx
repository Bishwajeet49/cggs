"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, ExternalLink, Navigation } from "lucide-react";
import { TravelPanel, TravelSectionLabel } from "./TravelPanel";
import type { LiaisonOfficer, AirportMap } from "@/types/travel";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Chennai+International+Airport/@12.9941,80.1683,15z/data=!4m6!3m5!1s0x3a525d17f1da8a0b:0xb8f1e77cec1ef3e1!8m2!3d12.9902!4d80.1693!16s%2Fg%2F11bwlx85f5";

const OSM_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=80.140%2C12.974%2C80.202%2C13.014&layer=mapnik&marker=12.994%2C80.171";

interface LiaisonMapSectionProps {
  liaison: LiaisonOfficer;
  airportMap: AirportMap;
}

export default function LiaisonMapSection({ liaison, airportMap }: LiaisonMapSectionProps) {
  const initials = liaison.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const mapLabels = [
    { key: "Arrival Gate", value: airportMap.arrival_gate },
    { key: "CGGS Welcome Desk", value: airportMap.cggs_desk },
    { key: "Baggage", value: airportMap.baggage },
    { key: "Pickup Zone", value: airportMap.pickup_zone },
  ];

  return (
    <motion.div
      id="airport-map"
      className="scroll-mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.14 }}
    >
      <TravelSectionLabel>Liaison Officer &amp; Airport Map</TravelSectionLabel>

      <TravelPanel className="overflow-hidden p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-stretch lg:divide-x lg:divide-gray-100">
          {/* Liaison officer */}
          <div className="flex flex-col p-5 sm:p-6">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
              Assigned Liaison Officer
            </p>

            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-lg font-bold text-white shadow-md">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-navy">{liaison.name}</p>
                <p className="text-xs font-medium text-gold">{liaison.rank}</p>
                <p className="mt-0.5 text-xs text-slate/60">{liaison.unit}</p>
                <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  {liaison.availability}
                </span>
              </div>
            </div>

            <dl className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Assigned Country</dt>
                <dd className="mt-0.5 text-xs font-medium text-navy">{liaison.assigned_country}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Contact</dt>
                <dd className="mt-0.5 font-mono text-xs font-medium text-navy">{liaison.phone}</dd>
              </div>
            </dl>

            <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
              <a
                href={`tel:${liaison.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Phone className="h-3.5 w-3.5" />
                Call
              </a>
              <a
                href={`https://wa.me/${liaison.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${liaison.email}`}
                className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-navy transition-colors hover:border-gold/30 hover:bg-gold/5"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{liaison.email}</span>
              </a>
            </div>
          </div>

          {/* Airport map */}
          <div className="flex flex-col border-t border-gray-100 lg:border-t-0">
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
                className="h-44 w-full border-0 sm:h-48"
                style={{ pointerEvents: "none" }}
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy/0 transition-colors duration-200 group-hover:bg-navy/15">
                <span className="scale-90 rounded-xl border border-white/30 bg-navy/80 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                  <Navigation className="mr-1.5 inline h-3.5 w-3.5 text-gold" />
                  Open Full Map in Google Maps
                </span>
              </div>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-navy shadow-md transition-opacity group-hover:opacity-0">
                <Navigation className="h-3 w-3 text-gold" />
                Tap to open
              </div>
            </a>

            <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-gray-100 px-5 py-3.5">
              {mapLabels.map((l) => (
                <div key={l.key}>
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{l.key}</dt>
                  <dd className="mt-0.5 text-xs font-medium leading-snug text-navy">{l.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </TravelPanel>
    </motion.div>
  );
}
