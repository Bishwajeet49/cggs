"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { MediaPageInfo } from "@/types/common";

interface Props {
  info: MediaPageInfo;
}

export default function MediaSourcesSection({ info }: Props) {
  return (
    <section
      className="border-t border-navy/10 bg-gray-50 py-16"
      aria-labelledby="media-sources-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Official Sources
          </p>
          <h2
            id="media-sources-heading"
            className="mb-4 text-2xl font-bold text-navy sm:text-3xl"
          >
            Media Attribution
          </h2>
          <div className="h-0.5 w-16 bg-gold mb-6" />
          <p className="max-w-3xl text-sm text-slate leading-relaxed mb-8">
            {info.intro}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {info.sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-sm border border-navy/10 bg-white p-5 hover:border-gold/30 hover:shadow-sm transition-all"
              >
                <ExternalLink className="h-4 w-4 shrink-0 text-gold mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-navy group-hover:text-gold transition-colors">
                    {source.name}
                  </p>
                  <p className="mt-1 text-xs text-slate leading-relaxed">
                    {source.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
