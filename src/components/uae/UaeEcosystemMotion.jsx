'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { observeNear } from '../../utils/observeNear';

export function UaeEcosystemMotion() {
  useEffect(() => {
    const section = document.querySelector('#uae-ecosystem');
    const panel = section?.querySelector('.sec-uae-ecosystem__panel');
    if (!panel) return;

    return observeNear(section, () => {
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      let active = true;
      media.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 992px)' }, ({ conditions }) => {
        if (!conditions.motion) return;
        // The frame keeps its layout dimensions and scrolls in normal flow.
        gsap.fromTo(panel, {
          y: conditions.wide ? 100 : 48,
          rotationX: conditions.wide ? 10 : 5,
          transformPerspective: 1400,
          transformOrigin: '50% 100%',
          opacity: .15,
        }, {
          y: 0, rotationX: 0, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top 95%', end: 'top 25%',
            scrub: .6, invalidateOnRefresh: true,
          },
        });
      });
      document.fonts?.ready.then(() => { if (active) ScrollTrigger.refresh(); });
      return () => { active = false; media.revert(); };
    }, 400);
  }, []);

  return null;
}
