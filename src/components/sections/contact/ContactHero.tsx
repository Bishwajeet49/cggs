"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, MessageCircle } from "lucide-react";
import type { ContactPageInfo } from "@/types/contact";

interface Props {
  info: ContactPageInfo;
}

export default function ContactHero({ info }: Props) {
  return (
    <section
      className="relative overflow-hidden pt-16 gradient-navy"
      aria-label="Contact page hero"
    >
      {/* Animated grid */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Gold glow */}
      <div
        className="pointer-events-none absolute -right-20 top-8 h-64 w-64 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C5A028 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-white/50">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-gold transition-colors">
                <Home className="h-3.5 w-3.5" />
                Home
              </Link>
            </li>
            <ChevronRight className="h-3 w-3 text-white/30" aria-hidden="true" />
            <li className="text-gold font-medium">{info.title}</li>
          </ol>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1"
          >
            <MessageCircle className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              {info.eyebrow}
            </span>
          </motion.div>

          <h1 className="text-3xl font-bold text-white sm:text-4xl">{info.title}</h1>
          <div className="mt-3 h-0.5 w-14 bg-gold" />
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">{info.subtitle}</p>
        </motion.div>
      </div>
    </section>
  );
}
