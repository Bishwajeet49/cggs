"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ship,
  Users,
  Globe,
  Award,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Anchor,
  Wind,
  Navigation,
  Gauge,
} from "lucide-react";
import EventHero from "@/components/events/EventHero";
import EventCrossNav from "@/components/events/EventCrossNav";
import CTABanner from "@/components/events/CTABanner";
import AnimatedStats from "@/components/events/AnimatedStats";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  getFleetReview,
  getShips,
  getParticipatingNations,
} from "@/services/fleetReview";
import type { Ship as ShipType } from "@/types/fleet-review";

// ─── Ship Card ───────────────────────────────────────────────────────────────

function ShipCard({ ship, onClick }: { ship: ShipType; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`group text-left w-full rounded-sm border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all ${
        ship.highlight ? "border-gold" : "border-navy/10 hover:border-gold/40"
      }`}
    >
      {/* Card Header */}
      <div className="gradient-navy p-4 relative">
        {ship.highlight && (
          <span className="absolute top-3 right-3 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
            Flagship
          </span>
        )}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
            <Ship className="h-4 w-4 text-gold" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold/80">
              {ship.country}
            </p>
          </div>
        </div>
        <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors leading-tight">
          {ship.name}
        </h3>
        <p className="text-xs text-white/60 mt-0.5">{ship.class}</p>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          {[
            { icon: Gauge, label: "Type", value: ship.type },
            { icon: Users, label: "Crew", value: ship.crew.toString() },
            { icon: Navigation, label: "Length", value: `${ship.length_m}m` },
            { icon: Wind, label: "Displacement", value: `${ship.displacement_tonnes.toLocaleString()}t` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-sm bg-cream p-2">
              <div className="flex items-center gap-1 mb-0.5">
                <Icon className="h-3 w-3 text-gold" />
                <p className="text-[10px] text-slate uppercase tracking-wider">{label}</p>
              </div>
              <p className="text-xs font-semibold text-navy line-clamp-1">{value}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate leading-relaxed line-clamp-2">{ship.description}</p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-xs font-medium text-navy">{ship.role}</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─── Ship Detail Modal ───────────────────────────────────────────────────────

function ShipModal({ ship, onClose }: { ship: ShipType; onClose: () => void }) {
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
        <div className="gradient-navy px-6 py-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
          {ship.highlight && (
            <span className="inline-block mb-2 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
              Flagship Vessel
            </span>
          )}
          <h2 className="text-xl font-bold text-white">{ship.name}</h2>
          <p className="text-sm text-white/60 mt-1">
            {ship.class} · {ship.country}
          </p>
        </div>
        <div className="px-6 py-5 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Type", value: ship.type },
              { label: "Crew", value: `${ship.crew} personnel` },
              { label: "Length", value: `${ship.length_m} metres` },
              { label: "Displacement", value: `${ship.displacement_tonnes.toLocaleString()} tonnes` },
              { label: "Commissioned", value: ship.commissioned.toString() },
              { label: "Role", value: ship.role },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-sm bg-cream p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">{label}</p>
                <p className="text-sm font-semibold text-navy">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">About</p>
            <p className="text-sm text-slate leading-relaxed">{ship.description}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">Capabilities</p>
            <div className="flex flex-wrap gap-2">
              {ship.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="inline-flex items-center rounded-full bg-navy/8 px-3 py-1 text-xs font-medium text-navy"
                >
                  {cap}
                </span>
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

export default function FleetReviewPage() {
  const data = getFleetReview();
  const ships = getShips();
  const nations = getParticipatingNations();

  const [selectedShip, setSelectedShip] = useState<ShipType | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const stats = [
    { value: data.statistics.participating_nations, label: "Nations", suffix: "+" },
    { value: data.statistics.vessels, label: "Vessels" },
    { value: data.statistics.aircraft, label: "Aircraft" },
    { value: data.statistics.personnel, label: "Personnel", suffix: "+" },
    { value: data.statistics.observers, label: "Observers", suffix: "+" },
  ];

  const historyStats = data.history.map((h) => h);

  return (
    <>
      <EventHero
        badge="ICGFR 2027"
        title="International Coast Guard Fleet Review"
        subtitle={`${data.reviewing_authority} reviews ${data.statistics.vessels} vessels from ${data.statistics.participating_nations} nations off the coast of Chennai — the largest Fleet Review in the history of CGGS.`}
        breadcrumbs={[{ label: "Events" }, { label: "Fleet Review" }]}
        backgroundClass="gradient-navy"
        ctaLabel="View Programme"
        ctaHref="#programme"
        secondaryCtaLabel="See Ships"
        secondaryCtaHref="#ships"
      >
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Calendar, text: `17 February 2027` },
            { icon: MapPin, text: data.location },
            { icon: Award, text: data.reviewing_authority },
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

      {/* Statistics */}
      <AnimatedStats stats={stats} dark />

      {/* About */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                eyebrow="About ICGFR 2027"
                title="A Historic Maritime Spectacle"
                subtitle={data.about}
              />
              <div className="mt-6 rounded-sm bg-cream border-l-4 border-gold p-5">
                <p className="text-sm text-navy leading-relaxed font-medium">
                  {data.significance}
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {data.objectives.map((obj, i) => (
                <div
                  key={obj.title}
                  className="rounded-sm border border-navy/10 bg-white p-4 shadow-sm hover:border-gold/30 transition-colors"
                >
                  <div className="mb-2 h-8 w-8 rounded-sm bg-navy/5 flex items-center justify-center">
                    <Anchor className="h-4 w-4 text-gold" />
                  </div>
                  <p className="text-xs font-bold text-navy mb-1">{obj.title}</p>
                  <p className="text-xs text-slate leading-relaxed">{obj.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-16 gradient-navy overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Fleet Review History
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              A Legacy of Maritime Unity
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

            <div className="space-y-6">
              {data.history.map((entry, i) => (
                <motion.div
                  key={entry.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex gap-8 items-center ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 !== 0 ? "text-right hidden lg:block" : "hidden lg:block"}`} />

                  {/* Center dot */}
                  <div className="hidden lg:flex shrink-0 h-12 w-12 rounded-full bg-gold items-center justify-center border-4 border-navy-dark shadow-lg z-10">
                    <span className="text-[10px] font-bold text-navy">
                      {entry.year}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className={`rounded-sm border border-white/10 bg-white/5 p-5 hover:bg-white/8 transition-colors ${entry.year === 2027 ? "border-gold/40 bg-gold/5" : ""}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-bold uppercase tracking-wider ${entry.year === 2027 ? "text-gold" : "text-gold/70"}`}>
                          {entry.year}
                        </span>
                        {entry.year === 2027 && (
                          <span className="rounded-full bg-gold text-navy text-[9px] font-bold uppercase tracking-wide px-2 py-0.5">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-white mb-1">{entry.host}</p>
                      <p className="text-xs text-white/60 mb-2">
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {entry.location}
                      </p>
                      <div className="flex gap-4 mb-2 text-xs text-white/50">
                        <span><Ship className="h-3 w-3 inline mr-1" />{entry.ships} ships</span>
                        <span><Globe className="h-3 w-3 inline mr-1" />{entry.nations} nations</span>
                      </div>
                      <p className="text-xs text-white/55 leading-relaxed">{entry.notes}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ships Showcase */}
      <section id="ships" className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="ICGFR 2027 Fleet"
              title="Ship Showcase"
              subtitle={`Meet a selection of the ${data.statistics.vessels} vessels participating in the International Coast Guard Fleet Review.`}
            />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ships.map((ship, i) => (
              <motion.div
                key={ship.ship_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ShipCard ship={ship} onClick={() => setSelectedShip(ship)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Participating Nations */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <SectionHeader
              eyebrow="Global Participation"
              title={`${data.statistics.participating_nations} Nations, One Ocean`}
              subtitle="Coast guard and maritime law enforcement agencies from across the globe gather in Chennai."
              center
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {nations.map((nation, i) => (
              <motion.div
                key={nation.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="rounded-sm border border-navy/10 bg-cream p-3 text-center hover:border-gold/40 hover:shadow-sm transition-all"
              >
                <div className="text-2xl mb-1">{getFlagEmoji(nation.code)}</div>
                <p className="text-[11px] font-semibold text-navy leading-tight">{nation.country}</p>
                <p className="text-[10px] text-slate mt-0.5">
                  {nation.vessels} vessel{nation.vessels !== 1 ? "s" : ""}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section id="programme" className="py-16 gradient-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Day 3 — 17 February 2027
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Fleet Review Programme
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </motion.div>

          <div className="mx-auto max-w-2xl space-y-3">
            {data.programme.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 items-start rounded-sm border border-white/10 bg-white/5 p-4 hover:bg-white/8 transition-colors"
              >
                <div className="shrink-0 min-w-[72px]">
                  <span className="text-xs font-bold text-gold">{item.time}</span>
                </div>
                <div className="flex-1 flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                  <p className="text-sm text-white/80 leading-relaxed">{item.activity}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Visitor Guide"
              title="Important Information"
              subtitle="Essential details for delegates and visitors attending ICGFR 2027."
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Dress Code", text: data.important_information.dress_code },
              { title: "Transport", text: data.important_information.transport },
              { title: "Photography", text: data.important_information.photography },
              { title: "Safety", text: data.important_information.safety },
              { title: "Contact", text: data.important_information.contact },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-sm border border-navy/10 bg-cream p-5"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">
                  {item.title}
                </p>
                <p className="text-sm text-slate leading-relaxed">{item.text}</p>
              </motion.div>
            ))}

            {/* Viewing Areas */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm border border-navy/10 bg-cream p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-2">
                Viewing Areas
              </p>
              <ul className="space-y-1.5">
                {data.important_information.viewing_areas.map((area) => (
                  <li key={area} className="flex items-start gap-2 text-xs text-slate">
                    <Anchor className="h-3 w-3 text-gold shrink-0 mt-0.5" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <EventCrossNav currentHref="/fleet-review" title="Explore Other CGGS 2027 Events" />

      <CTABanner
        eyebrow="Delegate Registration"
        title="Be Part of ICGFR 2027"
        subtitle="Register as a delegate to attend the International Coast Guard Fleet Review and the 5th Coast Guard Global Summit."
        primaryLabel="Register Now"
        primaryHref="/register"
        secondaryLabel="View Schedule"
        secondaryHref="/schedule"
      />

      {/* Ship Detail Modal */}
      <AnimatePresence>
        {selectedShip && (
          <ShipModal ship={selectedShip} onClose={() => setSelectedShip(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Helper ──────────────────────────────────────────────────────────────────

function getFlagEmoji(countryCode: string): string {
  const map: Record<string, string> = {
    IN: "🇮🇳", JP: "🇯🇵", US: "🇺🇸", KR: "🇰🇷", PH: "🇵🇭", IT: "🇮🇹",
    MY: "🇲🇾", CN: "🇨🇳", LK: "🇱🇰", BD: "🇧🇩", AU: "🇦🇺", GB: "🇬🇧",
    FR: "🇫🇷", DE: "🇩🇪", CA: "🇨🇦", NO: "🇳🇴", ID: "🇮🇩", VN: "🇻🇳",
    TH: "🇹🇭", MV: "🇲🇻", PK: "🇵🇰", MM: "🇲🇲", BN: "🇧🇳", SG: "🇸🇬",
  };
  return map[countryCode] ?? "🌐";
}
