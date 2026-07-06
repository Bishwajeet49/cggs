"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import type { ContactSecretariat } from "@/types/contact";

interface Props {
  secretariat: ContactSecretariat;
  topics: string[];
}

export default function ContactEnquiryForm({ secretariat, topics }: Props) {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-sm border border-navy/10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left panel */}
            <div className="gradient-navy p-6 sm:p-8 lg:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">
                Enquiry Form
              </p>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{secretariat.name}</h2>
              <div className="mt-2 h-0.5 w-12 bg-gold" />
              <p className="mt-4 text-sm leading-relaxed text-white/60">{secretariat.description}</p>
              <p className="mt-6 text-xs text-white/40">
                Phase 1 prototype — form submissions are not yet connected to a backend.
              </p>
            </div>

            {/* Form */}
            <form
              className="space-y-4 p-6 sm:p-8 lg:col-span-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact enquiry form"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-navy">
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-sm border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-navy">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@organisation.gov"
                    className="w-full rounded-sm border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-org" className="mb-1.5 block text-xs font-semibold text-navy">
                    Organisation
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    placeholder="Coast Guard / Agency name"
                    className="w-full rounded-sm border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-topic" className="mb-1.5 block text-xs font-semibold text-navy">
                    Enquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    defaultValue=""
                    className="w-full rounded-sm border border-navy/15 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors bg-white"
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-navy">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Describe your enquiry..."
                  className="w-full resize-none rounded-sm border border-navy/15 px-3 py-2.5 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30 transition-colors"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center gap-2 rounded-sm bg-gold px-6 py-3 text-sm font-bold text-navy hover:bg-gold-light transition-colors"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Send Enquiry
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
