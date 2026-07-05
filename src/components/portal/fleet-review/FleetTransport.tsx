"use client";

import { motion } from "framer-motion";
import { Car, Clock, MapPin, Phone, Navigation, User } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetTransport() {
  const transport = getDelegateFleetReview().transport;
  const driverInitials = transport.driver_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Your assigned shuttle to the Fleet Review viewing area">
          Transportation
        </FleetSectionLabel>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gold">Assigned Pickup</p>
            <p className="mt-1 text-lg font-bold text-navy">{transport.assigned_pickup}</p>
            <div className="mt-4 space-y-3">
              {[
                { icon: Car, label: "Vehicle", value: `${transport.vehicle} · ${transport.vehicle_number}` },
                { icon: Clock, label: "Reporting Time", value: transport.reporting_time },
                { icon: MapPin, label: "Pickup Point", value: transport.pickup_point },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate/50">{label}</p>
                    <p className="text-sm font-semibold text-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-lg font-bold text-white">
                {driverInitials}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-gold" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">Driver</p>
                </div>
                <p className="text-base font-bold text-navy">{transport.driver_name}</p>
                <a
                  href={`tel:${transport.driver_phone.replace(/\s/g, "")}`}
                  className="mt-1 inline-flex items-center gap-1.5 text-sm text-gold hover:underline"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {transport.driver_phone}
                </a>
              </div>
            </div>

            <a
              href={transport.navigation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Navigation className="h-4 w-4" />
              Navigate to Pickup Point
            </a>
          </div>
        </div>
      </FleetPanel>
    </motion.div>
  );
}
