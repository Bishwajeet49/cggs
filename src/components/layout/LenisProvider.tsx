"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Renders nothing but initialises Lenis smooth scroll on mount.
 * Place this as a sibling of <Header /> inside the public layout so the
 * layout itself stays a Server Component.
 */
export default function LenisProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    (window as Window & { __cggsLenis?: Lenis }).__cggsLenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      delete (window as Window & { __cggsLenis?: Lenis }).__cggsLenis;
      lenis.destroy();
    };
  }, []);

  return null;
}
