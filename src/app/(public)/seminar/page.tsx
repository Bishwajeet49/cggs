"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic2,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  FileText,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import EventHero from "@/components/events/EventHero";
import EventCrossNav from "@/components/events/EventCrossNav";
import CTABanner from "@/components/events/CTABanner";
import AnimatedStats from "@/components/events/AnimatedStats";
import SectionHeader from "@/components/ui/SectionHeader";
import { getSeminar, getSeminarStatistics } from "@/services/seminar";
import type { SeminarSpeaker, SeminarFAQ } from "@/types/seminar";

// ─── Speaker Card ────────────────────────────────────────────────────────────

function SpeakerCard({ speaker, onClick }: { speaker: SeminarSpeaker; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group w-full text-left rounded-sm border border-navy/10 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-gold/40 transition-all"
    >
      {/* Photo */}
      <div className="relative h-52 bg-navy/10 overflow-hidden">
        <img
          src={speaker.image_url}
          alt={speaker.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = "none";
            el.parentElement!.style.background = "#0D2154";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent" />
        {speaker.keynote && (
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
              Keynote
            </span>
          </div>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="text-lg">{getCountryFlag(speaker.country_code)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
          {speaker.country}
        </p>
        <h3 className="text-sm font-bold text-navy leading-tight group-hover:text-gold transition-colors">
          {speaker.name}
        </h3>
        <p className="text-xs text-slate mt-0.5">{speaker.designation}</p>
        <p className="text-xs text-navy/60 mt-0.5">{speaker.organization}</p>

        <div className="mt-3 flex flex-wrap gap-1">
          {speaker.expertise.slice(0, 2).map((exp) => (
            <span
              key={exp}
              className="inline-flex items-center rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-medium text-navy"
            >
              {exp}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

// ─── Speaker Modal ───────────────────────────────────────────────────────────

function SpeakerModal({ speaker, onClose }: { speaker: SeminarSpeaker; onClose: () => void }) {
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
        className="w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="gradient-navy relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="h-40 bg-navy/30 overflow-hidden relative">
            <img
              src={speaker.image_url}
              alt={speaker.name}
              className="w-full h-full object-cover object-top opacity-60"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy-dark to-transparent" />
          </div>
          <div className="px-6 pb-6 pt-2 relative z-10">
            {speaker.keynote && (
              <span className="inline-block mb-2 rounded-full bg-gold text-navy text-[10px] font-bold uppercase tracking-wide px-2 py-0.5">
                Keynote Speaker
              </span>
            )}
            <h2 className="text-xl font-bold text-white">{speaker.name}</h2>
            <p className="text-sm text-white/70 mt-1">{speaker.designation}</p>
            <p className="text-sm text-gold/80 mt-0.5">{speaker.organization}</p>
            <p className="text-xs text-white/50 mt-0.5">
              {getCountryFlag(speaker.country_code)} {speaker.country}
            </p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">Biography</p>
            <p className="text-sm text-slate leading-relaxed">{speaker.bio}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">Areas of Expertise</p>
            <div className="flex flex-wrap gap-2">
              {speaker.expertise.map((exp) => (
                <span
                  key={exp}
                  className="rounded-full bg-navy/8 px-3 py-1 text-xs font-medium text-navy"
                >
                  {exp}
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

// ─── FAQ Item ────────────────────────────────────────────────────────────────

function FAQItem({ faq, open, onToggle }: { faq: SeminarFAQ; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
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
            <p className="pb-4 text-sm text-slate leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function SeminarPage() {
  const seminar = getSeminar();
  const stats = getSeminarStatistics();

  const [selectedSpeaker, setSelectedSpeaker] = useState<SeminarSpeaker | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const statItems = [
    { value: stats.delegates, label: "Delegates", suffix: "+" },
    { value: stats.countries, label: "Nations" },
    { value: stats.speakers, label: "Speakers" },
    { value: stats.sessions, label: "Sessions" },
    { value: stats.papers, label: "Papers" },
  ];

  return (
    <>
      <EventHero
        badge="WCGS 2027"
        title="World Coast Guard Seminar"
        subtitle={seminar.theme_description}
        breadcrumbs={[{ label: "Events" }, { label: "Seminar" }]}
        backgroundClass="gradient-navy"
        ctaLabel="View Programme"
        ctaHref="#sessions"
        secondaryCtaLabel="Meet the Speakers"
        secondaryCtaHref="#speakers"
      >
        <div className="rounded-sm bg-white/10 border border-white/20 px-5 py-3 inline-block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold mb-1">
            Theme
          </p>
          <p className="text-sm font-semibold text-white max-w-xl">
            "{seminar.theme}"
          </p>
        </div>
      </EventHero>

      {/* Stats */}
      <AnimatedStats stats={statItems} dark />

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
                eyebrow="About WCGS 2027"
                title="The Premier Maritime Policy Forum"
                subtitle={seminar.about}
              />
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {[
                  { icon: Calendar, text: seminar.dates },
                  { icon: MapPin, text: seminar.venue },
                  { icon: Users, text: `${seminar.delegate_count}+ Delegates` },
                  { icon: Globe, text: `${seminar.countries_represented} Nations` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-slate">
                    <Icon className="h-4 w-4 text-gold shrink-0" />
                    <span className="text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              {seminar.objectives.map((obj, i) => (
                <div
                  key={obj.id}
                  className="rounded-sm border border-navy/10 bg-cream p-4 hover:border-gold/30 transition-colors"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <p className="text-xs font-bold text-navy">{obj.title}</p>
                  </div>
                  <p className="text-xs text-slate leading-relaxed">{obj.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Session Categories */}
      <section className="py-16 gradient-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Programme Structure
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Session Categories</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {seminar.session_categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-sm border border-white/10 bg-white/5 p-5 text-center hover:bg-white/8 hover:border-gold/30 transition-all"
              >
                <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-gold" />
                </div>
                <p className="text-sm font-bold text-white mb-1">{cat.name}</p>
                <p className="text-[10px] text-gold/70 mb-2">
                  {cat.session_count} session{cat.session_count !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-white/55 leading-relaxed">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section id="sessions" className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Conference Programme"
              title="Plenary Sessions"
              subtitle="Three landmark sessions covering the full spectrum of global maritime challenges."
            />
          </motion.div>

          <div className="space-y-6">
            {seminar.sessions.map((session, i) => (
              <motion.div
                key={session.session_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-sm border border-navy/10 bg-white overflow-hidden shadow-sm"
              >
                <div className="gradient-navy px-6 py-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <span className="inline-block rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 mb-2">
                        {session.session_number}
                      </span>
                      <h3 className="text-base font-bold text-white">{session.title}</h3>
                      <p className="text-xs text-white/60 mt-1">{session.subtitle}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1.5 text-xs text-white/60 justify-end mb-1">
                        <Calendar className="h-3.5 w-3.5 text-gold" />
                        {new Date(session.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <p className="text-xs text-gold font-semibold">{session.time}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-5 space-y-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] text-slate uppercase tracking-wider">Venue</p>
                      <p className="text-sm text-navy font-medium">{session.venue}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy mb-1.5">Chaired by</p>
                    <p className="text-xs text-slate">{session.chair}</p>
                  </div>
                  <p className="text-sm text-slate leading-relaxed">{session.description}</p>
                  <div>
                    <p className="text-xs font-semibold text-navy mb-2">Key Topics</p>
                    <ul className="space-y-1">
                      {session.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2 text-xs text-slate">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-sm bg-cream border border-gold/20 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gold mb-1">
                      Expected Outcome
                    </p>
                    <p className="text-xs text-slate leading-relaxed">{session.outcomes}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section id="speakers" className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Distinguished Speakers"
              title="Maritime Leaders at WCGS 2027"
              subtitle="Heads of coast guards, maritime safety experts, and policy leaders from around the world."
            />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {seminar.featured_speakers.map((speaker, i) => (
              <motion.div
                key={speaker.speaker_id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <SpeakerCard speaker={speaker} onClick={() => setSelectedSpeaker(speaker)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 gradient-navy">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Discussion Agenda
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Topics on the Table</h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </motion.div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {seminar.topics.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/8 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                <span className="text-sm text-white/80">{topic}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue */}
      <section className="py-16 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeader
                eyebrow="Conference Venue"
                title={seminar.venue_information.name}
                subtitle={`${seminar.venue_information.hotel} — ${seminar.venue_information.address}`}
              />
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-sm bg-white border border-navy/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1">Capacity</p>
                  <p className="text-lg font-bold text-navy">{seminar.venue_information.capacity}</p>
                  <p className="text-xs text-slate">seats</p>
                </div>
                <div className="rounded-sm bg-white border border-navy/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold mb-1">Breakout Rooms</p>
                  <p className="text-lg font-bold text-navy">{seminar.venue_information.breakout_rooms.length}</p>
                  <p className="text-xs text-slate">dedicated rooms</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {seminar.venue_information.facilities.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-xs text-slate">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">Breakout Rooms</p>
              <div className="space-y-3">
                {seminar.venue_information.breakout_rooms.map((room) => (
                  <div key={room.name} className="rounded-sm border border-navy/10 bg-white p-4 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-sm bg-navy/5 flex items-center justify-center shrink-0">
                      <Mic2 className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{room.name}</p>
                      <p className="text-xs text-slate">{room.purpose} · {room.capacity} seats</p>
                    </div>
                  </div>
                ))}
              </div>
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
            className="mb-10"
          >
            <SectionHeader
              eyebrow="Frequently Asked Questions"
              title="WCGS 2027 — Questions & Answers"
              subtitle="Everything delegates need to know before attending the World Coast Guard Seminar."
            />
          </motion.div>

          <div className="rounded-sm border border-navy/10 bg-white divide-y divide-navy/10 shadow-sm">
            {seminar.faqs.map((faq, i) => (
              <div key={faq.id} className="px-5">
                <FAQItem
                  faq={faq}
                  open={openFaq === faq.id}
                  onToggle={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <EventCrossNav currentHref="/seminar" title="Explore Other CGGS 2027 Events" />

      <CTABanner
        eyebrow="Delegate Registration"
        title="Attend the World Coast Guard Seminar"
        subtitle="Be part of the landmark policy forum shaping global maritime governance for the next decade."
        primaryLabel="Register as Delegate"
        primaryHref="/register"
        secondaryLabel="View Event Schedule"
        secondaryHref="/schedule"
      />

      {/* Speaker Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function getCountryFlag(code: string): string {
  const map: Record<string, string> = {
    IN: "🇮🇳", JP: "🇯🇵", US: "🇺🇸", KR: "🇰🇷", PH: "🇵🇭", IT: "🇮🇹",
    MY: "🇲🇾", CN: "🇨🇳", LK: "🇱🇰", BD: "🇧🇩", AU: "🇦🇺", GB: "🇬🇧",
    FR: "🇫🇷", DE: "🇩🇪", CA: "🇨🇦", NO: "🇳🇴", ID: "🇮🇩", VN: "🇻🇳",
    TH: "🇹🇭", MV: "🇲🇻", PK: "🇵🇰", SG: "🇸🇬", EU: "🇪🇺",
  };
  return map[code] ?? "🌐";
}
