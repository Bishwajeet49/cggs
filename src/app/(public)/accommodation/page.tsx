"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Navigation,
  Plane,
  Hotel,
  Car,
  ArrowRight,
  Lock,
  Check,
  Mail,
  Phone,
  Clock,
  ChevronDown,
  ChevronUp,
  Anchor,
  Building2,
  Shield,
} from "lucide-react";
import AnimatedStats from "@/components/events/AnimatedStats";
import CTABanner from "@/components/events/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { getTravelIcon, StarRating } from "@/components/travel-public/travelIcons";
import {
  getTravelOverview,
  getPublicHotels,
  getTravelFAQ,
} from "@/services/publicTravel";
import type { TravelFAQ } from "@/types/public-travel";

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ faq, open, onToggle }: { faq: TravelFAQ; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-navy">{faq.question}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gold shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-slate leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

const ACCOMMODATION_BANNER = "/banners/accoimadation_page_bvanner.png";

export default function AccommodationPage() {
  const data = getTravelOverview();
  const hotels = getPublicHotels();
  const faq = getTravelFAQ();
  const [openFaq, setOpenFaq] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[480px] overflow-hidden pt-16 sm:min-h-[520px] lg:min-h-[560px]"
        aria-label="Travel & Stay hero"
      >
        <Image
          src={ACCOMMODATION_BANNER}
          alt="CGGS 2027 accommodation — official hotels, Chennai airport and maritime welcome"
          fill
          className="object-cover object-[center_30%] sm:object-right"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy/75 via-navy/50 to-transparent lg:from-navy/65" />
        <div className="absolute inset-0 bg-linear-to-t from-navy/45 via-transparent to-navy/15" />

        <div className="relative mx-auto flex h-full w-full max-w-7xl items-end px-4 pb-12 pt-6 sm:px-6">
          <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-4 inline-flex items-center gap-2"
              >
                <span className="inline-block h-px w-8 bg-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  CGGS 2027
                </span>
                <span className="inline-block h-px w-8 bg-gold" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
              >
                {data.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="mt-2 text-lg font-medium text-gold/90"
              >
                {data.hero.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-4 max-w-xl text-base leading-relaxed text-white/65"
              >
                {data.hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={data.hero.primary_cta_href}
                  className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  {data.hero.primary_cta_label}
                </Link>
                <Link
                  href={data.hero.secondary_cta_href}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/60 hover:text-white transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  {data.hero.secondary_cta_label}
                </Link>
              </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg viewBox="0 0 1440 64" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,64 L0,64 Z" fill="white" fillOpacity="0.03" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-navy-dark border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
          <AnimatedStats stats={data.stats} dark />
        </div>
      </div>

      {/* Travel & Stay Overview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionHeader
              eyebrow="Delegate Support"
              title="Travel & Stay Overview"
              subtitle={data.overview.intro}
            />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {data.overview.cards.map((card, i) => {
              const Icon = getTravelIcon(card.icon);
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-sm border border-navy/8 bg-cream/30 p-5 hover:border-gold/30 hover:shadow-md transition-all"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-navy/5 border border-navy/10 group-hover:bg-gold/10 group-hover:border-gold/20 transition-colors">
                    <Icon className="h-5 w-5 text-navy group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-navy mb-2">{card.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Hotels */}
      <section className="py-16 bg-[#F4F5F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <SectionHeader
              eyebrow="Accommodation"
              title="Official Partner Hotels"
              subtitle="Three official five-star partner hotels designated by the CGGS Secretariat for delegate accommodation. Room allocations are managed exclusively through the Delegate Portal."
              center
            />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, i) => (
              <motion.article
                key={hotel.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group flex flex-col rounded-sm bg-white border border-navy/8 overflow-hidden shadow-sm hover:shadow-lg hover:border-gold/30 transition-all"
              >
                {hotel.image_url ? (
                  <div
                    className="relative w-full aspect-[4/3] bg-cream flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(180deg, ${hotel.accent}08 0%, #F4F5F8 100%)` }}
                  >
                    <Image
                      src={hotel.image_url}
                      alt={hotel.name}
                      fill
                      className="object-contain p-1 sm:p-2"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div
                    className="relative h-36 flex items-end p-5"
                    style={{ background: `linear-gradient(135deg, ${hotel.accent} 0%, #06111E 100%)` }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(197,160,40,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,0.5) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Hotel className="h-4 w-4 text-gold/70" />
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold/80">
                        {hotel.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-navy group-hover:text-gold transition-colors">
                      {hotel.name}
                    </h3>
                    <div className="mt-1.5">
                      <StarRating rating={hotel.star_rating} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate mb-3">
                    <MapPin className="h-3.5 w-3.5 text-gold shrink-0" />
                    {hotel.location}
                  </div>
                  <p className="text-xs font-semibold text-navy mb-2">{hotel.distance}</p>
                  <p className="text-xs text-slate leading-relaxed mb-4 line-clamp-2">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {hotel.facilities.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="rounded-full bg-cream px-2.5 py-0.5 text-[10px] font-medium text-navy/70 border border-navy/8"
                      >
                        {f}
                      </span>
                    ))}
                    {hotel.facilities.length > 4 && (
                      <span className="rounded-full bg-cream px-2.5 py-0.5 text-[10px] font-medium text-slate">
                        +{hotel.facilities.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <a
                      href={hotel.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-sm border border-navy/12 py-2 text-xs font-semibold text-navy hover:border-gold hover:text-gold transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      View Location
                    </a>
                    <a
                      href={hotel.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-sm bg-navy py-2 text-xs font-semibold text-white hover:bg-navy-mid transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Hotel Website
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Location */}
      <section id="venue" className="py-16 bg-white scroll-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                eyebrow="Summit Venue"
                title={data.venue.name}
                subtitle={data.venue.address}
              />

              <div className="mt-8 space-y-4">
                {[
                  { label: "Airport Distance", value: data.venue.airport_distance },
                  { label: "Airport Travel Time", value: data.venue.airport_travel_time },
                  { label: "Hotel to Venue", value: data.venue.venue_travel_time },
                  { label: "Coordinates", value: data.venue.coordinates },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-sm border border-navy/8 p-4 hover:border-gold/20 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-sm bg-navy/5 flex items-center justify-center shrink-0">
                      <Navigation className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-navy">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="rounded-sm overflow-hidden border border-navy/10 shadow-md">
                <div className="relative w-full" style={{ height: "420px" }}>
                  <iframe
                    title="ITC Grand Chola — Summit Venue"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1967614!2d80.21570!3d13.01050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267cbf5ace0d5%3A0x33d7d3e6fbcdf1e0!2sITC%20Grand%20Chola%2C%20A%20Luxury%20Collection%20Hotel%2C%20Chennai!5e0!3m2!1sen!2sin!4v1720220000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
                <div className="bg-navy px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      Summit Venue · ITC Grand Chola
                    </p>
                    <p className="text-xs text-white/55 mt-0.5">
                      {data.venue.airport_distance} · {data.venue.airport_travel_time}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0 sm:justify-end">
                    <a
                      href={data.venue.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm bg-gold px-4 py-2 text-xs font-bold text-navy hover:bg-gold-light transition-colors"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      Open Map
                    </a>
                    <a
                      href={data.venue.directions_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-white/25 px-4 py-2 text-xs font-semibold text-white/90 hover:border-white/50 hover:text-white transition-colors"
                    >
                      <Navigation className="h-3.5 w-3.5" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Airport Information */}
      <section className="py-16 bg-[#F4F5F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionHeader
              eyebrow="Arrival"
              title="Airport Information"
              subtitle={`${data.airport.name} (${data.airport.iata_code}) — your gateway to CGGS 2027.`}
            />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm bg-white border border-navy/8 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-sm gradient-navy flex items-center justify-center">
                  <Plane className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">{data.airport.name}</h3>
                  <p className="text-sm text-slate">IATA: {data.airport.iata_code}</p>
                </div>
              </div>

              {[
                { title: "Arrival Terminal", content: data.airport.arrival_terminal },
                { title: "Immigration Guidance", content: data.airport.immigration_guidance },
                { title: "Taxi Information", content: data.airport.taxi_information },
                { title: "Official Pickup Counter", content: data.airport.official_pickup_counter },
              ].map((block) => (
                <div key={block.title} className="mb-5 last:mb-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1.5">
                    {block.title}
                  </p>
                  <p className="text-sm text-slate leading-relaxed">{block.content}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-5"
            >
              <div className="rounded-sm bg-navy p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-4">
                  Emergency Contacts
                </p>
                <ul className="space-y-2">
                  {data.airport.emergency_contacts.map((contact) => (
                    <li key={contact} className="flex items-start gap-2 text-sm text-white/75">
                      <Phone className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      {contact}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm bg-white border border-navy/8 p-6 shadow-sm">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-4">
                  Useful Arrival Tips
                </p>
                <ul className="space-y-3">
                  {data.airport.arrival_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transportation Overview */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <SectionHeader
              eyebrow="Ground Transport"
              title="Transportation Overview"
              subtitle={data.transport.intro}
              center
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-14">
            {data.transport.services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-sm border border-navy/8 bg-cream/30 p-5 hover:border-gold/25 transition-colors"
              >
                <Car className="h-5 w-5 text-gold mb-3" />
                <h3 className="text-sm font-bold text-navy mb-2">{service.title}</h3>
                <p className="text-xs text-slate leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Process flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-sm gradient-navy p-8 sm:p-10"
          >
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-8">
              Delegate Journey
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
              {data.transport.flow.map((step, i) => {
                const icons = [Plane, Car, Hotel, Building2, Anchor];
                const Icon = icons[i] ?? Car;
                return (
                  <div key={step.id} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 flex-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex flex-col items-center text-center flex-1"
                    >
                      <div className="h-12 w-12 rounded-full bg-white/10 border border-gold/30 flex items-center justify-center mb-2">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <p className="text-sm font-bold text-white">{step.label}</p>
                      <p className="text-[10px] text-white/45 mt-0.5 max-w-[120px]">{step.description}</p>
                    </motion.div>
                    {i < data.transport.flow.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gold/40 shrink-0 hidden sm:block rotate-0" />
                    )}
                    {i < data.transport.flow.length - 1 && (
                      <div className="h-6 w-px bg-gold/20 sm:hidden" />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meals & Hospitality */}
      <section className="py-16 bg-[#F4F5F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <SectionHeader
              eyebrow="Hospitality"
              title="Meals & Hospitality"
              subtitle={data.meals.intro}
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.meals.items.map((meal, i) => {
              const Icon = getTravelIcon(meal.icon);
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="rounded-sm bg-white border border-navy/8 p-5 shadow-sm hover:border-gold/25 hover:shadow-md transition-all"
                >
                  <Icon className="h-5 w-5 text-gold mb-3" />
                  <h3 className="text-sm font-bold text-navy mb-2">{meal.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">{meal.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-sm border border-gold/25 bg-gold/5 px-6 py-4 flex items-start gap-3"
          >
            <Lock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
            <p className="text-sm text-navy/80 leading-relaxed">{data.meals.login_note}</p>
          </motion.div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <SectionHeader
              eyebrow="Essential Guidance"
              title="Important Information"
              subtitle="Key travel advisories and practical information for all CGGS 2027 participants."
              center
            />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.important_info.map((info, i) => {
              const Icon = getTravelIcon(info.icon);
              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  className="rounded-sm border border-navy/8 p-5 hover:border-gold/25 hover:shadow-sm transition-all"
                >
                  <Icon className="h-5 w-5 text-gold mb-3" />
                  <h3 className="text-sm font-bold text-navy mb-2">{info.title}</h3>
                  <p className="text-xs text-slate leading-relaxed">{info.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delegate Portal CTA — prominent */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                Delegate Portal
              </p>
              <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight">
                {data.delegate_portal.headline}
              </h2>
              <p className="mt-2 text-lg font-medium text-gold/80">
                {data.delegate_portal.subheadline}
              </p>
              <p className="mt-4 text-sm text-white/55 leading-relaxed">
                Your personalised travel itinerary — hotel assignment, pickup schedule, driver details, and meal timetable — is available exclusively through the secure Delegate Portal.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={data.delegate_portal.login_href}
                  className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-sm font-bold text-navy hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
                >
                  <Shield className="h-4 w-4" />
                  {data.delegate_portal.login_label}
                </Link>
                <Link
                  href={data.delegate_portal.register_href}
                  className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-6 py-3.5 text-sm font-semibold text-white/80 hover:border-white/50 hover:text-white transition-colors"
                >
                  {data.delegate_portal.register_label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="rounded-sm border border-gold/20 bg-white/5 backdrop-blur-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-5">
                  Your Personalised Dashboard
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.delegate_portal.preview_items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5 rounded-sm bg-white/5 border border-white/10 px-3 py-2.5"
                    >
                      {item.locked ? (
                        <Lock className="h-3.5 w-3.5 text-gold/60 shrink-0" />
                      ) : (
                        <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      )}
                      <span className="text-xs font-medium text-white/70">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[10px] text-white/30 flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  Secured behind delegate authentication
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <SectionHeader
              eyebrow="Access Levels"
              title="Public Website vs. Delegate Portal"
              subtitle="This page provides general travel guidance. Personalised arrangements are available only to registered delegates."
              center
            />
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-sm bg-white border border-navy/10 p-6 shadow-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate mb-4">
                Public Website
              </p>
              <ul className="space-y-3">
                {data.feature_comparison.public_website.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-navy">
                    <Check className="h-4 w-4 text-navy/40 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-sm gradient-navy border border-gold/20 p-6 shadow-lg relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold mb-4 relative">
                Delegate Portal
              </p>
              <ul className="space-y-3 relative">
                {data.feature_comparison.delegate_portal.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/80">
                    <Check className="h-4 w-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <SectionHeader
              eyebrow="Questions"
              title={faq.title}
              subtitle={faq.subtitle}
              center
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-sm border border-navy/10 bg-cream/30 px-5"
          >
            {faq.items.map((item) => (
              <FAQItem
                key={item.id}
                faq={item}
                open={openFaq === item.id}
                onToggle={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Secretariat */}
      <section className="py-16 bg-[#F4F5F8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <SectionHeader
              eyebrow="Assistance"
              title="Contact Secretariat"
              subtitle="Dedicated helpdesks for travel, accommodation, and transportation enquiries."
              center
            />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3 mb-8">
            {[data.contacts.travel_helpdesk, data.contacts.accommodation_helpdesk, data.contacts.transportation_helpdesk].map(
              (desk, i) => (
                <motion.div
                  key={desk.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                  className="rounded-sm bg-white border border-navy/8 p-6 shadow-sm hover:border-gold/25 transition-all"
                >
                  <h3 className="text-sm font-bold text-navy mb-4">{desk.title}</h3>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${desk.email}`}
                      className="flex items-center gap-2.5 text-xs text-slate hover:text-gold transition-colors"
                    >
                      <Mail className="h-4 w-4 text-gold shrink-0" />
                      {desk.email}
                    </a>
                    <a
                      href={`tel:${desk.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 text-xs text-slate hover:text-gold transition-colors"
                    >
                      <Phone className="h-4 w-4 text-gold shrink-0" />
                      {desk.phone}
                    </a>
                    <div className="flex items-center gap-2.5 text-xs text-slate/70">
                      <Clock className="h-4 w-4 text-gold/60 shrink-0" />
                      {desk.hours}
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-sm gradient-navy px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-sm bg-red-500/15 flex items-center justify-center">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{data.contacts.emergency_contact}</p>
                <p className="text-xs text-white/50">Available 24/7 during summit period</p>
              </div>
            </div>
            <a
              href={`tel:${data.contacts.emergency_phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-2.5 text-sm font-bold text-navy hover:bg-gold-light transition-colors"
            >
              <Phone className="h-4 w-4" />
              {data.contacts.emergency_phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTABanner
        eyebrow="CGGS 2027"
        title={data.closing_cta.headline}
        subtitle={data.closing_cta.description}
        primaryLabel={data.closing_cta.register_label}
        primaryHref={data.closing_cta.register_href}
        secondaryLabel={data.closing_cta.login_label}
        secondaryHref={data.closing_cta.login_href}
      />
    </>
  );
}
