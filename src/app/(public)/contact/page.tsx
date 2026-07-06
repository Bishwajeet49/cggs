import ContactHero from "@/components/sections/contact/ContactHero";
import ContactQuickCards from "@/components/sections/contact/ContactQuickCards";
import ContactDetails from "@/components/sections/contact/ContactDetails";
import ContactEnquiryForm from "@/components/sections/contact/ContactEnquiryForm";
import RegistrationCTA from "@/components/sections/RegistrationCTA";
import { getContactData } from "@/services/contact";

export const metadata = {
  title: "Contact Us | Coast Guard Global Summit 2027",
  description:
    "Contact the CGGS 2027 Secretariat and Indian Coast Guard Regional Headquarters (East), Chennai — phone, email, address, and enquiry form.",
};

export default function ContactPage() {
  const data = getContactData();

  return (
    <>
      <ContactHero info={data.page} />

      <ContactQuickCards
        address={data.address}
        organizer={data.organizer}
        secretariat={data.secretariat}
      />

      <ContactDetails
        address={data.address}
        organizer={data.organizer}
        channels={data.primary_channels}
        emails={data.emails}
        departments={data.departments}
        sourceNote={data.page.source_note}
      />

      <ContactEnquiryForm secretariat={data.secretariat} topics={data.enquiry_topics} />

      <RegistrationCTA />
    </>
  );
}
