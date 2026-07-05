"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  {
    value: 115,
    suffix: "+",
    label: "Participating Nations",
    sub: "From every ocean region",
    icon: "🌐",
    glow: "rgba(90,163,245,0.15)",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Global Delegates",
    sub: "Coast guard leaders & officials",
    icon: "👥",
    glow: "rgba(197,160,40,0.12)",
  },
  {
    value: 40,
    suffix: "+",
    label: "Ships in Review",
    sub: "Bay of Bengal, Chennai",
    icon: "⛵",
    glow: "rgba(90,163,245,0.15)",
  },
  {
    value: 18,
    suffix: "+",
    label: "Sessions & Events",
    sub: "Plenary, seminar, bilateral",
    icon: "📋",
    glow: "rgba(197,160,40,0.12)",
  },
  {
    value: 25,
    suffix: "+",
    label: "International Speakers",
    sub: "Maritime & security experts",
    icon: "🎙",
    glow: "rgba(90,163,245,0.15)",
  },
  {
    value: 50,
    suffix: "+",
    label: "Global Partnerships",
    sub: "Bilateral & multilateral MOUs",
    icon: "🤝",
    glow: "rgba(197,160,40,0.12)",
  },
];

function Counter({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      /* Ease-out expo */
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <>
      <span className="text-5xl sm:text-6xl font-black text-white tabular-nums leading-none">
        {count}
      </span>
      <span className="text-3xl sm:text-4xl font-black text-gold leading-none">{suffix}</span>
    </>
  );
}

export default function SummitStatistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #06111E 0%, #0D2154 50%, #06111E 100%)" }}
      aria-label="Summit statistics"
    >
      {/* Radial glow behind stats */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(13,33,84,0.8) 0%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-3">
            Summit at a Glance
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            The Scale of CGGS 2027
          </h2>
          <div className="h-0.5 w-16 bg-gold mx-auto" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group flex flex-col items-center py-10 px-5 text-center rounded-sm border border-white/8 bg-white/4 hover:border-gold/30 hover:bg-white/6 transition-all duration-300 overflow-hidden"
            >
              {/* Per-card glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 80%, ${stat.glow} 0%, transparent 70%)` }}
              />

              {/* Icon */}
              <span className="text-4xl mb-5 leading-none">{stat.icon}</span>

              {/* Animated number */}
              <div className="flex items-end gap-0.5 mb-3">
                <Counter target={stat.value} suffix={stat.suffix} started={inView} />
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-white/80 leading-tight mb-1">{stat.label}</p>
              <p className="text-[11px] text-white/35">{stat.sub}</p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gold/30 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
