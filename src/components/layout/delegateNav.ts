import {
  LayoutDashboard,
  CalendarDays,
  CreditCard,
  Plane,
  Hotel,
  Car,
  Landmark,
  Store,
  Download,
  Bell,
  User,
  type LucideIcon,
} from "lucide-react";

export interface DelegateNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DelegateNavGroup {
  group?: string;
  items: DelegateNavItem[];
}

export const delegateNavGroups: DelegateNavGroup[] = [
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
      { label: "Official Events", href: "/portal/events/official", icon: Landmark },
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

export function getPageTitle(pathname: string): string {
  for (const group of delegateNavGroups) {
    for (const item of group.items) {
      if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
        return item.label;
      }
    }
  }
  return "Delegate Portal";
}
