"use client";

import { motion } from "framer-motion";
import {
  Plane, MapPin, Clock, User, Phone, Download,
  AlertCircle, Shield, Luggage, FileText, Navigation,
} from "lucide-react";
import TravelHero from "@/components/portal/travel/TravelHero";
import TravelStatusBadge from "@/components/portal/travel/TravelStatusBadge";
import ModuleNavCard from "@/components/portal/travel/ModuleNavCard";
import LiaisonMapSection from "@/components/portal/travel/LiaisonMapSection";
import QuickActionsBar from "@/components/portal/travel/QuickActionsBar";
import { TravelPanel, TravelSectionLabel } from "@/components/portal/travel/TravelPanel";
import { getArrivalData, ARRIVAL_STATUS_CONFIG, PICKUP_STATUS_CONFIG, formatTime } from "@/services/travel";

const INSTRUCTION_ICONS: Record<string, typeof Shield> = {
  shield: Shield, luggage: Luggage, file: FileText,
  "map-pin": MapPin, phone: Phone,
};

export default function ArrivalPage() {
  const data = getArrivalData();
  const statusCfg = ARRIVAL_STATUS_CONFIG[data.status] ?? ARRIVAL_STATUS_CONFIG.pending;
  const pickupCfg = PICKUP_STATUS_CONFIG[data.pickup.status] ?? PICKUP_STATUS_CONFIG.pending;

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
        eyebrow="Travel & Stay · Arrival"
        title="Arrival &"
        titleAccent="Departure"
        subtitle={`${data.delegate.name} · ${data.delegate.category}`}
        statusBadge={
          <TravelStatusBadge
            dot={statusCfg.dot}
            label={statusCfg.label}
            badge={statusCfg.badge}
            pulse={data.status === "pending"}
          />
        }
        meta={[
          { icon: Plane, text: `${data.arrival.flight_number} · ${data.arrival.date}` },
          { icon: MapPin, text: data.arrival.airport },
        ]}
        rightCard={
          <div className="rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">Next Pickup</p>
            <p className="mt-2 text-sm font-bold text-white">{data.pickup.vehicle_type}</p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
              <Clock className="h-3.5 w-3.5 text-gold/80" />
              {data.pickup.pickup_time} · {data.pickup.date}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/65">
              <MapPin className="h-3.5 w-3.5 text-gold/80" />
              {data.pickup.meeting_point}
            </p>
            <div className="mt-3">
              <TravelStatusBadge
                dot={pickupCfg.dot}
                label={pickupCfg.label}
                badge="bg-white/10 text-white border-white/20"
                size="sm"
              />
            </div>
          </div>
        }
      />

      {/* ── QUICK ACTIONS ─────────────────────────────────────── */}
      <QuickActionsBar
        delay={0.05}
        actions={[
          { icon: Phone, label: `Call Driver (${data.pickup.driver_name})`, href: `tel:${data.pickup.driver_phone.replace(/\s/g, "")}`, variant: "primary" },
          { icon: Phone, label: "Call Liaison Officer", href: `tel:${data.liaison_officer.phone.replace(/\s/g, "")}` },
          { icon: Navigation, label: "Airport Map", onClick: () => { const main = document.querySelector("main"); const el = document.getElementById("airport-map"); if (main && el) { main.scrollTo({ top: el.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 24, behavior: "smooth" }); } } },
          { icon: Download, label: "Arrival Guide" },
          { icon: AlertCircle, label: "Emergency", href: `tel:${data.emergency_contacts[0].number.replace(/\s/g, "")}`, variant: "danger" },
        ]}
      />

      {/* ── ARRIVAL FLIGHT ─────────────────────────────────────── */}
      <TravelSectionLabel>Arrival Flight Details</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <TravelPanel className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-50 blur-2xl opacity-60" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
            {/* Airline logo placeholder */}
            <div className="flex shrink-0 items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy text-xl font-black text-gold shadow">
                {data.arrival.airline_code}
              </div>
              <div>
                <p className="font-bold text-navy">{data.arrival.airline}</p>
                <p className="font-mono text-lg font-bold text-gold">{data.arrival.flight_number}</p>
                <TravelStatusBadge dot="bg-emerald-500" label="Confirmed" badge="bg-emerald-50 text-emerald-700 border-emerald-200" size="sm" />
              </div>
            </div>

            {/* Route */}
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate/50">Origin</p>
                <p className="text-lg font-bold text-navy">{data.arrival.origin?.split("(")[1]?.replace(")", "") || "LHR"}</p>
                <p className="text-xs text-slate/65">{data.arrival.origin?.split("(")[0]?.trim()}</p>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="h-px flex-1 bg-gray-200" />
                <Plane className="h-5 w-5 shrink-0 rotate-90 text-gold sm:rotate-0" />
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate/50">Chennai</p>
                <p className="text-lg font-bold text-navy">MAA</p>
                <p className="text-xs text-slate/65">{data.arrival.airport.split("(")[0]?.trim()}</p>
              </div>
            </div>

            {/* Details grid */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 shrink-0">
              {[
                { label: "Date", value: data.arrival.date },
                { label: "Arrival", value: formatTime(data.arrival.arrival_time ?? "06:45") },
                { label: "Terminal", value: data.arrival.terminal },
                { label: "Gate", value: data.arrival.gate },
                { label: "Seat", value: `${data.arrival.seat} · ${data.arrival.class}` },
                { label: "Booking Ref", value: data.arrival.booking_reference },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{f.label}</dt>
                  <dd className="mt-0.5 font-mono text-sm font-semibold text-navy">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── DEPARTURE FLIGHT ─────────────────────────────────── */}
      <TravelSectionLabel>Departure Flight</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <TravelPanel>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-sm font-black text-gold shadow">
                {data.departure.airline_code}
              </div>
              <div>
                <p className="font-bold text-navy">{data.departure.flight_number}</p>
                <p className="text-xs text-slate/60">{data.departure.airline}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
              {[
                { label: "Date", value: data.departure.date },
                { label: "Departure", value: formatTime(data.departure.departure_time ?? "23:10") },
                { label: "Terminal", value: data.departure.terminal },
                { label: "Destination", value: data.departure.destination?.split("(")[1]?.replace(")", "") || "LHR" },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{f.label}</dt>
                  <dd className="mt-0.5 font-mono text-xs font-semibold text-navy">{f.value}</dd>
                </div>
              ))}
            </dl>
            <TravelStatusBadge dot="bg-emerald-500" label="Confirmed" badge="bg-emerald-50 text-emerald-700 border-emerald-200" size="sm" />
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── PICKUP ARRANGEMENT ───────────────────────────────── */}
      <TravelSectionLabel>Pickup Arrangement</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
        <TravelPanel className="relative overflow-hidden border-gold/20 bg-linear-to-br from-white to-gold/5">
          <div aria-hidden="true" className="absolute right-0 top-0 h-40 w-40 rounded-full bg-gold/8 blur-3xl" />
          <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-bold text-navy">Vehicle & Driver</p>
                <TravelStatusBadge dot={pickupCfg.dot} label={pickupCfg.label} badge={pickupCfg.badge} size="sm" />
              </div>
              <dl className="space-y-3">
                {[
                  { label: "Vehicle", value: data.pickup.vehicle_type },
                  { label: "Registration", value: data.pickup.vehicle_number },
                  { label: "Driver", value: data.pickup.driver_name },
                  { label: "Driver Mobile", value: data.pickup.driver_phone },
                  { label: "Nameplate", value: data.pickup.nameplate },
                ].map((f) => (
                  <div key={f.label} className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 last:border-0">
                    <dt className="text-xs text-slate/55 shrink-0">{f.label}</dt>
                    <dd className="text-right text-xs font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={`tel:${data.pickup.driver_phone.replace(/\s/g, "")}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <Phone className="h-4 w-4" />
                Call {data.pickup.driver_name}
              </a>
            </div>
            <div>
              <p className="mb-4 text-sm font-bold text-navy">Pickup Details</p>
              <dl className="space-y-3">
                {[
                  { label: "Date & Time", value: `${data.pickup.date} · ${data.pickup.pickup_time}` },
                  { label: "Meeting Point", value: data.pickup.meeting_point },
                  { label: "Travel Time", value: data.pickup.estimated_travel_time },
                  { label: "Destination", value: data.pickup.destination },
                ].map((f) => (
                  <div key={f.label} className="flex items-start justify-between gap-3 border-b border-gray-50 pb-3 last:border-0">
                    <dt className="text-xs text-slate/55 shrink-0">{f.label}</dt>
                    <dd className="text-right text-xs font-semibold text-navy">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── LIAISON OFFICER + MAP ─────────────────────────────── */}
      <LiaisonMapSection
        liaison={data.liaison_officer}
        airportMap={data.airport_map}
      />

      {/* ── ARRIVAL INSTRUCTIONS ─────────────────────────────── */}
      <TravelSectionLabel>Arrival Instructions</TravelSectionLabel>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
        <TravelPanel>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.instructions.map((item, i) => {
              const Icon = INSTRUCTION_ICONS[item.icon] ?? Shield;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-navy">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate/65">{item.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── EMERGENCY CONTACTS ───────────────────────────────── */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
        <TravelPanel className="border-red-100 bg-red-50/40">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-700">Emergency Contacts</p>
          <div className="flex flex-wrap gap-2">
            {data.emergency_contacts.map((c) => (
              <a
                key={c.label}
                href={`tel:${c.number.replace(/\s/g, "")}`}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-800 transition-colors hover:bg-red-50"
              >
                <Phone className="h-3.5 w-3.5" />
                {c.label} · {c.number}
              </a>
            ))}
          </div>
        </TravelPanel>
      </motion.div>

      {/* ── MODULE NAV ───────────────────────────────────────── */}
      <ModuleNavCard
        direction="next"
        label="Accommodation"
        href="/portal/travel/accommodation"
        description="View your hotel and room details"
        delay={0.24}
      />
    </div>
  );
}
