export type DelegateCategory =
  | "head_of_delegation"
  | "official_delegate"
  | "observer"
  | "media_representative";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  passportExpiry: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  profilePhotoUrl: string;
}

export interface OrganizationInfo {
  organizationName: string;
  organizationType: string;
  country: string;
  rankDesignation: string;
  department: string;
  officialEmail: string;
  officialIdNumber: string;
}

export interface TravelInfo {
  arrivalDate: string;
  arrivalTime: string;
  arrivalAirport: string;
  arrivalFlightNumber: string;
  departureDate: string;
  departureTime: string;
  departureFlightNumber: string;
  specialTravelNotes: string;
}

export interface AccommodationInfo {
  requireAccommodation: boolean | null;
  hotelPreference: string;
  roomPreference: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequirements: string[];
}

export interface EmergencyContact {
  fullName: string;
  relationship: string;
  phoneNumber: string;
  country: string;
}

export interface Declaration {
  infoCorrect: boolean;
  privacyPolicy: boolean;
  termsConditions: boolean;
}

export interface RegistrationFormData {
  category: DelegateCategory | null;
  personal: PersonalInfo;
  organization: OrganizationInfo;
  travel: TravelInfo;
  accommodation: AccommodationInfo;
  selectedEvents: string[];
  emergency: EmergencyContact;
  declaration: Declaration;
}

export interface RegisteredDelegate {
  registrationNumber: string;
  delegateId: string;
  registeredAt: string;
  status: "pending_verification";
  formData: RegistrationFormData;
}

export const EMPTY_REGISTRATION: RegistrationFormData = {
  category: null,
  personal: {
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    passportNumber: "",
    passportExpiry: "",
    email: "",
    countryCode: "+91",
    mobileNumber: "",
    profilePhotoUrl: "",
  },
  organization: {
    organizationName: "",
    organizationType: "",
    country: "",
    rankDesignation: "",
    department: "",
    officialEmail: "",
    officialIdNumber: "",
  },
  travel: {
    arrivalDate: "",
    arrivalTime: "",
    arrivalAirport: "",
    arrivalFlightNumber: "",
    departureDate: "",
    departureTime: "",
    departureFlightNumber: "",
    specialTravelNotes: "",
  },
  accommodation: {
    requireAccommodation: null,
    hotelPreference: "",
    roomPreference: "",
    checkInDate: "",
    checkOutDate: "",
    specialRequirements: [],
  },
  selectedEvents: [],
  emergency: {
    fullName: "",
    relationship: "",
    phoneNumber: "",
    country: "",
  },
  declaration: {
    infoCorrect: false,
    privacyPolicy: false,
    termsConditions: false,
  },
};

export const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  { code: "+960", country: "Maldives", flag: "🇲🇻" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+1-CA", country: "Canada", flag: "🇨🇦" },
];
