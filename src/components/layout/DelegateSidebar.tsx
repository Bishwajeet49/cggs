"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LogOut,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { delegateNavGroups } from "./delegateNav";
import { useAuth } from "@/context/AuthContext";
import DelegateAvatar from "@/components/auth/DelegateAvatar";
import { getCategoryLabel, getFullName } from "@/services/demoAuth";

interface SidebarContentProps {
  collapsed: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}

function SidebarContent({ collapsed, onNavigate, onClose, onToggleCollapse }: SidebarContentProps) {
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const { user } = useAuth();

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className={`flex items-center justify-between gap-2 border-b border-white/10 ${collapsed ? "px-3 py-5" : "px-5 py-5"}`}>
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/logos/5h_cggs_summit_logo.png"
            alt="CGGS 2027"
            width={48}
            height={48}
            className="h-11 w-11 shrink-0 object-contain"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold uppercase tracking-[0.12em] text-gold leading-tight">
                CGGS 2027
              </p>
              <p className="truncate text-xs text-white/50 mt-0.5">Delegate Portal</p>
            </div>
          )}
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 text-white/50 hover:text-gold transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Delegate badge */}
      <div className={`mx-3 my-3 rounded-sm border border-white/10 bg-white/5 ${collapsed ? "p-2" : "p-3"}`}>
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center" : ""}`}>
          <DelegateAvatar user={user} size="sm" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-white">
                {user ? getFullName(user) : "Delegate"}
              </p>
              <p className="truncate text-[10px] text-white/40">
                {user ? getCategoryLabel(user.category) : "Official Delegate"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2">
        {delegateNavGroups.map((group, gi) => (
          <div key={gi} className="mb-1">
            {group.group && !collapsed && (
              <button
                onClick={() => toggleGroup(group.group!)}
                className="flex w-full items-center justify-between px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-gold/60 hover:text-gold/90 transition-colors"
              >
                <span className="truncate">{group.group}</span>
                <ChevronDown
                  className={`h-3 w-3 shrink-0 transition-transform ${
                    collapsedGroups.includes(group.group) ? "-rotate-90" : ""
                  }`}
                />
              </button>
            )}
            {group.group && collapsed && (
              <div className="mx-4 my-2 border-t border-white/10" />
            )}
            {(collapsed || !collapsedGroups.includes(group.group ?? "")) && (
              <div>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 ${
                        collapsed ? "justify-center px-0" : ""
                      } ${
                        active
                          ? "text-gold bg-gold/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {/* Gold left border slide-in on hover */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-gold transition-all duration-200 ${
                          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                          active ? "text-gold" : "group-hover:scale-110 group-hover:text-gold/80"
                        }`}
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {active && !collapsed && (
                        <span aria-hidden="true" className="absolute right-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-gold" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      {onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          className={`hidden lg:flex items-center gap-2.5 border-t border-white/10 px-4 py-3 text-xs text-white/40 hover:text-gold transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          {!collapsed && "Collapse"}
        </button>
      )}

      {/* Logout */}
      <div className={`border-t border-white/10 p-4 ${onToggleCollapse ? "lg:hidden" : ""}`}>
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-sm text-white/40 hover:text-white/70 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Exit Portal" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Exit Portal"}
        </Link>
      </div>
    </div>
  );
}

interface DelegateSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function DelegateSidebar({
  mobileOpen,
  onMobileClose,
  collapsed,
  onToggleCollapse,
}: DelegateSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden shrink-0 border-r border-white/10 bg-navy-dark transition-[width] duration-300 ease-in-out lg:flex lg:flex-col ${
          collapsed ? "lg:w-[76px]" : "lg:w-64"
        }`}
      >
        <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-navy-dark/70 backdrop-blur-sm lg:hidden"
              onClick={onMobileClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-white/10 bg-navy-dark lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Delegate portal navigation"
            >
              <SidebarContent collapsed={false} onNavigate={onMobileClose} onClose={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
