"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DelegateSidebar from "./DelegateSidebar";
import DelegateTopbar from "./DelegateTopbar";

export default function DelegateShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer automatically on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Restore collapse preference.
  useEffect(() => {
    const stored = localStorage.getItem("cggs_sidebar_collapsed");
    if (stored === "1") setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("cggs_sidebar_collapsed", next ? "1" : "0");
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8]">
      <DelegateSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DelegateTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
