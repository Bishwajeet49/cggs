"use client";

import { motion } from "framer-motion";
import {
  Hotel, MapPin, Wifi, Dumbbell, Waves, Briefcase,
  ShoppingBag, Stethoscope, Headphones, Sparkles,
  Phone, Mail, Star, Clock, UtensilsCrossed, Calendar,
  Shirt, Download, Navigation, Map,
} from "lucide-react";
import TravelHero from "@/components/portal/travel/TravelHero";
import TravelStatusBadge from "@/components/portal/travel/TravelStatusBadge";
import ContactCard from "@/components/portal/travel/ContactCard";
import ModuleNavCard from "@/components/portal/travel/ModuleNavCard";
import MockMapCard from "@/components/portal/travel/MockMapCard";
import QuickActionsBar from "@/components/portal/travel/QuickActionsBar";
import { TravelPanel, TravelSectionLabel } from "@/components/portal/travel/TravelPanel";
import { getAccommodationData, ACCOMMODATION_STATUS_CONFIG } from "@/services/travel";

const AMENITY_ICONS: Record<string, typeof Hotel> = {
  wifi: Wifi, gym: Dumbbell, pool: Waves, business: Briefcase,
  laundry: ShoppingBag, medical: Stethoscope, concierge: Headphones, spa: Sparkles,
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-gold text-gold" : "text-gray-200"}`}
        />
      ))}
    </div>
  );
}

export default function AccommodationPage() {
  const data = getAccommodationData();
  const statusCfg = ACCOMMODATION_STATUS_CONFIG[data.status] ?? ACCOMMODATION_STATUS_CONFIG.pending;

  return (
    <div className="relative space-y-5 sm:space-y-6">
      {/* Watermark */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="pointer-events-none fixed bottom-0 right-0 h-[480px] w-[480px] select-none opacity-[0.028]" fill="none" stroke="#0D2154" strokeWidth="0.7">
        <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="48" /><line x1="100" y1="8" x2="100" y2="192" />
        <line x1="8" y1="100" x2="192" y2="100" />
      </svg>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <TravelHero
        eyebrow="Travel & Stay · Accommodation"
        title="Hotel"
        titleAccent="& Stay"
        subtitle={`${data.hotel.name} · ${data.room.room_type}`}
        statusBadge={
          <TravelStatusBadge dot={statusCfg.dot} label={statusCfg.label} badge={statusCfg.badge} />
        }
        meta={[
          { icon: Hotel, text: data.hotel.name },
          { icon: Calendar, text: `${data.room.check_in} → ${data.room.check_out}` },
          { icon: MapPin, text: data.hotel.distance_to_venue },
        ]}
        rightCard={
          <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">Your Room</p>
            <p className="mt-2 text-2xl font-black text-white">#{data.room.room_number}</p>
            <p className="text-xs text-white/65">{data.room.floor}</p>
            <p className="mt-2 text-xs text-white/55">{data.room.room_type}</p>
            <div className="mt-3 space-y-1 border-t border-white/10 pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/45">Check-in</span>
                <span className="font-semibold text-white">{data.room.check_in} · {data.room.check_in_time}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/45">Check-out</span>
                <span className="font-semibold text-white">{data.room.check_out} · {data.room.check_out_time}</span>
              </div>
            </div>
          </div>
        }
      />

      {/* ── QUICK ACTIONS ─────────────────────────────────────── */}
      <QuickActionsBar
        delay={0.05}
        actions={[
          { icon: Map, label: "Hotel Map", onClick: () => {} },
          { icon: Phone, label: "Call Reception", href: `tel:${data.poc.reception.replace(/\s/g, "")}`, variant: "primary" },
          { icon: UtensilsCrossed, label: "Room Service", onClick: () => {} },
          { icon: Navigation, label: "Navigate to Venue", href: data.location.google_maps_url },
          { icon: Download, label: "Hotel Guide" },
        ]}
      />

      {/* ── HOTEL CARD ───────────────────────────────────────── */}
      <TravelSectionLabel>Hotel Information</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <TravelPanel className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/8 blur-3xl" />
          <div className="relative flex flex-col gap-5 lg:flex-row">
            {/* Hotel image placeholder */}
            <div className="flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-navy to-navy-dark lg:h-auto lg:w-48">
              <div className="text-center">
                <Hotel className="mx-auto h-10 w-10 text-gold/60" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">ITC Grand Chola</p>
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-navy">{data.hotel.name}</h2>
                  <StarRating rating={data.hotel.rating} />
                </div>
                <TravelStatusBadge dot={statusCfg.dot} label={statusCfg.label} badge={statusCfg.badge} />
              </div>

              <p className="mt-2 flex items-start gap-1 text-sm text-slate/65">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                {data.hotel.address}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate/70">{data.hotel.description}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy/8 px-3 py-1.5 text-xs font-semibold text-navy">
                  <MapPin className="h-3 w-3 text-gold" />
                  {data.hotel.distance_to_venue}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-navy/8 px-3 py-1.5 text-xs font-semibold text-navy">
                  <Clock className="h-3 w-3 text-gold" />
                  {data.hotel.travel_time_to_venue}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <a href={`tel:${data.hotel.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-xs font-semibold text-white hover:opacity-90">
                  <Phone className="h-3.5 w-3.5" /> Call Hotel
                </a>
                <a href={`https://${data.hotel.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-navy hover:border-gold/30 hover:bg-gold/5">
                  Hotel Website
                </a>
              </div>
            </div>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── ROOM DETAILS ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <TravelSectionLabel>Room Details</TravelSectionLabel>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <TravelPanel className="h-full">
              <dl className="space-y-3">
                {[
                  { label: "Room Number", value: `#${data.room.room_number}`, highlight: true },
                  { label: "Floor", value: data.room.floor },
                  { label: "Room Type", value: data.room.room_type },
                  { label: "Wi-Fi Network", value: data.room.wifi_name, mono: true },
                  { label: "Wi-Fi Password", value: data.room.wifi_password, mono: true },
                  { label: "Breakfast", value: data.room.breakfast_included ? "Included" : "Not included" },
                  { label: "Check-in", value: `${data.room.check_in} · ${data.room.check_in_time}` },
                  { label: "Check-out", value: `${data.room.check_out} · ${data.room.check_out_time}` },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-4 border-b border-gray-50 pb-3 last:border-0">
                    <dt className="text-xs text-slate/55 shrink-0">{f.label}</dt>
                    <dd className={`text-right text-xs font-semibold ${f.highlight ? "text-gold" : "text-navy"} ${f.mono ? "font-mono" : ""}`}>
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
              {data.room.early_checkin_arranged && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-semibold text-emerald-700">
                    Early check-in arranged at {data.room.early_checkin_time}
                  </p>
                </div>
              )}
              {data.room.special_requests.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Special Requests</p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {data.room.special_requests.map((r) => (
                      <span key={r} className="rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-medium text-navy">{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </TravelPanel>
          </motion.div>
        </div>

        <div>
          <TravelSectionLabel>Location & Map</TravelSectionLabel>
          <MockMapCard
            title="Hotel & Venue"
            markers={[
              { label: "ITC Grand Chola", x: 32, y: 55, color: "bg-gold" },
              { label: "Summit Venue", x: 68, y: 30, color: "bg-navy" },
            ]}
            labels={[
              { key: "Hotel", value: data.hotel.name },
              { key: "Summit Venue", value: "Chennai Trade Centre" },
              { key: "Distance", value: data.hotel.distance_to_venue },
              { key: "Travel Time", value: data.hotel.travel_time_to_venue },
            ]}
            mapsUrl={data.location.google_maps_url}
            delay={0.12}
          />
          {data.location.landmarks.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }} className="mt-3">
              <TravelPanel className="py-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate/50">Nearby Landmarks</p>
                <ul className="space-y-1">
                  {data.location.landmarks.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-xs text-navy">
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      {l}
                    </li>
                  ))}
                </ul>
              </TravelPanel>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── HOTEL POC ────────────────────────────────────────── */}
      <TravelSectionLabel>Hotel Point of Contact</TravelSectionLabel>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ContactCard
          eyebrow="Guest Relations Manager"
          name={data.poc.name}
          role={data.poc.designation}
          phone={data.poc.phone}
          email={data.poc.email}
          initials={data.poc.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          badgeColor="bg-gold"
          delay={0.16}
        />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <TravelPanel className="h-full">
            <p className="mb-4 text-sm font-bold text-navy">Hotel Numbers</p>
            <div className="space-y-3">
              {[
                { label: "Main Reception", number: data.poc.reception, primary: true },
                { label: data.poc.helpdesk_label, number: data.poc.helpdesk, primary: false },
              ].map((c) => (
                <div key={c.label} className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 px-4 py-3">
                  <div>
                    <p className="text-xs text-slate/55">{c.label}</p>
                    <p className="font-mono text-sm font-bold text-navy">{c.number}</p>
                  </div>
                  <a
                    href={`tel:${c.number.replace(/\s/g, "")}`}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold ${
                      c.primary ? "bg-navy text-white" : "border border-gray-200 text-navy hover:bg-gray-50"
                    }`}
                  >
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                </div>
              ))}
            </div>
          </TravelPanel>
        </motion.div>
      </div>

      {/* ── MEALS ────────────────────────────────────────────── */}
      <TravelSectionLabel>Meal Schedule</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.meals.map((meal, i) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 + i * 0.04 }}
            >
              <TravelPanel className="flex flex-col gap-3 transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8">
                      <UtensilsCrossed className="h-4 w-4 text-navy" />
                    </span>
                    <p className="text-sm font-bold text-navy">{meal.type}</p>
                  </div>
                  {meal.included && (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Included
                    </span>
                  )}
                </div>
                <dl className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-slate/65">
                    <Clock className="h-3 w-3 text-gold/70" /> {meal.time}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate/65">
                    <MapPin className="h-3 w-3 text-gold/70" /> {meal.location}
                  </div>
                  <p className="text-xs leading-relaxed text-slate/75">{meal.menu}</p>
                  {meal.dress_code && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-navy">
                      <Shirt className="h-3 w-3 text-gold" /> {meal.dress_code}
                    </div>
                  )}
                </dl>
              </TravelPanel>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── AMENITIES ────────────────────────────────────────── */}
      <TravelSectionLabel>Hotel Amenities</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <TravelPanel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.amenities.map((amenity) => {
              const Icon = AMENITY_ICONS[amenity.id] ?? Sparkles;
              return (
                <div
                  key={amenity.id}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-3 ${
                    amenity.available
                      ? "border-gray-100 bg-gray-50/50"
                      : "border-gray-100 bg-gray-50/20 opacity-50"
                  }`}
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${amenity.available ? "bg-navy/8 text-navy" : "bg-gray-100 text-slate/40"}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-xs font-semibold text-navy">{amenity.label}</p>
                </div>
              );
            })}
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── MODULE NAV ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ModuleNavCard
          direction="prev"
          label="Arrival & Departure"
          href="/portal/travel/arrival"
          description="Flight details, pickup, liaison officer"
          delay={0.32}
        />
        <ModuleNavCard
          direction="next"
          label="Transport"
          href="/portal/travel/transport"
          description="Vehicle assignment and daily pickup schedule"
          delay={0.34}
        />
      </div>
    </div>
  );
}
