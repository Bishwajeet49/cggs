"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Ship, Navigation, Gauge, Users, Wind, ChevronLeft, ChevronRight, Images,
} from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getFleetShips } from "@/services/delegateFleetReview";
import type { FleetShipDetail } from "@/types/delegate-fleet-review";

function ShipCard({ ship, onClick }: { ship: FleetShipDetail; onClick: () => void }) {
  const hasImage = ship.gallery.length > 0;

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`group w-full overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-all hover:shadow-lg ${
        ship.highlight ? "border-gold" : "border-gray-100 hover:border-gold/30"
      }`}
    >
      <div className="relative h-36 bg-linear-to-br from-navy to-navy-mid">
        {hasImage ? (
          <Image
            src={ship.gallery[0].url}
            alt={ship.name}
            fill
            className="object-cover opacity-80"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Ship className="h-12 w-12 text-gold/40" />
          </div>
        )}
        {ship.highlight && (
          <span className="absolute top-3 right-3 rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold uppercase text-navy">
            Flagship
          </span>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-navy/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gold/80">{ship.country}</p>
          <h3 className="text-base font-bold text-white group-hover:text-gold transition-colors">{ship.name}</h3>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-slate/55">{ship.class}</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { label: "Length", value: `${ship.length_m}m` },
            { label: "Disp.", value: `${(ship.displacement_tonnes / 1000).toFixed(1)}k t` },
            { label: "Crew", value: String(ship.crew) },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-md bg-cream/60 px-2 py-1.5 text-center">
              <p className="text-[9px] uppercase text-slate/45">{label}</p>
              <p className="text-xs font-semibold text-navy">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-slate/60 line-clamp-1">{ship.mission}</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-navy/5 px-2 py-1 text-[10px] font-semibold text-navy">View Details</span>
          {ship.gallery.length > 0 && (
            <span className="flex items-center gap-1 rounded-md bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold">
              <Images className="h-3 w-3" /> Gallery
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}

function ShipDrawer({ ship, onClose }: { ship: FleetShipDetail; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);

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

  const gallery = ship.gallery;

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
          className="fixed top-0 right-0 z-100 flex h-dvh w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label={ship.name}
        >
          <div className="relative shrink-0 bg-navy p-5 text-white">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {ship.highlight && (
              <span className="mb-2 inline-block rounded-full bg-gold px-2 py-0.5 text-[9px] font-bold uppercase text-navy">
                Flagship
              </span>
            )}
            <h2 className="text-xl font-bold">{ship.name}</h2>
            <p className="text-sm text-white/60">{ship.class} · {ship.country}</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {gallery.length > 0 && (
              <div className="relative h-48 overflow-hidden rounded-xl">
                <Image
                  src={gallery[galleryIdx].url}
                  alt={gallery[galleryIdx].caption}
                  fill
                  className="object-cover"
                  sizes="512px"
                />
                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setGalleryIdx((i) => (i - 1 + gallery.length) % gallery.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-1.5 text-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGalleryIdx((i) => (i + 1) % gallery.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-navy/70 p-1.5 text-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <p className="absolute bottom-0 left-0 right-0 bg-navy/70 px-3 py-2 text-xs text-white">
                  {gallery[galleryIdx].caption}
                </p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-slate/75">{ship.description}</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Gauge, label: "Type", value: ship.type },
                { icon: Users, label: "Crew", value: `${ship.crew} personnel` },
                { icon: Navigation, label: "Length", value: `${ship.length_m} m` },
                { icon: Wind, label: "Displacement", value: `${ship.displacement_tonnes.toLocaleString()} t` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-lg bg-cream/50 p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon className="h-3 w-3 text-gold" />
                    <p className="text-[10px] uppercase tracking-wider text-slate/50">{label}</p>
                  </div>
                  <p className="text-sm font-semibold text-navy">{value}</p>
                </div>
              ))}
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold">Capabilities</p>
              <div className="flex flex-wrap gap-1.5">
                {ship.capabilities.map((c) => (
                  <span key={c} className="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1 text-[11px] font-medium text-navy">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-navy/3 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-slate/50">Mission</p>
              <p className="mt-0.5 text-sm font-medium text-navy">{ship.mission}</p>
            </div>
          </div>
        </motion.aside>
      </>
    </AnimatePresence>,
    document.body
  );
}

export default function ParticipatingShips() {
  const ships = getFleetShips();
  const [selected, setSelected] = useState<FleetShipDetail | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <FleetPanel>
          <FleetSectionLabel subtitle={`${ships.length} featured vessels — tap for specifications and gallery`}>
            Participating Ships
          </FleetSectionLabel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ships.map((ship, i) => (
              <motion.div
                key={ship.ship_id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <ShipCard ship={ship} onClick={() => setSelected(ship)} />
              </motion.div>
            ))}
          </div>
        </FleetPanel>
      </motion.div>

      {selected && <ShipDrawer ship={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
