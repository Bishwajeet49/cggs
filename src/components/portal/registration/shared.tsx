import type { ReactNode } from "react";

export function SectionLabel({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy">
        <span aria-hidden="true" className="h-3.5 w-0.5 shrink-0 rounded-full bg-gold" />
        {children}
      </h2>
      {action}
    </div>
  );
}

export function Panel({
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

export function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0) || ""}`.toUpperCase();
}
