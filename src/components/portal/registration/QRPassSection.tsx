"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Download, Printer, Maximize2, X, Shield } from "lucide-react";
import QRCodeDisplay from "@/components/registration/QRCodeDisplay";
import type { RegistrationDelegate, RegistrationStatus } from "@/types/delegate-registration";
import { CATEGORY_LABELS, STATUS_CONFIG } from "@/services/delegateRegistration";
import { getInitials } from "./shared";

interface QRPassSectionProps {
  delegate: RegistrationDelegate;
  status: RegistrationStatus;
  countryFlag?: string;
}

export default function QRPassSection({ delegate, status, countryFlag }: QRPassSectionProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fullName = `${delegate.first_name} ${delegate.last_name}`.trim();
  const initials = getInitials(delegate.first_name, delegate.last_name);
  const categoryLabel = CATEGORY_LABELS[delegate.category] ?? "Official Delegate";
  const statusConfig = STATUS_CONFIG[status];

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (fullscreen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [fullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const passCard = (large = false) => (
    <div className={`relative overflow-hidden rounded-2xl bg-navy shadow-lg ${large ? "max-w-md w-full" : ""}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, transparent 0, rgba(201,168,76,0.4) 1px, transparent 2px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">Official Delegate Pass</p>
            <p className="mt-0.5 text-[9px] text-white/35">CGGS 2027 · Republic of India</p>
          </div>
          {countryFlag && <span className="text-2xl">{countryFlag}</span>}
        </div>

        <div className="mt-5 flex gap-4">
          <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md border-2 border-gold/50 bg-navy-mid">
            <span className="text-xl font-bold text-gold">{initials}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-white">{fullName}</p>
            <span className="mt-1 inline-flex rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-semibold text-white/75">
              {categoryLabel}
            </span>
            <p className="mt-1 truncate text-xs text-white/50">{delegate.organization}</p>
            <p className="text-xs text-white/40">{delegate.country}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-start">
          <QRCodeDisplay
            delegateId={delegate.delegate_id}
            registrationNumber={delegate.registration_number}
            name={fullName}
            category={delegate.category}
            country={delegate.country}
            organization={delegate.organization}
            size={large ? 160 : 120}
            className="gap-0 [&>div]:border-0 [&>div]:p-2 [&>div]:shadow-none [&>p]:hidden"
          />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Delegate ID</p>
            <p className="font-mono text-sm font-bold text-gold">{delegate.delegate_id}</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/35">Registration No.</p>
            <p className="font-mono text-xs text-white/65">{delegate.registration_number}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1">
              <span className={`h-1.5 w-1.5 rounded-full ${statusConfig.dot}`} />
              <span className="text-[10px] font-medium text-white/75">{statusConfig.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="group"
      >
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">QR Delegate Pass</p>
          <h2 className="mt-1 text-lg font-bold text-navy">Digital Credentials</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="transition-transform duration-300 group-hover:scale-[1.005] lg:col-span-3">
            {passCard()}
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-navy">Secure Delegate Pass</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate/65">
                    Present this QR code at registration desks, event venues, and security checkpoints throughout the summit.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: Download, label: "Download Pass" },
                { icon: Printer, label: "Print Pass" },
                { icon: Maximize2, label: "Open Full Screen", action: () => setFullscreen(true) },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-xs font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </button>
              ))}
            </div>

            <Link
              href="/portal/schedule"
              className="flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              <QrCode className="h-4 w-4" />
              View Schedule with Pass
            </Link>
          </div>
        </div>
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {fullscreen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 h-dvh w-screen bg-navy-dark/80 backdrop-blur-sm"
                onClick={() => setFullscreen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-100 flex h-dvh w-screen items-center justify-center p-4"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFullscreen(false)}
                    className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-lg"
                    aria-label="Close full screen pass"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {passCard(true)}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
