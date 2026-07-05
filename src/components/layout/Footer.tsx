import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "About CGGS", href: "/about-cggs" },
  { label: "About Indian Coast Guard", href: "/about-icg" },
  { label: "Event Schedule", href: "/schedule" },
  { label: "Fleet Review", href: "/fleet-review" },
  { label: "World Coast Guard Seminar", href: "/seminar" },
  { label: "Exhibition Village", href: "/village" },
];

const infoLinks = [
  { label: "Accommodation & Travel", href: "/accommodation" },
  { label: "Media & Gallery", href: "/media" },
  { label: "Contact Us", href: "/contact" },
  { label: "Delegate Registration", href: "/register" },
  { label: "Delegate Login", href: "/login" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/70">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/logos/5h_cggs_summit_logo.png"
                alt="5th Coast Guard Global Summit 2027"
                width={52}
                height={52}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-gold leading-none">
                  5th CGGS 2027
                </p>
                <p className="text-[10px] text-white/40 mt-1">Chennai, India</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              The 5th Coast Guard Global Summit — an international forum for
              maritime cooperation, safety, and diplomacy.
            </p>
            <p className="text-xs uppercase tracking-widest text-gold/70 mb-3">
              Official Partners
            </p>
            <div className="flex items-center gap-4">
              <Image
                src="/logos/Indian-navy-logo.png"
                alt="Indian Coast Guard"
                width={40}
                height={40}
                className="h-9 w-9 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
              <Image
                src="/logos/Ministry-of-defence-logo.png"
                alt="Ministry of Defence"
                width={40}
                height={40}
                className="h-9 w-9 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-5">
              Information
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-gold hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold mb-5">
              Secretariat
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Eastern Regional Headquarters,<br />Indian Coast Guard, Chennai</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a href="mailto:secretariat@cggs2027.in" className="hover:text-gold transition-colors">
                  secretariat@cggs2027.in
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <span>+91-44-2345-6789</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold/70 mb-3">
                Stay Updated
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50"
                />
                <button className="px-4 py-2 bg-gold text-navy text-sm font-semibold rounded-sm hover:bg-gold-light transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider mx-4 sm:mx-6" />

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © 2027 5th Coast Guard Global Summit. Ministry of Defence, Government of India.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gold transition-colors">
              Terms of Use
            </Link>
            <a
              href="https://indiancoastguard.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gold transition-colors"
            >
              ICG Official <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
