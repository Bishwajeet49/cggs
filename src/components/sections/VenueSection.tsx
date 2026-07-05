"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Building2, Navigation, Plane } from "lucide-react";

const venueDetails = [
  {
    icon: Building2,
    title: "Principal Venue",
    desc: "ITC Grand Chola, Chennai — Rajendra Chola Hall, Grand Ballrooms",
  },
  {
    icon: Navigation,
    title: "Fleet Review Location",
    desc: "Chennai Port Trust & Marina Coastal Waters, Bay of Bengal",
  },
  {
    icon: Plane,
    title: "Nearest Airport",
    desc: "Chennai International Airport (MAA) — 15 km from venue",
  },
  {
    icon: MapPin,
    title: "Coast Guard HQ",
    desc: "Indian Coast Guard Eastern Regional HQ, Egmore, Chennai",
  },
];

export default function VenueSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            Host City
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Chennai, India
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto mb-4" />
          <p className="text-base text-slate max-w-2xl mx-auto">
            The Gateway of South India — home to the Indian Coast Guard Eastern Regional
            Headquarters and the iconic Marina Beach, the world&apos;s second-longest urban beach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-navy/5 border border-gray-100">
              {/* Stylised map placeholder */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #E8F4F8 0%, #C8DFF0 50%, #A8C8E8 100%)",
                }}
              >
                <div className="text-6xl mb-4">🗺</div>
                <p className="text-sm font-semibold text-navy">Chennai, Tamil Nadu</p>
                <p className="text-xs text-slate mt-1">13.0827° N, 80.2707° E</p>
                <div className="mt-4 px-4 py-2 bg-navy text-white text-xs font-medium rounded-sm">
                  ⚓ ITC Grand Chola · Marina Beach
                </div>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=ITC+Grand+Chola+Chennai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-xs text-slate hover:text-gold transition-colors"
            >
              <MapPin className="h-3.5 w-3.5" />
              Open in Google Maps →
            </a>
          </motion.div>

          {/* Venue details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {venueDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.title}
                  className="flex items-start gap-4 p-4 rounded-sm border border-gray-100 hover:border-gold/20 transition-colors"
                >
                  <div className="h-10 w-10 rounded-sm bg-navy/5 border border-navy/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-navy" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{detail.title}</p>
                    <p className="text-sm text-slate mt-0.5">{detail.desc}</p>
                  </div>
                </div>
              );
            })}

            <div className="mt-6">
              <Link
                href="/accommodation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-mid transition-colors"
              >
                Accommodation & Travel →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
