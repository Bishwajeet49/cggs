import Link from "next/link";
import { CalendarDays, Anchor, Presentation, Mail, Clock } from "lucide-react";

export default function ScheduleEmptyState() {
  return (
    <div className="mx-auto max-w-2xl py-8 text-center sm:py-12">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
        <Clock className="h-8 w-8 text-gold" strokeWidth={1.5} />
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Awaiting Approval
      </p>
      <h2 className="text-2xl font-bold text-navy sm:text-3xl">
        Your Personalised Schedule
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate">
        Your personalised schedule will become available once your registration is approved
        by the CGGS Secretariat.
      </p>
      <p className="mt-2 text-sm text-slate/70">Until then, you can explore:</p>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { icon: CalendarDays, label: "Official Summit Schedule", href: "/schedule", desc: "View the full 3-day programme" },
          { icon: Anchor, label: "Explore Fleet Review", href: "/fleet-review", desc: "ICGFR 2027 details" },
          { icon: Presentation, label: "Seminar Programme", href: "/seminar", desc: "World Coast Guard Seminar" },
          { icon: Mail, label: "Contact Secretariat", href: "/contact", desc: "Questions about your registration" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold/25 hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy transition-colors group-hover:bg-gold/15 group-hover:text-gold-dark">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy group-hover:text-gold">{item.label}</span>
                <span className="mt-0.5 block text-xs text-slate/60">{item.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
