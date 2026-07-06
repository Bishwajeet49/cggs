"use client";

import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  LayoutDashboard,
  Copy,
  Check,
  Loader2,
  Shield,
  Clock,
} from "lucide-react";
import DelegateIDCard from "@/components/registration/DelegateIDCard";
import QRCodeDisplay from "@/components/registration/QRCodeDisplay";
import { getStoredRegistration, registeredDelegateToMockUser } from "@/services/registration";
import { useAuth } from "@/context/AuthContext";
import { downloadDelegateBadgePdf } from "@/lib/downloadDelegateBadge";
import type { RegisteredDelegate } from "@/types/registration";

const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);

  const [delegate, setDelegate] = useState<RegisteredDelegate | null>(null);
  const [copied, setCopied] = useState<"reg" | "id" | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const stored = getStoredRegistration();
    if (stored) {
      setDelegate(stored);
    }
  }, [searchParams]);

  const copyToClipboard = useCallback((text: string, type: "reg" | "id") => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const handleDownloadPDF = useCallback(async () => {
    if (!cardRef.current || !delegate) return;
    setIsDownloading(true);
    try {
      await downloadDelegateBadgePdf(
        cardRef.current,
        `CGGS2027_Delegate_Badge_${delegate.delegateId}.pdf`
      );
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  }, [delegate]);

  const handleGoToDashboard = useCallback(async () => {
    if (!delegate) return;
    setIsRedirecting(true);
    const { personal, organization } = delegate.formData;
    login(registeredDelegateToMockUser(delegate));
    await new Promise((r) => setTimeout(r, 800));
    router.push("/portal/dashboard");
  }, [delegate, login, router]);

  if (!delegate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F4F8] to-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-navy mx-auto" />
          <p className="text-slate">Loading registration details...</p>
        </div>
      </div>
    );
  }

  const { personal, organization } = delegate.formData;
  const fullName = `${personal.firstName} ${personal.lastName}`.trim();
  const country = personal.nationality || organization.country;
  const category = delegate.formData.category ?? "official_delegate";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0F4F8] to-white pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-3 sm:px-4">
        {/* Success banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
          >
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </motion.div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-gold uppercase mb-3">
            Registration Confirmed
          </span>
          <h1 className="text-3xl md:text-4xl font-light text-navy tracking-wide">
            Welcome, {personal.firstName}!
          </h1>
          <p className="text-slate/70 text-sm mt-2 max-w-xl mx-auto">
            Your registration for the 5th Coast Guard Global Summit has been successfully submitted.
            Your credentials are ready below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left: Delegate info + QR */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-5"
          >
            {/* Registration details card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-navy">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                  Registration Details
                </p>
              </div>
              <div className="p-6 space-y-4">
                {/* Registration number */}
                <div>
                  <p className="text-xs text-slate/60 mb-1">Registration Number</p>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-mono font-bold text-navy tracking-wider">
                      {delegate.registrationNumber}
                    </span>
                    <button
                      onClick={() => copyToClipboard(delegate.registrationNumber, "reg")}
                      className="text-slate/40 hover:text-navy transition-colors"
                      title="Copy"
                    >
                      {copied === "reg" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Delegate ID */}
                <div>
                  <p className="text-xs text-slate/60 mb-1">Delegate ID</p>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-mono font-semibold text-gold tracking-wider">
                      {delegate.delegateId}
                    </span>
                    <button
                      onClick={() => copyToClipboard(delegate.delegateId, "id")}
                      className="text-slate/40 hover:text-navy transition-colors"
                      title="Copy"
                    >
                      {copied === "id" ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-50 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate/60 mb-0.5">Category</p>
                    <p className="text-sm font-medium text-navy">{CATEGORY_LABELS[category]}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate/60 mb-0.5">Country</p>
                    <p className="text-sm font-medium text-navy">{country}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate/60 mb-0.5">Organization</p>
                    <p className="text-sm font-medium text-navy">{organization.organizationName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate/60 mb-0.5">Status</p>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-sm font-medium text-amber-600">Pending Verification</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy mb-4">
                Delegate QR Pass
              </p>
              <div className="flex flex-col items-center">
                <QRCodeDisplay
                  delegateId={delegate.delegateId}
                  registrationNumber={delegate.registrationNumber}
                  name={fullName}
                  category={CATEGORY_LABELS[category]}
                  country={country}
                  organization={organization.organizationName}
                  size={200}
                />
                <p className="text-xs text-slate/50 mt-3 text-center max-w-xs">
                  Present this QR code at registration desks, event venues, and security checkpoints
                </p>
              </div>
            </div>

            {/* Security note */}
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <Shield className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">Verification in Progress</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Your credentials will be verified by the Secretariat within 3–5 business days. You will receive a confirmation email at <strong>{personal.email}</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: ID Card preview + actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-5"
          >
            {/* ID Card preview */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-3 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-navy mb-4 sm:mb-5">
                Delegate ID Card
              </p>
              <div className="w-full flex justify-center">
                <DelegateIDCard ref={cardRef} delegate={delegate} />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all duration-200 disabled:opacity-60 shadow-sm hover:shadow-md"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Download Delegate ID Card (PDF)
                  </>
                )}
              </button>

              <button
                onClick={handleGoToDashboard}
                disabled={isRedirecting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-navy text-white font-semibold rounded-lg hover:bg-navy/90 transition-all duration-200 disabled:opacity-60 shadow-sm hover:shadow-md"
              >
                {isRedirecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing you in...
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="h-5 w-5" />
                    Go to Delegate Dashboard
                  </>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-slate/40">
              Clicking &quot;Go to Dashboard&quot; will automatically sign you in to the Delegate Portal
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function RegistrationSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-navy" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
