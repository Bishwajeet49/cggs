import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import JsonLd from "@/components/seo/JsonLd";
import { AuthProvider } from "@/context/AuthContext";
import { defaultTitle, getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.host, url: siteConfig.links.icg }],
  creator: siteConfig.host,
  publisher: siteConfig.organizer,
  category: "Government & Defence",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: siteConfig.assets.logo, type: "image/png" },
    ],
    shortcut: siteConfig.assets.logo,
    apple: siteConfig.assets.logo,
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.assets.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.assets.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "event:edition": String(siteConfig.event.edition),
    "event:location": `${siteConfig.location.city}, ${siteConfig.location.country}`,
    "event:host": siteConfig.host,
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={geist.variable}>
      <body className="antialiased">
        <JsonLd />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
