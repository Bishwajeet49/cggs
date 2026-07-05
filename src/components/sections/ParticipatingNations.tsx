"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Country } from "@/types/common";

interface Props {
  countries: Country[];
  total: number;
}

export default function ParticipatingNations({ countries, total }: Props) {
  return (
    <section className="bg-[#F0F4F8] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
            {total}+ Nations
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Participating Countries
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto" />
          <p className="mt-4 text-sm text-slate max-w-xl mx-auto">
            Coast guard agencies and delegations from across Asia, Europe, the
            Americas, Africa, and Oceania
          </p>
        </motion.div>

        {/* Host / Secretariat highlight */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {countries
            .filter((c) => c.role === "host" || c.role === "secretariat")
            .map((c) => (
              <div
                key={c.country_id}
                className="flex items-center gap-3 bg-white border border-gold/30 rounded-sm px-5 py-3 shadow-sm"
              >
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <p className="text-sm font-bold text-navy">{c.name}</p>
                  <p className="text-[10px] text-gold uppercase tracking-wider">
                    {c.role === "host" ? "Host Nation" : "Secretariat"}
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Nations grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {countries
            .filter((c) => c.role !== "host" && c.role !== "secretariat")
            .map((country, i) => (
              <motion.div
                key={country.country_id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="group flex flex-col items-center gap-1 p-3 rounded-sm bg-white border border-gray-100 hover:border-gold/30 hover:shadow-sm transition-all cursor-default"
                title={country.name}
              >
                <span className="text-2xl sm:text-3xl">{country.flag}</span>
                <p className="text-[10px] text-slate text-center max-w-[60px] leading-tight group-hover:text-navy transition-colors">
                  {country.name}
                </p>
              </motion.div>
            ))}

          {/* +more placeholder */}
          <div className="flex flex-col items-center justify-center gap-1 p-3 rounded-sm bg-navy border border-navy-mid text-white w-[84px]">
            <span className="text-2xl font-bold text-gold">+{total - countries.length}</span>
            <p className="text-[10px] text-white/60 text-center">More nations</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/fleet-review"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-mid transition-colors"
          >
            View Fleet Review →
          </Link>
        </div>
      </div>
    </section>
  );
}
