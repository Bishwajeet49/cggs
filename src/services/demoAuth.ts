import type {
  DemoDelegate,
  DemoDelegatesData,
  DemoQuickAccessDisplay,
  MockUser,
} from "@/types/auth";
import demoData from "../../public/mock-data/demo-delegates.json";

export const CATEGORY_LABELS: Record<string, string> = {
  head_of_delegation: "Head of Delegation",
  official_delegate: "Official Delegate",
  observer: "Observer",
  media_representative: "Media Representative",
};

export function getDemoDelegates(): DemoDelegate[] {
  return (demoData as DemoDelegatesData).delegates;
}

export function getDemoDelegateById(id: string): DemoDelegate | undefined {
  return getDemoDelegates().find((d) => d.id === id);
}

export function getQuickAccessDisplay(delegate: DemoDelegate): DemoQuickAccessDisplay {
  const qa = delegate.quickAccess;
  return {
    firstName: qa?.firstName ?? delegate.firstName,
    lastName: qa?.lastName ?? delegate.lastName,
    title: qa?.title ?? delegate.title,
    organization: qa?.organization ?? delegate.organization,
    country: qa?.country ?? delegate.country,
    demoLabel: qa?.demoLabel ?? delegate.demoLabel,
    profilePhotoUrl: qa?.profilePhotoUrl ?? delegate.profilePhotoUrl,
  };
}

export function demoDelegateToMockUser(delegate: DemoDelegate): MockUser {
  const display = getQuickAccessDisplay(delegate);
  return {
    delegateId: delegate.delegateId,
    firstName: display.firstName,
    lastName: display.lastName,
    title: display.title,
    category: delegate.category,
    country: display.country,
    organization: display.organization,
    registrationNumber: delegate.registrationNumber,
    profilePhotoUrl: display.profilePhotoUrl,
    email: delegate.email,
  };
}

export function validateDemoCredentials(
  email: string,
  password: string
): DemoDelegate | null {
  const normalized = email.trim().toLowerCase();
  const match = getDemoDelegates().find(
    (d) => d.email.toLowerCase() === normalized && d.password === password
  );
  return match ?? null;
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? "Official Delegate";
}

export function getFullName(user: Pick<MockUser, "firstName" | "lastName">): string {
  return `${user.firstName} ${user.lastName}`.trim();
}

export function getDisplayName(user: MockUser): string {
  if (user.title) {
    return `${user.title} ${user.lastName}`.trim();
  }
  return getFullName(user);
}

export function getInitials(first: string, last: string): string {
  return `${first.charAt(0)}${last.charAt(0) || ""}`.toUpperCase();
}
