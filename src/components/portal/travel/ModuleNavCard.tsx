"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface ModuleNavCardProps {
  direction: "next" | "prev";
  label: string;
  href: string;
  description: string;
  delay?: number;
}

export default function ModuleNavCard({ direction, label, href, description, delay = 0 }: ModuleNavCardProps) {
  const isNext = direction === "next";
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link
        href={href}
        className={`group flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
          isNext
            ? "border-navy/15 bg-navy text-white hover:bg-navy-dark"
            : "border-gray-100 bg-white hover:border-gold/25"
        }`}
      >
        <div className="min-w-0">
          <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isNext ? "text-gold" : "text-gold"}`}>
            {isNext ? "Next Step" : "Previous"}
          </p>
          <p className={`mt-0.5 text-sm font-bold ${isNext ? "text-white" : "text-navy"}`}>{label}</p>
          <p className={`mt-0.5 text-xs ${isNext ? "text-white/55" : "text-slate/55"}`}>{description}</p>
        </div>
        {isNext ? (
          <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
        ) : (
          <ArrowLeft className="h-5 w-5 shrink-0 text-slate/40 transition-transform group-hover:-translate-x-1" />
        )}
      </Link>
    </motion.div>
  );
}
