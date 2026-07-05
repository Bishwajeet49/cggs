"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { QrCode, Shield, Clock } from "lucide-react";
import QRCodeDisplay from "@/components/registration/QRCodeDisplay";

interface DelegatePassWidgetProps {
  fullName: string;
  initials: string;
  categoryLabel: string;
  category: string;
  country?: string;
  countryFlag?: string;
  organization?: string;
  delegateId: string;
  registrationNumber: string;
  categoryRaw: string;
  profilePhotoUrl?: string;
}

export default function DelegatePassWidget({
  fullName,
  initials,
  categoryLabel,
  category,
  country,
  countryFlag,
  organization,
  delegateId,
  registrationNumber,
  categoryRaw,
  profilePhotoUrl,
}: DelegatePassWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden rounded-2xl bg-navy shadow-lg"
    >
      {/* Security guilloche pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, transparent 0, rgba(201,168,76,0.4) 1px, transparent 2px), repeating-radial-gradient(circle at 100% 100%, transparent 0, rgba(255,255,255,0.3) 1px, transparent 2px)",
          backgroundSize: "18px 18px, 22px 22px",
        }}
      />

      {/* Hologram shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(201,168,76,0.5) 45%, rgba(255,255,255,0.3) 50%, rgba(201,168,76,0.5) 55%, transparent 70%)",
          backgroundSize: "200% 200%",
          animation: "pass-shimmer 6s ease-in-out infinite",
        }}
      />

      <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      {/* Header */}
      <div className="relative px-5 pt-5 pb-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">
              Official Delegate Pass
            </p>
            <p className="mt-0.5 text-[9px] text-white/35">Republic of India · Ministry of Defence</p>
          </div>
          {countryFlag && (
            <span className="text-2xl leading-none" title={country} aria-hidden="true">
              {countryFlag}
            </span>
          )}
        </div>

        {/* Photo + identity */}
        <div className="mt-4 flex items-start gap-3.5">
          {/* Profile photo frame */}
          <div className="relative shrink-0">
            <div className="flex h-[72px] w-[56px] items-center justify-center overflow-hidden rounded-md border-2 border-gold/50 bg-navy-mid shadow-inner">
              {profilePhotoUrl ? (
                <Image
                  src={profilePhotoUrl}
                  alt={fullName}
                  width={56}
                  height={72}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <span className="text-xl font-bold text-gold">{initials}</span>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold/40 bg-navy-dark">
              <Shield className="h-2.5 w-2.5 text-gold" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-white">{fullName}</p>
            <span
              className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                category === "head_of_delegation"
                  ? "bg-gold text-navy"
                  : "border border-white/20 text-white/70"
              }`}
            >
              {categoryLabel}
            </span>
            {organization && (
              <p className="mt-1.5 truncate text-[11px] text-white/50">{organization}</p>
            )}
            {country && (
              <p className="mt-0.5 text-[11px] text-white/35">{country}</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            <p className="text-[8px] uppercase tracking-[0.15em] text-white/30">Delegate ID</p>
            <p className="mt-0.5 font-mono text-xs font-bold tracking-wide text-gold">{delegateId}</p>
          </div>
          <div className="text-right">
            <p className="text-[8px] uppercase tracking-[0.15em] text-white/30">CGGS</p>
            <p className="mt-0.5 text-xs font-semibold text-white/55">2027</p>
          </div>
        </div>
      </div>

      {/* QR + status */}
      <div className="relative border-t border-white/10 bg-white/6 px-5 py-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <QRCodeDisplay
              delegateId={delegateId}
              registrationNumber={registrationNumber}
              name={fullName}
              category={categoryRaw}
              country={country ?? ""}
              organization={organization ?? ""}
              size={80}
              className="gap-0 [&>div]:border-0 [&>div]:p-1.5 [&>div]:shadow-none [&>p]:hidden"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[8px] uppercase tracking-[0.15em] text-white/30">Registration No.</p>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/65">
              {registrationNumber}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-amber-400" />
              <p className="text-[10px] font-medium text-amber-400">Pending Verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="relative grid grid-cols-2 gap-2 border-t border-white/10 px-5 py-3">
        <Link
          href="/portal/registration"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-gold/25 bg-gold/10 py-2 text-[11px] font-semibold text-gold transition-colors hover:bg-gold/20"
        >
          <QrCode className="h-3.5 w-3.5" />
          View Pass
        </Link>
        <Link
          href="/portal/registration"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 py-2 text-[11px] font-semibold text-white/65 transition-colors hover:border-white/25 hover:text-white"
        >
          <Clock className="h-3.5 w-3.5" />
          Download
        </Link>
      </div>
    </motion.div>
  );
}
