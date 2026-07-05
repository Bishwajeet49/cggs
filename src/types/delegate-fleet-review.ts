export type FleetReviewStatus = "upcoming" | "live" | "completed";

export interface FleetViewingPass {
  viewing_zone: string;
  seat_number: string;
  reporting_time: string;
  entry_gate: string;
  security_level: string;
  qr_delegate_id: string;
  qr_registration_number: string;
}

export interface FormationColumn {
  label: string;
  description: string;
  ships: string[];
}

export interface FleetFormation {
  lead_ship: string;
  indian_fleet: FormationColumn;
  international_fleet: FormationColumn;
  formation_order: { position: number; ship_name: string; country: string }[];
}

export interface MapMarker {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "viewing" | "restricted" | "gate" | "exit" | "fleet";
  color: string;
}

export interface FleetRouteMap {
  title: string;
  description: string;
  markers: MapMarker[];
  legend: { label: string; color: string }[];
  maps_url: string;
}

export interface FleetTransport {
  assigned_pickup: string;
  vehicle: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  reporting_time: string;
  pickup_point: string;
  navigation_url: string;
}

export interface SafetyGuideline {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FleetDownload {
  id: string;
  title: string;
  description: string;
  file_type: string;
  size: string;
}

export interface FleetFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  unit: string;
  phone: string;
  whatsapp?: string;
  email?: string;
}

export interface ProgrammeItem {
  time: string;
  activity: string;
  status?: "completed" | "current" | "upcoming";
}

export interface FleetGalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface FleetWeather {
  event?: string;
  location: string;
  date?: string;
  temperature_c: number;
  condition: string;
  wind_speed_kmh: number;
  humidity_percent: number;
  sea_state: number;
  sea_state_label: string;
  visibility: string;
  sunrise: string;
  sunset: string;
  updated_at: string;
}

export interface FleetCountryDetail {
  country_id: string;
  name: string;
  flag: string;
  code: string;
  coast_guard_name: string;
  ships_participating: number;
  delegates: number;
  ships: string[];
  representatives: { name: string; role: string }[];
  description: string;
}

export interface FleetShipDetail {
  ship_id: string;
  name: string;
  country: string;
  country_code: string;
  type: string;
  class: string;
  length_m: number;
  displacement_tonnes: number;
  crew: number;
  role: string;
  mission: string;
  description: string;
  capabilities: string[];
  highlight: boolean;
  gallery: { id: string; url: string; caption: string }[];
}

export interface DelegateFleetReview {
  status: FleetReviewStatus;
  delegate_category: string;
  viewing_area: string;
  purpose: string;
  importance: string;
  viewing_pass: FleetViewingPass;
  formation: FleetFormation;
  route_map: FleetRouteMap;
  transport: FleetTransport;
  safety_guidelines: SafetyGuideline[];
  downloads: FleetDownload[];
  faqs: FleetFAQ[];
  emergency_contacts: EmergencyContact[];
  programme_today: ProgrammeItem[];
  gallery_images: FleetGalleryImage[];
}
