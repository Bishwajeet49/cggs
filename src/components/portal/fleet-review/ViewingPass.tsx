"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, QrCode, Bell, Maximize2, X, Shield, MapPin, Clock, DoorOpen } from "lucide-react";
import QRCodeDisplay from "@/components/registration/QRCodeDisplay";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function ViewingPass() {
  const { viewing_pass: pass } = getDelegateFleetReview();
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (fullscreen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [fullscreen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const passCard = (large = false) => (
    <div className={`relative overflow-hidden rounded-2xl bg-navy shadow-xl ${large ? "max-w-md w-full" : ""}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 0 0, transparent 0, rgba(201,168,76,0.4) 1px, transparent 2px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-[2px] bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="relative p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-gold">Fleet Review Viewing Pass</p>
            <p className="mt-0.5 text-[9px] text-white/35">ICGFR 2027 · Chennai Port Trust</p>
          </div>
          <span className="text-2xl">⚓</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {[
            { icon: MapPin, label: "Viewing Zone", value: pass.viewing_zone },
            { icon: DoorOpen, label: "Seat", value: pass.seat_number },
            { icon: Clock, label: "Reporting Time", value: pass.reporting_time },
            { icon: Shield, label: "Security", value: pass.security_level },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-lg bg-white/6 px-3 py-2">
              <div className="flex items-center gap-1">
                <Icon className="h-3 w-3 text-gold/70" />
                <p className="text-[9px] uppercase tracking-wider text-white/40">{label}</p>
              </div>
              <p className="mt-0.5 text-xs font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[10px] text-white/40">
          Entry Gate: <span className="font-semibold text-white/70">{pass.entry_gate}</span>
        </p>

        <div className="mt-5 flex flex-col items-center gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-start">
          <QRCodeDisplay
            delegateId={pass.qr_delegate_id}
            registrationNumber={pass.qr_registration_number}
            name="Fleet Review Delegate"
            category="official_delegate"
            country="Delegate Nation"
            organization="CGGS 2027"
            size={large ? 160 : 110}
            className="gap-0 [&>div]:border-0 [&>div]:p-2 [&>div]:shadow-none [&>p]:hidden"
          />
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/35">Pass ID</p>
            <p className="font-mono text-sm font-bold text-gold">{pass.qr_delegate_id}</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/35">Gate Access</p>
            <p className="text-xs text-white/65">{pass.entry_gate}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
      >
        <FleetSectionLabel subtitle="Your assigned viewing arrangement for the Fleet Review ceremony">
          Delegate Viewing Pass
        </FleetSectionLabel>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="transition-transform duration-300 hover:scale-[1.005] lg:col-span-3">
            {passCard()}
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2">
            <FleetPanel>
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-navy">Mandatory at Entry</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate/65">
                    Present this pass at Gate 3 along with your summit delegate credentials. Arrive 30 minutes before reporting time.
                  </p>
                </div>
              </div>
            </FleetPanel>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: Download, label: "Download Pass" },
                { icon: QrCode, label: "Open QR", action: () => setFullscreen(true) },
                { icon: Bell, label: "Add Reminder" },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-xs font-semibold text-navy shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-md"
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {fullscreen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 h-dvh w-screen bg-navy-dark/80 backdrop-blur-sm"
                onClick={() => setFullscreen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-100 flex h-dvh w-screen items-center justify-center p-4"
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFullscreen(false)}
                    className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-navy shadow-lg"
                    aria-label="Close QR view"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {passCard(true)}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
