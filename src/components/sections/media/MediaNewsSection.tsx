"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { NewsItem } from "@/types/common";

interface Props {
  news: NewsItem[];
}

export default function MediaNewsSection({ news }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="bg-white py-20" aria-labelledby="media-news-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeader
            eyebrow="News & Press"
            title="Press Releases & Updates"
            subtitle="Official announcements and press coverage from CGGS summits — including scraped content from Japan Coast Guard and CGGS Secretariat sources."
          />
        </motion.div>

        <div className="space-y-4">
          {news.map((item, i) => {
            const isExpanded = expandedId === item.news_id;
            return (
              <motion.article
                key={item.news_id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="overflow-hidden rounded-sm border border-gray-100 bg-white shadow-sm hover:border-gold/20 transition-colors"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : item.news_id)
                  }
                  className="flex w-full items-start gap-4 p-4 sm:p-5 text-left"
                  aria-expanded={isExpanded}
                >
                  <div className="relative hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-navy/5">
                    <Image
                      src={item.thumbnail}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gold">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate">
                        {new Date(item.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-navy leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate transition-transform mt-1 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 px-4 pb-5 sm:px-5 sm:pl-[8.5rem]">
                        <p className="pt-4 text-sm text-slate leading-relaxed">
                          {item.content}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span className="text-xs text-slate">
                            By {item.author}
                          </span>
                          {item.source_url && (
                            <a
                              href={item.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-navy hover:text-gold transition-colors"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                              View Source
                            </a>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-sm bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-navy/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
