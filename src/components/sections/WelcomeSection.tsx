"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Welcome to CGGS 2027
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4 leading-tight">
              India Welcomes the World&apos;s Coast Guards
            </h2>
            <div className="h-0.5 w-16 bg-gold mb-6" />
            <p className="text-base text-slate leading-relaxed mb-4">
              The 5th Coast Guard Global Summit is the premier international forum
              for coast guard cooperation, hosted for the first time in South Asia
              by the Indian Coast Guard under the Ministry of Defence, Government of India.
            </p>
            <p className="text-base text-slate leading-relaxed mb-8">
              Bringing together Heads of Delegations from over 115 nations, CGGS 2027
              will chart the course of global maritime safety, environmental protection,
              and interoperability for the next decade — all while celebrating the
              Indian Coast Guard&apos;s Golden Jubilee.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/about-cggs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white text-sm font-medium rounded-sm hover:bg-navy-mid transition-colors"
              >
                Know More About CGGS
              </Link>
              <Link
                href="/about-icg"
                className="inline-flex items-center gap-2 px-6 py-3 border border-navy text-navy text-sm font-medium rounded-sm hover:bg-cream transition-colors"
              >
                About Indian Coast Guard
              </Link>
            </div>
          </motion.div>

          {/* Feature blocks */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                icon: "⚓",
                title: "Maritime Safety",
                desc: "Advancing global M-SAR and emergency response frameworks",
              },
              {
                icon: "🌊",
                title: "Blue Environment",
                desc: "Protecting the world's oceans through coordinated action",
              },
              {
                icon: "🤝",
                title: "Diplomacy",
                desc: "Bilateral and multilateral coast guard cooperation",
              },
              {
                icon: "🛡",
                title: "Law Enforcement",
                desc: "Combating piracy, trafficking and IUU fishing",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-sm bg-cream border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <p className="text-2xl mb-3">{item.icon}</p>
                <h3 className="text-sm font-bold text-navy mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
