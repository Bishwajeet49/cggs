"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car, Phone, MapPin, Clock, Radio, CheckCircle2,
  Circle, AlertCircle, Anchor, Home, Star, Download,
  Share2, Navigation, Headphones, Building2, UtensilsCrossed,
} from "lucide-react";
import TravelHero from "@/components/portal/travel/TravelHero";
import TravelStatusBadge from "@/components/portal/travel/TravelStatusBadge";
import ModuleNavCard from "@/components/portal/travel/ModuleNavCard";
import MockMapCard from "@/components/portal/travel/MockMapCard";
import QuickActionsBar from "@/components/portal/travel/QuickActionsBar";
import { TravelPanel, TravelSectionLabel } from "@/components/portal/travel/TravelPanel";
import { getTransportData, VEHICLE_STATUS_CONFIG, TODAY_PICKUP_STATUS } from "@/services/travel";
import type { TripEntry } from "@/types/travel";

const TRIP_ICONS: Record<string, typeof Car> = {
  building: Building2,
  utensils: UtensilsCrossed,
  anchor: Anchor,
  hotel: Building2,
  star: Star,
  home: Home,
};

const TRIP_STATUS_STYLES: Record<string, string> = {
  upcoming: "border-l-gold bg-gold/5",
  in_progress: "border-l-blue-500 bg-blue-50/50",
  completed: "border-l-emerald-500 bg-emerald-50/30 opacity-70",
  pending: "border-l-gray-200 bg-gray-50/30",
};

// Mock live tracking — eta counts down every 30s
function useLiveEta(initial: number) {
  const [eta, setEta] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 30000);
    return () => clearInterval(interval);
  }, []);
  return eta;
}

export default function TransportPage() {
  const data = getTransportData();
  const vehicleCfg = VEHICLE_STATUS_CONFIG[data.status] ?? VEHICLE_STATUS_CONFIG.pending;
  const pickupStatus = TODAY_PICKUP_STATUS[data.today_pickup.status] ?? TODAY_PICKUP_STATUS.scheduled;
  const eta = useLiveEta(data.live_tracking.eta_minutes);

  const driverInitials = data.driver.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

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
        eyebrow="Travel & Stay · Transport"
        title="Delegate"
        titleAccent="Transport"
        subtitle={`${data.vehicle.type} · ${data.vehicle.number}`}
        statusBadge={
          <TravelStatusBadge dot={vehicleCfg.dot} label={vehicleCfg.label} badge={vehicleCfg.badge} />
        }
        meta={[
          { icon: Car, text: `${data.vehicle.type} · ${data.vehicle.color}` },
          { icon: Clock, text: `Pickup at ${data.today_pickup.pickup_time}` },
        ]}
        rightCard={
          <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">Today's Pickup</p>
            <p className="mt-2 text-lg font-black text-white">{data.today_pickup.pickup_time}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
              <MapPin className="h-3.5 w-3.5 text-gold/80 shrink-0" />
              {data.today_pickup.pickup_location}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
              <Navigation className="h-3.5 w-3.5 text-gold/80 shrink-0" />
              {data.today_pickup.drop_location}
            </p>
            <div className="mt-3">
              <TravelStatusBadge
                dot=""
                label={pickupStatus.label}
                badge="bg-white/10 text-white border-white/20"
                size="sm"
                pulse={data.today_pickup.status === "driver_en_route"}
              />
            </div>
          </div>
        }
      />

      {/* ── QUICK ACTIONS ─────────────────────────────────────── */}
      <QuickActionsBar
        delay={0.05}
        actions={[
          { icon: Phone, label: `Call ${data.driver.name}`, href: `tel:${data.driver.phone.replace(/\s/g, "")}`, variant: "primary" },
          { icon: Radio, label: "Track Vehicle", onClick: () => {} },
          { icon: Share2, label: "Share Location", onClick: () => {} },
          { icon: Download, label: "Download Route" },
          { icon: Headphones, label: "Transport Helpdesk", href: `tel:${data.emergency_transport.helpdesk.replace(/\s/g, "")}` },
        ]}
      />

      {/* ── VEHICLE CARD ─────────────────────────────────────── */}
      <TravelSectionLabel>Vehicle Assignment</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <TravelPanel className="relative overflow-hidden border-gold/15 bg-linear-to-br from-white to-gold/5">
          <div aria-hidden="true" className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/8 blur-3xl" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
            {/* Vehicle visual */}
            <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-navy/8 md:h-28 md:w-44">
              <div className="text-center">
                <Car className="mx-auto h-10 w-10 text-navy/50" />
                <p className="mt-1 font-mono text-[10px] font-bold tracking-widest text-navy/40">{data.vehicle.number}</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-bold text-navy">{data.vehicle.type}</h2>
                <TravelStatusBadge dot={vehicleCfg.dot} label={vehicleCfg.label} badge={vehicleCfg.badge} />
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                {[
                  { label: "Reg Number", value: data.vehicle.number },
                  { label: "Color", value: data.vehicle.color },
                  { label: "Capacity", value: `${data.vehicle.capacity} passengers` },
                  { label: "Air Conditioning", value: data.vehicle.ac ? "Yes" : "No" },
                ].map((f) => (
                  <div key={f.label}>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{f.label}</dt>
                    <dd className="mt-0.5 text-sm font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Driver mini card */}
            <div className="shrink-0 rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:w-48">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate/50">Driver</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-bold text-white">
                  {driverInitials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy">{data.driver.name}</p>
                  <p className="text-xs text-slate/55">{data.driver.experience_years} yrs exp.</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {data.driver.languages.map((l) => (
                  <span key={l} className="rounded-full bg-navy/8 px-1.5 py-0.5 text-[9px] font-semibold text-navy">{l}</span>
                ))}
              </div>
              <a
                href={`tel:${data.driver.phone.replace(/\s/g, "")}`}
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-navy py-1.5 text-xs font-semibold text-white"
              >
                <Phone className="h-3.5 w-3.5" /> Call Driver
              </a>
            </div>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── LIVE TRACKING ─────────────────────────────────────── */}
      <TravelSectionLabel>Live Tracking</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <TravelPanel className="relative overflow-hidden">
          <div className="flex flex-col gap-5 lg:flex-row">
            {/* Status panel */}
            <div className="shrink-0 lg:w-64">
              <div className="flex items-center gap-3">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <Car className="h-6 w-6 text-blue-700" />
                  {data.live_tracking.current_status === "en_route" && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                      <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500" />
                    </span>
                  )}
                </span>
                <div>
                  <p className="text-sm font-bold text-navy">Driver En Route</p>
                  <p className="text-xs text-slate/60">{data.live_tracking.current_location}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={eta}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-2xl font-black text-blue-700"
                    >
                      {eta}
                    </motion.p>
                  </AnimatePresence>
                  <p className="text-[10px] text-slate/50">min ETA</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 text-center">
                  <p className="text-2xl font-black text-navy">{data.live_tracking.distance_km}</p>
                  <p className="text-[10px] text-slate/50">km away</p>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-slate/40">
                Updated: {new Date(data.live_tracking.last_updated).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Mock tracking map */}
            <div className="flex-1">
              <MockMapCard
                title="Live Route"
                markers={[
                  { label: "Driver", x: 40, y: 45, color: "bg-blue-600" },
                  { label: "You", x: 65, y: 65, color: "bg-gold" },
                ]}
                delay={0}
              />
            </div>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── TODAY'S PICKUP ────────────────────────────────────── */}
      <TravelSectionLabel>Today's Pickup</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <TravelPanel className={`border-l-4 ${pickupStatus.color.includes("blue") ? "border-l-blue-400" : pickupStatus.color.includes("emerald") ? "border-l-emerald-400" : "border-l-gold"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{data.today_pickup.date}</p>
              <p className="mt-1 text-2xl font-black text-navy">{data.today_pickup.pickup_time}</p>
              <span className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${pickupStatus.color}`}>
                {pickupStatus.pulse && <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
                {pickupStatus.label}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate/50">Est. Arrival</p>
              <p className="text-lg font-bold text-navy">{data.today_pickup.estimated_arrival}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] text-slate/50">Pickup From</p>
                <p className="text-sm font-semibold text-navy">{data.today_pickup.pickup_location}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-3">
              <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="text-[10px] text-slate/50">Drop At</p>
                <p className="text-sm font-semibold text-navy">{data.today_pickup.drop_location}</p>
              </div>
            </div>
          </div>
          {data.today_pickup.notes && (
            <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
              📋 {data.today_pickup.notes}
            </p>
          )}
        </TravelPanel>
      </motion.div>

      {/* ── VEHICLE TIMELINE ─────────────────────────────────── */}
      <TravelSectionLabel>Today's Trip Schedule</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
        <TravelPanel>
          <ol className="relative space-y-0">
            {data.schedule.map((trip: TripEntry, i: number) => {
              const isLast = i === data.schedule.length - 1;
              const Icon = TRIP_ICONS[trip.icon] ?? Car;
              const isCompleted = trip.status === "completed";
              const isUpcoming = trip.status === "upcoming";
              const isActive = trip.status === "in_progress";
              const statusStyle = TRIP_STATUS_STYLES[trip.status] ?? TRIP_STATUS_STYLES.pending;

              return (
                <motion.li
                  key={trip.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.16 + i * 0.04 }}
                  className="relative flex gap-4 pb-5 last:pb-0"
                >
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${isCompleted ? "bg-emerald-300" : "bg-gray-100"}`}
                    />
                  )}
                  <div className="relative z-1 shrink-0">
                    {isCompleted ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                    ) : isActive ? (
                      <span className="relative flex h-8 w-8">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-60" />
                        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                          <Car className="h-4 w-4 text-white" />
                        </span>
                      </span>
                    ) : isUpcoming ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-gold/15">
                        <Icon className="h-3.5 w-3.5 text-gold" />
                      </span>
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                        <Circle className="h-3 w-3 text-gray-200" />
                      </span>
                    )}
                  </div>

                  <div className={`min-w-0 flex-1 rounded-xl border-l-2 px-4 py-3 ${statusStyle}`}>
                    <div className="flex flex-wrap items-start justify-between gap-1">
                      <p className={`text-sm font-bold ${isCompleted ? "text-slate/55" : "text-navy"}`}>{trip.label}</p>
                      <span className="font-mono text-xs font-bold text-slate/50">{trip.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate/55">{trip.from} → {trip.to}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </TravelPanel>
      </motion.div>

      {/* ── DRIVER DETAILS ───────────────────────────────────── */}
      <TravelSectionLabel>Driver Information</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
        <TravelPanel>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-navy text-xl font-black text-white shadow-md">
              {driverInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold text-navy">{data.driver.name}</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {data.driver.languages.map((l) => (
                  <span key={l} className="rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-semibold text-navy">{l}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Experience</p>
                  <p className="mt-0.5 text-sm font-semibold text-navy">{data.driver.experience_years} years</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Emergency</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-navy">{data.driver.emergency_contact}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 sm:flex-col">
              <a href={`tel:${data.driver.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white">
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a href={`tel:${data.driver.emergency_contact.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-800">
                <AlertCircle className="h-3.5 w-3.5" /> Emergency
              </a>
            </div>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── EMERGENCY TRANSPORT ──────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <TravelPanel className="border-red-100 bg-linear-to-br from-red-50/40 to-white">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-700">Emergency Transport</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "Emergency Vehicle", number: data.emergency_transport.number, primary: true },
              { label: "Medical Transport", number: data.emergency_transport.medical_number, primary: false },
              { label: "Transport Helpdesk", number: data.emergency_transport.helpdesk, primary: false },
            ].map((c) => (
              <a
                key={c.label}
                href={`tel:${c.number.replace(/\s/g, "")}`}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                  c.primary
                    ? "border-red-300 bg-red-600 text-white hover:bg-red-700"
                    : "border-red-200 bg-white text-red-800 hover:bg-red-50"
                }`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold opacity-70">{c.label}</p>
                  <p className="font-mono text-sm font-bold">{c.number}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-slate/45">
            Available {data.emergency_transport.available} · Response time {data.emergency_transport.response_time}
          </p>
        </TravelPanel>
      </motion.div>

      {/* ── MODULE NAV ───────────────────────────────────────── */}
      <ModuleNavCard
        direction="prev"
        label="Accommodation"
        href="/portal/travel/accommodation"
        description="Hotel, room details, and meal schedule"
        delay={0.32}
      />
    </div>
  );
}
