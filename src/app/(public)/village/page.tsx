"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Cpu,
  Lightbulb,
  Coffee,
  Handshake,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  Building2,
  ArrowRight,
  Info,
  Tent,
  Camera,
} from "lucide-react";
import EventHero from "@/components/events/EventHero";
import EventCrossNav from "@/components/events/EventCrossNav";
import CTABanner from "@/components/events/CTABanner";
import AnimatedStats from "@/components/events/AnimatedStats";
import SectionHeader from "@/components/ui/SectionHeader";
import { getVillage, getVillageZones } from "@/services/village";
import type { VillageZone } from "@/types/village";

// ─── Icon Map ────────────────────────────────────────────────────────────────

const ZONE_ICONS: Record<string, React.ReactNode> = {
  Cultural: <Globe className="h-6 w-6" />,
  Technology: <Cpu className="h-6 w-6" />,
  Innovation: <Lightbulb className="h-6 w-6" />,
  Hospitality: <Coffee className="h-6 w-6" />,
  Partners: <Handshake className="h-6 w-6" />,
};

// ─── Zone Card ───────────────────────────────────────────────────────────────

function ZoneCard({ zone, onClick }: { zone: VillageZone; onClick: () => void }) {
  const Icon = ZONE_ICONS[zone.short_name] ?? <Tent className="h-6 w-6" />;

  return (
    <motion.button
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group w-full text-left rounded-sm overflow-hidden border border-navy/10 bg-white shadow-sm hover:shadow-lg hover:border-gold/40 transition-all"
    >
      {/* Zone Header */}
      <div
        className="px-5 pt-5 pb-4 relative"
        style={{ background: `linear-gradient(135deg, ${zone.color}, ${zone.color}cc)` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="h-10 w-10 rounded-sm bg-white/15 flex items-center justify-center text-white">
            {Icon}
          </div>
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ background: zone.accent + "40", color: zone.accent }}
          >
            {zone.exhibitors.length} Exhibitors
          </span>
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-white/90 transition-colors">
          {zone.name}
        </h3>
        <p className="text-[11px] text-white/60 mt-0.5">{zone.location}</p>
      </div>

      {/* Zone Body */}
      <div className="p-5">
        <p className="text-xs text-slate leading-relaxed line-clamp-3">{zone.description}</p>

        <div className="mt-4 space-y-1.5">
          {zone.highlights.slice(0, 3).map((h) => (
            <div key={h} className="flex items-start gap-2 text-xs text-slate">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span className="line-clamp-1">{h}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-navy group-hover:text-gold transition-colors">
          Explore Zone <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.button>
  );
}

// ─── Zone Detail Modal ───────────────────────────────────────────────────────

function ZoneModal({ zone, onClose }: { zone: VillageZone; onClose: () => void }) {
  const Icon = ZONE_ICONS[zone.short_name] ?? <Tent className="h-6 w-6" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div
          className="px-6 py-5 relative"
          style={{ background: `linear-gradient(135deg, ${zone.color}, ${zone.color}cc)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="h-10 w-10 rounded-sm bg-white/15 flex items-center justify-center text-white mb-3">
            {Icon}
          </div>
          <h2 className="text-xl font-bold text-white">{zone.name}</h2>
          <p className="text-sm text-white/60 mt-1">{zone.location}</p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <p className="text-sm text-slate leading-relaxed">{zone.description}</p>

          {/* Highlights */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">Highlights</p>
            <div className="space-y-1.5">
              {zone.highlights.map((h) => (
                <div key={h} className="flex items-start gap-2 text-xs text-slate">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">Zone Schedule</p>
            <div className="space-y-2">
              {zone.schedule.map((item, i) => (
                <div key={i} className="rounded-sm bg-cream p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-navy">Day {item.day}</span>
                    <span className="text-[10px] text-gold">· {item.time}</span>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">{item.activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Exhibitors */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">Key Exhibitors</p>
            <div className="grid grid-cols-2 gap-2">
              {zone.exhibitors.map((ex) => (
                <div key={ex.name} className="rounded-sm border border-navy/10 bg-cream p-2">
                  <p className="text-xs font-semibold text-navy line-clamp-1">{ex.name}</p>
                  <p className="text-[10px] text-slate mt-0.5">{ex.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={onClose}
            className="w-full rounded-sm bg-navy py-2.5 text-sm font-semibold text-white hover:bg-navy-mid transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function VillagePage() {
  const village = getVillage();
  const zones = getVillageZones();

  const [selectedZone, setSelectedZone] = useState<VillageZone | null>(null);

  const statItems = [
    { value: village.statistics.total_area_sqm, label: "sqm Area", suffix: "+" },
    { value: village.statistics.exhibitors, label: "Exhibitors" },
    { value: village.statistics.participating_nations, label: "Nations" },
    { value: village.statistics.zones, label: "Themed Zones" },
    { value: village.statistics.cultural_performances, label: "Performances" },
    { value: village.statistics.expected_footfall, label: "Visitors", suffix: "+" },
  ];

  return (
    <>
      <EventHero
        badge="CGGS 2027"
        title="Exhibition Village"
        subtitle={village.tagline}
        breadcrumbs={[{ label: "Events" }, { label: "Exhibition Village" }]}
        backgroundClass="gradient-navy"
        ctaLabel="Explore Zones"
        ctaHref="#zones"
        secondaryCtaLabel="Visitor Info"
        secondaryCtaHref="#visitor-info"
      >
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Clock, text: village.dates },
            { icon: MapPin, text: village.location },
            { icon: Users, text: `${village.statistics.expected_footfall.toLocaleString()}+ expected visitors` },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70"
            >
              <Icon className="h-3.5 w-3.5 text-gold" />
              {text}
            </div>
          ))}
        </div>
      </EventHero>

      {/* Stats */}
      <AnimatedStats stats={statItems} dark />

      {/* About */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <SectionHeader
                eyebrow="About the Village"
                title="Where Nations Connect"
                subtitle={village.about}
              />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-sm bg-cream border border-navy/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1">Dates</p>
                  <p className="text-sm font-semibold text-navy">{village.dates}</p>
                </div>
                <div className="rounded-sm bg-cream border border-navy/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1">Daily Timings</p>
                  <p className="text-sm font-semibold text-navy">{village.timings}</p>
                </div>
                <div className="rounded-sm bg-cream border border-navy/10 p-4 col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1">Location</p>
                  <p className="text-sm font-semibold text-navy">{village.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 grid grid-cols-2 gap-3"
            >
              {zones.slice(0, 4).map((zone) => {
                const Icon = ZONE_ICONS[zone.short_name] ?? <Tent className="h-5 w-5" />;
                return (
                  <div
                    key={zone.zone_id}
                    className="rounded-sm p-4 text-center text-white"
                    style={{ background: zone.color }}
                  >
                    <div className="mx-auto mb-2 h-8 w-8 rounded-sm bg-white/15 flex items-center justify-center">
                      {Icon}
                    </div>
                    <p className="text-xs font-bold">{zone.short_name}</p>
                    <p className="text-[10px] text-white/70 mt-0.5">{zone.exhibitors.length} exhibitors</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section id="zones" className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Village Zones"
              title="Five Themed Experiences"
              subtitle={`${village.statistics.total_area_sqm.toLocaleString()} sqm of curated spaces — each zone offers a distinct, immersive experience.`}
            />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.zone_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <ZoneCard zone={zone} onClick={() => setSelectedZone(zone)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Village Schedule Overview */}
      <section className="py-16 gradient-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Village Programme
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Three Days of Discovery</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((day) => {
              const allEvents = zones.flatMap((z) =>
                z.schedule.filter((s) => s.day === day).map((s) => ({
                  ...s,
                  zone: z.short_name,
                  color: z.color,
                }))
              );
              return (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: day * 0.1 }}
                  className="rounded-sm border border-white/10 bg-white/5 overflow-hidden"
                >
                  <div className="px-5 py-4 border-b border-white/10 bg-white/5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold">Day {day}</p>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {["15 February 2027", "16 February 2027", "17 February 2027"][day - 1]}
                    </p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {day === 1 ? "16:00–20:00 (public from 16:00)" : "10:00–20:00"}
                    </p>
                  </div>
                  <div className="p-4 space-y-3">
                    {allEvents.slice(0, 4).map((event, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div
                          className="mt-1 h-2 w-2 rounded-full shrink-0"
                          style={{ background: event.color }}
                        />
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-0.5">
                            {event.zone} · {event.time}
                          </p>
                          <p className="text-xs text-white/75 leading-relaxed line-clamp-2">
                            {event.activity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Exhibitors Highlight */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Exhibitors"
              title={`${village.statistics.exhibitors} Exhibitors Across All Zones`}
              subtitle="From national government pavilions and defence technology leaders to ocean tech startups and cultural performers."
            />
          </motion.div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {zones.flatMap((z) =>
              z.exhibitors.map((ex) => ({
                ...ex,
                zoneColor: z.color,
                zoneName: z.short_name,
              }))
            ).slice(0, 24).map((ex, i) => (
              <motion.div
                key={`${ex.name}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.025 }}
                className="rounded-sm border border-navy/10 bg-cream p-3 hover:border-gold/30 hover:shadow-sm transition-all"
              >
                <div
                  className="h-1 w-6 rounded-full mb-2"
                  style={{ background: ex.zoneColor }}
                />
                <p className="text-[11px] font-semibold text-navy line-clamp-2 leading-snug">
                  {ex.name}
                </p>
                <p className="text-[10px] text-slate mt-0.5">{ex.country}</p>
                <p
                  className="text-[9px] font-medium uppercase tracking-wide mt-1"
                  style={{ color: ex.zoneColor }}
                >
                  {ex.zoneName}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visitor Information */}
      <section id="visitor-info" className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Plan Your Visit"
              title="Visitor Information"
              subtitle="Everything you need to know to make the most of the CGGS 2027 Exhibition Village."
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Info,
                title: "Entry",
                text: village.visitor_information.entry,
              },
              {
                icon: MapPin,
                title: "Transport",
                text: village.visitor_information.transport,
              },
              {
                icon: Building2,
                title: "Parking",
                text: village.visitor_information.parking,
              },
              {
                icon: Coffee,
                title: "Food & Dining",
                text: village.visitor_information.food,
              },
              {
                icon: CheckCircle2,
                title: "Accessibility",
                text: village.visitor_information.accessibility,
              },
              {
                icon: Camera,
                title: "Photography",
                text: village.visitor_information.photography,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-sm border border-navy/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-sm bg-gold/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-gold" />
                    </div>
                    <p className="text-sm font-bold text-navy">{item.title}</p>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Facilities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 rounded-sm border border-navy/10 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-bold text-navy mb-3">On-Site Facilities</p>
            <div className="flex flex-wrap gap-3">
              {village.visitor_information.facilities.map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-1.5 rounded-full bg-cream border border-navy/10 px-3 py-1.5 text-xs text-slate"
                >
                  <CheckCircle2 className="h-3 w-3 text-gold" />
                  {f}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Access Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-4 rounded-sm border border-gold/30 bg-gold/5 p-5"
          >
            <p className="text-sm font-bold text-navy mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold" /> Public Access Hours
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { label: "Day 1 (15 Feb)", time: village.public_access_hours.day1 },
                { label: "Day 2 (16 Feb)", time: village.public_access_hours.day2 },
                { label: "Day 3 (17 Feb)", time: village.public_access_hours.day3 },
              ].map((d) => (
                <div key={d.label} className="rounded-sm bg-white border border-navy/10 p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-0.5">{d.label}</p>
                  <p className="text-sm font-semibold text-navy">{d.time}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate">
              <span className="font-medium text-navy">Delegate access: </span>
              {village.delegate_access_hours}
            </p>
          </motion.div>
        </div>
      </section>

      <EventCrossNav currentHref="/village" title="Explore Other CGGS 2027 Events" />

      <CTABanner
        eyebrow="Open to All"
        title="Visit the CGGS 2027 Exhibition Village"
        subtitle="Join thousands of visitors for three days of culture, technology, and maritime innovation in Chennai."
        primaryLabel="Register Now"
        primaryHref="/register"
        secondaryLabel="View Full Schedule"
        secondaryHref="/schedule"
      />

      {/* Zone Detail Modal */}
      <AnimatePresence>
        {selectedZone && (
          <ZoneModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
