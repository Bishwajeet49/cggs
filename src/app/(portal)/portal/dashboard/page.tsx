"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays, QrCode, Bell, MapPin, Plane, Anchor,
  Clock, ArrowRight, Hotel, Car, Timer, Building2, Globe, Shield,
  BellRing, Wind, Droplets, CloudSun, Lock, Mic2,
  Users, Radio, Star, Sunrise, Sunset, Waves,
  CheckCircle2, Circle, ChevronRight, type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByName } from "@/services/countries";
import DelegateAvatar from "@/components/auth/DelegateAvatar";
import { getCategoryLabel, getFullName, getDisplayName } from "@/services/demoAuth";
import {
  getDashboardAnnouncements,
  getDashboardWeather,
  getDashboardQuickAccess,
  getDashboardTodayProgress,
  getDashboardLiveEvent,
  getDashboardTravelStatus,
  getDashboardFeaturedEvents,
} from "@/services/dashboard";
import HeroBackground from "@/components/portal/dashboard/HeroBackground";
import RotatingAnnouncements from "@/components/portal/dashboard/RotatingAnnouncements";
import DelegatePassWidget from "@/components/portal/dashboard/DelegatePassWidget";
import { enrichAuthUserFromRegistration } from "@/services/registration";

// ── Constants ──────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

const EVENT_BADGES: Record<string, { label: string; color: string }> = {
  plenary:      { label: "Plenary",      color: "bg-navy text-white" },
  seminar:      { label: "Seminar",      color: "bg-blue-600 text-white" },
  gala:         { label: "Gala",         color: "bg-gold text-navy-dark" },
  fleet_review: { label: "Fleet Review", color: "bg-teal-600 text-white" },
  networking:   { label: "Networking",   color: "bg-purple-600 text-white" },
  registration: { label: "Registration", color: "bg-slate-400 text-white" },
  meal:         { label: "Dining",       color: "bg-green-600 text-white" },
  bilateral:    { label: "Bilateral",    color: "bg-indigo-600 text-white" },
  panel:        { label: "Panel",        color: "bg-orange-600 text-white" },
  press:        { label: "Press",        color: "bg-red-600 text-white" },
  presentation: { label: "Presentation", color: "bg-cyan-600 text-white" },
};

const QUICK_ICONS: Record<string, LucideIcon> = {
  schedule: CalendarDays, qr_pass: QrCode, travel: Plane,
  fleet: Anchor, notifications: Bell, venue_map: MapPin,
};

const QUICK_COLORS: Record<string, string> = {
  schedule: "bg-navy/8 text-navy", qr_pass: "bg-gold/15 text-gold-dark",
  travel: "bg-teal-50 text-teal-700", fleet: "bg-blue-50 text-blue-700",
  notifications: "bg-amber-50 text-amber-700", venue_map: "bg-rose-50 text-rose-700",
};

const TRAVEL_ICONS: Record<string, LucideIcon> = {
  arrival: Plane, accommodation: Hotel, transport: Car, liaison: Users,
};

const SUMMIT_START = new Date("2027-02-15T09:00:00+05:30");

// ── Helpers ────────────────────────────────────────────────────

function pad(n: number) { return String(n).padStart(2, "0"); }

function getRemaining() {
  const diff = SUMMIT_START.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  };
}

function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0) || ""}`.toUpperCase();
}

function SectionLabel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
        <span aria-hidden="true" className="h-3.5 w-0.5 shrink-0 rounded-full bg-gold" />
        {children}
      </h2>
      {action}
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-gray-100/80 p-4 shadow-sm sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<typeof authUser>(null);
  const [remaining, setRemaining] = useState(getRemaining);

  const announcements = getDashboardAnnouncements();
  const weather = getDashboardWeather();
  const quickAccess = getDashboardQuickAccess();
  const todayProgress = getDashboardTodayProgress();
  const liveEvent = getDashboardLiveEvent();
  const travelStatus = getDashboardTravelStatus();
  const featuredEvents = getDashboardFeaturedEvents();

  useEffect(() => {
    if (authUser) setUser(enrichAuthUserFromRegistration(authUser));
    else {
      const stored = localStorage.getItem("cggs_auth_user");
      if (stored) {
        try {
          setUser(enrichAuthUserFromRegistration(JSON.parse(stored)));
        } catch { /* ignore */ }
      }
    }
  }, [authUser]);

  useEffect(() => {
    const t = setInterval(() => setRemaining(getRemaining()), 60000);
    return () => clearInterval(t);
  }, []);

  const firstName = user?.firstName ?? "";
  const lastName  = user?.lastName  ?? "";
  const fullName  = user ? getDisplayName(user) : "";
  const welcomeName = user ? getFullName(user) : "";
  const initials  = firstName ? getInitials(firstName, lastName) : "DL";
  const category  = user?.category ?? "official_delegate";
  const categoryLabel = getCategoryLabel(category);
  const countryData = user?.country ? getCountryByName(user.country) : undefined;

  return (
    <div className="relative space-y-5 sm:space-y-6">

      {/* Page watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none fixed bottom-0 right-0 h-[480px] w-[480px] select-none opacity-[0.028]"
        fill="none" stroke="#0D2154" strokeWidth="0.7"
      >
        <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="48" /><line x1="100" y1="8" x2="100" y2="192" />
        <line x1="8" y1="100" x2="192" y2="100" />
      </svg>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-navy text-white"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.065) 40px, rgba(201,168,76,0.065) 41px)",
        }}
      >
        <HeroBackground />
        <div aria-hidden="true" className="absolute left-0 right-0 top-0 z-1 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

        <div className="relative z-10 p-5 sm:p-6 md:p-8">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
            5th Coast Guard Global Summit · CGGS 2027
          </p>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
            {/* Photo + flag */}
            <div className="relative shrink-0">
              <DelegateAvatar user={user} size="lg" ring />
              {countryData && (
                <span
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-navy bg-white text-base shadow-md"
                  title={countryData.name}
                >
                  {countryData.flag}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-light tracking-wide sm:text-2xl md:text-[28px]">
                Welcome, <span className="font-bold text-gold">{welcomeName || fullName || "Delegate"}</span>
              </h1>
              {user?.title && (
                <p className="mt-1 text-sm text-white/55">{user.title} · {user.organization}</p>
              )}

              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  category === "head_of_delegation" ? "bg-gold text-navy" : "border border-white/25 text-white/90"
                }`}>
                  <Shield className="h-3 w-3 shrink-0" />
                  {categoryLabel}
                </span>
                {user?.organization && (
                  <span className="flex items-center gap-1.5 text-xs text-white/55">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="max-w-[220px] truncate">{user.organization}</span>
                  </span>
                )}
                {user?.country && (
                  <span className="flex items-center gap-1.5 text-xs text-white/55">
                    {countryData && <span>{countryData.flag}</span>}
                    {!countryData && <Globe className="h-3.5 w-3.5 shrink-0" />}
                    {user.country}
                  </span>
                )}
              </div>

              {user?.delegateId && (
                <p className="mt-2 font-mono text-xs tracking-widest text-white/30">{user.delegateId}</p>
              )}
            </div>

            <div className="shrink-0 space-y-2 sm:text-right">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs text-white/75">
                <CalendarDays className="h-3.5 w-3.5 text-gold" />Feb 15–17, 2027
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs text-white/75">
                  <MapPin className="h-3.5 w-3.5 text-gold" />ITC Grand Chola · Chennai
                </span>
              </div>
            </div>
          </div>

          <RotatingAnnouncements announcements={announcements} />
        </div>
      </motion.section>

      {/* ── LIVE EVENT BANNER (mock) ─────────────────────────── */}
      {liveEvent.enabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 }}
        >
          <Link
            href={liveEvent.watch_href}
            className="group flex flex-col gap-3 rounded-2xl border border-red-200 bg-linear-to-r from-red-50 to-white p-4 transition-all hover:border-red-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                <Radio className="h-5 w-5 text-red-600" />
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                </span>
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Live
                  </span>
                  <p className="text-sm font-bold text-navy">{liveEvent.title}</p>
                </div>
                <p className="mt-0.5 text-xs text-slate/65">{liveEvent.subtitle}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate/50">
                  <MapPin className="h-3 w-3" />{liveEvent.location}
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-red-700 sm:self-center">
              Watch Live <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </motion.div>
      )}

      {/* ── STATUS STRIP (clickable) ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          { label: "Registration", status: "Pending Verification", href: "/portal/registration", icon: Shield, dot: "bg-amber-400", text: "text-amber-600", accent: "border-l-amber-400", action: "View Status" },
          { label: "Accommodation", status: "Not Yet Assigned", href: "/portal/travel/accommodation", icon: Hotel, dot: "bg-slate-300", text: "text-slate-400", accent: "border-l-slate-200", action: "View Details" },
          { label: "Transport", status: "Not Yet Assigned", href: "/portal/travel/transport", icon: Car, dot: "bg-slate-300", text: "text-slate-400", accent: "border-l-slate-200", action: "Pickup Info" },
          { label: "Port Clearance", status: "Awaiting Credentials", href: "/portal/registration", icon: Anchor, dot: "bg-slate-300", text: "text-slate-400", accent: "border-l-slate-200", action: "Learn More" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className={`group flex items-center gap-3 rounded-xl border border-gray-100 border-l-4 ${s.accent} bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md`}
            >
              <Icon className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-gold/70" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-navy/70">{s.label}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <p className={`truncate text-xs ${s.text}`}>{s.status}</p>
                </div>
              </div>
              <span className="hidden shrink-0 text-[10px] font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
                {s.action} →
              </span>
            </Link>
          );
        })}
      </motion.div>

      {/* ── MAIN GRID ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 xl:items-start">

        {/* LEFT COLUMN */}
        <div className="space-y-5 xl:col-span-2">

          {/* Quick Access — light navy rhythm */}
          <Panel className="border-navy/8 bg-navy/3">
            <SectionLabel>Quick Access</SectionLabel>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {quickAccess.map((item, i) => {
                const Icon = QUICK_ICONS[item.id] ?? CalendarDays;
                const iconBg = QUICK_COLORS[item.id] ?? "bg-navy/8 text-navy";
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      className={`group flex h-full flex-col rounded-xl border border-white/80 bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md ${
                        item.disabled ? "pointer-events-none opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {item.action && (
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate/25 transition-all group-hover:translate-x-0.5 group-hover:text-gold" />
                        )}
                      </div>
                      <p className="mt-2.5 text-xs font-semibold text-navy group-hover:text-gold">{item.label}</p>
                      <p className="mt-0.5 text-[10px] font-medium text-navy/70">{item.primary}</p>
                      <p className="mt-0.5 text-[10px] text-slate/55">{item.secondary}</p>
                      {item.action && (
                        <p className="mt-2 text-[10px] font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                          {item.action} →
                        </p>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </Panel>

          {/* Today's Journey — light blue rhythm */}
          <Panel className="border-blue-100/80 bg-blue-50/40">
            <SectionLabel
              action={
                <Link href="/portal/schedule" className="flex items-center gap-1 text-xs text-gold hover:text-gold/80">
                  Open Schedule <ArrowRight className="h-3 w-3" />
                </Link>
              }
            >
              Today&apos;s Journey
            </SectionLabel>
            <div className="space-y-0">
              {todayProgress.map((step, i) => (
                <Link
                  key={step.id}
                  href="/portal/schedule"
                  className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors hover:bg-white/70"
                >
                  <div className="flex w-12 shrink-0 flex-col items-center">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : step.status === "current" ? (
                      <span className="relative flex h-5 w-5 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-50" />
                        <span className="relative h-3 w-3 rounded-full bg-gold" />
                      </span>
                    ) : (
                      <Circle className="h-5 w-5 text-slate/25" />
                    )}
                    <span className="mt-0.5 text-[9px] tabular-nums text-slate/45">{step.time}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium ${
                      step.status === "current" ? "text-navy font-semibold" :
                      step.status === "completed" ? "text-slate/55 line-through" : "text-navy/75"
                    }`}>
                      {step.label}
                    </p>
                    {step.status === "current" && (
                      <p className="text-[10px] font-medium text-gold">Up next · tap to view</p>
                    )}
                  </div>
                  {i < todayProgress.length - 1 && (
                    <div aria-hidden="true" className="absolute left-[34px] hidden" />
                  )}
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </Panel>

          {/* Featured Events — light navy rhythm */}
          <Panel className="border-navy/8 bg-navy/3">
            <SectionLabel>Key Summit Events</SectionLabel>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {featuredEvents.map((ev) => {
                const badge = EVENT_BADGES[ev.type] ?? { label: ev.type, color: "bg-slate-400 text-white" };
                const isFeatured = ev.featured;

                if (isFeatured) {
                  return (
                    <Link
                      key={ev.id}
                      href={ev.href}
                      className="group relative col-span-1 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md sm:col-span-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-gold-dark">
                          <Star className="h-3 w-3 fill-gold text-gold" /> Featured
                        </span>
                        {ev.live && (
                          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-bold uppercase text-red-600">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Live
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-base font-bold leading-snug text-navy group-hover:text-navy-mid">
                        {ev.title}
                      </p>
                      <p className="mt-1 text-xs text-slate/55">{ev.subtitle}</p>
                      {ev.speaker && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-slate/65">
                          <Mic2 className="h-3 w-3 shrink-0 text-gold/70" />{ev.speaker}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                        <span className="flex items-center gap-1 text-xs font-semibold text-navy/70">
                          <Clock className="h-3 w-3" />{ev.time} · {ev.day_label}
                        </span>
                        <span className="flex items-center gap-0.5 text-xs font-semibold text-gold">
                          View Details <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={ev.id}
                    href={ev.href}
                    className="group rounded-xl border border-white/80 bg-white/70 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${badge.color}`}>
                      {badge.label}
                    </span>
                    <p className="mt-2 text-sm font-semibold text-navy">{ev.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-slate/55">
                      <Clock className="h-3 w-3" />{ev.time} · {ev.date_label}
                    </p>
                    <p className="mt-2 flex items-center gap-0.5 text-[10px] font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      View Details <ArrowRight className="h-3 w-3" />
                    </p>
                  </Link>
                );
              })}
            </div>
          </Panel>

          {/* Locked features */}
          <div className="flex items-start gap-3.5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
              <Lock className="h-4 w-4 text-slate-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-navy/70">Available After Approval</p>
              <p className="mt-0.5 text-xs text-slate/55">
                Documents, seminar sessions, exhibition passes, and port clearance unlock once your registration is verified.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — unified rhythm */}
        <div className="space-y-4 xl:col-span-1">

          {/* Delegate Pass */}
          {user ? (
            <DelegatePassWidget
              fullName={welcomeName || fullName}
              initials={initials}
              categoryLabel={categoryLabel}
              category={category}
              country={user.country}
              countryFlag={countryData?.flag}
              organization={user.organization}
              delegateId={user.delegateId}
              registrationNumber={user.registrationNumber}
              categoryRaw={user.category}
              profilePhotoUrl={user.profilePhotoUrl}
            />
          ) : (
            <Link href="/portal/registration" className="block overflow-hidden rounded-2xl bg-navy p-5 shadow-lg transition-opacity hover:opacity-95">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Delegate Pass</p>
              <p className="text-sm text-white/50">Log in to view your official delegate pass.</p>
              <p className="mt-3 flex items-center gap-1 text-xs font-semibold text-gold">Open →</p>
            </Link>
          )}

          {/* Countdown — light navy */}
          <Panel className="border-navy/8 bg-navy/3">
            <div className="mb-3 flex items-center gap-2">
              <Timer className="h-4 w-4 text-gold" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">Summit Countdown</p>
            </div>
            <div className="flex gap-2">
              {[
                { value: remaining.days, label: "Days" },
                { value: pad(remaining.hours), label: "Hrs" },
                { value: pad(remaining.minutes), label: "Min" },
              ].map((u) => (
                <div key={u.label} className="flex flex-1 flex-col items-center rounded-lg bg-white py-3 shadow-sm">
                  <span className="text-2xl font-bold tabular-nums text-navy">{u.value}</span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate/55">{u.label}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Weather — white */}
          <Panel className="bg-white">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudSun className="h-4 w-4 text-amber-500" />
                <p className="text-xs font-semibold uppercase tracking-wider text-navy">{weather.city}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate/45">Mock</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-bold text-navy">{weather.temp_c}°C</span>
              <div>
                <p className="text-sm font-medium text-navy">{weather.condition}</p>
                <p className="text-xs text-slate/55">Feels like {weather.feels_like_c}°C</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
              <span className="flex items-center gap-1.5 text-xs text-slate/65">
                <Sunrise className="h-3.5 w-3.5 text-amber-400" />{weather.sunrise}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate/65">
                <Sunset className="h-3.5 w-3.5 text-orange-400" />{weather.sunset}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate/65">
                <Droplets className="h-3.5 w-3.5 text-blue-400" />{weather.humidity_pct}% humidity
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate/65">
                <Wind className="h-3.5 w-3.5 text-teal-400" />{weather.wind_kmh} km/h
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-teal-700/70">
              <Waves className="h-3.5 w-3.5 shrink-0" />{weather.sea_condition}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-slate/45">
              <MapPin className="h-3 w-3 shrink-0" />{weather.venue}
            </p>
          </Panel>

          {/* Travel & Stay — light blue */}
          <Panel className="border-blue-100/80 bg-blue-50/40">
            <SectionLabel
              action={
                <Link href="/portal/travel/arrival" className="text-[11px] text-gold hover:text-gold/80">
                  View all
                </Link>
              }
            >
              Travel &amp; Stay
            </SectionLabel>
            <div className="space-y-1">
              {travelStatus.map((item) => {
                const Icon = TRAVEL_ICONS[item.id] ?? Plane;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/80"
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm ${
                      item.confirmed ? "text-emerald-600" : "text-slate/40"
                    }`}>
                      {item.confirmed ? <CheckCircle2 className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-semibold text-navy">{item.label}</span>
                      <span className={`block text-[10px] ${item.confirmed ? "text-emerald-600" : "text-slate/55"}`}>
                        {item.confirmed ? `✓ ${item.status}` : item.status}
                      </span>
                    </span>
                    <span className="shrink-0 text-[10px] font-semibold text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      {item.action} →
                    </span>
                  </Link>
                );
              })}
            </div>
          </Panel>

          {/* Announcements — white */}
          <Panel className="bg-white">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy">Announcements</p>
              <Link href="/portal/notifications" className="text-[11px] text-gold hover:text-gold/80">
                View all
              </Link>
            </div>
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
                <BellRing className="h-6 w-6 text-slate-300" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-navy/70">No new notifications today</p>
              <p className="text-xs text-slate/50">You&apos;re all caught up.</p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
