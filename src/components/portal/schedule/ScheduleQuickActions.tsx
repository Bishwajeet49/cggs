import Link from "next/link";
import {
  QrCode, Download, CalendarPlus, Mail, Phone, Car,
} from "lucide-react";

interface ScheduleQuickActionsProps {
  onExportCalendar: () => void;
  onPrint: () => void;
}

export default function ScheduleQuickActions({
  onExportCalendar,
  onPrint,
}: ScheduleQuickActionsProps) {
  const actions = [
    { icon: QrCode, label: "View QR Pass", href: "/portal/registration", onClick: undefined },
    { icon: Download, label: "Export Calendar", href: undefined, onClick: onExportCalendar },
    { icon: CalendarPlus, label: "Print Schedule", href: undefined, onClick: onPrint },
    { icon: Mail, label: "Contact Secretariat", href: "/contact", onClick: undefined },
    { icon: Phone, label: "Emergency Contacts", href: "/contact", onClick: undefined },
    { icon: Car, label: "Transport Details", href: "/portal/travel/transport", onClick: undefined },
  ];

  return (
    <div className="rounded-2xl border border-navy/8 bg-navy/3 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Quick Actions</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;
          const className =
            "group flex flex-col items-center gap-2 rounded-xl border border-white/80 bg-white p-3 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-md";

          if (action.onClick) {
            return (
              <button key={action.label} type="button" onClick={action.onClick} className={className}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/8 text-navy group-hover:bg-gold/15 group-hover:text-gold-dark">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-semibold text-navy group-hover:text-gold">{action.label}</span>
              </button>
            );
          }

          return (
            <Link key={action.label} href={action.href!} className={className}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/8 text-navy group-hover:bg-gold/15 group-hover:text-gold-dark">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[10px] font-semibold text-navy group-hover:text-gold">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
