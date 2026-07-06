"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ContactAddress, ContactOrganizer, ContactSecretariat } from "@/types/contact";

interface Props {
  address: ContactAddress;
  organizer: ContactOrganizer;
  secretariat: ContactSecretariat;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.45 },
  }),
};

export default function ContactQuickCards({ address, organizer, secretariat }: Props) {
  const fullAddress = [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.pincode}`,
  ]
    .filter(Boolean)
    .join(", ");

  const cards = [
    {
      icon: MapPin,
      label: "Address",
      value: fullAddress,
      href: address.maps_url,
      linkLabel: "Open in Google Maps",
      accent: "border-gold/20 bg-gold/5",
    },
    {
      icon: Phone,
      label: "CGGS Secretariat",
      value: secretariat.phone,
      href: `tel:${secretariat.phone.replace(/[\s-]/g, "")}`,
      linkLabel: "Call Secretariat",
      accent: "border-navy/10 bg-white",
    },
    {
      icon: Mail,
      label: "Summit Email",
      value: secretariat.email,
      href: `mailto:${secretariat.email}`,
      linkLabel: "Send Email",
      accent: "border-navy/10 bg-white",
    },
    {
      icon: Clock,
      label: "Availability",
      value: organizer.hours,
      sub: secretariat.hours,
      href: null,
      linkLabel: null,
      accent: "border-navy/10 bg-white",
    },
  ];

  return (
    <section className="relative -mt-6 z-10 pb-6">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`rounded-sm border p-4 shadow-md ${card.accent}`}
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm bg-navy/5">
                  <Icon className="h-4 w-4 text-gold" aria-hidden="true" />
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate">
                  {card.label}
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-navy">{card.value}</p>
                {"sub" in card && card.sub ? (
                  <p className="mt-0.5 text-xs text-slate">{card.sub}</p>
                ) : null}
                {card.href && card.linkLabel ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="mt-2 inline-block text-xs font-semibold text-gold hover:text-gold-light transition-colors"
                  >
                    {card.linkLabel} →
                  </a>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
