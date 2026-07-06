export interface ContactPageInfo {
  eyebrow: string;
  title: string;
  subtitle: string;
  source_note: string;
}

export interface ContactOrganizer {
  name: string;
  name_tamil: string;
  commander: string;
  hours: string;
  website: string;
}

export interface ContactAddress {
  title: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  plus_code: string;
  country: string;
  maps_url: string;
  coordinates: { lat: number; lng: number };
  map_embed_url: string;
}

export interface ContactSecretariat {
  name: string;
  description: string;
  email: string;
  phone: string;
  hours: string;
}

export interface ContactChannel {
  id: string;
  icon: "phone" | "radio" | "fax" | "mail" | "clock";
  label: string;
  value: string;
  href: string | null;
  note: string;
}

export interface ContactEmail {
  id: string;
  label: string;
  address: string;
  href: string;
}

export interface ContactDepartment {
  name: string;
  contact: string;
  phone: string;
  href: string;
}

export interface ContactData {
  page: ContactPageInfo;
  organizer: ContactOrganizer;
  address: ContactAddress;
  secretariat: ContactSecretariat;
  primary_channels: ContactChannel[];
  emails: ContactEmail[];
  departments: ContactDepartment[];
  enquiry_topics: string[];
}
