// ── Arrival ───────────────────────────────────────────────────

export type ArrivalStatus = "confirmed" | "pending" | "delayed" | "arrived" | "completed";
export type FlightStatus = "confirmed" | "delayed" | "cancelled" | "departed" | "landed";
export type PickupStatus = "assigned" | "pending" | "driver_en_route" | "arrived" | "completed";

export interface FlightInfo {
  airline: string;
  airline_code: string;
  flight_number: string;
  aircraft?: string;
  date: string;
  arrival_time?: string;
  departure_time?: string;
  terminal: string;
  gate: string;
  airport: string;
  seat: string;
  class: string;
  booking_reference: string;
  origin?: string;
  destination?: string;
  status: FlightStatus | string;
}

export interface PickupInfo {
  status: PickupStatus | string;
  meeting_point: string;
  pickup_time: string;
  date: string;
  estimated_travel_time: string;
  destination: string;
  vehicle_type: string;
  vehicle_number: string;
  driver_name: string;
  driver_phone: string;
  nameplate: string;
}

export interface LiaisonOfficer {
  name: string;
  rank: string;
  unit: string;
  phone: string;
  whatsapp: string;
  email: string;
  assigned_country: string;
  availability: string;
}

export interface ArrivalInstruction {
  id: string;
  icon: string;
  title: string;
  detail: string;
}

export interface AirportMap {
  arrival_gate: string;
  immigration: string;
  baggage: string;
  cggs_desk: string;
  pickup_zone: string;
}

export interface EmergencyContact {
  label: string;
  number: string;
}

export interface ArrivalData {
  delegate: { name: string; country: string; category: string; country_flag: string };
  status: ArrivalStatus | string;
  arrival: FlightInfo;
  departure: FlightInfo;
  pickup: PickupInfo;
  liaison_officer: LiaisonOfficer;
  instructions: ArrivalInstruction[];
  airport_map: AirportMap;
  emergency_contacts: EmergencyContact[];
}

// ── Accommodation ─────────────────────────────────────────────

export type AccommodationStatus = "confirmed" | "pending" | "allocated";
export type RoomStatus = "confirmed" | "pending" | "allocated";

export interface HotelInfo {
  name: string;
  rating: number;
  address: string;
  phone: string;
  website: string;
  description: string;
  distance_to_venue: string;
  travel_time_to_venue: string;
  image_placeholder: string;
}

export interface RoomInfo {
  room_number: string;
  floor: string;
  room_type: string;
  wifi_name: string;
  wifi_password: string;
  breakfast_included: boolean;
  check_in: string;
  check_in_time: string;
  check_out: string;
  check_out_time: string;
  early_checkin_arranged: boolean;
  early_checkin_time?: string;
  special_requests: string[];
  status: RoomStatus | string;
}

export interface HotelPOC {
  name: string;
  designation: string;
  phone: string;
  email: string;
  reception: string;
  helpdesk: string;
  helpdesk_label: string;
}

export interface HotelLocation {
  lat: number;
  lng: number;
  venue_lat: number;
  venue_lng: number;
  google_maps_url: string;
  walking_time: string;
  landmarks: string[];
}

export interface MealInfo {
  id: string;
  type: string;
  time: string;
  location: string;
  menu: string;
  dress_code: string | null;
  included: boolean;
}

export interface Amenity {
  id: string;
  label: string;
  available: boolean;
}

export interface ModuleLink {
  label: string;
  href: string;
  description: string;
}

export interface AccommodationData {
  status: AccommodationStatus | string;
  hotel: HotelInfo;
  room: RoomInfo;
  poc: HotelPOC;
  location: HotelLocation;
  meals: MealInfo[];
  amenities: Amenity[];
  next_module?: ModuleLink;
}

// ── Transport ─────────────────────────────────────────────────

export type VehicleStatus = "assigned" | "pending" | "en_route" | "arrived" | "completed";
export type TripStatus = "upcoming" | "in_progress" | "completed" | "pending";
export type TrackingStatus = "en_route" | "waiting" | "arrived" | "idle";
export type TodayPickupStatus =
  | "driver_en_route"
  | "vehicle_arrived"
  | "completed"
  | "delayed"
  | "scheduled";

export interface VehicleInfo {
  type: string;
  number: string;
  color: string;
  capacity: number;
  ac: boolean;
  image_placeholder: string;
  status: VehicleStatus | string;
}

export interface DriverInfo {
  name: string;
  phone: string;
  experience_years: number;
  languages: string[];
  emergency_contact: string;
}

export interface LiveTracking {
  enabled: boolean;
  current_status: TrackingStatus | string;
  current_location: string;
  eta_minutes: number;
  distance_km: number;
  last_updated: string;
}

export interface TodayPickup {
  date: string;
  pickup_time: string;
  pickup_location: string;
  drop_location: string;
  estimated_arrival: string;
  status: TodayPickupStatus | string;
  notes: string;
}

export interface TripEntry {
  id: string;
  label: string;
  from: string;
  to: string;
  time: string;
  status: TripStatus | string;
  icon: string;
}

export interface EmergencyTransport {
  number: string;
  medical_number: string;
  helpdesk: string;
  available: string;
  response_time: string;
}

export interface TransportData {
  status: VehicleStatus | string;
  vehicle: VehicleInfo;
  driver: DriverInfo;
  live_tracking: LiveTracking;
  today_pickup: TodayPickup;
  schedule: TripEntry[];
  emergency_transport: EmergencyTransport;
  prev_module?: ModuleLink;
}
