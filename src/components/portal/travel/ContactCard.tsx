"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { TravelPanel } from "./TravelPanel";

interface ContactCardProps {
  eyebrow: string;
  name: string;
  role: string;
  unit?: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  extra?: string;
  delay?: number;
  initials: string;
  badgeColor?: string;
  className?: string;
}

export default function ContactCard({
  eyebrow,
  name,
  role,
  unit,
  phone,
  whatsapp,
  email,
  extra,
  delay = 0,
  initials,
  badgeColor = "bg-navy",
  className = "",
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={className}
    >
      <TravelPanel>
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>

        <div className="flex items-start gap-4">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${badgeColor} text-lg font-bold text-white shadow-md`}>
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-navy">{name}</p>
            <p className="text-xs font-medium text-gold">{role}</p>
            {unit && <p className="mt-0.5 text-xs text-slate/60">{unit}</p>}
            {extra && (
              <span className="mt-1.5 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                {extra}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className={`flex items-center justify-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 ${!whatsapp ? "col-span-2" : ""}`}
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-navy transition-colors hover:border-gold/30 hover:bg-gold/5"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>
      </TravelPanel>
    </motion.div>
  );
}
