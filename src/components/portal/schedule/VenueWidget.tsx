import Link from "next/link";
import { MapPin, Navigation, Building2 } from "lucide-react";
import type { CurrentVenue } from "@/types/delegate-schedule";

interface VenueWidgetProps {
  venue: CurrentVenue;
}

export default function VenueWidget({ venue }: VenueWidgetProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy">Current Venue</p>

      {/* Mini map placeholder */}
      <div className="relative mb-3 flex h-28 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-linear-to-br from-navy/5 to-blue-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,33,84,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(13,33,84,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative flex flex-col items-center gap-1">
          <MapPin className="h-6 w-6 text-gold" />
          <p className="text-[10px] font-semibold text-navy/60">ITC Grand Chola · Chennai</p>
        </div>
      </div>

      <p className="flex items-center gap-1.5 text-sm font-semibold text-navy">
        <Building2 className="h-4 w-4 text-gold" />
        {venue.hall}
      </p>
      <p className="mt-1 text-xs text-slate/60">{venue.name} · {venue.floor}</p>
      <p className="mt-2 text-xs text-slate/50">{venue.walking_time_minutes} min walk from registration desk</p>

      <Link
        href={venue.directions_url}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-navy/15 bg-navy/5 py-2 text-xs font-semibold text-navy transition-colors hover:bg-navy/10"
      >
        <Navigation className="h-3.5 w-3.5 text-gold" />
        Get Directions
      </Link>
    </div>
  );
}
