"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home, Ship } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface EventHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundClass?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  imageObjectPosition?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function EventHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  backgroundClass = "gradient-navy",
  backgroundImage,
  backgroundImageAlt,
  imageObjectPosition = "center 30%",
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  badge,
  children,
}: EventHeroProps) {
  const hasBanner = Boolean(backgroundImage);

  return (
    <section
      className={`relative flex flex-col overflow-hidden pt-16 ${
        hasBanner
          ? "min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]"
          : backgroundClass
      }`}
      aria-label="Page hero"
    >
      {hasBanner && backgroundImage ? (
        <>
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt ?? title}
            fill
            className="object-cover sm:object-right"
            style={{ objectPosition: imageObjectPosition }}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-navy/75 via-navy/50 to-transparent lg:from-navy/65" />
          <div className="absolute inset-0 bg-linear-to-t from-navy/45 via-transparent to-navy/15" />
        </>
      ) : (
        <>
          {/* Animated maritime grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(197,160,40,1) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,40,1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-gold/5 blur-[80px]" />
          </div>

          {/* Ship watermark — right side, blended into background */}
          <div
            className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 hidden sm:block"
            aria-hidden="true"
          >
            <Ship
              className="h-36 w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 text-white opacity-[0.05]"
              strokeWidth={0.75}
            />
          </div>

          {/* Decorative wave at bottom */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
            <svg
              viewBox="0 0 1440 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,64 L0,64 Z"
                fill="white"
                fillOpacity="0.03"
              />
            </svg>
          </div>
        </>
      )}

      <div
        className={`relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6 ${
          hasBanner
            ? "justify-between pb-12 pt-6"
            : "pb-8 pt-6"
        }`}
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className={hasBanner ? "relative z-10 shrink-0" : "mb-6"}
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-white/50">
            <li>
              <Link href="/" className="flex items-center gap-1.5 hover:text-gold transition-colors">
                <Home className="h-3 w-3 shrink-0" />
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3 shrink-0 text-white/30" aria-hidden="true" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </motion.nav>

        <div className={hasBanner ? "max-w-2xl shrink-0 text-left" : undefined}>
        {/* Badge */}
        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2"
          >
            <span className="inline-block h-px w-8 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {badge}
            </span>
            <span className="inline-block h-px w-8 bg-gold" />
          </motion.div>
        )}

        {/* Eyebrow */}
        {eyebrow && !badge && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          >
            {eyebrow}
          </motion.p>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl max-w-3xl"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        {(ctaLabel || secondaryCtaLabel) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {ctaLabel && ctaHref && (
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-navy hover:bg-gold-light transition-colors"
              >
                {ctaLabel}
              </Link>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-sm border border-white/30 px-6 py-3 text-sm font-medium text-white/80 hover:border-white/60 hover:text-white transition-colors"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </motion.div>
        )}

        {/* Extra content slot */}
        {children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6"
          >
            {children}
          </motion.div>
        )}
        </div>
      </div>

      {hasBanner && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 overflow-hidden">
          <svg
            viewBox="0 0 1440 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,40 1440,32 L1440,64 L0,64 Z"
              fill="white"
              fillOpacity="0.08"
            />
          </svg>
        </div>
      )}
    </section>
  );
}
