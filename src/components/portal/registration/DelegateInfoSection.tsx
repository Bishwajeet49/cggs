"use client";

import { motion } from "framer-motion";
import { Pencil, Shield, Mail, Phone, Hash, Lock } from "lucide-react";
import { Panel, getInitials } from "./shared";
import type { RegistrationDelegate } from "@/types/delegate-registration";
import { CATEGORY_LABELS } from "@/services/delegateRegistration";

interface DelegateInfoSectionProps {
  delegate: RegistrationDelegate;
  editable: boolean;
  countryFlag?: string;
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="border-b border-gray-50 py-3 last:border-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{label}</p>
      <p className={`mt-0.5 text-sm text-navy ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

export default function DelegateInfoSection({ delegate, editable, countryFlag }: DelegateInfoSectionProps) {
  const fullName = `${delegate.first_name} ${delegate.last_name}`.trim();
  const initials = getInitials(delegate.first_name, delegate.last_name);
  const categoryLabel = CATEGORY_LABELS[delegate.category] ?? "Official Delegate";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
      <Panel>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Delegate Information</p>
            <h2 className="mt-1 text-lg font-bold text-navy">Personal &amp; Official Details</h2>
          </div>
          {editable ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-dark transition-colors hover:bg-gold/20"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Information
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-slate/60">
              <Lock className="h-3.5 w-3.5" />
              Read-only after approval
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex shrink-0 flex-col items-center gap-3 lg:items-start">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-2 border-gold/40 bg-navy/5 shadow-inner">
                <span className="text-2xl font-bold text-gold">{initials}</span>
              </div>
              {countryFlag && (
                <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-base shadow-md">
                  {countryFlag}
                </span>
              )}
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
              delegate.category === "head_of_delegation" ? "bg-gold text-navy" : "bg-navy/8 text-navy"
            }`}>
              <Shield className="h-3 w-3" />
              {categoryLabel}
            </span>
          </div>

          <div className="min-w-0 flex-1 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            <InfoRow label="Full Name" value={fullName} />
            <InfoRow label="Country" value={delegate.country} />
            <InfoRow label="Organization" value={delegate.organization} />
            <InfoRow label="Rank / Designation" value={delegate.rank_designation} />
            <InfoRow label="Passport Number" value={delegate.passport_number_masked} mono />
            <InfoRow label="Registration Number" value={delegate.registration_number} mono />
            <div className="border-b border-gray-50 py-3 sm:col-span-2 last:border-0">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                <Mail className="h-3 w-3" /> Email
              </p>
              <p className="mt-0.5 text-sm text-navy">{delegate.email}</p>
            </div>
            <div className="border-b border-gray-50 py-3 sm:col-span-2 last:border-0">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                <Phone className="h-3 w-3" /> Phone Number
              </p>
              <p className="mt-0.5 text-sm text-navy">{delegate.phone}</p>
            </div>
            <div className="py-3 sm:col-span-2">
              <p className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                <Hash className="h-3 w-3" /> Delegate ID
              </p>
              <p className="mt-0.5 font-mono text-sm font-semibold text-gold">{delegate.delegate_id}</p>
            </div>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}
