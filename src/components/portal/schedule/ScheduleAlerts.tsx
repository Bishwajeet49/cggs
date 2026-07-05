"use client";

import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, PlusCircle, XCircle } from "lucide-react";
import type { ScheduleAlert } from "@/types/delegate-schedule";

const ALERT_ICONS = {
  schedule_change: AlertTriangle,
  venue_change: MapPin,
  time_update: Clock,
  cancelled: XCircle,
  new_session: PlusCircle,
} as const;

const ALERT_COLORS = {
  schedule_change: "border-amber-200 bg-amber-50 text-amber-800",
  venue_change: "border-blue-200 bg-blue-50 text-blue-800",
  time_update: "border-orange-200 bg-orange-50 text-orange-800",
  cancelled: "border-red-200 bg-red-50 text-red-800",
  new_session: "border-emerald-200 bg-emerald-50 text-emerald-800",
} as const;

interface ScheduleAlertsProps {
  alerts: ScheduleAlert[];
}

export default function ScheduleAlerts({ alerts }: ScheduleAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-navy">Schedule Updates</p>
      {alerts.map((alert, i) => {
        const Icon = ALERT_ICONS[alert.type] ?? AlertTriangle;
        const colors = ALERT_COLORS[alert.type] ?? ALERT_COLORS.schedule_change;
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`flex items-start gap-3 rounded-xl border p-3.5 ${colors}`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{alert.title}</p>
              <p className="mt-0.5 text-xs opacity-80">{alert.message}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
