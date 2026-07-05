"use client";

import { motion } from "framer-motion";
import { Download, FileText, Calendar, Lock } from "lucide-react";
import { Panel } from "./shared";
import type { RegistrationDownload } from "@/types/delegate-registration";

const FORMAT_ICONS: Record<string, typeof FileText> = {
  PDF: FileText,
  ICS: Calendar,
};

interface DownloadsSectionProps {
  downloads: RegistrationDownload[];
}

export default function DownloadsSection({ downloads }: DownloadsSectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
      <Panel>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Downloads</p>
          <h2 className="mt-1 text-lg font-bold text-navy">Registration Documents</h2>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item, i) => {
            const Icon = FORMAT_ICONS[item.format] ?? FileText;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.03 }}
              >
                <button
                  type="button"
                  disabled={!item.available}
                  className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    item.available
                      ? "border-gray-100 bg-gray-50/50 hover:-translate-y-0.5 hover:border-gold/25 hover:bg-gold/5 hover:shadow-sm"
                      : "cursor-not-allowed border-gray-100 bg-gray-50/30 opacity-60"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    item.available ? "bg-navy/8 text-navy group-hover:bg-gold/15 group-hover:text-gold-dark" : "bg-gray-100 text-slate/40"
                  }`}>
                    {item.available ? <Icon className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-navy">{item.label}</span>
                    <span className="mt-0.5 block truncate text-xs text-slate/55">
                      {item.format} · {item.size_kb} KB
                    </span>
                  </span>
                  {item.available && (
                    <Download className="h-4 w-4 shrink-0 text-slate/30 transition-colors group-hover:text-gold" />
                  )}
                </button>
              </motion.li>
            );
          })}
        </ul>
      </Panel>
    </motion.div>
  );
}
