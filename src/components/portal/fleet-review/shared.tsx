import type { ReactNode } from "react";

export function FleetPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-gray-100/80 bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

export function FleetSectionLabel({
  children,
  subtitle,
  action,
}: {
  children: ReactNode;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
          <span aria-hidden="true" className="h-3.5 w-0.5 shrink-0 rounded-full bg-gold" />
          {children}
        </h2>
        {action}
      </div>
      {subtitle && <p className="mt-1.5 text-sm text-slate/65">{subtitle}</p>}
    </div>
  );
}

export function FleetStatusBadge({
  dot,
  label,
  badge,
}: {
  dot: string;
  label: string;
  badge: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${badge}`}>
      <span className={`h-2 w-2 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}
