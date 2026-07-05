"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { Panel } from "./shared";
import type { RegistrationProgressStep } from "@/types/delegate-registration";
import { formatRegistrationDate } from "@/services/delegateRegistration";

interface RegistrationProgressTimelineProps {
  steps: RegistrationProgressStep[];
}

export default function RegistrationProgressTimeline({ steps }: RegistrationProgressTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Panel>
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
          Progress Timeline
        </p>
        <ol className="relative space-y-0">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            const isCompleted = step.state === "completed";
            const isCurrent = step.state === "current";

            return (
              <li key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className={`absolute left-[15px] top-8 h-[calc(100%-8px)] w-0.5 ${
                      isCompleted ? "bg-emerald-300" : "bg-gray-200"
                    }`}
                  />
                )}

                <div className="relative z-1 shrink-0">
                  {isCompleted ? (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 300 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm"
                    >
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </motion.span>
                  ) : isCurrent ? (
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/40 opacity-60" />
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-gold/15">
                        <Circle className="h-3 w-3 fill-gold text-gold" />
                      </span>
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white">
                      <Circle className="h-3 w-3 text-gray-300" />
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className={`text-sm font-semibold ${isCompleted || isCurrent ? "text-navy" : "text-slate/50"}`}>
                    {step.label}
                  </p>
                  {step.completed_at && (
                    <p className="mt-0.5 text-xs text-slate/55">
                      Completed {formatRegistrationDate(step.completed_at)}
                    </p>
                  )}
                  {isCurrent && (
                    <p className="mt-1 text-xs font-medium text-gold">In progress</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Panel>
    </motion.div>
  );
}
