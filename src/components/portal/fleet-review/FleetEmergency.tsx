"use client";

import { motion } from "framer-motion";
import ContactCard from "@/components/portal/travel/ContactCard";
import { FleetSectionLabel } from "./shared";
import { getDelegateFleetReview } from "@/services/delegateFleetReview";

export default function FleetEmergency() {
  const contacts = getDelegateFleetReview().emergency_contacts;

  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <FleetSectionLabel subtitle="Help desk, medical, transport and liaison contacts for Fleet Review Day">
        Help &amp; Emergency
      </FleetSectionLabel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((c, i) => (
          <ContactCard
            key={c.id}
            eyebrow={c.unit}
            name={c.name}
            role={c.role}
            phone={c.phone}
            whatsapp={c.whatsapp}
            email={c.email}
            initials={initials(c.name)}
            delay={i * 0.06}
            badgeColor={i === 0 ? "bg-navy" : i === 2 ? "bg-red-600" : "bg-navy-mid"}
          />
        ))}
      </div>
    </motion.div>
  );
}
