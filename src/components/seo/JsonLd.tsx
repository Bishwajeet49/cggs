import { getSiteUrl, siteConfig } from "@/lib/site";

export default function JsonLd() {
  const siteUrl = getSiteUrl();

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.host,
    url: siteConfig.links.icg,
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.organizer,
      url: siteConfig.links.mod,
    },
    logo: `${siteUrl}${siteConfig.assets.logo}`,
  };

  const event = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: siteConfig.name,
    description: siteConfig.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`${siteUrl}${siteConfig.assets.ogImage}`],
    url: siteUrl,
    startDate: "2027-02-01",
    endDate: "2027-02-03",
    location: {
      "@type": "Place",
      name: `${siteConfig.location.city}, ${siteConfig.location.country}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.countryCode,
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.host,
      url: siteConfig.links.icg,
    },
    performer: {
      "@type": "Organization",
      name: "Coast Guard Global Summit (115+ participating nations)",
    },
    about: siteConfig.event.pillars,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteUrl,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: organization,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
