import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "5th Coast Guard Global Summit 2027 | CGGS 2027 · Chennai, India",
  description:
    "The 5th Coast Guard Global Summit (CGGS 2027) — International maritime diplomacy, Fleet Review, and the Golden Jubilee of the Indian Coast Guard. Chennai, India.",
  keywords: [
    "CGGS 2027",
    "Coast Guard Global Summit",
    "Indian Coast Guard",
    "Chennai",
    "Fleet Review",
    "Maritime Summit",
    "Golden Jubilee",
  ],
  openGraph: {
    title: "5th Coast Guard Global Summit 2027",
    description:
      "International maritime summit hosted by the Indian Coast Guard, Chennai, India.",
    images: ["/banners/banner-1.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
