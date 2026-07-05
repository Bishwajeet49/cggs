import type { Metadata } from "next";
import DelegateShell from "@/components/layout/DelegateShell";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Delegate Portal",
    template: `%s | ${siteConfig.shortName} Portal`,
  },
  description: `Secure delegate portal for ${siteConfig.name} — manage schedule, travel, events, and registration.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DelegateShell>{children}</DelegateShell>;
}
