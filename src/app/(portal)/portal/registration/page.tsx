"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getCountryByName } from "@/services/countries";
import {
  getDelegateRegistration,
  canEditRegistration,
  isRegistrationApproved,
  getRegistrationProgressPercent,
} from "@/services/delegateRegistration";
import { SectionLabel } from "@/components/portal/registration/shared";
import RegistrationHero from "@/components/portal/registration/RegistrationHero";
import RegistrationStatusCard from "@/components/portal/registration/RegistrationStatusCard";
import RegistrationProgressTimeline from "@/components/portal/registration/RegistrationProgressTimeline";
import DelegateInfoSection from "@/components/portal/registration/DelegateInfoSection";
import DocumentsSection from "@/components/portal/registration/DocumentsSection";
import QRPassSection from "@/components/portal/registration/QRPassSection";
import DownloadsSection from "@/components/portal/registration/DownloadsSection";
import RegistrationNotifications, {
  RegistrationHelpSection,
  RegistrationReviewBanner,
  RegistrationSummaryStrip,
} from "@/components/portal/registration/RegistrationSupportSections";
import RegistrationPageSkeleton from "@/components/portal/registration/RegistrationPageSkeleton";
import type { RegistrationDelegate } from "@/types/delegate-registration";

function mergeDelegate(authUser: ReturnType<typeof useAuth>["user"], base: RegistrationDelegate): RegistrationDelegate {
  if (!authUser) return base;
  return {
    ...base,
    first_name: authUser.firstName || base.first_name,
    last_name: authUser.lastName || base.last_name,
    delegate_id: authUser.delegateId || base.delegate_id,
    registration_number: authUser.registrationNumber || base.registration_number,
    country: authUser.country || base.country,
    organization: authUser.organization || base.organization,
    category: (authUser.category as RegistrationDelegate["category"]) || base.category,
  };
}

export default function RegistrationPage() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState(authUser);
  const [loading, setLoading] = useState(true);

  const data = getDelegateRegistration();
  const approved = isRegistrationApproved();
  const editable = canEditRegistration();
  const progressPercent = getRegistrationProgressPercent();

  useEffect(() => {
    if (authUser) setUser(authUser);
    else {
      const stored = localStorage.getItem("cggs_auth_user");
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
      }
    }
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [authUser]);

  const delegate = mergeDelegate(user, data.delegate);
  const countryData = getCountryByName(delegate.country);
  const verifiedDocs = data.documents.filter((d) => d.status === "verified").length;
  const pendingDocs = data.documents.filter((d) => d.status === "pending").length;

  if (loading) {
    return <RegistrationPageSkeleton />;
  }

  return (
    <div className="relative space-y-5 sm:space-y-6">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="pointer-events-none fixed bottom-0 right-0 h-[480px] w-[480px] select-none opacity-[0.028]"
        fill="none" stroke="#0D2154" strokeWidth="0.7"
      >
        <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="48" /><line x1="100" y1="8" x2="100" y2="192" />
        <line x1="8" y1="100" x2="192" y2="100" />
      </svg>

      <RegistrationHero
        delegate={delegate}
        status={data.status}
        countryFlag={countryData?.flag}
      />

      <RegistrationReviewBanner variant={approved ? "approved" : "pending"} />

      <RegistrationSummaryStrip
        documentsVerified={verifiedDocs}
        documentsTotal={data.documents.length}
        documentsPending={pendingDocs}
        progressPercent={progressPercent}
      />

      <RegistrationStatusCard
        checklist={data.checklist}
        estimatedApproval={data.estimated_approval}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <RegistrationProgressTimeline steps={data.progress_steps} />
        <RegistrationNotifications notifications={data.notifications} />
      </div>

      <SectionLabel>Delegate Profile</SectionLabel>
      <DelegateInfoSection
        delegate={delegate}
        editable={editable}
        countryFlag={countryData?.flag}
      />

      <SectionLabel>Credentials</SectionLabel>
      <DocumentsSection documents={data.documents} editable={editable} />

      <div id="qr-pass" className="scroll-mt-6">
        <QRPassSection
          delegate={delegate}
          status={data.status}
          countryFlag={countryData?.flag}
        />
      </div>

      <div id="downloads">
        <DownloadsSection downloads={data.downloads} />
      </div>

      <RegistrationHelpSection
        email={data.support.secretariat_email}
        phone={data.support.secretariat_phone}
        emergencyPhone={data.support.emergency_phone}
        faqHref={data.support.faq_href}
        contactHref={data.support.contact_href}
      />
    </div>
  );
}
