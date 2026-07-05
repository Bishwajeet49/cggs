"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Panel } from "./shared";
import { getRegistrationProgressPercent } from "@/services/delegateRegistration";

interface RegistrationStatusCardProps {
  checklist: { id: string; label: string; completed: boolean }[];
  estimatedApproval: string;
}

export default function RegistrationStatusCard({
  checklist,
  estimatedApproval,
}: RegistrationStatusCardProps) {
  const progress = getRegistrationProgressPercent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <Panel className="relative overflow-hidden border-gold/20 bg-linear-to-br from-white to-gold/5">
        <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gold/5 blur-2xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Registration Progress</p>
            <h2 className="mt-1 text-lg font-bold text-navy sm:text-xl">Approval Pipeline</h2>

            <ul className="mt-4 space-y-2.5">
              {checklist.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.04 }}
                  className="flex items-center gap-2.5"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0 text-slate/30" strokeWidth={2} />
                  )}
                  <span className={`text-sm ${item.completed ? "font-medium text-navy" : "text-slate/60"}`}>
                    {item.label}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="w-full shrink-0 lg:max-w-xs">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-navy">Overall Progress</span>
                <span className="font-bold text-gold">{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full bg-linear-to-r from-gold to-gold-dark"
                />
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div>
                  <p className="text-xs font-semibold text-amber-800">Estimated Timeline</p>
                  <p className="mt-0.5 text-xs text-amber-700/80">{estimatedApproval}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </motion.div>
  );
}
