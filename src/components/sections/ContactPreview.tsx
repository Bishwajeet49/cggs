"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactPreview() {
  return (
    <section className="gradient-navy py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              CGGS 2027 Secretariat
            </h2>
            <div className="h-0.5 w-16 bg-gold mb-6" />
            <p className="text-base text-white/60 mb-8">
              For all enquiries regarding delegate registration, official invitations,
              media accreditation, and logistics, contact the CGGS 2027 Secretariat.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy text-sm font-bold rounded-sm hover:bg-gold-light transition-colors"
            >
              Contact Secretariat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            {[
              {
                icon: MapPin,
                title: "Address",
                value:
                  "Eastern Regional HQ, Indian Coast Guard, Egmore, Chennai 600008",
              },
              {
                icon: Mail,
                title: "Email",
                value: "secretariat@cggs2027.in",
                href: "mailto:secretariat@cggs2027.in",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+91-44-2345-6789",
                href: "tel:+914423456789",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-sm hover:bg-white/8 transition-colors"
                >
                  <div className="h-9 w-9 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm text-white hover:text-gold transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white/80">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
