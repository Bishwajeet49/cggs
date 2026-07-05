"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partnerGroups = [
  {
    label: "Government of India",
    partners: [
      { name: "Ministry of Defence", logo: "/logos/Ministry-of-defence-logo.png" },
      { name: "Indian Coast Guard", logo: "/logos/Indian-navy-logo.png" },
      { name: "5th CGGS 2027", logo: "/logos/5h_cggs_summit_logo.png" },
    ],
  },
];

export default function Partners() {
  return (
    <section className="bg-[#F0F4F8] py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-2">
            Under the Aegis of
          </p>
          <h2 className="text-2xl font-bold text-navy">Official Bodies</h2>
          <div className="h-0.5 w-12 bg-gold mx-auto mt-3" />
        </motion.div>

        {partnerGroups.map((group) => (
          <div key={group.label} className="mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate text-center mb-6">
              {group.label}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {group.partners.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="h-16 w-16 relative flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={64}
                      height={64}
                      className="object-contain max-h-16 w-auto filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <p className="text-[10px] text-slate text-center font-medium">{partner.name}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Supporting orgs placeholder */}
        <div className="mt-4 border border-dashed border-gray-200 rounded-sm p-8 text-center">
          <p className="text-xs text-slate/50 uppercase tracking-widest">
            Supporting International Organisations — To Be Announced
          </p>
        </div>
      </div>
    </section>
  );
}
