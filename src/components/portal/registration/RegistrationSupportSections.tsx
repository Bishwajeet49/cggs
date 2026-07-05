"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Clock, CalendarDays, Anchor, Download, Mail } from "lucide-react";
import type { RegistrationNotification } from "@/types/delegate-registration";
import { formatNotificationTime } from "@/services/delegateRegistration";
import { Panel } from "./shared";

interface RegistrationNotificationsProps {
  notifications: RegistrationNotification[];
}

export default function RegistrationNotifications({ notifications }: RegistrationNotificationsProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
      <Panel>
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-gold" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Notifications</p>
            <h2 className="text-lg font-bold text-navy">Registration Updates</h2>
          </div>
        </div>

        <ul className="space-y-2">
          {notifications.map((notif, i) => (
            <motion.li
              key={notif.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.03 }}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                notif.read ? "border-gray-100 bg-gray-50/30" : "border-gold/20 bg-gold/5"
              }`}
            >
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${notif.read ? "bg-slate/20" : "bg-gold"}`} />
              <div className="min-w-0 flex-1">
                <p className={`text-sm ${notif.read ? "text-slate/75" : "font-medium text-navy"}`}>
                  {notif.message}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate/50">
                  <Clock className="h-3 w-3" />
                  {formatNotificationTime(notif.timestamp)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Panel>
    </motion.div>
  );
}

interface RegistrationHelpSectionProps {
  email: string;
  phone: string;
  emergencyPhone: string;
  faqHref: string;
  contactHref: string;
}

export function RegistrationHelpSection({
  email,
  phone,
  emergencyPhone,
  faqHref,
  contactHref,
}: RegistrationHelpSectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Panel className="border-navy/10 bg-linear-to-br from-white to-navy/3">
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Help &amp; Support</p>
          <h2 className="mt-1 text-lg font-bold text-navy">Registration Assistance</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Secretariat Email</p>
            <a href={`mailto:${email}`} className="mt-1 block text-sm font-medium text-navy hover:text-gold">
              {email}
            </a>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Secretariat Phone</p>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="mt-1 block text-sm font-medium text-navy hover:text-gold">
              {phone}
            </a>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Emergency Contact</p>
            <a href={`tel:${emergencyPhone.replace(/\s/g, "")}`} className="mt-1 block text-sm font-medium text-red-700 hover:text-red-800">
              {emergencyPhone}
            </a>
          </div>
          <div className="flex flex-col justify-center gap-2 rounded-xl border border-gray-100 bg-white p-4">
            <Link href={faqHref} className="text-sm font-semibold text-navy hover:text-gold">
              View FAQs →
            </Link>
            <Link
              href={contactHref}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mail className="h-3.5 w-3.5" />
              Contact Registration Team
            </Link>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}

interface RegistrationReviewBannerProps {
  variant: "pending" | "approved";
}

export function RegistrationReviewBanner({ variant }: RegistrationReviewBannerProps) {
  if (variant === "approved") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-linear-to-r from-emerald-50 to-white p-5 sm:p-6"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Registration Approved</p>
            <h2 className="mt-1 text-xl font-bold text-navy">Your delegate credentials are now active.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/portal/schedule" className="inline-flex items-center gap-1.5 rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white">
              <CalendarDays className="h-3.5 w-3.5" /> View Schedule
            </Link>
            <Link href="#qr-pass" className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800">
              Open QR Pass
            </Link>
            <Link href="/portal/travel/accommodation" className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800">
              View Accommodation
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50 to-white p-5 sm:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Under Review</p>
      <h2 className="mt-1 text-lg font-bold text-navy sm:text-xl">
        Registration is currently being reviewed by the CGGS Secretariat.
      </h2>
      <p className="mt-2 text-sm text-slate/70">
        You will receive a notification once approved. While waiting you may:
      </p>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {[
          { icon: CalendarDays, label: "Explore the Summit", href: "/schedule", desc: "Official programme" },
          { icon: Anchor, label: "View Official Schedule", href: "/portal/schedule", desc: "Personal itinerary" },
          { icon: Download, label: "Download Summary", href: "#downloads", desc: "Registration PDF" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white p-3 transition-all hover:border-gold/30 hover:shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
                <Icon className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">{item.label}</span>
                <span className="text-xs text-slate/55">{item.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

interface RegistrationSummaryStripProps {
  documentsVerified: number;
  documentsTotal: number;
  documentsPending: number;
  progressPercent: number;
}

export function RegistrationSummaryStrip({
  documentsVerified,
  documentsTotal,
  documentsPending,
  progressPercent,
}: RegistrationSummaryStripProps) {
  const stats = [
    { label: "Documents Verified", value: `${documentsVerified}/${documentsTotal}` },
    { label: "Pending Review", value: String(documentsPending) },
    { label: "Approval Progress", value: `${progressPercent}%` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{stat.label}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 + i * 0.05 }}
            className="mt-1 text-2xl font-bold text-navy"
          >
            {stat.value}
          </motion.p>
        </div>
      ))}
    </motion.div>
  );
}
