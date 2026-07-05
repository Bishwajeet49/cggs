import Link from "next/link";
import Image from "next/image";
import DelegateSidebar from "@/components/layout/DelegateSidebar";
import { Bell, LogOut } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4F8]">
      {/* Sidebar */}
      <DelegateSidebar />

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Portal Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy">
              Delegate Portal
            </p>
            <p className="text-xs text-slate">CGGS 2027 · Chennai, India</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate hover:text-navy transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-gold" />
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate hover:text-navy transition-colors border border-gray-200 rounded-sm"
            >
              <LogOut className="h-3.5 w-3.5" />
              Exit
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
