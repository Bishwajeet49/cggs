"use client";

import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { FleetPanel, FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetDownloads() {
  const downloads = getDelegateFleetReview().downloads;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetPanel>
        <FleetSectionLabel subtitle="Official Fleet Review documents and reference materials">
          Downloads
        </FleetSectionLabel>

        <div className="space-y-2">
          {downloads.map((dl, i) => (
            <motion.button
              key={dl.id}
              type="button"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-100 bg-white px-4 py-3 text-left transition-all hover:border-gold/30 hover:bg-gold/3 hover:shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/5 group-hover:bg-gold/10 transition-colors">
                <FileText className="h-5 w-5 text-navy group-hover:text-gold transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-navy">{dl.title}</p>
                <p className="text-xs text-slate/55 line-clamp-1">{dl.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-slate/60">
                  {dl.file_type} · {dl.size}
                </span>
                <Download className="mt-1.5 ml-auto h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.button>
          ))}
        </div>
      </FleetPanel>
    </motion.div>
  );
}
