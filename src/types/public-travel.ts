export interface TravelOverviewCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PublicHotel {
  id: string;
  name: string;
  category: string;
  star_rating: number;
  location: string;
  distance: string;
  distance_km: number;
  description: string;
  facilities: string[];
  website_url: string;
  map_url: string;
  image_url?: string;
  accent: string;
  public_display: boolean;
}

export interface TravelVenue {
  name: string;
  address: string;
  coordinates: string;
  map_url: string;
  directions_url: string;
  nearby_hotels: string[];
  airport_distance: string;
  airport_travel_time: string;
  venue_travel_time: string;
}

export interface AirportInfo {
  name: string;
  iata_code: string;
  arrival_terminal: string;
  immigration_guidance: string;
  taxi_information: string;
  official_pickup_counter: string;
  emergency_contacts: string[];
  arrival_tips: string[];
}

export interface TransportStep {
  id: string;
  label: string;
  description: string;
}

export interface TransportService {
  id: string;
  title: string;
  description: string;
}

export interface MealItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ImportantInfoCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface DelegatePreviewItem {
  label: string;
  locked: boolean;
}

export interface FeatureComparison {
  public_website: string[];
  delegate_portal: string[];
}

export interface TravelHelpdesk {
  id: string;
  title: string;
  email: string;
  phone: string;
  hours: string;
}

export interface TravelContact {
  travel_helpdesk: TravelHelpdesk;
  accommodation_helpdesk: TravelHelpdesk;
  transportation_helpdesk: TravelHelpdesk;
  emergency_contact: string;
  emergency_phone: string;
}

export interface TravelStat {
  value: number;
  label: string;
  suffix?: string;
}

export interface TravelOverview {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primary_cta_label: string;
    primary_cta_href: string;
    secondary_cta_label: string;
    secondary_cta_href: string;
  };
  overview: {
    intro: string;
    cards: TravelOverviewCard[];
  };
  venue: TravelVenue;
  airport: AirportInfo;
  transport: {
    intro: string;
    services: TransportService[];
    flow: TransportStep[];
  };
  meals: {
    intro: string;
    items: MealItem[];
    login_note: string;
  };
  important_info: ImportantInfoCard[];
  delegate_portal: {
    headline: string;
    subheadline: string;
    preview_items: DelegatePreviewItem[];
    login_label: string;
    login_href: string;
    register_label: string;
    register_href: string;
  };
  feature_comparison: FeatureComparison;
  contacts: TravelContact;
  stats: TravelStat[];
  closing_cta: {
    headline: string;
    description: string;
    login_label: string;
    login_href: string;
    register_label: string;
    register_href: string;
  };
}

export interface TravelFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface TravelFAQData {
  title: string;
  subtitle: string;
  items: TravelFAQ[];
}
