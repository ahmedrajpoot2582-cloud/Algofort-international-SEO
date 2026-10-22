'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function UaeEcosystemMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-ecosystem');
    const panel = section?.querySelector('.sec-uae-ecosystem__panel');
    const background = section?.querySelector('.sec-uae-ecosystem__background');
    const services = document.querySelector('.page-uae #sec-services');
    if (!panel || !background || !services) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    let active = true;

    media.add('(min-width: 992px) and (prefers-reduced-motion: no-preference)', () => {
      const frameWidth = () => services.getBoundingClientRect().width;
      const frameHeight = () => Math.max(panel.clientHeight, window.innerHeight - services.getBoundingClientRect().left * 2);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: () => panel.offsetHeight < window.innerHeight - 48 ? 'center center' : 'top 24px',
          end: () => `+=${Math.round(window.innerHeight * 0.65)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline.fromTo(background, {
        width: () => panel.clientWidth,
        height: () => panel.clientHeight,
        x: 0,
        y: 0,
      }, {
        width: frameWidth,
        height: frameHeight,
        x: () => (panel.clientWidth - frameWidth()) / 2,
        y: () => (panel.clientHeight - frameHeight()) / 2,
        duration: 0.8,
        ease: 'none',
      });
      // Keep the completed frame pinned briefly before normal scrolling resumes.
      timeline.to({}, { duration: 0.2 });

      let refreshFrame;
      const refresh = event => {
        // The accordion controller refreshes once its height transition settles.
        if (event?.target?.hasAttribute('data-uae-accordion')) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const details = section.querySelectorAll('details');
      details.forEach(detail => detail.addEventListener('toggle', refresh));
      document.fonts?.ready.then(() => { if (active) refresh(); });

      return () => {
        cancelAnimationFrame(refreshFrame);
        details.forEach(detail => detail.removeEventListener('toggle', refresh));
      };
    });

    return () => {
      active = false;
      media.revert();
    };
  }, []);

  return null;
}
