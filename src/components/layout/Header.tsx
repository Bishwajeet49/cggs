"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, User, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "About CGGS", href: "/about-cggs" },
  { label: "About ICG", href: "/about-icg" },
  {
    label: "Events",
    href: "#",
    children: [
      { label: "Event Schedule", href: "/schedule" },
      { label: "International Fleet Review", href: "/fleet-review" },
      { label: "World Coast Guard Seminar", href: "/seminar" },
      { label: "Exhibition Village", href: "/village" },
    ],
  },
  { label: "Accommodation", href: "/accommodation" },
  { label: "Media", href: "/media" },
  { label: "Contact", href: "/contact" },
];

function navItemClass(active: boolean) {
  return [
    "inline-flex h-9 items-center rounded-sm px-3 text-sm leading-none transition-colors",
    active ? "text-gold" : "text-white/80 hover:text-gold",
  ].join(" ");
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex min-h-[var(--header-height)] items-center bg-[#001738] transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/40" : ""
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/logos/5h_cggs_summit_logo.png"
              alt="5th Coast Guard Global Summit 2027"
              width={48}
              height={48}
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
            />
            <div className="hidden sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gold leading-none">
                5th Coast Guard Global Summit
              </p>
              <p className="text-[10px] text-white/60 tracking-widest mt-0.5">
                CGGS 2027 · Chennai, India
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              if (link.children) {
                const isActiveGroup = link.children.some(
                  (c) => pathname === c.href || pathname.startsWith(c.href + "/")
                );
                return (
                  <button
                    key={link.label}
                    type="button"
                    className={`group relative m-0 appearance-none border-0 bg-transparent font-inherit cursor-pointer gap-1 ${navItemClass(isActiveGroup)}`}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:rotate-180" />

                    {/*
                     * pt-2 on the absolute panel creates a hover bridge without
                     * affecting nav flex alignment.
                     */}
                    <div className="pointer-events-none invisible absolute top-full left-0 z-50 w-60 pt-2 text-left opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
                      <div className="rounded-sm border border-white/10 bg-navy-dark py-1 text-left shadow-xl shadow-navy-dark/80">
                        {link.children.map((child) => {
                          const active =
                            pathname === child.href ||
                            pathname.startsWith(child.href + "/");
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                                active
                                  ? "text-gold bg-white/5 border-l-2 border-gold pl-3.5"
                                  : "text-white/70 hover:text-gold hover:bg-white/5"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </button>
                );
              }
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navItemClass(active)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:text-gold transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-gold text-navy rounded-sm hover:bg-gold-light transition-colors"
            >
              <User className="h-4 w-4" />
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white/80 hover:text-gold transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}
