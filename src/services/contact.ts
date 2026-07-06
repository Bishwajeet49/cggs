import type { ContactData } from "@/types/contact";
import contactData from "../../public/mock-data/contact.json";

export function getContactData(): ContactData {
  return contactData as ContactData;
}
