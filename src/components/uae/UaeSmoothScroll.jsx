'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeSmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({
        duration: 1,
        smoothWheel: true,
        anchors: { offset: -24 },
        // Nested menus and chat panels retain their own native scrolling.
        prevent: node => Boolean(node.closest('.alg-header-drawer, [role="dialog"]')),
      });
      window.lenis = lenis;
      window.__lenisInstance = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const tick = time => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      const refresh = () => lenis.resize();
      ScrollTrigger.addEventListener('refresh', refresh);
      return () => {
        ScrollTrigger.removeEventListener('refresh', refresh);
        gsap.ticker.remove(tick);
        if (window.lenis === lenis) window.lenis = null;
        if (window.__lenisInstance === lenis) window.__lenisInstance = null;
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, []);
  return null;
}
