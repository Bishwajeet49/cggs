"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Plane,
  Hotel,
  Car,
  Ship,
  Presentation,
  UtensilsCrossed,
  Store,
  Download,
  Bell,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    items: [
      { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
      { label: "My Schedule", href: "/portal/schedule", icon: CalendarDays },
      { label: "My Registration", href: "/portal/registration", icon: CreditCard },
    ],
  },
  {
    group: "Travel & Stay",
    items: [
      { label: "Arrival & Departure", href: "/portal/travel/arrival", icon: Plane },
      { label: "Accommodation", href: "/portal/travel/accommodation", icon: Hotel },
      { label: "Transport", href: "/portal/travel/transport", icon: Car },
    ],
  },
  {
    group: "Event Hub",
    items: [
      { label: "Fleet Review", href: "/portal/events/fleet-review", icon: Ship },
      { label: "Seminar", href: "/portal/events/seminar", icon: Presentation },
      { label: "Official Events", href: "/portal/events/official", icon: UtensilsCrossed },
      { label: "Exhibition Village", href: "/portal/events/village", icon: Store },
    ],
  },
  {
    items: [
      { label: "Downloads", href: "/portal/downloads", icon: Download },
      { label: "Notifications", href: "/portal/notifications", icon: Bell },
      { label: "Profile", href: "/portal/profile", icon: User },
    ],
  },
];

export default function DelegateSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const toggleGroup = (group: string) => {
    setCollapsed((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  return (
    <aside className="w-60 shrink-0 bg-navy-dark border-r border-white/10 flex flex-col">
      {/* Brand */}
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logos/5h_cggs_summit_logo.png"
            alt="CGGS 2027"
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-gold leading-none">
              CGGS 2027
            </p>
            <p className="text-[9px] text-white/40 mt-0.5">Delegate Portal</p>
          </div>
        </Link>
      </div>

      {/* Delegate badge */}
      <div className="mx-3 my-3 p-3 rounded-sm bg-white/5 border border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <User className="h-4 w-4 text-gold" />
          </div>
          <div>
            <p className="text-xs font-semibold text-white">Delegate</p>
            <p className="text-[10px] text-white/40">Official Delegate</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navGroups.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.group && (
              <button
                onClick={() => toggleGroup(group.group!)}
                className="flex w-full items-center justify-between px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold/60 hover:text-gold/90 transition-colors"
              >
                {group.group}
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    collapsed.includes(group.group) ? "-rotate-90" : ""
                  }`}
                />
              </button>
            )}
            {!collapsed.includes(group.group ?? "") && (
              <div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        active
                          ? "text-gold bg-gold/10 border-r-2 border-gold"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Exit Portal
        </Link>
      </div>
    </aside>
  );
}
