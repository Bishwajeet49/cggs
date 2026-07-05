"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu } from "lucide-react";
import { getPageTitle } from "./delegateNav";
import { useAuth } from "@/context/AuthContext";
import DelegateAvatar from "@/components/auth/DelegateAvatar";
import { getCategoryLabel, getFullName } from "@/services/demoAuth";
import { getCountryByName } from "@/services/countries";

interface DelegateTopbarProps {
  onMenuClick: () => void;
}

export default function DelegateTopbar({ onMenuClick }: DelegateTopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const pageTitle = getPageTitle(pathname);
  const delegateName = user ? getFullName(user) : "";
  const categoryLabel = user ? getCategoryLabel(user.category) : "";
  const countryData = user?.country ? getCountryByName(user.country) : undefined;

  const handleExit = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="-ml-1 shrink-0 rounded-sm p-1.5 text-navy hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.15em] text-navy">
            {pageTitle}
          </p>
          <p className="hidden truncate text-xs text-slate sm:block">
            CGGS 2027 · Chennai, India
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <Link
          href="/portal/notifications"
          className="relative rounded-sm p-2 text-slate hover:text-navy hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold" />
        </Link>

        <Link
          href="/portal/profile"
          className="hidden items-center gap-2 rounded-sm border border-gray-200 py-1.5 pl-1.5 pr-3 text-xs text-navy hover:border-gray-300 hover:bg-gray-50 transition-colors sm:flex"
        >
          <DelegateAvatar user={user} size="xs" />
          <span className="max-w-[160px] truncate">
            <span className="block truncate font-medium">{delegateName || "Delegate"}</span>
            {categoryLabel && (
              <span className="block truncate text-[10px] text-slate/55">{categoryLabel}</span>
            )}
          </span>
          {countryData && (
            <span className="text-sm" title={countryData.name}>{countryData.flag}</span>
          )}
        </Link>

        <button
          type="button"
          onClick={handleExit}
          className="flex items-center gap-2 rounded-sm border border-gray-200 px-2.5 py-1.5 text-xs text-slate hover:text-navy hover:bg-gray-50 transition-colors sm:px-3"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
