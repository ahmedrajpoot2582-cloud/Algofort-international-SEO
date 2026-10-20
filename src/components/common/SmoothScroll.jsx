'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAllHeadingsAnimation } from '../../utils/titleAnimation';
import { initAllTextFadeAnimation } from '../../utils/textFadeAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScroll = ({ children, animateParagraphs = true, animateHeadings = true, smoothAnchors = false }) => {
  useEffect(() => {
    // Text uses the same lazy GSAP initializers on desktop and touch screens.
    const stopHeadings = animateHeadings ? initAllHeadingsAnimation() : null;
    const stopText = animateParagraphs ? initAllTextFadeAnimation({ wordsOnlyOnMobile: smoothAnchors }) : null;
    const stopTextMotion = () => {
      stopHeadings?.();
      if (typeof stopText === 'function') stopText();
    };
    // Touch devices already provide inertial scrolling. Keep UAE anchor motion
    // native there so an idle phone does not run a JavaScript scroll ticker.
    if (smoothAnchors && window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches) return stopTextMotion;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      anchors: smoothAnchors ? { offset: -24 } : false,
    });

    if (typeof window !== 'undefined') {
      window.lenis = lenis;
      window.__lenisInstance = lenis;
    }

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      });
    }

    const timer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    }, 150);

    // Accordions change document height; update both scroll systems together.
    const refreshAfterToggle = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    if (smoothAnchors) document.addEventListener('toggle', refreshAfterToggle, true);

    return () => {
      if (typeof window !== 'undefined') {
        if (window.__lenisInstance === lenis) window.__lenisInstance = null;
        if (window.lenis === lenis) window.lenis = null;
      }
      stopTextMotion();
      clearTimeout(timer);
      if (smoothAnchors) document.removeEventListener('toggle', refreshAfterToggle, true);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, [animateParagraphs, animateHeadings, smoothAnchors]);

  return <>{children}</>;
};
