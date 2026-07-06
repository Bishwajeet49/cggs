export interface MockUser {
  delegateId: string;
  firstName: string;
  lastName: string;
  title?: string;
  category: string;
  country: string;
  organization: string;
  registrationNumber: string;
  profilePhotoUrl?: string;
  email?: string;
}

export interface DemoQuickAccessDisplay {
  firstName: string;
  lastName: string;
  title: string;
  organization: string;
  country: string;
  demoLabel: string;
  profilePhotoUrl?: string;
}

export interface DemoDelegate {
  id: string;
  demoLabel: string;
  email: string;
  password: string;
  delegateId: string;
  registrationNumber: string;
  firstName: string;
  lastName: string;
  title: string;
  category: string;
  country: string;
  organization: string;
  profilePhotoUrl?: string;
  /** Fictional display-only identity for login quick-access cards */
  quickAccess?: DemoQuickAccessDisplay;
}

export interface DemoDelegatesData {
  delegates: DemoDelegate[];
}
