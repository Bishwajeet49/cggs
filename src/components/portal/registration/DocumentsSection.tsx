"use client";

import { motion } from "framer-motion";
import { FileText, Eye, Download, RefreshCw } from "lucide-react";
import { Panel } from "./shared";
import type { RegistrationDocument } from "@/types/delegate-registration";
import { DOCUMENT_STATUS_STYLES, formatRegistrationDate } from "@/services/delegateRegistration";

interface DocumentsSectionProps {
  documents: RegistrationDocument[];
  editable: boolean;
}

export default function DocumentsSection({ documents, editable }: DocumentsSectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
      <Panel>
        <div className="mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Documents</p>
          <h2 className="mt-1 text-lg font-bold text-navy">Uploaded Credentials</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-[10px] font-semibold uppercase tracking-wider text-slate/50">
                <th className="pb-3 pr-4">Document</th>
                <th className="pb-3 pr-4">Uploaded</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => {
                const statusStyle = DOCUMENT_STATUS_STYLES[doc.status];
                return (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.24 + i * 0.03 }}
                    className="border-b border-gray-50 last:border-0"
                  >
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/6 text-navy">
                          <FileText className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-navy">{doc.label}</p>
                          <p className="text-xs text-slate/50">{doc.file_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-xs text-slate/65">
                      {formatRegistrationDate(doc.uploaded_at)}
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusStyle.className}`}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[10px] font-semibold text-navy transition-colors hover:border-gold/30 hover:bg-gold/5"
                        >
                          <Eye className="h-3 w-3" />
                          Preview
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2 py-1 text-[10px] font-semibold text-navy transition-colors hover:border-gold/30 hover:bg-gold/5"
                        >
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                        {editable && doc.status !== "verified" && (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/10 px-2 py-1 text-[10px] font-semibold text-gold-dark transition-colors hover:bg-gold/20"
                          >
                            <RefreshCw className="h-3 w-3" />
                            Replace
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </motion.div>
  );
}
