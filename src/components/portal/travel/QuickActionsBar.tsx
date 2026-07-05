"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface QuickAction {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "default" | "danger";
}

export default function QuickActionsBar({ actions, delay = 0 }: { actions: QuickAction[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex flex-wrap gap-2"
    >
      {actions.map(({ icon: Icon, label, href, onClick, variant = "default" }) => {
        const cls = {
          primary: "bg-navy text-white hover:opacity-90",
          default: "bg-white border border-gray-200 text-navy hover:border-gold/30 hover:bg-gold/5",
          danger: "bg-red-50 border border-red-200 text-red-700 hover:bg-red-100",
        }[variant];

        const inner = (
          <>
            <Icon className="h-4 w-4 shrink-0" />
            <span className="text-xs font-semibold">{label}</span>
          </>
        );

        if (href) {
          return (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${cls}`}
            >
              {inner}
            </a>
          );
        }

        return (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${cls}`}
          >
            {inner}
          </button>
        );
      })}
    </motion.div>
  );
}
