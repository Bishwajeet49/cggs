/** Central site configuration — used by metadata, sitemap, manifest, and JSON-LD. */

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const siteConfig = {
  name: "5th Coast Guard Global Summit 2027",
  shortName: "CGGS 2027",
  tagline: "International maritime diplomacy · Chennai, India",
  description:
    "Official website of the 5th Coast Guard Global Summit (CGGS 2027) — hosted by the Indian Coast Guard in Chennai, India. Join 115+ nations for the World Coast Guard Seminar, International Fleet Review, and Golden Jubilee celebrations marking 50 years of the Indian Coast Guard.",
  locale: "en_IN",
  themeColor: "#001738",
  backgroundColor: "#001738",

  host: "Indian Coast Guard",
  organizer: "Ministry of Defence, Government of India",
  secretariat: "Japan Coast Guard (CGGS Secretariat)",

  location: {
    city: "Chennai",
    region: "Tamil Nadu",
    country: "India",
    countryCode: "IN",
  },

  event: {
    edition: 5,
    year: 2027,
    month: "February 2027",
    duration: "3-day international summit",
    significance:
      "Indian Coast Guard Golden Jubilee — 50 years since establishment on 1 February 1977",
    pillars: [
      "World Coast Guard Seminar",
      "International Coast Guard Fleet Review",
      "Golden Jubilee Celebrations",
    ],
  },

  keywords: [
    "CGGS 2027",
    "Coast Guard Global Summit",
    "5th Coast Guard Global Summit",
    "Indian Coast Guard",
    "ICG Golden Jubilee",
    "Chennai maritime summit",
    "International Fleet Review",
    "World Coast Guard Seminar",
    "maritime diplomacy",
    "SAGAR initiative",
    "Ministry of Defence India",
    "maritime safety",
    "marine environment protection",
    "maritime law enforcement",
    "Exhibition Village CGGS",
  ],

  assets: {
    logo: "/logos/5h_cggs_summit_logo.png",
    ogImage: "/banners/banner-1.png",
    ogImageAlt:
      "5th Coast Guard Global Summit 2027 — International maritime summit in Chennai, India",
  },

  links: {
    icg: "https://indiancoastguard.gov.in",
    mod: "https://mod.gov.in",
  },

  /** Public routes included in sitemap (portal routes excluded). */
  publicRoutes: [
    "/",
    "/about-cggs",
    "/about-icg",
    "/schedule",
    "/fleet-review",
    "/seminar",
    "/village",
    "/accommodation",
    "/travel-and-stay",
    "/media",
    "/contact",
    "/register",
    "/login",
  ] as const,
} as const;

export const defaultTitle = `${siteConfig.name} | ${siteConfig.shortName} · Chennai, India`;
