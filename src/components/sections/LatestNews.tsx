"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { NewsItem } from "@/types/common";

interface Props {
  news: NewsItem[];
}

export default function LatestNews({ news }: Props) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              News & Updates
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">Latest News</h2>
            <div className="h-0.5 w-16 bg-gold" />
          </div>
          <Link href="/media" className="shrink-0 text-sm font-medium text-navy hover:text-gold transition-colors">
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.news_id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col bg-white rounded-sm border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden bg-navy/5">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-gold text-navy rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-5">
                <p className="text-[11px] text-slate mb-2">
                  {new Date(item.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="text-sm font-bold text-navy mb-2 leading-snug group-hover:text-navy-mid transition-colors line-clamp-3">
                  {item.title}
                </h3>
                <p className="text-xs text-slate leading-relaxed line-clamp-3">
                  {item.summary}
                </p>
              </div>
              <div className="px-5 pb-5">
                <span className="text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                  Read More →
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
