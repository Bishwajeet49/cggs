"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface CategoryOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  badge: string;
  badgeColor: string;
  roles: string[];
}

function useScrollLock(isLocked: boolean, modalRef: RefObject<HTMLElement | null>) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isLocked) return;

    scrollYRef.current = window.scrollY;
    const { body, documentElement } = document;

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    const lenis = (window as Window & { __cggsLenis?: { stop: () => void; start: () => void } }).__cggsLenis;
    lenis?.stop();

    const preventBackgroundScroll = (e: WheelEvent | TouchEvent) => {
      if (modalRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
    };

    document.addEventListener("wheel", preventBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", preventBackgroundScroll, { passive: false });

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      documentElement.style.overflow = "";

      window.scrollTo(0, scrollYRef.current);
      lenis?.start();

      document.removeEventListener("wheel", preventBackgroundScroll);
      document.removeEventListener("touchmove", preventBackgroundScroll);
    };
  }, [isLocked, modalRef]);
}

export default function CategoryOptionsModal({
  isOpen,
  onClose,
  title,
  badge,
  badgeColor,
  roles,
}: CategoryOptionsModalProps) {
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useScrollLock(isOpen, modalRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleListWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = listRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingUp = e.deltaY < 0;
    const scrollingDown = e.deltaY > 0;

    if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
      e.preventDefault();
    }

    e.stopPropagation();
  };

  const filteredRoles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((role) => role.toLowerCase().includes(q));
  }, [query, roles]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div ref={modalRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 overscroll-none">
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-options-title"
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg max-h-[min(90vh,40rem)] flex flex-col bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="shrink-0 px-6 py-5 border-b border-gray-100 bg-navy/3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 id="category-options-title" className="text-lg font-semibold text-navy">
                      {title}
                    </h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${badgeColor}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate/70">
                    Full list of eligible roles and designations
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 p-2 rounded-sm text-slate hover:text-navy hover:bg-gray-100 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate/50" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roles..."
                  className="w-full pl-10 pr-4 py-3 rounded-sm border border-gray-200 text-sm text-navy placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                />
              </div>
            </div>

            <div
              ref={listRef}
              data-lenis-prevent
              onWheel={handleListWheel}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-4"
            >
              {filteredRoles.length > 0 ? (
                <ul className="space-y-2">
                  {filteredRoles.map((role) => (
                    <li
                      key={role}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-sm border border-gray-100 bg-gray-50/50 text-sm text-navy"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {role}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-sm text-slate/60 py-8">
                  No roles match &quot;{query}&quot;
                </p>
              )}
            </div>

            <div className="shrink-0 px-6 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-slate/60">
              {filteredRoles.length} of {roles.length} roles shown
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
