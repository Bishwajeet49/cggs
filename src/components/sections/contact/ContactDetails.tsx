"use client";

import { motion } from "framer-motion";
import { ExternalLink, Mail, Phone, Printer, Radio } from "lucide-react";
import type {
  ContactAddress,
  ContactChannel,
  ContactDepartment,
  ContactEmail,
  ContactOrganizer,
} from "@/types/contact";

interface Props {
  address: ContactAddress;
  organizer: ContactOrganizer;
  channels: ContactChannel[];
  emails: ContactEmail[];
  departments: ContactDepartment[];
  sourceNote: string;
}

const ICON_MAP = {
  phone: Phone,
  radio: Radio,
  fax: Printer,
  mail: Mail,
  clock: Phone,
} as const;

export default function ContactDetails({
  address,
  organizer,
  channels,
  emails,
  departments,
  sourceNote,
}: Props) {
  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">
              Location
            </p>
            <h2 className="text-xl font-bold text-navy mb-1">{organizer.name}</h2>
            <p className="text-xs text-slate mb-4 font-medium">{organizer.name_tamil}</p>

            <div className="overflow-hidden rounded-sm border border-navy/10 shadow-sm">
              <iframe
                title={`Map — ${address.title}`}
                src={address.map_embed_url}
                className="h-52 w-full sm:h-60"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="mt-3 space-y-1 text-sm text-slate">
              <p>{address.line1}</p>
              <p>{address.line2}</p>
              <p>
                {address.city}, {address.state} {address.pincode}
              </p>
              <p className="text-xs text-slate/70">Plus Code: {address.plus_code}</p>
            </div>

            <a
              href={address.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-light transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View on Google Maps
            </a>
          </motion.div>

          {/* Channels & emails */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3 space-y-6"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                Direct Lines
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {channels.map((ch, i) => {
                  const Icon = ICON_MAP[ch.icon];
                  return (
                    <motion.div
                      key={ch.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex items-start gap-3 rounded-sm border border-navy/8 bg-white p-3 hover:border-gold/25 transition-colors"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-navy/5">
                        <Icon className="h-3.5 w-3.5 text-navy" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">
                          {ch.label}
                        </p>
                        {ch.href ? (
                          <a
                            href={ch.href}
                            className="text-sm font-semibold text-navy hover:text-gold transition-colors"
                          >
                            {ch.value}
                          </a>
                        ) : (
                          <p className="text-sm font-semibold text-navy">{ch.value}</p>
                        )}
                        <p className="text-[11px] text-slate">{ch.note}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                Official Email
              </p>
              <div className="space-y-2">
                {emails.map((email, i) => (
                  <motion.a
                    key={email.id}
                    href={email.href}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="flex items-center justify-between gap-3 rounded-sm border border-navy/8 bg-white px-3 py-2.5 hover:border-gold/25 transition-colors group"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate">
                        {email.label}
                      </p>
                      <p className="text-sm font-medium text-navy group-hover:text-gold transition-colors">
                        {email.address}
                      </p>
                    </div>
                    <Mail className="h-3.5 w-3.5 shrink-0 text-slate/40 group-hover:text-gold transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                Key Departments
              </p>
              <div className="divide-y divide-navy/5 rounded-sm border border-navy/8 bg-white">
                {departments.map((dept, i) => (
                  <motion.div
                    key={dept.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-navy">{dept.name}</p>
                      <p className="text-xs text-slate">{dept.contact}</p>
                    </div>
                    <a
                      href={dept.href}
                      className="text-sm font-mono font-medium text-gold hover:text-gold-light transition-colors shrink-0"
                    >
                      {dept.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-slate/70 border-t border-navy/5 pt-4">
              {sourceNote}
              {" "}
              <a
                href={organizer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                Official ICG (East) contact page
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
