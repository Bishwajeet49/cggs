"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetFAQs() {
  const faqs = getDelegateFleetReview().faqs;
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Common questions about the Fleet Review experience">
          FAQs
        </FleetSectionLabel>

        <div className="space-y-2">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all ${
                  isOpen ? "border-gold/30 bg-gold/3" : "border-gray-100 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-navy">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-gray-100/80 px-4 py-3 text-sm leading-relaxed text-slate/70">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
