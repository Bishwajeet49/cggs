"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ship, Users } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getFleetCountries } from "@/services/delegateFleetReview";
import type { FleetCountryDetail } from "@/types/delegate-fleet-review";

function NationCard({ nation, onClick }: { nation: FleetCountryDetail; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group w-full rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:border-gold/30 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{nation.flag}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">{nation.name}</p>
          <p className="mt-0.5 text-[11px] text-slate/55 line-clamp-1">{nation.coast_guard_name}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-4">
        <div className="flex items-center gap-1.5">
          <Ship className="h-3.5 w-3.5 text-gold" />
          <span className="text-xs font-semibold text-navy">{nation.ships_participating}</span>
          <span className="text-[10px] text-slate/50">ships</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-gold" />
          <span className="text-xs font-semibold text-navy">{nation.delegates}</span>
          <span className="text-[10px] text-slate/50">delegates</span>
        </div>
      </div>
    </motion.button>
  );
}

function NationDrawer({ nation, onClose }: { nation: FleetCountryDetail; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 h-dvh w-screen bg-navy-dark/60 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.28 }}
          className="fixed top-0 right-0 z-100 flex h-dvh w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label={nation.name}
        >
          <div className="shrink-0 border-b border-gray-100 bg-navy p-5 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-4xl">{nation.flag}</span>
                <h2 className="mt-2 text-xl font-bold">{nation.name}</h2>
                <p className="text-sm text-white/60">{nation.coast_guard_name}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <p className="text-sm leading-relaxed text-slate/75">{nation.description}</p>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold">Participating Ships</p>
              <div className="space-y-2">
                {nation.ships.map((s) => (
                  <div key={s} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-cream/40 px-3 py-2">
                    <Ship className="h-3.5 w-3.5 text-gold" />
                    <span className="text-sm font-medium text-navy">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold">Representatives</p>
              <div className="space-y-2">
                {nation.representatives.map((r) => (
                  <div key={r.name} className="rounded-lg border border-gray-100 px-3 py-2.5">
                    <p className="text-sm font-semibold text-navy">{r.name}</p>
                    <p className="text-xs text-slate/55">{r.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      </>
    </AnimatePresence>,
    document.body
  );
}

export default function ParticipatingNations() {
  const nations = getFleetCountries();
  const [selected, setSelected] = useState<FleetCountryDetail | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <FleetPanel>
          <FleetSectionLabel subtitle={`${nations.length} nations participating in ICGFR 2027`}>
            Participating Nations
          </FleetSectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {nations.map((nation, i) => (
              <motion.div
                key={nation.country_id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <NationCard nation={nation} onClick={() => setSelected(nation)} />
              </motion.div>
            ))}
          </div>
        </FleetPanel>
      </motion.div>

      {selected && <NationDrawer nation={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
