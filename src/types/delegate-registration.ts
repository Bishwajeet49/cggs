import type { DelegateCategory } from "@/types/registration";

export type RegistrationStatus =
  | "pending_verification"
  | "approved"
  | "rejected"
  | "additional_info_required";

export type ProgressStepState = "completed" | "current" | "pending";

export type DocumentStatus = "verified" | "pending" | "rejected";

export type TravelStatus = "confirmed" | "pending";

export type AccommodationStatus = "pending" | "confirmed" | "assigned";

export type TransportStatus = "confirmed" | "pending" | "allocated";

export interface RegistrationProgressStep {
  id: string;
  label: string;
  state: ProgressStepState;
  completed_at?: string;
}

export interface RegistrationDelegate {
  delegate_id: string;
  registration_number: string;
  registered_at: string;
  category: DelegateCategory;
  first_name: string;
  last_name: string;
  profile_photo_url: string;
  country: string;
  organization: string;
  rank_designation: string;
  passport_number_masked: string;
  email: string;
  phone: string;
}

export interface RegistrationEvent {
  id: string;
  title: string;
  date: string;
  selected: boolean;
}

export interface RegistrationTravel {
  arrival_date: string;
  arrival_flight: string;
  departure_date: string;
  departure_flight: string;
  airport: string;
  status: TravelStatus;
}

export interface RegistrationAccommodation {
  hotel: string;
  room_type: string;
  check_in: string;
  check_out: string;
  status: AccommodationStatus;
}

export interface RegistrationTransport {
  pickup_location: string;
  pickup_time: string;
  assigned_vehicle: string;
  driver: string;
  status: TransportStatus;
}

export interface RegistrationDocument {
  id: string;
  label: string;
  file_name: string;
  uploaded_at: string;
  status: DocumentStatus;
  rejection_reason?: string;
}

export interface RegistrationNotification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface RegistrationDownload {
  id: string;
  label: string;
  file_name: string;
  format: string;
  size_kb: number;
  available: boolean;
}

export interface RegistrationSupport {
  secretariat_email: string;
  secretariat_phone: string;
  emergency_phone: string;
  faq_href: string;
  contact_href: string;
}

export interface DelegateRegistrationData {
  status: RegistrationStatus;
  estimated_approval: string;
  progress_steps: RegistrationProgressStep[];
  checklist: { id: string; label: string; completed: boolean }[];
  delegate: RegistrationDelegate;
  events: RegistrationEvent[];
  travel: RegistrationTravel;
  accommodation: RegistrationAccommodation;
  transport: RegistrationTransport;
  documents: RegistrationDocument[];
  notifications: RegistrationNotification[];
  downloads: RegistrationDownload[];
  support: RegistrationSupport;
}
