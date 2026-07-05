"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Radio } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getProgrammeWithStatus } from "@/services/delegateFleetReview";

const STATUS_STYLES = {
  completed: {
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    line: "bg-emerald-300",
    text: "text-slate/50",
    badge: "bg-emerald-50 text-emerald-700",
    label: "Done",
  },
  current: {
    icon: Radio,
    dot: "bg-gold animate-pulse",
    line: "bg-gold/40",
    text: "text-navy font-semibold",
    badge: "bg-gold/15 text-gold",
    label: "Now",
  },
  upcoming: {
    icon: Circle,
    dot: "bg-gray-200",
    line: "bg-gray-100",
    text: "text-slate/70",
    badge: "bg-gray-50 text-slate/50",
    label: "Upcoming",
  },
};

export default function FleetProgramme() {
  const programme = getProgrammeWithStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Complete timeline for Fleet Review Day — 17 February 2027">
          Today&apos;s Fleet Programme
        </FleetSectionLabel>

        <div className="relative">
          {programme.map((item, i) => {
            const status = item.status ?? "upcoming";
            const style = STATUS_STYLES[status];
            const Icon = style.icon;
            const isLast = i === programme.length - 1;

            return (
              <motion.div
                key={item.time + item.activity}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                {!isLast && (
                  <div
                    className={`absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 ${style.line}`}
                    aria-hidden="true"
                  />
                )}

                <div className="relative z-10 shrink-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white shadow-sm ${
                      status === "current" ? "bg-gold" : status === "completed" ? "bg-emerald-500" : "bg-white"
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        status === "current" ? "text-navy" : status === "completed" ? "text-white" : "text-slate/30"
                      }`}
                      strokeWidth={status === "upcoming" ? 1.5 : 2.5}
                    />
                  </div>
                </div>

                <div
                  className={`min-w-0 flex-1 rounded-xl border px-4 py-3 transition-all ${
                    status === "current"
                      ? "border-gold/40 bg-gold/5 shadow-sm"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-bold text-gold">{item.time}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm leading-snug ${style.text}`}>{item.activity}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
