"use client";

import { useEffect, useState } from "react";
import Link, { type LinkProps } from "next/link";
import Image from "next/image";
import { X, ChevronDown, ChevronRight, User, LogIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

function NavItem({
  link,
  onClose,
}: {
  link: NavLink;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  if (link.children) {
    return (
      <div>
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
        >
          {link.label}
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-gold" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-4 border-l border-gold/30 ml-4"
            >
              {link.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className={`block px-4 py-2.5 text-sm transition-colors ${
                    pathname === child.href
                      ? "text-gold"
                      : "text-white/60 hover:text-gold"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClose}
      className={`block px-4 py-3 text-sm font-medium transition-colors ${
        pathname === link.href
          ? "text-gold border-l-2 border-gold pl-3"
          : "text-white/80 hover:text-gold"
      }`}
    >
      {link.label}
    </Link>
  );
}

export default function MobileNav({ open, onClose, navLinks }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-navy-dark/80 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-navy-dark border-l border-white/10 flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Image
                  src="/logos/5h_cggs_summit_logo.png"
                  alt="CGGS 2027"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-gold leading-none">
                    CGGS 2027
                  </p>
                  <p className="text-[9px] text-white/50 mt-0.5">Chennai, India</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-gold transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navLinks.map((link) => (
                <NavItem key={link.label} link={link} onClose={onClose} />
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <Link
                href="/login"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white border border-white/20 rounded-sm hover:border-white/40 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Delegate Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-semibold bg-gold text-navy rounded-sm hover:bg-gold-light transition-colors"
              >
                <User className="h-4 w-4" />
                Register Now
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
