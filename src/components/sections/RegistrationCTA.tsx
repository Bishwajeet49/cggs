"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, CheckCircle } from "lucide-react";

const categories = [
  "Head of Delegation",
  "Official Delegate",
  "Observer",
  "Media Representative",
];

export default function RegistrationCTA() {
  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#0D2154" }}>
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C5A028 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C5A028 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <UserPlus className="h-7 w-7 text-gold" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-4">
            Delegate Registration
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Be Part of the 5th Coast Guard Global Summit
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            Register as an official delegate to access the full CGGS 2027 experience —
            Fleet Review, Seminar, Official Events, and personalised delegate services.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-sm text-white/70"
              >
                <CheckCircle className="h-3.5 w-3.5 text-gold" />
                {cat}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-navy text-sm font-bold rounded-sm hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              <UserPlus className="h-4 w-4" />
              Register as Delegate
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium rounded-sm hover:border-white hover:bg-white/10 transition-colors"
            >
              Already Registered? Login →
            </Link>
          </div>

          <p className="mt-8 text-xs text-white/30">
            Registration closes 30 days before the summit.
            All registrations are subject to approval by the CGGS Secretariat.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
