"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { IcgHistoryMilestone } from "@/types/icg";

interface Props {
  history: IcgHistoryMilestone[];
}

function MilestoneCard({ milestone, index }: { milestone: IcgHistoryMilestone; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "start 45%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className={`relative flex flex-col gap-6 lg:flex-row lg:items-start ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <div className={`flex-1 ${milestone.image_url ? "lg:max-w-[55%]" : "lg:max-w-full"}`}>
        <div className="flex items-start gap-4">
          <div
            className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              milestone.highlight
                ? "bg-gold text-navy shadow-lg shadow-gold/20"
                : "border border-gold/30 bg-white/5 text-gold"
            }`}
          >
            {milestone.year.length > 4 ? milestone.year.slice(0, 4) : milestone.year}
          </div>
          <div>
            <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold/60">
              {milestone.year}
            </p>
            <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{milestone.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{milestone.description}</p>
          </div>
        </div>
      </div>

      {/* Optional image */}
      {milestone.image_url && (
        <div className="relative aspect-video flex-1 overflow-hidden rounded-sm border border-white/10 lg:max-w-[45%]">
          <Image
            src={milestone.image_url}
            alt={milestone.image_alt ?? milestone.title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
        </div>
      )}
    </motion.div>
  );
}

export default function IcgHistoryTimeline({ history }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="icg-history"
      className="relative overflow-hidden bg-navy-dark py-24"
      aria-labelledby="icg-history-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,33,84,0.3) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Our Journey
          </p>
          <h2 id="icg-history-heading" className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Five Decades of Maritime Service
          </h2>
          <div className="mb-4 h-0.5 w-16 bg-gold" />
          <p className="max-w-2xl text-base leading-relaxed text-white/55">
            From the Rustamji Committee&apos;s vision to hosting the 5th Coast Guard Global
            Summit — the story of India&apos;s dedicated maritime armed force.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-white/10">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-gold"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          <div className="space-y-16 pl-16">
            {history.map((milestone, i) => (
              <MilestoneCard key={milestone.id} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
