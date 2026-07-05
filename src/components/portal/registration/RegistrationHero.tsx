"use client";

import { motion } from "framer-motion";
import { CalendarDays, Building2, Globe, Shield, Hash, QrCode, ArrowDown } from "lucide-react";
import HeroBackground from "@/components/portal/dashboard/HeroBackground";
import type { RegistrationDelegate, RegistrationStatus } from "@/types/delegate-registration";
import { STATUS_CONFIG, CATEGORY_LABELS, formatRegistrationDate } from "@/services/delegateRegistration";

interface RegistrationHeroProps {
  delegate: RegistrationDelegate;
  status: RegistrationStatus;
  countryFlag?: string;
}

function scrollToQrPass() {
  const main = document.querySelector("main");
  const target = document.getElementById("qr-pass");
  if (!main || !target) return;
  const offset = target.getBoundingClientRect().top - main.getBoundingClientRect().top + main.scrollTop - 24;
  main.scrollTo({ top: offset, behavior: "smooth" });
}

export default function RegistrationHero({ delegate, status, countryFlag }: RegistrationHeroProps) {
  const statusConfig = STATUS_CONFIG[status];
  const fullName = `${delegate.first_name} ${delegate.last_name}`.trim();
  const categoryLabel = CATEGORY_LABELS[delegate.category] ?? "Official Delegate";

  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-navy text-white"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(201,168,76,0.065) 40px, rgba(201,168,76,0.065) 41px)",
      }}
    >
      <HeroBackground />
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 z-1 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
              My Registration
            </p>
            <h1 className="mt-1 text-2xl font-light tracking-wide sm:text-3xl">
              Delegate <span className="font-bold text-gold">Registration</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusConfig.badge}`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${statusConfig.dot} ${status === "pending_verification" ? "animate-pulse" : ""}`} />
                {statusConfig.label}
              </motion.span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs text-white/75">
                <Shield className="h-3.5 w-3.5 text-gold" />
                {categoryLabel}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-2xl">
              <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">Delegate Name</p>
                <p className="mt-1 text-sm font-semibold text-white">{fullName}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">Registration ID</p>
                <p className="mt-1 font-mono text-sm font-semibold text-gold">{delegate.registration_number}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  <Globe className="h-3 w-3" /> Country
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                  {countryFlag && <span>{countryFlag}</span>}
                  {delegate.country}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/6 px-4 py-3">
                <p className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  <Building2 className="h-3 w-3" /> Organization
                </p>
                <p className="mt-1 truncate text-sm text-white/85">{delegate.organization}</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="w-full shrink-0 rounded-xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm lg:max-w-xs"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gold">Registration Details</p>
            <div className="mt-3 space-y-3">
              <div className="flex items-start gap-2">
                <Hash className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-[10px] text-white/45">Delegate ID</p>
                  <p className="font-mono text-xs font-semibold text-white">{delegate.delegate_id}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" />
                <div>
                  <p className="text-[10px] text-white/45">Registration Date</p>
                  <p className="text-xs text-white/80">{formatRegistrationDate(delegate.registered_at)}</p>
                </div>
              </div>
            </div>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-white/50">
              {statusConfig.description}
            </p>
            <button
              type="button"
              onClick={scrollToQrPass}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gold/35 bg-gold/15 px-4 py-2.5 text-xs font-semibold text-gold transition-all hover:border-gold/50 hover:bg-gold/25"
            >
              <QrCode className="h-4 w-4 shrink-0" />
              View QR Delegate Pass
              <ArrowDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
