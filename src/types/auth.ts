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
  profilePhotoUrl: string;
}

export interface DemoDelegatesData {
  delegates: DemoDelegate[];
}
