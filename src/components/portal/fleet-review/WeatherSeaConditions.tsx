"use client";

import { motion } from "framer-motion";
import {
  Cloud, Wind, Droplets, Waves, Eye, Sunrise, Sunset, Thermometer,
} from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getFleetWeather } from "@/services/delegateFleetReview";

export default function WeatherSeaConditions() {
  const w = getFleetWeather();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel className="overflow-hidden">
        <FleetSectionLabel subtitle={`Updated ${w.updated_at} · ${w.location}`}>
          Weather &amp; Sea Conditions
        </FleetSectionLabel>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Main weather card */}
          <div className="rounded-xl bg-linear-to-br from-sky-500 to-blue-600 p-5 text-white lg:col-span-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/60">Temperature</p>
                <p className="mt-1 text-5xl font-light">
                  {w.temperature_c}<span className="text-2xl">°C</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
                  <Cloud className="h-4 w-4" />
                  {w.condition}
                </p>
              </div>
              <Thermometer className="h-8 w-8 text-white/30" />
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3 lg:col-span-2 sm:grid-cols-3">
            {[
              { icon: Wind, label: "Wind Speed", value: `${w.wind_speed_kmh} km/h` },
              { icon: Droplets, label: "Humidity", value: `${w.humidity_percent}%` },
              { icon: Waves, label: "Sea State", value: `State ${w.sea_state}` },
              { icon: Eye, label: "Visibility", value: w.visibility.split("—")[0].trim() },
              { icon: Sunrise, label: "Sunrise", value: w.sunrise },
              { icon: Sunset, label: "Sunset", value: w.sunset },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="rounded-xl border border-gray-100 bg-cream/40 p-3">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate/50">{label}</p>
                </div>
                <p className="mt-1.5 text-sm font-bold text-navy">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-teal-200/60 bg-teal-50/50 px-4 py-3">
          <p className="text-xs font-semibold text-teal-800">Sea State {w.sea_state} — {w.sea_state_label}</p>
          <p className="mt-0.5 text-[11px] text-teal-700/70">Conditions favourable for Fleet Review proceedings.</p>
        </div>
      </FleetPanel>
    </motion.div>
  );
}
