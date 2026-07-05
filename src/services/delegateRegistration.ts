import type {
  DelegateRegistrationData,
  RegistrationStatus,
  ProgressStepState,
} from "@/types/delegate-registration";
import registrationData from "../../public/mock-data/registration.json";

export const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

export const STATUS_CONFIG: Record<
  RegistrationStatus,
  { label: string; badge: string; dot: string; description: string }
> = {
  pending_verification: {
    label: "Pending Verification",
    badge: "bg-amber-500/15 text-amber-700 border-amber-300/50",
    dot: "bg-amber-400",
    description: "Your registration is being reviewed by the CGGS Secretariat.",
  },
  approved: {
    label: "Approved",
    badge: "bg-emerald-500/15 text-emerald-700 border-emerald-300/50",
    dot: "bg-emerald-500",
    description: "Your delegate credentials are now active.",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-red-500/15 text-red-700 border-red-300/50",
    dot: "bg-red-500",
    description: "Your registration could not be approved. Please contact the Secretariat.",
  },
  additional_info_required: {
    label: "Additional Information Required",
    badge: "bg-orange-500/15 text-orange-700 border-orange-300/50",
    dot: "bg-orange-500",
    description: "Please provide the requested documents or information to proceed.",
  },
};

export const DOCUMENT_STATUS_STYLES: Record<string, { label: string; className: string }> = {
  verified: { label: "Verified", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border-amber-200" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700 border-red-200" },
};

export const TRAVEL_STATUS_STYLES: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
};

export const ACCOMMODATION_STATUS_STYLES: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  confirmed: { label: "Confirmed", className: "bg-emerald-50 text-emerald-700" },
  assigned: { label: "Assigned", className: "bg-blue-50 text-blue-700" },
};

export const TRANSPORT_STATUS_STYLES: Record<string, { label: string; className: string }> = {
  confirmed: { label: "Confirmed", className: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  allocated: { label: "Allocated", className: "bg-blue-50 text-blue-700" },
};

export function getDelegateRegistration(): DelegateRegistrationData {
  return registrationData as DelegateRegistrationData;
}

export function isRegistrationApproved(): boolean {
  return getDelegateRegistration().status === "approved";
}

export function canEditRegistration(): boolean {
  const status = getDelegateRegistration().status;
  return status === "pending_verification" || status === "additional_info_required";
}

export function getRegistrationProgressPercent(): number {
  const steps = getDelegateRegistration().progress_steps;
  const completed = steps.filter((s) => s.state === "completed").length;
  const current = steps.some((s) => s.state === "current") ? 0.5 : 0;
  return Math.round(((completed + current) / steps.length) * 100);
}

export function formatRegistrationDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatNotificationTime(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStepIconState(state: ProgressStepState): "completed" | "current" | "pending" {
  return state;
}
